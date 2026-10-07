import React, { useState } from 'react';

export const AlexHealthReplica: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(23);
  const [activeTab, setActiveTab] = useState('Heart Check');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#E2E8F0', padding: 24, fontFamily: "'Inter', sans-serif", justifyContent: 'center' }}>
      
      {/* Outer Rounded Container Matching Image 2 */}
      <div 
        style={{ 
          maxWidth: 1380, 
          width: '100%', 
          background: '#F8FAFC', 
          borderRadius: 28, 
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)', 
          display: 'flex', 
          overflow: 'hidden',
          border: '1px solid #E2E8F0'
        }}
      >
        {/* ================= LEFT ICON NAVIGATION RAIL ================= */}
        <aside 
          style={{ 
            width: 80, 
            background: '#FFFFFF', 
            borderRight: '1px solid #EEF2F6', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '24px 0', 
            gap: 24 
          }}
        >
          {/* Logo */}
          <div 
            style={{ 
              width: 44, 
              height: 44, 
              borderRadius: '50%', 
              background: '#4F46E5', 
              color: '#FFFFFF', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>health_and_safety</span>
          </div>

          {/* Icon Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
            {/* Home (Selected) */}
            <button 
              style={{ 
                width: 44, 
                height: 44, 
                borderRadius: '50%', 
                background: '#0F172A', 
                color: '#FFFFFF', 
                border: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>home</span>
            </button>

            {[
              'auto_stories',
              'medical_services',
              'favorite',
              'mail',
              'person'
            ].map((icon, i) => (
              <button 
                key={i}
                style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: '50%', 
                  background: 'transparent', 
                  color: '#94A3B8', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'color 0.15s ease'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px' }}>
          
          {/* Top Bar */}
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0 }}>Welcome to Alex!</h2>
            </div>

            {/* Middle Nav Pill */}
            <div 
              style={{ 
                background: '#FFFFFF', 
                borderRadius: 30, 
                padding: '4px 8px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 6,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                border: '1px solid #EEF2F6'
              }}
            >
              <span className="material-symbols-outlined" style={{ color: '#94A3B8', fontSize: 18, marginLeft: 8 }}>search</span>
              <button style={{ background: 'transparent', border: 'none', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, color: '#0F172A', cursor: 'pointer' }}>Dashboard</button>
              <button style={{ background: 'transparent', border: 'none', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, color: '#64748B', cursor: 'pointer' }}>Analities</button>
              <button style={{ background: 'transparent', border: 'none', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, color: '#64748B', cursor: 'pointer' }}>Reports</button>
            </div>

            {/* Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Hi, Alex</div>
                <div style={{ fontSize: 10, color: '#94A3B8' }}>Mon, 23 July</div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" 
                alt="Alex" 
                style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }}
              />
              <button style={{ background: '#FFFFFF', border: '1px solid #EEF2F6', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#64748B' }}>notifications</span>
              </button>
            </div>
          </header>

          {/* Section Title & Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
              Health Monitoring
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button style={{ background: '#FFFFFF', border: '1px solid #EEF2F6', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#64748B' }}>sync</span>
              </button>
              <button style={{ background: '#FFFFFF', border: '1px solid #EEF2F6', borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#0F172A', cursor: 'pointer' }}>
                <span>Week</span>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>expand_more</span>
              </button>
              <button style={{ background: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
              </button>
            </div>
          </div>

          {/* ================= 3-COLUMN CLINICAL DASHBOARD ================= */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', gap: 20, flex: 1 }}>
            
            {/* COLUMN 1: HEART RATE OVERVIEW & AI ANALYTICS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Heart Rate Overview Card */}
              <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #F1F5F9' }}>
                
                {/* Mode Selector Tabs */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  {['Heart Check', 'Saturation', 'Temperature'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        background: activeTab === tab ? '#0F172A' : '#F8FAFC',
                        color: activeTab === tab ? '#FFFFFF' : '#64748B',
                        border: 'none',
                        borderRadius: 20,
                        padding: '8px 16px',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                  <button style={{ background: '#F8FAFC', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#64748B' }}>help_outline</span>
                  </button>
                  <button style={{ background: '#F8FAFC', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#64748B' }}>settings</span>
                  </button>
                </div>

                {/* Card Title & 3D Heart Illustration */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: 0 }}>Heart rate overview</h3>
                  </div>
                  {/* Realistic 3D Heart Graphic Badge */}
                  <div style={{ background: '#F8FAFC', border: '1px solid #EEF2F6', borderRadius: 14, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 26 }}>🫀</span>
                    <div>
                      <div style={{ fontSize: 9, color: '#94A3B8' }}>Average Rate</div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A' }}>115 bpm</div>
                    </div>
                  </div>
                </div>

                {/* Peak 132 bpm Waveform Chart with Histogram Bars */}
                <div style={{ position: 'relative', height: 140, marginBottom: 16 }}>
                  {/* Vertical bar columns for time buckets */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 100, padding: '0 10px' }}>
                    {[35, 45, 55, 80, 50, 40, 30].map((h, i) => (
                      <div key={i} style={{ width: 14, height: `${h}%`, background: i === 3 ? '#E0E7FF' : '#F1F5F9', borderRadius: 8 }} />
                    ))}
                  </div>

                  {/* SVG Wave Line Overlay */}
                  <svg viewBox="0 0 300 100" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 100, overflow: 'visible' }}>
                    <path 
                      d="M 10,70 Q 60,60 110,65 T 150,20 T 190,60 T 240,65 T 290,70" 
                      fill="none" 
                      stroke="#4F46E5" 
                      strokeWidth="2.5" 
                    />
                    {/* Peak marker at 132 */}
                    <circle cx="150" cy="20" r="4" fill="#4F46E5" stroke="#FFF" strokeWidth="2" />
                    <g transform="translate(150, 6)">
                      <rect x="-18" y="-14" width="36" height="18" rx="6" fill="#4F46E5" />
                      <text x="0" y="-2" fill="#FFF" fontSize="9" fontWeight="800" textAnchor="middle">132</text>
                    </g>
                  </svg>

                  {/* Time Labels */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94A3B8', marginTop: 12 }}>
                    <span>6AM</span>
                    <span>7AM</span>
                    <span>8AM</span>
                    <span>9AM</span>
                    <span>10AM</span>
                    <span>11AM</span>
                    <span>12PM</span>
                  </div>
                </div>

                {/* Average & Max Stats */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid #F1F5F9' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748B' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#EF4444' }}>favorite</span>
                      Average
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>115 <span style={{ fontSize: 12, fontWeight: 500, color: '#64748B' }}>bpm</span></div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748B' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#2563EB' }}>trending_up</span>
                      Max
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>132 <span style={{ fontSize: 12, fontWeight: 500, color: '#64748B' }}>bpm</span></div>
                  </div>

                  <button style={{ background: '#F8FAFC', border: '1px solid #EEF2F6', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#64748B' }}>open_in_full</span>
                  </button>
                </div>
              </div>

              {/* AI Analytics Card with DNA double helix */}
              <div 
                style={{ 
                  background: 'linear-gradient(135deg, #090E17, #0B1E3B)', 
                  borderRadius: 24, 
                  padding: 24, 
                  color: '#FFFFFF',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>AI Analytics</h3>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#60A5FA', background: 'rgba(96, 165, 250, 0.2)', padding: '3px 8px', borderRadius: 12 }}>Confidence 95%</span>
                </div>

                <div style={{ height: 60, position: 'relative', marginBottom: 10 }}>
                  {/* Glowing DNA Double Helix Graphic */}
                  <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%' }}>
                    <path d="M 0,30 Q 25,10 50,30 T 100,30 T 150,30 T 200,30" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                    <path d="M 0,30 Q 25,50 50,30 T 100,30 T 150,30 T 200,30" fill="none" stroke="#60A5FA" strokeWidth="2.5" />
                    {[25, 75, 125, 175].map(x => (
                      <line key={x} x1={x} y1="18" x2={x} y2="42" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="2 2" />
                    ))}
                  </svg>
                </div>

                <div style={{ fontSize: 12, fontWeight: 700, color: '#93C5FD', marginBottom: 4 }}>DNA Detection</div>
                <p style={{ fontSize: 11, color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                  Irregular growth in the upper scapula. AI suggests a mild anomaly.
                </p>
              </div>
            </div>

            {/* COLUMN 2: 3D ANATOMICAL BODY WITH CALLOUT ORGANS */}
            <div 
              style={{ 
                background: '#FFFFFF', 
                borderRadius: 24, 
                padding: 24, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                border: '1px solid #F1F5F9'
              }}
            >
              <div style={{ position: 'absolute', top: 20, right: 20 }}>
                <span className="material-symbols-outlined" style={{ color: '#94A3B8', fontSize: 20 }}>north_east</span>
              </div>

              {/* Organ Callouts Floating */}
              {/* Lungs Callout */}
              <div style={{ position: 'absolute', top: 50, left: 20, background: '#FFFFFF', border: '1px solid #EEF2F6', borderRadius: 12, padding: '6px 10px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 18 }}>🫁</span>
                <div>
                  <div style={{ fontSize: 9, color: '#94A3B8' }}>Lungs</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#10B981' }}>Excellent</div>
                </div>
              </div>

              {/* Brain Callout */}
              <div style={{ position: 'absolute', top: 70, right: 20, background: '#FFFFFF', border: '1px solid #EEF2F6', borderRadius: 12, padding: '6px 10px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 18 }}>🧠</span>
                <div>
                  <div style={{ fontSize: 9, color: '#94A3B8' }}>Brain</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#10B981' }}>Excellent</div>
                </div>
              </div>

              {/* Kidney Callout */}
              <div style={{ position: 'absolute', bottom: 120, right: 20, background: '#FFFFFF', border: '1px solid #EEF2F6', borderRadius: 12, padding: '6px 10px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 18 }}>🫘</span>
                <div>
                  <div style={{ fontSize: 9, color: '#94A3B8' }}>Kidney</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#10B981' }}>Excellent</div>
                </div>
              </div>

              {/* 3D Anatomical Standing Figure */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 380, width: '100%' }}>
                <svg viewBox="0 0 200 420" style={{ width: 180, height: 380 }}>
                  {/* Standing Silhouette */}
                  <path 
                    d="M 100,20 C 110,20 118,32 118,48 C 118,60 112,70 110,75 C 116,80 132,88 138,98 C 144,110 148,145 148,175 C 148,195 144,215 140,225 C 136,215 132,175 130,160 C 128,140 122,105 122,105 L 125,195 L 122,235 L 125,325 L 123,380 L 112,380 L 108,305 L 103,245 L 97,245 L 92,305 L 87,380 L 77,380 L 75,325 L 78,235 L 75,195 L 78,105 C 78,105 72,140 70,160 C 68,175 64,215 60,225 C 56,215 52,195 52,175 C 52,145 56,110 62,98 C 68,88 84,80 90,75 C 88,70 82,60 82,48 C 82,32 90,20 100,20 Z" 
                    fill="#E0E7FF" 
                    stroke="#818CF8" 
                    strokeWidth="1.5" 
                  />

                  {/* Internal Anatomical Organs */}
                  <ellipse cx="100" cy="48" rx="12" ry="14" fill="#C7D2FE" />
                  <ellipse cx="90" cy="115" rx="12" ry="18" fill="#BAE6FD" />
                  <ellipse cx="110" cy="115" rx="12" ry="18" fill="#BAE6FD" />
                  <circle cx="104" cy="120" r="12" fill="#EF4444" />
                  <ellipse cx="100" cy="170" rx="18" ry="14" fill="#FDE68A" />

                  {/* Glowing Indicator Pulse Points */}
                  <circle cx="104" cy="120" r="18" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="85" cy="165" r="5" fill="#EF4444" />
                  <circle cx="115" cy="165" r="5" fill="#EF4444" />
                </svg>
              </div>

              {/* Bottom Left: +7H Sleep Gauge */}
              <div style={{ position: 'absolute', bottom: 30, left: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ position: 'relative', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 36 36" style={{ width: 44, height: 44, transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#4F46E5" strokeWidth="3" strokeDasharray="75 100" />
                  </svg>
                  <span style={{ position: 'absolute', fontSize: 10, fontWeight: 800, color: '#0F172A' }}>+7H</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>Sleep</div>
              </div>

              {/* Bottom Slider Indicator Dots */}
              <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                {[0, 1, 2, 3].map(dot => (
                  <span key={dot} style={{ width: dot === 1 ? 16 : 6, height: 6, borderRadius: 3, background: dot === 1 ? '#0F172A' : '#CBD5E1' }} />
                ))}
              </div>
            </div>

            {/* COLUMN 3: DAY SELECTOR, AI TREATMENT & LIFE QUALITY */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              
              {/* Day Selector Row */}
              <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 12, display: 'flex', justifyContent: 'space-between', border: '1px solid #F1F5F9' }}>
                {[
                  { day: 'Sun', date: 21 },
                  { day: 'Mon', date: 22 },
                  { day: 'Tue', date: 23 },
                  { day: 'Wed', date: 24 },
                  { day: 'Thu', date: 25 },
                ].map(d => {
                  const isSelected = selectedDay === d.date;
                  return (
                    <button
                      key={d.date}
                      onClick={() => setSelectedDay(d.date)}
                      style={{
                        background: isSelected ? '#F1F5F9' : 'transparent',
                        border: 'none',
                        borderRadius: 14,
                        padding: '8px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontSize: 11, color: '#94A3B8' }}>{d.day}</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{d.date}</span>
                      {isSelected && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#4F46E5' }} />}
                    </button>
                  );
                })}
              </div>

              {/* "Powered by AI" Atenolol 30 Card */}
              <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 20, border: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ background: 'linear-gradient(135deg, #1E293B, #334155)', color: '#FFFFFF', padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                    Powered by AI
                  </div>
                  <span className="material-symbols-outlined" style={{ color: '#94A3B8', fontSize: 18 }}>north_east</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>Beta-blocker</div>
                    <div style={{ background: '#4F46E5', color: '#FFFFFF', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFF' }} />
                      Atenolol 30
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 8 }}>Rate Reduction</div>
                  </div>

                  {/* Circular Progress Gauge 30/60 */}
                  <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 36 36" style={{ width: 64, height: 64, transform: 'rotate(-90deg)' }}>
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#4F46E5" strokeWidth="4" strokeDasharray="50 100" />
                    </svg>
                    <div style={{ position: 'absolute', fontSize: 12, fontWeight: 800, color: '#0F172A' }}>
                      30<span style={{ fontSize: 9, color: '#94A3B8' }}>/60</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Life Quality Score Card */}
              <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 20, border: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Life Quality</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>1680</div>
                    <div style={{ fontSize: 10, color: '#94A3B8' }}>Quality Points</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#F8FAFC', padding: '4px 10px', borderRadius: 14, fontSize: 11, color: '#64748B' }}>
                    <span>Week</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>expand_more</span>
                  </div>
                </div>

                {/* Donut Chart: 88% overall */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: 130 }}>
                  <svg viewBox="0 0 100 100" style={{ width: 120, height: 120 }}>
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#4F46E5" strokeWidth="14" strokeDasharray="60 180" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#93C5FD" strokeWidth="14" strokeDasharray="40 200" strokeDashoffset="-70" />
                  </svg>
                  <div style={{ position: 'absolute', textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>88%</div>
                  </div>
                </div>

                {/* Sub Labels around donut */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748B', marginTop: 4 }}>
                  <span>Activity</span>
                  <span>Health</span>
                  <span>Food</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default AlexHealthReplica;
