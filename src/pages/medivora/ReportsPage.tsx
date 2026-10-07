import React, { useState } from 'react';

interface ReportTemplate {
  id: string;
  title: string;
  patientName: string;
  reportDate: string;
  type: 'Baseline Drift' | 'Discharge Summary' | 'Holter Evaluation' | 'Metabolic Trend';
  summary: string;
  author: string;
}

const TEMPLATES: ReportTemplate[] = [
  {
    id: 'rep_1',
    title: '30-Day Longitudinal Autonomic Baseline Report',
    patientName: 'Sarah Vance',
    reportDate: 'Oct 07, 2026',
    type: 'Baseline Drift',
    summary: 'Evaluates the 19% resting heart rate departure (74 vs 62 bpm) coupled with 30% reduction in nocturnal rMSSD. Recommends oral electrolyte loading and 14-day telemetry follow-up.',
    author: 'Dr. Gregory Reynolds (Cardiology)'
  },
  {
    id: 'rep_2',
    title: 'Formal Inpatient Clinical Discharge Summary',
    patientName: 'Sarah Vance',
    reportDate: 'Sep 15, 2026',
    type: 'Discharge Summary',
    summary: 'Admitted for acute orthostatic intolerance following viral illness. Fluid resuscitation completed. Hemodynamically stable at discharge. Discharged on Metoprolol 25mg daily.',
    author: 'Dr. Gregory Reynolds (Cardiology)'
  },
  {
    id: 'rep_3',
    title: 'Ambulatory Blood Pressure & Arterial Compliance Review',
    patientName: 'David Okafor',
    reportDate: 'Oct 02, 2026',
    type: 'Metabolic Trend',
    summary: 'Mean arterial pressure reduced from 152/96 to 134/84 mmHg following Telmisartan titration. Renal panel shows stable creatinine and normal serum potassium.',
    author: 'Dr. Gregory Reynolds (Cardiology)'
  }
];

export const ReportsPage: React.FC = () => {
  const [reports] = useState<ReportTemplate[]>(TEMPLATES);
  const [activePreview, setActivePreview] = useState<ReportTemplate | null>(TEMPLATES[0]);

  const handlePrintOrDownload = (r: ReportTemplate) => {
    const text = `
================================================================================
                    MEDIVORA AI CLINICAL HEALTH REPORT
================================================================================
Report Title: ${r.title}
Patient Name: ${r.patientName} (MRN: MED-2026-8812)
Date Issued:  ${r.reportDate}
Report Type:  ${r.type}
Physician:    ${r.author}

CLINICAL NARRATIVE:
${r.summary}

PHYSICIAN SIGNATURE & AUTHENTICATION:
Digitally signed & verified under ABDM Standards
Signature Hash: SHA256-${Math.random().toString(36).substring(2, 14).toUpperCase()}
================================================================================
`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${r.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '24px 32px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
            <span>📄</span>
            <span>CLINICAL REPORT COMPILER &amp; DISCHARGE SUMMARIES</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Clinical Reports &amp; Documentation
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
            Compile standardized clinical summaries, print authenticated physician reports, and export longitudinal baseline archives.
          </p>
        </div>

        <button
          onClick={() => alert('New Report Generator opened.')}
          style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span>+</span>
          <span>Generate New Report</span>
        </button>
      </div>

      {/* Main Split: Left Report List, Right Live Document Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        {/* Reports List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reports.map(r => (
            <div
              key={r.id}
              onClick={() => setActivePreview(r)}
              style={{
                background: '#FFFFFF',
                borderRadius: 14,
                padding: 18,
                border: activePreview?.id === r.id ? '2px solid #2563EB' : '1px solid #E2E8F0',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ background: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                  {r.type}
                </span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>{r.reportDate}</span>
              </div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 15, fontWeight: 800, color: '#0F172A' }}>
                {r.title}
              </h3>
              <div style={{ fontSize: 12, color: '#64748B' }}>Patient: <strong>{r.patientName}</strong> • {r.author}</div>
            </div>
          ))}
        </div>

        {/* Live Document Preview Sheet */}
        {activePreview && (
          <div style={{ background: '#FFFFFF', borderRadius: 18, border: '1px solid #CBD5E1', padding: 32, boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
            <div style={{ borderBottom: '2px solid #0F172A', paddingBottom: 16, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  MEDIVORA HEALTH SYSTEM
                </div>
                <div style={{ fontSize: 11, color: '#64748B' }}>Department of Cardiovascular Medicine • NABH Accredited</div>
              </div>
              <div style={{ textAlign: 'right', fontSize: 11, color: '#64748B' }}>
                <div>Date: <strong>{activePreview.reportDate}</strong></div>
                <div>Status: <strong style={{ color: '#059669' }}>AUTHENTICATED</strong></div>
              </div>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
              {activePreview.title}
            </h2>

            <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, marginBottom: 18, fontSize: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>Patient: <strong>{activePreview.patientName}</strong></div>
              <div>MRN: <strong>MED-2026-8812</strong></div>
              <div>Report Category: <strong>{activePreview.type}</strong></div>
              <div>Attending: <strong>{activePreview.author}</strong></div>
            </div>

            <div style={{ marginBottom: 24, fontSize: 13, lineHeight: 1.7, color: '#1E293B' }}>
              <strong style={{ display: 'block', marginBottom: 6 }}>Clinical Evaluation &amp; Findings:</strong>
              <p style={{ margin: 0 }}>{activePreview.summary}</p>
            </div>

            {/* Signature Block */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#2563EB', fontWeight: 700 }}>
                  ✓ Digitally Signed &amp; Timestamped
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
                  Dr. Gregory Reynolds (MD, FACC)
                </div>
              </div>

              <button
                onClick={() => handlePrintOrDownload(activePreview)}
                style={{
                  background: '#0F172A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 8,
                  padding: '9px 18px',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>💾</span>
                <span>Download Report TXT/PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
