import React, { useState } from 'react';

interface AnatomyMapProps {
  heartRate: number;
  hrv: number;
  spo2: number;
  temp: number;
  sleepHours: number;
}

export const AnatomyMap: React.FC<AnatomyMapProps> = ({
  heartRate,
  hrv,
  spo2,
  temp,
  sleepHours,
}) => {
  const [activeNode, setActiveNode] = useState<string | null>('heart');

  const nodes = [
    {
      id: 'brain',
      label: 'Autonomic & Sleep Center',
      status: 'changed',
      color: '#7C3AED',
      x: 50,
      y: 16,
      stat: `${sleepHours} hrs sleep`,
      sub: 'Fragmented architecture & elevated head pressure',
    },
    {
      id: 'lungs',
      label: 'Respiratory & Gas Exchange',
      status: 'stable',
      color: '#0EA47A',
      x: 42,
      y: 33,
      stat: `${spo2}% SpO₂`,
      sub: 'Optimal oxygenation, 17 br/min regular',
    },
    {
      id: 'heart',
      label: 'Cardiovascular Dynamics',
      status: 'changed',
      color: '#EF4444',
      x: 57,
      y: 36,
      stat: `${heartRate} bpm • HRV ${hrv}ms`,
      sub: 'Resting pulse elevated (+19%), recovery dip (-30%)',
    },
    {
      id: 'thermal',
      label: 'Core / Dermal Metabolic',
      status: 'monitor',
      color: '#F59E0B',
      x: 50,
      y: 48,
      stat: `${temp}°F Thermal Drift`,
      sub: '+0.7°F shift from baseline, monitor for fever',
    },
  ];

  return (
    <div className="glass-card" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#0EA47A', textTransform: 'uppercase' }}>
            ANATOMICAL TELEMETRY MAPPING
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B' }}>
            Physiological Node Matrix
          </h3>
        </div>
        <div className="badge badge-changed">
          <span className="status-dot status-dot-amber" />
          Multi-System Scan Active
        </div>
      </div>

      {/* Main Container */}
      <div style={{ position: 'relative', minHeight: 380, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Holographic Silhouette Illustration */}
        <svg 
          viewBox="0 0 200 420" 
          style={{ width: '100%', maxWidth: 220, height: 'auto', filter: 'drop-shadow(0 4px 12px rgba(14, 164, 122, 0.15))' }}
        >
          {/* Subtle Grid and Range Rings */}
          <circle cx="100" cy="70" r="45" fill="none" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="100" cy="150" r="75" fill="none" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="100" cy="240" r="95" fill="none" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />

          {/* Clean Medical Silhouette Outline */}
          <path
            d="M 100,25 
               C 112,25 120,38 120,54 
               C 120,68 114,80 112,85 
               C 118,90 134,98 140,110 
               C 148,125 152,160 152,190 
               C 152,210 148,230 144,240
               C 140,230 136,190 134,175
               C 132,155 125,120 125,120
               L 128,210
               L 125,250
               L 128,340
               L 126,395
               L 115,395
               L 110,320
               L 105,260
               L 100,260
               L 95,260
               L 90,320
               L 85,395
               L 74,395
               L 72,340
               L 75,250
               L 72,210
               L 75,120
               C 75,120 68,155 66,175
               C 64,190 60,230 56,240
               C 52,230 48,210 48,190
               C 48,160 52,125 60,110
               C 66,98 82,90 88,85
               C 86,80 80,68 80,54
               C 80,38 88,25 100,25 Z"
            fill="url(#bodyGradient)"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F1F5F9" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Connecting Vectors to Organs */}
          <line x1="100" y1="54" x2="100" y2="145" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="88" y1="135" x2="114" y2="150" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />

          {/* Interactive Glowing Organ Nodes */}
          {nodes.map(n => {
            const isSelected = activeNode === n.id;
            const svgX = (n.x / 100) * 200;
            const svgY = (n.y / 100) * 420;

            return (
              <g 
                key={n.id} 
                onClick={() => setActiveNode(n.id)} 
                style={{ cursor: 'pointer' }}
              >
                {/* Outer radar pulse */}
                <circle
                  cx={svgX}
                  cy={svgY}
                  r={isSelected ? 16 : 10}
                  fill={n.color}
                  opacity={isSelected ? 0.25 : 0.15}
                  className={isSelected ? 'pulse-anim' : ''}
                />
                <circle
                  cx={svgX}
                  cy={svgY}
                  r={isSelected ? 8 : 5}
                  fill={n.color}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  filter="url(#glow)"
                />
              </g>
            );
          })}
        </svg>

        {/* Selected Node Diagnostic Card (Floating overlay) */}
        {activeNode && (
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              right: 12,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #CBD5E1',
              borderRadius: 12,
              padding: '12px 16px',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
              backdropFilter: 'blur(12px)'
            }}
          >
            {(() => {
              const node = nodes.find(n => n.id === activeNode);
              if (!node) return null;
              return (
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                    <div className="flex items-center gap-2">
                      <span 
                        style={{ width: 8, height: 8, borderRadius: '50%', background: node.color }} 
                      />
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>
                        {node.label}
                      </span>
                    </div>
                    <span 
                      className={`badge ${node.status === 'stable' ? 'badge-stable' : node.status === 'monitor' ? 'badge-monitor' : 'badge-alert'}`}
                    >
                      {node.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0EA47A', fontFamily: 'Space Grotesk' }}>
                    {node.stat}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                    {node.sub}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Quick Organ Selection Pills */}
      <div className="flex items-center justify-center gap-2" style={{ marginTop: 12 }}>
        {nodes.map(n => (
          <button
            key={n.id}
            onClick={() => setActiveNode(n.id)}
            style={{
              border: activeNode === n.id ? `1.5px solid ${n.color}` : '1px solid #E2E8F0',
              background: activeNode === n.id ? '#FFFFFF' : '#F8FAFC',
              color: activeNode === n.id ? '#1E293B' : '#64748B',
              fontSize: 11,
              fontWeight: 600,
              padding: '4px 8px',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            {n.id.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};
