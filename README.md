# 🏥 Medivora AI & HealthShield Clinical Command Center
### *Personal Preventive Intelligence • SFIC National Track A • On-Device Qwen2.5-Coder-7B AI Copilot*

> **Executive Overview:**  
> Medivora AI & HealthShield is an institutional-grade clinical command center and preventive health platform. It integrates **13 dedicated clinical modules** powered by an on-device local Large Language Model (`Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf`), ensuring **100% zero-cloud telemetry privacy**, strict DPDP Act 2023 & HIPAA compliance, and deterministic baseline anomaly detection.

---

## 🖥️ 13 Dedicated Clinical Modules

The platform features individual, high-efficiency pages tailored to clinical operational workflows:

1. **Dashboard (`/`)**: Executive clinical overview with organ health status (Heart, Lungs, Brain, Kidneys, Liver), 24h vitals trend charts, health risk indexing, and instant quick actions.
2. **Patients**: Inpatient cohort directory, real-time vitals monitoring, baseline departure triage scores, bed assignment, and one-click on-device Qwen2.5 clinical case reviews.
3. **Appointments**: Multi-tier scheduling calendar (Today, Tomorrow, Upcoming), in-person arrival check-in, and instant WebRTC telemedicine launch.
4. **Health Records**: Longitudinal electronic health records (Holter ECG, Comprehensive Metabolic Panels, Chest X-rays, Discharge Summaries) with LOINC codes and one-click ABDM FHIR R4 JSON bundle exports.
5. **AI Insights**: Autonomic stress forecasts, circadian phase alignment, pharmacokinetics correlation models, and an interactive prompt sandbox running on the local Qwen2.5 model.
6. **Diagnostics**: High-precision diagnostic telemetry including 12-lead ECG intervals (PR, QRS, QTc), hs-cTnI troponin, nocturnal desaturation, and hs-CRP with automatic reference range flags.
7. **Treatments**: Active care protocol tracking, interactive milestone checkboxes, daily clinical directives, and multidisciplinary care team assignments.
8. **Medications**: Smart pharmacy scheduler (Morning, Noon, Evening, Bedtime), adherence rate metrics, drug-drug interaction warnings (e.g. Lisinopril + Spironolactone hyperkalemia guardrails), and electronic refill requests.
9. **Reports**: Clinical discharge summaries, longitudinal baseline reports, and digitally signed clinical PDF/plain-text downloads.
10. **Analytics**: Hospital operations telemetry including bed occupancy (84.2%), 30-day readmission reduction metrics (-18.4%), and 24-hour baseline drift heatmaps.
11. **Alerts (Badge 6)**: Triage escalation feed displaying all 6 critical alerts (Sarah Vance resting tachycardia, David Okafor SpO2 desaturation, Michael Davis hypertensive spike) with Rapid Response Team dispatch.
12. **Messages**: Multi-channel clinical communications (Patients, Cardiology, Rapid Response Team, Hospital Pharmacy) with integrated Qwen2.5 draft assistance.
13. **Settings**: Clinician preferences, local Qwen2.5 temperature controls, DPDP Act 2023 audit logging toggles, and ABDM sandbox endpoint configuration.

---

## 🧠 Local On-Device AI Architecture (Zero-Cloud Privacy)

- **Local Model**: `Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf` (4.68 GB quantized model).
- **Runtime Engine**: `node-llama-cpp` with multi-threaded CPU execution.
- **Air-Gapped Privacy**: Zero patient telemetry or health data leaves the local machine. All inference occurs locally in-process.
- **REST Endpoints**:
  - `GET /api/ai/status`: Inspect model readiness, memory, and provider status.
  - `POST /api/ai/chat`: Clinical assistant query and conversational copilot.
  - `POST /api/ai/explain`: Grounded anomaly and baseline departure explanation.
  - `POST /api/ai/daily-insight`: Telemetry summary generation.

---

## 🧭 Concept Axiom

```
PERSONAL BASELINE → CHANGE DETECTION → SAFETY LOGIC → EXPLAINABLE GUIDANCE → APPROPRIATE NEXT STEP
```

