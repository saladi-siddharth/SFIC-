import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { MedivoraDashboard } from './pages/MedivoraDashboard';
import { HealthChangeLab } from './pages/HealthChangeLab';
import { IncidentReplay } from './pages/IncidentReplay';
import { PatternExplorer } from './pages/PatternExplorer';
import { MyBaseline } from './pages/MyBaseline';
import { DailyCheck } from './pages/DailyCheck';
import { ExplainableAlert } from './pages/ExplainableAlert';
import { PersonalHealthRecord } from './pages/PersonalHealthRecord';
import { PilotCenter } from './pages/PilotCenter';
import { CostModel } from './pages/CostModel';
import { ConsentCenter } from './pages/ConsentCenter';
import { SimpleMode } from './pages/SimpleMode';
import { TechnologyPage } from './pages/TechnologyPage';
import { ImpactPage } from './pages/ImpactPage';

import { INITIAL_METRICS, INITIAL_CHECKIN, GENERATE_30_DAY_HISTORY } from './data/mockData';
import type { MetricData, CheckInState } from './types/health';
import { evaluateHealthPattern } from './engine/baselineEngine';
import { JudgeDemoModal2 } from './components/JudgeDemoModal2';
import { EmergencyModal } from './components/EmergencyModal';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { LanguageProvider } from './i18n/LanguageContext';
import { offlineStorage } from './engine/offlineStorage';
import type { SyncState } from './engine/offlineStorage';

