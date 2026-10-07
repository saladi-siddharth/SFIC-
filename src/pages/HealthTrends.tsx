import React, { useState } from 'react';
import type { MetricData, DayHistoryPoint } from '../types/health';

interface HealthTrendsProps {
  metrics: MetricData[];
  history: DayHistoryPoint[];
  onNavigate?: (tab: string) => void;
}

export const HealthTrends: React.FC<HealthTrendsProps> = ({
  metrics,
  history,
  onNavigate,
}) => {
  const [selectedRange, setSelectedRange] = useState<'7d' | '30d' | 'all'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'sleep' | 'activity' | 'heart_rate'>('sleep');

  const sliceCount = selectedRange === '7d' ? 7 : selectedRange === '30d' ? 30 : history.length;
  const filteredHistory = history.slice(-sliceCount);

  // Key metrics
  const sleepMetric = metrics.find(m => m.id === 'sleep') || {
    name: 'Sleep Duration',
    unit: 'hrs',
    baselineAvg: 7.1,
    todayValue: 5.4,
    deltaPercent: -24
  };

  const activityMetric = metrics.find(m => m.id === 'activity') || {
    name: 'Physical Activity',
    unit: 'steps',
    baselineAvg: 7800,
    todayValue: 4900,
    deltaPercent: -37
  };

  const hrMetric = metrics.find(m => m.id === 'heart_rate') || {
    name: 'Resting Heart Rate',
    unit: 'bpm',
    baselineAvg: 72,
    todayValue: 78,
    deltaPercent: 8
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      <main className="container-max" style={{ paddingTop: 28, maxWidth: 1040 }}>
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#0EA47A', textTransform: 'uppercase' }}>
              LONGITUDINAL PATTERN ANALYSIS
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginTop: 4 }}>
              How Has My Pattern Changed?
            </h1>
            <p style={{ fontSize: 14, color: '#475569', marginTop: 4 }}>
              Comparing your today&apos;s readings against your personal multi-week corridor rather than abstract population averages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(['7d', '30d', 'all'] as const).map(range => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={selectedRange === range ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '6px 14px', fontSize: 12 }}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'All History'}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Core Metric Comparison Cards: TODAY VS YOUR RECENT PATTERN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: 32 }}>
          {/* 1. Sleep */}
          <div
            onClick={() => setSelectedMetric('sleep')}
            className="glass-card cursor-pointer"
            style={{
              padding: 22,
              borderTop: selectedMetric === 'sleep' ? '4px solid #0EA47A' : '4px solid #CBD5E1',
              boxShadow: selectedMetric === 'sleep' ? '0 8px 24px rgba(14, 164, 122, 0.12)' : undefined
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>SLEEP DURATION</span>
              <span className="badge badge-alert" style={{ fontSize: 11 }}>↓ 24% Change</span>
            </div>
            <div className="flex items-baseline justify-between" style={{ marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', fontFamily: 'Space Grotesk' }}>
                  {sleepMetric.todayValue}
                </span>
                <span style={{ fontSize: 12, color: '#64748B', marginLeft: 4 }}>hrs today</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#64748B' }}>
                  {sleepMetric.baselineAvg} hrs
                </span>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>30d Baseline</div>
              </div>
            </div>
            <div className="progress-track" style={{ height: 6 }}>
              <div className="progress-fill" style={{ width: '76%', background: '#EF4444' }} />
            </div>
            <div style={{ fontSize: 11, color: '#DC2626', marginTop: 8, fontWeight: 600 }}>
              Below personal typical corridor (6.8–7.4h)
            </div>
          </div>

          {/* 2. Physical Activity */}
          <div
            onClick={() => setSelectedMetric('activity')}
            className="glass-card cursor-pointer"
            style={{
              padding: 22,
              borderTop: selectedMetric === 'activity' ? '4px solid #0EA47A' : '4px solid #CBD5E1',
              boxShadow: selectedMetric === 'activity' ? '0 8px 24px rgba(14, 164, 122, 0.12)' : undefined
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>DAILY STEPS</span>
              <span className="badge badge-alert" style={{ fontSize: 11 }}>↓ 37% Change</span>
            </div>
            <div className="flex items-baseline justify-between" style={{ marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', fontFamily: 'Space Grotesk' }}>
                  {activityMetric.todayValue.toLocaleString()}
                </span>
                <span style={{ fontSize: 12, color: '#64748B', marginLeft: 4 }}>steps today</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#64748B' }}>
                  {activityMetric.baselineAvg.toLocaleString()}
                </span>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>30d Baseline</div>
              </div>
            </div>
            <div className="progress-track" style={{ height: 6 }}>
              <div className="progress-fill" style={{ width: '63%', background: '#F59E0B' }} />
            </div>
            <div style={{ fontSize: 11, color: '#B45309', marginTop: 8, fontWeight: 600 }}>
              Noticeable step reduction from routine pacing
            </div>
          </div>

          {/* 3. Resting Heart Rate */}
          <div
            onClick={() => setSelectedMetric('heart_rate')}
            className="glass-card cursor-pointer"
            style={{
              padding: 22,
              borderTop: selectedMetric === 'heart_rate' ? '4px solid #0EA47A' : '4px solid #CBD5E1',
              boxShadow: selectedMetric === 'heart_rate' ? '0 8px 24px rgba(14, 164, 122, 0.12)' : undefined
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>RESTING HEART RATE</span>
              <span className="badge badge-alert" style={{ fontSize: 11 }}>↑ 8% Drift</span>
            </div>
            <div className="flex items-baseline justify-between" style={{ marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', fontFamily: 'Space Grotesk' }}>
                  {hrMetric.todayValue}
                </span>
                <span style={{ fontSize: 12, color: '#64748B', marginLeft: 4 }}>bpm today</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#64748B' }}>
                  {hrMetric.baselineAvg} bpm
                </span>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>30d Baseline</div>
              </div>
            </div>
            <div className="progress-track" style={{ height: 6 }}>
              <div className="progress-fill" style={{ width: '88%', background: '#EF4444' }} />
            </div>
            <div style={{ fontSize: 11, color: '#DC2626', marginTop: 8, fontWeight: 600 }}>
              Elevated relative to individual resting norm
            </div>
          </div>
        </div>

        {/* Visual Corridor Longitudinal Graph */}
        <div className="glass-card" style={{ padding: 28, marginBottom: 32 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
                {selectedMetric === 'sleep'
                  ? 'Sleep Duration vs 30-Day Personal Pattern Corridor'
                  : selectedMetric === 'activity'
                  ? 'Daily Activity Steps vs 30-Day Personal Baseline'
                  : 'Resting Heart Rate vs Personal Biological Normal'}
              </h3>
              <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                Green area indicates your personal typical variation corridor. Red marker flags today&apos;s shift.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span style={{ width: 12, height: 12, background: 'rgba(16, 185, 129, 0.25)', border: '1px solid #10B981', display: 'inline-block', borderRadius: 2 }} />
                <span style={{ color: '#475569' }}>Typical Personal Corridor</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ width: 12, height: 3, background: '#2563EB', display: 'inline-block' }} />
                <span style={{ color: '#475569' }}>Historical Daily Telemetry</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ width: 8, height: 8, background: '#EF4444', borderRadius: '50%', display: 'inline-block' }} />
                <span style={{ color: '#475569' }}>Today (Flagged)</span>
              </div>
            </div>
          </div>

          {/* SVG Visual Representation of Trend & Corridor */}
          <div style={{ width: '100%', height: 260, background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', padding: 20, position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 800 220" preserveAspectRatio="none">
              {/* Personal Normal Corridor Band */}
              <rect x="0" y="70" width="750" height="70" fill="rgba(16, 185, 129, 0.12)" />
              <line x1="0" y1="105" x2="750" y2="105" stroke="#10B981" strokeDasharray="4 4" strokeWidth="1.5" />

              {/* Longitudinal Telemetry Polyline */}
              <polyline
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                points="
                  20,102 45,98 70,110 95,100 120,95 145,108 170,104 195,100 
                  220,96 245,105 270,112 295,102 320,98 345,104 370,100 395,106 
                  420,95 445,102 470,108 495,100 520,104 545,98 570,102 595,105 
                  620,100 645,96 670,104 695,108 720,112 750,165
                "
              />

              {/* Data points */}
              <circle cx="750" cy="165" r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            <div style={{ position: 'absolute', bottom: 12, left: 24, fontSize: 11, color: '#64748B' }}>
              Day -{sliceCount} ({filteredHistory.length} Daily Observations Sampled)
            </div>
            <div style={{ position: 'absolute', bottom: 12, right: 24, fontSize: 11, color: '#DC2626', fontWeight: 700 }}>
              Today (Deviated from corridor)
            </div>
          </div>
        </div>

        {/* Explainable Next Action */}
        <div className="flex items-center justify-between" style={{ background: '#FFFFFF', padding: 20, borderRadius: 12, border: '1px solid #E2E8F0' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>
              Want to see why HealthShield flagged today&apos;s shift?
            </div>
            <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0' }}>
              Review the structured explainability card and conservative next steps.
            </p>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('alert')}
              className="btn-primary"
              style={{ fontSize: 13, padding: '8px 18px' }}
            >
              View Explainable Alert →
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
