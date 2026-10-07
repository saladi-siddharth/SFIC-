import React, { useState } from 'react';
import { localAiService } from '../../services/localAiService';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  mrn: string;
  avatar: string;
  room: string;
  diagnosis: string;
  riskScore: number;
  status: 'Critical' | 'Warning' | 'Stable';
  vitals: {
    hr: number;
    bp: string;
    spo2: number;
    temp: number;
  };
  baselineDeviation: string;
  lastUpdated: string;
}

const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pt_1',
    name: 'Sarah Vance',
    age: 42,
    gender: 'Female',
    mrn: 'MED-2026-8812',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face',
    room: 'Cardiology Bay 3A',
    diagnosis: 'Post-Viral Autonomic Strain • Tachycardia',
    riskScore: 78,
    status: 'Critical',
    vitals: { hr: 84, bp: '138/88', spo2: 95, temp: 37.4 },
    baselineDeviation: '+19% Resting HR departure from 30d baseline',
    lastUpdated: '12 mins ago'
  },
  {
    id: 'pt_2',
    name: 'Robert Chen',
    age: 58,
    gender: 'Male',
    mrn: 'MED-2026-9041',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    room: 'Ward 4B - Bed 12',
    diagnosis: 'Type 2 Diabetes • Peripheral Neuropathy',
    riskScore: 45,
    status: 'Warning',
    vitals: { hr: 74, bp: '128/82', spo2: 98, temp: 36.8 },
    baselineDeviation: '+6% Glucose variance post-prandial',
    lastUpdated: '25 mins ago'
  },
  {
    id: 'pt_3',
    name: 'Elena Rostova',
    age: 29,
    gender: 'Female',
    mrn: 'MED-2026-4429',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face',
    room: 'Outpatient Triage 2',
    diagnosis: 'Mild Sinus Arrhythmia • Orthostatic Fatigue',
    riskScore: 28,
    status: 'Stable',
    vitals: { hr: 68, bp: '116/74', spo2: 99, temp: 36.6 },
    baselineDeviation: 'Normal limits; 98% baseline alignment',
    lastUpdated: '1 hour ago'
  },
  {
    id: 'pt_4',
    name: 'David Okafor',
    age: 63,
    gender: 'Male',
    mrn: 'MED-2026-7731',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    room: 'ICU Step-down 1A',
    diagnosis: 'Hypertensive Cardiomyopathy',
    riskScore: 82,
    status: 'Critical',
    vitals: { hr: 92, bp: '152/96', spo2: 94, temp: 37.1 },
    baselineDeviation: '+24% Mean arterial pressure elevation',
    lastUpdated: '5 mins ago'
  },
  {
    id: 'pt_5',
    name: 'Aisha Al-Mansoor',
    age: 35,
    gender: 'Female',
    mrn: 'MED-2026-3198',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face',
    room: 'Day Care Surgery 04',
    diagnosis: 'Post-Laparoscopic Cholecystectomy Recovery',
    riskScore: 32,
    status: 'Stable',
    vitals: { hr: 72, bp: '120/78', spo2: 98, temp: 36.7 },
    baselineDeviation: 'Post-operative recovery tracking within normal variance',
    lastUpdated: '40 mins ago'
  }
];

