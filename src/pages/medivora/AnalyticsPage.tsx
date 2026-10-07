import React from 'react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div style={{ padding: '24px 32px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
          <span>📊</span>
          <span>COHORT EPIDEMIOLOGY &amp; OPERATIONAL ANALYTICS</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>
          Clinical Analytics &amp; Population Intelligence
        </h1>
        <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
          Real-time bed utilization, 30-day readmission risk tracking, and longitudinal biometric drift distributions across departments.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Bed Occupancy Rate</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>84.2%</div>
          <div style={{ fontSize: 11, color: '#059669', marginTop: 4 }}>108 / 128 Beds Active</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Readmission Risk (30d)</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#16A34A', marginTop: 4 }}>-18.4%</div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Vs pre-baseline monitoring</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Triage Detection Time</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#2563EB', marginTop: 4 }}>3.2 min</div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Mean automated alert latency</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Telemetry Adherence</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#7C3AED', marginTop: 4 }}>92.8%</div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Continuous sensor uptime</div>
        </div>
      </div>

      {/* Two Detailed Analysis Grids */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 20 }}>
        {/* Department Distribution */}
        <div style={{ background: '#FFFFFF', borderRadius: 18, border: '1px solid #E2E8F0', padding: 24 }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
            Primary Admission Diagnosis Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Cardiovascular &amp; Autonomic Disorders</span>
                <span style={{ fontWeight: 700 }}>42% (54 patients)</span>
              </div>
              <div style={{ height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '42%', height: '100%', background: '#2563EB' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Endocrine &amp; Metabolic Management</span>
                <span style={{ fontWeight: 700 }}>26% (33 patients)</span>
              </div>
              <div style={{ height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '26%', height: '100%', background: '#7C3AED' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Post-Surgical Telemetry Surveillance</span>
                <span style={{ fontWeight: 700 }}>18% (23 patients)</span>
              </div>
              <div style={{ height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '18%', height: '100%', background: '#059669' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Pulmonary &amp; Respiratory Inpatient</span>
                <span style={{ fontWeight: 700 }}>14% (18 patients)</span>
              </div>
              <div style={{ height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '14%', height: '100%', background: '#D97706' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 24-Hour Triage Waveform Activity */}
        <div style={{ background: '#FFFFFF', borderRadius: 18, border: '1px solid #E2E8F0', padding: 24 }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
            24-Hour Automated Baseline Drift Trends
          </h3>
          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 16, fontSize: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #CBD5E1', paddingBottom: 6 }}>
              <span style={{ color: '#475569' }}>Nocturnal Resting HR Drift (&gt;15%):</span>
              <strong style={{ color: '#DC2626' }}>8 Patients Flagged (03:00 - 05:00 AM)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #CBD5E1', paddingBottom: 6 }}>
              <span style={{ color: '#475569' }}>Hypoxemia Episodes (SpO2 &lt; 92%):</span>
              <strong style={{ color: '#D97706' }}>2 Patients (Prompted O2 Triage)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #CBD5E1', paddingBottom: 6 }}>
              <span style={{ color: '#475569' }}>Blood Pressure Orthostatic Shifts:</span>
              <strong style={{ color: '#2563EB' }}>12 Events Stabilized Post-Hydration</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#475569' }}>Local Qwen2.5 Neural Inferences Run:</span>
              <strong style={{ color: '#7C3AED' }}>148 Automated Summaries</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
