import React from 'react';
import { PipelineStepper } from '../components/PipelineStepper';

interface ImpactPageProps {
  onNavigate: (tab: string) => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ paddingBottom: 60 }}>
      <PipelineStepper onSelectStep={(step) => onNavigate(step)} />

      <main className="container-max" style={{ paddingTop: 28, maxWidth: 1040 }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#0EA47A', textTransform: 'uppercase' }}>
            SEVA FIRST INNOVATION CHALLENGE (SFIC) EVALUATION FRAMEWORK
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginTop: 4 }}>
            Beneficiary Impact &amp; Scalability Model
          </h1>
          <p style={{ fontSize: 16, color: '#475569', maxWidth: 740, margin: '8px auto 0', lineHeight: 1.6 }}>
            Theme: <strong>Swasth &amp; Samavesh Bharat</strong> (Health &amp; Well-being) • Track A: Product &amp; Technology • Polytechnic Category
          </p>
        </div>

        {/* 3-Tier Ripple Impact Model */}
        <div className="glass-card" style={{ padding: 36, marginBottom: 36 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0EA47A', textTransform: 'uppercase', marginBottom: 6, textAlign: 'center' }}>
            THREE-TIER BENEFICIARY RIPPLE MODEL
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', textAlign: 'center', marginBottom: 28 }}>
            From Individual Self-Awareness to Public Health Resilience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <span className="material-symbols-outlined">person</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
                1. INDIVIDUAL TIER
              </h3>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0EA47A', marginBottom: 8 }}>
                Earlier Awareness (24–48h)
              </div>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                Users recognize subtle physiological shifts before full illness onset. They take self-care measures early, preventing minor strains from progressing into emergency room visits.
              </p>
            </div>

            {/* Tier 2 */}
            <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EFF6FF', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <span className="material-symbols-outlined">family_restroom</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
                2. FAMILY &amp; CAREGIVER
              </h3>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2563EB', marginBottom: 8 }}>
                Trusted Support Loops
              </div>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                Elderly family members and patients with chronic conditions can safely share baseline summaries with trusted family members and local doctors without complex setup or tech anxiety.
              </p>
            </div>

            {/* Tier 3 */}
            <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <span className="material-symbols-outlined">groups</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
                3. COMMUNITY &amp; PHC
              </h3>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#7C3AED', marginBottom: 8 }}>
                Preventive Health Awareness
              </div>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                Primary Health Centers (PHCs) and community polytechnic health kiosks deploy low-cost offline tablets to detect cluster illnesses early, reducing systemic hospital admission loads.
              </p>
            </div>
          </div>
        </div>

        {/* SFIC Criteria Alignment Grid */}
        <div className="glass-card" style={{ padding: 36, marginBottom: 36 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 20 }}>
            Evaluation Criteria Breakdown
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ borderLeft: '3px solid #0EA47A', paddingLeft: 16 }}>
              <strong style={{ fontSize: 14, color: '#0F172A' }}>Problem Clarity:</strong>
              <p style={{ fontSize: 13, color: '#475569', marginTop: 4, lineHeight: 1.5 }}>
                Current health trackers show disconnected numbers that cause either false panic or alert fatigue. HealthShield focuses exclusively on <em>meaningful deviations from personal baseline</em>.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #2563EB', paddingLeft: 16 }}>
              <strong style={{ fontSize: 14, color: '#0F172A' }}>Originality:</strong>
              <p style={{ fontSize: 13, color: '#475569', marginTop: 4, lineHeight: 1.5 }}>
                Replaces black-box medical claims with a transparent mathematical corridor model. Separates generative explanation from deterministic safety gatekeeping.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #7C3AED', paddingLeft: 16 }}>
              <strong style={{ fontSize: 14, color: '#0F172A' }}>Demonstrated Feasibility:</strong>
              <p style={{ fontSize: 13, color: '#475569', marginTop: 4, lineHeight: 1.5 }}>
                Full working prototype running real z-score calculations, Mahalanobis divergence scoring, deterministic rule trees, and voice check-in capabilities.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #F59E0B', paddingLeft: 16 }}>
              <strong style={{ fontSize: 14, color: '#0F172A' }}>Cost &amp; Scalability:</strong>
              <p style={{ fontSize: 13, color: '#475569', marginTop: 4, lineHeight: 1.5 }}>
                100% offline edge processing eliminates recurring cloud compute bills. Deployable on budget polytechnic lab devices and affordable sub-$15 consumer wearables.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action for Evaluators */}
        <div className="text-center">
          <button 
            onClick={() => onNavigate('command')} 
            className="btn-primary" 
            style={{ padding: '14px 28px', fontSize: 15 }}
          >
            Launch Command Center Demonstration →
          </button>
        </div>
      </main>
    </div>
  );
};
