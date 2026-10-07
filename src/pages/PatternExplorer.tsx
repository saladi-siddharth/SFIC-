import React, { useState } from 'react';

export const PatternExplorer: React.FC = () => {
  const [selectedSignal, setSelectedSignal] = useState<'All' | 'Sleep' | 'Activity' | 'HeartRate' | 'Wellbeing'>('All');

  // 30-Day Simulated History Data
  const DAYS = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    // Days 1-18 are normal; Days 19-30 show shift
    const isShift = day >= 19;
    return {
      day,
      date: `Oct ${day}`,
      sleep: isShift ? +(5.2 + Math.random() * 0.8).toFixed(1) : +(7.2 + Math.random() * 0.6).toFixed(1),
      activity: isShift ? Math.round(4500 + Math.random() * 800) : Math.round(7800 + Math.random() * 900),
      hr: isShift ? Math.round(76 + Math.random() * 5) : Math.round(62 + Math.random() * 3),
      wellbeing: isShift ? (day > 22 ? 'Low' : 'Fair') : 'Good'
    };
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #1E293B, #0F172A)', 
          borderRadius: 20, 
          padding: '28px 32px', 
          color: '#FFFFFF',
          marginBottom: 24,
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(59, 130, 246, 0.2)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#93C5FD', marginBottom: 12 }}>
          <span>📈</span>
          <span>LONGITUDINAL PATTERN EXPLORER • CO-OCCURRENCE DISCOVERY</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          30-Day Personal Pattern Explorer
        </h1>
        <p style={{ fontSize: 14, color: '#94A3B8', margin: 0, maxWidth: 760, lineHeight: 1.5 }}>
          Investigate multi-sensor baseline stability across 30 continuous days. Identify observed co-occurrences without false assertions of medical causation.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }}>
        {[
          { id: 'All', label: 'All 4 Signals' },
          { id: 'Sleep', label: '😴 Sleep Architecture' },
          { id: 'Activity', label: '🚶 Physical Steps' },
          { id: 'HeartRate', label: '❤️ Resting Heart Rate' },
          { id: 'Wellbeing', label: '😊 Daily Well-being' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedSignal(tab.id as any)}
            style={{
              background: selectedSignal === tab.id ? '#2563EB' : '#FFFFFF',
              color: selectedSignal === tab.id ? '#FFFFFF' : '#475569',
              border: '1px solid #CBD5E1',
              borderRadius: 10,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Observed Co-occurrence Insight Callout */}
      <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 14, padding: 18, marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <span style={{ fontSize: 24 }}>💡</span>
        <div>
          <strong style={{ fontSize: 14, color: '#1E40AF', display: 'block', marginBottom: 4 }}>
            Observed Co-occurrence (Days 19 → 30)
          </strong>
          <p style={{ fontSize: 13, color: '#1E3A8A', margin: 0, lineHeight: 1.5 }}>
            Sleep curtailment (5.4h average) and physical step decline (4,800 steps average) co-occurred during the exact same 11-day interval. HealthShield defines this as <em>observed co-occurrence</em> rather than medical causation, preserving epidemiological integrity.
          </p>
        </div>
      </div>

      {/* 30-Day Sparkline / Bar Grid Visualizer */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>
            30-Day Physiological Trajectory
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10B981', fontWeight: 600 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }}></span> Days 1-18: Stable Baseline
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#EF4444', fontWeight: 600 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }}></span> Days 19-30: Detected Shift
            </span>
          </div>
        </div>

        {/* 30 Bars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(30, 1fr)', gap: 4, height: 160, alignItems: 'flex-end', paddingBottom: 10, borderBottom: '1px solid #E2E8F0' }}>
          {DAYS.map(d => {
            const isShift = d.day >= 19;
            const barHeight = (d.activity / 9000) * 140;
            return (
              <div 
                key={d.day}
                title={`Day ${d.day}: Sleep ${d.sleep}h | Steps ${d.activity.toLocaleString()} | HR ${d.hr} bpm | Well-being ${d.wellbeing}`}
                style={{
                  background: isShift ? '#EF4444' : '#10B981',
                  height: `${barHeight}px`,
                  borderRadius: '3px 3px 0 0',
                  opacity: 0.85,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  position: 'relative'
                }}
              />
            );
          })}
        </div>

        {/* Labels below */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginTop: 8 }}>
          <span>Day 1 (Baseline Inception)</span>
          <span>Day 10</span>
          <span>Day 19 (Drift Onset)</span>
          <span>Day 30 (Present)</span>
        </div>
      </div>

      {/* 4 Summary Metric Correlation Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', padding: 18 }}>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>SLEEP ARCHITECTURE</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>5.4 hrs</div>
          <div style={{ fontSize: 11, color: '#EF4444', fontWeight: 700, marginTop: 2 }}>↓ 23.9% below norm</div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', padding: 18 }}>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>PHYSICAL STEPS</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>4,900</div>
          <div style={{ fontSize: 11, color: '#EF4444', fontWeight: 700, marginTop: 2 }}>↓ 37.2% below norm</div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', padding: 18 }}>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>RESTING HEART RATE</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>78 bpm</div>
          <div style={{ fontSize: 11, color: '#EF4444', fontWeight: 700, marginTop: 2 }}>↑ 8.3% departure</div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', padding: 18 }}>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>SUBJECTIVE RATING</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#DC2626', marginTop: 4 }}>Low</div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Changed for 3+ checks</div>
        </div>
      </div>
    </div>
  );
};

export default PatternExplorer;
