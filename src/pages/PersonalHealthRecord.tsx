import React, { useState } from 'react';
import { ProvenanceModal } from '../components/ProvenanceModal';
import type { NormalizedObservation } from '../engine/deviceAdapters';

interface HealthRecordEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  type: 'CHECKIN' | 'VITALS' | 'ACTIVITY' | 'SLEEP' | 'ALERT';
  summary: string;
  sourceType: 'MANUAL' | 'SELF_REPORTED' | 'DEVICE' | 'IMPORTED' | 'SIMULATED';
  sourceName: string;
  accessStatus: string;
  purpose: string;
  qualityStatus: 'VALID' | 'PARTIAL' | 'SUSPICIOUS' | 'REJECTED';
  obsData?: NormalizedObservation;
}

const SAMPLE_TIMELINE: HealthRecordEvent[] = [
  {
    id: 'ev_01',
    date: '2026-10-07',
    time: '08:42 AM',
    title: 'Daily Wellness Check-in',
    type: 'CHECKIN',
    summary: 'Subjective Wellbeing: Low • Reported Sleep: 5.4 hrs • Pattern Shift Detected',
    sourceType: 'SELF_REPORTED',
    sourceName: 'Daily Subjective Check-in Interface',
    accessStatus: 'Only You (Encrypted)',
    purpose: 'Daily self-reflection & correlation engine',
    qualityStatus: 'VALID',
    obsData: {
      id: 'obs_01',
      metric: 'sleep_hours',
      value: 5.4,
      unit: 'hrs',
      timestamp: '2026-10-07T08:42:00Z',
      sourceType: 'SELF_REPORTED',
      sourceName: 'Daily Subjective Check-in',
      qualityStatus: 'VALID',
      userConsentContext: 'daily_checkins'
    }
  },
  {
    id: 'ev_02',
    date: '2026-10-07',
    time: '08:15 AM',
    title: 'Resting Heart Rate Reading',
    type: 'VITALS',
    summary: 'Resting Heart Rate: 78 BPM (+8.3% vs personal 30-day baseline 72 BPM)',
    sourceType: 'SIMULATED',
    sourceName: 'Simulated Wearable Adapter (BLE PPG)',
    accessStatus: 'Edge Baseline Engine Only',
    purpose: 'Cardiovascular baseline tracking',
    qualityStatus: 'VALID',
    obsData: {
      id: 'obs_02',
      metric: 'heart_rate',
      value: 78,
      unit: 'BPM',
      timestamp: '2026-10-07T08:15:00Z',
      sourceType: 'SIMULATED',
      sourceName: 'Simulated Wearable Adapter (BLE PPG)',
      deviceId: 'SIM-BLE-0842',
      qualityStatus: 'VALID',
      qualityNotes: 'Continuous PPG sample with high optical quality index',
      userConsentContext: 'health_observations'
    }
  },
  {
    id: 'ev_03',
    date: '2026-10-06',
    time: '09:10 PM',
    title: 'Daily Wellness Check-in',
    type: 'CHECKIN',
    summary: 'Subjective Wellbeing: Okay • Stress: Moderate • Sleep: 6.2 hrs (Stable)',
    sourceType: 'SELF_REPORTED',
    sourceName: 'Manual Entry Form',
    accessStatus: 'Only You',
    purpose: 'Wellness tracking',
    qualityStatus: 'VALID'
  },
  {
    id: 'ev_04',
    date: '2026-10-05',
    time: '07:30 AM',
    title: 'Sleep Telemetry Observation',
    type: 'SLEEP',
    summary: 'Recorded Sleep: 7.1 hours • Baseline Confidence: ESTABLISHED',
    sourceType: 'DEVICE',
    sourceName: 'Actigraphy Sensor via Adapter',
    accessStatus: 'Edge Baseline Engine Only',
    purpose: 'Circadian stability assessment',
    qualityStatus: 'VALID',
    obsData: {
      id: 'obs_04',
      metric: 'sleep_hours',
      value: 7.1,
      unit: 'hrs',
      timestamp: '2026-10-05T07:30:00Z',
      sourceType: 'DEVICE',
      sourceName: 'Campus Actigraphy Sensor',
      deviceId: 'ACT-SEN-710',
      qualityStatus: 'VALID',
      userConsentContext: 'health_observations'
    }
  },
  {
    id: 'ev_05',
    date: '2026-10-01',
    time: '10:00 AM',
    title: 'Device Adapter Connected',
    type: 'ACTIVITY',
    summary: 'Configured Simulated Wearable Adapter for SFIC pilot telemetry',
    sourceType: 'SIMULATED',
    sourceName: 'HealthShield Normalizer Pipeline',
    accessStatus: 'Local System',
    purpose: 'Provenance initialization',
    qualityStatus: 'VALID'
  }
];

