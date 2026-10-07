import React, { useState } from 'react';
import type { UserProfile } from '../types/health';
import { offlineStorage } from '../engine/offlineStorage';

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_sfic_001',
  name: 'Siddharth Saladi',
  age: 20,
  gender: 'male',
  heightCm: 175,
  weightKg: 68,
  activityLevel: 'moderate',
  typicalSleepHours: 7.1,
  typicalStepGoal: 7800,
  conditions: ['No chronic conditions logged'],
  allergies: ['Seasonal Pollen (Mild)'],
  medications: ['None currently active'],
  emergencyContact: {
    name: 'S. Ramanathan',
    relationship: 'Father / Guardian',
    phone: '+91 98400 12345'
  },
  preferredLanguage: 'en',
  accessibilityPreferences: {
    simpleMode: false,
    largeText: false,
    highContrast: false,
    reducedMotion: false,
    voiceAssistance: true,
    screenReaderOptimized: false
  },
  trustedContact: {
    name: 'Mother',
    relationship: 'Immediate Family',
    contactMethod: 'sms',
    contactValue: '+91 94440 56789',
    shareCheckInStatus: true,
    shareAlertSummary: true
  },
  privacyPreferences: {
    storeObservationsLocally: true,
    storeMeasurementsLocally: true,
    localInferenceOnly: true,
    sharingEnabled: false,
    allowTrustedContactAccess: true,
    retentionDays: 90
  },
  updatedAt: new Date().toISOString()
};

interface HealthProfileProps {
  onNavigate?: (tab: string) => void;
}