const MainAppContent: React.FC = () => {
  // Single Unified Navigation State (Defaults to 1st Dashboard from Image 5)
  const [currentTab, setCurrentTab] = useState<
    'home' | 'dashboard' | 'lab' | 'replay' | 'baseline' | 'checkin' | 'alert' | 'explorer' | 'record' | 'pilot' | 'cost' | 'consent' | 'simple' | 'technology' | 'impact'
  >('dashboard');
  
  // State for SFIC Preventive Baseline Engine
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

  const handleJumpToTab = (target: string) => {
    const tabMap: Record<string, typeof currentTab> = {
      command: 'dashboard',
      dashboard: 'dashboard',
      lab: 'lab',
      replay: 'replay',
      timeline: 'replay',
      baseline: 'baseline',
      checkin: 'checkin',
      alert: 'alert',
      explorer: 'explorer',
      record: 'record',
      consent: 'consent',
      security: 'consent',
      pilot: 'pilot',
      circle: 'pilot',
      cost: 'cost',
      simple: 'simple',
      technology: 'technology',
      impact: 'impact'
    };
    if (tabMap[target]) {
      setCurrentTab(tabMap[target]);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#F8FAFC' }}>
      
      {/* ================= ACCESSIBILITY & MULTILINGUAL TOOLBAR ================= */}
      <AccessibilityToolbar
        onToggleSimpleMode={() => {
          if (currentTab === 'simple') {
            setCurrentTab('dashboard');
          } else {
            setCurrentTab('simple');
          }
        }}
        isSimpleMode={currentTab === 'simple'}
      />

      {/* ================= PRIMARY HEALTHSHIELD NAVIGATION HEADER ================= */}
      <header 
        style={{ 
          background: '#FFFFFF', 
          borderBottom: '1px solid #E2E8F0', 
          padding: '10px 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          position: 'sticky', 
          top: 0, 
          zIndex: 50,
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}
      >
        {/* Brand & Tagline */}
        <div 
          onClick={() => setCurrentTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <div 
            style={{ 
              width: 38, 
              height: 38, 
              borderRadius: 10, 
              background: 'linear-gradient(135deg, #0EA47A, #00513A)', 
              color: '#FFFFFF', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 20,
              boxShadow: '0 4px 10px rgba(14, 164, 122, 0.3)'
            }}
          >
            🛡️
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 17, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
                HealthShield AI
              </span>
              <span style={{ fontSize: 10, fontWeight: 800, background: '#EFF6FF', color: '#2563EB', padding: '2px 6px', borderRadius: 6, border: '1px solid #BFDBFE' }}>
                THEME 3
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
              Personal Preventive Health Intelligence
            </div>
          </div>
        </div>

        {/* Primary Navigation Tabs Focused Strictly on Problem & Solution */}
        <nav style={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { id: 'home', label: 'Home', icon: 'home' },
            { id: 'dashboard', label: 'Health Command', icon: 'dashboard', badge: '1st Dash' },
            { id: 'lab', label: 'Change Lab', icon: 'biotech' },
            { id: 'replay', label: 'Incident Replay', icon: 'history' },
            { id: 'baseline', label: 'My Baseline', icon: 'stacked_line_chart' },
            { id: 'checkin', label: 'Daily Check', icon: 'fact_check' },
            { id: 'alert', label: 'Change Explained', icon: 'warning' },
            { id: 'explorer', label: 'Pattern Explorer', icon: 'monitoring' },
            { id: 'record', label: 'Health Record', icon: 'folder_shared' },
            { id: 'pilot', label: 'Pilot Evidence', icon: 'verified' },
            { id: 'cost', label: 'Cost & Scale', icon: 'payments' },
          ].map(tab => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                style={{
                  background: isActive ? '#E6F7F1' : 'transparent',
                  color: isActive ? '#00694D' : '#475569',
                  border: 'none',
                  borderRadius: 8,
                  padding: '7px 11px',
                  fontSize: 12,
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span style={{ fontSize: 9, background: '#2563EB', color: '#FFF', borderRadius: 4, padding: '1px 4px', fontWeight: 800 }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Evaluator & Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Offline Sync Status Badge */}
          <div 
            style={{
              background: syncState === 'SYNC_COMPLETE' ? '#ECFDF5' : syncState === 'SYNCING' ? '#EFF6FF' : '#FFFBEB',
              color: syncState === 'SYNC_COMPLETE' ? '#065F46' : syncState === 'SYNCING' ? '#1E40AF' : '#92400E',
              border: '1px solid currentColor',
              borderRadius: 8,
              padding: '4px 8px',
              fontSize: 11,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
            title={pendingCount > 0 ? `${pendingCount} events pending sync` : '100% on-device synced'}
          >
            <span>{syncState === 'SYNC_COMPLETE' ? '● Synced' : syncState === 'SYNCING' ? '⏳ Syncing' : '⚠️ Offline'}</span>
          </div>

          {/* Local Qwen2.5 GGUF Model Badge */}
          <div 
            style={{
              background: '#F5F3FF',
              color: '#6D28D9',
              border: '1px solid #DDD6FE',
              borderRadius: 8,
              padding: '4px 8px',
              fontSize: 11,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
            title="Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf running on-device"
          >
            <span>🤖</span>
            <span>Qwen2.5 Local</span>
          </div>

          {/* JUDGE MODE / LIVE DEMO Button */}
          <button 
            onClick={() => setIsJudgeDemoOpen(true)}
            style={{ 
              background: 'linear-gradient(135deg, #0EA47A, #00513A)', 
              color: '#FFF', 
              border: 'none', 
              borderRadius: 8, 
              padding: '7px 14px', 
              fontSize: 12, 
              fontWeight: 800, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6,
              boxShadow: '0 2px 8px rgba(14, 164, 122, 0.25)'
            }}
          >
            <span>▶</span>
            <span>JUDGE DEMO</span>
          </button>

          {/* Emergency Trigger */}
          <button 
            onClick={() => setIsEmergencyOpen(true)}
            style={{ 
              background: '#FEE2E2', 
              color: '#DC2626', 
              border: '1px solid #FECACA', 
              borderRadius: 8, 
              padding: '7px 12px', 
              fontSize: 12, 
              fontWeight: 700, 
              cursor: 'pointer' 
            }}
          >
            Emergency
          </button>
        </div>
      </header>

      {/* ================= ACTIVE VIEW CONTENT ================= */}
      {currentTab === 'home' && (
        <HomePage 
          metrics={metrics}
          onLaunchDemo={() => setIsJudgeDemoOpen(true)}
          onNavigate={(tab) => handleJumpToTab(tab)}
        />
      )}

      {currentTab === 'dashboard' && <MedivoraDashboard />}

      {currentTab === 'lab' && <HealthChangeLab />}

      {currentTab === 'replay' && <IncidentReplay />}

      {currentTab === 'baseline' && (
        <MyBaseline 
          metrics={metrics} 
          history={history} 
          onNavigate={(t) => handleJumpToTab(t)} 
        />
      )}

      {currentTab === 'checkin' && (
        <DailyCheck 
          initialCheckIn={checkIn} 
          onSubmitCheckIn={handleCheckInSubmit} 
          onNavigate={(t) => handleJumpToTab(t)} 
        />
      )}

      {currentTab === 'alert' && (
        <ExplainableAlert 
          anomalyReport={anomalyReport} 
          metrics={metrics} 
          onNavigate={(t) => handleJumpToTab(t)} 
          onOpenEmergency={() => setIsEmergencyOpen(true)} 
        />
      )}

      {currentTab === 'explorer' && <PatternExplorer />}

      {currentTab === 'record' && <PersonalHealthRecord />}

      {currentTab === 'pilot' && <PilotCenter />}

      {currentTab === 'cost' && <CostModel />}

      {currentTab === 'consent' && <ConsentCenter />}

      {currentTab === 'technology' && <TechnologyPage onNavigate={(t) => handleJumpToTab(t)} />}

      {currentTab === 'impact' && <ImpactPage onNavigate={(t) => handleJumpToTab(t)} />}

      {currentTab === 'simple' && (
        <SimpleMode
          onBackToStandard={() => setCurrentTab('dashboard')}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
        />
      )}

      {/* ================= EVALUATOR MODALS ================= */}
      <JudgeDemoModal2
        isOpen={isJudgeDemoOpen}
        onClose={() => setIsJudgeDemoOpen(false)}
        onJumpToTab={(tab) => {
          handleJumpToTab(tab);
          setIsJudgeDemoOpen(false);
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