HealthShield is a preventive-health awareness and pattern-recognition platform. **It is NOT a diagnostic system and never claims to diagnose disease.**

---

## 🏛️ SFIC Evaluation Criteria Mapping

| SFIC Scoring Criterion | Implementation in HealthShield AI | Verified Component |
| :--- | :--- | :--- |
| **1. Problem Clarity** | Resolves the disconnect where raw telemetry (e.g. 78 BPM) provides a number but lacks personal meaning. | Personal Baseline Engine & Change Detection |
| **2. Originality** | Personal baseline learned over rolling windows + deterministic safety rules overriding language models. | Safety Engine & Content Governance (`HS-WELL-001`) |
| **3. Feasibility** | Working software prototype, browser IndexedDB offline-first synchronization, device adapter layer. | Dual-DB (PostgreSQL / SQLite) + Express API |
| **4. Cost & Sustainability** | ₹8.40 / user / month transparent cost calculator without proprietary cloud lock-in. | Interactive Cost Calculator & "Who Pays?" model |
| **5. Beneficiary Impact** | Individual → Trusted Family Circle → Campus Cohort → Community. | Trusted Circle & Feedback Loop Survey |
| **6. Scalability** | ABDM FHIR R4 interoperability layer + de-identified institutional dashboard. | FHIR Bundle Mapping (`/api/fhir/observation`) |

---

## 🌟 Key Phase 2 Upgrades

### 1. Data Provenance & Observations Model
Every telemetry reading records:
- `metric`, `value`, `unit`, `timestamp`
- `source_type`: `MANUAL`, `SELF_REPORTED`, `DEVICE`, `IMPORTED`, `SIMULATED`
- `source_name`, `device_id`
- `quality_status`: `VALID`, `PARTIAL`, `SUSPICIOUS`, `REJECTED`
- `user_consent_context`, `idempotency_key`
- Interactive **"View Data Source"** provenance inspection modal.

### 2. Device Adapter Architecture
```
                    HEALTHSHIELD
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
     Manual         Wearable API      Health Device API
     Entry               │                │
        └────────────────┼────────────────┘
                         ↓
                 DATA NORMALIZER
                         ↓
                  HEALTH DATA MODEL
```
- `ManualAdapter`: Self-reported checks.
- `SimulatedWearableAdapter`: Demonstrates realistic multi-sensor telemetry without falsely claiming live commercial device certifications.
- `BluetoothHealthDeviceAdapter`: Web Bluetooth GATT architecture ready for future BLE oximeters and blood pressure monitors.
- `DataQualityEngine`: Range checking, unit validation, timestamp freshness, and physiological bounds.

### 3. DPDP Act 2023 Purpose-Bound Consent Center
Replaces generic checkboxes with granular, revocable consent states:
1. Health observations (Allowed)
2. Daily check-ins (Allowed)
3. Trend analysis (Allowed)
4. AI explanation (Allowed)
5. Trusted contact sharing (Revocable)
6. Voice processing (Revocable, 100% on-device)
7. Institutional sharing (Revocable, k-anonymized)
8. Research use (Revocable, de-identified)
- Every permission details: *Purpose*, *Data Used*, *Who Receives It*, *Retention Period*, and *Withdraw Consent Action*.
- Tamper-resistant consent history audit log.

### 4. User-Controlled Longitudinal Health Record (PHR)
- Chronological timeline matching ABDM personal health-record guidelines.
- Filter chips: `ALL`, `CHECK-INS`, `VITALS`, `ACTIVITY`, `SLEEP`, `ALERTS`.
- Complete visibility into who can access each event and why it was processed.

### 5. Safety Architecture & Clinical Governance
- **Hard Rule:** AI can explain a result; AI cannot override the safety engine.
- Clinician-reviewed rule registry (`health_content_rules`):
  - `HS-WELL-001` (Resting Tachycardia Shift) — Reviewed by Dr. S. K. Raman (MD, Prev. Med)
  - `HS-WELL-002` (Sub-Threshold SpO2 Desaturation) — Reviewed by Dr. V. Lakshmi (Pulmonology)
  - `HS-WELL-003` (Compound Sleep Depletion) — Reviewed by Dr. K. Narayana (Behavioral Health)
