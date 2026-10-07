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
