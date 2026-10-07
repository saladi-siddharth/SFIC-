import path from 'path';
import { fileURLToPath } from 'url';
import { getLlama, LlamaChatSession } from 'node-llama-cpp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testLocalModel() {
  console.log('⏳ Initializing local LLaMA engine...');
  const modelPath = path.resolve('d:/SFIC/Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf');
  console.log(`🔍 Model path: ${modelPath}`);

  try {
    const llama = await getLlama({
      gpu: false // Force CPU / System RAM to guarantee 100% stability across all machines
    });
    console.log('✅ LLaMA runtime initialized (CPU mode).');

    console.log('⏳ Loading Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf with CPU execution...');
    const model = await llama.loadModel({
      modelPath,
      gpuLayers: 0
    });
    console.log('✅ Model loaded into memory successfully!');

    const context = await model.createContext({
      contextSize: 2048
    });
    const session = new LlamaChatSession({
      contextSequence: context.getSequence(),
      systemPrompt: 'You are HealthShield AI, an empathetic preventive health wellness assistant. You never diagnose diseases and always advise medical consultation for severe symptoms.'
    });

    console.log('⏳ Running sample test prompt: "Explain in 1 short sentence why a sudden resting heart rate increase of 10 BPM warrants wellness rest."');
    const answer = await session.prompt('Explain in 1 short sentence why a sudden resting heart rate increase of 10 BPM warrants wellness rest.');
    console.log('\n🤖 Local Qwen2.5 Model Output:');
    console.log(answer);
    console.log('\n🎉 Local GGUF Model successfully integrated and tested!');
  } catch (err: any) {
    console.error('❌ Error during local model execution:', err.message || err);
  }
}

testLocalModel();
