import React, { useState } from 'react';

interface ConsentItem {
  id: string;
  key: string;
  title: string;
  description: string;
  dataUsed: string;
  recipient: string;
  retention: string;
  isAllowed: boolean;
  version: string;
}

const INITIAL_CONSENTS: ConsentItem[] = [
  {
    id: 'cns_1',
    key: 'health_observations',
    title: 'Health Telemetry Observations',
    description: 'Collection of resting heart rate, oxygen saturation, and activity readings to compute baseline deviations.',
    dataUsed: 'Resting HR (BPM), SpO2 (%), Sleep duration (hrs), Steps',
    recipient: 'Edge Baseline Analysis Engine (Local/Encrypted)',
    retention: '30-day rolling baseline window',
    isAllowed: true,
    version: 'DPDP-v1.2'
  },
  {
    id: 'cns_2',
    key: 'daily_checkins',
    title: 'Daily Subjective Wellness Check-ins',
    description: 'Subjective wellness reflections (fatigue, sleep satisfaction, stress level).',
    dataUsed: 'Wellbeing rating, stress score, reported sleep hours',
    recipient: 'Personal Trend Correlation Engine',
    retention: '60 days or until user account deletion',
    isAllowed: true,
    version: 'DPDP-v1.2'
  },
  {
    id: 'cns_3',
    key: 'trend_analysis',
    title: 'Mathematical Trend & Covariance Analysis',
    description: 'Evaluating variance between recent multi-day telemetry and 30-day established baseline.',
    dataUsed: 'Statistical averages, standard deviations, shift delta',
    recipient: 'Deterministic Pattern Engine HS-WELL',
    retention: 'Duration of active monitoring',
    isAllowed: true,
    version: 'DPDP-v1.2'
  },
  {
    id: 'cns_4',
    key: 'ai_explanation',
    title: 'AI Explanation & Natural Language Guidance',
    description: 'Translating structured mathematical changes into plain-language guidance with clinician guardrails.',
    dataUsed: 'Aggregated delta summaries only (Never raw telemetry)',
    recipient: 'Bound AI Explanation Layer (Cannot override safety engine)',
    retention: 'Ephemeral request duration (Zero prompt logging)',
    isAllowed: true,
    version: 'DPDP-v1.2'
  },
  {
    id: 'cns_5',
    key: 'trusted_contacts',
    title: 'Trusted Circle & Family Sharing',
    description: 'Transmitting high-level trend notices to nominated caregivers or family members.',
    dataUsed: 'Sleep trend summary, alert severity (Never raw logs)',
    recipient: 'Nominated Trusted Contact Email/SMS',
    retention: 'Immediate transmission log; revocable on demand',
    isAllowed: false,
    version: 'DPDP-v1.2'
  },
  {
    id: 'cns_6',
    key: 'voice_processing',
    title: 'Browser Speech Recognition Assistance',
    description: 'Converting voice spoken input into daily check-in responses.',
    dataUsed: 'Voice audio stream (Processed 100% on-device)',
    recipient: 'Client-side Web Speech API (No external server)',
    retention: 'Zero audio recording retention',
    isAllowed: false,
    version: 'DPDP-v1.2'
  },
  {
    id: 'cns_7',
    key: 'institutional_sharing',
    title: 'Campus / Institutional Aggregate Reporting',
    description: 'Sharing k-anonymized cohort adherence rates with institution coordinators.',
    dataUsed: 'De-identified completion rates (Zero individual names or vitals)',
    recipient: 'Campus Wellness Administrator',
    retention: 'Pilot program duration (30 days)',
    isAllowed: false,
    version: 'DPDP-v1.2'
  },
  {
    id: 'cns_8',
    key: 'research_use',
    title: 'Anonymized Preventive Health Research',
    description: 'Contributing de-identified baseline variance distributions to public health studies.',
    dataUsed: 'Completely unlinked statistical variance histograms',
    recipient: 'Academic Research Partners under DPDP Act clearance',
    retention: '12 months following study completion',
    isAllowed: false,
    version: 'DPDP-v1.2'
  }
];