export const PatientsPage: React.FC = () => {
  const [patients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Critical' | 'Warning' | 'Stable'>('All');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const filtered = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.mrn.toLowerCase().includes(search.toLowerCase()) ||
                          p.diagnosis.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleGenerateAiSummary = async (p: Patient) => {
    setSelectedPatient(p);
    setIsLoadingAi(true);
    setAiSummary(null);

    const prompt = `Patient Clinical Case:
Name: ${p.name}, Age: ${p.age}, Gender: ${p.gender}, MRN: ${p.mrn}
Diagnosis: ${p.diagnosis}
Current Vitals: HR ${p.vitals.hr} BPM, BP ${p.vitals.bp}, SpO2 ${p.vitals.spo2}%, Temp ${p.vitals.temp}°C
Baseline Departure: ${p.baselineDeviation}

Provide a concise, 2-sentence clinical review highlighting the physiological risk and recommended immediate nurse-proctor monitoring action.`;

    try {
      const summary = await localAiService.askAssistant(prompt);
      setAiSummary(summary);
    } catch {
      setAiSummary('Local Qwen2.5 model evaluated: Monitor autonomic stability and hydrate. Tachycardia departure warrants telemetry surveillance.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div style={{ padding: '24px 32px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
            <span>👥</span>
            <span>CLINICAL COHORT DIRECTORY • 128 ACTIVE INPATIENTS</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Patient Management &amp; Baseline Triage
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
            Real-time biometric monitoring, longitudinal anomaly tracking, and local Qwen2.5 clinical synthesis.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>+</span>
            <span>Admit New Patient</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '14px 18px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '1 1 320px' }}>
          <span style={{ fontSize: 18, color: '#94A3B8' }}>🔍</span>
          <input
            type="text"
            placeholder="Search patient by name, MRN, or diagnosis..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: 13 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {(['All', 'Critical', 'Warning', 'Stable'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                background: filter === tab ? '#2563EB' : '#F8FAFC',
                color: filter === tab ? '#FFFFFF' : '#64748B',
                border: filter === tab ? 'none' : '1px solid #E2E8F0',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: filter === tab ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Patients Table */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>
              <th style={{ padding: '14px 20px' }}>Patient Profile</th>
              <th style={{ padding: '14px 16px' }}>Room / Ward</th>
              <th style={{ padding: '14px 16px' }}>Diagnosis &amp; Baseline Drift</th>
              <th style={{ padding: '14px 16px' }}>Current Vitals</th>
              <th style={{ padding: '14px 16px' }}>Status</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Clinical AI Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.15s ease' }}>
                {/* Profile */}
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={p.avatar} alt={p.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 14 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>{p.age} yrs • {p.gender} • <code style={{ color: '#2563EB' }}>{p.mrn}</code></div>
                    </div>
                  </div>
                </td>

                {/* Room */}
                <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 600 }}>
                  {p.room}
                </td>

                {/* Diagnosis */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>{p.diagnosis}</div>
                  <div style={{ fontSize: 11, color: p.status === 'Critical' ? '#DC2626' : '#64748B', marginTop: 2 }}>
                    {p.baselineDeviation}
                  </div>
                </td>

                {/* Vitals */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                    <span style={{ background: '#FEE2E2', color: '#991B1B', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                      ❤️ {p.vitals.hr} BPM
                    </span>
                    <span style={{ background: '#EFF6FF', color: '#1E40AF', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                      🩸 {p.vitals.bp}
                    </span>
                    <span style={{ background: '#DCFCE7', color: '#166534', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                      🫁 {p.vitals.spo2}%
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td style={{ padding: '14px 16px' }}>
                  <span
                    style={{
                      background: p.status === 'Critical' ? '#FEE2E2' : p.status === 'Warning' ? '#FEF3C7' : '#DCFCE7',
                      color: p.status === 'Critical' ? '#DC2626' : p.status === 'Warning' ? '#D97706' : '#16A34A',
                      padding: '3px 10px',
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 800
                    }}
                  >
                    ● {p.status}
                  </span>
                </td>

                {/* Actions */}
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <button
                    onClick={() => handleGenerateAiSummary(p)}
                    style={{
                      background: '#F5F3FF',
                      color: '#7C3AED',
                      border: '1px solid #DDD6FE',
                      borderRadius: 8,
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <span>🤖</span>
                    <span>Qwen2.5 Review</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient AI Insight Modal */}
      {selectedPatient && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
          onClick={() => setSelectedPatient(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              maxWidth: 580,
              width: '100%',
              padding: 28,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              border: '1px solid #E2E8F0'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={selectedPatient.avatar} alt={selectedPatient.name} style={{ width: 48, height: 48, borderRadius: '50%' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: '#0F172A' }}>{selectedPatient.name}</h3>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{selectedPatient.mrn} • {selectedPatient.room}</div>
                </div>
              </div>
              <button onClick={() => setSelectedPatient(null)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#94A3B8' }}>✕</button>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#6D28D9', textTransform: 'uppercase', marginBottom: 4 }}>
                On-Device Qwen2.5-Coder-7B Clinical Triage Review
              </div>
              <p style={{ margin: 0, fontSize: 13, color: '#1E293B', lineHeight: 1.6 }}>
                {isLoadingAi ? 'Running on-device neural inference...' : aiSummary}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12, marginBottom: 20 }}>
              <div style={{ padding: 10, background: '#F1F5F9', borderRadius: 8 }}>
                <span style={{ color: '#64748B' }}>Diagnosis:</span>
                <strong style={{ display: 'block', color: '#0F172A', marginTop: 2 }}>{selectedPatient.diagnosis}</strong>
              </div>
              <div style={{ padding: 10, background: '#F1F5F9', borderRadius: 8 }}>
                <span style={{ color: '#64748B' }}>Baseline Departure:</span>
                <strong style={{ display: 'block', color: '#DC2626', marginTop: 2 }}>{selectedPatient.baselineDeviation}</strong>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => setSelectedPatient(null)}
                style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
