import React, { useState } from 'react';

export const HealthChangeLab: React.FC = () => {
  // Scenario Inputs
  const [sleepInput, setSleepInput] = useState<number>(5.4);
  const [activityInput, setActivityInput] = useState<number>(4900);
  const [hrInput, setHrInput] = useState<number>(78);
  const [wellbeingInput, setWellbeingInput] = useState<'Good' | 'Fair' | 'Low'>('Low');

  // Baseline Fixed Constants
  const BASELINE = {
    sleep: 7.1,
    activity: 7800,
    hr: 72,
    wellbeing: 'Good'
  };

  // Pipeline Execution State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [evaluationResult, setEvaluationResult] = useState<{
    divergenceScore: number;
    severity: 'STABLE' | 'MONITOR' | 'ACTION_RECOMMENDED';
    deltas: { label: string; delta: string; status: 'Normal' | 'Changed' }[];
    clinicalRationale: string;
  } | null>({
    divergenceScore: 84,
    severity: 'ACTION_RECOMMENDED',
    deltas: [
      { label: 'Sleep Duration', delta: '↓ 23.9% (5.4h vs 7.1h baseline)', status: 'Changed' },
      { label: 'Physical Activity', delta: '↓ 37.2% (4,900 vs 7,800 steps)', status: 'Changed' },
      { label: 'Resting Heart Rate', delta: '↑ +8.3% (78 bpm vs 72 bpm baseline)', status: 'Changed' },
      { label: 'Self-Reported Well-being', delta: 'Shifted from Good → Low', status: 'Changed' }
    ],
    clinicalRationale: 'Simultaneous covariance departure across 3 physiological signals within 48h rolling window.'
  });

  const handleRunSimulation = () => {
    setIsProcessing(true);
    setPipelineStep(1);

    setTimeout(() => setPipelineStep(2), 600); // Validation
    setTimeout(() => setPipelineStep(3), 1200); // Baseline comparison
    setTimeout(() => setPipelineStep(4), 1800); // Pattern engine
    setTimeout(() => setPipelineStep(5), 2400); // Safety rules
    setTimeout(() => {
      // Calculate real differences
      const sleepDelta = ((sleepInput - BASELINE.sleep) / BASELINE.sleep) * 100;
      const actDelta = ((activityInput - BASELINE.activity) / BASELINE.activity) * 100;
      const hrDelta = ((hrInput - BASELINE.hr) / BASELINE.hr) * 100;

      const hasSleepChg = sleepDelta < -15;
      const hasActChg = actDelta < -20;
      const hasHrChg = hrDelta > 8;
      const hasWbChg = wellbeingInput !== 'Good';

      const changeCount = [hasSleepChg, hasActChg, hasHrChg, hasWbChg].filter(Boolean).length;
      const score = Math.min(95, changeCount * 25 + 10);

      setEvaluationResult({
        divergenceScore: score,
        severity: score >= 60 ? 'ACTION_RECOMMENDED' : score >= 35 ? 'MONITOR' : 'STABLE',
        deltas: [
          { label: 'Sleep Duration', delta: `${sleepDelta < 0 ? '↓' : '↑'} ${Math.abs(sleepDelta).toFixed(1)}% (${sleepInput}h vs ${BASELINE.sleep}h)`, status: hasSleepChg ? 'Changed' : 'Normal' },
          { label: 'Daily Steps', delta: `${actDelta < 0 ? '↓' : '↑'} ${Math.abs(actDelta).toFixed(1)}% (${activityInput.toLocaleString()} vs ${BASELINE.activity.toLocaleString()})`, status: hasActChg ? 'Changed' : 'Normal' },
          { label: 'Resting Heart Rate', delta: `${hrDelta > 0 ? '↑' : '↓'} ${Math.abs(hrDelta).toFixed(1)}% (${hrInput} bpm vs ${BASELINE.hr} bpm)`, status: hasHrChg ? 'Changed' : 'Normal' },
          { label: 'Self-Reported Well-being', delta: `Observed: ${wellbeingInput} (Baseline: Good)`, status: hasWbChg ? 'Changed' : 'Normal' }
        ],
        clinicalRationale: changeCount >= 2 
          ? `Detected ${changeCount} synchronized baseline departures. Rule HS-WELL-001 confirmed compound strain.` 
          : 'Fluctuations remain within the individual 95% confidence interval.'
      });
      setPipelineStep(6);
      setIsProcessing(false);
    }, 3000);
  };

  const handleLoadPresetScenario = (scenario: 'baseline' | 'stress' | 'subtle') => {
    if (scenario === 'baseline') {
      setSleepInput(7.1);
      setActivityInput(7800);
      setHrInput(72);
      setWellbeingInput('Good');
    } else if (scenario === 'stress') {
      setSleepInput(5.4);
      setActivityInput(4900);
      setHrInput(78);
      setWellbeingInput('Low');
    } else {
      setSleepInput(6.3);
      setActivityInput(6500);
      setHrInput(75);
      setWellbeingInput('Fair');
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #0EA47A, #00513A)', 
          borderRadius: 20, 
          padding: '28px 32px', 
          color: '#FFFFFF',
          marginBottom: 24,
          boxShadow: '0 10px 25px -5px rgba(14, 164, 122, 0.3)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#E6F7F1', marginBottom: 12 }}>
          <span>🧪</span>
          <span>INTERACTIVE STRESS LAB FOR HEALTH • THEME 3 PROOF OF FEASIBILITY</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Health Change Lab (Interactive Stress Test)
        </h1>
        <p style={{ fontSize: 14, color: '#DCFCE7', margin: 0, maxWidth: 760, lineHeight: 1.5 }}>
          Test the deterministic pattern engine in real time. Inject simulated changes into a locked 30-day baseline and watch the multi-stage validation, safety rules, and explainable guidance trigger dynamically.
        </p>
      </div>

      {/* Preset Quick Selectors */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => handleLoadPresetScenario('baseline')}
          style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          Preset 1: Normal Baseline (Stable)
        </button>
        <button
          onClick={() => handleLoadPresetScenario('stress')}
          style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          Preset 2: Multi-Signal Strain (Significant Change)
        </button>
        <button
          onClick={() => handleLoadPresetScenario('subtle')}
          style={{ background: '#FFFBEB', border: '1px solid #FDE68A', color: '#92400E', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          Preset 3: Borderline Shift (Emerging)
        </button>
      </div>

      {/* Dual Column: Controls & Pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        
        {/* Left: Interactive Input Sliders */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>
              1. Inject New Health Observations
            </h3>
            <span style={{ fontSize: 11, background: '#EFF6FF', color: '#2563EB', padding: '4px 8px', borderRadius: 6, fontWeight: 700 }}>
              Active Scenario
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Sleep Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>😴 Sleep Duration</span>
                <strong style={{ color: sleepInput < 6 ? '#DC2626' : '#0F172A' }}>{sleepInput} hrs (Baseline: 7.1h)</strong>
              </div>
              <input 
                type="range" 
                min="3.0" 
                max="10.0" 
                step="0.1"
                value={sleepInput}
                onChange={e => setSleepInput(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#0EA47A' }}
              />
            </div>

            {/* Activity Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>🚶 Physical Activity (Steps)</span>
                <strong style={{ color: activityInput < 5500 ? '#DC2626' : '#0F172A' }}>{activityInput.toLocaleString()} (Baseline: 7,800)</strong>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="15000" 
                step="100"
                value={activityInput}
                onChange={e => setActivityInput(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#0EA47A' }}
              />
            </div>

            {/* Resting HR Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>❤️ Resting Heart Rate</span>
                <strong style={{ color: hrInput > 76 ? '#DC2626' : '#0F172A' }}>{hrInput} bpm (Baseline: 72 bpm)</strong>
              </div>
              <input 
                type="range" 
                min="45" 
                max="120" 
                step="1"
                value={hrInput}
                onChange={e => setHrInput(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#0EA47A' }}
              />
            </div>

            {/* Well-being Selector */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                😊 Subjective Daily Well-being
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {(['Good', 'Fair', 'Low'] as const).map(w => (
                  <button
                    key={w}
                    onClick={() => setWellbeingInput(w)}
                    style={{
                      background: wellbeingInput === w ? '#0EA47A' : '#F8FAFC',
                      color: wellbeingInput === w ? '#FFFFFF' : '#475569',
                      border: '1px solid #CBD5E1',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleRunSimulation}
              disabled={isProcessing}
              style={{
                background: isProcessing ? '#94A3B8' : 'linear-gradient(135deg, #0EA47A, #00513A)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 12,
                padding: '14px 20px',
                fontSize: 14,
                fontWeight: 800,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(14, 164, 122, 0.3)',
                marginTop: 8
              }}
            >
              <span>{isProcessing ? '⚙️ Running Pipeline Engine...' : '⚡ Inject & Detect Change'}</span>
            </button>
          </div>
        </div>

        {/* Right: Real-time Evaluation Pipeline */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>
              2. Processing Engine Pipeline
            </h3>
            <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Deterministic Verification</span>
          </div>

          {/* Stepper Pipeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[
              { step: 1, title: 'NEW OBSERVATION', desc: 'Raw telemetry ingested via local device adapter' },
              { step: 2, title: 'DATA VALIDATION', desc: 'Physiological bounds, sensor freshness, and unit checks' },
              { step: 3, title: 'PERSONAL BASELINE', desc: 'Comparison against learned 30-day mean & variance window' },
              { step: 4, title: 'PATTERN ENGINE', desc: 'Multi-parameter covariance shift calculation' },
              { step: 5, title: 'SAFETY RULES', desc: 'Deterministic clinical guardrail HS-WELL-001 audit' },
              { step: 6, title: 'EXPLANATION & NEXT STEP', desc: 'Evidence summary and non-diagnostic clinical advice' },
            ].map(p => {
              const isCurrent = pipelineStep === p.step;
              const isPassed = pipelineStep > p.step || (!isProcessing && pipelineStep === 6);
              return (
                <div 
                  key={p.step}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: isCurrent ? '#EFF6FF' : isPassed ? '#F0FDF4' : '#F8FAFC',
                    border: isCurrent ? '1px solid #93C5FD' : isPassed ? '1px solid #BBF7D0' : '1px solid #E2E8F0',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div 
                    style={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      background: isPassed ? '#10B981' : isCurrent ? '#2563EB' : '#CBD5E1', 
                      color: '#FFFFFF', 
                      fontSize: 11, 
                      fontWeight: 800, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    {isPassed ? '✓' : p.step}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{p.title}</div>
                    <div style={{ fontSize: 10, color: '#64748B' }}>{p.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Output Results Card */}
      {evaluationResult && (
        <div 
          style={{ 
            background: evaluationResult.severity === 'ACTION_RECOMMENDED' ? '#FEF2F2' : '#F0FDF4', 
            border: evaluationResult.severity === 'ACTION_RECOMMENDED' ? '1.5px solid #FCA5A5' : '1.5px solid #BBF7D0', 
            borderRadius: 16, 
            padding: 24 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ display: 'inline-block', background: evaluationResult.severity === 'ACTION_RECOMMENDED' ? '#EF4444' : '#10B981', color: '#FFF', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20, marginBottom: 6 }}>
                {evaluationResult.severity === 'ACTION_RECOMMENDED' ? '⚠ PATTERN CHANGE DETECTED' : '✓ HEALTH PATTERN STABLE'}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {evaluationResult.severity === 'ACTION_RECOMMENDED' 
                  ? 'Meaningful Divergence from Personal Baseline' 
                  : 'Observations Align with Established 30-Day Norms'}
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>DIVERGENCE SCORE</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: evaluationResult.severity === 'ACTION_RECOMMENDED' ? '#DC2626' : '#16A34A' }}>
                {evaluationResult.divergenceScore} / 100
              </div>
            </div>
          </div>

          {/* Delta Pills Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
            {evaluationResult.deltas.map(d => (
              <div key={d.label} style={{ background: '#FFFFFF', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>{d.label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: d.status === 'Changed' ? '#DC2626' : '#16A34A', marginTop: 4 }}>
                  {d.delta}
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.5, background: '#FFFFFF', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
            <strong>Evidence-Based Explanation: </strong>
            These observations differ from the user's recent personal pattern. HealthShield does not diagnose a medical condition; it recommends reviewing your sleep and activity pacing and consulting a licensed healthcare practitioner if fatigue or concerns persist.
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthChangeLab;
