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
import { HealthProfile } from './pages/HealthProfile';
import { HealthAssistant } from './pages/HealthAssistant';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { HealthTrends } from './pages/HealthTrends';

import { LeftSidebar } from './components/LeftSidebar';
import { TopBar } from './components/TopBar';

import { INITIAL_METRICS, INITIAL_CHECKIN, GENERATE_30_DAY_HISTORY } from './data/mockData';
import type { MetricData, CheckInState } from './types/health';
import { evaluateHealthPattern } from './engine/baselineEngine';
import { JudgeDemoModal2 } from './components/JudgeDemoModal2';
import { EmergencyModal } from './components/EmergencyModal';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { LanguageProvider } from './i18n/LanguageContext';
import { offlineStorage } from './engine/offlineStorage';
import type { SyncState } from './engine/offlineStorage';
import { applyPageSEO, getTabFromHash, getHashForTab } from './utils/seo';

export type AppTab = 
  | 'home' 
  | 'baseline' 
  | 'checkin' 
  | 'lab' 
  | 'alert' 
  | 'profile'
  | 'assistant'
  | 'accessibility'
  | 'trends'
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
  // Initialize currentTab from URL hash (SEO deep-linking) or default to 'home'
  const [currentTab, setCurrentTab] = useState<AppTab>(() => {
    return (getTabFromHash(window.location.hash) as AppTab) || 'home';
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  
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

  // Listen to browser URL hash changes for SEO and back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const target = getTabFromHash(window.location.hash) as AppTab;
      if (target && target !== currentTab) {
        setCurrentTab(target);
        applyPageSEO(target);
      }
    };

    // Apply initial SEO on page mount
    applyPageSEO(currentTab);

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentTab]);

  const handleSelectTab = (tab: AppTab) => {
    setCurrentTab(tab);
    window.location.hash = getHashForTab(tab);
    applyPageSEO(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      simple: 'simple',
      profile: 'profile',
      healthprofile: 'profile',
      assistant: 'assistant',
      aiassistant: 'assistant',
      voice: 'assistant',
      accessibility: 'accessibility',
      trends: 'trends',
      healthtrends: 'trends'
    };
    if (tabMap[target]) {
      handleSelectTab(tabMap[target]);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      
      {/* ================= 1. DEDICATED LEFT SIDEBAR ================= */}
      <LeftSidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onLaunchJudgeDemo={() => setIsJudgeDemoOpen(true)}
        syncState={syncState}
        pendingCount={pendingCount}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        isSimpleMode={currentTab === 'simple'}
        onToggleSimpleMode={() => handleSelectTab(currentTab === 'simple' ? 'home' : 'simple')}
      />

      {/* ================= 2. MAIN CONTENT AREA ================= */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        
        {/* Accessibility & Multilingual Toolbar */}
        <AccessibilityToolbar
          onToggleSimpleMode={() => handleSelectTab(currentTab === 'simple' ? 'home' : 'simple')}
          isSimpleMode={currentTab === 'simple'}
        />

        {/* TopBar with Breadcrumb, SEO Badge & Non-Diagnostic Notice */}
        <TopBar
          currentTab={currentTab}
          onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
          isSidebarOpen={!isSidebarCollapsed}
        />

        {/* Semantic Main Content Section (SEO-Friendly) */}
        <main 
          id="main-content" 
          tabIndex={-1}
          style={{ flex: 1, minWidth: 0, outline: 'none' }}
        >
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

          {currentTab === 'profile' && (
            <HealthProfile onNavigate={(t) => handleJumpToTab(t)} />
          )}

          {currentTab === 'assistant' && (
            <HealthAssistant 
              metrics={metrics} 
              checkIn={checkIn} 
              anomalyReport={anomalyReport} 
              onNavigate={(t) => handleJumpToTab(t)} 
            />
          )}

          {currentTab === 'accessibility' && (
            <AccessibilityPage 
              onToggleSimpleMode={() => handleSelectTab('simple')}
              isSimpleMode={false}
              onNavigate={(t) => handleJumpToTab(t)}
            />
          )}

          {currentTab === 'trends' && (
            <HealthTrends 
              metrics={metrics} 
              history={history} 
              onNavigate={(t) => handleJumpToTab(t)} 
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
              onBackToStandard={() => handleSelectTab('home')}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
            />
          )}
        </main>
      </div>

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
