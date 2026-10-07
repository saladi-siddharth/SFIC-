import React, { useState } from 'react';

interface RecordItem {
  id: string;
  category: 'Diagnostic Lab' | 'Cardiology' | 'Radiology' | 'Prescription' | 'Discharge Summary';
  title: string;
  doctor: string;
  date: string;
  badgeColor: string;
  badgeBg: string;
  findings: string;
  loincCode: string;
  fhirType: string;
}

const RECORDS: RecordItem[] = [
  {
    id: 'rec_1',
    category: 'Cardiology',
    title: '24-Hour Holter Telemetry Analysis',
    doctor: 'Dr. Gregory Reynolds',
    date: 'Oct 06, 2026',
    badgeColor: '#DC2626',
    badgeBg: '#FEE2E2',
    findings: 'Sinus tachycardia noted between 02:00 and 06:00 AM. Mean resting HR 84 bpm (+19% above 30d baseline). No VT/VF events detected.',
    loincCode: 'LOINC 8867-4',
    fhirType: 'Observation/VitalSigns'
  },
  {
    id: 'rec_2',
    category: 'Diagnostic Lab',
    title: 'Complete Comprehensive Metabolic Panel (CMP)',
    doctor: 'Dr. S. K. Raman',
    date: 'Oct 04, 2026',
    badgeColor: '#16A34A',
    badgeBg: '#DCFCE7',
    findings: 'Serum Creatinine: 0.9 mg/dL (Normal), eGFR: >90 mL/min/1.73m², Potassium: 4.2 mmol/L (Normal), Fasting Glucose: 94 mg/dL.',
    loincCode: 'LOINC 24323-8',
    fhirType: 'DiagnosticReport'
  },
  {
    id: 'rec_3',
    category: 'Radiology',
    title: 'High-Resolution Chest Radiograph (PA View)',
    doctor: 'Dr. V. Lakshmi',
    date: 'Sep 28, 2026',
    badgeColor: '#2563EB',
    badgeBg: '#EFF6FF',
    findings: 'Clear bilateral lung fields. Cardiothoracic ratio normal (0.44). No pleural effusion or acute parenchymal infiltration.',
    loincCode: 'LOINC 30745-4',
    fhirType: 'ImagingStudy'
  },
  {
    id: 'rec_4',
    category: 'Discharge Summary',
    title: 'Inpatient Autonomic Triage Summary',
    doctor: 'Dr. Gregory Reynolds',
    date: 'Sep 15, 2026',
    badgeColor: '#7C3AED',
    badgeBg: '#F5F3FF',
    findings: 'Admitted for acute orthostatic dizziness. Resolved following isotonic hydration and baseline realignment. Discharged with wearable monitoring protocol.',
    loincCode: 'LOINC 18842-5',
    fhirType: 'Composition/DischargeSummary'
  }
];

