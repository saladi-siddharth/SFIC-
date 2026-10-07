import React from 'react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  onOpenEmergency: () => void;
  onOpenJudgeDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  isOffline,
  onToggleOffline,
  onOpenEmergency,
  onOpenJudgeDemo,
}) => {
  return (
    <header className="sticky top-0 z-50 glass-card" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div className="container-max flex items-center justify-between" style={{ padding: '12px 24px' }}>
        {/* Brand & Status Indicator */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => onSelectTab('home')} 
            className="flex items-center gap-2" 
            style={{ cursor: 'pointer', textDecoration: 'none' }}
          >
            <div 
              style={{ 
                width: 36, 
                height: 36, 
                borderRadius: 10, 
                background: 'linear-gradient(135deg, #0EA47A, #00694D)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(14, 164, 122, 0.35)' 
              }}
            >
              <span className="material-symbols-outlined" style={{ color: '#FFFFFF', fontSize: 22 }} data-weight="fill">
                shield
              </span>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em', color: '#191C1E', lineHeight: 1.1 }}>
                HealthShield AI
              </div>
              <div style={{ fontSize: 10, color: '#0EA47A', fontWeight: 600, letterSpacing: '0.04em' }}>
                PREVENTIVE INTELLIGENCE
              </div>
            </div>
          </div>

          {/* Privacy & Mode Pill Toggle */}
          <button
            onClick={onToggleOffline}
            title="Click to toggle between On-Device Local Mode and Cloud Sync"
            style={{
              background: isOffline ? '#FEF3C7' : '#DCFCE7',
              border: isOffline ? '1px solid #FDE68A' : '1px solid #BBF7D0',
              borderRadius: 20,
              padding: '4px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 600,
              color: isOffline ? '#92400E' : '#166534',
              transition: 'all 0.2s'
            }}
          >
            <span 
              className="status-dot" 
              style={{ backgroundColor: isOffline ? '#F59E0B' : '#10B981', boxShadow: isOffline ? '0 0 6px #F59E0B' : '0 0 6px #10B981' }} 
            />
            {isOffline ? 'LOCAL OFFLINE MODE (ZERO CLOUD LEAK)' : 'EDGE VERIFIED • 50 HZ SYNC'}
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1" style={{ overflowX: 'auto' }}>
          {[
            { id: 'home', label: 'Home', icon: 'home' },
            { id: 'command', label: 'Command Center', icon: 'dashboard' },
            { id: 'baseline', label: 'My Baseline', icon: 'stacked_line_chart' },
            { id: 'checkin', label: 'Health Check', icon: 'fact_check' },
            { id: 'alert', label: 'Explainable Alert', icon: 'warning' },
            { id: 'technology', label: 'Technology', icon: 'memory' },
            { id: 'impact', label: 'SFIC Impact', icon: 'public' },
          ].map(tab => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                style={{
                  background: isActive ? '#E6F7F1' : 'transparent',
                  color: isActive ? '#00694D' : '#64748B',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 13,
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.15s ease'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 17, color: isActive ? '#0EA47A' : '#94A3B8' }}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* SFIC Judge Demo Button */}
          <button
            onClick={onOpenJudgeDemo}
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              padding: '7px 14px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              workspace_premium
            </span>
            Judge Demo
          </button>

          {/* Emergency Safety Trigger */}
          <button
            onClick={onOpenEmergency}
            className="btn-danger"
            style={{ padding: '7px 12px', fontSize: 12 }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              e911_emergency
            </span>
            Emergency
          </button>
        </div>
      </div>
    </header>
  );
};
