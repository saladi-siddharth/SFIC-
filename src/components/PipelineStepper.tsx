import React from 'react';

interface PipelineStepperProps {
  onSelectStep?: (stepId: string) => void;
}

export const PipelineStepper: React.FC<PipelineStepperProps> = ({
  onSelectStep,
}) => {
  const steps = [
    { id: '1', key: 'telemetry', label: '1. User Telemetry', sub: 'Continuous Ingest', status: 'completed', icon: 'sensors' },
    { id: '2', key: 'checkin', label: '2. Daily Health Check', sub: 'Completed 07:15', status: 'completed', icon: 'fact_check' },
    { id: '3', key: 'baseline', label: '3. Personal Baseline', sub: '30-Day Model Sync', status: 'completed', icon: 'stacked_line_chart' },
    { id: '4', key: 'detect', label: '4. Change Detection', sub: 'Multi-Signal Deviation', status: 'active', icon: 'sync' },
    { id: '5', key: 'rules', label: '5. Safety Rules Engine', sub: 'Rule #204 Triggered', status: 'active', icon: 'gavel' },
    { id: '6', key: 'alert', label: '6. Explainable Alert', sub: 'Priority 2 Advisory', status: 'active', icon: 'warning' },
    { id: '7', key: 'action', label: '7. Recommended Step', sub: 'Hydrate & Retest in 4h', status: 'pending', icon: 'task_alt' },
  ];

  return (
    <section style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '12px 24px' }}>
      <div className="container-max">
        {/* Stepper Header Meta */}
        <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ color: '#0EA47A', fontSize: 18 }}>
              hub
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#475569', textTransform: 'uppercase' }}>
              CORE INTELLIGENCE PIPELINE WORKFLOW
            </span>
          </div>
          <div className="flex items-center gap-4" style={{ fontSize: 11, fontWeight: 600 }}>
            <span className="flex items-center gap-1.5" style={{ color: '#00694D' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
              1–3 Ingested & Synced
            </span>
            <span className="flex items-center gap-1.5" style={{ color: '#2563EB' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB' }} className="pulse-anim" />
              4–6 Actively Evaluating
            </span>
            <span className="flex items-center gap-1.5" style={{ color: '#64748B' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#94A3B8' }} />
              7 Action Required
            </span>
          </div>
        </div>

        {/* 7-Step Interactive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {steps.map((s, index) => {
            const isCompleted = s.status === 'completed';
            const isActive = s.status === 'active';

            return (
              <div
                key={s.id}
                onClick={() => onSelectStep && onSelectStep(s.key)}
                style={{
                  background: isActive ? '#EFF6FF' : isCompleted ? '#FFFFFF' : '#F8FAFC',
                  border: isActive ? '1.5px solid #3B82F6' : '1px solid #E2E8F0',
                  borderRadius: 10,
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: onSelectStep ? 'pointer' : 'default',
                  boxShadow: isActive ? '0 2px 8px rgba(59, 130, 246, 0.15)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Step Circle Badge */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: isCompleted ? '#DCFCE7' : isActive ? '#2563EB' : '#E2E8F0',
                    color: isCompleted ? '#166534' : isActive ? '#FFFFFF' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontWeight: 700,
                    fontSize: 11
                  }}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                      check
                    </span>
                  ) : isActive ? (
                    <span className="material-symbols-outlined" style={{ fontSize: 13 }}>
                      {s.icon}
                    </span>
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Text Content */}
                <div style={{ overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      fontSize: 12, 
                      fontWeight: 700, 
                      color: isActive ? '#1D4ED8' : '#1E293B',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                  >
                    {s.label}
                  </div>
                  <div 
                    style={{ 
                      fontSize: 10, 
                      color: isActive ? '#2563EB' : isCompleted ? '#059669' : '#64748B',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
