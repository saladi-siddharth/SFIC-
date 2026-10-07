import type { MetricData } from '../types/health';

interface HomePageProps {
  metrics?: MetricData[];
  onLaunchDemo: () => void;
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onLaunchDemo,
  onNavigate,
}) => {
  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Hero Section */}
      <section style={{ padding: '64px 0 40px', position: 'relative' }}>
        <div className="container-max text-center" style={{ maxWidth: 900 }}>
          {/* Over-headline pill */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 8, 
              background: '#E6F7F1', 
              border: '1px solid #BBF7D0', 
              color: '#00694D', 
              borderRadius: 30, 
              padding: '6px 16px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: 24,
              boxShadow: '0 2px 6px rgba(14, 164, 122, 0.1)'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
            SFIC TRACK A PROTOTYPE • PERSONAL HEALTH PATTERN ENGINE
          </div>

          {/* Main Headline */}
          <h1 
            style={{ 
              fontSize: 'clamp(36px, 5.5vw, 60px)', 
              fontWeight: 800, 
              letterSpacing: '-0.03em', 
              lineHeight: 1.1, 
              color: '#0F172A',
              marginBottom: 16
            }}
          >
            Your health has a pattern. <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #0EA47A, #00513A)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              We help you notice when it changes.
            </span>
          </h1>

          {/* Subheading */}
          <p 
            style={{ 
              fontSize: 'clamp(16px, 2vw, 19px)', 
              color: '#475569', 
              maxWidth: 720, 
              margin: '0 auto 36px',
              lineHeight: 1.6
            }}
          >
            A preventive-health awareness prototype designed to identify meaningful deviations from a person’s usual personal pattern and guide them toward an appropriate next step — without claiming to diagnose disease.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4" style={{ marginBottom: 48, flexWrap: 'wrap' }}>
            <button 
              onClick={onLaunchDemo} 
              className="btn-primary" 
              style={{ padding: '14px 28px', fontSize: 16, borderRadius: 12, boxShadow: '0 4px 14px rgba(14, 164, 122, 0.35)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>play_arrow</span>
              ▶ Launch Judge Demo (90s Story)
            </button>
            <button 
              onClick={() => onNavigate('lab')} 
              className="btn-secondary" 
              style={{ padding: '13px 26px', fontSize: 15, borderRadius: 12 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>science</span>
              ⚡ Health Change Lab
            </button>
            <button 
              onClick={() => onNavigate('baseline')} 
              style={{ padding: '13px 24px', fontSize: 14, borderRadius: 12, background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#1E293B', fontWeight: 700, cursor: 'pointer' }}
            >
              📈 View My Baseline
            </button>
          </div>

          {/* Trust Metrics */}
          <div className="flex items-center justify-center gap-8 text-on-surface-variant" style={{ fontSize: 13, fontWeight: 600, flexWrap: 'wrap' }}>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 18 }}>check_circle</span>
              30-Day Personalized Baseline
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 18 }}>lock</span>
              Offline-First • User-Controlled Data
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 18 }}>balance</span>
              Deterministic Safety Rules
            </span>
          </div>
        </div>
      </section>

      {/* Live Animated Dashboard Console Preview (The Centerpiece) */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="container-max" style={{ maxWidth: 1040 }}>
          <div 
            className="glass-card" 
            style={{ 
              padding: 32, 
              border: '1.5px solid rgba(14, 164, 122, 0.35)', 
              boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.1)' 
            }}
          >
            {/* Console Header */}
            <div className="flex items-center justify-between" style={{ paddingBottom: 16, borderBottom: '1px solid #E2E8F0', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
              <div className="flex items-center gap-3">
                <span className="status-dot status-dot-green pulse-anim" />
                <div>
                  <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.04em', color: '#0F172A', textTransform: 'uppercase' }}>
                    MY BASELINE • YOUR RECENT HEALTH PATTERN
                  </span>
                  <div style={{ fontSize: 11, color: '#64748B' }}>Learned individual 30-day normal bounds vs today's incoming observations</div>
                </div>
              </div>
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>
                ⚠ PATTERN CHANGE DETECTED
              </div>
            </div>

            {/* Structured Personal Baseline Comparison Table */}
            <div style={{ overflowX: 'auto', marginBottom: 28 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#475569', fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 16px' }}>Signal</th>
                    <th style={{ padding: '12px 16px' }}>Personal Baseline</th>
                    <th style={{ padding: '12px 16px' }}>Today</th>
                    <th style={{ padding: '12px 16px' }}>Change</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>😴 Sleep Duration</td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>7.1 h</td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#DC2626' }}>5.4 h</td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#DC2626' }}>↓ 24%</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: '#FEE2E2', color: '#DC2626', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800 }}>Diverged</span></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>🚶 Daily Activity</td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>7,800 steps</td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#DC2626' }}>4,900 steps</td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#DC2626' }}>↓ 37%</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: '#FEE2E2', color: '#DC2626', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800 }}>Diverged</span></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>❤️ Resting Heart Rate</td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>72 bpm</td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#DC2626' }}>78 bpm</td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#DC2626' }}>↑ 8%</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: '#FEE2E2', color: '#DC2626', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800 }}>Diverged</span></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>😊 Self-Reported Well-being</td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>Good</td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#D97706' }}>Low</td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#D97706' }}>Changed</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ background: '#FEF3C7', color: '#D97706', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800 }}>Shifted</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pattern Engine Step-by-Step Flow */}
            <div 
              style={{ 
                background: 'linear-gradient(180deg, #F8FAFC, #F1F5F9)', 
                border: '1px solid #E2E8F0', 
                borderRadius: 14, 
                padding: '22px 20px',
                textAlign: 'center' 
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: 14, letterSpacing: '0.05em' }}>
                DETERMINISTIC PATTERN ENGINE WORKFLOW
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#334155' }}>
                  INPUT
                </span>
                <span style={{ color: '#94A3B8', fontWeight: 900 }}>↓</span>
                <span style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#334155' }}>
                  Recent Observations
                </span>
                <span style={{ color: '#94A3B8', fontWeight: 900 }}>↓</span>
                <span style={{ background: '#EFF6FF', border: '1px solid #93C5FD', padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#1D4ED8' }}>
                  Data Quality Check
                </span>
                <span style={{ color: '#94A3B8', fontWeight: 900 }}>↓</span>
                <span style={{ background: '#E6F7F1', border: '1.5px solid #10B981', padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, color: '#00694D' }}>
                  Personal Baseline
                </span>
                <span style={{ color: '#94A3B8', fontWeight: 900 }}>↓</span>
                <span style={{ background: '#FEF3C7', border: '1px solid #FCD34D', padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#92400E' }}>
                  Deviation Detection
                </span>
                <span style={{ color: '#94A3B8', fontWeight: 900 }}>↓</span>
                <span style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#991B1B' }}>
                  Multi-Signal Check
                </span>
                <span style={{ color: '#94A3B8', fontWeight: 900 }}>↓</span>
                <span style={{ background: '#EDE9FE', border: '1px solid #C4B5FD', padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#5B21B6' }}>
                  Safety Rules
                </span>
                <span style={{ color: '#94A3B8', fontWeight: 900 }}>↓</span>
                <span style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, color: '#166534' }}>
                  Explanation & Next Step
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why HealthShield? 3 Huge Statement Pillar Cards */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="container-max" style={{ maxWidth: 1120 }}>
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Why HealthShield AI?
            </h2>
            <p style={{ fontSize: 15, color: '#64748B', marginTop: 8 }}>
              Built specifically to overcome the flaws of generic chatbots and noisy alert dashboards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div 
              className="glass-card glass-card-hover" 
              style={{ padding: 32, borderTop: '4px solid #0EA47A' }}
            >
              <div 
                style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 12, 
                  background: '#E6F7F1', 
                  color: '#0EA47A', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: 20 
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>medical_services</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>
                NOT A DIAGNOSIS TOOL
              </h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                It does not pretend to replace physicians or declare medical diagnoses. It identifies meaningful deviations from your own baseline and directs you toward safe, validated next steps.
              </p>
            </div>

            {/* Card 2 */}
            <div 
              className="glass-card glass-card-hover" 
              style={{ padding: 32, borderTop: '4px solid #2563EB' }}
            >
              <div 
                style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 12, 
                  background: '#EFF6FF', 
                  color: '#2563EB', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: 20 
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>database</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>
                NOT JUST A CHATBOT
              </h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                It operates on structured longitudinal telemetry, multivariate baseline covariance, and objective data — rather than ungrounded free-form prompt hallucinations.
              </p>
            </div>

            {/* Card 3 */}
            <div 
              className="glass-card glass-card-hover" 
              style={{ padding: 32, borderTop: '4px solid #7C3AED' }}
            >
              <div 
                style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 12, 
                  background: '#F5F3FF', 
                  color: '#7C3AED', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: 20 
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>notifications_active</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>
                NOT JUST A DASHBOARD
              </h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                Normal dashboards passively dump raw numbers (e.g. 82 bpm). HealthShield actively identifies when coupled biometric changes matter and explains exactly why.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Theme 3 Assistive Technology & Inclusion Section */}
      <section style={{ padding: '20px 0 60px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container-max" style={{ maxWidth: 1120 }}>
          <div className="text-center" style={{ marginBottom: 36 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#2563EB', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 800, marginBottom: 10 }}>
              <span>♿</span>
              <span>THEME 3 CORE SCOPE • ASSISTIVE TECH &amp; INCLUSION</span>
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
              Built for More People
            </h2>
            <p style={{ fontSize: 14, color: '#64748B', marginTop: 8 }}>
              Healthcare technology must be accessible regardless of age, literacy, language, or connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div style={{ background: '#FFFFFF', padding: 20, borderRadius: 14, border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>👵</div>
              <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Elderly Users</h4>
              <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                One-tap Simple Mode with large friendly touch cards and zero technical jargon.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: 20, borderRadius: 14, border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🗣️</div>
              <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Voice Users</h4>
              <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                Ask &quot;How has my health changed this week?&quot; with on-device vocal response.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: 20, borderRadius: 14, border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🇮🇳</div>
              <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Indian Languages</h4>
              <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                Full first-class localization in English, తెలుగు (Telugu), and हिन्दी (Hindi).
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: 20, borderRadius: 14, border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>👁️</div>
              <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Low-Vision</h4>
              <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                Instant dynamic text scaling (A / A+ / A++) and WCAG AAA high-contrast toggle.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: 20, borderRadius: 14, border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📵</div>
              <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Low-Connectivity</h4>
              <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                Offline-first local check-ins queueing securely in browser until sync returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simulated Demonstration Data Banner */}
      <section style={{ padding: '24px 0 10px' }}>
        <div className="container-max text-center" style={{ maxWidth: 840 }}>
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '12px 20px', display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#92400E' }}>
            <span style={{ fontSize: 16 }}>ℹ️</span>
            <span>
              <strong>PROTOTYPE DEMONSTRATION DATA:</strong> Telemetry metrics displayed are controlled demonstration values used to validate the HealthShield detection and explanation workflow. Not clinical evidence.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
