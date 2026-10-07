export interface PageSEOMetadata {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  badge: string;
  path: string;
}

export const PAGE_SEO_REGISTRY: Record<string, PageSEOMetadata> = {
  home: {
    title: 'Home — Personal Health Pattern Intelligence',
    description: 'HealthShield AI learns a person\'s 30-day baseline and helps them notice meaningful multi-signal deviations without claiming clinical diagnosis.',
    keywords: 'preventive health, personal baseline, health pattern detection, SFIC Track A, offline health AI',
    h1: 'Your health has a pattern. We help you notice when it changes.',
    badge: 'SFIC TRACK A PROTOTYPE • PERSONAL HEALTH PATTERN ENGINE',
    path: '#/home'
  },
  baseline: {
    title: 'My Baseline — 30-Day Physiological Corridor',
    description: 'Inspect your individualized 30-day biological normal bounds across sleep, physical activity, resting heart rate, and well-being.',
    keywords: 'personal health baseline, physiological corridor, normal bounds, 30 day wellness model',
    h1: 'Your Personal Health Baseline (30-Day Model)',
    badge: 'SIGNATURE INNOVATION SCREEN',
    path: '#/my-baseline'
  },
  checkin: {
    title: 'Health Check — 60-Second Daily Check-in',
    description: 'Quick accessible check-in capturing subjective fatigue, mood, sleep quality, and daily observations with offline sync.',
    keywords: 'daily health check-in, subjective fatigue tracking, wellness survey, offline checkin',
    h1: '60-Second Daily Health Check-in',
    badge: 'ACCESSIBLE DAILY REFLECTION',
    path: '#/health-check'
  },
  lab: {
    title: 'Health Change Lab — Interactive Stress & Deviation Demo',
    description: 'Interactive demonstration lab: inject simulated health observations into a locked baseline and watch the deterministic pattern engine detect changes in real time.',
    keywords: 'health change lab, baseline deviation test, interactive health simulator, multi-signal departure',
    h1: 'Health Change Lab (Interactive Stress Test)',
    badge: 'INTERACTIVE DEMONSTRATION LAB • THEME 3 PROOF OF FEASIBILITY',
    path: '#/change-lab'
  },
  alert: {
    title: 'Change Explained — Structured Explainability Card',
    description: 'Explainable non-diagnostic decision card clarifying what changed, what supports the change, what HealthShield knows, what it does not know, and what to do next.',
    keywords: 'explainable health alert, explain my change card, non diagnostic guidance, pattern shift summary',
    h1: 'Explainable Health Change Advisory',
    badge: 'SIGNATURE WOW SCREEN • EXPLAINABLE ADVISORY',
    path: '#/change-explained'
  },
  record: {
    title: 'Health Record — Observations Provenance & ABDM Pathway',
    description: 'Complete personal observation logs with data provenance, unit validation, consent context, and ABDM-ready FHIR R4 JSON export.',
    keywords: 'personal health record, data provenance, LOINC codes, ABDM FHIR R4 interoperability, encrypted health summary',
    h1: 'Personal Health Record & Provenance',
    badge: 'ABDM-READY INTEROPERABILITY PATHWAY',
    path: '#/health-record'
  },
  timeline: {
    title: 'Health Timeline — Longitudinal Trend & Pattern Evolution',
    description: 'Chronological health pattern evolution from baseline initialization and stabilization to emerging multi-signal shifts and resolution.',
    keywords: 'health timeline, longitudinal telemetry, baseline progression, wellness trajectory',
    h1: 'Personal Health Timeline & Progression',
    badge: 'LONGITUDINAL PATTERN TRACKING',
    path: '#/health-timeline'
  },
  pilot: {
    title: 'Pilot Evidence — Verified Prototype Testing & Campus Cohort',
    description: 'Honest verification evidence: interaction tests, baseline calculations, offline queue stress testing, and planned 30-day 30–50 participant campus pilot.',
    keywords: 'pilot evidence, prototype validation, campus wellness pilot, feasibility testing, SFIC evidence',
    h1: 'Prototype Evidence & Pilot Validation',
    badge: 'CONTROLLED PROTOTYPE EVIDENCE',
    path: '#/pilot-evidence'
  },
  cost: {
    title: 'Cost & Scale — Economic Model & 6 SFIC Criteria',
    description: 'Transparent operating cost model detailing individual free access, campus license, program deployment, and direct mapping to all 6 SFIC scoring criteria.',
    keywords: 'SFIC evaluation criteria, economic sustainability, operating cost model, polytechnic deployment, scalability',
    h1: 'Deployment Operating Model & SFIC Criteria',
    badge: 'ECONOMIC SUSTAINABILITY & DEPLOYABILITY',
    path: '#/cost-and-scale'
  },
  technology: {
    title: 'Technology Architecture — Deterministic Engine & On-Device AI',
    description: 'Deep dive into HealthShield architecture: deterministic baseline engine, rule registry, local quantized Qwen2.5 GGUF runtime, and offline storage.',
    keywords: 'technology architecture, deterministic safety rules, on-device LLM, quantized GGUF, offline storage, IndexedDB',
    h1: 'HealthShield Technology & Safety Architecture',
    badge: 'TECHNICAL SPECIFICATION • TRACK A',
    path: '#/technology'
  },
  consent: {
    title: 'Privacy & Consent — DPDP Act 2023 Purpose-Bound Controls',
    description: 'Purpose-bound, granular consent management complying with India\'s Digital Personal Data Protection (DPDP) Act 2023 with revocable permissions.',
    keywords: 'DPDP Act 2023, health data privacy, purpose bound consent, offline data control, user privacy',
    h1: 'Privacy, Consent & DPDP Act 2023 Center',
    badge: 'USER-CONTROLLED HEALTH DATA',
    path: '#/privacy-and-consent'
  },
  circle: {
    title: 'Trusted Circle — Family & Support Network Sharing',
    description: 'Selective, privacy-preserving sharing of pattern alerts and high-level sleep trends with trusted family members and designated campus proctors.',
    keywords: 'trusted circle, caregiver alerts, family health notifications, privacy-preserving sharing',
    h1: 'Trusted Circle (Family & Support Sharing)',
    badge: 'BENEFICIARY IMPACT: FAMILY & CIRCLE',
    path: '#/trusted-circle'
  },
  impact: {
    title: 'Beneficiary Impact — Multi-Tier Deployment Reach',
    description: 'Structured beneficiary impact model scaling from individual early awareness to campus cohorts, primary health centres, and district-level programs.',
    keywords: 'beneficiary impact, community health, district scalability, campus wellness, public health adoption',
    h1: 'Beneficiary Impact & Deployment Roadmap',
    badge: 'SFIC THEME 3: SWASTH & SAMAVESH BHARAT',
    path: '#/beneficiary-impact'
  },
  explorer: {
    title: 'Pattern Explorer — Physiological Signal Covariance',
    description: 'Interactive visualization of cross-signal relationships and physiological covariance across rolling observation periods.',
    keywords: 'pattern explorer, signal covariance, resting heart rate, HRV correlation, multi-metric analysis',
    h1: 'Physiological Pattern Explorer',
    badge: 'MULTI-SIGNAL CORRELATION',
    path: '#/pattern-explorer'
  },
  simple: {
    title: 'Simple Mode — Assistive & Elderly Accessible View',
    description: 'High-contrast, large-button, distraction-free accessible interface designed for elderly users, low-vision individuals, and voice navigation.',
    keywords: 'assistive health mode, elderly accessible interface, high contrast health app, voice health query',
    h1: 'Assistive Simple Health Mode',
    badge: 'ASSISTIVE TECHNOLOGY & INCLUSION',
    path: '#/simple-mode'
  },
  profile: {
    title: 'My Health Profile — Personal Health Identity & Context',
    description: 'Personal health context, routines, optional conditions, emergency contact, accessibility preferences, and completeness indicator.',
    keywords: 'personal health profile, wellness routine, health identity, user context, non diagnostic profile',
    h1: 'My Health Profile & Personal Context',
    badge: 'FLAGSHIP FEATURE 01 • PERSONAL CONTEXT',
    path: '#/health-profile'
  },
  assistant: {
    title: 'AI Health Assistant — Voice & Data-Grounded Intelligence',
    description: 'Ask questions by voice or text grounded in your personal 30-day baseline telemetry, with strict non-diagnostic safety guardrails.',
    keywords: 'AI health assistant, voice query, personal baseline AI, non diagnostic assistant, Telugu Hindi voice',
    h1: 'Personal AI Health Assistant',
    badge: 'DATA-GROUNDED PREVENTIVE INTELLIGENCE',
    path: '#/ai-assistant'
  },
  accessibility: {
    title: 'Accessibility & Inclusion — Regional Languages & Assistive Tech',
    description: 'Multilingual health intelligence in Telugu, Hindi, and English with 1-click Simple Mode, text scaling, and WCAG AA contrast.',
    keywords: 'Theme 3 assistive technology, inclusion, Telugu health AI, Hindi health AI, WCAG AAA accessibility',
    h1: 'Accessibility & Inclusive Health Access',
    badge: 'SFIC THEME 3 • ASSISTIVE TECH & INCLUSION',
    path: '#/accessibility'
  },
  trends: {
    title: 'Health Trends — Longitudinal Pattern & Corridor Analysis',
    description: 'Compare today\'s readings against your personal 7-day and 30-day physiological corridor rather than generic thresholds.',
    keywords: 'health trends, personal corridor, today vs baseline, 30 day wellness trend, pattern shift',
    h1: 'How Has My Pattern Changed?',
    badge: 'LONGITUDINAL PATTERN ANALYSIS',
    path: '#/health-trends'
  }
};

