import React, { useState } from 'react';
import type { CheckInState } from '../types/health';
import { PipelineStepper } from '../components/PipelineStepper';
import { localAiService } from '../services/localAiService';
import { DataQualityEngine, type ValidationResult } from '../engine/dataQualityEngine';

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
  // Flagship Feature 02 State
  const [mood, setMood] = useState<'good' | 'okay' | 'not_well'>(initialCheckIn.mood);
  const [energyLevel, setEnergyLevel] = useState<'High' | 'Normal' | 'Low'>('Normal');
  const [wellBeing, setWellBeing] = useState<'Positive' | 'Neutral' | 'Low'>('Neutral');
  const [sleepQuality, setSleepQuality] = useState<'restful' | 'restless' | 'insomnia'>(initialCheckIn.sleepQuality);
  const [sleepHours, setSleepHours] = useState<number>(initialCheckIn.sleepHours || 5.4);
  const [symptoms, setSymptoms] = useState<string[]>(initialCheckIn.symptoms);

  // Optional Measurements Section
  const [showMeasurements, setShowMeasurements] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [heartRate, setHeartRate] = useState<number>(78);
  const [temperature, setTemperature] = useState<number>(98.6);
  const [bpSystolic, setBpSystolic] = useState<number>(120);
  const [bpDiastolic, setBpDiastolic] = useState<number>(80);
  const [steps, setSteps] = useState<number>(4900);

  // Validation States
  const [validationWarnings, setValidationWarnings] = useState<Record<string, string>>({});

  // Voice & AI State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceText, setVoiceText] = useState<string>(initialCheckIn.voiceTranscript);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  const availableSymptoms = [
    'Headache',
    'Fatigue',
    'Cough',
    'Feverish feeling',
    'Body discomfort',
    'Stress',
    'Other'
  ];

  const toggleSymptom = (s: string) => {
    if (symptoms.includes(s)) {
      setSymptoms(symptoms.filter(item => item !== s));
    } else {
      setSymptoms([...symptoms, s]);
    }
  };

  const handleValidateNumber = (
    field: 'heartRate' | 'temperature' | 'sleepHours' | 'steps' | 'bloodPressureSystolic' | 'bloodPressureDiastolic',
    val: number
  ) => {
    const res: ValidationResult = DataQualityEngine.validateMetric(field, val);
    setValidationWarnings(prev => {
      const copy = { ...prev };
      if (!res.isValid || res.isUnusual) {
        copy[field] = res.message || 'Value looks unusual.';
      } else {
        delete copy[field];
      }
      return copy;
    });
  };

  const handleVoiceSimulate = () => {
    setIsRecording(true);
    setTimeout(() => {
      setVoiceText('Woke up feeling tired with mild head pressure, slept around 5.4 hours and resting heart rate feels slightly faster than usual.');
      setIsRecording(false);
      if (!symptoms.includes('Fatigue')) setSymptoms(prev => [...prev, 'Fatigue']);
      if (!symptoms.includes('Headache')) setSymptoms(prev => [...prev, 'Headache']);
      setMood('not_well');
      setEnergyLevel('Low');
      setWellBeing('Low');
      setSleepHours(5.4);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updated: CheckInState = {
      mood,
      energy: energyLevel === 'High' ? 8 : energyLevel === 'Normal' ? 6 : 3,
      sleepQuality,
      sleepHours,
      symptoms,
      notes: `Well-being: ${wellBeing}, Energy: ${energyLevel}`,
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

      <main className="container-max" style={{ paddingTop: 28, maxWidth: 1040 }}>
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#0EA47A', textTransform: 'uppercase' }}>
              FLAGSHIP FEATURE 02 • 30–60 SECOND CHECK-IN
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginTop: 4 }}>
              Daily Health Check
            </h1>
            <p style={{ fontSize: 14, color: '#475569', marginTop: 4 }}>
              Fast, card-based reflection comparing today&apos;s observations with your personal recent pattern.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge badge-stable" style={{ fontSize: 11 }}>
              ⚡ 30–60s Flow
            </span>
            <span className="badge badge-info" style={{ fontSize: 11 }}>
              Non-Diagnostic
            </span>
          </div>
        </div>

        {/* Simulated Demo Notice */}
        {isDemoMode && (
          <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: 10, padding: '10px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ color: '#D97706', fontSize: 18 }}>science</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#92400E' }}>
                SIMULATED DEMONSTRATION DATA ACTIVE
              </span>
              <span style={{ fontSize: 12, color: '#B45309' }}>
                — Pre-calibrated demonstration values reflecting a multi-signal baseline deviation.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsDemoMode(prev => !prev)}
              style={{ background: 'none', border: 'none', color: '#B45309', fontSize: 11, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}
            >
              Toggle Demo Mode
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form (2 Cols) */}
          <div className="glass-card" style={{ padding: 28, gridColumn: 'span 2' }}>
            <form onSubmit={handleSubmit}>
              
              {/* Question 1: How do you feel? */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  1. How Do You Feel Today?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'good', label: 'Good', emoji: '😊', color: '#0EA47A' },
                    { id: 'okay', label: 'Okay', emoji: '😐', color: '#2563EB' },
                    { id: 'not_well', label: 'Not Well', emoji: '😟', color: '#DC2626' },
                  ].map(opt => {
                    const isSelected = mood === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setMood(opt.id as any)}
                        style={{
                          background: isSelected ? '#F8FAFC' : '#FFFFFF',
                          border: isSelected ? `2px solid ${opt.color}` : '1px solid #CBD5E1',
                          borderRadius: 12,
                          padding: '14px 10px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 6,
                          boxShadow: isSelected ? `0 4px 12px ${opt.color}25` : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: isSelected ? opt.color : '#334155' }}>
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Sleep Duration & Quality */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  2. Sleep Duration &amp; Quality
                </label>
                <div className="grid grid-cols-3 gap-3" style={{ marginBottom: 12 }}>
                  {[
                    { id: 'restful', label: 'Restful' },
                    { id: 'restless', label: 'Restless' },
                    { id: 'insomnia', label: 'Insomnia' },
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
                  <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Sleep Duration:</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    value={sleepHours}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setSleepHours(val);
                      handleValidateNumber('sleepHours', val);
                    }}
                    style={{
                      width: 80,
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: '1px solid #CBD5E1',
                      fontFamily: 'Space Grotesk',
                      fontWeight: 700,
                      fontSize: 14
                    }}
                  />
                  <span style={{ fontSize: 12, color: '#64748B' }}>
                    hrs (Your 30-day baseline average: <strong>7.1 hrs</strong> • ↓24% change)
                  </span>
                </div>
                {validationWarnings.sleepHours && (
                  <div style={{ fontSize: 11, color: '#D97706', marginTop: 4 }}>
                    ⚠️ {validationWarnings.sleepHours}
                  </div>
                )}
              </div>

              {/* Question 3: Energy & Well-Being */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: 24 }}>
                {/* Energy */}
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    3. Energy Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['High', 'Normal', 'Low'] as const).map(lvl => (
                      <button
                        type="button"
                        key={lvl}
                        onClick={() => setEnergyLevel(lvl)}
                        style={{
                          background: energyLevel === lvl ? '#F0FDF4' : '#F8FAFC',
                          border: energyLevel === lvl ? '2px solid #0EA47A' : '1px solid #CBD5E1',
                          color: energyLevel === lvl ? '#065F46' : '#475569',
                          fontWeight: 700,
                          fontSize: 12,
                          padding: '10px 8px',
                          borderRadius: 8,
                          cursor: 'pointer'
                        }}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Well-being */}
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    4. Well-Being State
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Positive', 'Neutral', 'Low'] as const).map(wb => (
                      <button
                        type="button"
                        key={wb}
                        onClick={() => setWellBeing(wb)}
                        style={{
                          background: wellBeing === wb ? '#F0FDF4' : '#F8FAFC',
                          border: wellBeing === wb ? '2px solid #0EA47A' : '1px solid #CBD5E1',
                          color: wellBeing === wb ? '#065F46' : '#475569',
                          fontWeight: 700,
                          fontSize: 12,
                          padding: '10px 8px',
                          borderRadius: 8,
                          cursor: 'pointer'
                        }}
                      >
                        {wb}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Question 4: Optional Symptoms */}
              <div style={{ marginBottom: 24 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <label style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    5. Optional Symptoms (Non-Diagnostic)
                  </label>
                  <span style={{ fontSize: 11, color: '#64748B' }}>
                    Selecting a symptom does not imply a medical diagnosis
                  </span>
                </div>
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
                          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>check</span>
                        )}
                        {sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Measurements Section */}
              <div style={{ marginBottom: 28, background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', padding: 18 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#0EA47A' }}>monitor_heart</span>
                    <strong style={{ fontSize: 14, color: '#0F172A' }}>
                      Add Measurements (Manual Entry / Demo Mode)
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMeasurements(prev => !prev)}
                    style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    {showMeasurements ? 'Hide' : 'Expand'}
                  </button>
                </div>

                {showMeasurements && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 4 }}>
                        Heart Rate (BPM)
                      </label>
                      <input
                        type="number"
                        value={heartRate}
                        onChange={e => {
                          const v = parseInt(e.target.value) || 0;
                          setHeartRate(v);
                          handleValidateNumber('heartRate', v);
                        }}
                        style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13 }}
                      />
                      <span style={{ fontSize: 10, color: '#64748B' }}>Baseline: 72 bpm</span>
                    </div>

                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 4 }}>
                        Daily Steps
                      </label>
                      <input
                        type="number"
                        value={steps}
                        onChange={e => {
                          const v = parseInt(e.target.value) || 0;
                          setSteps(v);
                          handleValidateNumber('steps', v);
                        }}
                        style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13 }}
                      />
                      <span style={{ fontSize: 10, color: '#64748B' }}>Baseline: 7,800 steps</span>
                    </div>

                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 4 }}>
                        Temperature (°F)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={temperature}
                        onChange={e => {
                          const v = parseFloat(e.target.value) || 0;
                          setTemperature(v);
                          handleValidateNumber('temperature', v);
                        }}
                        style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13 }}
                      />
                      <span style={{ fontSize: 10, color: '#64748B' }}>Baseline: 98.4 °F</span>
                    </div>

                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 4 }}>
                        BP (mmHg)
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={bpSystolic}
                          onChange={e => setBpSystolic(parseInt(e.target.value) || 120)}
                          style={{ width: '50%', padding: '8px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 12 }}
                          placeholder="Sys"
                        />
                        <span>/</span>
                        <input
                          type="number"
                          value={bpDiastolic}
                          onChange={e => setBpDiastolic(parseInt(e.target.value) || 80)}
                          style={{ width: '50%', padding: '8px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 12 }}
                          placeholder="Dia"
                        />
                      </div>
                      <span style={{ fontSize: 10, color: '#64748B' }}>Baseline: 118/78</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Hands-Free Voice Note Option */}
              <div style={{ background: '#F1F5F9', borderRadius: 10, padding: 14, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleVoiceSimulate}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: isRecording ? '#DC2626' : '#0EA47A',
                      color: '#FFF',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      {isRecording ? 'graphic_eq' : 'mic'}
                    </span>
                  </button>
                  <span style={{ fontSize: 12, color: '#334155' }}>
                    {voiceText ? `Voice note: "${voiceText}"` : 'Optional: Dictate how you feel by voice'}
                  </span>
                </div>
                <span className="badge badge-stable" style={{ fontSize: 10 }}>Hands-Free</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: 15, fontWeight: 700, borderRadius: 10 }}
              >
                Complete Today&apos;s Health Check (Save &amp; Compare)
              </button>
            </form>
          </div>

          {/* Right Column: Instant Comparison Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="glass-card" style={{ padding: 24, borderTop: '4px solid #0EA47A' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                HOW WE EVALUATE THIS
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', margin: '4px 0 12px' }}>
                Today vs Learned Baseline
              </h3>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, margin: 0 }}>
                HealthShield does not evaluate your inputs against arbitrary textbook thresholds. Your daily check-in is dynamically evaluated against your personal 30-day baseline corridor.
              </p>

              <div style={{ marginTop: 16, borderTop: '1px solid #E2E8F0', paddingTop: 14 }}>
                <div className="flex items-center justify-between" style={{ fontSize: 12, marginBottom: 8 }}>
                  <span style={{ color: '#64748B' }}>Sleep Comparison:</span>
                  <strong style={{ color: sleepHours < 6 ? '#DC2626' : '#16A34A' }}>
                    {sleepHours}h vs 7.1h ({sleepHours < 6 ? '↓24%' : 'Normal'})
                  </strong>
                </div>
                <div className="flex items-center justify-between" style={{ fontSize: 12, marginBottom: 8 }}>
                  <span style={{ color: '#64748B' }}>Heart Rate:</span>
                  <strong style={{ color: heartRate > 74 ? '#DC2626' : '#16A34A' }}>
                    {heartRate} bpm vs 72 bpm ({heartRate > 74 ? '↑8%' : 'Normal'})
                  </strong>
                </div>
                <div className="flex items-center justify-between" style={{ fontSize: 12 }}>
                  <span style={{ color: '#64748B' }}>Activity Steps:</span>
                  <strong style={{ color: steps < 6000 ? '#DC2626' : '#16A34A' }}>
                    {steps.toLocaleString()} vs 7,800 ({steps < 6000 ? '↓37%' : 'Normal'})
                  </strong>
                </div>
              </div>
            </div>

            {/* Post-Submission Result Card */}
            {submitted && (
              <div className="glass-card" style={{ padding: 22, borderLeft: '4px solid #2563EB', background: '#F8FAFC' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                  <span className="material-symbols-outlined" style={{ color: '#2563EB', fontSize: 20 }}>verified</span>
                  <strong style={{ fontSize: 14, color: '#0F172A' }}>Check-in Logged Successfully</strong>
                </div>
                <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.5, margin: '0 0 14px' }}>
                  {isGeneratingAi ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0EA47A' }}>
                      <span className="material-symbols-outlined animate-spin" style={{ fontSize: 16 }}>sync</span>
                      Evaluating today&apos;s check-in against your personal 30-day baseline...
                    </span>
                  ) : (
                    aiInsight || 'Multi-signal shift detected across sleep and resting heart rate. We recommend viewing the detailed explanation card.'
                  )}
                </p>
                <button
                  onClick={() => onNavigate('alert')}
                  className="btn-primary"
                  style={{ width: '100%', fontSize: 12, padding: '10px' }}
                >
                  View Change Explained →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
