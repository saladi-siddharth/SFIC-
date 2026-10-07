import React, { useState } from 'react';

export const CostModel: React.FC = () => {
  // Configurable cost parameters in INR (₹)
  const [hostingCost, setHostingCost] = useState<number>(1200);
  const [databaseCost, setDatabaseCost] = useState<number>(800);
  const [emailCost, setEmailCost] = useState<number>(300);
  const [storageCost, setStorageCost] = useState<number>(400);
  const [supportCost, setSupportCost] = useState<number>(1500);
  const [activeUsers, setActiveUsers] = useState<number>(500);

  const totalMonthlyCost = hostingCost + databaseCost + emailCost + storageCost + supportCost;
  const costPerUser = (totalMonthlyCost / activeUsers).toFixed(2);
  const costPerPilot50 = (parseFloat(costPerUser) * 50).toFixed(0);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FEF3C7', color: '#92400E', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
          <span>💰</span>
          <span>SFIC ECONOMIC SUSTAINABILITY &amp; SCALABILITY ROADMAP</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
          Cost Calculator &amp; Adoption Pathway
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', margin: 0, maxWidth: 720 }}>
          Transparent financial assumptions and multi-stage institutional scaling roadmap. No invented zero-cost claims; authentic lightweight infrastructure economics.
        </p>
      </div>

      {/* Main Interactive Cost Calculator */}
      <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '28px 32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)', marginBottom: 36 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginTop: 0, marginBottom: 20 }}>
          Interactive Platform Cost Model (Monthly ₹)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 28 }}>
          {/* Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                <span>Application Hosting (Cloud VPS / CDN):</span>
                <span style={{ color: '#2563EB' }}>₹{hostingCost}</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={hostingCost}
                onChange={e => setHostingCost(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                <span>Managed Database (PostgreSQL):</span>
                <span style={{ color: '#2563EB' }}>₹{databaseCost}</span>
              </div>
              <input
                type="range"
                min="0"
                max="3000"
                step="100"
                value={databaseCost}
                onChange={e => setDatabaseCost(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                <span>SMTP Email &amp; Verification SMS:</span>
                <span style={{ color: '#2563EB' }}>₹{emailCost}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="50"
                value={emailCost}
                onChange={e => setEmailCost(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                <span>Storage &amp; Automated Encrypted Backups:</span>
                <span style={{ color: '#2563EB' }}>₹{storageCost}</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={storageCost}
                onChange={e => setStorageCost(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                <span>Institutional Support &amp; Maintenance:</span>
                <span style={{ color: '#2563EB' }}>₹{supportCost}</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={supportCost}
                onChange={e => setSupportCost(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                <span>Active Cohort Population:</span>
                <span style={{ color: '#7C3AED' }}>{activeUsers} Users</span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={activeUsers}
                onChange={e => setActiveUsers(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Computed Results Card */}
          <div style={{ background: '#F8FAFC', borderRadius: 16, padding: '24px 28px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Platform Cost</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#0F172A' }}>₹{totalMonthlyCost} <span style={{ fontSize: 16, fontWeight: 600, color: '#64748B' }}>/ month</span></div>
            </div>

            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Cost per Participant</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#16A34A' }}>₹{costPerUser} <span style={{ fontSize: 14, fontWeight: 600, color: '#64748B' }}>/ user / month</span></div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>Remarkably affordable for campus and community health programs.</div>
            </div>

            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Estimated 50-Student Pilot Cost</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#2563EB' }}>₹{costPerPilot50} <span style={{ fontSize: 13, fontWeight: 500, color: '#64748B' }}>total for 30-day cohort</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* "WHO PAYS?" Deployment Models (Point 23) */}
      <div style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
          Who Pays? Sustainable Institutional Models
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>🏫</div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: 15, fontWeight: 800, color: '#0F172A' }}>Institution-Sponsored</h3>
            <p style={{ margin: 0, fontSize: 12, color: '#475569' }}>
              Colleges and polytechnics fund student wellness cohorts via annual student welfare or sports funds.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>🤝</div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: 15, fontWeight: 800, color: '#0F172A' }}>NGO / Community CSR</h3>
            <p style={{ margin: 0, fontSize: 12, color: '#475569' }}>
              Corporate Social Responsibility grants sponsor underserved rural community baseline monitoring.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>🏛️</div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: 15, fontWeight: 800, color: '#0F172A' }}>Government / District Pilot</h3>
            <p style={{ margin: 0, fontSize: 12, color: '#475569' }}>
              District Health Societies deploy pilots during regional wellness campaigns or youth fitness screening.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>📱</div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: 15, fontWeight: 800, color: '#0F172A' }}>Free Basic / Freemium</h3>
            <p style={{ margin: 0, fontSize: 12, color: '#475569' }}>
              The core platform remains 100% free for individual citizens, with voluntary caregiver circle extensions.
            </p>
          </div>
        </div>
      </div>

      {/* 6-Phase Scalability Roadmap (Point 50) */}
      <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '28px 32px', border: '1px solid #E2E8F0' }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginTop: 0, marginBottom: 20 }}>
          Scalability &amp; Adoption Roadmap
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          {[
            { phase: 'PHASE 1', title: 'Software Prototype', status: 'COMPLETED', bg: '#DCFCE7', text: '#166534' },
            { phase: 'PHASE 2', title: 'Controlled Pilot', status: 'ACTIVE', bg: '#DBEAFE', text: '#1E40AF' },
            { phase: 'PHASE 3', title: 'Institutional Pilot', status: 'PLANNED', bg: '#FEF3C7', text: '#92400E' },
            { phase: 'PHASE 4', title: 'Device Integrations', status: 'PLANNED', bg: '#F1F5F9', text: '#475569' },
            { phase: 'PHASE 5', title: 'ABDM Interop', status: 'PLANNED', bg: '#F1F5F9', text: '#475569' },
            { phase: 'PHASE 6', title: 'District / Scale', status: 'FUTURE', bg: '#F1F5F9', text: '#475569' }
          ].map((p, i) => (
            <div key={i} style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: 14, textAlign: 'center' }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#94A3B8' }}>{p.phase}</span>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', margin: '4px 0 8px 0' }}>{p.title}</div>
              <span style={{ background: p.bg, color: p.text, borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
