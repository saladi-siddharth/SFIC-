import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { offlineStorage } from '../engine/offlineStorage';

interface SimpleModeProps {
  onBackToStandard: () => void;
  onOpenEmergency: () => void;
}

export const SimpleMode: React.FC<SimpleModeProps> = ({ onBackToStandard, onOpenEmergency }) => {
  const { t, speak } = useLanguage();
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSelect = (feeling: 'GOOD' | 'OKAY' | 'NOT_WELL', label: string) => {
    setSelectedFeeling(feeling);
    setIsSaved(true);
    speak(`${label}. Record saved safely.`);

    offlineStorage.enqueue('CHECKIN', {
      wellbeingScore: feeling,
      mode: 'SIMPLE_MODE',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div
      style={{
        minHeight: '88vh',
        background: '#FAF5FF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        fontFamily: 'system-ui, sans-serif'
      }}
    >
      {/* Top Banner */}
      <div style={{ maxWidth: 640, width: '100%', marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onBackToStandard}
          style={{
            background: '#FFFFFF',
            color: '#6B21A8',
            border: '2px solid #E9D5FF',
            borderRadius: 30,
            padding: '10px 20px',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <span>←</span>
          <span>{t('app_title')} Standard</span>
        </button>

        <button
          onClick={onOpenEmergency}
          style={{
            background: '#DC2626',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 30,
            padding: '10px 24px',
            fontSize: 16,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
          }}
        >
          🚨 Urgent Help
        </button>
      </div>

      {/* Main Question Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 32,
          padding: '48px 36px',
          maxWidth: 640,
          width: '100%',
          boxShadow: '0 20px 40px rgba(107, 33, 168, 0.08)',
          border: '2px solid #F3E8FF',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'inline-block', background: '#F3E8FF', color: '#7E22CE', padding: '6px 16px', borderRadius: 20, fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
          ACCESSIBILITY INCLUSION • THEME 3
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#1E1B4B', margin: '0 0 12px 0' }}>
          {t('simple_mode_question')}
        </h1>

        <p style={{ fontSize: 18, color: '#6B7280', margin: '0 0 36px 0' }}>
          {t('simple_tap_instruction')}
        </p>

        {/* 3 Large Touch Target Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* GOOD */}
          <button
            onClick={() => handleSelect('GOOD', t('simple_good'))}
            style={{
              background: selectedFeeling === 'GOOD' ? '#16A34A' : '#F0FDF4',
              color: selectedFeeling === 'GOOD' ? '#FFFFFF' : '#166534',
              border: '3px solid #86EFAC',
              borderRadius: 24,
              padding: '24px 32px',
              fontSize: 26,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              transition: 'all 0.15s ease',
              boxShadow: selectedFeeling === 'GOOD' ? '0 10px 20px rgba(22, 163, 74, 0.3)' : 'none'
            }}
          >
            <span style={{ fontSize: 44 }}>😊</span>
            <span>{t('simple_good')}</span>
          </button>

          {/* OKAY */}
          <button
            onClick={() => handleSelect('OKAY', t('simple_okay'))}
            style={{
              background: selectedFeeling === 'OKAY' ? '#D97706' : '#FFFBEB',
              color: selectedFeeling === 'OKAY' ? '#FFFFFF' : '#92400E',
              border: '3px solid #FDE68A',
              borderRadius: 24,
              padding: '24px 32px',
              fontSize: 26,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              transition: 'all 0.15s ease',
              boxShadow: selectedFeeling === 'OKAY' ? '0 10px 20px rgba(217, 119, 6, 0.3)' : 'none'
            }}
          >
            <span style={{ fontSize: 44 }}>😐</span>
            <span>{t('simple_okay')}</span>
          </button>

          {/* NOT WELL */}
          <button
            onClick={() => handleSelect('NOT_WELL', t('simple_not_well'))}
            style={{
              background: selectedFeeling === 'NOT_WELL' ? '#DC2626' : '#FEF2F2',
              color: selectedFeeling === 'NOT_WELL' ? '#FFFFFF' : '#991B1B',
              border: '3px solid #FECACA',
              borderRadius: 24,
              padding: '24px 32px',
              fontSize: 26,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              transition: 'all 0.15s ease',
              boxShadow: selectedFeeling === 'NOT_WELL' ? '0 10px 20px rgba(220, 38, 38, 0.3)' : 'none'
            }}
          >
            <span style={{ fontSize: 44 }}>😟</span>
            <span>{t('simple_not_well')}</span>
          </button>
        </div>

        {/* Confirmation status */}
        {isSaved && (
          <div
            style={{
              marginTop: 28,
              padding: '16px 24px',
              background: '#ECFDF5',
              borderRadius: 16,
              border: '1px solid #A7F3D0',
              color: '#065F46',
              fontSize: 18,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12
            }}
          >
            <span>✓</span>
            <span>Check-in recorded safely for today!</span>
          </div>
        )}
      </div>

      {/* Assistive voice button */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <button
          onClick={() => speak(t('simple_mode_question'))}
          style={{
            background: 'transparent',
            color: '#6B21A8',
            border: 'none',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            margin: '0 auto'
          }}
        >
          <span>🔊</span>
          <span>Tap to hear the question aloud</span>
        </button>
      </div>
    </div>
  );
};