/**
 * Updates browser document title, description, and OpenGraph tags dynamically
 */
export function applyPageSEO(tabKey: string): void {
  const meta = PAGE_SEO_REGISTRY[tabKey] || PAGE_SEO_REGISTRY.home;
  
  // 1. Dynamic Page Title
  document.title = `${meta.title} | HealthShield AI`;

  // 2. Meta Description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', meta.description);

  // 3. Meta Keywords
  let kwMeta = document.querySelector('meta[name="keywords"]');
  if (!kwMeta) {
    kwMeta = document.createElement('meta');
    kwMeta.setAttribute('name', 'keywords');
    document.head.appendChild(kwMeta);
  }
  kwMeta.setAttribute('content', meta.keywords);

  // 4. OpenGraph Title & Description
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${meta.title} | HealthShield AI`);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', meta.description);
}

/**
 * Convert URL hash to AppTab key
 */
export function getTabFromHash(hash: string): string {
  const clean = hash.replace(/^#\/?/, '').toLowerCase().trim();
  const hashToTabMap: Record<string, string> = {
    '': 'home',
    'home': 'home',
    'my-baseline': 'baseline',
    'baseline': 'baseline',
    'health-check': 'checkin',
    'checkin': 'checkin',
    'change-lab': 'lab',
    'lab': 'lab',
    'changelab': 'lab',
    'change-explained': 'alert',
    'alert': 'alert',
    'explained': 'alert',
    'health-record': 'record',
    'record': 'record',
    'health-timeline': 'timeline',
    'timeline': 'timeline',
    'pilot-evidence': 'pilot',
    'pilot': 'pilot',
    'evidence': 'pilot',
    'cost-and-scale': 'cost',
    'cost-scale': 'cost',
    'cost': 'cost',
    'technology': 'technology',
    'tech': 'technology',
    'privacy-and-consent': 'consent',
    'privacy': 'consent',
    'consent': 'consent',
    'trusted-circle': 'circle',
    'circle': 'circle',
    'beneficiary-impact': 'impact',
    'impact': 'impact',
    'pattern-explorer': 'explorer',
    'explorer': 'explorer',
    'simple-mode': 'simple',
    'simple': 'simple',
    'health-profile': 'profile',
    'profile': 'profile',
    'ai-assistant': 'assistant',
    'assistant': 'assistant',
    'voice': 'assistant',
    'accessibility': 'accessibility',
    'health-trends': 'trends',
    'trends': 'trends'
  };
  return hashToTabMap[clean] || 'home';
}

/**
 * Convert AppTab key to clean URL hash
 */
export function getHashForTab(tabKey: string): string {
  const tabToHashMap: Record<string, string> = {
    home: '#/home',
    baseline: '#/my-baseline',
    checkin: '#/health-check',
    lab: '#/change-lab',
    alert: '#/change-explained',
    record: '#/health-record',
    timeline: '#/health-timeline',
    pilot: '#/pilot-evidence',
    cost: '#/cost-and-scale',
    technology: '#/technology',
    consent: '#/privacy-and-consent',
    circle: '#/trusted-circle',
    impact: '#/beneficiary-impact',
    explorer: '#/pattern-explorer',
    simple: '#/simple-mode',
    profile: '#/health-profile',
    assistant: '#/ai-assistant',
    accessibility: '#/accessibility',
    trends: '#/health-trends'
  };
  return tabToHashMap[tabKey] || '#/home';
}