export const ConsentCenter: React.FC = () => {
  const [consents, setConsents] = useState<ConsentItem[]>(INITIAL_CONSENTS);
  const [history, setHistory] = useState<Array<{ time: string; text: string }>>([
    { time: '2026-09-25 09:00', text: 'DPDP Notice accepted; core baseline consents authorized.' },
    { time: '2026-10-01 14:15', text: 'Voice accessibility permission checked and disabled.' }
  ]);
  const [activeTab, setActiveTab] = useState<'permissions' | 'notice' | 'history'>('permissions');

  const handleToggle = (key: string) => {
    setConsents(prev => prev.map(c => {
      if (c.key === key) {
        const nextState = !c.isAllowed;
        const entry = {
          time: new Date().toISOString().replace('T', ' ').substring(0, 16),
          text: `Permission "${c.title}" changed to ${nextState ? 'GRANTED' : 'WITHDRAWN'}.`
        };
        setHistory(h => [entry, ...h]);
        return { ...c, isAllowed: nextState };
      }
      return c;
    }));
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EDE9FE', color: '#6D28D9', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
            <span>🛡️</span>
            <span>DPDP ACT 2023 COMPLIANT • PURPOSE-DRIVEN ARCHITECTURE</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
            Consent & Privacy Center
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', margin: 0, maxWidth: 680 }}>
            Informed, purpose-specific consent controls. Privacy-first architecture with local data processing and user-controlled sharing. <em>Note: This prototype is not presented as legally certified or clinically compliant.</em>
          </p>
        </div>

        {/* Tab switchers */}
        <div style={{ display: 'flex', background: '#F1F5F9', padding: 4, borderRadius: 10, gap: 4 }}>
          <button
            onClick={() => setActiveTab('permissions')}
            style={{
              background: activeTab === 'permissions' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'permissions' ? '#0F172A' : '#64748B',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'permissions' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            Granular Permissions ({consents.filter(c => c.isAllowed).length}/{consents.length})
          </button>
          <button
            onClick={() => setActiveTab('notice')}
            style={{
              background: activeTab === 'notice' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'notice' ? '#0F172A' : '#64748B',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            DPDP Notice
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={{
              background: activeTab === 'history' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'history' ? '#0F172A' : '#64748B',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Consent History ({history.length})
          </button>
        </div>
      </div>

      {/* Permissions Tab */}
      {activeTab === 'permissions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {consents.map(item => (
            <div
              key={item.id}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '24px 28px',
                border: item.isAllowed ? '1px solid #C7D2FE' : '1px solid #E2E8F0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 20
              }}
            >
              <div style={{ flex: '1 1 500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#0F172A' }}>
                    {item.title}
                  </h3>
                  <span
                    style={{
                      background: item.isAllowed ? '#DCFCE7' : '#F1F5F9',
                      color: item.isAllowed ? '#166534' : '#64748B',
                      borderRadius: 12,
                      padding: '2px 8px',
                      fontSize: 11,
                      fontWeight: 700
                    }}
                  >
                    {item.isAllowed ? '✓ ALLOWED' : '✕ WITHDRAWN / OFF'}
                  </span>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>{item.version}</span>
                </div>

                <p style={{ fontSize: 13, color: '#475569', margin: '0 0 14px 0' }}>
                  {item.description}
                </p>

                {/* 4 Metadata Attributes Required by DPDP */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, background: '#F8FAFC', padding: '12px 16px', borderRadius: 10, fontSize: 12 }}>
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontWeight: 600 }}>Data Used:</span>
                    <strong style={{ color: '#1E293B' }}>{item.dataUsed}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontWeight: 600 }}>Recipient:</span>
                    <strong style={{ color: '#1E293B' }}>{item.recipient}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontWeight: 600 }}>Retention Period:</span>
                    <strong style={{ color: '#1E293B' }}>{item.retention}</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <button
                  onClick={() => handleToggle(item.key)}
                  style={{
                    background: item.isAllowed ? '#EF4444' : '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 10,
                    padding: '10px 20px',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    minWidth: 140,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {item.isAllowed ? 'Withdraw Consent' : 'Grant Consent'}
                </button>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>
                  {item.isAllowed ? 'Revocable anytime' : 'Currently inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notice Tab */}
      {activeTab === 'notice' && (
        <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 36, border: '1px solid #E2E8F0', lineHeight: 1.6 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginTop: 0 }}>
            Standalone DPDP Notice (Digital Personal Data Protection Act, 2023)
          </h2>
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: 16, marginBottom: 20, color: '#1E40AF', fontSize: 13 }}>
            <strong>Summary:</strong> HealthShield AI uses wellness observations solely to understand your individual baseline pattern. It does NOT diagnose medical conditions and does NOT sell telemetry.
          </div>
          <h3>1. Purpose of Processing</h3>
          <p style={{ color: '#475569' }}>
            Data is collected exclusively to establish longitudinal baseline ranges (such as resting heart rate and sleep duration) and highlight statistical deviations. The platform does not formulate medical diagnoses.
          </p>
          <h3>2. AI Explanation Boundary</h3>
          <p style={{ color: '#475569' }}>
            AI models are employed solely to synthesize human-readable summaries of mathematical deltas. Deterministic safety engine rules govern all triage steps and cannot be overridden by AI language models.
          </p>
          <h3>3. Right to Withdraw &amp; Right to Erasure</h3>
          <p style={{ color: '#475569' }}>
            Under Section 6 and Section 12 of the DPDP Act 2023, you retain the statutory right to withdraw consent at any time and request complete deletion of stored observations.
          </p>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 32, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginTop: 0, marginBottom: 20 }}>
            Tamper-Resistant Consent History Log
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {history.map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 16px', background: '#F8FAFC', borderRadius: 10, borderLeft: '4px solid #7C3AED' }}>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600, minWidth: 140 }}>{h.time}</span>
                <span style={{ fontSize: 13, color: '#1E293B' }}>{h.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
