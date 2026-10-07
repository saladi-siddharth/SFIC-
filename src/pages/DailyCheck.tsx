import React, { useState } from 'react';
import type { CheckInState } from '../types/health';
import { PipelineStepper } from '../components/PipelineStepper';
import { localAiService } from '../services/localAiService';

interface DailyCheckProps {
  initialCheckIn: CheckInState;
  onSubmitCheckIn: (newCheckIn: CheckInState) => void;
  onNavigate: (tab: string) => void;
}

export const DailyCheck: React.FC<DailyCheckProps> = ({
  initialCheckIn,
  onSubmitCheckIn,
  onNavigate,
}) => {
  const [mood, setMood] = useState<'good' | 'okay' | 'not_well'>(initialCheckIn.mood);
  const [energy, setEnergy] = useState<number>(initialCheckIn.energy);
  const [sleepQuality, setSleepQuality] = useState<'restful' | 'restless' | 'insomnia'>(initialCheckIn.sleepQuality);
  const [sleepHours, setSleepHours] = useState<number>(initialCheckIn.sleepHours);
  const [symptoms, setSymptoms] = useState<string[]>(initialCheckIn.symptoms);
  const [notes] = useState<string>(initialCheckIn.notes);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceText, setVoiceText] = useState<string>(initialCheckIn.voiceTranscript);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  const availableSymptoms = [
    'Fatigue',
    'Mild Headache',
    'Elevated Strain',
    'Muscle Soreness',
    'Cough / Throat',
    'Chills / Warmth',
    'Stomach Discomfort',
    'Dizziness',
  ];

  const toggleSymptom = (s: string) => {
    if (symptoms.includes(s)) {
      setSymptoms(symptoms.filter(item => item !== s));
    } else {
      setSymptoms([...symptoms, s]);
    }
  };

  const handleVoiceSimulate = () => {
    setIsRecording(true);
    setTimeout(() => {
      setVoiceText('I woke up feeling groggy with a mild head pressure, took longer to fall asleep and heart feels slightly faster than usual.');
      setIsRecording(false);
      if (!symptoms.includes('Fatigue')) setSymptoms(prev => [...prev, 'Fatigue']);
      if (!symptoms.includes('Mild Headache')) setSymptoms(prev => [...prev, 'Mild Headache']);
      setMood('not_well');
      setEnergy(4);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CheckInState = {
      mood,
      energy,
      sleepQuality,
      sleepHours,
      symptoms,
      notes,
      voiceTranscript: voiceText,
      timestamp: 'Just now'
    };
    onSubmitCheckIn(updated);
    setSubmitted(true);
    setIsGeneratingAi(true);

    try {
      const insight = await localAiService.getDailyInsight({
        wellbeingScore: mood.toUpperCase(),
        sleepHours,
        symptoms: symptoms.join(', ')
      });
      setAiInsight(insight);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      <PipelineStepper onSelectStep={(step) => onNavigate(step)} />

      <main className="container-max" style={{ paddingTop: 28 }}>
        {/* Banner */}
        <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#0EA47A', textTransform: 'uppercase' }}>
              DAILY LONGITUDINAL CALIBRATION
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              60-Second Daily Health Check
            </h1>
            <p style={{ fontSize: 14, color: '#475569', marginTop: 4 }}>
              Calibrates subjective states and symptoms against your continuous wearable telemetry.
            </p>
          </div>

          <div className="badge badge-stable">
            <span className="status-dot status-dot-green" />
            OFFLINE READY • 0 SYNC QUEUE
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form (2 Cols) */}
          <div className="glass-card" style={{ padding: 32, gridColumn: 'span 2' }}>
            <form onSubmit={handleSubmit}>
              
              {/* Question 1: How are you feeling today? */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
                  1. How are you feeling overall today?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'good', label: 'Good / Energetic', emoji: '😊', color: '#0EA47A' },
                    { id: 'okay', label: 'Okay / Normal', emoji: '😐', color: '#2563EB' },
                    { id: 'not_well', label: 'Not Well / Off', emoji: '😟', color: '#DC2626' },
                  ].map(opt => {
                    const isSelected = mood === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setMood(opt.id as any)}
                        style={{
                          background: isSelected ? '#FFF5F5' : '#FFFFFF',
                          border: isSelected ? `2px solid ${opt.color}` : '1px solid #CBD5E1',
                          borderRadius: 12,
                          padding: '16px 12px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 8,
                          boxShadow: isSelected ? `0 4px 12px ${opt.color}25` : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontSize: 32 }}>{opt.emoji}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: isSelected ? opt.color : '#334155' }}>
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Energy Level */}
              <div style={{ marginBottom: 28 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <label style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>
                    2. Subjective Energy Level
                  </label>
                  <span style={{ fontSize: 14, fontWeight: 800, color: energy <= 4 ? '#DC2626' : '#0EA47A', fontFamily: 'Space Grotesk' }}>
                    {energy} / 10 {energy <= 4 ? '(Low Energy)' : energy <= 7 ? '(Moderate)' : '(Optimal)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energy}
                  onChange={(e) => setEnergy(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#0EA47A', cursor: 'pointer', height: 8 }}
                />
                <div className="flex items-center justify-between" style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                  <span>1 (Exhausted)</span>
                  <span>5 (Usual)</span>
                  <span>10 (Vibrant Peak)</span>
                </div>
              </div>

              {/* Question 3: Sleep Quality & Hours */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
                  3. Sleep Quality &amp; Duration
                </label>
                <div className="grid grid-cols-3 gap-3" style={{ marginBottom: 12 }}>
                  {[
                    { id: 'restful', label: 'Deep & Restful' },
                    { id: 'restless', label: 'Fragmented / Restless' },
                    { id: 'insomnia', label: 'Severe Insomnia' },
                  ].map(opt => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setSleepQuality(opt.id as any)}
                      style={{
                        background: sleepQuality === opt.id ? '#EFF6FF' : '#F8FAFC',
                        border: sleepQuality === opt.id ? '2px solid #2563EB' : '1px solid #E2E8F0',
                        color: sleepQuality === opt.id ? '#1D4ED8' : '#334155',
                        fontWeight: 700,
                        fontSize: 12,
                        padding: '10px 8px',
                        borderRadius: 8,
                        cursor: 'pointer'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span style={{ fontSize: 13, color: '#475569' }}>Recorded Hours:</span>
                  <input
                    type="number"
                    step="0.1"
                    min="2"
                    max="14"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                    style={{
                      width: 80,
                      padding: '6px 10px',
                      borderRadius: 8,
                      border: '1px solid #CBD5E1',
                      fontFamily: 'Space Grotesk',
                      fontWeight: 700,
                      fontSize: 14
                    }}
                  />
                  <span style={{ fontSize: 12, color: '#64748B' }}>
                    (Baseline avg is 8.1 hrs • {((sleepHours - 8.1) / 8.1 * 100).toFixed(0)}% delta)
                  </span>
                </div>
              </div>

              {/* Question 4: Multi-Select Symptoms */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
                  4. Any specific symptoms noticed today?
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSymptoms.map(sym => {
                    const isChecked = symptoms.includes(sym);
                    return (
                      <button
                        type="button"
                        key={sym}
                        onClick={() => toggleSymptom(sym)}
                        style={{
                          background: isChecked ? '#E6F7F1' : '#FFFFFF',
                          border: isChecked ? '1.5px solid #0EA47A' : '1px solid #CBD5E1',
                          color: isChecked ? '#00694D' : '#475569',
                          fontWeight: isChecked ? 700 : 500,
                          fontSize: 12,
                          padding: '7px 14px',
                          borderRadius: 20,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        {isChecked && (
                          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>
                            check
                          </span>
                        )}
                        {sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 5: Multimodal Voice Check-In (Polytechnic Accessibility) */}
              <div 
                style={{ 
                  background: '#F8FAFC', 
                  border: '1.5px dashed #CBD5E1', 
                  borderRadius: 12, 
                  padding: 20,
                  marginBottom: 28 
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ color: '#7C3AED', fontSize: 20 }}>mic</span>
                    <strong style={{ fontSize: 13, color: '#0F172A' }}>
                      Voice Accessibility Check-In (Hands-Free)
                    </strong>
                  </div>
                  <span className="badge badge-purple">On-Device Whisper</span>
                </div>

                <div className="flex items-center gap-4" style={{ marginBottom: 12 }}>
                  <button
                    type="button"
                    onClick={handleVoiceSimulate}
                    style={{
                      background: isRecording ? '#DC2626' : '#7C3AED',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '50%',
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                      {isRecording ? 'graphic_eq' : 'mic'}
                    </span>
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: '#475569', fontStyle: 'italic' }}>
                      {isRecording ? 'Listening and extracting clinical entities...' : voiceText ? `"${voiceText}"` : 'Tap mic and speak: "HealthShield, I woke up feeling tired with a headache..."'}
                    </div>
                  </div>
                </div>

                {voiceText && (
                  <div className="flex items-center gap-2 flex-wrap" style={{ fontSize: 11 }}>
                    <span style={{ color: '#059669', fontWeight: 600 }}>✓ Extracted:</span>
                    <span className="badge badge-stable">Fatigue Detected</span>
                    <span className="badge badge-stable">Cranial Pressure</span>
                    <span className="badge badge-purple">99.1% Confidence</span>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ padding: '12px 24px', fontSize: 14 }}
                >
                  <span className="material-symbols-outlined">save</span>
                  Submit Check-In &amp; Update Baseline
                </button>
                <button 
                  type="button" 
                  onClick={() => onNavigate('command')} 
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>

              {submitted && (
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ color: '#059669', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>✓</span>
                    <span>Check-in saved safely into encrypted local store!</span>
                  </div>

                  {/* Local Model Qwen2.5 Generated Insight */}
                  <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 14, padding: '16px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: '#6D28D9' }}>
                        <span>🤖</span>
                        <span>Personal Wellness Insight</span>
                      </div>
                      <span style={{ fontSize: 10, background: '#EDE9FE', color: '#5B21B6', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                        Local Qwen2.5-Coder-7B GGUF
                      </span>
                    </div>

                    <p style={{ margin: 0, fontSize: 13, color: '#3B0764', lineHeight: 1.6 }}>
                      {isGeneratingAi ? 'Synthesizing personal baseline reflection via local GGUF model...' : aiInsight}
                    </p>

                    <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={() => onNavigate('command')}
                        style={{
                          background: '#7C3AED',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: 8,
                          padding: '8px 18px',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Proceed to Command Center →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Rail: Instant Downstream Impact Preview */}
          <div className="flex flex-col gap-6">
            <div className="glass-card" style={{ padding: 24, position: 'sticky', top: 90 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0EA47A', textTransform: 'uppercase', marginBottom: 6 }}>
                INSTANT DOWNSTREAM IMPACT
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
                What happens upon submission?
              </h3>

              {/* Mini Pipeline Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                <div className="flex items-center gap-3" style={{ fontSize: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    1
                  </div>
                  <div>
                    <strong style={{ color: '#0F172A' }}>Encrypted SQLite Entry:</strong>
                    <div style={{ color: '#64748B', fontSize: 11 }}>Zero cloud upload • 100% on-device</div>
                  </div>
                </div>

                <div className="flex items-center gap-3" style={{ fontSize: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#EFF6FF', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    2
                  </div>
                  <div>
                    <strong style={{ color: '#0F172A' }}>Baseline Delta Update:</strong>
                    <div style={{ color: '#64748B', fontSize: 11 }}>Recalculates rolling z-score</div>
                  </div>
                </div>

                <div className="flex items-center gap-3" style={{ fontSize: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#FEF3C7', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    3
                  </div>
                  <div>
                    <strong style={{ color: '#0F172A' }}>Change Detection Engine:</strong>
                    <div style={{ color: '#64748B', fontSize: 11 }}>Mahalanobis anomaly cluster analysis</div>
                  </div>
                </div>

                <div className="flex items-center gap-3" style={{ fontSize: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#FEE2E2', color: '#991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    4
                  </div>
                  <div>
                    <strong style={{ color: '#0F172A' }}>Deterministic Safety Rules:</strong>
                    <div style={{ color: '#64748B', fontSize: 11 }}>Rule #204 verified; clinical triage</div>
                  </div>
                </div>
              </div>

              {/* Cross-Correlation Snapshot */}
              <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', marginBottom: 4 }}>
                  ⚠️ Multi-Modal Correlation
                </div>
                <p style={{ fontSize: 12, color: '#334155', lineHeight: 1.5 }}>
                  Your subjective feeling of <strong>"Not Well / Off"</strong> correlates directly with nocturnal resting pulse elevation (+12 bpm) and -35% sleep curtailment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
