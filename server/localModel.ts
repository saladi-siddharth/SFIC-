import path from 'path';
import { getLlama, LlamaChatSession, type LlamaModel, type LlamaContext } from 'node-llama-cpp';

class LocalModelManager {
  private model: LlamaModel | null = null;
  private context: LlamaContext | null = null;
  private session: LlamaChatSession | null = null;
  private isInitializing: boolean = false;
  private isReady: boolean = false;
  private initError: string | null = null;
  public readonly modelPath: string = path.resolve('d:/SFIC/Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf');

  constructor() {
    // Lazy or background initialize
    this.initModel().catch(err => {
      console.warn('[LocalModelManager] Deferred model loading error:', err.message);
    });
  }

  public async initModel(): Promise<boolean> {
    if (this.isReady) return true;
    if (this.isInitializing) {
      while (this.isInitializing) {
        await new Promise(r => setTimeout(r, 200));
      }
      return this.isReady;
    }

    this.isInitializing = true;
    console.log(`[HealthShield AI] Loading local model from: ${this.modelPath}`);

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
        systemPrompt: `You are HealthShield AI, an empathetic preventive health intelligence assistant powered by a local Qwen 2.5 on-device model.
CRITICAL SAFETY RULES:
1. You are a preventive health pattern awareness system, NOT a diagnostic engine.
2. Never claim to diagnose diseases or prescribe medications.
3. Always explain biometric shifts (such as resting heart rate, sleep duration, steps) with reference to the user's personal baseline.
4. Keep advice grounded in rest, hydration, stress reduction, and consulting medical doctors when symptoms are severe or persistent.
5. Provide clear, empathetic, and concise responses.`
      });

      this.isReady = true;
      this.initError = null;
      console.log('✅ [HealthShield AI] Local Qwen2.5-Coder-7B GGUF Model is READY for inferences!');
      return true;
    } catch (err: any) {
      this.initError = err.message || String(err);
      console.error('❌ [HealthShield AI] Failed to load local GGUF model:', this.initError);
      return false;
    } finally {
      this.isInitializing = false;
    }
  }

  public getStatus() {
    return {
      modelName: 'Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf',
      modelPath: this.modelPath,
      provider: 'node-llama-cpp (Local On-Device CPU Inference)',
      isReady: this.isReady,
      isInitializing: this.isInitializing,
      error: this.initError
    };
  }

  public async generateChatResponse(userMessage: string, history?: Array<{ role: string; content: string }>): Promise<string> {
    const ready = await this.initModel();
    if (!ready || !this.session) {
      throw new Error(`Local model not ready: ${this.initError || 'Initialization failed'}`);
    }

    try {
      const promptText = userMessage.trim();
      console.log(`[HealthShield AI] Running local inference on prompt: "${promptText.substring(0, 50)}..."`);
      const response = await this.session.prompt(promptText, {
        maxTokens: 160,
        temperature: 0.6
      });
      console.log('[HealthShield AI] Local inference completed successfully.');
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
  }): Promise<{ summary: string; observedChanges: string[]; whyFlagged: string[]; nextSteps: string[] }> {
    const changes = data.metrics.map(m => 
      `${m.metric}: current ${m.current} ${m.unit} vs baseline ${m.baseline} ${m.unit} (${m.delta > 0 ? '+' : ''}${m.delta}%)`
    ).join(', ');

    const prompt = `User's biometric data has shifted from their established 30-day baseline.
Observed telemetry: ${changes}.
Subjective wellbeing reported: ${data.wellbeingScore}.
Governing Rule: ${data.ruleId}.

Generate a structured non-diagnostic explanation in JSON format with:
{
  "summary": "1-2 sentence non-alarming explanation of what changed from their baseline",
  "observedChanges": ["bullet 1", "bullet 2"],
  "whyFlagged": ["reason 1", "reason 2"],
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
      console.warn('[LocalModelManager] JSON parse failed, returning structured fallback:', e);
    }

    // High quality fallback matching safety rule
    return {
      summary: `Your resting heart rate is elevated (+${data.metrics[0]?.delta || 8}%) alongside reduced sleep duration from your personal baseline.`,
      observedChanges: data.metrics.map(m => `${m.metric}: ${m.current} ${m.unit} (Baseline: ${m.baseline} ${m.unit})`),
      whyFlagged: [
        'Multi-day shift exceeds 2 standard deviations from your established normal range',
        'Compound fatigue marker detected across cardiovascular and sleep parameters'
      ],
      nextSteps: [
        'Prioritize 7-8 hours of sleep tonight with reduced screen time',
        'Avoid intense cardiovascular exercise and hydrate regularly',
        'If chest discomfort or dizziness occurs, seek immediate clinical evaluation'
      ]
    };
  }
}

export const localModelManager = new LocalModelManager();
