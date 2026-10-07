import React, { useState, useEffect } from 'react';
import { MedivoraDashboard } from './pages/MedivoraDashboard';
import { AlexHealthReplica } from './pages/AlexHealthReplica';
import { VitalStatsReplica } from './pages/VitalStatsReplica';
import { PulseIQReplica } from './pages/PulseIQReplica';
import { HealthSyncReplica } from './pages/HealthSyncReplica';
import { CommandCenter } from './pages/CommandCenter';
import { MyBaseline } from './pages/MyBaseline';
import { DailyCheck } from './pages/DailyCheck';
import { ExplainableAlert } from './pages/ExplainableAlert';
import { TechnologyPage } from './pages/TechnologyPage';
import { ImpactPage } from './pages/ImpactPage';

// Phase 2 New Pages
import { PersonalHealthRecord } from './pages/PersonalHealthRecord';
import { ConsentCenter } from './pages/ConsentCenter';
import { SimpleMode } from './pages/SimpleMode';
import { TrustedCircle } from './pages/TrustedCircle';
import { InstitutionalView } from './pages/InstitutionalView';
import { PilotCenter } from './pages/PilotCenter';
import { SecurityCenter } from './pages/SecurityCenter';
import { CostModel } from './pages/CostModel';
import { DeploymentReadiness } from './pages/DeploymentReadiness';

import { INITIAL_METRICS, INITIAL_CHECKIN, GENERATE_30_DAY_HISTORY } from './data/mockData';
import type { MetricData, CheckInState } from './types/health';
import { evaluateHealthPattern } from './engine/baselineEngine';
import { JudgeDemoModal2 } from './components/JudgeDemoModal2';
import { EmergencyModal } from './components/EmergencyModal';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { offlineStorage } from './engine/offlineStorage';
import type { SyncState } from './engine/offlineStorage';

