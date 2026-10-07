# 🛡️ HealthShield AI
### *Personal Preventive Health Intelligence*
**SFIC Track A • Theme 3: Swasth & Samavesh Bharat (Health & Well-being)**

> **HealthShield is a preventive-health awareness prototype that learns a user's recent wellness pattern, detects meaningful deviations from that personal baseline, explains the observed change, and guides the user toward an appropriate next step.**

---

## 💡 What Makes It Different?

1. **Personal Baseline Instead of Generic Thresholds:** Learns individual 30-day physiological normal corridors rather than relying exclusively on generic population cutoffs.
2. **Multi-Signal Change Detection:** Requires synchronized shifts across multiple signals (sleep duration, physical activity, resting heart rate, and subjective well-being) before flagging a meaningful divergence.
3. **Structured Explainable Alerts ("Explain My Change"):** Distinguishes between *what changed*, *what supports the change*, *what HealthShield knows*, *what it does not know*, and *what the user can do*.
4. **Deterministic Safety Layer:** Baseline math, covariance shift detection, and safety rules are strictly deterministic code. The system does not claim to diagnose disease or prescribe treatments.
5. **On-Device AI Explanation Layer:** Quantized local language model (e.g. Qwen2.5-Instruct GGUF) is used optionally for conversational explanation, natural-language summarization, and multilingual assistance. If the model is not running, the application seamlessly provides structured deterministic explanations.
6. **Offline-First • User-Controlled Data:** Core observation logging, local baseline evaluation, and daily check-ins operate entirely offline with resilient client-side queuing.
7. **Assistive & Multilingual Accessibility:** Built for diverse users with multi-language support (English, తెలుగు, हिंदी), voice query integration, large text, high contrast, and a 1-click Simple Mode.

---

## 🧭 Core Architectural Flow

```
USER
 │
 ▼
HEALTH OBSERVATIONS (Wearable / Manual / Device Adapter)
 │
 ▼
DATA QUALITY CHECK (Physiological bounds, freshness, unit integrity)
 │
 ▼
PERSONAL BASELINE
 ┌────────┴────────┐
 │                 │
 ▼                 ▼
CURRENT DATA     RECENT PATTERN (Rolling 30-day corridor)
 │                 │
 └────────┬────────┘
          ▼
   CHANGE DETECTION
          │
          ▼
 MULTI-SIGNAL PATTERN CHECK
          │
          ▼
   SAFETY RULE ENGINE (Deterministic Guardrails)
     ┌────┴────┐
     ▼         ▼
  STABLE     CHANGE DETECTED
               │
               ▼
   EXPLAINABLE SUMMARY
   ┌───────────┴───────────┐
   │                       │
   ▼                       ▼
STRUCTURED DECISION CARD   ON-DEVICE AI EXPLAINER
                           (Natural language & Indian languages)
               │
               ▼
    APPROPRIATE NEXT STEP
    (Rest, monitor, or seek healthcare advice)
```

> **Design Principle:** AI explains; the deterministic safety engine decides the workflow.

---

## 🏛️ SFIC Six Evaluation Criteria Alignment

| SFIC Scoring Criterion | HealthShield AI Implementation | Prototype Evidence |
| :--- | :--- | :--- |
| **01 — Problem Clarity** | Raw telemetry numbers (e.g., 78 BPM) lack meaning without an individual context. People often cannot tell if numbers represent an unusual change for *them*. | Dynamic comparison against learned personal baseline vs population cutoffs. |
| **02 — Originality** | Personal baseline corridor + multi-signal covariance departure detection. Replaces anxiety-inducing chatbots with a structured explainability card. | Deterministic rule registry (`HS-RULE-001`) with clear boundaries. |
| **03 — Feasibility** | Fully functional interactive browser prototype with simulated test scenarios, offline queue, and device adapter abstraction layer. | Verified in browser across 10-step Judge Mode and interactive Health Change Lab. |
| **04 — Cost & Sustainability** | Software-first design with low recurring costs; runs on standard student/community mobile hardware. | Prototype operating cost model detailing individual, college, and program adoption. |
| **05 — Beneficiary Impact** | Individual early awareness $\rightarrow$ Trusted Circle family notifications $\rightarrow$ Campus/community wellness tracking $\rightarrow$ District programs. | Granular consent controls, family alert toggles, and inclusive assistive modes. |
| **06 — Scalability** | Reusable edge architecture with an ABDM-ready FHIR R4 interoperability pathway for polytechnic campuses and public health programs. | Standardized FHIR Observation JSON mapping and multi-district deployment model. |

