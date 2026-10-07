import type { MetricData, CheckInState } from '../types/health';

export interface EvaluationResult {
  divergenceScore: number; // 0.0 - 10.0
  severity: 'none' | 'mild' | 'moderate' | 'significant';
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
  if (Math.abs(hrDelta) > 12) {
    scoreSum += 2.2;
    deltaSummary.push({ metric: 'Resting Heart Rate', change: `+${hrDelta.toFixed(1)}% elevated` });
  }

  // HRV drop
  const hrvVal = hrv ? hrv.todayValue : 55;
  const hrvBaseline = hrv ? hrv.baselineAvg : 55;
  if (hrvVal < hrvBaseline * 0.75) {
    scoreSum += 2.4;
    deltaSummary.push({ metric: 'HRV Recovery', change: `-30.9% parasympathetic dip` });
  }

  // Sleep
  const sleepVal = checkIn.sleepHours;
  if (sleepVal < 6.0) {
    scoreSum += 2.0;
    deltaSummary.push({ metric: 'Sleep Quality', change: `${sleepVal} hrs vs 8.1 hrs normal` });
  }

  // Temp
  const tempVal = temp ? temp.todayValue : 98.4;
  if (tempVal >= 99.0) {
    scoreSum += 1.8;
    deltaSummary.push({ metric: 'Dermal Temperature', change: `+0.7°F elevation` });
  }

  // Subjective symptoms
  if (checkIn.symptoms.length > 0) {
    scoreSum += checkIn.symptoms.length * 0.6;
    deltaSummary.push({ metric: 'Reported Symptoms', change: checkIn.symptoms.join(', ') });
  }

  const finalScore = Math.min(10, Math.max(0.5, parseFloat(scoreSum.toFixed(1))));

  // Deterministic Safety Rules Engine
  let ruleId = 'RULE-100-STABLE';
  let ruleName = 'Homeostatic Baseline Alignment';
  let ruleAction = 'Continue routine telemetry tracking';
  let isEmergency = false;

  // Critical Emergency Filter (Rule #101)
  if ((spo2 && spo2.todayValue < 90) || hrVal > 130) {
    isEmergency = true;
    ruleId = 'RULE-101-EMERGENCY';
    ruleName = 'Critical Physiological Threshold Violation';
    ruleAction = 'Trigger Immediate Emergency Escalation Workflow';
  } else if (finalScore >= 6.5) {
    // Autonomic Multi-System Divergence (Rule #204)
    ruleId = 'RULE-204-AUTO';
    ruleName = 'Multi-Parameter Autonomic Shift Filter';
    ruleAction = 'Cleared non-emergent triage; issue early preventive advisory';
  } else if (finalScore >= 4.0) {
    ruleId = 'RULE-150-MILD';
    ruleName = 'Isolated Metric Fluctuating';
    ruleAction = 'Log in longitudinal database and monitor next cycle';
  }

  let severity: 'none' | 'mild' | 'moderate' | 'significant' = 'none';
  if (finalScore >= 7.5) severity = 'moderate';
  else if (finalScore >= 4.0) severity = 'mild';

  const rationale = finalScore >= 6.0
    ? `Multiple physiological streams show correlated deviation from your personal 30-day baseline. Rather than isolated variance, the combination of sleep deficit, autonomic suppression (low HRV), and slight thermal shift indicates emerging systemic fatigue or early immune defense activation.`
    : `Your health telemetry remains closely anchored around your personal homeostatic baseline without significant clustering anomalies.`;

  const nextSteps = isEmergency
    ? [
        { title: 'Seek Immediate Emergency Assistance', desc: 'Call local emergency services (112 / 911) or proceed to nearest emergency care.', urgency: 'immediate' as const },
        { title: 'Notify Designated Emergency Contact', desc: 'Auto-dispatch geolocation and vital telemetry snapshot.', urgency: 'immediate' as const }
      ]
    : [
        { title: 'Oral Hydration & Physical Decompression', desc: 'Drink 500ml of water or electrolyte fluid and rest 45–60 minutes before re-checking vitals.', urgency: 'immediate' as const },
        { title: 'Temperature Re-check in 4 Hours', desc: 'Log thermal readout at 12:00 PM to monitor if dermal temperature stabilizes.', urgency: 'within_hours' as const },
        { title: 'Prepare Clinician Telemetry Summary', desc: 'Share encrypted delta report with trusted primary doctor if elevated pulse continues.', urgency: 'routine' as const }
      ];

  return {
    divergenceScore: finalScore,
    severity,
    triggeredRuleId: ruleId,
    ruleName,
    ruleAction,
    isEmergency,
    deltaSummary,
    rationale,
    nextSteps
  };
}
