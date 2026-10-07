/**
 * HealthShield AI - Data Quality Engine
 * Section 24: Data Quality Architecture
 * 
 * INPUT -> VALIDATION -> MISSING DATA CHECK -> OUTLIER / IMPOSSIBLE VALUE CHECK -> BASELINE COMPARISON
 * 
 * Safety Rule: Reject obviously invalid inputs; provide helpful feedback on unusual inputs.
 * "This value looks unusual. Please verify it before using it in your personal pattern."
 */

export interface ValidationResult {
  isValid: boolean;
  isUnusual: boolean;
  value: number;
  message?: string;
  category: 'valid' | 'unusual' | 'rejected';
}

export const DATA_QUALITY_BOUNDS = {
  heartRate: {
    minPossible: 30,
    maxPossible: 240,
    minUsual: 45,
    maxUsual: 115,
    unit: 'BPM',
    label: 'Resting Heart Rate'
  },
  temperature: {
    minPossible: 92.0,
    maxPossible: 108.0,
    minUsual: 96.5,
    maxUsual: 99.8,
    unit: '°F',
    label: 'Body Temperature'
  },
  sleepHours: {
    minPossible: 0,
    maxPossible: 24,
    minUsual: 3.5,
    maxUsual: 13.0,
    unit: 'hrs',
    label: 'Sleep Duration'
  },
  steps: {
    minPossible: 0,
    maxPossible: 100000,
    minUsual: 500,
    maxUsual: 30000,
    unit: 'steps',
    label: 'Daily Steps'
  },
  bloodPressureSystolic: {
    minPossible: 60,
    maxPossible: 260,
    minUsual: 90,
    maxUsual: 150,
    unit: 'mmHg',
    label: 'Systolic Blood Pressure'
  },
  bloodPressureDiastolic: {
    minPossible: 40,
    maxPossible: 160,
    minUsual: 60,
    maxUsual: 100,
    unit: 'mmHg',
    label: 'Diastolic Blood Pressure'
  }
};

export class DataQualityEngine {
  /**
   * Validate a specific measurement
   */
  public static validateMetric(metricType: keyof typeof DATA_QUALITY_BOUNDS, value: number): ValidationResult {
    const bounds = DATA_QUALITY_BOUNDS[metricType];
    if (!bounds) {
      return { isValid: true, isUnusual: false, value, category: 'valid' };
    }

    // 1. Impossible / Invalid Check
    if (isNaN(value) || value < bounds.minPossible || value > bounds.maxPossible) {
      return {
        isValid: false,
        isUnusual: true,
        value,
        category: 'rejected',
        message: `Value (${value} ${bounds.unit}) is physiologically impossible for ${bounds.label} (Allowed: ${bounds.minPossible}–${bounds.maxPossible} ${bounds.unit}).`
      };
    }

    // 2. Unusual Outlier Check
    if (value < bounds.minUsual || value > bounds.maxUsual) {
      return {
        isValid: true,
        isUnusual: true,
        value,
        category: 'unusual',
        message: `This value (${value} ${bounds.unit}) looks unusual. Please verify it before using it in your personal pattern.`
      };
    }

    return {
      isValid: true,
      isUnusual: false,
      value,
      category: 'valid'
    };
  }

  /**
   * Batch validate a daily checkin or measurement set
   */
  public static validateDailyTelemetry(telemetry: {
    sleepHours?: number;
    heartRate?: number;
    steps?: number;
    temperature?: number;
  }): { hasErrors: boolean; hasWarnings: boolean; reports: Record<string, ValidationResult> } {
    const reports: Record<string, ValidationResult> = {};
    let hasErrors = false;
    let hasWarnings = false;

    if (telemetry.sleepHours !== undefined) {
      reports.sleepHours = this.validateMetric('sleepHours', telemetry.sleepHours);
      if (!reports.sleepHours.isValid) hasErrors = true;
      if (reports.sleepHours.isUnusual) hasWarnings = true;
    }

    if (telemetry.heartRate !== undefined) {
      reports.heartRate = this.validateMetric('heartRate', telemetry.heartRate);
      if (!reports.heartRate.isValid) hasErrors = true;
      if (reports.heartRate.isUnusual) hasWarnings = true;
    }

    if (telemetry.steps !== undefined) {
      reports.steps = this.validateMetric('steps', telemetry.steps);
      if (!reports.steps.isValid) hasErrors = true;
      if (reports.steps.isUnusual) hasWarnings = true;
    }

    if (telemetry.temperature !== undefined) {
      reports.temperature = this.validateMetric('temperature', telemetry.temperature);
      if (!reports.temperature.isValid) hasErrors = true;
      if (reports.temperature.isUnusual) hasWarnings = true;
    }

    return { hasErrors, hasWarnings, reports };
  }
}
