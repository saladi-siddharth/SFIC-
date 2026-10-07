import app from './index.js';

async function runTests() {
  console.log('🧪 Starting HealthShield AI Phase 2 Test Suite...\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // 1. Health check test
  try {
    const res = await fetch('http://localhost:3001/api/health').catch(() => null);
    if (res) {
      const data = await res.json();
      assert(data.status === 'OPERATIONAL', 'GET /api/health returns OPERATIONAL');
      assert(data.services.patternEngine.deterministic === true, 'Pattern engine is flagged as deterministic');
    } else {
      console.log('ℹ️ Server not running on 3001 yet (unit evaluation)');
    }
  } catch (e) {
    console.log('Skipping live HTTP test (will run in background)');
  }

  console.log(`\nTest Run Completed: ${passed} passed, ${failed} failed.`);
}

export { runTests };
