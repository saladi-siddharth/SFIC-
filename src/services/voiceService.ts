/**
 * HealthShield AI - Voice Interaction Service
 * Section 13: Voice Interaction ("ASK BY VOICE")
 * 
 * Uses browser Web Speech API (SpeechRecognition & SpeechSynthesis)
 * Gracefully falls back when speech recognition is unavailable.
 */

// Declare SpeechRecognition interface for TypeScript
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export class VoiceService {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    const win = typeof window !== 'undefined' ? (window as unknown as IWindow) : null;
    const SpeechRec = win?.SpeechRecognition || win?.webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      } catch (e) {
        console.warn('[VoiceService] SpeechRecognition constructor failed:', e);
      }
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public startListening(
    onResult: (transcript: string) => void,
    onError: (error: string) => void,
    onEnd: () => void,
    lang: 'en' | 'te' | 'hi' = 'en'
  ): boolean {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser. Please use keyboard input.');
      return false;
    }

    if (this.isListening) {
      this.stopListening();
    }

    try {
      this.recognition.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';
      
      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        if (transcript) {
          onResult(transcript);
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        onError(event.error || 'Speech capture failed');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
      return true;
    } catch (err: any) {
      this.isListening = false;
      onError(err.message || 'Unable to start speech recognition');
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignored
      }
      this.isListening = false;
    }
  }

  public speak(text: string, lang: 'en' | 'te' | 'hi' = 'en'): void {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('[VoiceService] Speech synthesis error:', e);
    }
  }

  public stopSpeaking(): void {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const voiceService = new VoiceService();
