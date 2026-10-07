import React from 'react';

export const InstitutionalView: React.FC = () => {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#E0E7FF', color: '#3730A3', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
          <span>🏢</span>
          <span>AGGREGATED POPULATION INTELLIGENCE • ZERO PHI EXPOSURE</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
          HealthShield for Institutions
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', margin: 0, maxWidth: 720 }}>
          De-identified cohort analytics for educational institutions, hostels, and organizations. Individual health observations, personal journals, and AI conversations remain strictly private.
        </p>
      </div>

      {/* Privacy Guarantee Banner */}
      <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <span style={{ fontSize: 24 }}>🛡️</span>
        <div style={{ fontSize: 13, color: '#166534' }}>
          <strong>Privacy Safeguard:</strong> This dashboard renders k-anonymized aggregate distributions. Administrators cannot drill down into identifiable individual telemetry without legal consent and operational necessity.
        </div>
      </div>

      {/* Aggregated KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Enrolled</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', marginTop: 6 }}>200</div>
          <div style={{ fontSize: 11, color: '#059669', marginTop: 4 }}>Campus Pilot Cohort Alpha</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Check-in Adherence</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#2563EB', marginTop: 6 }}>81.4%</div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Last 7 days rolling average</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Follow-up Flags</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#D97706', marginTop: 6 }}>12</div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Self-requested support triage</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Accessibility Usage</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#7C3AED', marginTop: 6 }}>36.0%</div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Simple Mode / Voice / Telugu</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Pilot Completion</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#059669', marginTop: 6 }}>74.2%</div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Day 18 of 30 active</div>
        </div>
      </div>

      {/* Breakdown Grids */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>
        {/* Cohort Wellness Distribution */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
            Cohort Self-Reported Wellness Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Good (Stable Baseline)</span>
                <span style={{ fontWeight: 700 }}>64% (128 participants)</span>
              </div>
              <div style={{ height: 8, background: '#E2E8F0', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '64%', height: '100%', background: '#16A34A' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Okay (Mild Variance)</span>
                <span style={{ fontWeight: 700 }}>28% (56 participants)</span>
              </div>
              <div style={{ height: 8, background: '#E2E8F0', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '28%', height: '100%', background: '#D97706' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Not Well (Shift Detected)</span>
                <span style={{ fontWeight: 700 }}>8% (16 participants)</span>
              </div>
              <div style={{ height: 8, background: '#E2E8F0', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '8%', height: '100%', background: '#DC2626' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility & Inclusion Adoption */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
            Assistive Technology Utilization (Theme 3)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#F8FAFC', borderRadius: 8 }}>
              <span>Telugu / Hindi Localization</span>
              <strong style={{ color: '#2563EB' }}>22% active users</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#F8FAFC', borderRadius: 8 }}>
              <span>Simple Mode (High Contrast / Big Buttons)</span>
              <strong style={{ color: '#7C3AED' }}>18% active users</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#F8FAFC', borderRadius: 8 }}>
              <span>Voice Speech Assistance</span>
              <strong style={{ color: '#059669' }}>14% active users</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#F8FAFC', borderRadius: 8 }}>
              <span>Offline-First Check-ins Synced</span>
              <strong style={{ color: '#0F172A' }}>98.4% success rate</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
