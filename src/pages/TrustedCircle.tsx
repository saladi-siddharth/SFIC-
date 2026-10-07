import React, { useState } from 'react';

interface TrustedContact {
  id: string;
  name: string;
  relationship: 'FAMILY' | 'CAREGIVER' | 'SUPPORT_PERSON';
  contact: string;
  shareSleepTrend: boolean;
  sharePatternAlerts: boolean;
  shareDetailedObservations: boolean;
  shareAiConversations: boolean;
  lastNotified?: string;
}

const INITIAL_CONTACTS: TrustedContact[] = [
  {
    id: 'cnt_1',
    name: 'Ananya Rao',
    relationship: 'FAMILY',
    contact: 'ananya.family@example.com',
    shareSleepTrend: true,
    sharePatternAlerts: true,
    shareDetailedObservations: false, // Default private
    shareAiConversations: false, // Always private
    lastNotified: '2026-10-06 18:20'
  },
  {
    id: 'cnt_2',
    name: 'Dr. Ramesh (Campus Proctor)',
    relationship: 'SUPPORT_PERSON',
    contact: 'proctor.wellness@polytechnic.edu',
    shareSleepTrend: false,
    sharePatternAlerts: true,
    shareDetailedObservations: false,
    shareAiConversations: false
  }
];

export const TrustedCircle: React.FC = () => {
  const [contacts, setContacts] = useState<TrustedContact[]>(INITIAL_CONTACTS);
  const [notificationSent, setNotificationSent] = useState<string | null>(null);

  const handleToggle = (id: string, key: keyof TrustedContact) => {
    setContacts(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, [key]: !c[key] };
      }
      return c;
    }));
  };

  const handleTriggerNotification = (contact: TrustedContact) => {
    setNotificationSent(contact.name);
    setTimeout(() => setNotificationSent(null), 3000);
  };

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FEF3C7', color: '#92400E', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
          <span>🤝</span>
          <span>COMMUNITY &amp; CAREGIVER INCLUSION • PRIVACY PRESERVED</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
          Trusted Circle
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', margin: 0, maxWidth: 660 }}>
          Grant specific, revocable visibility to family or trusted campus caregivers. Detailed observations and private AI conversations remain strictly private by default.
        </p>
      </div>

      {notificationSent && (
        <div style={{ marginBottom: 20, padding: '12px 20px', background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
          ✓ Verified wellness summary notification dispatched to {notificationSent}.
        </div>
      )}

      {/* Contacts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {contacts.map(c => (
          <div
            key={c.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 18,
              padding: '24px 28px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>{c.name}</h3>
                  <span style={{ background: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                    {c.relationship}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{c.contact}</div>
              </div>

              <button
                onClick={() => handleTriggerNotification(c)}
                style={{
                  background: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Send Test Notification
              </button>
            </div>

            {/* Granular Permission Toggles */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 12 }}>
                Sharing Permissions for this Contact:
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {/* Sleep Trend */}
                <div
                  onClick={() => handleToggle(c.id, 'shareSleepTrend')}
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: 10,
                    padding: '12px 14px',
                    cursor: 'pointer',
                    background: c.shareSleepTrend ? '#F0FDF4' : '#F8FAFC',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Sleep Trend</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>Weekly stability curve</div>
                  </div>
                  <span style={{ fontSize: 16 }}>{c.shareSleepTrend ? '✓' : '✕'}</span>
                </div>

                {/* Pattern Alert */}
                <div
                  onClick={() => handleToggle(c.id, 'sharePatternAlerts')}
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: 10,
                    padding: '12px 14px',
                    cursor: 'pointer',
                    background: c.sharePatternAlerts ? '#F0FDF4' : '#F8FAFC',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Pattern Alert</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>Divergence notifications</div>
                  </div>
                  <span style={{ fontSize: 16 }}>{c.sharePatternAlerts ? '✓' : '✕'}</span>
                </div>

                {/* Detailed Observations (Locked/Private) */}
                <div
                  onClick={() => handleToggle(c.id, 'shareDetailedObservations')}
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: 10,
                    padding: '12px 14px',
                    cursor: 'pointer',
                    background: c.shareDetailedObservations ? '#F0FDF4' : '#F8FAFC',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Raw Telemetry</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>Detailed readings (Private)</div>
                  </div>
                  <span style={{ fontSize: 16 }}>{c.shareDetailedObservations ? '✓' : '✕'}</span>
                </div>

                {/* AI Conversations (Always Private) */}
                <div
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: 10,
                    padding: '12px 14px',
                    background: '#F8FAFC',
                    opacity: 0.7,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>AI Conversations</div>
                    <div style={{ fontSize: 11, color: '#94A3B8' }}>Strictly private by law</div>
                  </div>
                  <span style={{ fontSize: 14, color: '#EF4444' }}>🔒 Off</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
