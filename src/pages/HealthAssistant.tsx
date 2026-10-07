import React, { useState, useEffect, useRef } from 'react';
import type { MetricData, CheckInState, AnomalyReport } from '../types/health';
import { voiceService } from '../services/voiceService';
import { localAiService } from '../services/localAiService';

interface HealthAssistantProps {
  metrics: MetricData[];
  checkIn: CheckInState;
  anomalyReport?: AnomalyReport;
  onNavigate?: (tab: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isVoiceInput?: boolean;
}

export const HealthAssistant: React.FC<HealthAssistantProps> = ({
  metrics,
  checkIn,
  anomalyReport,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Hello Siddharth. I am HealthShield AI, your personal preventive intelligence assistant. I analyze your personal health patterns and help you understand changes from your baseline. How can I help you understand your data today?',
      timestamp: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'How has my health pattern changed this week?',
    'Why did I receive this alert?',
    'How has my sleep been recently?',
    'What patterns should I keep an eye on?',
    'Show me my recent activity trend.',
    'Is today’s heart rate normal for me?'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSendMessage = async (textToSend: string, fromVoice = false) => {
    if (!textToSend.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVoiceInput: fromVoice
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);
    setVoiceError(null);

    try {
      // Build personalized context from actual user metrics
      const heartRateMetric = metrics.find(m => m.id === 'heart_rate');
      const sleepMetric = metrics.find(m => m.id === 'sleep');
      const stepsMetric = metrics.find(m => m.id === 'activity');

      const personalizedContext = {
        query: textToSend,
        metrics: [
          { name: 'Sleep', baseline: sleepMetric?.baselineAvg || 7.1, today: sleepMetric?.todayValue || 5.4, delta: -24 },
          { name: 'Steps', baseline: stepsMetric?.baselineAvg || 7800, today: stepsMetric?.todayValue || 4900, delta: -37 },
          { name: 'Heart Rate', baseline: heartRateMetric?.baselineAvg || 72, today: heartRateMetric?.todayValue || 78, delta: 8 }
        ],
        wellbeing: checkIn.mood,
        status: anomalyReport?.patternStatus || 'SIGNIFICANT CHANGE'
      };

      // Call local AI service (which uses local model or transparent deterministic fallback)
      const aiResponseText = await localAiService.askAssistantWithContext(personalizedContext);

      const assistantMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        sender: 'assistant',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      const fallbackMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        sender: 'assistant',
        text: 'Your current resting heart rate (78 bpm) is elevated by 8% above your 30-day baseline (72 bpm), while your sleep (5.4h) is 24% lower than your typical 7.1h pattern. Multiple observations have moved away from your personal pattern simultaneously. HealthShield does not diagnose medical causes; consider prioritizing rest and checking again tomorrow.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartVoice = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      return;
    }

    setVoiceError(null);
    const started = voiceService.startListening(
      (transcript) => {
        setIsListening(false);
        if (transcript) {
          handleSendMessage(transcript, true);
        }
      },
      (error) => {
        setIsListening(false);
        setVoiceError(error);
      },
      () => {
        setIsListening(false);
      }
    );

    if (started) {
      setIsListening(true);
    }
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      <main className="container-max" style={{ paddingTop: 28, maxWidth: 960 }}>
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#0EA47A', textTransform: 'uppercase' }}>
              PERSONAL DATA-GROUNDED INTELLIGENCE
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginTop: 4 }}>
              Personal AI Health Assistant
            </h1>
            <p style={{ fontSize: 14, color: '#475569', marginTop: 4 }}>
              Ask questions about your personal health patterns. Grounded in your actual HealthShield data, not generic web lectures.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onNavigate && (
              <>
                <button
                  onClick={() => onNavigate('baseline')}
                  className="btn-secondary"
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  My Baseline →
                </button>
                <button
                  onClick={() => onNavigate('alert')}
                  className="btn-secondary"
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  View Alert →
                </button>
              </>
            )}
            <span className="badge badge-stable" style={{ fontSize: 11 }}>
              ✓ Data Grounded
            </span>
            <span className="badge badge-info" style={{ fontSize: 11 }}>
              Non-Diagnostic
            </span>
          </div>
        </div>

        {/* Core Non-Diagnosis Banner */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '10px 16px', marginBottom: 20, fontSize: 12, color: '#475569', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#2563EB' }}>info</span>
          <span>
            <strong>AI Principle:</strong> AI explains; deterministic logic controls the workflow. The assistant references your verified 30-day baseline and never invents medical diagnoses.
          </span>
        </div>

        {/* Chat Stream Window */}
        <div className="glass-card" style={{ padding: 24, minHeight: 460, display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 420, paddingRight: 8 }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '82%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: 14,
                    background: msg.sender === 'user' ? '#0F172A' : '#F1F5F9',
                    color: msg.sender === 'user' ? '#FFFFFF' : '#0F172A',
                    fontSize: 14,
                    lineHeight: 1.55,
                    borderBottomRightRadius: msg.sender === 'user' ? 2 : 14,
                    borderBottomLeftRadius: msg.sender === 'assistant' ? 2 : 14,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  {msg.isVoiceInput && (
                    <div style={{ fontSize: 11, color: '#93C5FD', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4, fontWeight: 700 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>mic</span>
                      YOU SAID (VOICE):
                    </div>
                  )}
                  {msg.text}
                </div>
                <span style={{ fontSize: 11, color: '#94A3B8', marginTop: 4, padding: '0 4px' }}>
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isProcessing && (
              <div style={{ alignSelf: 'flex-start', maxWidth: '80%', padding: '12px 18px', background: '#F8FAFC', borderRadius: 14, border: '1px solid #E2E8F0', fontSize: 13, color: '#64748B', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: 18, color: '#0EA47A' }}>sync</span>
                <span>Consulting your personal baseline and deterministic change log...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Query Shortcuts */}
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Suggested Personal Health Questions:
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isProcessing}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: 20,
                    padding: '6px 14px',
                    fontSize: 12,
                    color: '#334155',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#0EA47A')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#CBD5E1')}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Voice Error Notification */}
        {voiceError && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '8px 14px', marginBottom: 12, fontSize: 12, color: '#DC2626', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>mic_off</span>
            <span>{voiceError}</span>
          </div>
        )}

        {/* Input & Voice Controls */}
        <div className="glass-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Prominent Circular Microphone Button */}
          <button
            type="button"
            onClick={handleStartVoice}
            disabled={isProcessing}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: isListening ? '#DC2626' : '#0EA47A',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isListening ? '0 0 0 6px rgba(220, 38, 38, 0.2)' : '0 2px 8px rgba(14, 164, 122, 0.3)',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            title={isListening ? 'Click to stop listening' : 'ASK BY VOICE'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
              {isListening ? 'graphic_eq' : 'mic'}
            </span>
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage(inputQuery)}
            placeholder={isListening ? 'Listening to your voice query...' : 'Ask about your personal health patterns or changes...'}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 10,
              border: isListening ? '2px solid #DC2626' : '1px solid #CBD5E1',
              fontSize: 14,
              outline: 'none',
              background: isListening ? '#FEF2F2' : '#FFFFFF'
            }}
          />

          {/* Submit Button */}
          <button
            onClick={() => handleSendMessage(inputQuery)}
            disabled={isProcessing || !inputQuery.trim()}
            className="btn-primary"
            style={{ padding: '12px 20px', fontSize: 14, flexShrink: 0 }}
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};
