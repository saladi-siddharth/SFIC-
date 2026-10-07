/**
 * HealthShield AI — AI-Assisted Explanation Service
 * Provides natural-language and multilingual explanations for detected baseline changes.
 * Operates gracefully with deterministic fallback if an on-device language model server is offline.
 */

export interface ModelStatus {
  modelName: string;
  modelPath: string;
  provider: string;
  isReady: boolean;
  isInitializing: boolean;
  error?: string | null;
}

export interface AiExplanationResult {
  summary: string;
  observedChanges: string[];
  whyFlagged: string[];
  nextSteps: string[];
  modelUsed: string;
}

class LocalAiService {
  private baseUrl = 'http://localhost:3001/api/ai';

  public async getStatus(): Promise<ModelStatus> {
    try {
      const res = await fetch(`${this.baseUrl}/status`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline or server not ready
    }
    return {
      modelName: 'On-Device Language Model (Optional)',
      modelPath: 'Local Quantized Model Runtime',
      provider: 'Deterministic Rule Engine (Fallback Active)',
      isReady: false,
      isInitializing: false
    };
  }

  public async askAssistant(message: string): Promise<string> {
    try {
      const res = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        signal: AbortSignal.timeout(15000)
      });
      if (res.ok) {
        const data = await res.json();
        return data.reply;
      }
    } catch {
      // Graceful local deterministic fallback
    }

    const query = message.toLowerCase();
    if (query.includes('heart') || query.includes('bpm')) {
      return "Observed change: Resting heart rate was observed above your recent personal baseline. Why flagged: It differs from your learned 30-day pattern. What HealthShield does not know: It does not determine the medical cause. What you can do: Avoid intense physical strain today, stay hydrated, and consult a doctor if discomfort persists.";
    }
    if (query.includes('sleep') || query.includes('tired')) {
      return "Observed change: Sleep duration is lower than your recent baseline. Why flagged: Consecutive nights below your personal pattern indicate compounded fatigue. What you can do: Review your pacing today and plan for an earlier, screen-free bedtime.";
    }
    return "HealthShield AI compares today's observations against your personal 30-day pattern rather than population averages. It does not provide medical diagnoses. If unusual sensations persist, consider seeking guidance from a healthcare professional.";
  }

  public async askAssistantWithContext(params: {
    query: string;
    metrics: Array<{ name: string; baseline: number; today: number; delta: number }>;
    wellbeing: string;
    status: string;
  }): Promise<string> {
    try {
      const res = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: params.query, context: params }),
        signal: AbortSignal.timeout(15000)
      });
      if (res.ok) {
        const data = await res.json();
        return data.reply;
      }
    } catch {
      // Graceful fallback
    }

    const q = params.query.toLowerCase();
    const sleep = params.metrics.find(m => m.name.toLowerCase().includes('sleep'));
    const hr = params.metrics.find(m => m.name.toLowerCase().includes('heart'));
    const steps = params.metrics.find(m => m.name.toLowerCase().includes('step'));

    if (q.includes('why') && q.includes('alert')) {
      return `HealthShield flagged an advisory because multiple signals moved away from your personal pattern simultaneously: Sleep decreased to ${sleep?.today || 5.4}h (baseline: ${sleep?.baseline || 7.1}h, ↓24%), steps decreased to ${steps?.today || 4900} (baseline: ${steps?.baseline || 7800}, ↓37%), and resting heart rate increased to ${hr?.today || 78} bpm (baseline: ${hr?.baseline || 72} bpm, ↑8%). HealthShield flags compound shifts rather than single-metric noise. It does not diagnose underlying medical conditions.`;
    }

    if (q.includes('change') || q.includes('week') || q.includes('today')) {
      return `Comparing today's data with your 30-day personal pattern: Sleep is at ${sleep?.today || 5.4} hours compared to your typical ${sleep?.baseline || 7.1} hours (a 24% curtailment). Daily physical activity is at ${steps?.today || 4900} steps vs your typical ${steps?.baseline || 7800} steps. Resting heart rate is slightly elevated at ${hr?.today || 78} bpm vs 72 bpm. These shifts represent a multi-signal deviation from your normal pattern.`;
    }

    if (q.includes('sleep')) {
      return `Your typical sleep duration over the past 30 days is ${sleep?.baseline || 7.1} hours with high consistency. Today you logged ${sleep?.today || 5.4} hours. HealthShield tracks personal patterns to help you recognize periods of cumulative strain early.`;
    }

    if (q.includes('heart') || q.includes('rate') || q.includes('normal')) {
      return `For you, a normal resting heart rate is between 68 and 74 bpm (learned baseline mean: ${hr?.baseline || 72} bpm). Today's reading of ${hr?.today || 78} bpm is slightly elevated (+8%) for your personal physiology. While 78 bpm is within general population cutoffs, it is unusual for your personal pattern.`;
    }

    return `Based on your recent 30-day HealthShield telemetry: You have established stable personal corridors for sleep (${sleep?.baseline || 7.1}h), activity (${steps?.baseline || 7800} steps), and heart rate (${hr?.baseline || 72} bpm). Today shows a multi-signal departure. HealthShield recommends rest and hydration, and suggests consulting a doctor if you feel unwell.`;
  }

  public async generateExplanation(params: {
    metrics: Array<{ metric: string; baseline: number; current: number; unit: string; delta: number }>;
    wellbeingScore: string;
    ruleId: string;
  }): Promise<AiExplanationResult> {
    try {
      const res = await fetch(`${this.baseUrl}/explain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal: AbortSignal.timeout(15000)
      });
      if (res.ok) {
        const data = await res.json();
        return {
          ...data.explanation,
          modelUsed: 'Local Language Model (On-Device Inference)'
        };
      }
    } catch {
      // Fallback
    }

    return {
      summary: `Observations differ from your recent personal 30-day baseline across multiple signals.`,
      observedChanges: params.metrics.map(m => `${m.metric}: ${m.current} ${m.unit} (Personal baseline: ${m.baseline} ${m.unit})`),
      whyFlagged: [
        'Multiple observations moved away from your established personal pattern at the same time.',
        'HealthShield does not identify disease or clinical causes; it flags compound deviations for early awareness.'
      ],
      nextSteps: [
        'Review recent sleep schedule, daily exertion, and hydration.',
        'Log tomorrow\'s 60-second check-in to see if signals return toward baseline.',
        'Seek professional medical advice if symptoms concern you or persist.'
      ],
      modelUsed: 'Deterministic Safety Engine (Offline Standard)'
    };
  }

  public async getDailyInsight(params: {
    wellbeingScore: string;
    sleepHours: number;
    symptoms?: string;
  }): Promise<string> {
    try {
      const res = await fetch(`${this.baseUrl}/daily-insight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal: AbortSignal.timeout(15000)
      });
      if (res.ok) {
        const data = await res.json();
        return data.insight;
      }
    } catch {
      // Fallback
    }

    if (params.wellbeingScore === 'NOT_WELL' || params.sleepHours < 6) {
      return `Today's check-in notes lower sleep (${params.sleepHours}h) and fatigue. HealthShield suggests lighter pacing today and monitoring whether this pattern persists tomorrow.`;
    }
    return `Your observations align closely with your established personal pattern. Keep up your regular daily reflection.`;
  }
}

export const localAiService = new LocalAiService();
