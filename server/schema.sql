-- ============================================================================
-- HEALTHSHIELD AI — PHASE 2 PRODUCTION DATABASE SCHEMA
-- Target Engine: PostgreSQL 14+ (Compatible with SQLite in local/demo mode)
-- Standard: DPDP Act (India) compliant consent & ABDM FHIR R4 data model
-- ============================================================================

-- Extensions for UUID support
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & IDENTITY
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'USER', -- USER, CAREGIVER, INSTITUTION_ADMIN, PILOT_ADMIN, SYSTEM_ADMIN
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    display_name VARCHAR(128) NOT NULL,
    age_bracket VARCHAR(32), -- 18-25, 26-40, 41-60, 60+
    preferred_language VARCHAR(10) DEFAULT 'en', -- en, te, hi
    accessibility_mode BOOLEAN DEFAULT FALSE,
    simple_mode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. SESSIONS
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. HEALTH OBSERVATIONS (Provenanced, Granular)
CREATE TABLE IF NOT EXISTS health_observations (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    metric VARCHAR(64) NOT NULL, -- heart_rate, spo2, sleep_hours, steps, hrv, body_temp, respiratory_rate
    value NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(32) NOT NULL, -- BPM, %, hrs, steps, ms, °C, breaths/min
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    source_type VARCHAR(32) NOT NULL, -- MANUAL, SELF_REPORTED, DEVICE, IMPORTED, SIMULATED
    source_name VARCHAR(128) NOT NULL, -- Apple Watch, Manual Check-in, BLE Oximeter, Simulation Engine
    device_id VARCHAR(128),
    quality_status VARCHAR(32) NOT NULL DEFAULT 'VALID', -- VALID, PARTIAL, SUSPICIOUS, REJECTED
    user_consent_context VARCHAR(128) NOT NULL DEFAULT 'wellness_monitoring',
    idempotency_key VARCHAR(128) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_obs_user_metric ON health_observations(user_id, metric, timestamp);

-- 5. DAILY HEALTH CHECKINS
CREATE TABLE IF NOT EXISTS health_checkins (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    checkin_date DATE NOT NULL,
    wellbeing_score VARCHAR(32) NOT NULL, -- GOOD, OKAY, NOT_WELL
    energy_level VARCHAR(32) NOT NULL, -- HIGH, MODERATE, LOW
    stress_level VARCHAR(32) NOT NULL, -- LOW, MODERATE, HIGH
    symptoms_noted TEXT,
    sleep_reported_hours NUMERIC(4, 1),
    source_type VARCHAR(32) NOT NULL DEFAULT 'SELF_REPORTED',
    quality_status VARCHAR(32) NOT NULL DEFAULT 'VALID',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. BASELINE SNAPSHOTS (Calculated rolling baselines)
CREATE TABLE IF NOT EXISTS baseline_snapshots (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    metric VARCHAR(64) NOT NULL,
    baseline_avg NUMERIC(10, 2) NOT NULL,
    baseline_median NUMERIC(10, 2),
    min_value NUMERIC(10, 2) NOT NULL,
    max_value NUMERIC(10, 2) NOT NULL,
    std_dev NUMERIC(10, 2),
    sample_size INT NOT NULL,
    confidence_level VARCHAR(32) NOT NULL, -- NEW (<7 days), LIMITED (7-20 days), ESTABLISHED (21+ days)
    window_days INT NOT NULL DEFAULT 30,
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. PATTERN EVENTS
CREATE TABLE IF NOT EXISTS pattern_events (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    metric VARCHAR(64) NOT NULL,
    current_value NUMERIC(10, 2) NOT NULL,
    baseline_avg NUMERIC(10, 2) NOT NULL,
    delta_absolute NUMERIC(10, 2) NOT NULL,
    delta_percentage NUMERIC(6, 2) NOT NULL,
    pattern_status VARCHAR(32) NOT NULL, -- STABLE, EMERGING_CHANGE, SIGNIFICANT_CHANGE
    confidence_score NUMERIC(4, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. ALERTS (Deterministic, Safety-Engine Governed)
CREATE TABLE IF NOT EXISTS alerts (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rule_id VARCHAR(64) NOT NULL, -- HS-WELL-001, etc.
    severity VARCHAR(32) NOT NULL, -- LOW, MODERATE, HIGH, URGENT
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'TRIGGERED', -- TRIGGERED, ACKNOWLEDGED, RESOLVED, ESCALATED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    acknowledged_at TIMESTAMP WITH TIME ZONE
);

-- 9. ALERT EXPLANATIONS (Structured, Non-Diagnostic)
CREATE TABLE IF NOT EXISTS alert_explanations (
    id VARCHAR(64) PRIMARY KEY,
    alert_id VARCHAR(64) NOT NULL REFERENCES alerts(id) ON DELETE CASCADE,
    observed_changes JSONB NOT NULL,
    why_flagged JSONB NOT NULL,
    recommended_steps JSONB NOT NULL,
    safety_disclaimer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. TRUSTED CONTACTS (Community / Caregiver Circle)
CREATE TABLE IF NOT EXISTS trusted_contacts (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contact_name VARCHAR(128) NOT NULL,
    relation_role VARCHAR(64) NOT NULL, -- FAMILY, CAREGIVER, SUPPORT_PERSON
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(32),
    share_sleep_trend BOOLEAN DEFAULT TRUE,
    share_pattern_alerts BOOLEAN DEFAULT TRUE,
    share_detailed_observations BOOLEAN DEFAULT FALSE, -- Privacy by default!
    share_ai_conversations BOOLEAN DEFAULT FALSE, -- Always private!
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. CONSENTS (DPDP Act Purpose-Based Consent)
CREATE TABLE IF NOT EXISTS consents (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    purpose_key VARCHAR(64) NOT NULL, -- health_observations, daily_checkins, trend_analysis, ai_explanation, trusted_contacts, voice_processing, institutional_sharing, research_analytics
    purpose_title VARCHAR(128) NOT NULL,
    data_categories TEXT NOT NULL,
    recipient_type VARCHAR(128) NOT NULL,
    retention_period VARCHAR(64) NOT NULL,
    is_granted BOOLEAN NOT NULL DEFAULT FALSE,
    granted_at TIMESTAMP WITH TIME ZONE,
    withdrawn_at TIMESTAMP WITH TIME ZONE,
    version VARCHAR(16) NOT NULL DEFAULT 'v1.0',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, purpose_key)
);

-- 12. CONSENT HISTORY (Audit log of consent grants/revocations)
CREATE TABLE IF NOT EXISTS consent_history (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    purpose_key VARCHAR(64) NOT NULL,
    action VARCHAR(32) NOT NULL, -- GRANTED, REVOKED, EXPIRED, UPDATED
    reason TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. DATA ACCESS LOGS
CREATE TABLE IF NOT EXISTS data_access_logs (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    actor_id VARCHAR(64) NOT NULL,
    actor_role VARCHAR(32) NOT NULL,
    resource_accessed VARCHAR(128) NOT NULL,
    access_purpose VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. AUDIT EVENTS (Tamper-Resistant Log for User "My Activity" & Admin)
CREATE TABLE IF NOT EXISTS audit_events (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64),
    event_type VARCHAR(64) NOT NULL, -- CHECKIN_SAVED, BASELINE_RECALCULATED, CONSENT_CHANGED, CONTACT_NOTIFIED, DATA_EXPORTED, DELETION_REQUESTED
    description TEXT NOT NULL,
    metadata JSONB,
    actor_ip VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. NOTIFICATION PREFERENCES
CREATE TABLE IF NOT EXISTS notification_preferences (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email_enabled BOOLEAN DEFAULT TRUE,
    sms_enabled BOOLEAN DEFAULT FALSE,
    urgent_alerts_only BOOLEAN DEFAULT FALSE,
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. DEVICE CONNECTIONS
CREATE TABLE IF NOT EXISTS device_connections (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_name VARCHAR(128) NOT NULL,
    device_type VARCHAR(64) NOT NULL, -- SMARTWATCH, BLE_OXIMETER, BP_CUFF, SIMULATOR
    connection_status VARCHAR(32) NOT NULL DEFAULT 'CONNECTED', -- CONNECTED, DISCONNECTED, ERROR
    last_synced_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. DEVICE OBSERVATIONS (Raw stage before normalizer)
CREATE TABLE IF NOT EXISTS device_observations (
    id VARCHAR(64) PRIMARY KEY,
    device_id VARCHAR(64) NOT NULL REFERENCES device_connections(id) ON DELETE CASCADE,
    raw_payload JSONB NOT NULL,
    normalized_status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. PILOT PROGRAMS (Campus & Institutional Pilots)
CREATE TABLE IF NOT EXISTS pilot_programs (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    cohort_name VARCHAR(128) NOT NULL,
    target_participants INT NOT NULL,
    duration_days INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'PLANNED', -- PLANNED, ACTIVE, PAUSED, COMPLETED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 19. PILOT PARTICIPANTS
CREATE TABLE IF NOT EXISTS pilot_participants (
    id VARCHAR(64) PRIMARY KEY,
    pilot_id VARCHAR(64) NOT NULL REFERENCES pilot_programs(id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_signed BOOLEAN NOT NULL DEFAULT FALSE,
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    active_days_count INT DEFAULT 0,
    checkins_completed INT DEFAULT 0,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 20. PILOT EVENTS
CREATE TABLE IF NOT EXISTS pilot_events (
    id VARCHAR(64) PRIMARY KEY,
    pilot_id VARCHAR(64) NOT NULL REFERENCES pilot_programs(id) ON DELETE CASCADE,
    event_name VARCHAR(128) NOT NULL,
    metric_value NUMERIC(10, 2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 21. FEEDBACK (User Feedback Loop on Explanations & Next Steps)
CREATE TABLE IF NOT EXISTS feedback (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    alert_id VARCHAR(64) REFERENCES alerts(id) ON DELETE SET NULL,
    was_explanation_helpful VARCHAR(16) NOT NULL, -- YES, PARTLY, NO
    was_next_step_clear VARCHAR(16) NOT NULL, -- YES, NO
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 22. ACCESSIBILITY & LANGUAGE PREFERENCES
CREATE TABLE IF NOT EXISTS accessibility_preferences (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    text_size VARCHAR(16) DEFAULT 'NORMAL', -- NORMAL, LARGE, XL
    contrast VARCHAR(16) DEFAULT 'NORMAL', -- NORMAL, HIGH
    motion VARCHAR(16) DEFAULT 'NORMAL', -- NORMAL, REDUCED
    voice_enabled BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS language_preferences (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    language_code VARCHAR(10) DEFAULT 'en', -- en, te, hi
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 23. DATA EXPORTS
CREATE TABLE IF NOT EXISTS data_exports (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    format VARCHAR(16) NOT NULL, -- JSON, CSV
    status VARCHAR(32) NOT NULL DEFAULT 'COMPLETED',
    download_url TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 24. DELETION REQUESTS
CREATE TABLE IF NOT EXISTS deletion_requests (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'REQUESTED', -- REQUESTED, PROCESSING, COMPLETED, AUDIT_PRESERVED
    reason TEXT,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 25. CLINICAL HEALTH CONTENT GOVERNANCE
CREATE TABLE IF NOT EXISTS health_content_rules (
    rule_id VARCHAR(64) PRIMARY KEY,
    version VARCHAR(16) NOT NULL,
    title VARCHAR(255) NOT NULL,
    approved_text TEXT NOT NULL,
    risk_level VARCHAR(32) NOT NULL, -- LOW, MODERATE, HIGH
    source_reference VARCHAR(255) NOT NULL,
    reviewer_name VARCHAR(128) NOT NULL,
    review_date DATE NOT NULL,
    next_review_date DATE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'APPROVED' -- DRAFT, UNDER_REVIEW, APPROVED, RETIRED
);

-- Pre-seed Approved Content Governance Rules
INSERT INTO health_content_rules (rule_id, version, title, approved_text, risk_level, source_reference, reviewer_name, review_date, next_review_date, status)
VALUES
('HS-WELL-001', '1.2', 'Prolonged Resting Tachycardia Shift', 'Resting heart rate has remained significantly above your 30-day baseline for multiple consecutive readings. Consider resting in a quiet posture, hydrating, and consulting a healthcare professional if accompanied by dizziness or shortness of breath.', 'MODERATE', 'AHA 2024 Resting HR Guidelines / ICMR Wellness Protocols', 'Dr. S. K. Raman (MD, Prev. Med)', '2026-09-15', '2027-09-15', 'APPROVED'),
('HS-WELL-002', '1.1', 'Sub-Threshold SpO2 Desaturation', 'Oxygen saturation has trended lower than your personal baseline range. Verify sensor fit on clean, warm fingers. If reading remains below 94% or you experience difficulty breathing, seek immediate medical evaluation.', 'HIGH', 'WHO Pulse Oximetry Guidelines & ICMR COVID-19 Home Care', 'Dr. V. Lakshmi (Pulmonology)', '2026-09-20', '2027-09-20', 'APPROVED'),
('HS-WELL-003', '1.0', 'Compound Sleep & Activity Depletion', 'Multiple days of short sleep (<5.5h) coupled with marked step count reduction indicate cumulative physical fatigue and decreased recovery capacity. Plan an early bedtime and lighter physical exertion.', 'LOW', 'National Sleep Foundation & CDC Healthy Living Standards', 'Dr. K. Narayana (Behavioral Health)', '2026-10-01', '2027-10-01', 'APPROVED')
ON CONFLICT (rule_id) DO NOTHING;
