import React, { useState, useEffect } from 'react';

interface TimelineEvent {
  day: number;
  date: string;
  stage: string;
  status: 'STABLE' | 'EMERGING' | 'DETECTED';
  badgeColor: string;
  summary: string;
  metrics: {
    sleep: number;
    activity: number;
    hr: number;
    wellbeing: 'Good' | 'Fair' | 'Low';
  };
  deltaText: string;
  clinicalNote: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    day: 1,
    date: 'Day 1 • Baseline Init',
    stage: 'Personal Baseline Initialization',
    status: 'STABLE',
    badgeColor: '#10B981',
    summary: 'Initial device sync and self-reported check-in registered. Learning physiological baseline window.',
    metrics: { sleep: 7.4, activity: 8200, hr: 62, wellbeing: 'Good' },
    deltaText: 'Within normal baseline entry',
    clinicalNote: 'Rolling 30-day kernel initialized. Tracking sleep-activity-HR personal normal bounds.'
  },
  {
    day: 7,
    date: 'Day 7 • Baseline Locked',
    stage: 'Baseline Established (Confidence: High)',
    status: 'STABLE',
    badgeColor: '#10B981',
    summary: '7 continuous days of valid telemetry. Mean resting HR established at 62 bpm, sleep 7.3h, activity 7,900 steps.',
    metrics: { sleep: 7.2, activity: 7900, hr: 63, wellbeing: 'Good' },
    deltaText: 'Baseline stable (Variance < 4%)',
    clinicalNote: 'Personal normal bounds calculated using mean ± 1.8σ personal standard deviation.'
  },
  {
    day: 14,
    date: 'Day 14 • Isolated Variance',
    stage: 'Single-Signal Fluctuation',
    status: 'STABLE',
    badgeColor: '#3B82F6',
    summary: 'Mild sleep curtailment noted on weekend. Activity and resting HR remain completely normal.',
    metrics: { sleep: 6.5, activity: 7600, hr: 64, wellbeing: 'Good' },
    deltaText: 'Sleep -11% (Within transient tolerance)',
    clinicalNote: 'Deterministic filter suppresses false alarms. Single-metric transient does not trigger alert.'
  },
  {
    day: 18,
    date: 'Day 18 • Emerging Drift',
    stage: 'Emerging Multi-Day Signal Drift',
    status: 'EMERGING',
    badgeColor: '#F59E0B',
    summary: 'Second consecutive day of reduced step count and delayed sleep onset.',
    metrics: { sleep: 6.0, activity: 5800, hr: 68, wellbeing: 'Fair' },
    deltaText: 'Activity -27% • HR +6 bpm',
    clinicalNote: 'System flags early drift into internal monitor queue. No alarm fatigue; observing multi-signal change.'
  },
  {
    day: 20,
    date: 'Day 20 • Multi-Signal Shift',
    stage: 'Compound Physiological Divergence',
    status: 'EMERGING',
    badgeColor: '#F59E0B',
    summary: 'Sleep drops below 5.5h. Self-reported well-being shifts to Low. Nighttime resting HR elevated.',
    metrics: { sleep: 5.4, activity: 4900, hr: 74, wellbeing: 'Low' },
    deltaText: 'Sleep -26% • Activity -38% • HR +12 bpm',
    clinicalNote: 'Safety rule HS-RULE-001 primes detection. Triad of sleep, activity, and HR departure confirmed.'
  },
  {
    day: 21,
    date: 'Day 21 • Detection Fired',
    stage: '⚠ Meaningful Pattern Change Detected',
    status: 'DETECTED',
    badgeColor: '#EF4444',
    summary: 'Pattern change confirmed across 72h rolling window. High divergence from personal 30-day baseline.',
    metrics: { sleep: 5.2, activity: 4400, hr: 78, wellbeing: 'Low' },
    deltaText: 'Sleep ↓ 29% • Activity ↓ 44% • HR ↑ 16 bpm',
    clinicalNote: 'Explainable guidance generated with non-diagnostic boundary and prioritized next steps.'
  }
];

