import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface AccessibilityToolbarProps {
  onToggleSimpleMode?: () => void;
  isSimpleMode?: boolean;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  onToggleSimpleMode,
  isSimpleMode
}) => {
  const {
    language,
    setLanguage,
    textSize,
    setTextSize,
    contrast,
    setContrast,
    motion,
    setMotion,
    voiceEnabled,
    setVoiceEnabled,
    speak
  } = useLanguage();

  return (
    <div
      style={{
        background: '#0F172A',
        color: '#F8FAFC',
        padding: '6px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        fontSize: 12,
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      {/* Left: Theme 3 Inclusion Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ background: '#3B82F6', color: '#FFF', padding: '2px 8px', borderRadius: 12, fontWeight: 700, fontSize: 10 }}>
          SFIC THEME 3
        </span>
        <span style={{ fontWeight: 600, color: '#CBD5E1' }}>
          Assistive Inclusion & Accessible Health
        </span>
      </div>

      {/* Controls Container */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        {/* Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#94A3B8' }}>Language:</span>
          <button
            onClick={() => { setLanguage('en'); speak('English language selected'); }}
            style={{
              background: language === 'en' ? '#2563EB' : 'transparent',
              color: '#FFF',
              border: '1px solid #475569',
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: 11,
              fontWeight: language === 'en' ? 700 : 400,
              cursor: 'pointer'
            }}
          >
            English
          </button>
          <button
            onClick={() => { setLanguage('te'); speak('తెలుగు భాష ఎంచుకోబడింది'); }}
            style={{
              background: language === 'te' ? '#2563EB' : 'transparent',
              color: '#FFF',
              border: '1px solid #475569',
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: 11,
              fontWeight: language === 'te' ? 700 : 400,
              cursor: 'pointer'
            }}
          >
            తెలుగు
          </button>
          <button
            onClick={() => { setLanguage('hi'); speak('हिंदी भाषा चुनी गई'); }}
            style={{
              background: language === 'hi' ? '#2563EB' : 'transparent',
              color: '#FFF',
              border: '1px solid #475569',
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: 11,
              fontWeight: language === 'hi' ? 700 : 400,
              cursor: 'pointer'
            }}
          >
            हिंदी
          </button>
        </div>

        {/* Text Size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#94A3B8' }}>Text:</span>
          {(['normal', 'large', 'xl'] as const).map(s => (
            <button
              key={s}
              onClick={() => setTextSize(s)}
              style={{
                background: textSize === s ? '#475569' : 'transparent',
                color: '#FFF',
                border: '1px solid #334155',
                borderRadius: 4,
                padding: '2px 6px',
                fontSize: 11,
                fontWeight: textSize === s ? 700 : 400,
                cursor: 'pointer'
              }}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Contrast */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#94A3B8' }}>Contrast:</span>
          <button
            onClick={() => setContrast(contrast === 'normal' ? 'high' : 'normal')}
            style={{
              background: contrast === 'high' ? '#EAB308' : 'transparent',
              color: contrast === 'high' ? '#000' : '#FFF',
              border: '1px solid #475569',
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {contrast === 'high' ? 'High Contrast (ON)' : 'Standard'}
          </button>
        </div>

        {/* Motion */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={() => setMotion(motion === 'normal' ? 'reduced' : 'normal')}
            style={{
              background: motion === 'reduced' ? '#10B981' : 'transparent',
              color: '#FFF',
              border: '1px solid #475569',
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: 11,
              cursor: 'pointer'
            }}
          >
            {motion === 'reduced' ? 'Reduced Motion' : 'Motion: Normal'}
          </button>
        </div>

        {/* Voice Assistant Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={() => {
              const next = !voiceEnabled;
              setVoiceEnabled(next);
              if (next) speak('Voice assistance activated. Readouts enabled.');
            }}
            style={{
              background: voiceEnabled ? '#8B5CF6' : 'transparent',
              color: '#FFF',
              border: '1px solid #475569',
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <span>{voiceEnabled ? '🔊 Voice (ON)' : '🔇 Voice'}</span>
          </button>
        </div>

        {/* Simple Mode Toggle */}
        {onToggleSimpleMode && (
          <button
            onClick={onToggleSimpleMode}
            style={{
              background: isSimpleMode ? '#F59E0B' : '#059669',
              color: '#FFF',
              border: 'none',
              borderRadius: 6,
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <span>{isSimpleMode ? '↩️ Standard View' : '✨ Simple Mode'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
