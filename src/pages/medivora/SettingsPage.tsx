import React, { useState } from 'react';

export const SettingsPage: React.FC = () => {
  const [modelTemp, setModelTemp] = useState<number>(0.6);
  const [offlineSyncInterval, setOfflineSyncInterval] = useState<number>(15);
  const [auditLoggingEnabled, setAuditLoggingEnabled] = useState<boolean>(true);
  const [abdmSandboxActive, setAbdmSandboxActive] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{ padding: '24px 32px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
          <span>⚙️</span>
          <span>HOSPITAL SYSTEM ADMINISTRATION &amp; GOVERNANCE</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>
          System Settings &amp; Clinical Governance
        </h1>
        <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
          Configure on-device neural parameters, DPDP compliance audit rules, and ABDM interoperability endpoints.
        </p>
      </div>

      {isSaved && (
        <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', color: '#166534', padding: '12px 18px', borderRadius: 12, marginBottom: 20, fontSize: 13, fontWeight: 700 }}>
          ✓ Clinical system preferences saved successfully.
        </div>
      )}

      {/* Settings Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 840 }}>
        {/* Section 1: Local AI Engine Configuration */}
        <div style={{ background: '#FFFFFF', borderRadius: 18, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>🤖</span>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                On-Device Neural Model Parameters
              </h3>
              <div style={{ fontSize: 12, color: '#64748B' }}>Local model: Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                <span>Inference Temperature (Determinism Control):</span>
                <span style={{ color: '#2563EB', fontWeight: 800 }}>{modelTemp}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={modelTemp}
                onChange={e => setModelTemp(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                Lower temperatures (0.2 - 0.6) enforce high clinical determinism and prevent hallucinations.
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, fontSize: 12, color: '#334155' }}>
              <div><strong>Model Path:</strong> <code>d:\SFIC\Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf</code></div>
              <div style={{ marginTop: 2 }}><strong>Quantization:</strong> Q4_K_M (4.68 GB) • <strong>Execution:</strong> CPU Multi-Threading</div>
            </div>
          </div>
        </div>

        {/* Section 2: DPDP Act Privacy & Audit Trail */}
        <div style={{ background: '#FFFFFF', borderRadius: 18, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>🛡️</span>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                DPDP Act 2023 Compliance Governance
              </h3>
              <div style={{ fontSize: 12, color: '#64748B' }}>Digital Personal Data Protection statutory guardrails</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F8FAFC', borderRadius: 10 }}>
              <div>
                <strong style={{ fontSize: 13, color: '#0F172A' }}>Tamper-Evident Audit Logging</strong>
                <div style={{ fontSize: 11, color: '#64748B' }}>Log all clinician data queries and triage escalations</div>
              </div>
              <input
                type="checkbox"
                checked={auditLoggingEnabled}
                onChange={e => setAuditLoggingEnabled(e.target.checked)}
                style={{ width: 18, height: 18 }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F8FAFC', borderRadius: 10 }}>
              <div>
                <strong style={{ fontSize: 13, color: '#0F172A' }}>IndexedDB Offline Sync Interval (Minutes)</strong>
                <div style={{ fontSize: 11, color: '#64748B' }}>Idempotent local sync window for field deployments</div>
              </div>
              <select
                value={offlineSyncInterval}
                onChange={e => setOfflineSyncInterval(Number(e.target.value))}
                style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 12 }}
              >
                <option value={5}>Every 5 minutes</option>
                <option value={15}>Every 15 minutes</option>
                <option value={30}>Every 30 minutes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: ABDM Interoperability Gateway */}
        <div style={{ background: '#FFFFFF', borderRadius: 18, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>🏛️</span>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                ABDM Gateway Interoperability (Ayushman Bharat)
              </h3>
              <div style={{ fontSize: 12, color: '#64748B' }}>FHIR R4 Vital Signs Bundle Synchronization</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F8FAFC', borderRadius: 10 }}>
              <div>
                <strong style={{ fontSize: 13, color: '#0F172A' }}>ABDM Sandbox Bridge Active</strong>
                <div style={{ fontSize: 11, color: '#64748B' }}>Target endpoint: https://dev.abdm.gov.in/gateway/v0.5</div>
              </div>
              <input
                type="checkbox"
                checked={abdmSandboxActive}
                onChange={e => setAbdmSandboxActive(e.target.checked)}
                style={{ width: 18, height: 18 }}
              />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div>
          <button
            onClick={handleSave}
            style={{
              background: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 12,
              padding: '14px 28px',
              fontSize: 14,
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Save All Clinical System Configurations
          </button>
        </div>
      </div>
    </div>
  );
};
