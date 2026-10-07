import React, { useState } from 'react';

export const CostModel: React.FC = () => {
  // Configurable cost parameters in INR (₹)
  const [hostingCost, setHostingCost] = useState<number>(1000);
  const [databaseCost, setDatabaseCost] = useState<number>(600);
  const smsCost = 300;
  const [activeUsers, setActiveUsers] = useState<number>(300);

  const totalMonthlyCost = hostingCost + databaseCost + smsCost;
  const estimatedCostPerUser = (totalMonthlyCost / activeUsers).toFixed(2);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FEF3C7', color: '#92400E', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>
          <span>💰</span>
          <span>SFIC CRITERIA: ECONOMIC SUSTAINABILITY &amp; DEPLOYABILITY</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
          Deployment Operating Model &amp; Scalability
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', margin: 0, maxWidth: 820, lineHeight: 1.5 }}>
          Honest financial architecture. Because HealthShield computes personal baseline deviation on-device and operates offline-first, there are zero expensive per-token cloud AI inference bills.
        </p>
      </div>

      {/* Component Cost Table: Estimated Operating Model */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
          Prototype Estimated Operating Model
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ textAlign: 'left', padding: '10px 14px', color: '#475569', fontWeight: 700 }}>Infrastructure Component</th>
                <th style={{ textAlign: 'left', padding: '10px 14px', color: '#475569', fontWeight: 700 }}>Estimated Cost Level</th>
                <th style={{ textAlign: 'left', padding: '10px 14px', color: '#475569', fontWeight: 700 }}>Architectural Rationale</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>Core Web Application</td>
                <td style={{ padding: '12px 14px', color: '#16A34A', fontWeight: 700 }}>Low (Static / CDN)</td>
                <td style={{ padding: '12px 14px', color: '#64748B' }}>Static Single Page App cached on edge CDNs; near-zero marginal bandwidth cost.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>Local AI Inference</td>
                <td style={{ padding: '12px 14px', color: '#16A34A', fontWeight: 700 }}>No per-token API cost when local inference is used</td>
                <td style={{ padding: '12px 14px', color: '#64748B' }}>Runs on user&apos;s laptop/phone via multi-threaded CPU runtime. Zero third-party cloud API costs.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>Baseline Engine &amp; Offline Sync</td>
                <td style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 700 }}>Low to Moderate (Usage-Dependent)</td>
                <td style={{ padding: '12px 14px', color: '#64748B' }}>Syncs only delta payloads (~2 KB per check-in) into lightweight SQLite / PostgreSQL.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>SMS / Notification Alerts</td>
                <td style={{ padding: '12px 14px', color: '#D97706', fontWeight: 700 }}>Usage-Dependent</td>
                <td style={{ padding: '12px 14px', color: '#64748B' }}>Optional transactional SMS for critical safety warnings to family circles.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>Institutional Rollout</td>
                <td style={{ padding: '12px 14px', color: '#7C3AED', fontWeight: 700 }}>Tiered / Subscription</td>
                <td style={{ padding: '12px 14px', color: '#64748B' }}>Self-hosted on campus servers or state government cloud (MeghRaj / NIC).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* "Who Pays?" Section */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
          Adoption Model: &quot;Who Pays?&quot;
        </h3>
        <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
          Addressing the essential sustainability question evaluated by SFIC judges:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div style={{ background: '#F8FAFC', padding: 18, borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🧍</div>
            <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>Individual User</h4>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#16A34A', marginBottom: 6 }}>FREE / BASIC ACCESS</div>
            <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              Individual mobile/web app is completely free. Runs 100% locally on device with user-controlled storage.
            </p>
          </div>

          <div style={{ background: '#F8FAFC', padding: 18, borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🏫</div>
            <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>College / Polytechnic Campus</h4>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2563EB', marginBottom: 6 }}>INSTITUTION-SUPPORTED</div>
            <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              Supported as a student wellness facility. Annual campus license covers aggregated, de-identified safety trends.
            </p>
          </div>

          <div style={{ background: '#F8FAFC', padding: 18, borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🏛️</div>
            <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>Community / Public Health</h4>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED', marginBottom: 6 }}>PROGRAM DEPLOYMENT</div>
            <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              Integrated into Primary Health Centre (PHC) preventive wellness drives and ASHA worker assistive toolkits.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Exploration Calculator */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
          Illustrative Deployment Scenario (Interactive Estimator)
        </h3>
        <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px', lineHeight: 1.5 }}>
          Actual deployment costs depend on hosting provider, storage volume, notification frequency, and the specific institution deployment model.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Cloud VPS &amp; CDN Server:</span>
                <strong>₹{hostingCost}/mo</strong>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={hostingCost}
                onChange={e => setHostingCost(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0EA47A' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Database Storage &amp; Backups:</span>
                <strong>₹{databaseCost}/mo</strong>
              </div>
              <input
                type="range"
                min="200"
                max="1500"
                step="100"
                value={databaseCost}
                onChange={e => setDatabaseCost(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0EA47A' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Active Cohort Participants:</span>
                <strong>{activeUsers} Users</strong>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={activeUsers}
                onChange={e => setActiveUsers(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0EA47A' }}
              />
            </div>
          </div>

          <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: 14, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#166534', letterSpacing: '0.04em' }}>SCENARIO ESTIMATED PER-USER COST</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#00694D', margin: '8px 0' }}>
              ₹{estimatedCostPerUser}
            </div>
            <div style={{ fontSize: 12, color: '#15803D' }}>
              per participant / month (Total ₹{totalMonthlyCost}/mo for {activeUsers} users)
            </div>
          </div>
        </div>
      </div>

      {/* The 6 Official SFIC Evaluation Criteria on One Page */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: 16, padding: '28px 32px', color: '#FFFFFF' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 800, color: '#93C5FD', marginBottom: 12 }}>
          <span>🏆</span>
          <span>SFIC EVALUATION MAPPING</span>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          How HealthShield Meets SFIC Evaluation Criteria
        </h2>
        <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 20px', lineHeight: 1.5 }}>
          Direct mapping against the 6 official SFIC scoring criteria for Track A:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {[
            {
              num: '01',
              criterion: 'Problem Clarity',
              summary: 'Resolves the core disconnect where raw isolated telemetry (78 bpm) lacks personal clinical meaning.'
            },
            {
              num: '02',
              criterion: 'Originality',
              summary: 'Personal 30-day baseline learning with deterministic multi-signal covariance change detection.'
            },
            {
              num: '03',
              criterion: 'Feasibility',
              summary: 'Functional working browser prototype with offline-first IndexedDB queue and zero-cloud on-device AI.'
            },
            {
              num: '04',
              criterion: 'Cost & Sustainability',
              summary: 'Software-first architecture with ~₹5-10/user/mo estimated operational costs without cloud lock-in.'
            },
            {
              num: '05',
              criterion: 'Beneficiary Impact',
              summary: 'Tiered impact from individual self-awareness → family trusted circles → campus cohort wellness.'
            },
            {
              num: '06',
              criterion: 'Scalability',
              summary: 'Reusable edge architecture easily replicated across polytechnic campuses, institutions, and districts.'
            }
          ].map(c => (
            <div key={c.num} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: '#38BDF8' }}>CRITERION {c.num}</span>
                <strong style={{ fontSize: 14, color: '#FFFFFF' }}>{c.criterion}</strong>
              </div>
              <p style={{ fontSize: 12, color: '#CBD5E1', margin: 0, lineHeight: 1.4 }}>
                {c.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CostModel;
