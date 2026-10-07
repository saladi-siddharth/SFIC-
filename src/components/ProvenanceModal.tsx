import React from 'react';
import type { NormalizedObservation } from '../engine/deviceAdapters';

interface ProvenanceModalProps {
  observation: NormalizedObservation | null;
  onClose: () => void;
}

export const ProvenanceModal: React.FC<ProvenanceModalProps> = ({ observation, onClose }) => {
  if (!observation) return null;

  const getSourceBadgeColor = (type: string) => {
    switch (type) {
      case 'DEVICE': return { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE' };
      case 'SELF_REPORTED': return { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' };
      case 'SIMULATED': return { bg: '#F3E8FF', text: '#6B21A8', border: '#E9D5FF' };
      default: return { bg: '#E2E8F0', text: '#334155', border: '#CBD5E1' };
    }
  };

  const getQualityBadge = (status: string) => {
    switch (status) {
      case 'VALID': return { label: 'High Completeness • Accepted', color: '#16A34A', bg: '#DCFCE7' };
      case 'PARTIAL': return { label: 'Partial Completeness', color: '#CA8A04', bg: '#FEF9C3' };
      case 'SUSPICIOUS': return { label: 'Data Quality Needs Review', color: '#DC2626', bg: '#FEE2E2' };
      default: return { label: 'Rejected', color: '#6B7280', bg: '#F3F4F6' };
    }
  };

  const badgeStyle = getSourceBadgeColor(observation.sourceType);
  const quality = getQualityBadge(observation.qualityStatus);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          maxWidth: 520,
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>🔍</span>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0F172A' }}>Data Provenance & Quality</h3>
              <span style={{ fontSize: 12, color: '#64748B' }}>ABDM & DPDP Provenance Verifier</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              fontSize: 16,
              cursor: 'pointer',
              color: '#64748B'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Main Reading Preview */}
          <div style={{ background: '#F1F5F9', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Metric</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A' }}>
                {observation.metric.replace('_', ' ').toUpperCase()}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Value</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#2563EB' }}>
                {observation.value} <span style={{ fontSize: 14, fontWeight: 600 }}>{observation.unit}</span>
              </div>
            </div>
          </div>

          {/* Provenance Metadata Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700 }}>SOURCE CLASSIFICATION</div>
              <div style={{ marginTop: 6 }}>
                <span 
                  style={{
                    display: 'inline-block',
                    background: badgeStyle.bg,
                    color: badgeStyle.text,
                    border: `1px solid ${badgeStyle.border}`,
                    borderRadius: 6,
                    padding: '3px 8px',
                    fontSize: 12,
                    fontWeight: 700
                  }}
                >
                  {observation.sourceType}
                </span>
              </div>
            </div>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700 }}>DATA QUALITY STATUS</div>
              <div style={{ marginTop: 6 }}>
                <span 
                  style={{
                    display: 'inline-block',
                    background: quality.bg,
                    color: quality.color,
                    borderRadius: 6,
                    padding: '3px 8px',
                    fontSize: 11,
                    fontWeight: 700
                  }}
                >
                  {quality.label}
                </span>
              </div>
            </div>
          </div>

          {/* Granular Source Details */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Source Instrument:</span>
                <strong style={{ color: '#0F172A' }}>{observation.sourceName}</strong>
              </div>
              {observation.deviceId && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Device Identifier:</span>
                  <code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>
                    {observation.deviceId}
                  </code>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Recorded Timestamp:</span>
                <strong style={{ color: '#0F172A' }}>
                  {new Date(observation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Consent Context:</span>
                <span style={{ color: '#059669', fontWeight: 600 }}>{observation.userConsentContext}</span>
              </div>
              {observation.qualityNotes && (
                <div style={{ marginTop: 6, paddingTop: 8, borderTop: '1px dashed #E2E8F0', fontSize: 12, color: '#475569' }}>
                  <strong>Engine Notes:</strong> {observation.qualityNotes}
                </div>
              )}
            </div>
          </div>

          {/* Honesty Callout */}
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, padding: 12, fontSize: 12, color: '#1E40AF', display: 'flex', gap: 8 }}>
            <span>ℹ️</span>
            <div>
              <strong>Audit Integrity:</strong> Data provenance prevents misrepresentation. Simulated demonstration data is explicitly flagged as <em>SIMULATED</em>.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', textAlign: 'right' }}>
          <button
            onClick={onClose}
            style={{
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Close Provenance
          </button>
        </div>
      </div>
    </div>
  );
};
