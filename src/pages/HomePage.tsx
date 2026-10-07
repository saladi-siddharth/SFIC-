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
            SFIC TRACK A PROTOTYPE • CLINICAL PATTERN ENGINE
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
            An AI-assisted preventive-health platform designed to identify meaningful changes from a person’s usual health pattern and guide them toward an appropriate next step.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4" style={{ marginBottom: 48 }}>
            <button 
              onClick={onLaunchDemo} 
              className="btn-primary" 
              style={{ padding: '14px 28px', fontSize: 16, borderRadius: 12 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>play_arrow</span>
              ▶ Launch Live Demo
            </button>
            <button 
              onClick={() => onNavigate('technology')} 
              className="btn-secondary" 
              style={{ padding: '13px 26px', fontSize: 15, borderRadius: 12 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>memory</span>
              Explore the Technology
            </button>
          </div>

          {/* Trust Metrics */}
          <div className="flex items-center justify-center gap-8 text-on-surface-variant" style={{ fontSize: 13, fontWeight: 600 }}>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 18 }}>check_circle</span>
              30-Day Personalized Baseline
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 18 }}>security</span>
              100% Offline / Zero PHI Leak
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
            <div className="flex items-center justify-between" style={{ paddingBottom: 16, borderBottom: '1px solid #E2E8F0', marginBottom: 24 }}>
              <div className="flex items-center gap-3">
                <span className="status-dot status-dot-green pulse-anim" />
                <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', color: '#1E293B', textTransform: 'uppercase' }}>
                  YOUR PERSONAL HEALTH PATTERN CONSOLE
                </span>
              </div>
              <div className="badge badge-stable">
                Continuous Telemetry Stream
              </div>
            </div>

            {/* 4 Metric Horizontal Comparison Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: 32 }}>
              {/* Heart */}
              <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 18 }}>❤️</span>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#1E293B' }}>Resting Heart Rate</span>
                  </div>
                  <span className="badge badge-stable">STABLE</span>
                </div>
                <div className="progress-track" style={{ height: 10 }}>
                  <div className="progress-fill" style={{ width: '85%', background: '#10B981' }} />
                </div>
                <div className="flex items-center justify-between" style={{ fontSize: 11, color: '#64748B', marginTop: 6 }}>
                  <span>Baseline: 62 bpm</span>
                  <strong style={{ color: '#0F172A' }}>Current: 64 bpm</strong>
                </div>
              </div>

              {/* Oxygen */}
              <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 18 }}>🫁</span>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#1E293B' }}>Blood Oxygen (SpO₂)</span>
                  </div>
                  <span className="badge badge-stable">STABLE</span>
                </div>
                <div className="progress-track" style={{ height: 10 }}>
                  <div className="progress-fill" style={{ width: '98%', background: '#10B981' }} />
                </div>
                <div className="flex items-center justify-between" style={{ fontSize: 11, color: '#64748B', marginTop: 6 }}>
                  <span>Baseline: 98%</span>
                  <strong style={{ color: '#0F172A' }}>Current: 98.2%</strong>
                </div>
              </div>

              {/* Temp */}
              <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 18 }}>🌡</span>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#1E293B' }}>Core Temperature</span>
                  </div>
                  <span className="badge badge-monitor">MONITOR</span>
                </div>
                <div className="progress-track" style={{ height: 10 }}>
                  <div className="progress-fill" style={{ width: '75%', background: '#F59E0B' }} />
                </div>
                <div className="flex items-center justify-between" style={{ fontSize: 11, color: '#64748B', marginTop: 6 }}>
                  <span>Baseline: 98.4°F</span>
                  <strong style={{ color: '#D97706' }}>Current: 99.1°F (+0.7°)</strong>
                </div>
              </div>

              {/* Sleep */}
              <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1.5px solid #93C5FD' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 18 }}>😴</span>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#1E293B' }}>Sleep Architecture</span>
                  </div>
                  <span className="badge badge-changed">CHANGED</span>
                </div>
                <div className="progress-track" style={{ height: 10 }}>
                  <div className="progress-fill" style={{ width: '50%', background: '#3B82F6' }} />
                </div>
                <div className="flex items-center justify-between" style={{ fontSize: 11, color: '#64748B', marginTop: 6 }}>
                  <span>Baseline: 8.1 hrs</span>
                  <strong style={{ color: '#1D4ED8' }}>Today: 5.2 hrs (↓ 35%)</strong>
                </div>
              </div>
            </div>

            {/* Vertical Flow Diagram */}
            <div 
              style={{ 
                background: 'linear-gradient(180deg, #FFFFFF, #F8FAFC)', 
                border: '1px solid #E2E8F0', 
                borderRadius: 12, 
                padding: '24px 20px',
                textAlign: 'center' 
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 12 }}>
                HOW HEALTHSHIELD PROCESSES YOUR DATA
              </div>

              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div style={{ background: '#E6F7F1', border: '1.5px solid #10B981', padding: '10px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, color: '#00694D' }}>
                  PERSONAL BASELINE
                </div>
                <span className="material-symbols-outlined" style={{ color: '#94A3B8' }}>arrow_forward</span>
                <div style={{ background: '#EFF6FF', border: '1.5px solid #3B82F6', padding: '10px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, color: '#1D4ED8' }}>
                  CHANGE DETECTED
                </div>
                <span className="material-symbols-outlined" style={{ color: '#94A3B8' }}>arrow_forward</span>
                <div style={{ background: '#FEF3C7', border: '1.5px solid #F59E0B', padding: '10px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, color: '#92400E' }}>
                  SAFETY RULES VERIFIED
                </div>
                <span className="material-symbols-outlined" style={{ color: '#94A3B8' }}>arrow_forward</span>
                <div style={{ background: '#FEE2E2', border: '1.5px solid #EF4444', padding: '10px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, color: '#991B1B' }}>
                  EXPLAINABLE ALERT & ACTION
                </div>
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
    </div>
  );
};