const MainAppContent: React.FC = () => {
  const { t } = useLanguage();
  // Default directly to Medivora AI replica (Image 5)
  const [activeView, setActiveView] = useState<'medivora' | 'alex' | 'vitalstats' | 'pulseiq' | 'healthsync' | 'sfic_command' | 'simple_mode'>('medivora');
  const [sficTab, setSficTab] = useState<string>('command');
  
  // State for SFIC engine
  const [metrics, setMetrics] = useState<MetricData[]>(INITIAL_METRICS);
  const [checkIn, setCheckIn] = useState<CheckInState>(INITIAL_CHECKIN);
  const [history] = useState(() => GENERATE_30_DAY_HISTORY());
  const [isJudgeDemoOpen, setIsJudgeDemoOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);

  // Offline status tracking
  const [syncState, setSyncState] = useState<SyncState>('SYNC_COMPLETE');
  const [pendingCount, setPendingCount] = useState<number>(0);

  useEffect(() => {
    const unsub = offlineStorage.subscribe((state, count) => {
      setSyncState(state);
      setPendingCount(count);
    });
    return unsub;
  }, []);

  const evalResult = React.useMemo(() => {
    return evaluateHealthPattern(metrics, checkIn);
  }, [metrics, checkIn]);

  const anomalyReport = React.useMemo(() => {
    return {
      overallRiskScore: evalResult.divergenceScore,
      divergenceLevel: evalResult.severity,
      flaggedMetrics: evalResult.deltaSummary.map(d => `${d.metric} (${d.change})`),
      clinicalRationale: evalResult.rationale,
      boundaryWarning: 'Clinical Guardrail: HealthShield AI is not a diagnostic device. It detects early deviations from personal baselines to prompt timely, safe preventive care before acute escalation.',
      ruleTriggered: {
        id: evalResult.triggeredRuleId,
        name: evalResult.ruleName,
        condition: 'Multi-parameter covariance shift over 48h rolling window',
        action: evalResult.ruleAction
      },
      recommendedSteps: evalResult.nextSteps.map((s, idx) => ({
        priority: idx + 1,
        title: s.title,
        description: s.desc,
        urgency: s.urgency
      }))
    };
  }, [evalResult]);

  const handleCheckInSubmit = (newCheckIn: CheckInState) => {
    setCheckIn(newCheckIn);
    setMetrics(prev => prev.map(m => {
      if (m.id === 'sleep') {
        const delta = ((newCheckIn.sleepHours - m.baselineAvg) / m.baselineAvg) * 100;
        return {
          ...m,
          todayValue: newCheckIn.sleepHours,
          deltaPercent: parseFloat(delta.toFixed(1)),
          status: newCheckIn.sleepHours < 6.0 ? 'changed' : 'stable'
        };
      }
      return m;
    }));

    offlineStorage.enqueue('CHECKIN', {
      ...newCheckIn,
      submittedAt: new Date().toISOString()
    });
  };

  const currentHr = metrics.find(m => m.id === 'heart_rate')?.todayValue || 72;
  const currentSpo2 = metrics.find(m => m.id === 'spo2')?.todayValue || 98;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#F4F7FC' }}>
      
      {/* ================= ACCESSIBILITY & MULTILINGUAL TOOLBAR ================= */}
      <AccessibilityToolbar
        onToggleSimpleMode={() => {
          if (activeView === 'simple_mode') {
            setActiveView('sfic_command');
          } else {
            setActiveView('simple_mode');
          }
        }}
        isSimpleMode={activeView === 'simple_mode'}
      />

      {/* ================= FLOATING REPLICA VIEW SWITCHER BAR ================= */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: 24, 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(16px)',
          borderRadius: 40,
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.15)',
          maxWidth: '96vw',
          overflowX: 'auto'
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', padding: '0 8px', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
          VIEWS:
        </span>

        {/* Medivora AI (Image 5 Replica) */}
        <button
          onClick={() => setActiveView('medivora')}
          style={{
            background: activeView === 'medivora' ? '#2563EB' : 'transparent',
            color: activeView === 'medivora' ? '#FFFFFF' : '#CBD5E1',
            border: 'none',
            borderRadius: 20,
            padding: '8px 14px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap'
          }}
        >
          <span>🏥</span>
          <span>Medivora (Img 5)</span>
        </button>

        {/* Alex Health Monitoring (Image 2 Replica) */}
        <button
          onClick={() => setActiveView('alex')}
          style={{
            background: activeView === 'alex' ? '#4F46E5' : 'transparent',
            color: activeView === 'alex' ? '#FFFFFF' : '#CBD5E1',
            border: 'none',
            borderRadius: 20,
            padding: '8px 14px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap'
          }}
        >
          <span>🧍</span>
          <span>Alex (Img 2)</span>
        </button>

        {/* Vital Stats & Activity (Image 1 Replica) */}
        <button
          onClick={() => setActiveView('vitalstats')}
          style={{
            background: activeView === 'vitalstats' ? '#1E3A8A' : 'transparent',
            color: activeView === 'vitalstats' ? '#FFFFFF' : '#CBD5E1',
            border: 'none',
            borderRadius: 20,
            padding: '8px 14px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap'
          }}
        >
          <span>📊</span>
          <span>Vital Stats (Img 1)</span>
        </button>

        {/* PulseIQ Pro (Image 4 Replica) */}
        <button
          onClick={() => setActiveView('pulseiq')}
          style={{
            background: activeView === 'pulseiq' ? '#0EA47A' : 'transparent',
            color: activeView === 'pulseiq' ? '#FFFFFF' : '#CBD5E1',
            border: 'none',
            borderRadius: 20,
            padding: '8px 14px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap'
          }}
        >
          <span>🧠</span>
          <span>PulseIQ (Img 4)</span>
        </button>

        {/* HealthSync (Image 3 Replica) */}
        <button
          onClick={() => setActiveView('healthsync')}
          style={{
            background: activeView === 'healthsync' ? '#22C55E' : 'transparent',
            color: activeView === 'healthsync' ? '#FFFFFF' : '#CBD5E1',
            border: 'none',
            borderRadius: 20,
            padding: '8px 14px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap'
          }}
        >
          <span>🌿</span>
          <span>HealthSync (Img 3)</span>
        </button>

        {/* SFIC HealthShield Phase 2 Platform */}
        <button
          onClick={() => setActiveView('sfic_command')}
          style={{
            background: activeView === 'sfic_command' ? '#7C3AED' : 'transparent',
            color: activeView === 'sfic_command' ? '#FFFFFF' : '#CBD5E1',
            border: 'none',
            borderRadius: 20,
            padding: '8px 14px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap'
          }}
        >
          <span>🛡️</span>
          <span>SFIC Phase 2 Platform</span>
        </button>
      </div>

      {/* ================= ACTIVE VIEW CONTENT ================= */}
      {activeView === 'medivora' && <MedivoraDashboard />}
      {activeView === 'alex' && <AlexHealthReplica />}
      {activeView === 'vitalstats' && <VitalStatsReplica />}
      {activeView === 'pulseiq' && <PulseIQReplica />}
      {activeView === 'healthsync' && <HealthSyncReplica />}

      {/* Simple Mode View (Point 11 & 21) */}
      {activeView === 'simple_mode' && (
        <SimpleMode
          onBackToStandard={() => setActiveView('sfic_command')}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
        />
      )}

      {/* SFIC HealthShield Phase 2 Engine View */}
      {activeView === 'sfic_command' && (
        <div>
          {/* Sub Navigation Bar for SFIC Engine */}
          <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#7C3AED', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 18 }}>🛡️</span>
              </div>
              <div>
                <strong style={{ fontSize: 15, color: '#0F172A', display: 'block' }}>{t('app_title')} • Phase 2 Platform</strong>
                <span style={{ fontSize: 11, color: '#64748B' }}>Personal Baseline • DPDP Act Consent • ABDM Ready</span>
              </div>
            </div>

            {/* Comprehensive Phase 2 Navigation Tabs */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {[
                { id: 'command', label: 'Command' },
                { id: 'record', label: 'Health Record' },
                { id: 'baseline', label: 'Baseline' },
                { id: 'checkin', label: 'Check-in' },
                { id: 'alert', label: 'Alert' },
                { id: 'consent', label: 'Consent' },
                { id: 'circle', label: 'Trusted Circle' },
                { id: 'pilot', label: 'Pilot & Evidence' },
                { id: 'institutional', label: 'Institutions' },
                { id: 'security', label: 'Security & Audit' },
                { id: 'cost', label: 'Cost & Scale' },
                { id: 'readiness', label: 'Readiness' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setSficTab(t.id)}
                  style={{
                    background: sficTab === t.id ? '#F5F3FF' : 'transparent',
                    color: sficTab === t.id ? '#7C3AED' : '#64748B',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 10px',
                    fontSize: 12,
                    fontWeight: sficTab === t.id ? 800 : 600,
                    cursor: 'pointer'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Offline Sync State Badge & Evaluator Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Offline Sync Indicator */}
              <div 
                style={{
                  background: syncState === 'SYNC_COMPLETE' ? '#ECFDF5' : syncState === 'SYNCING' ? '#EFF6FF' : '#FFFBEB',
                  color: syncState === 'SYNC_COMPLETE' ? '#065F46' : syncState === 'SYNCING' ? '#1E40AF' : '#92400E',
                  border: '1px solid currentColor',
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontSize: 11,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
                title={pendingCount > 0 ? `${pendingCount} actions queued for sync` : 'All local events synced'}
              >
                <span>{syncState === 'SYNC_COMPLETE' ? '● Synced' : syncState === 'SYNCING' ? '⏳ Syncing...' : '⚠️ Local Queue'}</span>
              </div>

              {/* Local Qwen2.5 GGUF Model Indicator */}
              <div 
                style={{
                  background: '#F5F3FF',
                  color: '#6D28D9',
                  border: '1px solid #DDD6FE',
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontSize: 11,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
                title="Powered by local on-device model: Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf"
              >
                <span>🤖</span>
                <span>Qwen2.5 Local GGUF</span>
              </div>

              <button 
                onClick={() => setIsJudgeDemoOpen(true)}
                style={{ background: '#7C3AED', color: '#FFF', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <span>🏆</span>
                <span>Judge Demo 2.0</span>
              </button>
              <button 
                onClick={() => setIsEmergencyOpen(true)}
                style={{ background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
              >
                Emergency
              </button>
            </div>
          </div>

          {/* Tab Renderers */}
          {sficTab === 'command' && (
            <CommandCenter 
              metrics={metrics} 
              checkIn={checkIn} 
              anomalyReport={anomalyReport} 
              onNavigate={(t) => setSficTab(t)} 
              onOpenEmergency={() => setIsEmergencyOpen(true)} 
            />
          )}
          {sficTab === 'record' && <PersonalHealthRecord />}
          {sficTab === 'baseline' && (
            <MyBaseline 
              metrics={metrics} 
              history={history} 
              onNavigate={(t) => setSficTab(t)} 
            />
          )}
          {sficTab === 'checkin' && (
            <DailyCheck 
              initialCheckIn={checkIn} 
              onSubmitCheckIn={handleCheckInSubmit} 
              onNavigate={(t) => setSficTab(t)} 
            />
          )}
          {sficTab === 'alert' && (
            <ExplainableAlert 
              anomalyReport={anomalyReport} 
              metrics={metrics} 
              onNavigate={(t) => setSficTab(t)} 
              onOpenEmergency={() => setIsEmergencyOpen(true)} 
            />
          )}
          {sficTab === 'consent' && <ConsentCenter />}
          {sficTab === 'circle' && <TrustedCircle />}
          {sficTab === 'pilot' && <PilotCenter />}
          {sficTab === 'institutional' && <InstitutionalView />}
          {sficTab === 'security' && <SecurityCenter />}
          {sficTab === 'cost' && <CostModel />}
          {sficTab === 'readiness' && <DeploymentReadiness />}
          {sficTab === 'technology' && <TechnologyPage onNavigate={(t) => setSficTab(t)} />}
          {sficTab === 'impact' && <ImpactPage onNavigate={(t) => setSficTab(t)} />}
        </div>
      )}

      {/* Evaluator Modals */}
      <JudgeDemoModal2
        isOpen={isJudgeDemoOpen}
        onClose={() => setIsJudgeDemoOpen(false)}
        onJumpToTab={(tab) => {
          setActiveView('sfic_command');
          setSficTab(tab);
        }}
      />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        heartRate={currentHr}
        spo2={currentSpo2}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
};

export default App;
