import React, { useState } from 'react';

interface TreatmentPlan {
  id: string;
  patientName: string;
  planTitle: string;
  category: 'Cardiovascular' | 'Metabolic' | 'Autonomic Rehab' | 'Post-Surgical';
  progressPercent: number;
  startDate: string;
  targetEndDate: string;
  attendingPhysician: string;
  milestones: Array<{ title: string; completed: boolean }>;
  dailyDirectives: string[];
}

const TREATMENTS: TreatmentPlan[] = [
  {
    id: 'trt_1',
    patientName: 'Sarah Vance',
    planTitle: 'Post-Viral Autonomic Stabilization & Volume Resuscitation',
    category: 'Autonomic Rehab',
    progressPercent: 65,
    startDate: 'Sep 25, 2026',
    targetEndDate: 'Oct 25, 2026',
    attendingPhysician: 'Dr. Gregory Reynolds',
    milestones: [
      { title: 'Baseline ECG & Holter Telemetry Assessment', completed: true },
      { title: 'Isotonic Electrolyte Loading (2.5L/day)', completed: true },
      { title: 'Graduated Recumbent Exercise Protocol (Week 2)', completed: true },
      { title: 'Orthostatic Tilt-Table Re-Evaluation', completed: false },
      { title: 'Full Autonomic Baseline Realignment', completed: false }
    ],
    dailyDirectives: [
      'Consume 500ml sodium-electrolyte fluid upon waking prior to standing',
      'Wear 20-30 mmHg graduated calf compression stockings during daytime hours',
      'Cease all screen interaction 60 minutes prior to nocturnal sleep'
    ]
  },
  {
    id: 'trt_2',
    patientName: 'Robert Chen',
    planTitle: 'Glycemic Variability Dampening & Sensory Neuro-Rehab',
    category: 'Metabolic',
    progressPercent: 40,
    startDate: 'Oct 01, 2026',
    targetEndDate: 'Nov 15, 2026',
    attendingPhysician: 'Dr. Gregory Reynolds',
    milestones: [
      { title: 'Continuous Glucose Monitor (CGM) Pairing', completed: true },
      { title: 'Post-Prandial Walking Cadence (15 min after meals)', completed: true },
      { title: 'Peripheral Monofilament Testing (Month 1)', completed: false },
      { title: 'HbA1c Target < 6.8% Consolidation', completed: false }
    ],
    dailyDirectives: [
      'Log meal carbohydrates within 15 minutes of intake',
      'Daily bilateral foot inspection for pressure points and micro-abrasions',
      'Maintain hydration target > 2.0L/day'
    ]
  },
  {
    id: 'trt_3',
    patientName: 'David Okafor',
    planTitle: 'Stage II Hypertension Dual-Agent Step-Care Protocol',
    category: 'Cardiovascular',
    progressPercent: 80,
    startDate: 'Sep 10, 2026',
    targetEndDate: 'Oct 20, 2026',
    attendingPhysician: 'Dr. Gregory Reynolds',
    milestones: [
      { title: 'Amlodipine 5mg + Telmisartan 40mg Initiation', completed: true },
      { title: 'Twice-Daily Ambulatory BP Logging', completed: true },
      { title: 'Serum Potassium & Creatinine Stability Check', completed: true },
      { title: 'Target Sustained BP < 130/80 mmHg Across 14 Days', completed: false }
    ],
    dailyDirectives: [
      'Measure blood pressure seated at 08:00 AM and 08:00 PM',
      'Strict dietary sodium restriction < 1,500 mg daily',
      '30-minute moderate aerobic exercise'
    ]
  }
];

export const TreatmentsPage: React.FC = () => {
  const [plans, setPlans] = useState<TreatmentPlan[]>(TREATMENTS);

  const toggleMilestone = (planId: string, mIdx: number) => {
    setPlans(prev => prev.map(p => {
      if (p.id === planId) {
        const nextMilestones = [...p.milestones];
        nextMilestones[mIdx].completed = !nextMilestones[mIdx].completed;
        const compCount = nextMilestones.filter(m => m.completed).length;
        const progressPercent = Math.round((compCount / nextMilestones.length) * 100);
        return { ...p, milestones: nextMilestones, progressPercent };
      }
      return p;
    }));
  };

  return (
    <div style={{ padding: '24px 32px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
            <span>🏥</span>
            <span>CLINICAL PROTOCOLS &amp; REHABILITATION PATHWAYS</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Active Treatments &amp; Care Plans
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
            Multi-stage recovery pathways, daily clinical directives, and milestone progress tracking.
          </p>
        </div>

        <button
          onClick={() => alert('New Treatment Plan wizard opened. Select from standardized AHA/ICMR clinical pathways.')}
          style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span>+</span>
          <span>New Care Protocol</span>
        </button>
      </div>

      {/* Plans List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {plans.map(p => (
          <div
            key={p.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 18,
              padding: 26,
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ background: '#EFF6FF', color: '#1E40AF', padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                    {p.category}
                  </span>
                  <span style={{ fontSize: 12, color: '#64748B' }}>Patient: <strong style={{ color: '#0F172A' }}>{p.patientName}</strong></span>
                </div>
                <h2 style={{ margin: '8px 0 4px 0', fontSize: 18, fontWeight: 900, color: '#0F172A' }}>
                  {p.planTitle}
                </h2>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  Supervising Clinician: <strong>{p.attendingPhysician}</strong> • {p.startDate} to {p.targetEndDate}
                </div>
              </div>

              {/* Progress Donut/Bar */}
              <div style={{ minWidth: 160, textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>PROTOCOL PROGRESS</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#2563EB', marginTop: 2 }}>
                  {p.progressPercent}%
                </div>
                <div style={{ height: 6, background: '#E2E8F0', borderRadius: 3, marginTop: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${p.progressPercent}%`, height: '100%', background: '#2563EB' }} />
                </div>
              </div>
            </div>

            {/* Split: Milestones vs Daily Directives */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18, marginTop: 14 }}>
              {/* Milestones */}
              <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 18, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: 10 }}>
                  Key Clinical Milestones
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p.milestones.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      onClick={() => toggleMilestone(p.id, mIdx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        cursor: 'pointer',
                        fontSize: 13,
                        color: m.completed ? '#166534' : '#475569'
                      }}
                    >
                      <span style={{ fontSize: 16, color: m.completed ? '#16A34A' : '#94A3B8' }}>
                        {m.completed ? '☑' : '☐'}
                      </span>
                      <span style={{ textDecoration: m.completed ? 'line-through' : 'none' }}>
                        {m.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Directives */}
              <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 18, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: 10 }}>
                  Daily Clinical Directives
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
                  {p.dailyDirectives.map((d, dIdx) => (
                    <li key={dIdx} style={{ marginBottom: 6 }}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
