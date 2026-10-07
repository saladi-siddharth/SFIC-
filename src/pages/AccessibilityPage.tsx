import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { voiceService } from '../services/voiceService';

interface AccessibilityPageProps {
  onToggleSimpleMode?: () => void;
  isSimpleMode?: boolean;
  onNavigate?: (tab: string) => void;
}

export const AccessibilityPage: React.FC<AccessibilityPageProps> = ({
  onToggleSimpleMode,
  isSimpleMode = false,
  onNavigate,
}) => {
  const { language, setLanguage } = useLanguage();

  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [testSpeechStatus, setTestSpeechStatus] = useState<string | null>(null);

  const handleTestSpeech = (text: string, lang: 'en' | 'te' | 'hi') => {
    setTestSpeechStatus(`Speaking in ${lang === 'te' ? 'Telugu' : lang === 'hi' ? 'Hindi' : 'English'}...`);
    voiceService.speak(text, lang);
    setTimeout(() => setTestSpeechStatus(null), 4000);
  };

  const sampleTranslations = [
    {
      lang: 'te',
      languageName: 'తెలుగు (Telugu)',
      phrase: 'ఈరోజు నా ఆరోగ్య నమూనాలో ఏమి మారింది?',
      translation: 'What changed in my health pattern today?',
      sampleAlert: 'ఈరోజు మీ వ్యక్తిగత నమూనా కంటే నిద్ర 24% తగ్గింది. విశ్రాంతి తీసుకోండి.'
    },
    {
      lang: 'hi',
      languageName: 'हिंदी (Hindi)',
      phrase: 'आज मेरे स्वास्थ्य पैटर्न में क्या बदला?',
      translation: 'What changed in my health pattern today?',
      sampleAlert: 'आज आपकी नींद सामान्य पैटर्न से 24% कम है। पर्याप्त आराम करें।'
    },
    {
      lang: 'en',
      languageName: 'English',
      phrase: 'How has my health pattern changed today?',
      translation: 'Original English query',
      sampleAlert: 'Your sleep was 5.4 hours compared with your recent personal baseline of 7.1 hours.'
    }
  ];

  return (
    <div style={{ paddingBottom: 60 }}>
      <main className="container-max" style={{ paddingTop: 28, maxWidth: 1040 }}>
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#0EA47A', textTransform: 'uppercase' }}>
              SFIC THEME 3 • ASSISTIVE TECH &amp; INCLUSION
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginTop: 4 }}>
              Accessibility &amp; Inclusive Access
            </h1>
            <p style={{ fontSize: 14, color: '#475569', marginTop: 4 }}>
              Designed for diverse literacy levels, visual preferences, low connectivity, and Indian regional languages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge badge-stable" style={{ fontSize: 12 }}>
              WCAG 2.1 AA Compliant
            </span>
          </div>
        </div>

        {/* 6 Key Inclusion Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: 32 }}>
          
          {/* 1. Simple Mode */}
          <div className="glass-card" style={{ padding: 22, borderTop: '4px solid #2563EB' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ color: '#2563EB', fontSize: 22 }}>touch_app</span>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>1-Click Simple Mode</h3>
              </div>
              <span className={`badge ${isSimpleMode ? 'badge-alert' : 'badge-stable'}`}>
                {isSimpleMode ? 'ACTIVE' : 'READY'}
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, marginBottom: 16 }}>
              Reduces visual clutter down to three single-tap questions for seniors or users with low digital literacy.
            </p>
            <button
              onClick={onToggleSimpleMode}
              className={isSimpleMode ? 'btn-primary' : 'btn-secondary'}
              style={{ width: '100%', fontSize: 12, padding: '8px 12px' }}
            >
              {isSimpleMode ? '✓ Exit Simple Mode' : 'Switch to Simple Mode'}
            </button>
          </div>

          {/* 2. Visual Adaptation */}
          <div className="glass-card" style={{ padding: 22, borderTop: '4px solid #0EA47A' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 22 }}>format_size</span>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>Visual Adaptations</h3>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#334155' }}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={largeText}
                  onChange={e => {
                    setLargeText(e.target.checked);
                    document.documentElement.style.fontSize = e.target.checked ? '18px' : '16px';
                  }}
                />
                <span>Large Typography (+20%)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={e => {
                    setHighContrast(e.target.checked);
                    document.body.classList.toggle('high-contrast-mode', e.target.checked);
                  }}
                />
                <span>High Contrast Mode</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={e => setReducedMotion(e.target.checked)}
                />
                <span>Reduced Motion</span>
              </label>
            </div>
          </div>

          {/* 3. Voice Interaction */}
          <div className="glass-card" style={{ padding: 22, borderTop: '4px solid #7C3AED' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ color: '#7C3AED', fontSize: 22 }}>mic</span>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>Speech &amp; Audio</h3>
              </div>
              <span className="badge badge-stable">Web Speech API</span>
            </div>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, marginBottom: 16 }}>
              Hands-free audio inquiry allowing users to ask questions by voice and receive spoken summaries.
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('assistant')}
                className="btn-secondary"
                style={{ width: '100%', fontSize: 12, padding: '8px 12px' }}
              >
                Launch Voice Assistant →
              </button>
            )}
          </div>
        </div>

        {/* Indian Languages Section */}
        <div className="glass-card" style={{ padding: 28, marginBottom: 32 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                REGIONAL INCLUSION
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>
                Multilingual Health Intelligence (English, తెలుగు, हिंदी)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {(['en', 'te', 'hi'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={language === lang ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '6px 14px', fontSize: 12 }}
                >
                  {lang === 'en' ? 'English' : lang === 'te' ? 'తెలుగు' : 'हिंदी'}
                </button>
              ))}
            </div>
          </div>

          {testSpeechStatus && (
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '8px 14px', borderRadius: 8, fontSize: 12, color: '#065F46', marginBottom: 16 }}>
              {testSpeechStatus}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleTranslations.map(item => (
              <div
                key={item.lang}
                style={{
                  background: language === item.lang ? '#F0FDF4' : '#F8FAFC',
                  border: language === item.lang ? '2px solid #10B981' : '1px solid #E2E8F0',
                  borderRadius: 12,
                  padding: 18
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 14, color: '#0F172A' }}>{item.languageName}</strong>
                  {language === item.lang && (
                    <span className="badge badge-stable" style={{ fontSize: 10 }}>ACTIVE</span>
                  )}
                </div>

                <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>
                  &ldquo;{item.phrase}&rdquo;
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginBottom: 12 }}>
                  {item.translation}
                </div>

                <div style={{ background: '#FFFFFF', padding: 10, borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 12, color: '#334155', lineHeight: 1.4, marginBottom: 12 }}>
                  <strong>Sample Alert:</strong><br />
                  {item.sampleAlert}
                </div>

                <button
                  onClick={() => handleTestSpeech(item.sampleAlert, item.lang as any)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontSize: 11,
                    color: '#334155',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#0EA47A' }}>volume_up</span>
                  Listen (Voice Readout)
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Low-Connectivity & Offline Preservation */}
        <div className="glass-card" style={{ padding: 28, borderLeft: '4px solid #0EA47A' }}>
          <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#0EA47A' }}>
              wifi_off
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
              Low-Connectivity &amp; Offline Assurance
            </h3>
          </div>
          <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
            HealthShield is built specifically with rural, campus, and intermittent network environments in mind.
            All personal check-ins, baseline corridor updates, and change detections execute in local device memory via
            IndexedDB. Telemetry never requires an active 5G or cloud connection to alert users to personal baseline deviations.
          </p>
        </div>
      </main>
    </div>
  );
};
