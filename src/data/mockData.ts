import type { MetricData, CheckInState, AnomalyReport, DayHistoryPoint } from '../types/health';

export const INITIAL_METRICS: MetricData[] = [
  {
    id: 'heart_rate',
    name: 'Resting Heart Rate',
    icon: 'favorite',
    unit: 'bpm',
    baselineAvg: 62,
    baselineMin: 58,
    baselineMax: 66,
    todayValue: 74,
    deltaPercent: 19.3,
    status: 'changed',
    description: 'Elevated by +12 bpm above personal 30-day baseline'
  },
  {
    id: 'hrv',
    name: 'Heart Rate Variability (rMSSD)',
    icon: 'vital_signs',
    unit: 'ms',
    baselineAvg: 55,
    baselineMin: 48,
    baselineMax: 64,
    todayValue: 38,
    deltaPercent: -30.9,
    status: 'changed',
    description: 'Parasympathetic recovery score decreased by 30%'
  },
  {
    id: 'spo2',
    name: 'Blood Oxygen (SpO₂)',
    icon: 'air',
    unit: '%',
    baselineAvg: 98.2,
    baselineMin: 96.5,
    baselineMax: 99.5,
    todayValue: 97.4,
    deltaPercent: -0.8,
    status: 'stable',
    description: 'Within established safe baseline corridor'
  },
  {
    id: 'temp',
    name: 'Dermal / Core Temp',
    icon: 'device_thermostat',
    unit: '°F',
    baselineAvg: 98.4,
    baselineMin: 97.8,
    baselineMax: 98.8,
    todayValue: 99.1,
    deltaPercent: 0.7,
    status: 'monitor',
    description: 'Thermal drift +0.7°F above typical diurnal rhythm'
  },
  {
    id: 'sleep',
    name: 'Sleep Duration & Architecture',
    icon: 'bedtime',
    unit: 'hrs',
    baselineAvg: 8.1,
    baselineMin: 7.2,
    baselineMax: 8.8,
    todayValue: 5.2,
    deltaPercent: -35.8,
    status: 'changed',
    description: 'Fragmented sleep with reduced deep REM recovery'
  },
  {
    id: 'activity',
    name: 'Daily Movement & Steps',
    icon: 'directions_walk',
    unit: 'steps',
    baselineAvg: 8400,
    baselineMin: 6500,
    baselineMax: 10500,
    todayValue: 3240,
    deltaPercent: -61.4,
    status: 'monitor',
    description: 'Significant reduction in daily locomotion'
  },
  {
    id: 'wellness',
    name: 'Subjective Well-being',
    icon: 'mood',
    unit: '/10',
    baselineAvg: 7.8,
    baselineMin: 6.5,
    baselineMax: 9.0,
    todayValue: 4.0,
    deltaPercent: -48.7,
    status: 'changed',
    description: 'Self-reported energy and feeling dropped significantly'
  }
];

export const INITIAL_CHECKIN: CheckInState = {
  mood: 'not_well',
  energy: 4,
  sleepQuality: 'restless',
  sleepHours: 5.2,
  symptoms: ['Fatigue', 'Mild Headache', 'Elevated Strain'],
  notes: 'Woke up feeling unusually groggy and slight pressure in temples.',
  voiceTranscript: 'I woke up feeling groggy with a mild head pressure, took longer to fall asleep and heart feels slightly faster than usual.',
  timestamp: 'Today, 07:15 AM'
};

export const INITIAL_ANOMALY_REPORT: AnomalyReport = {
  patternStatus: 'SIGNIFICANT CHANGE',
  flaggedSignalsCount: 3,
  divergenceLevel: 'moderate',
  flaggedMetrics: ['Sleep Duration (↓ 35%)', 'HRV Recovery (↓ 30%)', 'Resting HR (↑ 19%)', 'Thermal Drift (+0.7°F)'],
  clinicalRationale: "Today's observations differ from your recent personal 30-day pattern across multiple signals (sleep deficit, resting heart rate shift, and recorded temperature). HealthShield does not determine the medical cause of this change.",
  boundaryWarning: 'Safety Safeguard: HealthShield AI is not a diagnostic device. It detects early deviations from personal baselines to prompt timely, safe preventive awareness before acute escalation.',
  ruleTriggered: {
    id: 'HS-RULE-001',
    name: 'Multi-Signal Baseline Deviation Guardrail',
    condition: 'Resting HR ↑ >15% AND HRV ↓ >25% AND Sleep ↓ >30% over 48h rolling window',
    action: 'Flag priority-2 preventive advisory; recommend hydration, rest, and pattern monitoring'
  },
  recommendedSteps: [
    {
      priority: 1,
      title: 'Rest & Oral Hydration Protocol',
      description: 'Consume 500ml water or electrolytes, avoid high-intensity exertion, and rest before re-checking vitals.',
      urgency: 'immediate'
    },
    {
      priority: 2,
      title: 'Temperature Logging in 4 Hours',
      description: 'Log core temperature at 12:00 PM to verify if thermal drift resolves or persists.',
      urgency: 'within_hours'
    },
    {
      priority: 3,
      title: 'Share Telemetry Delta with Trusted Support',
      description: 'Share encrypted summary with your healthcare provider or trusted family member if unusual readings persist.',
      urgency: 'routine'
    }
  ]
};

// Generate 30 days of synthetic baseline history
export const GENERATE_30_DAY_HISTORY = (): DayHistoryPoint[] => {
  const points: DayHistoryPoint[] = [];
  const baseDate = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - i);
    const isToday = i === 0;
    
    if (isToday) {
      points.push({
        day: 30 - i,
        date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        heartRate: 74,
        hrv: 38,
        sleepHours: 5.2,
        temp: 99.1,
        spo2: 97.4,
        activitySteps: 3240,
        isBaseline: false
      });
    } else {
      // Natural subtle variation around healthy personal baseline
      const jitter = (Math.random() - 0.5) * 4;
      points.push({
        day: 30 - i,
        date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        heartRate: Math.round(62 + jitter),
        hrv: Math.round(55 + jitter * 1.5),
        sleepHours: parseFloat((8.0 + (Math.random() - 0.5) * 0.8).toFixed(1)),
        temp: parseFloat((98.4 + (Math.random() - 0.5) * 0.3).toFixed(1)),
        spo2: parseFloat((98.2 + (Math.random() - 0.5) * 0.6).toFixed(1)),
        activitySteps: Math.round(8400 + (Math.random() - 0.5) * 1200),
        isBaseline: true
      });
    }
  }
  return points;
};
