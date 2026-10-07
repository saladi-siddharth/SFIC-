import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import te from '../locales/te.json';
import hi from '../locales/hi.json';

type Language = 'en' | 'te' | 'hi';
type TextSize = 'normal' | 'large' | 'xl';
type Contrast = 'normal' | 'high';
type Motion = 'normal' | 'reduced';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  contrast: Contrast;
  setContrast: (contrast: Contrast) => void;
  motion: Motion;
  setMotion: (motion: Motion) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;
  speak: (text: string) => void;
}

const translations: Record<Language, Record<string, string>> = {
  en: en as Record<string, string>,
  te: te as Record<string, string>,
  hi: hi as Record<string, string>
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [textSize, setTextSize] = useState<TextSize>('normal');
  const [contrast, setContrast] = useState<Contrast>('normal');
  const [motion, setMotion] = useState<Motion>('normal');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const speak = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (language === 'te') {
      utterance.lang = 'te-IN';
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-US';
    }
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Apply global root font scaling and contrast classes
    const root = document.documentElement;
    if (textSize === 'large') {
      root.style.fontSize = '18px';
    } else if (textSize === 'xl') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }

    if (contrast === 'high') {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }

    if (motion === 'reduced') {
      root.classList.add('reduced-motion-mode');
    } else {
      root.classList.remove('reduced-motion-mode');
    }
  }, [textSize, contrast, motion]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        textSize,
        setTextSize,
        contrast,
        setContrast,
        motion,
        setMotion,
        voiceEnabled,
        setVoiceEnabled,
        speak
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
