import React, { useState } from 'react';

interface DiagnosticTest {
  id: string;
  testName: string;
  category: 'Electrophysiology' | 'Hematology' | 'Biochemistry' | 'Pulmonary' | 'Imaging';
  measuredValue: string;
  referenceRange: string;
  status: 'Normal' | 'Borderline' | 'Critical';
  sampleDate: string;
  orderingPhysician: string;
  interpretation: string;
}

const DIAGNOSTIC_TESTS: DiagnosticTest[] = [
  {
    id: 'tst_1',
    testName: '12-Lead Electrocardiogram (ECG)',
    category: 'Electrophysiology',
    measuredValue: 'Heart Rate: 84 BPM • QTc: 432ms',
    referenceRange: 'Normal QTc < 450ms • HR 60-100',
    status: 'Borderline',
    sampleDate: 'Oct 07, 2026 - 08:30 AM',
    orderingPhysician: 'Dr. Gregory Reynolds',
    interpretation: 'Sinus tachycardia with normal ventricular conduction. PR interval 158ms, QRS 88ms. No ST-segment elevation or T-wave inversion.'
  },
  {
    id: 'tst_2',
    testName: 'High-Sensitivity Cardiac Troponin I (hs-cTnI)',
    category: 'Biochemistry',
    measuredValue: '3.4 ng/L',
    referenceRange: '< 14.0 ng/L (99th percentile)',
    status: 'Normal',
    sampleDate: 'Oct 07, 2026 - 08:45 AM',
    orderingPhysician: 'Dr. Gregory Reynolds',
    interpretation: 'Negative for acute myocardial injury. Rule-out criteria met for ischemic necrosis.'
  },
  {
    id: 'tst_3',
    testName: 'Continuous Nocturnal Pulse Oximetry (SpO2)',
    category: 'Pulmonary',
    measuredValue: 'Min SpO2: 93% • Mean: 96.2%',
    referenceRange: 'Mean SpO2 > 95% • Desat Index < 5/hr',
    status: 'Borderline',
    sampleDate: 'Oct 06, 2026 - Overnight',
    orderingPhysician: 'Dr. V. Lakshmi',
    interpretation: 'Mild transient nocturnal dips to 93% correlated with supine REM sleep. No prolonged desaturation clusters.'
  },
  {
    id: 'tst_4',
    testName: 'High-Sensitivity C-Reactive Protein (hs-CRP)',
    category: 'Biochemistry',
    measuredValue: '4.8 mg/L',
    referenceRange: '< 1.0 mg/L (Low Risk)',
    status: 'Critical',
    sampleDate: 'Oct 05, 2026 - 10:15 AM',
    orderingPhysician: 'Dr. S. K. Raman',
    interpretation: 'Elevated systemic inflammatory marker consistent with post-viral convalescence and heightened autonomic sensitivity.'
  },
  {
    id: 'tst_5',
    testName: 'Complete Blood Count with Differential (CBC)',
    category: 'Hematology',
    measuredValue: 'WBC: 7.2 x10³/µL • Hb: 13.8 g/dL',
    referenceRange: 'WBC 4.0-11.0 • Hb 12.0-16.0 g/dL',
    status: 'Normal',
    sampleDate: 'Oct 05, 2026 - 10:15 AM',
    orderingPhysician: 'Dr. S. K. Raman',
    interpretation: 'Normocytic, normochromic indices. Platelet count 245 x10³/µL. Absolute neutrophil and lymphocyte ratios within normal limits.'
  }
];

export const DiagnosticsPage: React.FC = () => {
  const [tests] = useState<DiagnosticTest[]>(DIAGNOSTIC_TESTS);
  const [filter, setFilter] = useState<'All' | 'Critical' | 'Borderline' | 'Normal'>('All');
  const [selectedTest, setSelectedTest] = useState<DiagnosticTest | null>(null);

  const filtered = tests.filter(t => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  return (
    <div style={{ padding: '24px 32px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
            <span>🔬</span>
            <span>DIAGNOSTIC PATHOLOGY &amp; ELECTROPHYSIOLOGY CENTER</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Diagnostics &amp; Lab Investigations
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
            Multi-modal physiological biomarkers, ECG waveform analysis, and reference range delta tracking.
          </p>
        </div>

        <button
          onClick={() => alert('New Diagnostic Order Panel opened. Select from 84 hospital test profiles.')}
          style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span>+</span>
          <span>Order Diagnostic Test</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['All', 'Critical', 'Borderline', 'Normal'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              background: filter === tab ? '#2563EB' : '#FFFFFF',
              color: filter === tab ? '#FFFFFF' : '#64748B',
              border: filter === tab ? 'none' : '1px solid #E2E8F0',
              borderRadius: 8,
              padding: '8px 18px',
              fontSize: 13,
              fontWeight: filter === tab ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            {tab} ({tests.filter(t => tab === 'All' || t.status === tab).length})
          </button>
        ))}
      </div>

      {/* Tests Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
        {filtered.map(t => (
          <div
            key={t.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: 22,
              border: t.status === 'Critical' ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 14
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>{t.category}</span>
                <span
                  style={{
                    background: t.status === 'Critical' ? '#FEE2E2' : t.status === 'Borderline' ? '#FEF3C7' : '#DCFCE7',
                    color: t.status === 'Critical' ? '#DC2626' : t.status === 'Borderline' ? '#D97706' : '#166534',
                    padding: '2px 8px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 800
                  }}
                >
                  ● {t.status}
                </span>
              </div>

              <h3 style={{ margin: '0 0 6px 0', fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                {t.testName}
              </h3>

              {/* Value Box */}
              <div style={{ background: '#F8FAFC', borderRadius: 10, padding: 12, margin: '10px 0', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>MEASURED RESULT</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: t.status === 'Critical' ? '#DC2626' : '#0F172A', marginTop: 2 }}>
                  {t.measuredValue}
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                  Reference: {t.referenceRange}
                </div>
              </div>

              <p style={{ margin: 0, fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                {t.interpretation}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: 10, fontSize: 11 }}>
              <span style={{ color: '#64748B' }}>{t.sampleDate}</span>
              <button
                onClick={() => setSelectedTest(t)}
                style={{ background: 'transparent', color: '#2563EB', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}
              >
                Inspect Report →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Diagnostic Report Modal */}
      {selectedTest && (
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
          onClick={() => setSelectedTest(null)}
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
                <span style={{ fontSize: 11, color: '#2563EB', fontWeight: 700, textTransform: 'uppercase' }}>
                  {selectedTest.category} Report
                </span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: 18, fontWeight: 900, color: '#0F172A' }}>
                  {selectedTest.testName}
                </h3>
              </div>
              <button onClick={() => setSelectedTest(null)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#94A3B8' }}>✕</button>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700 }}>MEASURED RESULT VS STANDARD</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>
                {selectedTest.measuredValue}
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                Normal Physiological Range: <strong>{selectedTest.referenceRange}</strong>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>Physician Interpretation:</div>
              <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
                {selectedTest.interpretation}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#64748B', borderTop: '1px solid #E2E8F0', paddingTop: 12 }}>
              <span>Ordered by: <strong>{selectedTest.orderingPhysician}</strong></span>
              <button
                onClick={() => setSelectedTest(null)}
                style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
