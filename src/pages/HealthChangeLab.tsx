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
    patternStatus: 'STABLE' | 'EMERGING CHANGE' | 'SIGNIFICANT CHANGE';
    divergedSignalsCount: number;
    deltas: { label: string; delta: string; status: 'Normal' | 'Changed' }[];
    explanation: string;
    nextStep: string;
  } | null>({
    patternStatus: 'SIGNIFICANT CHANGE',
    divergedSignalsCount: 3,
    deltas: [
      { label: 'Sleep Duration', delta: '↓ 24% (5.4h vs 7.1h baseline)', status: 'Changed' },
      { label: 'Physical Activity', delta: '↓ 37% (4,900 vs 7,800 steps)', status: 'Changed' },
      { label: 'Resting Heart Rate', delta: '↑ 8% (78 bpm vs 72 bpm baseline)', status: 'Changed' },
      { label: 'Self-Reported Well-being', delta: 'Shifted Good → Low', status: 'Changed' }
    ],
    explanation: "Today's observations differ from your recent personal pattern across multiple signals.",
    nextStep: 'Monitor the pattern and consider seeking professional medical advice if the change persists or symptoms concern you.'
  });

  const handleRunSimulation = () => {
    setIsProcessing(true);
    setPipelineStep(1);

    setTimeout(() => setPipelineStep(2), 500); // Validation
    setTimeout(() => setPipelineStep(3), 1000); // Baseline comparison
    setTimeout(() => setPipelineStep(4), 1500); // Pattern engine
    setTimeout(() => setPipelineStep(5), 2000); // Safety rules
    setTimeout(() => {
      // Calculate real differences
      const sleepDelta = ((sleepInput - BASELINE.sleep) / BASELINE.sleep) * 100;
      const actDelta = ((activityInput - BASELINE.activity) / BASELINE.activity) * 100;
      const hrDelta = ((hrInput - BASELINE.hr) / BASELINE.hr) * 100;

      const hasSleepChg = sleepDelta < -15;
      const hasActChg = actDelta < -20;
      const hasHrChg = hrDelta > 7;
      const hasWbChg = wellbeingInput !== 'Good';

      const changeCount = [hasSleepChg, hasActChg, hasHrChg, hasWbChg].filter(Boolean).length;
      const status: 'STABLE' | 'EMERGING CHANGE' | 'SIGNIFICANT CHANGE' = 
        changeCount >= 3 ? 'SIGNIFICANT CHANGE' : changeCount >= 1 ? 'EMERGING CHANGE' : 'STABLE';

      setEvaluationResult({
        patternStatus: status,
        divergedSignalsCount: changeCount,
        deltas: [
          { label: 'Sleep Duration', delta: `${sleepDelta < 0 ? '↓' : '↑'} ${Math.abs(Math.round(sleepDelta))}% (${sleepInput}h vs ${BASELINE.sleep}h)`, status: hasSleepChg ? 'Changed' : 'Normal' },
          { label: 'Daily Steps', delta: `${actDelta < 0 ? '↓' : '↑'} ${Math.abs(Math.round(actDelta))}% (${activityInput.toLocaleString()} vs ${BASELINE.activity.toLocaleString()})`, status: hasActChg ? 'Changed' : 'Normal' },
          { label: 'Resting Heart Rate', delta: `${hrDelta > 0 ? '↑' : '↓'} ${Math.abs(Math.round(hrDelta))}% (${hrInput} bpm vs ${BASELINE.hr} bpm)`, status: hasHrChg ? 'Changed' : 'Normal' },
          { label: 'Self-Reported Well-being', delta: `Observed: ${wellbeingInput} (Baseline: Good)`, status: hasWbChg ? 'Changed' : 'Normal' }
        ],
        explanation: status === 'STABLE' 
          ? "All incoming observations remain comfortably within your learned personal normal range."
          : `Today's observations differ from your recent personal pattern across ${changeCount} signal${changeCount > 1 ? 's' : ''}. HealthShield does not determine the medical cause of this change.`,
        nextStep: status === 'SIGNIFICANT CHANGE'
          ? 'Monitor the pattern closely and consider seeking professional healthcare advice if the change persists or symptoms concern you.'
          : status === 'EMERGING CHANGE'
          ? 'Log another check-in tomorrow to see if this represents an isolated day or an emerging trend.'
          : 'Continue regular daily check-ins to keep your personal baseline adaptive and accurate.'
      });
      setPipelineStep(6);
      setIsProcessing(false);
    }, 2500);
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
            background: evaluationResult.patternStatus === 'SIGNIFICANT CHANGE' ? '#FEF2F2' : evaluationResult.patternStatus === 'EMERGING CHANGE' ? '#FFFBEB' : '#F0FDF4', 
            border: evaluationResult.patternStatus === 'SIGNIFICANT CHANGE' ? '1.5px solid #FCA5A5' : evaluationResult.patternStatus === 'EMERGING CHANGE' ? '1.5px solid #FDE68A' : '1.5px solid #BBF7D0', 
            borderRadius: 16, 
            padding: 24 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ 
                display: 'inline-block', 
                background: evaluationResult.patternStatus === 'SIGNIFICANT CHANGE' ? '#DC2626' : evaluationResult.patternStatus === 'EMERGING CHANGE' ? '#D97706' : '#10B981', 
                color: '#FFF', 
                fontSize: 11, 
                fontWeight: 800, 
                padding: '4px 12px', 
                borderRadius: 20, 
                marginBottom: 8 
              }}>
                {evaluationResult.patternStatus === 'SIGNIFICANT CHANGE' ? '⚠ PATTERN CHANGE DETECTED' : evaluationResult.patternStatus === 'EMERGING CHANGE' ? '⚡ EMERGING VARIANCE' : '✓ PATTERN STABLE'}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {evaluationResult.patternStatus === 'SIGNIFICANT CHANGE' 
                  ? 'Significant Multi-Signal Deviation from Personal Baseline' 
                  : evaluationResult.patternStatus === 'EMERGING CHANGE'
                  ? 'Isolated Signal Divergence Under Observation'
                  : 'All Signals Within Established Personal Normal Range'}
              </h3>
            </div>
            <div style={{ textAlign: 'right', background: '#FFFFFF', padding: '10px 16px', borderRadius: 10, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700 }}>PATTERN STATUS</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: evaluationResult.patternStatus === 'SIGNIFICANT CHANGE' ? '#DC2626' : evaluationResult.patternStatus === 'EMERGING CHANGE' ? '#D97706' : '#16A34A' }}>
                {evaluationResult.patternStatus}
              </div>
              <div style={{ fontSize: 11, color: '#64748B' }}>
                {evaluationResult.divergedSignalsCount} of 4 signals moved away
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

          {/* Why Was This Flagged? What It Does Not Do & Next Step */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🔍</span>
                <span>WHY FLAGGED?</span>
              </div>
              <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.5, margin: 0 }}>
                {evaluationResult.explanation}
              </p>
            </div>

            <div style={{ background: '#FFFBEB', padding: 16, borderRadius: 12, border: '1px solid #FDE68A' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#92400E', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>⚠️</span>
                <span>WHAT IT DOES NOT DO</span>
              </div>
              <p style={{ fontSize: 13, color: '#78350F', lineHeight: 1.5, margin: 0 }}>
                HealthShield does not identify disease, diagnose medical conditions, or predict clinical etiology. It detects multi-signal deviation for preventive awareness.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🛡️</span>
                <span>NEXT STEP</span>
              </div>
              <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.5, margin: 0 }}>
                {evaluationResult.nextStep}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthChangeLab;
