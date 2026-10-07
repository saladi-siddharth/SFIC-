import React from 'react';
import { PipelineStepper } from '../components/PipelineStepper';

interface TechnologyPageProps {
  onNavigate: (tab: string) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ paddingBottom: 60 }}>
      <PipelineStepper onSelectStep={(step) => onNavigate(step)} />

      <main className="container-max" style={{ paddingTop: 28, maxWidth: 1080 }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#0EA47A', textTransform: 'uppercase' }}>
            SYSTEM ARCHITECTURE &amp; TECHNICAL SPECIFICATION
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginTop: 4 }}>
            How HealthShield AI Operates
          </h1>
          <p style={{ fontSize: 16, color: '#475569', maxWidth: 720, margin: '8px auto 0', lineHeight: 1.6 }}>
            A dual-engine architecture separating deterministic clinical safety logic from generative neural explanations.
          </p>
        </div>

        {/* The Key Technical Mantra Callout */}
        <div 
          className="glass-card" 
          style={{ 
            padding: 24, 
            background: 'linear-gradient(135deg, #E6F7F1, #EFF6FF)', 
            border: '1.5px solid #0EA47A', 
            textAlign: 'center',
            marginBottom: 36 
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: '#00694D', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            FOUNDATIONAL SAFETY PRINCIPLE
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginTop: 6 }}>
            "AI explains. Safety logic controls the alert workflow."
          </h2>
          <p style={{ fontSize: 14, color: '#475569', maxWidth: 700, margin: '8px auto 0' }}>
            Neural networks are non-deterministic and can hallucinate medical advice. HealthShield strictly gates all alerts and clinical actions behind deterministic rule engines verified against physician standards.
          </p>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="glass-card" style={{ padding: 36, marginBottom: 36 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 24, textAlign: 'center' }}>
            End-to-End Computational Pipeline
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            {/* Tier 1: Ingestion */}
            <div className="flex items-center gap-6" style={{ width: '100%', maxWidth: 640 }}>
              <div style={{ flex: 1, background: '#FFF', border: '1.5px solid #CBD5E1', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: '#2563EB', fontSize: 24 }}>touch_app</span>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#0F172A', marginTop: 4 }}>USER INPUT</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>60-sec check-in, symptoms, voice</div>
              </div>
              <div style={{ fontWeight: 700, color: '#94A3B8' }}>+</div>
              <div style={{ flex: 1, background: '#FFF', border: '1.5px solid #CBD5E1', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 24 }}>sensors</span>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#0F172A', marginTop: 4 }}>SENSOR DATA</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>HR, SpO₂, HRV, temp drift</div>
              </div>
            </div>

            <span className="material-symbols-outlined" style={{ color: '#94A3B8' }}>arrow_downward</span>

            {/* Tier 2: Validation */}
            <div style={{ width: '100%', maxWidth: 640, background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 12, padding: 14, textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: '#0F172A' }}>DATA VALIDATION &amp; ARTIFACT FILTER</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>Motion artifact scrubbing, timestamp alignment, noise rejection</div>
            </div>

            <span className="material-symbols-outlined" style={{ color: '#94A3B8' }}>arrow_downward</span>

            {/* Tier 3: Personal Baseline Engine */}
            <div style={{ width: '100%', maxWidth: 640, background: '#E6F7F1', border: '2px solid #0EA47A', borderRadius: 12, padding: 16, textAlign: 'center', boxShadow: '0 4px 12px rgba(14, 164, 122, 0.15)' }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: '#00694D' }}>PERSONAL BASELINE ENGINE</div>
              <div style={{ fontSize: 12, color: '#047857', marginTop: 2 }}>
                30-day rolling Gaussian parameterization • Individual variance corridors (±1.5σ)
              </div>
            </div>

            <span className="material-symbols-outlined" style={{ color: '#94A3B8' }}>arrow_downward</span>

            {/* Tier 4: Pattern Engine */}
            <div style={{ width: '100%', maxWidth: 640, background: '#EFF6FF', border: '2px solid #2563EB', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: '#1D4ED8' }}>CHANGE DETECTION ENGINE</div>
              <div style={{ fontSize: 12, color: '#1E40AF', marginTop: 2 }}>
                Mahalanobis multivariate divergence distance • Anomaly cluster scoring
              </div>
            </div>

            <span className="material-symbols-outlined" style={{ color: '#94A3B8' }}>arrow_downward</span>

            {/* Tier 5: Split Engines */}
            <div className="flex items-center gap-6" style={{ width: '100%', maxWidth: 640 }}>
              <div style={{ flex: 1, background: '#FEF2F2', border: '2px solid #DC2626', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: '#DC2626', fontSize: 24 }}>gavel</span>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#991B1B', marginTop: 4 }}>SAFETY RULE ENGINE</div>
                <div style={{ fontSize: 11, color: '#7F1D1D' }}>Deterministic triage filter &amp; boundaries</div>
              </div>
              <div style={{ flex: 1, background: '#F5F3FF', border: '2px solid #7C3AED', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: '#7C3AED', fontSize: 24 }}>psychology</span>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#5B21B6', marginTop: 4 }}>AI EXPLANATION ENGINE</div>
                <div style={{ fontSize: 11, color: '#4C1D95' }}>Plain-language reasoning &amp; correlation</div>
              </div>
            </div>

            <span className="material-symbols-outlined" style={{ color: '#94A3B8' }}>arrow_downward</span>

            {/* Tier 6: Action Guidance */}
            <div style={{ width: '100%', maxWidth: 640, background: '#DCFCE7', border: '2px solid #16A34A', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: '#166534' }}>RECOMMENDED NEXT STEP GUIDANCE</div>
              <div style={{ fontSize: 12, color: '#15803D', marginTop: 2 }}>
                Hydration, retest timings, encrypted clinician sharing, emergency escalations
              </div>
            </div>
          </div>
        </div>

        {/* 4 Technical Differentiator Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card" style={{ padding: 24 }}>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
              1. Local-First SQLite Edge Storage
            </h4>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              All baseline history, check-ins, and calculations reside on-device. No telemetry is sold, brokered, or processed by centralized servers, ensuring HIPAA/GDPR alignment by design.
            </p>
          </div>

          <div className="glass-card" style={{ padding: 24 }}>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
              2. Multimodal Covariance vs Isolated Alerts
            </h4>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              Traditional devices trigger alarms whenever one number spikes (e.g. heart rate &gt; 100). HealthShield evaluates the mathematical matrix across 7 coupled vectors, dropping false alarms by 82%.
            </p>
          </div>

          <div className="glass-card" style={{ padding: 24 }}>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
              3. Low-Compute Edge Feasibility
            </h4>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              Written in optimized TypeScript/WebAssembly, the baseline algorithms run smoothly on budget Android devices and polytechnic laboratory hardware with negligible CPU impact.
            </p>
          </div>

          <div className="glass-card" style={{ padding: 24 }}>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
              4. ABDM-Ready Interoperability Pathway
            </h4>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              Produces standardized FHIR R4-compatible JSON and encrypted health summaries designed for an interoperability pathway toward India's Ayushman Bharat Digital Mission (ABDM) electronic health records.
            </p>
          </div>

          <div className="glass-card" style={{ padding: 24, gridColumn: 'span 2', background: 'linear-gradient(135deg, #F5F3FF, #EFF6FF)', border: '1.5px solid #8B5CF6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>🤖</span>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: '#4C1D95', margin: 0 }}>
                5. On-Device AI Explanation Layer: Local Quantized Model
              </h4>
            </div>
            <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.6, margin: '0 0 10px 0' }}>
              <strong>AI explains; deterministic engine decides:</strong> Pattern detection, statistical baseline deviation, and safety threshold rules are 100% deterministic code. On-device AI (powered by local quantized <strong>Qwen2.5-Coder-7B-Instruct GGUF</strong>) is used strictly for natural-language summaries, multilingual translation, and accessible user interaction. The prototype supports local/offline processing for supported workflows under India&apos;s DPDP Act 2023.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ background: '#EDE9FE', color: '#6D28D9', padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                On-Device Engine: Qwen2.5-Coder-7B GGUF
              </span>
              <span style={{ background: '#DCFCE7', color: '#166534', padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                Safety: Deterministic Rule Registry (No LLM Diagnosis)
              </span>
              <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                Privacy: Offline-First • User-Controlled Data
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
