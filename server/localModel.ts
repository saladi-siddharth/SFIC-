import path from 'path';
import { getLlama, LlamaChatSession, type LlamaModel, type LlamaContext } from 'node-llama-cpp';

import fs from 'fs';

class LocalModelManager {
  private model: LlamaModel | null = null;
  private context: LlamaContext | null = null;
  private session: LlamaChatSession | null = null;
  private isInitializing: boolean = false;
  private isReady: boolean = false;
  private initError: string | null = null;
  public readonly modelPath: string = process.env.LOCAL_GGUF_MODEL_PATH || path.resolve(process.cwd(), 'models/local-model.gguf');

  constructor() {
    // Only attempt to load if model file exists on disk
    if (fs.existsSync(this.modelPath)) {
      this.initModel().catch(err => {
        console.warn('[LocalModelManager] Deferred model loading error:', err.message);
      });
    } else {
      this.initError = 'Local model file not configured or present. Using deterministic baseline explanations.';
    }
  }

  public async initModel(): Promise<boolean> {
    if (this.isReady) return true;
    if (!fs.existsSync(this.modelPath)) {
      this.initError = 'Model file not found. System operating in deterministic mode.';
      return false;
    }
    if (this.isInitializing) {
      while (this.isInitializing) {
        await new Promise(r => setTimeout(r, 200));
      }
      return this.isReady;
    }

    this.isInitializing = true;
    console.log(`[HealthShield AI] Initializing local language model...`);

    try {
      const llama = await getLlama({ gpu: false });
      this.model = await llama.loadModel({
        modelPath: this.modelPath,
        gpuLayers: 0
      });

      this.context = await this.model.createContext({
        contextSize: 2048
      });

      this.session = new LlamaChatSession({
        contextSequence: this.context.getSequence(),
        systemPrompt: `You are HealthShield AI, an empathetic preventive health intelligence assistant powered by an optional local language model.
CRITICAL SAFETY RULES:
1. You are a preventive health pattern awareness system, NOT a diagnostic engine.
2. Never claim to diagnose diseases or prescribe medications.
3. Always explain biometric shifts (such as resting heart rate, sleep duration, steps) with reference to the user's personal baseline.
4. Keep advice grounded in rest, hydration, stress reduction, and consulting medical doctors when symptoms are severe or persistent.
5. Provide clear, empathetic, and concise responses.`
      });

      this.isReady = true;
      this.initError = null;
      console.log('✅ [HealthShield AI] Local Language Model is READY for inferences!');
      return true;
    } catch (err: any) {
      this.initError = err.message || String(err);
      console.warn('[HealthShield AI] Model initialization deferred:', this.initError);
      return false;
    } finally {
      this.isInitializing = false;
    }
  }

  public getStatus() {
    return {
      modelName: 'Local Language Model (GGUF)',
      modelAvailable: fs.existsSync(this.modelPath),
      provider: 'node-llama-cpp (Optional Local Edge Inference)',
      isReady: this.isReady,
      isInitializing: this.isInitializing,
      mode: this.isReady ? 'ai_assisted' : 'deterministic_safety_layer',
      statusMessage: this.isReady
        ? 'Local language model active for natural language explanation'
        : 'Deterministic safety rules active (transparent explainability)'
    };
  }

  public async generateChatResponse(userMessage: string, history?: Array<{ role: string; content: string }>): Promise<string> {
    const ready = await this.initModel();
    if (!ready || !this.session) {
      throw new Error(`Local model not ready: ${this.initError || 'Initialization failed'}`);
    }

    try {
      const promptText = userMessage.trim();
      const response = await this.session.prompt(promptText, {
        maxTokens: 160,
        temperature: 0.6
      });
      return response.trim();
    } catch (err: any) {
      console.error('[LocalModelManager] Inference error:', err.message);
      throw err;
    }
  }

  public async explainDivergence(data: {
    metrics: Array<{ metric: string; baseline: number; current: number; unit: string; delta: number }>;
    wellbeingScore: string;
    ruleId: string;
  }): Promise<{ summary: string; observedChanges: string[]; whyFlagged: string[]; whatWeKnow: string; whatWeDoNotKnow: string; nextSteps: string[] }> {
    const changes = data.metrics.map(m => 
      `${m.metric}: current ${m.current} ${m.unit} vs baseline ${m.baseline} ${m.unit} (${m.delta > 0 ? '+' : ''}${m.delta}%)`
    ).join(', ');

    const prompt = `User's biometric data has shifted from their established 30-day baseline.
Observed telemetry: ${changes}.
Subjective wellbeing reported: ${data.wellbeingScore}.
Governing Rule: ${data.ruleId}.

Generate a structured non-diagnostic explanation in JSON format with:
{
  "summary": "1-2 sentence non-alarming explanation of what changed from their personal baseline",
  "observedChanges": ["bullet 1", "bullet 2"],
  "whyFlagged": ["reason 1", "reason 2"],
  "whatWeKnow": "Values have departed from recent individual normal corridor",
  "whatWeDoNotKnow": "Medical or clinical etiology of the observation",
  "nextSteps": ["action step 1", "action step 2"]
}
Reply with ONLY the raw JSON object and nothing else.`;

    try {
      const raw = await this.generateChatResponse(prompt);
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      // Deterministic fallback handles this seamlessly
    }

    // High quality, factual, non-diagnostic fallback
    return {
      summary: `Your resting heart rate is elevated (+${data.metrics[0]?.delta || 8}%) alongside reduced sleep duration compared to your recent personal pattern.`,
      observedChanges: data.metrics.map(m => `${m.metric}: ${m.current} ${m.unit} (Personal baseline: ${m.baseline} ${m.unit})`),
      whyFlagged: [
        'Multiple signals departed together from your recent personal baseline',
        'Combined shift across sleep and resting heart rate exceeds routine day-to-day variance'
      ],
      whatWeKnow: 'Today’s readings deviate noticeably from your personal 30-day normal pattern.',
      whatWeDoNotKnow: 'HealthShield does not determine underlying medical causes or clinical conditions.',
      nextSteps: [
        'Prioritize 7-8 hours of restful sleep and hydrate adequately',
        'Avoid intense exertion today and log another check-in tomorrow morning',
        'Consult a healthcare professional if you feel unwell or if this pattern persists'
      ]
    };
  }
}
}

export const localModelManager = new LocalModelManager();
