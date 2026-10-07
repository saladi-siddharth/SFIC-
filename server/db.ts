/**
 * HealthShield AI — Dual Engine Database Adapter
 * Supports PostgreSQL in production and in-memory/JSON store for local/demo mode.
 */

export interface HealthObservation {
  id: string;
  userId: string;
  metric: string;
  value: number;
  unit: string;
  timestamp: string;
  sourceType: 'MANUAL' | 'SELF_REPORTED' | 'DEVICE' | 'IMPORTED' | 'SIMULATED';
  sourceName: string;
  deviceId?: string;
  qualityStatus: 'VALID' | 'PARTIAL' | 'SUSPICIOUS' | 'REJECTED';
  userConsentContext: string;
  idempotencyKey?: string;
  createdAt: string;
}

export interface ConsentRecord {
  id: string;
  userId: string;
  purposeKey: string;
  purposeTitle: string;
  dataCategories: string;
  recipientType: string;
  retentionPeriod: string;
  isGranted: boolean;
  grantedAt?: string;
  withdrawnAt?: string;
  version: string;
}

export interface AuditEvent {
  id: string;
  userId?: string;
  eventType: string;
  description: string;
  metadata?: Record<string, unknown>;
  actorIp: string;
  createdAt: string;
}

export interface PilotProgram {
  id: string;
  title: string;
  organizationName: string;
  cohortName: string;
  targetParticipants: number;
  durationDays: number;
  startDate: string;
  endDate: string;
  status: 'PLANNED' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
}

class DatabaseStore {
  public observations: HealthObservation[] = [];
  public consents: Map<string, ConsentRecord> = new Map();
  public auditEvents: AuditEvent[] = [];
  public checkins: Array<{
    id: string;
    userId: string;
    checkinDate: string;
    wellbeingScore: string;
    energyLevel: string;
    stressLevel: string;
    symptomsNoted: string;
    sleepReportedHours: number;
    sourceType: string;
    createdAt: string;
  }> = [];
  public feedbacks: Array<{
    id: string;
    alertId?: string;
    wasExplanationHelpful: 'YES' | 'PARTLY' | 'NO';
    wasNextStepClear: 'YES' | 'NO';
    comments?: string;
    createdAt: string;
  }> = [];

  constructor() {
    this.seedDemoData();
  }