export const HealthRecordsPage: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<RecordItem | null>(null);
  const [fhirJsonVisible, setFhirJsonVisible] = useState(false);

  const handleExportFhirBundle = () => {
    const bundle = {
      resourceType: 'Bundle',
      type: 'document',
      meta: { lastUpdated: new Date().toISOString() },
      entry: RECORDS.map(r => ({
        resource: {
          resourceType: r.fhirType.split('/')[0],
          id: r.id,
          code: { text: r.title, coding: [{ code: r.loincCode }] },
          status: 'final',
          performer: [{ display: r.doctor }],
          issued: r.date,
          conclusion: r.findings
        }
      }))
    };
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medivora_fhir_r4_bundle_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '24px 32px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
            <span>📁</span>
            <span>ABDM-COMPLIANT ELECTRONIC HEALTH RECORDS (EHR)</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Longitudinal Health Records
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
            Permanent clinical records, diagnostic investigations, and interoperable FHIR R4 bundle exports.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleExportFhirBundle}
            style={{ background: '#059669', color: '#FFF', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span>📥</span>
            <span>Export FHIR R4 Bundle</span>
          </button>
        </div>
      </div>

      {/* Patient Static Banner */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px 24px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face" alt="Sarah Vance" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A' }}>Sarah Vance (Primary Record)</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>MRN: MED-2026-8812 • Blood Group: A+ • Allergies: Penicillin (Mild Rash)</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          <div>
            <span style={{ fontSize: 11, color: '#64748B', display: 'block', fontWeight: 600 }}>ABDM ABHA ID</span>
            <strong style={{ fontSize: 13, color: '#2563EB' }}>sarah.vance@abdm</strong>
          </div>
          <div>
            <span style={{ fontSize: 11, color: '#64748B', display: 'block', fontWeight: 600 }}>Total Records</span>
            <strong style={{ fontSize: 13, color: '#0F172A' }}>{RECORDS.length} Documents</strong>
          </div>
        </div>
      </div>

      {/* Records Timeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {RECORDS.map(rec => (
          <div
            key={rec.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: '20px 24px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    background: rec.badgeBg,
                    color: rec.badgeColor,
                    padding: '3px 10px',
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 700
                  }}
                >
                  {rec.category}
                </span>
                <span style={{ fontSize: 12, color: '#64748B' }}>{rec.date}</span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>• {rec.loincCode}</span>
              </div>

              <button
                onClick={() => setSelectedRecord(rec)}
                style={{
                  background: '#F8FAFC',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE',
                  borderRadius: 6,
                  padding: '4px 12px',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Inspect Clinical Finding
              </button>
            </div>

            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
              {rec.title}
            </h3>

            <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.5 }}>
              {rec.findings}
            </p>

            <div style={{ fontSize: 11, color: '#64748B', borderTop: '1px dashed #E2E8F0', paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>Attending Physician: <strong>{rec.doctor}</strong></span>
              <span style={{ color: '#059669', fontWeight: 600 }}>FHIR Resource: {rec.fhirType}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Record Inspection Modal */}
      {selectedRecord && (
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
          onClick={() => setSelectedRecord(null)}
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
              <div>
                <span style={{ fontSize: 11, background: selectedRecord.badgeBg, color: selectedRecord.badgeColor, padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                  {selectedRecord.category}
                </span>
                <h3 style={{ margin: '6px 0 0 0', fontSize: 18, fontWeight: 900, color: '#0F172A' }}>
                  {selectedRecord.title}
                </h3>
              </div>
              <button onClick={() => setSelectedRecord(null)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#94A3B8' }}>✕</button>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 13, lineHeight: 1.6, color: '#1E293B' }}>
              <strong>Clinical Narrative &amp; Findings:</strong>
              <p style={{ margin: '6px 0 0 0' }}>{selectedRecord.findings}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748B', marginBottom: 20 }}>
              <span>Physician: <strong>{selectedRecord.doctor}</strong></span>
              <span>Issued: <strong>{selectedRecord.date}</strong></span>
              <span>Standard: <strong>{selectedRecord.loincCode}</strong></span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                onClick={() => setFhirJsonVisible(!fhirJsonVisible)}
                style={{ background: '#F1F5F9', color: '#0F172A', border: '1px solid #CBD5E1', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
              >
                {fhirJsonVisible ? 'Hide FHIR JSON' : 'View FHIR JSON'}
              </button>
              <button
                onClick={() => setSelectedRecord(null)}
                style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                Close Record
              </button>
            </div>

            {fhirJsonVisible && (
              <pre style={{ marginTop: 16, padding: 14, background: '#0F172A', color: '#A5F3FC', borderRadius: 10, fontSize: 11, overflowX: 'auto', maxHeight: 180 }}>
                {JSON.stringify({
                  resourceType: selectedRecord.fhirType.split('/')[0],
                  id: selectedRecord.id,
                  status: 'final',
                  code: { text: selectedRecord.title, loinc: selectedRecord.loincCode },
                  findings: selectedRecord.findings
                }, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
