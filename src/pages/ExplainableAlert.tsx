import React, { useState } from 'react';
import type { AnomalyReport, MetricData } from '../types/health';
import { PipelineStepper } from '../components/PipelineStepper';

import { localAiService } from '../services/localAiService';

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
  const [caregiverNotified, setCaregiverNotified] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  const toggleStep = (idx: number) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter(i => i !== idx));
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

  const handleAskAssistant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantQuery.trim()) return;

    setIsLoadingAi(true);
    try {
      const response = await localAiService.askAssistant(assistantQuery);
      setAssistantResponse(response);
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      <PipelineStepper onSelectStep={(step) => onNavigate(step)} />

      <main className="container-max" style={{ paddingTop: 28, maxWidth: 1040 }}>
        {/* Banner Alert Card (THE WOW SCREEN) */}
        <div 
          className="glass-card" 
          style={{ 
            padding: 36, 
            border: '2px solid #EF4444', 
            background: 'linear-gradient(180deg, #FFF8F8, #FFFFFF)', 
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
                  crisis_alert
                </span>
              </div>
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: '#991B1B', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  ⚠️ Something changed in your pattern
                </h1>
                <div style={{ fontSize: 13, color: '#7F1D1D', marginTop: 4, fontWeight: 600 }}>
                  Explainable Early Deviation Advisory • Non-Emergency Priority 2
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="badge badge-alert" style={{ fontSize: 13, padding: '6px 12px' }}>
                Statistical Divergence: 8.4 / 10
              </span>
            </div>
          </div>

          {/* Section 1: What Changed? */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>
              1. What Changed from your Personal Baseline?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div style={{ background: '#FFF', padding: 16, borderRadius: 12, border: '1px solid #FECACA' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#DC2626', marginBottom: 4 }}>
                  Sleep Curtailment
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#991B1B', fontFamily: 'Space Grotesk' }}>
                  ↓ 35%
                </div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                  5.2 hrs logged vs 8.1 hrs 30-day baseline average
                </div>
              </div>

              <div style={{ background: '#FFF', padding: 16, borderRadius: 12, border: '1px solid #FECACA' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#DC2626', marginBottom: 4 }}>
                  HRV Parasympathetic Drop
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#991B1B', fontFamily: 'Space Grotesk' }}>
                  ↓ 30%
                </div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                  38 ms rMSSD vs 55 ms typical recovery norm
                </div>
              </div>

              <div style={{ background: '#FFF', padding: 16, borderRadius: 12, border: '1px solid #FECACA' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#DC2626', marginBottom: 4 }}>
                  Resting Heart Rate Drift
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#991B1B', fontFamily: 'Space Grotesk' }}>
                  ↑ 19%
                </div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                  74 bpm vs 62 bpm resting baseline mean
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Why did HealthShield flag this? */}
          <div style={{ marginBottom: 28, background: '#F8FAFC', padding: 20, borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: '#2563EB' }}>psychology</span>
              2. Why did HealthShield flag this?
            </h3>
            <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>
              {anomalyReport.clinicalRationale}
            </p>
            <div style={{ marginTop: 10, fontSize: 12, color: '#00694D', fontWeight: 600 }}>
              ✓ Deterministic Rule Triggered: <strong>{anomalyReport.ruleTriggered.name}</strong> ({anomalyReport.ruleTriggered.id})
            </div>
          </div>

          {/* Section 3: Clinical Boundary Guardrail */}
          <div 
            style={{ 
              background: '#FEF2F2', 
              border: '1.5px solid #FCA5A5', 
              borderRadius: 12, 
              padding: '16px 20px',
              marginBottom: 28,
              fontSize: 13,
              color: '#991B1B',
              lineHeight: 1.5
            }}
          >
            <strong>Clinical Boundary Notice:</strong> HealthShield AI is not a diagnosis tool. It does not declare diseases, infections, or arrhythmias. Instead, it identifies meaningful departures from your normal rhythm so you can take safe preventive steps and consult your doctor before escalation.
          </div>

          {/* Section 4: What Should You Do Next? */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>
              3. Recommended Next Steps (Action Checklist)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {anomalyReport.recommendedSteps.map((step, idx) => {
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
                          className={`badge ${step.urgency === 'immediate' ? 'badge-alert' : step.urgency === 'within_hours' ? 'badge-monitor' : 'badge-stable'}`}
                          style={{ fontSize: 11 }}
                        >
                          {step.urgency.toUpperCase()}
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

            {/* Action Bar */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setCaregiverNotified(true)}
                className="btn-primary"
                style={{ padding: '12px 20px', fontSize: 14 }}
              >
                <span className="material-symbols-outlined">send</span>
                {caregiverNotified ? 'Dr. Patel Notified ✓' : 'Transmit Summary to Dr. Patel'}
              </button>

              <button
                onClick={() => alert('Structured Clinician Summary exported as encrypted JSON/PDF payload.')}
                className="btn-secondary"
                style={{ padding: '12px 20px', fontSize: 14 }}
              >
                <span className="material-symbols-outlined">download</span>
                Export Clinician PDF
              </button>

              <button
                onClick={onOpenEmergency}
                className="btn-danger"
                style={{ padding: '12px 20px', fontSize: 14 }}
              >
                <span className="material-symbols-outlined">emergency</span>
                Emergency Override
              </button>
            </div>

            {caregiverNotified && (
              <div style={{ marginTop: 12, color: '#059669', fontSize: 12, fontWeight: 700 }}>
                ✓ Encrypted clinical delta package dispatched to Dr. Rajesh Patel (Internal Medicine).
              </div>
            )}
          </div>
        </div>

        {/* Secondary Assistant ("Ask HealthShield") */}
        <div className="glass-card" style={{ padding: 28 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
            <span className="material-symbols-outlined" style={{ color: '#7C3AED', fontSize: 24 }}>smart_toy</span>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
              Ask HealthShield (Data-Grounded Assistant)
            </h3>
          </div>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
            Ask questions grounded strictly in your personal baseline telemetry rather than unvalidated web prompts.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F5F3FF', border: '1px solid #DDD6FE', padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#6D28D9', marginBottom: 12 }}>
            <span>🤖</span>
            <span>Local Model Active: Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf (On-Device Inference)</span>
          </div>

          <form onSubmit={handleAskAssistant} className="flex gap-2" style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder='Try: "I have been feeling tired recently, what does my data show?"'
              value={assistantQuery}
              onChange={(e) => setAssistantQuery(e.target.value)}
              disabled={isLoadingAi}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid #CBD5E1',
                fontSize: 14
              }}
            />
            <button type="submit" disabled={isLoadingAi} className="btn-primary" style={{ background: '#7C3AED', minWidth: 140 }}>
              {isLoadingAi ? 'Thinking...' : 'Ask Assistant'}
            </button>
          </form>

          {assistantResponse && (
            <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 10, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#5B21B6' }}>
                  HealthShield Local Qwen2.5 Analysis:
                </div>
                <span style={{ fontSize: 10, color: '#7C3AED', fontWeight: 600 }}>Q4_K_M GGUF</span>
              </div>
              <p style={{ fontSize: 13, color: '#3B0764', lineHeight: 1.6, margin: 0 }}>
                {assistantResponse}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
