import React, { useState } from 'react';

export const VitalStatsReplica: React.FC = () => {
  const [activeActivityTab, setActiveActivityTab] = useState('All Activity');

  return (
    <div style={{ minHeight: '100vh', background: '#94A3B8', padding: '36px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Outer Layout Grid Matching Image 1 */}
      <div style={{ maxWidth: 1100, width: '100%', display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24 }}>
        
        {/* ================= LEFT COLUMN: VITAL STATS CARD ================= */}
        <div 
          style={{ 
            background: '#FFFFFF', 
            borderRadius: 28, 
            padding: 24, 
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}
        >
          {/* Top Blue Hero Card */}
          <div 
            style={{ 
              background: 'linear-gradient(180deg, #1E3A8A, #2563EB)', 
              borderRadius: 22, 
              padding: 22, 
              color: '#FFFFFF',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)' 
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>show_chart</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700 }}>Vital Stats</span>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.15)', borderRadius: 16, padding: '4px 10px', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>Cholesterol</span>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>expand_more</span>
              </div>
            </div>

            {/* Reading */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
              <span style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif" }}>150/200</span>
              <span style={{ fontSize: 12, opacity: 0.85 }}>mg/dL</span>
            </div>

            {/* Vertical Bar Histogram (20 rounded vertical bars) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 44, marginBottom: 8 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i} 
                  style={{ 
                    flex: 1, 
                    height: '100%', 
                    borderRadius: 4, 
                    background: i < 15 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.25)' 
                  }} 
                />
              ))}
            </div>

            {/* Scale numbers */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, opacity: 0.75, marginBottom: 14 }}>
              <span>0</span>
              <span>100</span>
              <span>200</span>
            </div>

            {/* Status Pill */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, opacity: 0.85 }}>Cholesterol level:</span>
              <span style={{ background: '#DCFCE7', color: '#166534', padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A' }} />
                Normal
              </span>
            </div>
          </div>

          {/* Report Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Report Details</span>
              <span className="material-symbols-outlined" style={{ color: '#94A3B8', fontSize: 18 }}>more_vert</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>75%</span>
              <span style={{ fontSize: 12, color: '#64748B' }}>of the healthy limit</span>
            </div>
          </div>

          {/* Reminders List */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 12 }}>Reminder:</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Next Check-up */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748B' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#10B981' }}>calendar_today</span>
                  <span>Next check-up</span>
                </div>
                <span style={{ fontWeight: 700, color: '#2563EB' }}>28 Feb 2025</span>
              </div>

              {/* Hydrated */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748B' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#0EA47A' }}>water_bottle</span>
                  <span>Hydrated</span>
                </div>
                <span style={{ fontWeight: 700, color: '#0EA47A' }}>3.5L / day</span>
              </div>

              {/* Exercise */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748B' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#F97316' }}>fitness_center</span>
                  <span>Exercise</span>
                </div>
                <span style={{ fontWeight: 700, color: '#D97706' }}>30-min jogging</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: ACTIVITY & HEALTH GOALS ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* 1. My Activity Card */}
          <div style={{ background: '#FFFFFF', borderRadius: 28, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#F5F3FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>directions_run</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>My Activity</h3>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: 4 }}>
                {['All Activity', 'Daily Overview', 'Progress', 'Performance Insights'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveActivityTab(tab)}
                    style={{
                      background: activeActivityTab === tab ? '#F1F5F9' : 'transparent',
                      border: 'none',
                      borderRadius: 14,
                      padding: '6px 12px',
                      fontSize: 11,
                      fontWeight: activeActivityTab === tab ? 700 : 500,
                      color: activeActivityTab === tab ? '#0F172A' : '#64748B',
                      cursor: 'pointer'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Metric Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {/* Today's Steps */}
              <div style={{ background: '#F8FAFC', borderRadius: 16, padding: 16, border: '1px solid #EEF2F6' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>Today's Steps</span>
                  <span style={{ fontSize: 10, color: '#0EA47A', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>schedule</span> 45 min
                  </span>
                </div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 12 }}>Route: Home → Central Park</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>
                  8,200 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>steps</span>
                </div>
              </div>

              {/* Workout */}
              <div style={{ background: '#F8FAFC', borderRadius: 16, padding: 16, border: '1px solid #EEF2F6' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>Workout</span>
                  <span style={{ fontSize: 10, color: '#0EA47A', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>schedule</span> 30 min
                  </span>
                </div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 12 }}>Workout type: HIIT</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>
                  450 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>Kcal burned</span>
                </div>
              </div>

              {/* Sleep & Recovery */}
              <div style={{ background: '#F8FAFC', borderRadius: 16, padding: 16, border: '1px solid #EEF2F6' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>Sleep &amp; Recovery</span>
                  <span style={{ fontSize: 10, color: '#2563EB', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>schedule</span> 7h 45m
                  </span>
                </div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 12 }}>Deep Sleep: 2h 10m</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>
                  85/100 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>sleep score</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Middle Row: Mental Health Score & Body Composition */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            
            {/* Mental Health Score */}
            <div style={{ background: '#FFFFFF', borderRadius: 28, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>sentiment_satisfied</span>
                  </div>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0 }}>Mental Health Score</h4>
                </div>
                <span className="material-symbols-outlined" style={{ color: '#94A3B8', fontSize: 18 }}>north_east</span>
              </div>

              {/* Radial Semi-Circle Gauge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: 130 }}>
                <svg viewBox="0 0 160 90" style={{ width: 180, height: 100 }}>
                  <path d="M 20,80 A 60,60 0 0,1 140,80" fill="none" stroke="#E2E8F0" strokeWidth="16" strokeLinecap="round" />
                  <path d="M 20,80 A 60,60 0 0,1 125,45" fill="none" stroke="#3B82F6" strokeWidth="16" strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', bottom: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>
                    78<span style={{ fontSize: 14, color: '#64748B' }}>/10</span>
                  </div>
                  <div style={{ fontSize: 10, color: '#64748B' }}>Mental Health Score</div>
                </div>
              </div>

              {/* Sub Scores */}
              <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: 11, borderTop: '1px solid #F1F5F9', paddingTop: 12 }}>
                <div>
                  <div style={{ color: '#64748B' }}>• Mindfulness</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>82%</div>
                </div>
                <div>
                  <div style={{ color: '#64748B' }}>• Stress Management</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>68%</div>
                </div>
              </div>
            </div>

            {/* Body Composition */}
            <div style={{ background: '#FFFFFF', borderRadius: 28, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#FFEDD5', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>scale</span>
                  </div>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0 }}>Body Composition</h4>
                </div>
                <span className="material-symbols-outlined" style={{ color: '#94A3B8', fontSize: 18 }}>north_east</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                {/* Weight */}
                <div style={{ background: '#F8FAFC', borderRadius: 14, padding: 14, border: '1px solid #EEF2F6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#EC4899', marginBottom: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>accessibility</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>68 <span style={{ fontSize: 11, color: '#64748B' }}>Kg</span></span>
                  </div>
                  <div style={{ fontSize: 10, color: '#64748B', lineHeight: 1.3 }}>
                    Your weight is within a healthy range
                  </div>
                </div>

                {/* Body Fat */}
                <div style={{ background: '#F8FAFC', borderRadius: 14, padding: 14, border: '1px solid #EEF2F6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#EF4444', marginBottom: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>donut_large</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>22%</span>
                  </div>
                  <div style={{ fontSize: 10, color: '#64748B', lineHeight: 1.3 }}>
                    Your body fat percentage is at an ideal level
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 3. Bottom Banner: Health Goals */}
          <div 
            style={{ 
              background: 'linear-gradient(135deg, #090E17, #0F2B5C)', 
              borderRadius: 22, 
              padding: '20px 28px', 
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}
          >
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Set and Achieve Your Health Goals!</h3>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>
                Your Goal: <strong style={{ color: '#93C5FD' }}>Lose 3kg in 1 month</strong>
              </div>
            </div>

            <button 
              style={{
                background: '#FFFFFF',
                color: '#0F172A',
                border: 'none',
                borderRadius: 24,
                padding: '9px 18px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span>Adjust My Goal</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>north_east</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default VitalStatsReplica;
