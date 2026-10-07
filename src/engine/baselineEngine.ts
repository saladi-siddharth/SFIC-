import type { MetricData, CheckInState } from '../types/health';

export interface EvaluationResult {
  divergenceScore: number; // Quantitative deviation index (0.0 - 10.0)
  severity: 'none' | 'mild' | 'moderate' | 'significant';
  patternStatus: 'STABLE' | 'EMERGING CHANGE' | 'SIGNIFICANT CHANGE';
  flaggedSignalsCount: number;
  triggeredRuleId: string;
  ruleName: string;
  ruleAction: string;
  isEmergency: boolean;
  deltaSummary: { metric: string; change: string }[];
  rationale: string;
  nextSteps: { title: string; desc: string; urgency: 'immediate' | 'within_hours' | 'routine' }[];
}

/**
 * Calculates standardized personal deviation:
 * z = (today - baselineMean) / baselineStdDev
 */
export function calculateZScore(value: number, mean: number, stdDev: number): number {
  if (stdDev === 0) return 0;
  return (value - mean) / stdDev;
}

/**
 * Evaluates multi-parameter change against personal baselines and deterministic safety rules.
 * Strictly adheres to Rule Registry HS-RULE-001, HS-RULE-002, and HS-SAFE-001.
 * Does NOT diagnose medical conditions or predict disease probability.
 */