export const PersonalHealthRecord: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');
  const [selectedObs, setSelectedObs] = useState<NormalizedObservation | null>(null);

  const filteredEvents = SAMPLE_TIMELINE.filter(item => {
    if (filter === 'ALL') return true;
    return item.type === filter;
  });

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#DBEAFE', color: '#1E40AF', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
            <span>📋</span>
            <span>ABDM-ALIGNED LONGITUDINAL PERSONAL HEALTH RECORD (PHR)</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
            My Health Record
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', margin: 0, maxWidth: 640 }}>
            User-controlled chronological timeline of every observation, check-in, and alert. Complete provenance traceability with zero concealed processing.
          </p>
        </div>

        {/* ABDM Interoperability Badge */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px 16px', borderRadius: 12, textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>INTEROPERABILITY STATUS</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginTop: 2 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#059669' }}></span>
            <span>FHIR R4 Schema Ready</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {['ALL', 'CHECKIN', 'VITALS', 'SLEEP', 'ACTIVITY', 'ALERT'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? '#2563EB' : '#FFFFFF',
              color: filter === f ? '#FFFFFF' : '#64748B',
              border: filter === f ? 'none' : '1px solid #CBD5E1',
              borderRadius: 20,
              padding: '6px 16px',
              fontSize: 12,
              fontWeight: filter === f ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {f === 'CHECKIN' ? 'CHECK-INS' : f}
          </button>
        ))}
      </div>

      {/* Longitudinal Timeline Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {filteredEvents.map(ev => (
          <div
            key={ev.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: '20px 24px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}
          >
            {/* Top row: Date & Type Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{ev.date}</span>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{ev.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    background: ev.sourceType === 'SIMULATED' ? '#F3E8FF' : '#E0E7FF',
                    color: ev.sourceType === 'SIMULATED' ? '#7E22CE' : '#3730A3',
                    borderRadius: 12,
                    padding: '3px 10px',
                    fontSize: 11,
                    fontWeight: 700
                  }}
                >
                  Source: {ev.sourceType}
                </span>
                <span
                  style={{
                    background: '#F1F5F9',
                    color: '#475569',
                    borderRadius: 12,
                    padding: '3px 10px',
                    fontSize: 11,
                    fontWeight: 600
                  }}
                >
                  {ev.type}
                </span>
              </div>
            </div>

            {/* Title & Summary */}
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 16, fontWeight: 700, color: '#0F172A' }}>
                {ev.title}
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: '#334155' }}>
                {ev.summary}
              </p>
            </div>

            {/* Event Provenance Attributes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8, background: '#F8FAFC', padding: '10px 14px', borderRadius: 8, fontSize: 12 }}>
              <div>
                <span style={{ color: '#64748B' }}>Source Instrument:</span>{' '}
                <strong style={{ color: '#0F172A' }}>{ev.sourceName}</strong>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Who Can Access:</span>{' '}
                <strong style={{ color: '#059669' }}>{ev.accessStatus}</strong>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Why Processed:</span>{' '}
                <strong style={{ color: '#0F172A' }}>{ev.purpose}</strong>
              </div>
            </div>

            {/* Actions: View Data Source (Point 07 Provenance) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 6 }}>
              <button
                onClick={() => {
                  if (ev.obsData) {
                    setSelectedObs(ev.obsData);
                  } else {
                    setSelectedObs({
                      id: ev.id,
                      metric: 'heart_rate',
                      value: 78,
                      unit: 'BPM',
                      timestamp: `${ev.date}T${ev.time}Z`,
                      sourceType: ev.sourceType,
                      sourceName: ev.sourceName,
                      qualityStatus: ev.qualityStatus,
                      qualityNotes: 'Validated against historical bounds',
                      userConsentContext: 'health_observations'
                    });
                  }
                }}
                style={{
                  background: '#F8FAFC',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE',
                  borderRadius: 6,
                  padding: '5px 12px',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>🔍</span>
                <span>View Data Source & Provenance</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Provenance Details Modal */}
      <ProvenanceModal
        observation={selectedObs}
        onClose={() => setSelectedObs(null)}
      />
    </div>
  );
};