---

## 🔬 Prototype Evidence & Validation

HealthShield reports honest, verified prototype testing stages rather than premature commercial pilot claims:

### Verification Completed (Current Stage)
- **Core Interaction Testing:** End-to-end user check-in flow, metric sliders, and interactive scenario simulation.
- **Baseline Calculation Testing:** 30-day rolling mean, variance bounds, and outlier detection verified.
- **Change Detection Scenario Testing:** Evaluated across stable, emerging, and multi-signal strain scenarios in the **Health Change Lab**.
- **Offline Workflow Testing:** Verified queue operations, local persistence, and background sync transitions.
- **Accessibility Workflow Testing:** Verified high contrast, text sizing, screen reader landmarks, and Telugu/Hindi translation tokens.

### Next Planned Validation (30-Day Campus Pilot)
- **Cohort Target:** 30–50 student and polytechnic community participants.
- **Duration:** 30 consecutive days.
- **Key Measures:** Daily check-in completion rate, time-to-check-in (target <60s), user comprehension of alerts, false-alert feedback, and usability across Indian languages.

---

## 🔒 Privacy, Safety & Interoperability

### Safety Rule Registry (Prototype Logic)
| Rule ID | Rule Scope | Evaluation Logic | Prototype Status |
| :--- | :--- | :--- | :--- |
| `HS-RULE-001` | Multi-Signal Baseline Deviation | $\geq 2$ signals depart from 30-day corridor ($\Delta > 15\%$) | Prototype logic |
| `HS-RULE-002` | Isolated Signal Variance | Single metric variance without compound shift | Prototype logic |
| `HS-RULE-003` | Ingestion Quality Guardrail | Out-of-bounds or corrupted sensor readings | Prototype safeguard |
| `HS-SAFE-001` | Critical Safety Threshold | Extreme physiological readings prompting emergency notice | Prototype safeguard |
| `HS-SAFE-002` | Medical Advice Boundary | Restricts system from clinical diagnoses or prescriptions | Permanent safeguard |

*Safety rules represent prototype demonstration logic and require formal clinical review before real-world clinical deployment.*

### ABDM-Ready Interoperability Pathway
HealthShield does not falsely claim active governmental ABDM integration. Instead, it provides a standards-compliant architecture:
```
HealthShield
    │
    ▼
FHIR R4-Compatible Data Model (LOINC-coded observations)
    │
    ▼
Interoperability Layer (Encrypted JSON payload exports)
    │
    ▼
Future ABDM Milestone Pathway (Ayushman Bharat Digital Mission)
```

---

## 💰 Prototype Estimated Operating Model

| Component | Cost Profile | Description |
| :--- | :--- | :--- |
| **Core Web App** | Low | Static client hosting (Vite/React) with minimal server overhead. |
| **Local Inference** | Device-Dependent | Runs on-device (CPU/NPU) using local quantized GGUF models; zero API fees. |
| **Sync & Backup** | Usage-Dependent | Lightweight encrypted SQLite/PostgreSQL sync for connected workflows. |
| **Notifications** | Usage-Dependent | Optional email/SMS alerts to designated trusted circle members. |

### Who Pays?
- **Individual User:** Free basic tier for self-monitoring and personal awareness.
- **College / Polytechnic Campus:** Institutional wellness deployment covering student cohorts.
- **Public Health Program:** Program-level deployment for district preventive wellness initiatives.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation
```bash
git clone https://github.com/saladi-siddharth/SFIC-.git
cd SFIC-
npm install
```

### Run Locally
```bash
# Start frontend dev server
npm run dev

# (Optional) Start on-device AI backend server
npx tsx server/index.ts
```
The web application will be accessible at `http://localhost:5173/`.
Click **▶ JUDGE MODE** in the left sidebar or top banner to launch the 90-second guided evaluation walkthrough!
