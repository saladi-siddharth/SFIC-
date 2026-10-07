/**
 * HealthShield AI — Safety & Governance Rule Registry (Prototype Logic)
 * 
 * CREDIBILITY NOTICE:
 * Safety rules implemented here are prototype demonstration logic based on publicly
 * established physiological guidelines. They have NOT undergone prospective clinical
 * validation and require institutional clinical review prior to real-world deployment.
 * 
 * HARD RULE: Deterministic safety logic overrides language model text generation.
 * HealthShield does not diagnose disease or provide prescriptive medical treatments.
 */

export interface SafetyRule {
  ruleId: string;
  version: string;
  title: string;
  category: 'Personal Baseline Deviation' | 'Multi-Signal Change' | 'Data Quality Check' | 'Emergency Safeguard';
  status: 'Prototype Rule' | 'Safety Safeguard' | 'Pending Clinical Review';
  logicDescription: string;
  userFacingGuidance: string;
  referenceSource: string;
  clinicalValidationStatus: 'Prototype Demonstration (Requires Clinical Review)';
}

export const SAFETY_RULE_REGISTRY: SafetyRule[] = [
  {
    ruleId: 'HS-RULE-001',
    version: '1.0-proto',
    title: 'Multi-Signal Covariance Deviation',
    category: 'Multi-Signal Change',
    status: 'Prototype Rule',
    logicDescription: 'Triggers when 2 or more signals (e.g. sleep duration, daily activity, resting HR) diverge by >1.8 standard deviations from the personal 30-day baseline over a 48h rolling window.',
    userFacingGuidance: 'Today\'s observations differ from your recent personal pattern across multiple signals. HealthShield does not determine the medical cause of this change. Consider reviewing recent physical strain and resting.',
    referenceSource: 'Prototype Multi-Sensor Pattern Model',
    clinicalValidationStatus: 'Prototype Demonstration (Requires Clinical Review)'
  },
  {
    ruleId: 'HS-RULE-002',
    version: '1.0-proto',
    title: 'Sustained Resting Heart Rate Elevation',
    category: 'Personal Baseline Deviation',
    status: 'Prototype Rule',
    logicDescription: 'Identifies resting heart rate elevation >= 8 bpm above personal rolling baseline persisting across multiple measurement epochs without concurrent exercise.',
    userFacingGuidance: 'Your resting heart rate is elevated compared to your typical baseline. Ensure adequate hydration, rest in a comfortable posture, and consult a qualified healthcare professional if you feel unwell.',
    referenceSource: 'General Physiological Reference Ranges (Public Data)',
    clinicalValidationStatus: 'Prototype Demonstration (Requires Clinical Review)'
  },
  {
    ruleId: 'HS-RULE-003',
    version: '1.0-proto',
    title: 'Severe Oxygen Desaturation Safeguard',
    category: 'Emergency Safeguard',
    status: 'Safety Safeguard',
    logicDescription: 'Hard emergency threshold: If SpO2 drops below 90% (or pulse exceeds 140 bpm while resting), suppresses conversational AI and displays prominent medical evaluation notice.',
    userFacingGuidance: 'Observed reading is below typical physiological safety thresholds. Verify sensor placement. If you experience shortness of breath, chest discomfort, or severe distress, seek immediate medical attention.',
    referenceSource: 'Standard Triage Safety Protocol',
    clinicalValidationStatus: 'Prototype Demonstration (Requires Clinical Review)'
  },
  {
    ruleId: 'HS-RULE-004',
    version: '1.0-proto',
    title: 'Sensor & Data Freshness Quality Gate',
    category: 'Data Quality Check',
    status: 'Prototype Rule',
    logicDescription: 'Suppresses change calculation if telemetry reading is stale (>36 hours old), falls outside biological possibility (e.g. HR < 30 or > 240), or has partial sensor contact.',
    userFacingGuidance: 'Data quality check: Some readings could not be verified for freshness. Baseline comparison paused until current readings are confirmed.',
    referenceSource: 'Input Verification Protocol',
    clinicalValidationStatus: 'Prototype Demonstration (Requires Clinical Review)'
  }
];

export const MANDATORY_SAFETY_DISCLAIMER =
  'HealthShield AI is a preventive-health awareness and pattern-recognition prototype. It is NOT a medical device and does not diagnose disease or prescribe treatments. Safety rules represent prototype demonstration logic and require institutional clinical review prior to real-world clinical deployment.';
