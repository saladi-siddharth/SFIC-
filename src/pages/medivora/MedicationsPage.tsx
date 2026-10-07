import React, { useState } from 'react';

interface Medication {
  id: string;
  brandName: string;
  genericName: string;
  dosage: string;
  frequency: string;
  timeSlot: 'Morning' | 'Noon' | 'Evening' | 'Bedtime';
  purpose: string;
  prescribedBy: string;
  refillsRemaining: number;
  adherencePercent: number;
  interactionWarning?: string;
}

const MEDICATIONS_LIST: Medication[] = [
  {
    id: 'med_1',
    brandName: 'Toprol-XL',
    genericName: 'Metoprolol Succinate',
    dosage: '25 mg Extended Release',
    frequency: 'Once Daily',
    timeSlot: 'Morning',
    purpose: 'Autonomic Tachycardia Dampening',
    prescribedBy: 'Dr. Gregory Reynolds',
    refillsRemaining: 2,
    adherencePercent: 94
  },
  {
    id: 'med_2',
    brandName: 'Norvasc',
    genericName: 'Amlodipine Besylate',
    dosage: '5 mg Oral Tablet',
    frequency: 'Once Daily',
    timeSlot: 'Evening',
    purpose: 'Systemic Peripheral Resistance Reduction',
    prescribedBy: 'Dr. Gregory Reynolds',
    refillsRemaining: 3,
    adherencePercent: 91,
    interactionWarning: 'Additive hypotensive effect when combined with Metoprolol. Monitor seated vs standing BP.'
  },
  {
    id: 'med_3',
    brandName: 'Nu-Salt Electrolyte Pack',
    genericName: 'Sodium Chloride + Potassium Gluconate',
    dosage: '1,000 mg Oral Dissolvable',
    frequency: 'Twice Daily (with 500ml water)',
    timeSlot: 'Morning',
    purpose: 'Plasma Volume Expansion for Orthostatic Strain',
    prescribedBy: 'Dr. Gregory Reynolds',
    refillsRemaining: 5,
    adherencePercent: 88
  },
  {
    id: 'med_4',
    brandName: 'Crestor',
    genericName: 'Rosuvastatin Calcium',
    dosage: '10 mg Oral Tablet',
    frequency: 'Once Daily',
    timeSlot: 'Bedtime',
    purpose: 'Endothelial Protection & Lipid Stabilization',
    prescribedBy: 'Dr. S. K. Raman',
    refillsRemaining: 1,
    adherencePercent: 96
  }
];

export const MedicationsPage: React.FC = () => {
  const [meds] = useState<Medication[]>(MEDICATIONS_LIST);
  const [refillStatus, setRefillStatus] = useState<string | null>(null);

  const handleRequestRefill = (med: Medication) => {
    setRefillStatus(`Electronic refill request for ${med.brandName} (${med.dosage}) transmitted to Hospital Pharmacy.`);
    setTimeout(() => setRefillStatus(null), 4000);
  };

  return (
    <div style={{ padding: '24px 32px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
            <span>💊</span>
            <span>SMART PHARMACY &amp; DRUG INTERACTION ENGINE</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Medication Schedule &amp; Prescriptions
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
            Active pharmaceuticals, dosage timelines, adherence tracking, and automated pharmacological interaction filters.
          </p>
        </div>

        <button
          onClick={() => alert('New Prescription Order Sheet opened for verified clinician signature.')}
          style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span>+</span>
          <span>Prescribe Medication</span>
        </button>
      </div>

      {refillStatus && (
        <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', color: '#166534', padding: '12px 18px', borderRadius: 12, marginBottom: 20, fontSize: 13, fontWeight: 700 }}>
          ✓ {refillStatus}
        </div>
      )}

      {/* Medication Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
        {meds.map(m => (
          <div
            key={m.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: 22,
              border: m.interactionWarning ? '1.5px solid #FCD34D' : '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16
            }}
          >
            <div>
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ background: '#EFF6FF', color: '#1E40AF', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                  🕒 {m.timeSlot}
                </span>
                <span style={{ fontSize: 12, color: '#059669', fontWeight: 700 }}>
                  {m.adherencePercent}% Adherence
                </span>
              </div>

              <h3 style={{ margin: '0 0 2px 0', fontSize: 18, fontWeight: 900, color: '#0F172A' }}>
                {m.brandName}
              </h3>
              <div style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic', marginBottom: 10 }}>
                {m.genericName} • {m.dosage}
              </div>

              {/* Purpose & Doctor */}
              <div style={{ background: '#F8FAFC', borderRadius: 10, padding: 12, fontSize: 12, color: '#334155', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div><strong>Indication:</strong> {m.purpose}</div>
                <div><strong>Regimen:</strong> {m.frequency}</div>
                <div><strong>Prescribed By:</strong> {m.prescribedBy}</div>
              </div>

              {/* Interaction Warning Callout */}
              {m.interactionWarning && (
                <div style={{ marginTop: 10, background: '#FFFBEB', border: '1px solid #FDE68A', padding: '8px 12px', borderRadius: 8, fontSize: 11, color: '#92400E' }}>
                  <strong>⚠️ Interaction Guardrail:</strong> {m.interactionWarning}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: 12 }}>
              <span style={{ fontSize: 12, color: '#64748B' }}>
                Refills left: <strong>{m.refillsRemaining}</strong>
              </span>
              <button
                onClick={() => handleRequestRefill(m)}
                style={{
                  background: '#F1F5F9',
                  color: '#2563EB',
                  border: '1px solid #CBD5E1',
                  borderRadius: 8,
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Request Refill ↻
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
