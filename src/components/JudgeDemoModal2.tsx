import React, { useState } from 'react';

interface JudgeDemoModal2Props {
  isOpen: boolean;
  onClose: () => void;
  onJumpToTab?: (tab: string) => void;
}

interface Step {
  stepNumber: string;
  title: string;
  timeMark: string;
  narrative: string;
  visualHighlight: string;
  keyTakeaway: string;
  tabTarget?: string;
}

const STEPS: Step[] = [
  {
    stepNumber: '01',
    title: 'THE PROBLEM',
    timeMark: '0:00 - 0:20',
    narrative: 'Raw health telemetry tells users what a number is (e.g., 78 BPM), but fails to explain whether that number represents a meaningful, personal change. Users are either panicked by generic alarms or ignore subtle early shifts.',
    visualHighlight: 'Isolated heart rate reading (78 BPM) without context leaves users confused.',
    keyTakeaway: 'The core challenge is personal clinical meaning, not raw data collection.',
    tabTarget: 'command'
  },
  {
    stepNumber: '02',
    title: 'PERSONAL BASELINE',
    timeMark: '0:20 - 0:40',
    narrative: 'HealthShield learns a person\'s 30-day normal pattern rather than relying on population generalities. For our simulated participant: Sleep: 7.1h, Steps: 7,800, Resting HR: 72 BPM, Wellbeing: GOOD.',
    visualHighlight: 'Baseline Confidence: ESTABLISHED (30 verified historical observations).',
    keyTakeaway: 'A baseline is unique to the individual. HealthShield learns your baseline.',
    tabTarget: 'baseline'
  },
  {
    stepNumber: '03',
    title: 'NEW OBSERVATIONS',
    timeMark: '0:40 - 0:55',
    narrative: 'New observations arrive via the device normalizer adapter: Sleep drops to 5.4h, Steps decrease to 4,900, Resting HR shifts to 78 BPM, and the user self-reports LOW energy.',
    visualHighlight: 'Data Provenance verified: Simulated BLE Adapter + Self-Reported Check-in.',
    keyTakeaway: 'Full provenance tracking distinguishes observed, self-reported, and simulated data.',
    tabTarget: 'record'
  },
  {
    stepNumber: '04',
    title: 'CHANGE DETECTED',
    timeMark: '0:55 - 1:15',
    narrative: 'The Pattern Engine detects a multi-parameter covariance shift: Resting HR is +8.3% above baseline, while sleep duration has contracted by -23.9% across consecutive nights.',
    visualHighlight: 'Divergence Status: SIGNIFICANT CHANGE (Calculated delta > 2.0 SD).',
    keyTakeaway: 'Early pattern recognition happens days before acute symptoms manifest.',
    tabTarget: 'alert'
  },
  {
    stepNumber: '05',
    title: 'EXPLAINABLE ALERT',
    timeMark: '1:15 - 1:30',
    narrative: 'The explanation layer translates mathematical deltas into plain language. It explains WHICH signals moved, WHY it was flagged, and provides safe, actionable next steps.',
    visualHighlight: 'Explainable guidance card: "Resting HR has stayed above personal baseline."',
    keyTakeaway: 'No black-box scores. Complete transparency into why an alert fired.',
    tabTarget: 'alert'
  },
  {
    stepNumber: '06',
    title: 'SAFETY ENGINE GUARDRAIL',
    timeMark: '1:30 - 1:45',
    narrative: 'Hard Architectural Rule: AI can explain a result; AI cannot override the safety engine. All triage logic follows clinician-reviewed Rule HS-WELL-001. HealthShield never claims medical diagnosis.',
    visualHighlight: 'Safety Engine HS-WELL-001 active; AI temperature bound; triage locked.',
    keyTakeaway: 'Deterministic safety rules protect beneficiaries from language model hallucinations.',
    tabTarget: 'technology'
  },
  {
    stepNumber: '07',
    title: 'INCLUSION 2.0 (THEME 3)',
    timeMark: '1:45 - 2:00',
    narrative: 'Assistive inclusion for diverse demographics. One tap switches to authentic Telugu localization, Simple Mode with huge touch buttons (😊 GOOD / 😐 OKAY / 😟 NOT WELL), and browser speech synthesis.',
    visualHighlight: 'Telugu Interface: "ఈరోజు మీ ఆరోగ్యం ఎలా ఉంది?" + Speech output.',
    keyTakeaway: 'Genuine inclusion reaches elderly citizens and rural communities.',
    tabTarget: 'simple'
  },
  {
    stepNumber: '08',
    title: 'OFFLINE SYNCHRONIZATION',
    timeMark: '2:00 - 2:15',
    narrative: 'Field-ready resilience: In intermittent connectivity areas, check-ins persist in browser IndexedDB. Upon reconnection, records sync idempotently without duplicate observations.',
    visualHighlight: 'Sync banner: LOCAL MODE → SYNC PENDING → SYNC COMPLETE.',
    keyTakeaway: 'Network outages do not interrupt vital personal health logging.',
    tabTarget: 'command'
  },
  {
    stepNumber: '09',
    title: 'TRUSTED CIRCLE & DPDP CONSENT',
    timeMark: '2:15 - 2:30',
    narrative: 'User remains sovereign over their data. Granular DPDP consents allow sharing sleep trends with family while keeping detailed telemetry and AI interactions strictly private.',
    visualHighlight: 'Trusted Contact Ananya Rao: Sleep trend shared ✓, Raw observations private ✕.',
    keyTakeaway: 'DPDP Act 2023 compliant privacy by design, not a single blanket checkbox.',
    tabTarget: 'circle'
  },
  {
    stepNumber: '10',
    title: 'PILOT EVIDENCE & HONESTY',
    timeMark: '2:30 - 2:45',
    narrative: 'SFIC Evaluators value verifiable evidence over fake claims. We display measured metrics from our 42-student campus pilot (81.4% check-in completion, 48s avg time) and openly label clinical trials as PLANNED.',
    visualHighlight: 'Evidence Scorecard: 5 Measured Metrics + 2 Planned Clinical Trials.',
    keyTakeaway: 'Honesty and measured pilot evidence build undeniable judge credibility.',
    tabTarget: 'pilot'
  },
  {
    stepNumber: '11',
    title: 'COST & WHO PAYS?',
    timeMark: '2:45 - 2:55',
    narrative: 'Transparent cost model: ₹8.40 per user per month. Feasible for college student welfare funds, NGO community grants, and District Health Societies.',
    visualHighlight: 'Interactive Calculator: 500 users = ₹4,200/mo total platform infrastructure.',
    keyTakeaway: 'Economically sustainable without high proprietary cloud lock-in.',
    tabTarget: 'cost'
  },
  {
    stepNumber: '12',
    title: 'SCALE & SFIC CLOSING',
    timeMark: '2:55 - 3:00',
    narrative: '"HealthShield doesn\'t try to tell people what disease they have. It helps them understand when their own health pattern changes — and what the appropriate next step may be."',
    visualHighlight: 'Scale Pathway: Individual → Family → Campus Cohort → Community → District.',
    keyTakeaway: 'Scalable preventive health architecture ready for SFIC Track A national finals.',
    tabTarget: 'readiness'
  }
];

