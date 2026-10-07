import React, { useState } from 'react';
import type { AnomalyReport, MetricData } from '../types/health';
import { PipelineStepper } from '../components/PipelineStepper';

interface ExplainableAlertProps {
  anomalyReport: AnomalyReport;
  metrics?: MetricData[];
  onNavigate: (tab: string) => void;
  onOpenEmergency: () => void;
}

export const ExplainableAlert: React.FC<ExplainableAlertProps> = ({
  anomalyReport,
  onNavigate,
  onOpenEmergency,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [trustedContactNotified, setTrustedContactNotified] = useState(false);

  const toggleStep = (idx: number) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter(i => i !== idx));
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      <PipelineStepper onSelectStep={(step) => onNavigate(step)} />

      <main className="container-max" style={{ paddingTop: 28, maxWidth: 1040 }}>
        {/* Banner Alert Card (FLAGSHIP FEATURE 05: THE SHOWCASE SCREEN) */}
        <div 
          className="glass-card" 
          style={{ 
            padding: 36, 
            border: '2px solid #EF4444', 
            background: 'linear-gradient(180deg, #FFF9F9, #FFFFFF)', 
            boxShadow: '0 20px 40px -10px rgba(239, 68, 68, 0.12)',
            marginBottom: 32 
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between" style={{ paddingBottom: 20, borderBottom: '1px solid #FEE2E2', marginBottom: 24 }}>
            <div className="flex items-center gap-3">
              <div 
                style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 12, 
                  background: '#FEE2E2', 
                  color: '#DC2626', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 32 }}>
                  warning
                </span>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#DC2626', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  FEATURE 05 • EXPLAINABLE EARLY WARNING
                </div>
                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#991B1B', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '2px 0 0' }}>
                  SOMETHING CHANGED
                </h1>
                <div style={{ fontSize: 14, color: '#7F1D1D', marginTop: 4, fontWeight: 600 }}>
                  Multiple observations moved away from your recent personal pattern.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="badge badge-alert" style={{ fontSize: 12, padding: '6px 14px', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', fontWeight: 800 }}>
                CHANGE DETECTED
              </span>
            </div>
          </div>

          {/* Side-by-Side: YOUR PATTERN vs TODAY */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>
              EVIDENCE BREAKDOWN: YOUR PATTERN VS TODAY
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Sleep */}
              <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 12, border: '1px solid #FECACA', borderTop: '4px solid #EF4444' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>Sleep Duration</div>
                <div className="flex items-baseline justify-between" style={{ marginTop: 6 }}>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#991B1B', fontFamily: 'Space Grotesk' }}>5.4 h</div>
                    <div style={{ fontSize: 11, color: '#DC2626', fontWeight: 700 }}>Today (↓ 24%)</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>7.1 h</div>
                    <div style={{ fontSize: 10, color: '#94A3B8' }}>Your Baseline</div>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 12, border: '1px solid #FECACA', borderTop: '4px solid #EF4444' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>Physical Activity</div>
                <div className="flex items-baseline justify-between" style={{ marginTop: 6 }}>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#991B1B', fontFamily: 'Space Grotesk' }}>4,900</div>
                    <div style={{ fontSize: 11, color: '#DC2626', fontWeight: 700 }}>Today (↓ 37%)</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>7,800</div>
                    <div style={{ fontSize: 10, color: '#94A3B8' }}>Your Baseline</div>
                  </div>
                </div>
              </div>

              {/* Resting HR */}
              <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 12, border: '1px solid #FECACA', borderTop: '4px solid #EF4444' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>Resting Heart Rate</div>
                <div className="flex items-baseline justify-between" style={{ marginTop: 6 }}>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#991B1B', fontFamily: 'Space Grotesk' }}>78 bpm</div>
                    <div style={{ fontSize: 11, color: '#DC2626', fontWeight: 700 }}>Today (↑ 8%)</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>72 bpm</div>
                    <div style={{ fontSize: 10, color: '#94A3B8' }}>Your Baseline</div>
                  </div>
                </div>
              </div>

              {/* Well-being */}
              <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 12, border: '1px solid #FECACA', borderTop: '4px solid #EF4444' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>Well-Being State</div>
                <div className="flex items-baseline justify-between" style={{ marginTop: 6 }}>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#991B1B', fontFamily: 'Space Grotesk' }}>LOW</div>
                    <div style={{ fontSize: 11, color: '#DC2626', fontWeight: 700 }}>Today</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>GOOD</div>
                    <div style={{ fontSize: 10, color: '#94A3B8' }}>Your Baseline</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: WHY WAS THIS FLAGGED? */}
          <div style={{ background: '#F8FAFC', borderRadius: 14, border: '1px solid #E2E8F0', padding: 22, marginBottom: 28 }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
              <span className="material-symbols-outlined" style={{ color: '#2563EB', fontSize: 20 }}>checklist</span>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                WHY DID HEALTHSHIELD NOTICE THIS?
              </h3>
            </div>
            <p style={{ fontSize: 13, color: '#475569', marginBottom: 14 }}>
              Several observations moved away from your recent personal pattern at the same time:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ fontSize: 13 }}>
              <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: 10, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#DC2626', fontWeight: 800 }}>01</span>
                <span style={{ color: '#1E293B', fontWeight: 600 }}>Sleep is below your recent pattern (5.4h vs 7.1h).</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: 10, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#DC2626', fontWeight: 800 }}>02</span>
                <span style={{ color: '#1E293B', fontWeight: 600 }}>Activity is lower than your usual level (4,900 vs 7,800 steps).</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: 10, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#DC2626', fontWeight: 800 }}>03</span>
                <span style={{ color: '#1E293B', fontWeight: 600 }}>Resting heart rate is higher than your recent pattern (78 vs 72 bpm).</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: 10, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#DC2626', fontWeight: 800 }}>04</span>
                <span style={{ color: '#1E293B', fontWeight: 600 }}>Your reported well-being changed from Good to Low.</span>
              </div>
            </div>

            <div style={{ marginTop: 14, fontSize: 12, color: '#0EA47A', fontWeight: 700 }}>
              ✓ Governing Rule: {anomalyReport.ruleTriggered.name} ({anomalyReport.ruleTriggered.id}) verified • Status: {anomalyReport.patternStatus}.
            </div>
          </div>

          {/* Section: HEALTHSHIELD EXPLAINS (5-Part AI Explanation Format) */}
          <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: 14, padding: 22, marginBottom: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 22 }}>psychology</span>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  HEALTHSHIELD EXPLAINS (AI-Assisted Structured Format)
                </h3>
              </div>
              <span className="badge badge-stable" style={{ fontSize: 10 }}>
                AI Explains • Deterministic Safety Guardrail
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              {/* 1. What Changed */}
              <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, borderLeft: '4px solid #2563EB' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>
                  1. WHAT CHANGED?
                </span>
                <p style={{ fontSize: 13, color: '#1E293B', margin: '4px 0 0', fontWeight: 600 }}>
                  Your sleep duration (5.4h vs 7.1h) and daily steps (4,900 vs 7,800) are noticeably lower than your recent personal baseline, while resting heart rate shifted upward to 78 bpm.
                </p>
              </div>

              {/* 2. Why Flagged */}
              <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, borderLeft: '4px solid #0EA47A' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0EA47A', textTransform: 'uppercase' }}>
                  2. WHY WAS IT FLAGGED?
                </span>
                <p style={{ fontSize: 13, color: '#1E293B', margin: '4px 0 0', fontWeight: 600 }}>
                  Multiple observations shifted away from your recent personal pattern at the same time. HealthShield avoids triggering alarms from a single weak signal, but flags synchronized multi-signal shifts.
                </p>
              </div>

              {/* 3. What HealthShield Knows */}
              <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, borderLeft: '4px solid #7C3AED' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase' }}>
                  3. WHAT HEALTHSHIELD KNOWS
                </span>
                <p style={{ fontSize: 13, color: '#1E293B', margin: '4px 0 0', fontWeight: 600 }}>
                  HealthShield knows that today&apos;s observations differ meaningfully from your learned 30-day personal baseline data.
                </p>
              </div>

              {/* 4. What HealthShield Does NOT Know */}
              <div style={{ background: '#FFFBEB', padding: 14, borderRadius: 10, borderLeft: '4px solid #F59E0B' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#B45309', textTransform: 'uppercase' }}>
                  4. WHAT HEALTHSHIELD DOES NOT KNOW
                </span>
                <p style={{ fontSize: 13, color: '#78350F', margin: '4px 0 0', fontWeight: 600 }}>
                  These observations show a meaningful change from your recent pattern. They do not identify a medical cause or diagnose illness.
                </p>
              </div>

              {/* 5. What You Can Do Next */}
              <div style={{ background: '#F0FDF4', padding: 14, borderRadius: 10, borderLeft: '4px solid #16A34A' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#15803D', textTransform: 'uppercase' }}>
                  5. WHAT YOU CAN DO NEXT
                </span>
                <p style={{ fontSize: 13, color: '#14532D', margin: '4px 0 0', fontWeight: 600 }}>
                  Monitor your pattern. Complete another check-in tomorrow morning. Hydrate, rest, and seek professional medical advice if symptoms concern you or persist.
                </p>
              </div>
            </div>
          </div>

          {/* Section: ACTION CHECKLIST & CONSERVATIVE NEXT STEPS */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>
              Action Checklist
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {[
                { title: 'Prioritize Restorative Rest Tonight', description: 'Aim for 7–8 hours of restful sleep and reduce late-night screen exposure.', urgency: 'ROUTINE' },
                { title: 'Hydrate & Lighten Physical Exertion', description: 'Avoid strenuous high-intensity workouts while your resting heart rate is elevated.', urgency: 'WITHIN HOURS' },
                { title: 'Log Check-in Tomorrow Morning', description: 'Observe if values begin returning toward your personal 30-day baseline corridor.', urgency: 'ROUTINE' },
                { title: 'Seek Professional Care If Symptoms Persist', description: 'If unusual sensations, chest tightness, or severe discomfort arise, consult a doctor immediately.', urgency: 'IMMEDIATE' }
              ].map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    style={{
                      background: isDone ? '#F0FDF4' : '#FFFFFF',
                      border: isDone ? '1.5px solid #10B981' : '1px solid #CBD5E1',
                      borderRadius: 10,
                      padding: 16,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div 
                      style={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: 6, 
                        border: isDone ? 'none' : '2px solid #94A3B8',
                        background: isDone ? '#10B981' : 'transparent',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2
                      }}
                    >
                      {isDone && <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div className="flex items-center justify-between">
                        <strong style={{ fontSize: 14, color: isDone ? '#166534' : '#0F172A' }}>
                          Step {idx + 1}: {step.title}
                        </strong>
                        <span 
                          className={`badge ${step.urgency === 'IMMEDIATE' ? 'badge-alert' : step.urgency === 'WITHIN HOURS' ? 'badge-monitor' : 'badge-stable'}`}
                          style={{ fontSize: 11 }}
                        >
                          {step.urgency}
                        </span>
                      </div>
                      <p style={{ fontSize: 12, color: isDone ? '#15803D' : '#475569', marginTop: 4, lineHeight: 1.5 }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prominent Action Bar with ASK AI and VIEW TREND */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => onNavigate('assistant')}
                className="btn-primary"
                style={{ padding: '12px 20px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <span className="material-symbols-outlined">chat</span>
                ASK AI ABOUT THIS ALERT
              </button>

              <button
                onClick={() => onNavigate('trends')}
                className="btn-secondary"
                style={{ padding: '12px 20px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <span className="material-symbols-outlined">trending_up</span>
                VIEW 30-DAY TREND
              </button>

              <button
                onClick={() => setTrustedContactNotified(true)}
                className="btn-secondary"
                style={{ padding: '12px 20px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <span className="material-symbols-outlined">send</span>
                {trustedContactNotified ? 'Trusted Contact Notified ✓' : 'Notify Trusted Contact'}
              </button>

              <button
                onClick={onOpenEmergency}
                style={{
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#DC2626',
                  padding: '12px 18px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>emergency</span>
                Safety Hotline / Emergency
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
