import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { HealthChangeLab } from './pages/HealthChangeLab';
import { HealthTimeline } from './pages/HealthTimeline';
import { PatternExplorer } from './pages/PatternExplorer';
import { MyBaseline } from './pages/MyBaseline';
import { DailyCheck } from './pages/DailyCheck';
import { ExplainableAlert } from './pages/ExplainableAlert';
import { PersonalHealthRecord } from './pages/PersonalHealthRecord';
import { PilotCenter } from './pages/PilotCenter';
import { CostModel } from './pages/CostModel';
import { ConsentCenter } from './pages/ConsentCenter';
import { TrustedCircle } from './pages/TrustedCircle';
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

export type AppTab = 
  | 'home' 
  | 'baseline' 
  | 'checkin' 
  | 'lab' 
  | 'alert' 
  | 'record' 
  | 'timeline' 
  | 'pilot' 
  | 'cost' 
  | 'consent' 
  | 'circle' 
  | 'technology' 
  | 'impact' 
  | 'explorer' 
  | 'simple';

const MainAppContent: React.FC = () => {
  // Primary navigation defaults to Home page
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);
  
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
      patternStatus: evalResult.patternStatus,
      flaggedSignalsCount: evalResult.flaggedSignalsCount,
      divergenceLevel: evalResult.severity,
      flaggedMetrics: evalResult.deltaSummary.map(d => `${d.metric} (${d.change})`),
      clinicalRationale: evalResult.rationale,
      boundaryWarning: 'Safety Safeguard: HealthShield AI is not a diagnostic device. It detects early deviations from personal baselines to prompt timely, safe preventive awareness.',
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
    setIsMoreMenuOpen(false);
    const tabMap: Record<string, AppTab> = {
      home: 'home',
      dashboard: 'home',
      command: 'home',
      lab: 'lab',
      changelab: 'lab',
      replay: 'timeline',
      timeline: 'timeline',
      baseline: 'baseline',
      checkin: 'checkin',
      check: 'checkin',
      alert: 'alert',
      explained: 'alert',
      explorer: 'explorer',
      record: 'record',
      pilot: 'pilot',
      evidence: 'pilot',
      cost: 'cost',
      scale: 'cost',
      consent: 'consent',
      privacy: 'consent',
      circle: 'circle',
      technology: 'technology',
      tech: 'technology',
      impact: 'impact',
      simple: 'simple'
    };
    if (tabMap[target]) {
      setCurrentTab(tabMap[target]);
    }
  };

  const PRIMARY_NAV = [
    { id: 'home' as AppTab, label: 'Home' },
    { id: 'baseline' as AppTab, label: 'My Baseline' },
    { id: 'checkin' as AppTab, label: 'Health Check' },
    { id: 'lab' as AppTab, label: 'Change Lab', badge: 'Demo' },
    { id: 'alert' as AppTab, label: 'Change Explained' },
    { id: 'record' as AppTab, label: 'Health Record' }
  ];

  const MORE_NAV = [
    { id: 'timeline' as AppTab, label: 'Health Timeline', icon: '🕒' },
    { id: 'pilot' as AppTab, label: 'Pilot Evidence', icon: '📋' },
    { id: 'cost' as AppTab, label: 'Cost & Scale (SFIC Criteria)', icon: '📊' },
    { id: 'technology' as AppTab, label: 'Technology Architecture', icon: '⚙️' },
    { id: 'consent' as AppTab, label: 'Privacy & DPDP Act', icon: '🔒' },
    { id: 'circle' as AppTab, label: 'Trusted Circle', icon: '👥' },
    { id: 'impact' as AppTab, label: 'Beneficiary Impact', icon: '🌱' },
    { id: 'explorer' as AppTab, label: 'Pattern Explorer', icon: '📈' }
  ];

  const isMoreActive = MORE_NAV.some(m => m.id === currentTab);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#F8FAFC' }}>
      
      {/* ================= ACCESSIBILITY & MULTILINGUAL TOOLBAR ================= */}
      <AccessibilityToolbar
        onToggleSimpleMode={() => {
          if (currentTab === 'simple') {
            setCurrentTab('home');
          } else {
            setCurrentTab('simple');
          }
        }}
        isSimpleMode={currentTab === 'simple'}
      />

      {/* ================= STREAMLINED HEALTHSHIELD NAVIGATION HEADER ================= */}
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

        {/* Primary Navigation Tabs */}
        <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {PRIMARY_NAV.map(tab => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setIsMoreMenuOpen(false);
                }}
                style={{
                  background: isActive ? '#E6F7F1' : 'transparent',
                  color: isActive ? '#00694D' : '#475569',
                  border: 'none',
                  borderRadius: 8,
                  padding: '7px 12px',
                  fontSize: 13,
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
                  <span style={{ fontSize: 9, background: '#10B981', color: '#FFF', borderRadius: 4, padding: '1px 5px', fontWeight: 800 }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* More Menu Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsMoreMenuOpen(prev => !prev)}
              style={{
                background: isMoreActive ? '#E6F7F1' : isMoreMenuOpen ? '#F1F5F9' : 'transparent',
                color: isMoreActive ? '#00694D' : '#475569',
                border: 'none',
                borderRadius: 8,
                padding: '7px 12px',
                fontSize: 13,
                fontWeight: isMoreActive ? 800 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <span>More</span>
              <span style={{ fontSize: 10 }}>{isMoreMenuOpen ? '▲' : '▼'}</span>
            </button>

            {isMoreMenuOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 6,
                  width: 240,
                  background: '#FFFFFF',
                  borderRadius: 12,
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                  border: '1px solid #E2E8F0',
                  padding: '6px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                {MORE_NAV.map(item => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id);
                        setIsMoreMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: isActive ? '#E6F7F1' : 'transparent',
                        color: isActive ? '#00694D' : '#334155',
                        border: 'none',
                        fontSize: 12,
                        fontWeight: isActive ? 800 : 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span style={{ fontSize: 14 }}>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right side controls: Offline Sync + On-Device AI + Judge Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Offline Sync Status Badge */}
          <div 
            style={{
              background: syncState === 'SYNC_COMPLETE' ? '#ECFDF5' : syncState === 'SYNCING' ? '#EFF6FF' : '#FFFBEB',
              color: syncState === 'SYNC_COMPLETE' ? '#065F46' : syncState === 'SYNCING' ? '#1E40AF' : '#92400E',
              border: '1px solid currentColor',
              borderRadius: 8,
              padding: '5px 9px',
              fontSize: 11,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
            title={pendingCount > 0 ? `${pendingCount} events queued for local sync` : 'Offline-first • User data controlled on device'}
          >
            <span>{syncState === 'SYNC_COMPLETE' ? '● Synced' : syncState === 'SYNCING' ? '⏳ Syncing' : '⚠️ Offline'}</span>
          </div>

          {/* On-Device AI Badge (Deterministic Engine + AI Explainer) */}
          <div 
            onClick={() => handleJumpToTab('technology')}
            style={{
              background: '#F5F3FF',
              color: '#6D28D9',
              border: '1px solid #DDD6FE',
              borderRadius: 8,
              padding: '5px 9px',
              fontSize: 11,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer'
            }}
            title="On-device AI: Used strictly for explanation and accessibility. Pattern detection remains deterministic."
          >
            <span>🤖</span>
            <span>ON-DEVICE AI</span>
          </div>

          {/* JUDGE MODE / 90s Story Demo Button */}
          <button 
            onClick={() => setIsJudgeDemoOpen(true)}
            style={{ 
              background: 'linear-gradient(135deg, #0EA47A, #00513A)', 
              color: '#FFF', 
              border: 'none', 
              borderRadius: 8, 
              padding: '8px 16px', 
              fontSize: 12, 
              fontWeight: 800, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6,
              boxShadow: '0 2px 8px rgba(14, 164, 122, 0.25)',
              letterSpacing: '0.02em'
            }}
          >
            <span>▶</span>
            <span>JUDGE MODE</span>
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

      {currentTab === 'lab' && <HealthChangeLab />}

      {currentTab === 'alert' && (
        <ExplainableAlert 
          anomalyReport={anomalyReport} 
          metrics={metrics} 
          onNavigate={(t) => handleJumpToTab(t)} 
          onOpenEmergency={() => setIsEmergencyOpen(true)} 
        />
      )}

      {currentTab === 'record' && <PersonalHealthRecord />}

      {currentTab === 'timeline' && <HealthTimeline />}

      {currentTab === 'explorer' && <PatternExplorer />}

      {currentTab === 'pilot' && <PilotCenter />}

      {currentTab === 'cost' && <CostModel />}

      {currentTab === 'consent' && <ConsentCenter />}

      {currentTab === 'circle' && <TrustedCircle />}

      {currentTab === 'technology' && <TechnologyPage onNavigate={(t) => handleJumpToTab(t)} />}

      {currentTab === 'impact' && <ImpactPage onNavigate={(t) => handleJumpToTab(t)} />}

      {currentTab === 'simple' && (
        <SimpleMode
          onBackToStandard={() => setCurrentTab('home')}
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
