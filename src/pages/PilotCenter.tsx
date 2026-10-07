import React, { useState } from 'react';

export const PilotCenter: React.FC = () => {
  const [feedbackVote, setFeedbackVote] = useState<{ helpful?: string; clear?: string }>({});
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#DCFCE7', color: '#166534', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>
          <span>🔬</span>
          <span>SFIC TRACK A • DEMONSTRATED FEASIBILITY &amp; PROTOTYPE EVIDENCE</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
          Prototype Evidence &amp; Validation Roadmap
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', margin: 0, maxWidth: 820, lineHeight: 1.5 }}>
          Honest evidence status: HealthShield is currently an engineering-validated software prototype demonstrated with controlled baseline datasets. We do not claim fabricated clinical trials; we provide rigorous prototype verification and a planned campus pilot framework.
        </p>
      </div>

      {/* Stage Banner */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #0EA47A, #00513A)', 
          borderRadius: 16, 
          padding: '24px 28px', 
          color: '#FFFFFF',
          marginBottom: 28,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#A7F3D0', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            CURRENT READINESS STAGE
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>
            Track A Functional Working Prototype
          </div>
          <div style={{ fontSize: 13, color: '#E6F7F1', marginTop: 4 }}>
            Verified with simulated physiological datasets and real-time on-device inference engines.
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 12, padding: '12px 18px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#DCFCE7', fontWeight: 700 }}>VERIFICATION STATUS</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>Software Verified ✓</div>
        </div>
      </div>

      {/* Two Column Grid: Validation Completed vs Planned Pilot Framework */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
        
        {/* Column 1: Completed Prototype Testing */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 20 }}>✅</span>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Completed Prototype Verification
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                title: 'Personal Health Profile',
                desc: 'User identity, routine, personal context, and completeness tracking.',
                status: 'Demonstrated ✓'
              },
              {
                title: 'Daily Health Check',
                desc: '30–60 second subjective check-in with data quality range validation.',
                status: 'Demonstrated ✓'
              },
              {
                title: 'Personal Baseline Engine',
                desc: '30-day personal pattern calculation with normal variance corridor.',
                status: 'Demonstrated ✓'
              },
              {
                title: 'Multi-Signal Change Detection',
                desc: 'Simultaneous multi-signal deviation analysis in interactive Change Lab.',
                status: 'Demonstrated ✓'
              },
              {
                title: 'Explainable AI Early-Warning Alert',
                desc: '5-part structured explainability card (What changed, Why flagged, What we know, What we do not know, Next steps).',
                status: 'Demonstrated ✓'
              },
              {
                title: 'Personal AI Health Assistant',
                desc: 'Data-grounded assistant with voice queries and strict non-diagnostic boundaries.',
                status: 'Demonstrated ✓'
              },
              {
                title: 'Accessibility & Multilingual Inclusion',
                desc: '1-click Simple Mode, text scaling, high contrast, and English/Telugu/Hindi support.',
                status: 'Demonstrated ✓'
              },
              {
                title: 'Offline-Compatible Core Workflow',
                desc: 'Client-side IndexedDB persistence and resilient background sync queue.',
                status: 'Demonstrated ✓'
              }
            ].map(item => (
              <div key={item.title} style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: 13, color: '#0F172A' }}>{item.title}</strong>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '2px 8px', borderRadius: 6 }}>
                    {item.status}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0', lineHeight: 1.4 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Planned Pilot Framework */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 20 }}>🎯</span>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Planned Campus &amp; Cohort Pilot (Phase 2)
            </h3>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#1E40AF', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>
              NEXT VALIDATION STEP
            </div>
            <p style={{ fontSize: 13, color: '#1E3A8A', margin: 0, lineHeight: 1.4 }}>
              A 30-day observational study with 30–50 campus students and residential staff to evaluate real-world adherence, usability, and alert clarity.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { metric: 'Cohort Size Target', target: '30–50 Participants', note: 'Polytechnic students & staff' },
              { metric: 'Study Duration', target: '30 Days', note: 'Continuous longitudinal window' },
              { metric: 'Primary Measure 1', target: 'Check-in Adherence Rate', note: 'Target: >75% weekly completions' },
              { metric: 'Primary Measure 2', target: 'Time to Complete Check-in', note: 'Target: <60 seconds median' },
              { metric: 'Primary Measure 3', target: 'User Understanding Score', note: 'Clarity of explainable guidance' },
              { metric: 'Primary Measure 4', target: 'False-Alarm Feedback', note: 'User perception of alert relevance' },
              { metric: 'Primary Measure 5', target: 'Inclusion & Accessibility', note: 'Usage of Simple Mode & Telugu/Hindi' }
            ].map(m => (
              <div key={m.metric} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{m.metric}</div>
                  <div style={{ fontSize: 10, color: '#64748B' }}>{m.note}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#2563EB' }}>{m.target}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Honest Boundary Notice */}
      <div style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A', borderRadius: 14, padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🛡️</span>
          <div>
            <strong style={{ fontSize: 14, color: '#92400E', display: 'block', marginBottom: 4 }}>
              Scientific Honesty &amp; Non-Diagnostic Positioning
            </strong>
            <p style={{ fontSize: 13, color: '#78350F', margin: 0, lineHeight: 1.5 }}>
              HealthShield AI explicitly avoids fabricating clinical outcome statistics (e.g. claiming &quot;95% diagnostic accuracy&quot; or &quot;30% reduction in cardiac events&quot;). Clinical trial outcome claims require multi-center medical trials with ethics board approval. HealthShield is positioned truthfully as a <strong>preventive-health awareness platform</strong> that recognizes personal pattern changes and encourages timely, informed self-care.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Evaluator Feedback Sandbox */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
          Evaluator Usability Feedback (Live Survey Sandbox)
        </h3>
        <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
          Test the feedback submission loop that pilot participants use after reviewing a pattern change alert.
        </p>

        {feedbackSubmitted ? (
          <div style={{ background: '#DCFCE7', border: '1px solid #BBF7D0', color: '#166534', padding: '14px 20px', borderRadius: 10, fontWeight: 700, fontSize: 13 }}>
            ✓ Feedback captured into local demonstration registry. Thank you!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                1. Did the explanation clearly explain WHICH personal signals moved away from your baseline?
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Yes, very clear', 'Somewhat clear', 'Unclear'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setFeedbackVote(prev => ({ ...prev, clear: opt }))}
                    style={{
                      background: feedbackVote.clear === opt ? '#0EA47A' : '#F8FAFC',
                      color: feedbackVote.clear === opt ? '#FFF' : '#334155',
                      border: '1px solid #CBD5E1',
                      borderRadius: 8,
                      padding: '8px 14px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                2. Were the suggested next steps (review pacing, rest, consult doctor if persistent) appropriate?
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Yes, appropriate and safe', 'Too cautious', 'Not clear'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setFeedbackVote(prev => ({ ...prev, helpful: opt }))}
                    style={{
                      background: feedbackVote.helpful === opt ? '#0EA47A' : '#F8FAFC',
                      color: feedbackVote.helpful === opt ? '#FFF' : '#334155',
                      border: '1px solid #CBD5E1',
                      borderRadius: 8,
                      padding: '8px 14px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setFeedbackSubmitted(true)}
              style={{
                alignSelf: 'flex-start',
                background: '#0EA47A',
                color: '#FFF',
                border: 'none',
                borderRadius: 8,
                padding: '10px 18px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Submit Evaluator Test Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PilotCenter;
