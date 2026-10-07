import React from 'react';
import type { AppTab } from '../App';
import type { SyncState } from '../engine/offlineStorage';

interface LeftSidebarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onLaunchJudgeDemo: () => void;
  syncState: SyncState;
  pendingCount: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isSimpleMode?: boolean;
  onToggleSimpleMode?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentTab,
  onSelectTab,
  onLaunchJudgeDemo,
  syncState,
  pendingCount,
  isCollapsed = false,
  onToggleCollapse,
  isSimpleMode = false,
  onToggleSimpleMode,
}) => {
  const PRIMARY_ITEMS = [
    { id: 'home' as AppTab, label: 'Home', icon: 'home', testId: 'sidebar-nav-home' },
    { id: 'baseline' as AppTab, label: 'My Baseline', icon: 'stacked_line_chart', testId: 'sidebar-nav-baseline' },
    { id: 'checkin' as AppTab, label: 'Health Check', icon: 'fact_check', testId: 'sidebar-nav-checkin' },
    { id: 'lab' as AppTab, label: 'Change Lab', icon: 'biotech', badge: 'Demo', testId: 'sidebar-nav-lab' },
    { id: 'alert' as AppTab, label: 'Change Explained', icon: 'warning', testId: 'sidebar-nav-alert' },
    { id: 'record' as AppTab, label: 'Health Record', icon: 'folder_shared', testId: 'sidebar-nav-record' },
  ];

  const EVIDENCE_ITEMS = [
    { id: 'timeline' as AppTab, label: 'Health Timeline', icon: 'history', testId: 'sidebar-nav-timeline' },
    { id: 'pilot' as AppTab, label: 'Pilot Evidence', icon: 'verified', testId: 'sidebar-nav-pilot' },
    { id: 'cost' as AppTab, label: 'Cost & Scale', icon: 'payments', badge: 'SFIC 6', testId: 'sidebar-nav-cost' },
    { id: 'technology' as AppTab, label: 'Technology', icon: 'memory', testId: 'sidebar-nav-tech' },
    { id: 'consent' as AppTab, label: 'Privacy & DPDP', icon: 'lock', testId: 'sidebar-nav-consent' },
    { id: 'circle' as AppTab, label: 'Trusted Circle', icon: 'group', testId: 'sidebar-nav-circle' },
    { id: 'impact' as AppTab, label: 'Impact & Scale', icon: 'public', testId: 'sidebar-nav-impact' },
    { id: 'explorer' as AppTab, label: 'Pattern Explorer', icon: 'monitoring', testId: 'sidebar-nav-explorer' },
  ];

  const width = isCollapsed ? 76 : 260;

  return (
    <aside
      id="healthshield-left-sidebar"
      role="navigation"
      aria-label="Main Navigation"
      style={{
        width,
        minWidth: width,
        maxWidth: width,
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 60,
        transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '1px 0 6px rgba(0,0,0,0.02)',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {/* 1. Header & Brand */}
      <div>
        <div 
          style={{ 
            padding: isCollapsed ? '16px 12px' : '18px 18px 14px', 
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            gap: 10
          }}
        >
          <div 
            onClick={() => onSelectTab('home')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 10, 
              cursor: 'pointer',
              textDecoration: 'none'
            }}
            title="HealthShield AI Home"
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
                boxShadow: '0 4px 10px rgba(14, 164, 122, 0.3)',
                flexShrink: 0
              }}
            >
              🛡️
            </div>

            {!isCollapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                    HealthShield AI
                  </span>
                  <span style={{ fontSize: 9, fontWeight: 800, background: '#EFF6FF', color: '#2563EB', padding: '1px 5px', borderRadius: 4, border: '1px solid #BFDBFE' }}>
                    TRACK A
                  </span>
                </div>
                <div style={{ fontSize: 10.5, color: '#64748B', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Personal Pattern Intelligence
                </div>
              </div>
            )}
          </div>

          {onToggleCollapse && !isCollapsed && (
            <button
              onClick={onToggleCollapse}
              aria-label="Collapse Sidebar"
              title="Collapse Sidebar"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: 4,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>menu_open</span>
            </button>
          )}
        </div>

        {/* 2. Primary Navigation Section */}
        <div style={{ padding: '12px 10px 6px' }}>
          {!isCollapsed && (
            <div 
              style={{ 
                fontSize: 10, 
                fontWeight: 800, 
                color: '#94A3B8', 
                textTransform: 'uppercase', 
                letterSpacing: '0.06em', 
                padding: '4px 8px 8px' 
              }}
            >
              Core Navigation
            </div>
          )}

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {PRIMARY_ITEMS.map(item => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={item.testId}
                  onClick={() => onSelectTab(item.id)}
                  title={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    gap: 10,
                    padding: isCollapsed ? '10px 0' : '9px 12px',
                    borderRadius: 9,
                    background: isActive ? '#E6F7F1' : 'transparent',
                    color: isActive ? '#00694D' : '#334155',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: isActive ? 800 : 600,
                    transition: 'all 0.15s ease',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span 
                      className="material-symbols-outlined" 
                      style={{ 
                        fontSize: 20, 
                        color: isActive ? '#0EA47A' : '#64748B' 
                      }}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>

                  {!isCollapsed && item.badge && (
                    <span 
                      style={{ 
                        fontSize: 9.5, 
                        background: '#10B981', 
                        color: '#FFFFFF', 
                        borderRadius: 4, 
                        padding: '1px 6px', 
                        fontWeight: 800 
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 3. Platform & Evidence Section */}
        <div style={{ padding: '8px 10px', borderTop: '1px solid #F1F5F9' }}>
          {!isCollapsed && (
            <div 
              style={{ 
                fontSize: 10, 
                fontWeight: 800, 
                color: '#94A3B8', 
                textTransform: 'uppercase', 
                letterSpacing: '0.06em', 
                padding: '6px 8px 6px' 
              }}
            >
              Evidence &amp; Scalability
            </div>
          )}

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {EVIDENCE_ITEMS.map(item => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={item.testId}
                  onClick={() => onSelectTab(item.id)}
                  title={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    gap: 10,
                    padding: isCollapsed ? '8px 0' : '7px 12px',
                    borderRadius: 8,
                    background: isActive ? '#E6F7F1' : 'transparent',
                    color: isActive ? '#00694D' : '#475569',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: isActive ? 800 : 500,
                    transition: 'all 0.15s ease',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span 
                      className="material-symbols-outlined" 
                      style={{ 
                        fontSize: 18, 
                        color: isActive ? '#0EA47A' : '#94A3B8' 
                      }}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>

                  {!isCollapsed && item.badge && (
                    <span 
                      style={{ 
                        fontSize: 9, 
                        background: '#2563EB', 
                        color: '#FFFFFF', 
                        borderRadius: 4, 
                        padding: '1px 5px', 
                        fontWeight: 800 
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 4. Evaluator Tools & Footer CTA */}
      <div 
        style={{ 
          padding: isCollapsed ? '12px 8px' : '14px 14px 16px', 
          borderTop: '1px solid #E2E8F0',
          background: '#F8FAFC' 
        }}
      >
        {/* JUDGE MODE Highlight Button */}
        <button
          id="btn-sidebar-judge-mode"
          onClick={onLaunchJudgeDemo}
          title="Launch 90-Second Guided Judge Demo"
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #0EA47A, #00513A)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 10,
            padding: isCollapsed ? '10px 0' : '10px 14px',
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            boxShadow: '0 3px 10px rgba(14, 164, 122, 0.3)',
            marginBottom: 10,
            letterSpacing: '0.02em'
          }}
        >
          <span style={{ fontSize: 13 }}>▶</span>
          {!isCollapsed && <span>JUDGE MODE (90s)</span>}
        </button>

        {/* Status badges & accessibility controls */}
        {!isCollapsed ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* Sync & AI Status */}
            <div style={{ display: 'flex', gap: 6 }}>
              <div 
                style={{
                  flex: 1,
                  background: syncState === 'SYNC_COMPLETE' ? '#ECFDF5' : '#FFFBEB',
                  color: syncState === 'SYNC_COMPLETE' ? '#065F46' : '#92400E',
                  border: '1px solid currentColor',
                  borderRadius: 6,
                  padding: '4px 6px',
                  fontSize: 10,
                  fontWeight: 700,
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }}
                title={pendingCount > 0 ? `${pendingCount} events pending offline sync` : 'Offline-first • User data controlled on device'}
              >
                {syncState === 'SYNC_COMPLETE' ? '● Synced' : '⚠️ Offline'}
              </div>

              <div 
                onClick={() => onSelectTab('technology')}
                style={{
                  flex: 1,
                  background: '#F5F3FF',
                  color: '#6D28D9',
                  border: '1px solid #DDD6FE',
                  borderRadius: 6,
                  padding: '4px 6px',
                  fontSize: 10,
                  fontWeight: 700,
                  textAlign: 'center',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
                title="On-device AI: Used strictly for explanation. Deterministic engine decides."
              >
                🤖 ON-DEVICE AI
              </div>
            </div>

            {/* Simple / Accessible Mode toggle */}
            {onToggleSimpleMode && (
              <button
                onClick={onToggleSimpleMode}
                style={{
                  background: isSimpleMode ? '#00694D' : '#FFFFFF',
                  color: isSimpleMode ? '#FFFFFF' : '#475569',
                  border: '1px solid #CBD5E1',
                  borderRadius: 6,
                  padding: '5px 8px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5
                }}
              >
                <span>♿</span>
                <span>{isSimpleMode ? 'Standard Mode' : 'Accessible Simple Mode'}</span>
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span 
              title={syncState === 'SYNC_COMPLETE' ? 'Synced' : 'Offline'} 
              style={{ fontSize: 12, cursor: 'pointer' }}
            >
              {syncState === 'SYNC_COMPLETE' ? '🟢' : '🟡'}
            </span>
            <span 
              onClick={() => onSelectTab('technology')} 
              title="On-Device AI" 
              style={{ fontSize: 13, cursor: 'pointer' }}
            >
              🤖
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
