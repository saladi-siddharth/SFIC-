import React from 'react';
import type { AppTab } from '../App';
import { PAGE_SEO_REGISTRY } from '../utils/seo';

interface TopBarProps {
  currentTab: AppTab;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onToggleSidebar,
}) => {
  const seoMeta = PAGE_SEO_REGISTRY[currentTab] || PAGE_SEO_REGISTRY.home;

  return (
    <header
      id="healthshield-topbar"
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}
    >
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation"
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: 8,
              padding: '6px 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#334155'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>menu</span>
          </button>
        )}

        {/* Semantic Breadcrumbs for SEO */}
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <span style={{ color: '#64748B', fontWeight: 600 }}>HealthShield AI</span>
          <span style={{ color: '#CBD5E1' }}>/</span>
          <span style={{ color: '#00694D', fontWeight: 800 }}>
            {seoMeta.title.split('—')[0].trim()}
          </span>
        </nav>
      </div>

      {/* Right: Page Badge & Safeguard Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Page Badge */}
        <div
          style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            color: '#166534',
            borderRadius: 20,
            padding: '3px 10px',
            fontSize: 11,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: 5
          }}
        >
          <span>✓</span>
          <span>{seoMeta.badge}</span>
        </div>

        {/* Safety Safeguard Disclaimer */}
        <div
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 6,
            padding: '3px 8px',
            fontSize: 11,
            color: '#64748B',
            fontWeight: 600
          }}
          title="Non-diagnostic preventive intelligence with deterministic safety guardrails"
        >
          Non-Diagnostic Prototype
        </div>
      </div>
    </header>
  );
};
