import React, { useState } from 'react';

export const PulseIQReplica: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: 'radial-gradient(circle at 50% 30%, #11282D 0%, #061114 100%)', 
        padding: '24px 32px', 
        fontFamily: "'Inter', sans-serif",
        color: '#E2E8F0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Outer Frosted Glass Command Console */}
      <div 
        style={{ 
          maxWidth: 1360, 
          width: '100%', 
          background: 'rgba(255, 255, 255, 0.88)', 
          backdropFilter: 'blur(20px)',
          borderRadius: 24, 
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          color: '#1E293B'
        }}
      >
        {/* ================= TOP NAVIGATION BAR ================= */}
        <header 
          style={{ 
            padding: '16px 28px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            borderBottom: '1px solid #E2E8F0',
            background: '#FFFFFF'
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div 
              style={{ 
                width: 38, 
                height: 38, 
                borderRadius: 10, 
                background: '#0EA47A', 
                color: '#FFF', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 22,
                boxShadow: '0 4px 12px rgba(14, 164, 122, 0.3)'
              }}
            >
              <span className="material-symbols-outlined">waves</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>PulseIQ Pro</span>
          </div>

          {/* Navigation Pill */}
          <div 
            style={{ 
              background: '#F8FAFC', 
              border: '1px solid #E2E8F0', 
              borderRadius: 30, 
              padding: '4px 8px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 4 
            }}
          >
            {[
              { name: 'Overview', icon: 'grid_view' },
              { name: 'Monitoring', icon: 'monitoring' },
              { name: 'Insights', icon: 'psychology' },
              { name: 'Biomarkers', icon: 'biotech' },
              { name: 'Report', icon: 'description' },
            ].map(tab => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                style={{
                  background: activeTab === tab.name ? '#FFFFFF' : 'transparent',
                  color: activeTab === tab.name ? '#0EA47A' : '#64748B',
                  fontWeight: activeTab === tab.name ? 700 : 500,
                  fontSize: 12,
                  border: activeTab === tab.name ? '1px solid #CBD5E1' : 'none',
                  borderRadius: 20,
                  padding: '6px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: activeTab === tab.name ? '0 2px 6px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* User Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#64748B' }}>notifications</span>
            </button>
            <button style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#64748B' }}>settings</span>
            </button>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
              alt="User" 
              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
        </header>

        {/* ================= 3-COLUMN CLINICAL TELEMETRY ================= */}
        <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '260px 1fr 340px', gap: 20 }}>
          
          {/* ================= LEFT COLUMN: VITALS CARDS ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Active Monitoring Card */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>Active Monitoring</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0EA47A', background: '#DCFCE7', padding: '2px 8px', borderRadius: 12 }}>Active</span>
              </div>
              <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 8 }}>Patient ID: PQ-2847</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 10 }}>
                <div>
                  <div style={{ color: '#94A3B8' }}>Duration</div>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>14 days</div>
                </div>
                <div>
                  <div style={{ color: '#94A3B8' }}>Device</div>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>PulseIQ Pro</div>
                </div>
                <div>
                  <div style={{ color: '#94A3B8' }}>Data Points</div>
                  <div style={{ fontWeight: 800, color: '#0EA47A' }}>2.4M</div>
                </div>
                <div>
                  <div style={{ color: '#94A3B8' }}>Last Sync</div>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>2 min ago</div>
                </div>
              </div>
            </div>

            {/* Heart Rate */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 14, border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#64748B' }}>Heart Rate</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#EF4444', fontFamily: "'Space Grotesk', sans-serif" }}>72 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>bpm</span></span>
              </div>
              {/* Pulse line */}
              <div style={{ height: 26, marginTop: 4 }}>
                <svg viewBox="0 0 160 20" style={{ width: '100%', height: '100%' }}>
                  <path d="M 0,10 L 40,10 L 48,2 L 56,18 L 64,5 L 72,12 L 80,10 L 160,10" fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* SpO2 */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 14, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>🫁</span>
                <div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>SpO₂</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0284C7', fontFamily: "'Space Grotesk', sans-serif" }}>97 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>%</span></div>
                </div>
              </div>
              <span className="material-symbols-outlined" style={{ color: '#0284C7', fontSize: 18 }}>arrow_downward</span>
            </div>

            {/* HRV */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 14, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>🫘</span>
                <div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>HRV</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0EA47A', fontFamily: "'Space Grotesk', sans-serif" }}>46 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>ms</span></div>
                </div>
              </div>
              <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 18 }}>arrow_downward</span>
            </div>

            {/* Stress */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 14, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>🧠</span>
                <div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>Stress</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#D97706', fontFamily: "'Space Grotesk', sans-serif" }}>64 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>pts</span></div>
                </div>
              </div>
              <span className="material-symbols-outlined" style={{ color: '#D97706', fontSize: 18 }}>arrow_forward</span>
            </div>
          </div>

          {/* ================= CENTER COLUMN: HOLOGRAPHIC NEURAL SILHOUETTE ================= */}
          <div 
            style={{ 
              background: '#FFFFFF', 
              borderRadius: 20, 
              border: '1px solid #E2E8F0', 
              padding: 24, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              position: 'relative'
            }}
          >
            {/* Callout: Neural Activity */}
            <div style={{ position: 'absolute', top: 24, right: 30, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 10, color: '#94A3B8' }}>Neural Activity</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0EA47A' }}>High <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>94% sync</span></div>
            </div>

            {/* Callout: Biosensor */}
            <div style={{ position: 'absolute', top: 120, left: 30, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 10, color: '#94A3B8' }}>Biosensor</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0EA47A' }}>Active <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>PulseIQ Pro</span></div>
            </div>

            {/* Callout: Cardiac Signal */}
            <div style={{ position: 'absolute', bottom: 100, right: 30, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 10, color: '#94A3B8' }}>Cardiac Signal</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0EA47A' }}>72 bpm <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>Normal sinus</span></div>
            </div>

            {/* Center Holographic Graphic */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320, width: '100%' }}>
              <svg viewBox="0 0 300 300" style={{ width: 260, height: 260 }}>
                {/* Cybernetic Head Contour */}
                <path
                  d="M 120,40 C 180,30 220,70 220,130 C 220,170 200,200 190,220 C 180,240 170,250 170,270 L 130,270 C 130,240 110,230 100,210 C 90,190 85,160 85,130 C 85,70 100,50 120,40 Z"
                  fill="#F1F5F9"
                  stroke="#0EA47A"
                  strokeWidth="2"
                  opacity="0.8"
                />
                {/* Glowing Synapse Tree */}
                <circle cx="160" cy="110" r="45" fill="none" stroke="#0EA47A" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="160" cy="110" r="25" fill="none" stroke="#2563EB" strokeWidth="1.5" />
                <circle cx="160" cy="110" r="8" fill="#10B981" filter="drop-shadow(0 0 6px #10B981)" />

                {/* Cyber Target Nodes */}
                <circle cx="140" cy="70" r="5" fill="#0EA47A" />
                <circle cx="180" cy="85" r="5" fill="#0EA47A" />
                <circle cx="195" cy="130" r="5" fill="#2563EB" />
                <circle cx="165" cy="170" r="5" fill="#0EA47A" />
                <circle cx="140" cy="220" r="5" fill="#10B981" />

                {/* Connecting lines */}
                <line x1="140" y1="70" x2="160" y2="110" stroke="#0EA47A" strokeWidth="1" />
                <line x1="180" y1="85" x2="160" y2="110" stroke="#0EA47A" strokeWidth="1" />
                <line x1="195" y1="130" x2="160" y2="110" stroke="#2563EB" strokeWidth="1" />
                <line x1="165" y1="170" x2="160" y2="110" stroke="#0EA47A" strokeWidth="1" />
                <line x1="140" y1="220" x2="165" y2="170" stroke="#10B981" strokeWidth="1" />
              </svg>
            </div>

            {/* Bottom Summary Report Bar */}
            <div 
              style={{ 
                width: '100%', 
                background: '#F8FAFC', 
                border: '1px solid #E2E8F0', 
                borderRadius: 14, 
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>Summary Report</div>
                <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                  <div><span style={{ fontSize: 10, color: '#94A3B8' }}>Neural Nodes: </span><strong style={{ fontSize: 11, color: '#0EA47A' }}>247</strong></div>
                  <div><span style={{ fontSize: 10, color: '#94A3B8' }}>Signal Strength: </span><strong style={{ fontSize: 11, color: '#0EA47A' }}>98%</strong></div>
                  <div><span style={{ fontSize: 10, color: '#94A3B8' }}>Anomalies: </span><strong style={{ fontSize: 11, color: '#EF4444' }}>3</strong></div>
                </div>
              </div>

              <button 
                style={{
                  background: '#0EA47A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 14px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Suggested Action
              </button>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: EXPLAINABLE ANOMALY ALERTS ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            
            {/* Card 1: Elevated Cardiac Irregularity */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 16, border: '1px solid #FECACA', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#EF4444', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} /> HIGH
                </span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#EF4444' }}>94%</span>
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>Elevated Cardiac Irregularity</h4>
              <p style={{ fontSize: 11, color: '#64748B', lineHeight: 1.4, margin: '0 0 10px 0' }}>
                Abnormal rhythm patterns detected during sleep phase. Heart rate variability shows significant deviation from baseline.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94A3B8' }}>
                <span>❊ AI Detected</span>
                <span style={{ color: '#10B981', fontWeight: 700 }}>↗ +12%</span>
              </div>
            </div>

            {/* Card 2: Recovery Deterioration */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 16, border: '1px solid #FDE68A', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#D97706', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D97706' }} /> MEDIUM
                </span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#D97706' }}>78%</span>
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>Recovery Deterioration</h4>
              <p style={{ fontSize: 11, color: '#64748B', lineHeight: 1.4, margin: '0 0 10px 0' }}>
                Sleep quality metrics indicate suboptimal recovery. HRV trending downward over 72-hour period.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94A3B8' }}>
                <span>❊ AI Detected</span>
                <span style={{ color: '#10B981', fontWeight: 700 }}>↗ +8%</span>
              </div>
            </div>

            {/* Card 3: Oxygen Fluctuation */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 16, border: '1px solid #FDE68A', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#D97706', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D97706' }} /> MEDIUM
                </span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#D97706' }}>82%</span>
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>Oxygen Fluctuation</h4>
              <p style={{ fontSize: 11, color: '#64748B', lineHeight: 1.4, margin: '0 0 10px 0' }}>
                SpO₂ levels showing micro-dips during REM cycles. Pattern consistent with potential respiratory stress.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94A3B8' }}>
                <span>❊ AI Detected</span>
              </div>
            </div>

            {/* Card 4: Stress Response Elevated */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 16, border: '1px solid #BBF7D0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669' }} /> LOW
                </span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#059669' }}>94%</span>
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>Stress Response Elevated</h4>
              <p style={{ fontSize: 11, color: '#64748B', lineHeight: 1.4, margin: '0 0 10px 0' }}>
                Cortisol markers elevated above baseline. Sustained sympathetic nervous system activation detected.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94A3B8' }}>
                <span>❊ AI Detected</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>↗ 5%</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PulseIQReplica;