export const HealthTimeline: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const currentEvent = TIMELINE_EVENTS[currentIdx];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentIdx < TIMELINE_EVENTS.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 2500 / playbackSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentIdx, playbackSpeed]);

  const handlePlayToggle = () => {
    if (currentIdx === TIMELINE_EVENTS.length - 1) {
      setCurrentIdx(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIdx(0);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header Banner */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #0F172A, #1E293B)', 
          borderRadius: 20, 
          padding: '28px 32px', 
          color: '#FFFFFF',
          marginBottom: 24,
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(14, 164, 122, 0.2)', border: '1px solid rgba(14, 164, 122, 0.4)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#34D399', marginBottom: 12 }}>
          <span>⏱️</span>
          <span>HEALTH TIMELINE • 21-DAY DEVIATION PROGRESSION</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Personal Health Pattern Timeline (Days 1 → 21)
        </h1>
        <p style={{ fontSize: 14, color: '#94A3B8', margin: 0, maxWidth: 760, lineHeight: 1.5 }}>
          Witness how HealthShield establishes a 30-day baseline, suppresses harmless isolated variations, and deterministically flags a multi-signal physiological departure on Day 21 with explainable evidence.
        </p>
      </div>

      {/* Replay Controls Bar */}
      <div 
        style={{ 
          background: '#FFFFFF', 
          borderRadius: 16, 
          border: '1px solid #E2E8F0', 
          padding: '16px 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 24,
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        {/* Play / Pause / Reset Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={handlePlayToggle}
            style={{
              background: isPlaying ? '#F59E0B' : '#0EA47A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 10,
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 2px 8px rgba(14, 164, 122, 0.25)'
            }}
          >
            <span>{isPlaying ? '⏸ Pause' : currentIdx === TIMELINE_EVENTS.length - 1 ? '🔄 Replay' : '▶ Play Timeline'}</span>
          </button>

          <button
            onClick={handleReset}
            style={{
              background: '#F1F5F9',
              color: '#475569',
              border: '1px solid #CBD5E1',
              borderRadius: 10,
              padding: '10px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ⏮ Reset Day 1
          </button>

          {/* Speed Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 12, background: '#F8FAFC', padding: 4, borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600, padding: '0 6px' }}>Speed:</span>
            {[1, 2, 4].map(s => (
              <button
                key={s}
                onClick={() => setPlaybackSpeed(s)}
                style={{
                  background: playbackSpeed === s ? '#0EA47A' : 'transparent',
                  color: playbackSpeed === s ? '#FFFFFF' : '#64748B',
                  border: 'none',
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Current State Capsule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>TIMELINE POSITION</div>
            <strong style={{ fontSize: 15, color: '#0F172A' }}>{currentEvent.date}</strong>
          </div>
          <div 
            style={{ 
              background: `${currentEvent.badgeColor}18`, 
              color: currentEvent.badgeColor, 
              border: `1px solid ${currentEvent.badgeColor}40`,
              borderRadius: 20, 
              padding: '6px 14px', 
              fontSize: 12, 
              fontWeight: 800 
            }}
          >
            {currentEvent.status}
          </div>
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${TIMELINE_EVENTS.length}, 1fr)`, gap: 8, marginBottom: 24 }}>
        {TIMELINE_EVENTS.map((evt, idx) => {
          const isSelected = idx === currentIdx;
          const isPast = idx < currentIdx;
          return (
            <div
              key={evt.day}
              onClick={() => { setIsPlaying(false); setCurrentIdx(idx); }}
              style={{
                background: isSelected ? '#EFF6FF' : isPast ? '#F8FAFC' : '#FFFFFF',
                border: isSelected ? '2px solid #2563EB' : isPast ? '1px solid #CBD5E1' : '1px solid #E2E8F0',
                borderRadius: 12,
                padding: '12px 10px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: isSelected ? '#2563EB' : '#64748B' }}>
                DAY {evt.day}
              </div>
              <div 
                style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  background: evt.badgeColor, 
                  margin: '6px auto',
                  boxShadow: isSelected ? `0 0 8px ${evt.badgeColor}` : 'none'
                }} 
              />
              <div style={{ fontSize: 10, color: '#475569', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {evt.status}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Dual Cards View: Stage Summary & Live Telemetry Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 24 }}>
        
        {/* Left: Stage Narrative & Decision Log */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>🔍</span>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', margin: 0 }}>
              {currentEvent.stage}
            </h3>
          </div>

          <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, marginBottom: 20 }}>
            {currentEvent.summary}
          </p>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', letterSpacing: '0.04em', marginBottom: 6 }}>
              SIGNAL DEVIATION STATUS
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: currentEvent.status === 'DETECTED' ? '#DC2626' : currentEvent.status === 'EMERGING' ? '#D97706' : '#059669' }}>
              {currentEvent.deltaText}
            </div>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#16A34A' }}>verified_user</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#166534' }}>DETERMINISTIC SAFETY RULE VERIFICATION</span>
            </div>
            <p style={{ fontSize: 13, color: '#14532D', margin: 0, lineHeight: 1.5 }}>
              {currentEvent.clinicalNote}
            </p>
          </div>
        </div>

        {/* Right: Telemetry Signals at this Day */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Day {currentEvent.day} Observations
            </h3>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>vs 30-Day Baseline</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Sleep */}
            <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: '#475569' }}>😴 Sleep Duration</span>
                <strong style={{ color: currentEvent.metrics.sleep < 6 ? '#DC2626' : '#0F172A' }}>{currentEvent.metrics.sleep} hrs</strong>
              </div>
              <div style={{ background: '#E2E8F0', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${(currentEvent.metrics.sleep / 8) * 100}%`, background: currentEvent.metrics.sleep < 6 ? '#EF4444' : '#10B981', height: '100%' }} />
              </div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Personal Baseline: 7.3 hrs</div>
            </div>

            {/* Steps */}
            <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: '#475569' }}>🚶 Daily Steps</span>
                <strong style={{ color: currentEvent.metrics.activity < 6000 ? '#DC2626' : '#0F172A' }}>{currentEvent.metrics.activity.toLocaleString()}</strong>
              </div>
              <div style={{ background: '#E2E8F0', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${(currentEvent.metrics.activity / 10000) * 100}%`, background: currentEvent.metrics.activity < 6000 ? '#EF4444' : '#10B981', height: '100%' }} />
              </div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Personal Baseline: 7,900 steps</div>
            </div>

            {/* Resting HR */}
            <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: '#475569' }}>❤️ Resting Heart Rate</span>
                <strong style={{ color: currentEvent.metrics.hr > 72 ? '#DC2626' : '#0F172A' }}>{currentEvent.metrics.hr} bpm</strong>
              </div>
              <div style={{ background: '#E2E8F0', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${(currentEvent.metrics.hr / 100) * 100}%`, background: currentEvent.metrics.hr > 72 ? '#EF4444' : '#10B981', height: '100%' }} />
              </div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Personal Baseline: 62 bpm</div>
            </div>

            {/* Well-being */}
            <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ fontWeight: 600, color: '#475569' }}>😊 Self-Reported Well-being</span>
                <span style={{ fontWeight: 800, color: currentEvent.metrics.wellbeing === 'Low' ? '#DC2626' : '#059669' }}>
                  {currentEvent.metrics.wellbeing}
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Personal Baseline: Good</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Action / Guidance Banner if Day 21 */}
      {currentIdx === TIMELINE_EVENTS.length - 1 && (
        <div 
          style={{ 
            background: '#FEF2F2', 
            border: '1.5px solid #FCA5A5', 
            borderRadius: 16, 
            padding: '24px 28px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ fontSize: 32 }}>🚨</span>
            <div>
              <h4 style={{ fontSize: 17, fontWeight: 800, color: '#991B1B', margin: '0 0 6px' }}>
                Day 21 Outcome: Explainable Guidance Generated
              </h4>
              <p style={{ fontSize: 13, color: '#7F1D1D', lineHeight: 1.5, margin: '0 0 14px' }}>
                Three independent physiological signals departed from their personal 30-day baseline simultaneously over a 72-hour rolling window. HealthShield does not attempt a disease diagnosis; it presents the concrete evidence and suggests reviewing sleep debt, physical pacing, and seeking clinical consultation if the trend persists.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ background: '#FFFFFF', border: '1px solid #FECACA', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, color: '#B91C1C' }}>
                  Step 1: Review Sleep &amp; Activity Log
                </div>
                <div style={{ background: '#FFFFFF', border: '1px solid #FECACA', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, color: '#B91C1C' }}>
                  Step 2: Monitor 48h Recovery Bound
                </div>
                <div style={{ background: '#FFFFFF', border: '1px solid #FECACA', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, color: '#B91C1C' }}>
                  Step 3: Consult Healthcare Provider
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTimeline;
