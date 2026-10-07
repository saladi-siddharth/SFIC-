/**
 * HealthShield AI — Clinical & Content Governance Registry
 * Enforces strict non-diagnostic boundary and clinician-reviewed safety rules.
 * HARD RULE: AI can explain a result; AI cannot override the safety engine.
 */

export interface HealthContentRule {
  ruleId: string;
  version: string;
  title: string;
  approvedWording: string;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  sourceReference: string;
  reviewer: string;
  reviewDate: string;
  nextReviewDate: string;
  status: 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED' | 'RETIRED';
}

export const HEALTH_CONTENT_RULES: HealthContentRule[] = [
  {
    ruleId: 'HS-WELL-001',
    version: '1.2',
    title: 'Prolonged Resting Tachycardia Shift',
    approvedWording: 'Resting heart rate has remained significantly above your 30-day baseline for multiple consecutive readings. Consider resting in a quiet posture, hydrating, and consulting a healthcare professional if accompanied by dizziness or shortness of breath.',
    riskLevel: 'MODERATE',
    sourceReference: 'AHA 2024 Resting HR Guidelines / ICMR Wellness Protocols',
    reviewer: 'Dr. S. K. Raman (MD, Prev. Med)',
    reviewDate: '2026-09-15',
    nextReviewDate: '2027-09-15',
    status: 'APPROVED'
  },
  {
    ruleId: 'HS-WELL-002',
    version: '1.1',
    title: 'Sub-Threshold SpO2 Desaturation',
    approvedWording: 'Oxygen saturation has trended lower than your personal baseline range. Verify sensor fit on clean, warm fingers. If reading remains below 94% or you experience difficulty breathing, seek immediate medical evaluation.',
    riskLevel: 'HIGH',
    sourceReference: 'WHO Pulse Oximetry Guidelines & ICMR COVID-19 Home Care',
    reviewer: 'Dr. V. Lakshmi (Pulmonology)',
    reviewDate: '2026-09-20',
    nextReviewDate: '2027-09-20',
    status: 'APPROVED'
  },
  {
    ruleId: 'HS-WELL-003',
    version: '1.0',
    title: 'Compound Sleep & Activity Depletion',
    approvedWording: 'Multiple days of short sleep (<5.5h) coupled with marked step count reduction indicate cumulative physical fatigue and decreased recovery capacity. Plan an early bedtime and lighter physical exertion.',
    riskLevel: 'LOW',
    sourceReference: 'National Sleep Foundation & CDC Healthy Living Standards',
    reviewer: 'Dr. K. Narayana (Behavioral Health)',
    reviewDate: '2026-10-01',
    nextReviewDate: '2027-10-01',
    status: 'APPROVED'
  }
];

export const MANDATORY_CLINICAL_DISCLAIMER =
  'HealthShield AI is a preventive-health awareness and pattern-recognition platform. It is NOT a diagnostic system. It does not replace medical advice, clinical diagnosis, or professional clinical consultation. Clinical review and regulatory assessment are required before clinical deployment or diagnostic use.';

export function getApprovedRule(ruleId: string): HealthContentRule | undefined {
  return HEALTH_CONTENT_RULES.find(r => r.ruleId === ruleId && r.status === 'APPROVED');
}