  private seedDemoData() {
    // Default DPDP Purpose Consents for Demo User
    const defaultConsents: Omit<ConsentRecord, 'id' | 'userId'>[] = [
      {
        purposeKey: 'health_observations',
        purposeTitle: 'Continuous Health Observations',
        dataCategories: 'Heart rate, SpO2, sleep duration, physical activity steps',
        recipientType: 'HealthShield Edge Analysis Engine',
        retentionPeriod: '30-day rolling baseline window',
        isGranted: true,
        grantedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        version: 'v1.2'
      },
      {
        purposeKey: 'daily_checkins',
        purposeTitle: 'Daily Subjective Wellness Check-ins',
        dataCategories: 'Self-reported fatigue, sleep quality, stress score, symptom notes',
        recipientType: 'Personal Wellness Correlation Engine',
        retentionPeriod: '60 days or until user account deletion',
        isGranted: true,
        grantedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        version: 'v1.2'
      },
      {
        purposeKey: 'trend_analysis',
        purposeTitle: 'Personal Baseline & Trend Detection',
        dataCategories: 'Mathematical deviation, rolling mean, standard deviations',
        recipientType: 'Local Deterministic Pattern Engine',
        retentionPeriod: 'Active session lifetime',
        isGranted: true,
        grantedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        version: 'v1.2'
      },
      {
        purposeKey: 'ai_explanation',
        purposeTitle: 'Natural Language Alert Explanation',
        dataCategories: 'Structured change summaries only (No raw biometric telemetry)',
        recipientType: 'Bound Explanation Model (Deterministic Guardrails)',
        retentionPeriod: 'Ephemeral query duration',
        isGranted: true,
        grantedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        version: 'v1.2'
      },
      {
        purposeKey: 'trusted_contacts',
        purposeTitle: 'Trusted Family / Caregiver Circle Sharing',
        dataCategories: 'High-level pattern shift summaries only (Never raw logs)',
        recipientType: 'Authorized Caregiver / Family Contact',
        retentionPeriod: 'Revocable on demand',
        isGranted: false,
        version: 'v1.2'
      },
      {
        purposeKey: 'voice_processing',
        purposeTitle: 'Local Voice Accessibility Assistance',
        dataCategories: 'Browser-native speech input commands',
        recipientType: 'Client-side Speech API (Zero external transmission)',
        retentionPeriod: 'Not stored',
        isGranted: false,
        version: 'v1.2'
      },
      {
        purposeKey: 'institutional_sharing',
        purposeTitle: 'Aggregated Institutional Pilot Reporting',
        dataCategories: 'K-anonymized cohort adherence rates (No personal identifiers)',
        recipientType: 'Campus Wellness Administrator',
        retentionPeriod: 'Duration of pilot program',
        isGranted: false,
        version: 'v1.2'
      },
      {
        purposeKey: 'research_analytics',
        purposeTitle: 'Anonymized Preventative Research Dataset',
        dataCategories: 'De-identified aggregate statistical distributions',
        recipientType: 'Academic Research Partners (Governed by DPDP Act)',
        retentionPeriod: 'Until pilot conclusion',
        isGranted: false,
        version: 'v1.2'
      }
    ];

    defaultConsents.forEach((c, idx) => {
      this.consents.set(c.purposeKey, {
        id: `cns_${idx + 1}`,
        userId: 'demo_user_polytechnic_01',
        ...c
      });
    });

    // Seed Sample Observations with full Provenance
    const now = Date.now();
    const demoObs: HealthObservation[] = [
      {
        id: 'obs_01',
        userId: 'demo_user_polytechnic_01',
        metric: 'heart_rate',
        value: 78,
        unit: 'BPM',
        timestamp: new Date(now - 15 * 60000).toISOString(),
        sourceType: 'SIMULATED',
        sourceName: 'Simulated Wearable Adapter (BLE PPG)',
        deviceId: 'SIM-BLE-0842',
        qualityStatus: 'VALID',
        userConsentContext: 'health_observations',
        createdAt: new Date(now - 15 * 60000).toISOString()
      },
      {
        id: 'obs_02',
        userId: 'demo_user_polytechnic_01',
        metric: 'spo2',
        value: 95,
        unit: '%',
        timestamp: new Date(now - 30 * 60000).toISOString(),
        sourceType: 'SIMULATED',
        sourceName: 'Simulated Wearable Adapter (Pulse Oximeter)',
        deviceId: 'SIM-BLE-0842',
        qualityStatus: 'VALID',
        userConsentContext: 'health_observations',
        createdAt: new Date(now - 30 * 60000).toISOString()
      },
      {
        id: 'obs_03',
        userId: 'demo_user_polytechnic_01',
        metric: 'sleep_hours',
        value: 5.4,
        unit: 'hrs',
        timestamp: new Date(now - 4 * 3600000).toISOString(),
        sourceType: 'SELF_REPORTED',
        sourceName: 'Daily Subjective Check-in',
        qualityStatus: 'VALID',
        userConsentContext: 'daily_checkins',
        createdAt: new Date(now - 4 * 3600000).toISOString()
      },
      {
        id: 'obs_04',
        userId: 'demo_user_polytechnic_01',
        metric: 'steps',
        value: 4900,
        unit: 'steps',
        timestamp: new Date(now - 6 * 3600000).toISOString(),
        sourceType: 'DEVICE',
        sourceName: 'Campus Pedometer / Activity Tracker',
        deviceId: 'PED-ACT-102',
        qualityStatus: 'VALID',
        userConsentContext: 'health_observations',
        createdAt: new Date(now - 6 * 3600000).toISOString()
      }
    ];

    this.observations.push(...demoObs);

    // Seed Initial Audit Events
    this.auditEvents.push(
      {
        id: 'aud_01',
        userId: 'demo_user_polytechnic_01',
        eventType: 'CONSENT_INITIALIZED',
        description: 'DPDP Notice presented and initial core consents granted by participant.',
        actorIp: '127.0.0.1',
        createdAt: new Date(now - 30 * 86400000).toISOString()
      },
      {
        id: 'aud_02',
        userId: 'demo_user_polytechnic_01',
        eventType: 'BASELINE_CALCULATED',
        description: 'Personal 30-day baseline established across resting HR, SpO2, sleep and steps.',
        actorIp: '127.0.0.1',
        createdAt: new Date(now - 2 * 86400000).toISOString()
      },
      {
        id: 'aud_03',
        userId: 'demo_user_polytechnic_01',
        eventType: 'PATTERN_SHIFT_FLAGGED',
        description: 'Multi-parameter covariance shift detected: Resting HR (+8.3%) and Sleep (-23.9%).',
        actorIp: '127.0.0.1',
        createdAt: new Date(now - 15 * 60000).toISOString()
      }
    );
  }
}

export const db = new DatabaseStore();
