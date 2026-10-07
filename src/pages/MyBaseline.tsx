import React, { useState } from 'react';
import type { MetricData, DayHistoryPoint } from '../types/health';
import { PipelineStepper } from '../components/PipelineStepper';

interface MyBaselineProps {
  metrics: MetricData[];
  history: DayHistoryPoint[];
  onNavigate: (tab: string) => void;
}

export const MyBaseline: React.FC<MyBaselineProps> = ({
  metrics,
  history,
  onNavigate,
}) => {
  const [selectedRange, setSelectedRange] = useState<'7d' | '14d' | '30d'>('30d');
  const [activeMetricId, setActiveMetricId] = useState<string>('heart_rate');

  const sliceDays = selectedRange === '7d' ? 7 : selectedRange === '14d' ? 14 : 30;
  const filteredHistory = history.slice(-sliceDays);

  return (
    <div style={{ paddingBottom: 60 }}>
      <PipelineStepper onSelectStep={(step) => onNavigate(step)} />

      <main className="container-max" style={{ paddingTop: 28 }}>
        {/* Title Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#0EA47A', textTransform: 'uppercase' }}>
              SIGNATURE INNOVATION SCREEN
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Your Personal Health Baseline
            </h1>
            <p style={{ fontSize: 14, color: '#475569', marginTop: 4 }}>
              Comparing today’s telemetry against your individualized 30-day biological pattern rather than static population averages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(['7d', '14d', '30d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={selectedRange === range ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '6px 14px', fontSize: 12 }}
              >
                {range === '7d' ? 'Last 7 Days' : range === '14d' ? 'Last 14 Days' : 'Last 30 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* ================= SIDE-BY-SIDE: YOUR BASELINE vs TODAY ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: 32 }}>
          {/* Left: YOUR BASELINE (Last 30 Days) */}
          <div className="glass-card" style={{ padding: 28, borderTop: '4px solid #0EA47A' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 22 }}>history</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
                  YOUR BASELINE (30-Day Model)
                </h3>
              </div>
              <span className="badge badge-stable">ESTABLISHED PERSONAL PATTERN</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {metrics.map(m => (
                <div key={m.id} style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#64748B' }}>
                        {m.icon}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{m.name}</span>
                    </div>
                    <span className="badge badge-stable">Normal Corridor</span>
                  </div>
                  {/* Baseline Range Bar */}
                  <div className="progress-track" style={{ height: 8 }}>
                    <div className="progress-fill" style={{ width: '85%', background: '#10B981' }} />
                  </div>
                  <div className="flex items-center justify-between" style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                    <span>Corridor: {m.baselineMin} - {m.baselineMax} {m.unit}</span>
                    <strong>Mean: {m.baselineAvg} {m.unit}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: TODAY (Current Readings & Delta) */}
          <div className="glass-card" style={{ padding: 28, borderTop: '4px solid #EF4444' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ color: '#EF4444', fontSize: 22 }}>today</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
                  TODAY'S OBSERVATION
                </h3>
              </div>
              <span className="badge badge-alert">MULTI-SHIFT DETECTED</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {metrics.map(m => {
                const hasChange = m.status === 'changed' || m.status === 'alert';
                const hasMonitor = m.status === 'monitor';

                return (
                  <div 
                    key={m.id} 
                    style={{ 
                      background: hasChange ? '#FFF5F5' : hasMonitor ? '#FFFBEB' : '#F8FAFC', 
                      padding: 12, 
                      borderRadius: 10, 
                      border: hasChange ? '1px solid #FECACA' : hasMonitor ? '1px solid #FDE68A' : '1px solid #E2E8F0' 
                    }}
                  >
                    <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: hasChange ? '#DC2626' : '#64748B' }}>
                          {m.icon}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: hasChange ? '#991B1B' : '#1E293B' }}>{m.name}</span>
                      </div>
                      <span className={`badge ${hasChange ? 'badge-alert' : hasMonitor ? 'badge-monitor' : 'badge-stable'}`}>
                        {hasChange ? `↓ ${Math.abs(m.deltaPercent).toFixed(0)}% Change` : hasMonitor ? 'Monitor' : 'Normal'}
                      </span>
                    </div>

                    <div className="progress-track" style={{ height: 8 }}>
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${Math.min(100, Math.max(20, 50 + m.deltaPercent))}%`, 
                          background: hasChange ? '#EF4444' : hasMonitor ? '#F59E0B' : '#10B981' 
                        }} 
                      />
                    </div>

                    <div className="flex items-center justify-between" style={{ fontSize: 11, color: hasChange ? '#991B1B' : '#64748B', marginTop: 4 }}>
                      <span>Delta: {m.deltaPercent > 0 ? `+${m.deltaPercent.toFixed(1)}%` : `${m.deltaPercent.toFixed(1)}%`}</span>
                      <strong>Current: {m.todayValue} {m.unit}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= 30-DAY CONTINUOUS BASELINE CORRIDOR CHART ================= */}
        <div className="glass-card" style={{ padding: 28, marginBottom: 32 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                PERSONAL VARIATION OVER TIME
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
                30-Day Personal Pattern Corridor
              </h3>
            </div>

            {/* Metric Selector for Chart */}
            <div className="flex items-center gap-2">
              {[
                { id: 'heart_rate', label: 'Heart Rate' },
                { id: 'hrv', label: 'HRV (rMSSD)' },
                { id: 'sleep', label: 'Sleep Hours' },
                { id: 'temp', label: 'Temperature' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setActiveMetricId(opt.id)}
                  style={{
                    background: activeMetricId === opt.id ? '#EFF6FF' : '#F8FAFC',
                    color: activeMetricId === opt.id ? '#1D4ED8' : '#64748B',
                    border: activeMetricId === opt.id ? '1.5px solid #3B82F6' : '1px solid #E2E8F0',
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Synthetic SVG Line Chart with Shaded Corridor */}
          <div style={{ width: '100%', height: 240, position: 'relative' }}>
            <svg viewBox="0 0 800 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Grid Lines */}
              <line x1="40" y1="30" x2="780" y2="30" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="40" y1="80" x2="780" y2="80" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="40" y1="130" x2="780" y2="130" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="40" y1="180" x2="780" y2="180" stroke="#F1F5F9" strokeWidth="1" />

              {/* Shaded Normal Range Band (Upper & Lower 1.5 sigma corridor) */}
              <rect x="40" y="70" width="740" height="60" fill="#E6F7F1" opacity="0.65" rx="4" />
              <line x1="40" y1="100" x2="780" y2="100" stroke="#0EA47A" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />

              {/* Plotted History Points */}
              {(() => {
                const metric = metrics.find(m => m.id === activeMetricId);
                const avg = metric ? metric.baselineAvg : 62;
                const points = filteredHistory.map((pt, i) => {
                  const x = 50 + (i / (filteredHistory.length - 1)) * 710;
                  let rawVal = pt.heartRate;
                  if (activeMetricId === 'hrv') rawVal = pt.hrv;
                  else if (activeMetricId === 'sleep') rawVal = pt.sleepHours * 10;
                  else if (activeMetricId === 'temp') rawVal = (pt.temp - 98) * 100;
                  
                  // Map value to Y (approx 100 center)
                  const y = 100 - (rawVal - avg) * 2.8;
                  return { x, y, val: rawVal, date: pt.date, isToday: i === filteredHistory.length - 1 };
                });

                const pathData = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`, '');

                return (
                  <>
                    {/* The Trend Line */}
                    <path d={pathData} fill="none" stroke="#2563EB" strokeWidth="2.5" />

                    {/* Data Points */}
                    {points.map((p, i) => (
                      <g key={i}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={p.isToday ? 6 : 3.5}
                          fill={p.isToday ? '#EF4444' : '#2563EB'}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                        {/* Divergence Pin for Today */}
                        {p.isToday && (
                          <g>
                            <circle cx={p.x} cy={p.y} r="12" fill="#EF4444" opacity="0.2" className="pulse-anim" />
                            <text x={p.x - 30} y={p.y - 14} fontSize="11" fontWeight="700" fill="#DC2626">
                              TODAY (OUTLIER)
                            </text>
                          </g>
                        )}
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>

            {/* Chart Legend */}
            <div className="flex items-center justify-between" style={{ marginTop: 12, fontSize: 11, color: '#64748B' }}>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span style={{ width: 12, height: 12, background: '#E6F7F1', border: '1px solid #10B981', display: 'inline-block', borderRadius: 2 }} />
                  Personal Baseline Corridor (±1.5σ)
                </span>
                <span className="flex items-center gap-1.5">
                  <span style={{ width: 12, height: 3, background: '#2563EB', display: 'inline-block' }} />
                  Recorded Observation Line
                </span>
                <span className="flex items-center gap-1.5">
                  <span style={{ width: 8, height: 8, background: '#EF4444', borderRadius: '50%', display: 'inline-block' }} />
                  Divergence Detection Point
                </span>
              </div>
              <span>Timeline: Rolling 30 Days</span>
            </div>
          </div>
        </div>

        {/* Pattern Change Explanation Banner */}
        <div 
          className="glass-card" 
          style={{ 
            padding: 24, 
            background: 'linear-gradient(135deg, #FEF3C7, #FFFBEB)', 
            border: '1.5px solid #F59E0B' 
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ color: '#D97706', fontSize: 24 }}>notification_important</span>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: '#92400E' }}>
                  ⚠ Pattern Change Detected by Engine
                </h4>
              </div>
              <p style={{ fontSize: 13, color: '#78350F', lineHeight: 1.6, maxWidth: 840 }}>
                HealthShield flags this not because your heart rate of 74 bpm is universally dangerous (normal is 60–100 in textbooks), but because <strong>it departs sharply from your established personal resting norm of 62 bpm while coupled with acute sleep loss and dropped HRV.</strong>
              </p>
            </div>
            <button 
              onClick={() => onNavigate('alert')} 
              className="btn-primary" 
              style={{ background: 'linear-gradient(135deg, #D97706, #B45309)', whiteSpace: 'nowrap', marginTop: 4 }}
            >
              Examine Full Alert →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
