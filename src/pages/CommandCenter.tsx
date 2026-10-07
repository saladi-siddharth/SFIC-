import type { MetricData, CheckInState, AnomalyReport } from '../types/health';
import { PipelineStepper } from '../components/PipelineStepper';
import { AnatomyMap } from '../components/AnatomyMap';

interface CommandCenterProps {
  metrics: MetricData[];
  checkIn: CheckInState;
  anomalyReport: AnomalyReport;
  onNavigate: (tab: string) => void;
  onOpenEmergency: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  metrics,
  checkIn,
  anomalyReport,
  onNavigate,
  onOpenEmergency,
}) => {
  const hr = metrics.find(m => m.id === 'heart_rate')?.todayValue || 74;
  const hrv = metrics.find(m => m.id === 'hrv')?.todayValue || 38;
  const spo2 = metrics.find(m => m.id === 'spo2')?.todayValue || 97.4;
  const temp = metrics.find(m => m.id === 'temp')?.todayValue || 99.1;

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* 7-Step Pipeline Interactive Stepper */}
      <PipelineStepper onSelectStep={(step) => onNavigate(step)} />

      {/* Main 3-Column Command Center */}
      <main className="container-max" style={{ paddingTop: 24 }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ================= LEFT COLUMN: INGESTION & USER TELEMETRY ================= */}
          <div className="flex flex-col gap-6">
            {/* User Profile & Check-in Card */}
            <div className="glass-card" style={{ padding: 24 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#0EA47A', letterSpacing: '0.04em' }}>
                    PATIENT TELEMETRY #HA-8492-AX
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
                    Sarah Vance (34F)
                  </h3>
                </div>
                <button 
                  onClick={() => onNavigate('checkin')}
                  className="badge badge-stable" 
                  style={{ cursor: 'pointer', border: '1px solid #BBF7D0' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>edit</span>
                  Edit Check-In
                </button>
              </div>

              {/* 60-Sec Check-in Summary */}
              <div style={{ background: '#F8FAFC', borderRadius: 10, padding: 14, border: '1px solid #E2E8F0', marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>
                  Morning Calibration (07:15 AM)
                </div>
                <div className="grid grid-cols-3 gap-2 text-center" style={{ marginBottom: 10 }}>
                  <div style={{ background: '#FFF', padding: 8, borderRadius: 8, border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: 10, color: '#64748B' }}>Sleep</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#1E293B' }}>{checkIn.sleepHours} hrs</div>
                  </div>
                  <div style={{ background: '#FFF', padding: 8, borderRadius: 8, border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: 10, color: '#64748B' }}>Energy</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#D97706' }}>{checkIn.energy}/10</div>
                  </div>
                  <div style={{ background: '#FFF', padding: 8, borderRadius: 8, border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: 10, color: '#64748B' }}>Feeling</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#DC2626' }}>Not Well</div>
                  </div>
                </div>

                <div style={{ fontSize: 11, color: '#475569', lineHeight: 1.4 }}>
                  <strong>Reported Symptoms:</strong> {checkIn.symptoms.join(', ')}
                </div>
              </div>

              {/* Live Multi-Sensor Telemetry Streams */}
              <div>
                <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Real-Time Biometrics
                  </span>
                  <span style={{ fontSize: 10, color: '#0EA47A', fontWeight: 600 }}>50 Hz Ingest</span>
                </div>

                {/* Heart Rate with live waveform */}
                <div style={{ padding: 12, background: '#FFF', borderRadius: 8, border: '1px solid #E2E8F0', marginBottom: 8 }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ color: '#EF4444', fontSize: 18 }}>favorite</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>Resting Heart Rate</span>
                    </div>
                    <span className="badge badge-changed">{hr} bpm (↑19%)</span>
                  </div>
                  {/* Mini ECG Pulse Wave SVG */}
                  <div style={{ height: 28, marginTop: 4, overflow: 'hidden' }}>
                    <svg viewBox="0 0 240 30" style={{ width: '100%', height: '100%' }}>
                      <path
                        d="M 0,15 L 40,15 L 48,5 L 56,25 L 64,10 L 72,18 L 80,15 L 120,15 L 128,5 L 136,25 L 144,10 L 152,18 L 160,15 L 200,15 L 208,5 L 216,25 L 224,10 L 232,18 L 240,15"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="1.8"
                        className="animate-ecg"
                      />
                    </svg>
                  </div>
                </div>

                {/* SpO2 */}
                <div style={{ padding: 12, background: '#FFF', borderRadius: 8, border: '1px solid #E2E8F0', marginBottom: 8 }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 18 }}>air</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>Blood Oxygen (SpO₂)</span>
                    </div>
                    <span className="badge badge-stable">{spo2}% (Normal)</span>
                  </div>
                </div>

                {/* Temperature */}
                <div style={{ padding: 12, background: '#FFF', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ color: '#F59E0B', fontSize: 18 }}>device_thermostat</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>Dermal Core Temp</span>
                    </div>
                    <span className="badge badge-monitor">{temp}°F (+0.7°)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Differential Privacy Card */}
            <div className="glass-card" style={{ padding: 20, background: '#F8FAFC' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 20 }}>lock</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Local Privacy Boundary</span>
              </div>
              <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>
                All baseline covariance modeling and z-score calculations execute directly on-device using local encrypted SQLite. No PHI (Protected Health Information) is transmitted to third-party cloud servers.
              </p>
            </div>
          </div>

          {/* ================= CENTER COLUMN: ANATOMY MAP & DEVIATION ENGINE ================= */}
          <div className="flex flex-col gap-6">
            {/* Holographic Anatomy Map */}
            <AnatomyMap
              heartRate={hr}
              hrv={hrv}
              spo2={spo2}
              temp={temp}
              sleepHours={checkIn.sleepHours}
            />

            {/* Change Detection Score & Deviation Gauges */}
            <div className="glass-card" style={{ padding: 24 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                    CHANGE DETECTION ENGINE
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                    Statistical Divergence Index
                  </h3>
                </div>
                <div 
                  style={{ 
                    background: '#EFF6FF', 
                    color: '#1D4ED8', 
                    fontWeight: 800, 
                    fontSize: 20, 
                    fontFamily: 'Space Grotesk',
                    padding: '4px 12px',
                    borderRadius: 8,
                    border: '1px solid #BFDBFE'
                  }}
                >
                  8.4 / 10
                </div>
              </div>

              {/* Comparative Deviation Gauges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Sleep */}
                <div>
                  <div className="flex items-center justify-between" style={{ fontSize: 12, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: '#1E293B' }}>Sleep Duration</span>
                    <span style={{ fontWeight: 700, color: '#DC2626' }}>5.2h vs 8.1h (-35%)</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '65%', background: '#EF4444' }} />
                  </div>
                </div>

                {/* HRV */}
                <div>
                  <div className="flex items-center justify-between" style={{ fontSize: 12, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: '#1E293B' }}>HRV Recovery (rMSSD)</span>
                    <span style={{ fontWeight: 700, color: '#DC2626' }}>38ms vs 55ms (-30%)</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '70%', background: '#EF4444' }} />
                  </div>
                </div>

                {/* Resting Heart Rate */}
                <div>
                  <div className="flex items-center justify-between" style={{ fontSize: 12, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: '#1E293B' }}>Resting Heart Rate</span>
                    <span style={{ fontWeight: 700, color: '#2563EB' }}>74 bpm vs 62 bpm (+19%)</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '80%', background: '#3B82F6' }} />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#64748B' }}>Mahalanobis Distance ($p &lt; 0.001$)</span>
                <button 
                  onClick={() => onNavigate('baseline')} 
                  className="btn-ghost" 
                  style={{ fontSize: 12, color: '#0EA47A', padding: '4px 8px' }}
                >
                  View Full Baseline →
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: SAFETY RULES & EXPLAINABLE ALERT ================= */}
          <div className="flex flex-col gap-6">
            {/* Deterministic Safety Rule Card */}
            <div className="glass-card" style={{ padding: 24, borderLeft: '4px solid #2563EB' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ color: '#2563EB', fontSize: 20 }}>gavel</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                    DETERMINISTIC SAFETY FILTER
                  </span>
                </div>
                <span className="badge badge-purple">RULE #204 FIRED</span>
              </div>

              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                Multi-Parameter Autonomic Shift Filter
              </h4>
              <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.5, marginBottom: 12 }}>
                Condition: Resting HR ↑ &gt;15% AND HRV ↓ &gt;25% AND Sleep ↓ &gt;30% over 48h rolling window.
              </p>
              <div style={{ background: '#DCFCE7', borderRadius: 8, padding: '8px 12px', fontSize: 11, color: '#166534', fontWeight: 600 }}>
                ✓ Cleared non-emergent triage. Routed safely to Explainable AI Advisory.
              </div>
            </div>

            {/* High-Priority Explainable Alert Card */}
            <div 
              className="glass-card" 
              style={{ 
                padding: 24, 
                border: '1.5px solid #FCA5A5', 
                background: '#FFF8F8',
                boxShadow: '0 8px 24px rgba(239, 68, 68, 0.08)' 
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EDE9FE', border: '1px solid #DDD6FE', padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#6D28D9', marginBottom: 10 }}>
                <span>🤖</span>
                <span>Local Engine: Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf</span>
              </div>

              <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ color: '#DC2626', fontSize: 22 }}>warning</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#991B1B' }}>
                    ⚠️ Something Changed
                  </span>
                </div>
                <span className="badge badge-alert">Priority 2 Alert</span>
              </div>

              {/* What Changed */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#7F1D1D', textTransform: 'uppercase', marginBottom: 4 }}>
                  What Changed?
                </div>
                <ul style={{ fontSize: 12, color: '#450A0A', paddingLeft: 18, lineHeight: 1.6 }}>
                  <li>Sleep dropped <strong>-35%</strong> (5.2h vs 8.1h baseline)</li>
                  <li>HRV recovery dropped <strong>-30%</strong> (38ms vs 55ms)</li>
                  <li>Resting heart rate increased <strong>+19%</strong> (74 vs 62 bpm)</li>
                  <li>Reported fatigue &amp; mild head pressure</li>
                </ul>
              </div>

              {/* Why Flagged */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#7F1D1D', textTransform: 'uppercase', marginBottom: 4 }}>
                  Why did HealthShield flag this?
                </div>
                <p style={{ fontSize: 12, color: '#450A0A', lineHeight: 1.5 }}>
                  {anomalyReport.clinicalRationale}
                </p>
              </div>

              {/* Boundary Guardrail */}
              <div style={{ background: '#FEE2E2', borderRadius: 8, padding: '8px 12px', fontSize: 11, color: '#991B1B', lineHeight: 1.4, marginBottom: 16 }}>
                <strong>Clinical Guardrail:</strong> {anomalyReport.boundaryWarning}
              </div>

              {/* Action Pathways */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: 8 }}>
                  Recommended Next Steps
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  {anomalyReport.recommendedSteps.map((step, idx) => (
                    <div 
                      key={idx}
                      style={{ 
                        background: '#FFF', 
                        padding: '8px 12px', 
                        borderRadius: 8, 
                        border: '1px solid #E2E8F0',
                        fontSize: 12 
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>
                        {idx + 1}. {step.title}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                        {step.description}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onNavigate('alert')} 
                    className="btn-primary" 
                    style={{ flex: 1, padding: '8px 12px', fontSize: 12 }}
                  >
                    View Explainable Details
                  </button>
                  <button 
                    onClick={onOpenEmergency} 
                    className="btn-danger" 
                    style={{ padding: '8px 12px', fontSize: 12 }}
                  >
                    Emergency
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};
