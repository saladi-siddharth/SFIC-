export interface MetricData {
  id: string;
  name: string;
  icon: string;
  unit: string;
  baselineAvg: number;
  baselineMin: number;
  baselineMax: number;
  todayValue: number;
  deltaPercent: number;
  status: 'stable' | 'monitor' | 'changed' | 'alert';
  description: string;
}

export interface CheckInState {
  mood: 'good' | 'okay' | 'not_well';
  energy: number; // 1-10
  sleepQuality: 'restful' | 'restless' | 'insomnia';
  sleepHours: number;
  symptoms: string[];
  notes: string;
  voiceTranscript: string;
  timestamp: string;
}

export interface AnomalyReport {
  patternStatus: 'STABLE' | 'EMERGING CHANGE' | 'SIGNIFICANT CHANGE';
  flaggedSignalsCount?: number;
  overallRiskScore?: number;
  divergenceLevel: 'none' | 'mild' | 'moderate' | 'significant';
  flaggedMetrics: string[];
  clinicalRationale: string;
  boundaryWarning: string;
  ruleTriggered: {
    id: string;
    name: string;
    condition: string;
    action: string;
  };
  recommendedSteps: {
    priority: number;
    title: string;
    description: string;
    urgency: 'immediate' | 'within_hours' | 'routine';
  }[];
}

export interface DayHistoryPoint {
  day: number;
  date: string;
  heartRate: number;
  hrv: number;
  sleepHours: number;
  temp: number;
  spo2: number;
  activitySteps: number;
  isBaseline: boolean;
}

// ==========================================
// MASTER PRODUCT DATA MODELS (SECTION 23)
// ==========================================

export interface UserProfile {
  // ABOUT ME
  id: string;
  name: string;
  age: number;
  gender?: 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';
  heightCm?: number;
  weightKg?: number;
  
  // MY ROUTINE
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  typicalSleepHours: number;
  typicalStepGoal: number;

  // HEALTH CONTEXT (Optional, user-entered, non-diagnostic)
  conditions: string[];
  allergies: string[];
  medications: string[];

  // SAFETY
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };

  // ACCESSIBILITY
  preferredLanguage: 'en' | 'te' | 'hi';
  accessibilityPreferences: AccessibilityPreference;

  // PRIVACY
  trustedContact: TrustedContact;
  privacyPreferences: PrivacyPreference;

  updatedAt: string;
}

export interface AccessibilityPreference {
  simpleMode: boolean;
  largeText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  voiceAssistance: boolean;
  screenReaderOptimized: boolean;
}

export interface TrustedContact {
  name: string;
  relationship: string;
  contactMethod: 'sms' | 'email' | 'phone';
  contactValue: string;
  shareCheckInStatus: boolean;
  shareAlertSummary: boolean;
  lastNotified?: string;
}

export interface PrivacyPreference {
  storeObservationsLocally: boolean;
  storeMeasurementsLocally: boolean;
  localInferenceOnly: boolean;
  sharingEnabled: boolean;
  allowTrustedContactAccess: boolean;
  retentionDays: number;
}

export interface HealthMeasurement {
  id: string;
  heartRate?: number;
  temperature?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  steps?: number;
  sleepHours?: number;
  source: 'manual' | 'simulated_demo' | 'device_adapter';
  timestamp: string;
  isValidated: boolean;
}

export interface BaselineSnapshot {
  userId: string;
  calculatedAt: string;
  totalDaysObserved: number;
  isStable: boolean;
  metrics: {
    metric: string;
    average: number;
    variationStdDev: number;
    minTypical: number;
    maxTypical: number;
    trendDirection: 'stable' | 'increasing' | 'decreasing';
    signalConsistency: number; // 0-100%
  }[];
}

export interface HealthChange {
  id: string;
  detectedAt: string;
  changeLevel: 'STABLE' | 'WATCH' | 'CHANGE DETECTED';
  flaggedSignals: string[];
  summary: string;
  observedChanges: {
    signal: string;
    typical: string;
    today: string;
    changePercentage: number;
  }[];
}

export interface AIExplanation {
  whatChanged: string;
  whyFlagged: string[];
  whatWeKnow: string;
  whatWeDoNotKnow: string;
  nextSteps: string[];
  disclaimer: string;
}