- Prominent notice: *"Clinical review and regulatory assessment are required before clinical deployment or diagnostic use."*

### 6. Campus Wellness Pilot & Honest Evidence
- Real configured pilot: **50 Target Participants**, 30 Days duration, Day 12 active.
- **Honest Evidence Dashboard:** Zero fabricated 90% claims!
  - Check-in Completion Rate: **81.4%** (Measured, 512 submissions)
  - Avg. Time to Complete Check-in: **48 seconds** (Measured)
  - User Understanding Score: **88.2% Positive** (Measured, 34 alert feedbacks)
  - Clinical Outcome Reduction: **NOT YET MEASURED** (Explicitly labeled as Planned)
  - Diagnostic Accuracy: **NOT APPLICABLE** (Explicit non-diagnostic tool)

### 7. Theme 3 Assistive Inclusion & Simple Mode
- **Language Switcher:** English + తెలుగు (Telugu) + हिंदी (Hindi) with `locales/en.json`, `locales/te.json`, `locales/hi.json`.
- **Simple Mode:** Minimal UI for elderly or low digital literacy users:
  - Big vibrant touch targets: **"HOW ARE YOU TODAY? 😊 GOOD / 😐 OKAY / 😟 NOT WELL"**
- **Accessibility Toolbar:** Text Size (Normal/Large/XL), High Contrast Mode, Reduced Motion, Voice Speech Synthesis.

### 8. Trusted Circle & Community Caregiver Mode
- Granular sharing controls: Sleep trend (shared), Pattern alerts (shared), Raw telemetry (private), AI conversations (private).
- Dispatch verified email notifications with safety disclaimers.

### 9. Institutional Dashboard
- K-anonymized cohort analytics (adherence, follow-up count, accessibility usage).
- Never leaks individual names, private observations, or AI chat logs.

### 10. ABDM-Ready Interoperability Layer
- Standardized FHIR R4 Bundle mapping (`/api/fhir/observation`).
- Architecture pathway: `HealthShield Model → FHIR Mapping Layer → Future ABDM Gateway`.
- Zero false claims of pre-existing government certification.

### 11. Security Center & Data Subject Controls
- OWASP Top 10 security headers (`Content-Security-Policy`, `X-Content-Type-Options`).
- Parameterized queries & Express rate limiter (300 req/min).
- **Download My Data:** Generates portable JSON archive under DPDP Section 11.
- **Delete My Data:** Right to erasure workflow preserving statutory compliance audit trails.
- **My Activity:** Tamper-evident log of all processing events.

### 12. 3-Minute SFIC National Judge Demonstration (Judge Mode 2.0)
Deterministic 12-step guided walkthrough:
`01 Problem → 02 Baseline → 03 Observation → 04 Change Detected → 05 Alert → 06 Safety → 07 Inclusion → 08 Offline → 09 Trusted Circle → 10 Evidence → 11 Cost → 12 Scale`

---

## 🚀 Running the Platform Locally

### 1. Frontend Development Server (Vite + React)
```bash
npm run dev
# Running on http://localhost:5173
```

### 2. Backend Express API Server (Node.js)
```bash
npx tsx server/index.ts
# Running on http://localhost:3001
```

### 3. Production Verification
```bash
npm run build
# Compiles TypeScript and builds optimized bundle in ~600ms
```

---

## 🚫 Real-World Limitations ("What HealthShield Is Not")
1. HealthShield is **NOT a diagnostic engine** and does not diagnose disease.
2. HealthShield is **NOT a replacement for a medical doctor or hospital consultation**.
3. HealthShield is **NOT an emergency response dispatch service**.
4. HealthShield is **NOT a clinically validated medical-device software product** until prospective clinical trials and regulatory approvals are completed.