export const HealthProfile: React.FC<HealthProfileProps> = ({ onNavigate }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('healthshield_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [activeSection, setActiveSection] = useState<
    'about' | 'routine' | 'context' | 'safety' | 'accessibility' | 'privacy'
  >('about');

  const [isSaved, setIsSaved] = useState(false);

  // Calculate completeness percentage
  const completenessItems = [
    { label: 'Basic information', completed: Boolean(profile.name && profile.age) },
    { label: 'Sleep pattern', completed: Boolean(profile.typicalSleepHours > 0) },
    { label: 'Activity pattern', completed: Boolean(profile.typicalStepGoal > 0) },
    { label: 'Well-being pattern', completed: true },
    { label: 'Optional measurements', completed: Boolean(profile.heightCm && profile.weightKg) },
    { label: 'Trusted contact', completed: Boolean(profile.trustedContact?.name) },
  ];

  const completedCount = completenessItems.filter(i => i.completed).length;
  const completenessPercent = Math.round((completedCount / completenessItems.length) * 100);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...profile, updatedAt: new Date().toISOString() };
    setProfile(updated);
    try {
      localStorage.setItem('healthshield_user_profile', JSON.stringify(updated));
    } catch (e) {
      console.warn('Local storage save failed:', e);
    }
    offlineStorage.enqueue('PROFILE', updated as unknown as Record<string, unknown>);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      <main className="container-max" style={{ paddingTop: 28, maxWidth: 1040 }}>
        {/* Header Title */}
        <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#0EA47A', textTransform: 'uppercase' }}>
              FLAGSHIP FEATURE 01 • PERSONAL CONTEXT
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginTop: 4 }}>
              My Health Profile
            </h1>
            <p style={{ fontSize: 14, color: '#475569', marginTop: 4 }}>
              Personal health identity providing context to calibrate your individual normal baseline.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isSaved && (
              <span className="badge badge-stable" style={{ background: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' }}>
                ✓ Profile Saved Locally
              </span>
            )}
            {onNavigate && (
              <button 
                onClick={() => onNavigate('baseline')} 
                className="btn-primary" 
                style={{ fontSize: 13, padding: '8px 16px' }}
              >
                View My Baseline →
              </button>
            )}
          </div>
        </div>

        {/* Non-Diagnostic Core Notice Banner */}
        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: '16px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="material-symbols-outlined" style={{ color: '#16A34A', fontSize: 24 }}>
            shield
          </span>
          <div style={{ fontSize: 13, color: '#166534', lineHeight: 1.5 }}>
            <strong>Important Principle:</strong> HealthShield uses this information to understand your personal context. It does not diagnose medical conditions or prescribe treatments.
          </div>
        </div>

        {/* Visual Profile Completeness Card */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 28, borderTop: '4px solid #0EA47A' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                YOUR PERSONAL PROFILE
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>
                {completenessPercent}% context available
              </h2>
            </div>
            <span className="badge badge-stable" style={{ fontSize: 12 }}>
              Active Baseline Profile
            </span>
          </div>

          {/* Progress bar */}
          <div className="progress-track" style={{ height: 8, marginBottom: 16 }}>
            <div className="progress-fill" style={{ width: `${completenessPercent}%`, background: '#0EA47A' }} />
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2" style={{ fontSize: 13, color: '#334155' }}>
            {completenessItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span style={{ color: item.completed ? '#10B981' : '#94A3B8', fontWeight: 800 }}>
                  {item.completed ? '✓' : '○'}
                </span>
                <span style={{ color: item.completed ? '#0F172A' : '#64748B' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Tabs Navigation */}
        <div className="flex items-center gap-2" style={{ overflowX: 'auto', paddingBottom: 8, marginBottom: 24, borderBottom: '1px solid #E2E8F0' }}>
          {[
            { id: 'about', label: 'ABOUT ME', icon: 'person' },
            { id: 'routine', label: 'MY ROUTINE', icon: 'schedule' },
            { id: 'context', label: 'HEALTH CONTEXT', icon: 'medical_information' },
            { id: 'safety', label: 'SAFETY', icon: 'emergency' },
            { id: 'accessibility', label: 'ACCESSIBILITY', icon: 'accessibility_new' },
            { id: 'privacy', label: 'PRIVACY', icon: 'lock' },
          ].map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={activeSection === sec.id ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 16px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{sec.icon}</span>
              {sec.label}
            </button>
          ))}
        </div>

        {/* Section Forms */}
        <form onSubmit={handleSave} className="glass-card" style={{ padding: 28 }}>
          
          {/* SECTION 1: ABOUT ME */}
          {activeSection === 'about' && (
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
                1. About Me (Personal Identity)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    className="input-field"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={e => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                    className="input-field"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Gender (Optional)
                  </label>
                  <select
                    value={profile.gender || 'prefer_not_to_say'}
                    onChange={e => setProfile({ ...profile, gender: e.target.value as any })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, background: '#FFF' }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non_binary">Non-binary</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Height &amp; Weight (Optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Height (cm)"
                      value={profile.heightCm || ''}
                      onChange={e => setProfile({ ...profile, heightCm: parseInt(e.target.value) || undefined })}
                      style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}
                    />
                    <input
                      type="number"
                      placeholder="Weight (kg)"
                      value={profile.weightKg || ''}
                      onChange={e => setProfile({ ...profile, weightKg: parseInt(e.target.value) || undefined })}
                      style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: MY ROUTINE */}
          {activeSection === 'routine' && (
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
                2. My Routine (Personal Behavioral Pattern)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Typical Sleep Duration (Hours per night)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={profile.typicalSleepHours}
                    onChange={e => setProfile({ ...profile, typicalSleepHours: parseFloat(e.target.value) || 7.0 })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}
                  />
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                    Standard demonstration baseline: 7.1 hours
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Typical Daily Step Goal / Activity Level
                  </label>
                  <input
                    type="number"
                    value={profile.typicalStepGoal}
                    onChange={e => setProfile({ ...profile, typicalStepGoal: parseInt(e.target.value) || 7800 })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}
                  />
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                    Standard demonstration baseline: 7,800 steps
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Routine Activity Category
                  </label>
                  <select
                    value={profile.activityLevel}
                    onChange={e => setProfile({ ...profile, activityLevel: e.target.value as any })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, background: '#FFF' }}
                  >
                    <option value="sedentary">Sedentary (Desk work)</option>
                    <option value="light">Light activity (Daily walks)</option>
                    <option value="moderate">Moderate activity (College/Active routine)</option>
                    <option value="active">Active (Regular sports/training)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: HEALTH CONTEXT */}
          {activeSection === 'context' && (
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
                3. Health Context (User-Entered, Non-Diagnostic)
              </h3>
              <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
                Optional background context. HealthShield does not cross-check these against clinical drug databases or clinical rules.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Known Conditions (Optional)
                  </label>
                  <input
                    type="text"
                    value={profile.conditions.join(', ')}
                    onChange={e => setProfile({ ...profile, conditions: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    placeholder="e.g. Mild asthma"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Allergies (Optional)
                  </label>
                  <input
                    type="text"
                    value={profile.allergies.join(', ')}
                    onChange={e => setProfile({ ...profile, allergies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    placeholder="e.g. Pollen, Penicillin"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Current Medications (Optional)
                  </label>
                  <input
                    type="text"
                    value={profile.medications.join(', ')}
                    onChange={e => setProfile({ ...profile, medications: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    placeholder="e.g. Multivitamins"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: SAFETY */}
          {activeSection === 'safety' && (
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
                4. Safety &amp; Emergency Information
              </h3>
              <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
                Emergency contact information is stored on this device. If extreme physiological readings trigger rule HS-SAFE-001, quick one-tap contact shortcuts are presented.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    value={profile.emergencyContact.name}
                    onChange={e => setProfile({ ...profile, emergencyContact: { ...profile.emergencyContact, name: e.target.value } })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={profile.emergencyContact.relationship}
                    onChange={e => setProfile({ ...profile, emergencyContact: { ...profile.emergencyContact, relationship: e.target.value } })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Emergency Phone Number
                  </label>
                  <input
                    type="text"
                    value={profile.emergencyContact.phone}
                    onChange={e => setProfile({ ...profile, emergencyContact: { ...profile.emergencyContact, phone: e.target.value } })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: ACCESSIBILITY */}
          {activeSection === 'accessibility' && (
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
                5. Accessibility &amp; Language Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Preferred Language
                  </label>
                  <select
                    value={profile.preferredLanguage}
                    onChange={e => setProfile({ ...profile, preferredLanguage: e.target.value as any })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, background: '#FFF' }}
                  >
                    <option value="en">English (Default)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="hi">हिंदी (Hindi)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.accessibilityPreferences.largeText}
                      onChange={e => setProfile({
                        ...profile,
                        accessibilityPreferences: { ...profile.accessibilityPreferences, largeText: e.target.checked }
                      })}
                      style={{ width: 18, height: 18 }}
                    />
                    <span style={{ fontSize: 13, color: '#1E293B' }}>Large Typography (120% font scaling)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.accessibilityPreferences.highContrast}
                      onChange={e => setProfile({
                        ...profile,
                        accessibilityPreferences: { ...profile.accessibilityPreferences, highContrast: e.target.checked }
                      })}
                      style={{ width: 18, height: 18 }}
                    />
                    <span style={{ fontSize: 13, color: '#1E293B' }}>High Contrast Mode (WCAG AAA)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.accessibilityPreferences.reducedMotion}
                      onChange={e => setProfile({
                        ...profile,
                        accessibilityPreferences: { ...profile.accessibilityPreferences, reducedMotion: e.target.checked }
                      })}
                      style={{ width: 18, height: 18 }}
                    />
                    <span style={{ fontSize: 13, color: '#1E293B' }}>Reduced Motion (Disable ambient transitions)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: PRIVACY */}
          {activeSection === 'privacy' && (
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
                6. Privacy &amp; Trusted Circle
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>
                    Trusted Contact: {profile.trustedContact.name} ({profile.trustedContact.relationship})
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#334155' }}>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={profile.trustedContact.shareCheckInStatus}
                        onChange={e => setProfile({
                          ...profile,
                          trustedContact: { ...profile.trustedContact, shareCheckInStatus: e.target.checked }
                        })}
                      />
                      <span>Can receive daily check-in confirmation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={profile.trustedContact.shareAlertSummary}
                        onChange={e => setProfile({
                          ...profile,
                          trustedContact: { ...profile.trustedContact, shareAlertSummary: e.target.checked }
                        })}
                      />
                      <span>Can receive user-approved alert summary</span>
                    </label>
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>
                    Device Data Retention
                  </h4>
                  <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                    All observations and baseline corridors remain encrypted in your local IndexedDB storage.
                    Inference executes on-device without continuous external API transmission.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Submit Action */}
          <div className="flex items-center justify-end gap-3" style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid #E2E8F0' }}>
            <button type="submit" className="btn-primary" style={{ padding: '10px 24px', fontSize: 14 }}>
              Save Profile Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
