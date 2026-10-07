import React, { useState } from 'react';

interface JudgeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToTab: (tab: string) => void;
}

export const JudgeDemoModal: React.FC<JudgeDemoModalProps> = ({
  isOpen,
  onClose,
  onJumpToTab,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const demoSteps = [
    {
      num: '01',
      title: 'Personal Health Baseline',
      subtitle: 'SFIC Criterion: Originality & Problem Clarity',
      targetTab: 'baseline',
      content: 'Standard health applications compare users to arbitrary generic population averages (e.g. 70 bpm). HealthShield computes a mathematical 30-day baseline corridor tailored to Sarah’s unique physiology, understanding her true resting norm.',
      keyMetric: '30-Day Rolling Gaussian Corridor',
      evalPoint: 'Solves the "False Alarm" fatigue endemic to generic health wearables.'
    },
    {
      num: '02',
      title: 'Daily Health Check & Voice Multimodal Telemetry',
      subtitle: 'SFIC Criterion: Accessibility & Polytechnic Feasibility',
      targetTab: 'checkin',
      content: 'A rapid 60-second check-in captures subjective symptoms, energy, and speech acoustics. Using lightweight on-device models, hands-free voice transcription enables elderly or motor-impaired individuals to participate effortlessly.',
      keyMetric: '60-Second Longitudinal Calibration',
      evalPoint: 'Aligned directly with the Swasth & Samavesh Bharat national inclusion theme.'
    },
    {
      num: '03',
      title: 'Change Detection Engine',
      subtitle: 'SFIC Criterion: Demonstrated Feasibility (Track A)',
      targetTab: 'command',
      content: 'Rather than flagging isolated numbers, HealthShield runs a multi-parameter covariance divergence test (Mahalanobis distance). It correlates Sarah’s -35% sleep reduction with a -30% drop in HRV and +19% resting tachy drift.',
      keyMetric: 'Divergence Score: 8.4 / 10.0 (p < 0.001)',
      evalPoint: 'Detects systemic physiological strain 24–48 hours before acute clinical symptoms emerge.'
    },
    {
      num: '04',
      title: 'Deterministic Safety Rules Engine',
      subtitle: 'SFIC Criterion: Patient Safety & Clinical Feasibility',
      targetTab: 'command',
      content: 'AI explains, but deterministic safety rules govern triage. Rule #101 verifies absence of critical emergency vitals (e.g., SpO₂ < 90%). Rule #204 identifies early autonomic strain and safely routes the advisory away from unnecessary ER visits.',
      keyMetric: 'Rule #204 Fired — Emergency Cleared',
      evalPoint: 'Guarantees AI cannot hallucinate emergency diagnoses or misguide acute care.'
    },
    {
      num: '05',
      title: 'Explainable Alert & Recommended Next Steps',
      subtitle: 'SFIC Criterion: Beneficiary Usability',
      targetTab: 'alert',
      content: 'Instead of terrifying users with vague percentages ("Risk: 78%"), HealthShield answers three human questions: What changed? Why was it flagged? What should you do right now? It directs the user to hydrate, rest, and recheck in 4 hours.',
      keyMetric: 'No-Panic Transparent Guidance',
      evalPoint: 'Empowers patients with agency and clear clinical boundaries.'
    },
    {
      num: '06',
      title: 'Offline-First & Zero PHI Cloud Leak',
      subtitle: 'SFIC Criterion: Cost & Deployability in Rural India',
      targetTab: 'command',
      content: 'HealthShield operates 100% offline using encrypted local SQLite storage and on-device mathematical inference. Rural clinics and disconnected communities maintain full preventive monitoring without costly servers or constant internet.',
      keyMetric: 'Zero Cloud Dependency • Zero PHI Leak',
      evalPoint: 'Zero bandwidth operational cost drastically lowers total cost of ownership.'
    },
    {
      num: '07',
      title: 'Scalability & Public Health Impact',
      subtitle: 'SFIC Criterion: Beneficiary Impact & Scalability',
      targetTab: 'impact',
      content: 'Scales from individual awareness to family caregiver loops, school health stations, and primary health centers (PHCs). By shifting from reactive hospitalization to early preventive awareness, it reduces secondary healthcare burdens.',
      keyMetric: 'Tier 1 to Tier 3 Scalability Model',
      evalPoint: 'High-impact low-cost innovation suitable for nationwide polytechnic adoption.'
    }
  ];

  const active = demoSteps[currentStep];

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      const nextIdx = currentStep + 1;
      setCurrentStep(nextIdx);
      onJumpToTab(demoSteps[nextIdx].targetTab);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevIdx = currentStep - 1;
      setCurrentStep(prevIdx);
      onJumpToTab(demoSteps[prevIdx].targetTab);
    }
  };

  return (
    <div className="modal-overlay">
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: 680, 
          width: '100%', 
          padding: 32, 
          background: '#FFFFFF',
          border: '1.5px solid #CBD5E1',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)' 
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <div className="flex items-center gap-2">
            <span 
              style={{ 
                background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', 
                color: '#FFF', 
                padding: '4px 8px', 
                borderRadius: 6, 
                fontSize: 11, 
                fontWeight: 800 
              }}
            >
              SFIC EVALUATOR MODE
            </span>
            <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>
              Guided 2-Minute Proof Walkthrough
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="btn-ghost" 
            style={{ padding: '4px 8px' }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="progress-track" style={{ marginBottom: 24, height: 6 }}>
          <div 
            className="progress-fill" 
            style={{ 
              width: `${((currentStep + 1) / demoSteps.length) * 100}%`, 
              background: 'linear-gradient(90deg, #7C3AED, #0EA47A)' 
            }} 
          />
        </div>

        {/* Step Card Content */}
        <div>
          <div className="flex items-center gap-3" style={{ marginBottom: 8 }}>
            <span 
              style={{ 
                fontFamily: 'Space Grotesk', 
                fontSize: 28, 
                fontWeight: 800, 
                color: '#7C3AED',
                lineHeight: 1
              }}
            >
              {active.num}
            </span>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                {active.title}
              </h2>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#059669', marginTop: 2 }}>
                {active.subtitle}
              </div>
            </div>
          </div>

          <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, marginTop: 16, marginBottom: 16 }}>
            {active.content}
          </p>

          {/* Highlights Box */}
          <div 
            style={{ 
              background: '#F8FAFC', 
              border: '1px solid #E2E8F0', 
              borderRadius: 12, 
              padding: '12px 16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginBottom: 24
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Key Technical Metric
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginTop: 2 }}>
                {active.keyMetric}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                SFIC Alignment
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#2563EB', marginTop: 2 }}>
                {active.evalPoint}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between" style={{ paddingTop: 16, borderTop: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>
            Step {currentStep + 1} of {demoSteps.length}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="btn-secondary"
              style={{ opacity: currentStep === 0 ? 0.4 : 1, padding: '8px 16px' }}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="btn-primary"
              style={{ padding: '8px 20px', background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}
            >
              {currentStep === demoSteps.length - 1 ? 'Finish Demo' : 'Next Step →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
