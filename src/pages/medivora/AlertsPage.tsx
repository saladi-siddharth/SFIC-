import React, { useState } from 'react';

interface ClinicalAlert {
  id: string;
  patientName: string;
  room: string;
  priority: 'Priority 1 (Urgent)' | 'Priority 2 (Warning)' | 'Priority 3 (Advisory)';
  title: string;
  description: string;
  vitalsSnapshot: string;
  triggeredAt: string;
  ruleCode: string;
  status: 'Active' | 'Acknowledged' | 'Escalated';
}

const INITIAL_ALERTS: ClinicalAlert[] = [
  {
    id: 'alt_1',
    patientName: 'Sarah Vance',
    room: 'Bay 3A',
    priority: 'Priority 1 (Urgent)',
    title: 'Autonomic Tachycardia Departure (+19%)',
    description: 'Resting pulse reached 84 bpm sustained across 4 hours compared to established 62 bpm normal baseline.',
    vitalsSnapshot: 'HR: 84 bpm • BP: 138/88 • SpO2: 95%',
    triggeredAt: '8 mins ago',
    ruleCode: 'RULE-HS-WELL-001',
    status: 'Active'
  },
  {
    id: 'alt_2',
    patientName: 'David Okafor',
    room: 'ICU Stepdown 1A',
    priority: 'Priority 1 (Urgent)',
    title: 'Severe Arterial Hypertensive Rebound',
    description: 'Systolic blood pressure spiked to 152 mmHg. Mean arterial pressure elevation > 24% from baseline window.',
    vitalsSnapshot: 'HR: 92 bpm • BP: 152/96 • SpO2: 94%',
    triggeredAt: '14 mins ago',
    ruleCode: 'RULE-HS-WELL-004',
    status: 'Active'
  },
  {
    id: 'alt_3',
    patientName: 'Michael Davis',
    room: 'Pulmonary 2B',
    priority: 'Priority 1 (Urgent)',
    title: 'Sub-Threshold SpO2 Desaturation (<93%)',
    description: 'Pulse oximetry dropped below 93% on room air for 3 consecutive minutes. Oxygen delivery check required.',
    vitalsSnapshot: 'HR: 76 bpm • BP: 124/80 • SpO2: 92%',
    triggeredAt: '22 mins ago',
    ruleCode: 'RULE-HS-WELL-002',
    status: 'Active'
  },
  {
    id: 'alt_4',
    patientName: 'Robert Chen',
    room: 'Ward 4B',
    priority: 'Priority 2 (Warning)',
    title: 'Glycemic Variance Excursion Post-Meal',
    description: 'Sensor indicates rapid glycemic divergence post-lunch. Exceeds targeted delta bounds.',
    vitalsSnapshot: 'HR: 74 bpm • Glucose: 198 mg/dL',
    triggeredAt: '35 mins ago',
    ruleCode: 'RULE-HS-WELL-006',
    status: 'Active'
  },
  {
    id: 'alt_5',
    patientName: 'James Williams',
    room: 'Cardiology 3C',
    priority: 'Priority 2 (Warning)',
    title: 'Premature Ventricular Complex (PVC) Burst',
    description: 'Telemetry captured 6 unifocal PVCs within 60-second window. Serum potassium check ordered.',
    vitalsSnapshot: 'HR: 78 bpm • SpO2: 97%',
    triggeredAt: '48 mins ago',
    ruleCode: 'RULE-HS-WELL-007',
    status: 'Active'
  },
  {
    id: 'alt_6',
    patientName: 'Elena Rostova',
    room: 'Outpatient 2',
    priority: 'Priority 3 (Advisory)',
    title: 'Orthostatic Pulse Transit Time Delay',
    description: 'Subjective fatigue correlates with minor postural drop. Hydration protocol recommended.',
    vitalsSnapshot: 'HR: 68 bpm • BP: 116/74',
    triggeredAt: '1 hour ago',
    ruleCode: 'RULE-HS-WELL-003',
    status: 'Active'
  }
];

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<ClinicalAlert[]>(INITIAL_ALERTS);

  const handleAcknowledge = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Acknowledged' } : a));
  };

  const handleEscalate = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Escalated' } : a));
    alert('Alert escalated directly to Rapid Response Team & Attending Cardiologist.');
  };

  return (
    <div style={{ padding: '24px 32px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FEE2E2', color: '#DC2626', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
            <span>🚨</span>
            <span>ACTIVE CLINICAL ALERTS • 6 CRITICAL EVENTS PENDING TRIAGE</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Real-Time Clinical Alert Center
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
            Deterministic physiological threshold monitoring with automatic physician escalation pathways.
          </p>
        </div>

        <button
          onClick={() => {
            setAlerts(prev => prev.map(a => ({ ...a, status: 'Acknowledged' })));
          }}
          style={{ background: '#F1F5F9', color: '#0F172A', border: '1px solid #CBD5E1', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          Acknowledge All Non-Urgent
        </button>
      </div>

      {/* Alerts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {alerts.map(a => (
          <div
            key={a.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: '20px 24px',
              borderLeft: a.priority.includes('Urgent') ? '6px solid #DC2626' : a.priority.includes('Warning') ? '6px solid #D97706' : '6px solid #2563EB',
              borderTop: '1px solid #E2E8F0',
              borderRight: '1px solid #E2E8F0',
              borderBottom: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16
            }}
          >
            <div style={{ flex: '1 1 500px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span
                  style={{
                    background: a.priority.includes('Urgent') ? '#FEE2E2' : '#FEF3C7',
                    color: a.priority.includes('Urgent') ? '#991B1B' : '#92400E',
                    padding: '2px 8px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 800
                  }}
                >
                  {a.priority}
                </span>
                <strong style={{ fontSize: 14, color: '#0F172A' }}>{a.patientName}</strong>
                <span style={{ fontSize: 12, color: '#64748B' }}>({a.room})</span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>• {a.triggeredAt}</span>
                <code style={{ fontSize: 10, background: '#F1F5F9', padding: '1px 6px', borderRadius: 4, color: '#64748B' }}>
                  {a.ruleCode}
                </code>
              </div>

              <h3 style={{ margin: '0 0 4px 0', fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                {a.title}
              </h3>

              <p style={{ margin: '0 0 10px 0', fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                {a.description}
              </p>

              <div style={{ background: '#F8FAFC', padding: '6px 12px', borderRadius: 8, fontSize: 12, display: 'inline-block', fontWeight: 600, color: '#1E293B' }}>
                Snapshot: {a.vitalsSnapshot}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  disabled={a.status !== 'Active'}
                  onClick={() => handleAcknowledge(a.id)}
                  style={{
                    background: a.status === 'Acknowledged' ? '#DCFCE7' : '#F1F5F9',
                    color: a.status === 'Acknowledged' ? '#166534' : '#334155',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    padding: '8px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: a.status === 'Active' ? 'pointer' : 'default'
                  }}
                >
                  {a.status === 'Acknowledged' ? 'Acknowledged ✓' : 'Acknowledge'}
                </button>

                <button
                  disabled={a.status === 'Escalated'}
                  onClick={() => handleEscalate(a.id)}
                  style={{
                    background: a.status === 'Escalated' ? '#475569' : '#DC2626',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: a.status === 'Escalated' ? 'default' : 'pointer'
                  }}
                >
                  {a.status === 'Escalated' ? 'Escalated ⚠️' : 'Escalate to RTT'}
                </button>
              </div>

              <span style={{ fontSize: 11, color: '#94A3B8' }}>
                Status: <strong>{a.status}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