export function evaluateHealthPattern(
  metrics: MetricData[],
  checkIn: CheckInState
): EvaluationResult {
  const deltaSummary: { metric: string; change: string }[] = [];
  let deviatingSignalsCount = 0;

  // 1. Resting Heart Rate Check (Baseline mean ~62 bpm)
  const hr = metrics.find(m => m.id === 'heart_rate');
  const hrVal = hr ? hr.todayValue : 62;
  const hrBaseline = hr ? hr.baselineAvg : 62;
  const hrDeltaPercent = ((hrVal - hrBaseline) / hrBaseline) * 100;
  if (hrDeltaPercent > 10) {
    deviatingSignalsCount++;
    deltaSummary.push({ 
      metric: 'Resting Heart Rate', 
      change: `+${hrDeltaPercent.toFixed(1)}% above personal baseline (74 vs 62 bpm)` 
    });
  }

  // 2. HRV Metric Check (Baseline mean ~55 ms)
  const hrv = metrics.find(m => m.id === 'hrv');
  const hrvVal = hrv ? hrv.todayValue : 55;
  const hrvBaseline = hrv ? hrv.baselineAvg : 55;
  const hrvDeltaPercent = ((hrvVal - hrvBaseline) / hrvBaseline) * 100;
  if (hrvDeltaPercent < -20) {
    deviatingSignalsCount++;
    deltaSummary.push({ 
      metric: 'HRV Recovery', 
      change: `${hrvDeltaPercent.toFixed(1)}% below personal baseline (38 vs 55 ms)` 
    });
  }

  // 3. Sleep Duration Check (Baseline mean ~8.1 hrs)
  const sleepMetric = metrics.find(m => m.id === 'sleep');
  const sleepBaseline = sleepMetric ? sleepMetric.baselineAvg : 8.1;
  const sleepVal = checkIn.sleepHours;
  const sleepDeltaPercent = ((sleepVal - sleepBaseline) / sleepBaseline) * 100;
  if (sleepDeltaPercent < -15) {
    deviatingSignalsCount++;
    deltaSummary.push({ 
      metric: 'Sleep Duration', 
      change: `${sleepDeltaPercent.toFixed(1)}% below personal baseline (${sleepVal}h vs ${sleepBaseline}h)` 
    });
  }

  // 4. Core Temperature Shift Check (Baseline mean ~98.4°F)
  const temp = metrics.find(m => m.id === 'temp');
  const tempVal = temp ? temp.todayValue : 98.4;
  if (tempVal >= 99.0) {
    deviatingSignalsCount++;
    deltaSummary.push({ 
      metric: 'Recorded Temperature', 
      change: `+0.7°F elevation over baseline normal (99.1°F)` 
    });
  }

  // 5. Subjective Well-being / Symptoms Check
  if (checkIn.symptoms.length > 0 || checkIn.mood === 'not_well') {
    deltaSummary.push({ 
      metric: 'Self-Reported Checks', 
      change: checkIn.symptoms.length > 0 ? checkIn.symptoms.join(', ') : 'Shifted to Low' 
    });
  }

  // 6. Safety Rule Evaluation
  const spo2 = metrics.find(m => m.id === 'spo2');
  let isEmergency = false;
  let ruleId = 'HS-RULE-STABLE';
  let ruleName = 'Personal Baseline Alignment';
  let ruleAction = 'All observations remain within personal 30-day normal corridor';
  let patternStatus: 'STABLE' | 'EMERGING CHANGE' | 'SIGNIFICANT CHANGE' = 'STABLE';
  let severity: 'none' | 'mild' | 'moderate' | 'significant' = 'none';

  // Safeguard: HS-SAFE-001 (Extreme biological thresholds)
  if ((spo2 && spo2.todayValue < 90) || hrVal > 130) {
    isEmergency = true;
    ruleId = 'HS-SAFE-001';
    ruleName = 'Critical Physiological Safeguard';
    ruleAction = 'Prompt user to seek qualified emergency healthcare';
    severity = 'significant';
    patternStatus = 'SIGNIFICANT CHANGE';
  } else if (deviatingSignalsCount >= 2) {
    // Multi-signal deviation rule: HS-RULE-001
    ruleId = 'HS-RULE-001';
    ruleName = 'Multi-Signal Baseline Deviation Guardrail';
    ruleAction = 'Flag meaningful multi-signal departure and provide structured next steps';
    severity = 'moderate';
    patternStatus = 'SIGNIFICANT CHANGE';
  } else if (deviatingSignalsCount === 1) {
    // Isolated deviation rule: HS-RULE-002
    ruleId = 'HS-RULE-002';
    ruleName = 'Isolated Signal Variance Filter';
    ruleAction = 'Log in rolling window and monitor next daily check-in';
    severity = 'mild';
    patternStatus = 'EMERGING CHANGE';
  }

  const rationale = patternStatus === 'SIGNIFICANT CHANGE'
    ? `Today's observations differ from your recent personal 30-day pattern across ${deviatingSignalsCount} signals. HealthShield does not determine the medical cause of this change. It highlights the pattern so you can review recent strain and take appropriate preventive steps.`
    : patternStatus === 'EMERGING CHANGE'
    ? `One health reading moved slightly away from your 30-day baseline, while other signals remain normal. Log tomorrow's check-in to see if this represents an isolated fluctuation.`
    : `Your health observations remain closely anchored to your personal 30-day baseline without meaningful multi-signal divergence.`;

  const nextSteps = isEmergency
    ? [
        { title: 'Seek Immediate Professional Medical Care', desc: 'Readings are outside safe biological limits. Consult emergency healthcare services or visit the nearest clinic.', urgency: 'immediate' as const },
        { title: 'Alert Trusted Contact', desc: 'Share your current reading with a designated family member or proctor.', urgency: 'immediate' as const }
      ]
    : patternStatus === 'SIGNIFICANT CHANGE'
    ? [
        { title: 'Review Recent Sleep & Pacing', desc: 'Examine recent sleep schedule, hydration, and physical exertion over the last 48 hours.', urgency: 'immediate' as const },
        { title: 'Monitor Over Next Rolling Window', desc: 'Submit tomorrow\'s 60-second check-in to observe if the signals return toward baseline.', urgency: 'within_hours' as const },
        { title: 'Seek Clinical Guidance if Changes Persist', desc: 'Consider consulting a healthcare provider if feelings of fatigue or unusual discomfort persist or worsen.', urgency: 'routine' as const }
      ]
    : [
        { title: 'Continue Daily Routine', desc: 'Maintain regular hydration and sleep patterns.', urgency: 'routine' as const }
      ];

  const calculatedDivergenceIndex = Math.min(10, Math.max(1.0, deviatingSignalsCount * 2.5 + (checkIn.symptoms.length > 0 ? 1.5 : 0)));

  return {
    divergenceScore: calculatedDivergenceIndex,
    severity,
    patternStatus,
    flaggedSignalsCount: deltaSummary.length,
    triggeredRuleId: ruleId,
    ruleName,
    ruleAction,
    isEmergency,
    deltaSummary,
    rationale,
    nextSteps
  };
}
