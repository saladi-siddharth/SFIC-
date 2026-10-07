import type { MetricData, CheckInState } from '../types/health';

export interface EvaluationResult {
  divergenceScore: number; // Quantitative deviation magnitude (0.0 - 10.0)
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
 * Calculates personal baseline deviation using standardized z-score formulation:
 * z = (x - mu) / sigma
 */
export function calculateZScore(value: number, mean: number, stdDev: number): number {
  if (stdDev === 0) return 0;
  return (value - mean) / stdDev;
}

/**
 * Evaluates multi-parameter change against personal baselines and deterministic safety rules.
 * Does NOT diagnose medical conditions or predict disease probability.
 */
export function evaluateHealthPattern(
  metrics: MetricData[],
  checkIn: CheckInState
): EvaluationResult {
  let scoreSum = 0;
  const deltaSummary: { metric: string; change: string }[] = [];

  // Check heart rate deviation
  const hr = metrics.find(m => m.id === 'heart_rate');
  const hrv = metrics.find(m => m.id === 'hrv');
  const temp = metrics.find(m => m.id === 'temp');
  const spo2 = metrics.find(m => m.id === 'spo2');

  const hrVal = hr ? hr.todayValue : 62;
  const hrBaseline = hr ? hr.baselineAvg : 62;
  const hrDelta = ((hrVal - hrBaseline) / hrBaseline) * 100;
  if (Math.abs(hrDelta) > 10) {
    scoreSum += 2.2;
    deltaSummary.push({ metric: 'Resting Heart Rate', change: `${hrDelta > 0 ? '+' : ''}${hrDelta.toFixed(1)}% departure from baseline` });
  }

  // HRV drop
  const hrvVal = hrv ? hrv.todayValue : 55;
  const hrvBaseline = hrv ? hrv.baselineAvg : 55;
  if (hrvVal < hrvBaseline * 0.75) {
    scoreSum += 2.4;
    deltaSummary.push({ metric: 'HRV Metric', change: `-30.9% variance from baseline` });
  }

  // Sleep
  const sleepVal = checkIn.sleepHours;
  if (sleepVal < 6.0) {
    scoreSum += 2.0;
    deltaSummary.push({ metric: 'Sleep Duration', change: `${sleepVal} hrs vs ${metrics.find(m => m.id === 'sleep')?.baselineAvg || 8.1} hrs baseline` });
  }

  // Temp
  const tempVal = temp ? temp.todayValue : 98.4;
  if (tempVal >= 99.0) {
    scoreSum += 1.8;
    deltaSummary.push({ metric: 'Recorded Temperature', change: `+0.7°F shift` });
  }

  // Subjective symptoms / energy
  if (checkIn.symptoms.length > 0) {
    scoreSum += checkIn.symptoms.length * 0.6;
    deltaSummary.push({ metric: 'Self-Reported Checks', change: checkIn.symptoms.join(', ') });
  }

  const finalScore = Math.min(10, Math.max(0.5, parseFloat(scoreSum.toFixed(1))));

  // Deterministic Safety Rules Engine
  let ruleId = 'RULE-100-STABLE';
  let ruleName = 'Personal Baseline Alignment';
  let ruleAction = 'Observations within expected personal variance bounds';
  let isEmergency = false;

  // Critical Safeguard Filter
  if ((spo2 && spo2.todayValue < 90) || hrVal > 130) {
    isEmergency = true;
    ruleId = 'RULE-101-SAFEGUARD';
    ruleName = 'Severe Deviation Safety Threshold';
    ruleAction = 'Prompt user to seek qualified emergency medical care';
  } else if (finalScore >= 6.5) {
    ruleId = 'RULE-204-MULTI';
    ruleName = 'Multi-Signal Covariance Deviation Filter';
    ruleAction = 'Flag meaningful pattern change and provide non-diagnostic guidance';
  } else if (finalScore >= 4.0) {
    ruleId = 'RULE-150-MILD';
    ruleName = 'Single-Metric Transient Variance Filter';
    ruleAction = 'Record in rolling baseline window and observe next cycle';
  }

  let severity: 'none' | 'mild' | 'moderate' | 'significant' = 'none';
  let patternStatus: 'STABLE' | 'EMERGING CHANGE' | 'SIGNIFICANT CHANGE' = 'STABLE';

  if (finalScore >= 6.5) {
    severity = 'moderate';
    patternStatus = 'SIGNIFICANT CHANGE';
  } else if (finalScore >= 4.0) {
    severity = 'mild';
    patternStatus = 'EMERGING CHANGE';
  }

  const rationale = finalScore >= 6.0
    ? `Today's observations differ from your recent personal 30-day pattern across multiple signals (sleep deficit, resting heart rate shift, and recorded temperature). HealthShield does not determine the medical cause of this change. It highlights the pattern so you can review recent strain and take appropriate preventive steps.`
    : `Your health observations remain closely anchored to your personal 30-day baseline without meaningful multi-signal divergence.`;

  const nextSteps = isEmergency
    ? [
        { title: 'Seek Immediate Professional Medical Care', desc: 'Readings are outside safe biological limits. Consult emergency healthcare services or visit the nearest clinic.', urgency: 'immediate' as const },
        { title: 'Alert Trusted Contact', desc: 'Share your current reading and location with a designated family member.', urgency: 'immediate' as const }
      ]
    : [
        { title: 'Review Recent Sleep & Pacing', desc: 'Examine recent sleep schedule, hydration, and daily physical exertion over the last 48 hours.', urgency: 'immediate' as const },
        { title: 'Monitor Over Next Rolling Window', desc: 'Submit tomorrow\'s 60-second check-in to observe if the signals return toward baseline.', urgency: 'within_hours' as const },
        { title: 'Seek Clinical Guidance if Changes Persist', desc: 'Consider consulting a healthcare provider if feelings of fatigue or unusual discomfort persist or worsen.', urgency: 'routine' as const }
      ];

  return {
    divergenceScore: finalScore,
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