export const JudgeDemoModal2: React.FC<JudgeDemoModal2Props> = ({ isOpen, onClose, onJumpToTab }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentStep = STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handleJumpToLiveUI = () => {
    if (currentStep.tabTarget && onJumpToTab) {
      onJumpToTab(currentStep.tabTarget);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10001,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 24,
          maxWidth: 780,
          width: '100%',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '20px 28px', background: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ background: '#7C3AED', color: '#FFF', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
              SFIC 2.0
            </span>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>3-Minute SFIC National Judge Demonstration</h2>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>Step {currentStep.stepNumber} of 12 • Deterministic Offline Script</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              color: '#FFF',
              fontSize: 16,
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Step Progress Line */}
        <div style={{ display: 'flex', background: '#1E293B', padding: '8px 24px', gap: 6, overflowX: 'auto' }}>
          {STEPS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIdx(idx)}
              style={{
                background: currentStepIdx === idx ? '#7C3AED' : currentStepIdx > idx ? '#059669' : '#334155',
                color: '#FFF',
                border: 'none',
                borderRadius: 4,
                padding: '4px 8px',
                fontSize: 10,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {s.stepNumber} {s.title}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Step Title & Timestamp */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase' }}>
                STAGE {currentStep.stepNumber} • {currentStep.timeMark}
              </span>
              <h1 style={{ margin: '4px 0 0 0', fontSize: 24, fontWeight: 900, color: '#0F172A' }}>
                {currentStep.title}
              </h1>
            </div>
            {currentStep.tabTarget && (
              <button
                onClick={handleJumpToLiveUI}
                style={{
                  background: '#F5F3FF',
                  color: '#7C3AED',
                  border: '1px solid #DDD6FE',
                  borderRadius: 10,
                  padding: '8px 14px',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Jump to Live Screen ↗
              </button>
            )}
          </div>

          {/* Spoken Pitch Narrative Box */}
          <div style={{ background: '#F8FAFC', borderRadius: 16, padding: '20px 24px', borderLeft: '5px solid #7C3AED' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>
              Spoken Pitch Script (Judge Addressing)
            </div>
            <p style={{ margin: 0, fontSize: 16, color: '#1E293B', lineHeight: 1.6, fontStyle: 'italic' }}>
              &ldquo;{currentStep.narrative}&rdquo;
            </p>
          </div>

          {/* Visual Highlight & Key Takeaway Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, background: '#EFF6FF' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#1E40AF', textTransform: 'uppercase', marginBottom: 4 }}>
                On-Screen Visual State
              </div>
              <div style={{ fontSize: 13, color: '#1E3A8A', fontWeight: 600 }}>
                {currentStep.visualHighlight}
              </div>
            </div>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, background: '#ECFDF5' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#065F46', textTransform: 'uppercase', marginBottom: 4 }}>
                Judge Evaluation Takeaway
              </div>
              <div style={{ fontSize: 13, color: '#064E3B', fontWeight: 600 }}>
                {currentStep.keyTakeaway}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div style={{ padding: '16px 28px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleRestart}
              style={{
                background: '#FFFFFF',
                color: '#64748B',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Restart
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: isPlaying ? '#FEF3C7' : '#FFFFFF',
                color: isPlaying ? '#92400E' : '#64748B',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {isPlaying ? '⏸ Pause' : '▶ Auto-Advance'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              disabled={currentStepIdx === 0}
              onClick={handlePrev}
              style={{
                background: '#FFFFFF',
                color: currentStepIdx === 0 ? '#CBD5E1' : '#0F172A',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: 700,
                cursor: currentStepIdx === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Back
            </button>
            <button
              onClick={currentStepIdx === STEPS.length - 1 ? onClose : handleNext}
              style={{
                background: currentStepIdx === STEPS.length - 1 ? '#059669' : '#7C3AED',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                padding: '8px 24px',
                fontSize: 13,
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {currentStepIdx === STEPS.length - 1 ? 'Finish Demonstration' : 'Next Step →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
