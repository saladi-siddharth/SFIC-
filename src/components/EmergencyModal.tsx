import React, { useState } from 'react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  heartRate: number;
  spo2: number;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  heartRate,
  spo2,
}) => {
  const [dispatched, setDispatched] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: 620, 
          width: '100%', 
          padding: 28, 
          background: '#FFFFFF',
          border: '2px solid #EF4444',
          boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.25)' 
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <div className="flex items-center gap-3">
            <div 
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                background: '#FEE2E2', 
                color: '#BA1A1A', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
                emergency
              </span>
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#991B1B' }}>
                Emergency Safety Workflow
              </h2>
              <div style={{ fontSize: 12, color: '#64748B' }}>
                Deterministic Safety Override • Non-Diagnostic Emergency Protocol
              </div>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Safety Boundary Banner */}
        <div 
          style={{ 
            background: '#FEF2F2', 
            border: '1px solid #FECACA', 
            borderRadius: 10, 
            padding: '10px 14px',
            marginBottom: 20,
            fontSize: 12,
            color: '#7F1D1D',
            lineHeight: 1.5
          }}
        >
          <strong>Safety Rule Guardrail:</strong> HealthShield AI does not diagnose acute medical emergencies. If you are experiencing chest pain, acute shortness of breath, severe hemorrhage, or loss of consciousness, contact national emergency services immediately.
        </div>

        {/* Step 1: National Emergency Dialers */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: 8 }}>
            1. Direct Emergency Services (India / Global)
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a 
              href="tel:112"
              style={{
                textDecoration: 'none',
                background: '#DC2626',
                color: '#FFFFFF',
                borderRadius: 10,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                fontWeight: 800,
                fontSize: 16,
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
              }}
            >
              <span className="material-symbols-outlined">call</span>
              Call 112 (National Emergency)
            </a>
            <a 
              href="tel:108"
              style={{
                textDecoration: 'none',
                background: '#B91C1C',
                color: '#FFFFFF',
                borderRadius: 10,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                fontWeight: 800,
                fontSize: 16,
                boxShadow: '0 4px 12px rgba(185, 28, 28, 0.3)'
              }}
            >
              <span className="material-symbols-outlined">ambulance</span>
              Call 108 (Ambulance)
            </a>
          </div>
        </div>

        {/* Step 2: Contact Trusted Person */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: 8 }}>
            2. Primary Trusted Contact
          </div>
          <div 
            style={{ 
              background: '#F8FAFC', 
              border: '1px solid #E2E8F0', 
              borderRadius: 10, 
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'between'
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 14 }}>
                Dr. Rajesh Patel (Primary Physician & Brother)
              </div>
              <div style={{ fontSize: 12, color: '#64748B' }}>
                +91 98765 43210 • Priority Tier 1 Caregiver
              </div>
            </div>
            <button
              onClick={() => setDispatched(true)}
              style={{
                background: dispatched ? '#059669' : '#0EA47A',
                color: '#FFF',
                border: 'none',
                borderRadius: 8,
                padding: '8px 14px',
                fontWeight: 700,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                {dispatched ? 'check_circle' : 'send'}
              </span>
              {dispatched ? 'Alert Transmitted!' : 'Dispatch SMS Alert'}
            </button>
          </div>
          {dispatched && (
            <div style={{ fontSize: 11, color: '#059669', fontWeight: 600, marginTop: 6 }}>
              ✓ SMS sent with GPS coordinates, baseline delta, and vital stats ({heartRate} bpm, {spo2}% SpO₂).
            </div>
          )}
        </div>

        {/* Step 3: Medical ID Card Display */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: 8 }}>
            3. On-Device Medical ID Card (For First Responders)
          </div>
          <div 
            style={{ 
              background: '#F1F5F9', 
              border: '1px solid #CBD5E1', 
              borderRadius: 10, 
              padding: '12px 16px',
              fontSize: 12,
              lineHeight: 1.6
            }}
          >
            <div className="grid grid-cols-2 gap-2">
              <div><strong>Patient:</strong> Sarah Vance (34F)</div>
              <div><strong>Blood Group:</strong> O-Positive (O+)</div>
              <div><strong>Known Allergies:</strong> Penicillin, Shellfish</div>
              <div><strong>Chronic Conditions:</strong> None known</div>
              <div><strong>Current Meds:</strong> Multivitamin, Vitamin D3</div>
              <div><strong>Telemetry ID:</strong> #HA-8492-AX</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end" style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #E2E8F0' }}>
          <button onClick={onClose} className="btn-secondary">
            Close Safety Panel
          </button>
        </div>
      </div>
    </div>
  );
};
