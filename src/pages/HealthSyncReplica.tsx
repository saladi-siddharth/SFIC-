import React, { useState } from 'react';

export const HealthSyncReplica: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [activeAnalyticsFilter, setActiveAnalyticsFilter] = useState('Hydration');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F5F0', padding: 24, fontFamily: "'Inter', sans-serif", justifyContent: 'center' }}>
      
      {/* Outer Card Matching Image 3 */}
      <div 
        style={{ 
          maxWidth: 1380, 
          width: '100%', 
          background: '#FFFFFF', 
          borderRadius: 24, 
          boxShadow: '0 12px 40px rgba(0,0,0,0.06)', 
          display: 'flex', 
          overflow: 'hidden',
          border: '1px solid #E5E7EB'
        }}
      >
        {/* ================= LEFT SIDEBAR ================= */}
        <aside 
          style={{ 
            width: 220, 
            background: '#FFFFFF', 
            borderRight: '1px solid #F1F3F5', 
            display: 'flex', 
            flexDirection: 'column', 
            padding: '24px 16px',
            flexShrink: 0
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, paddingLeft: 8 }}>
            <span className="material-symbols-outlined" style={{ color: '#22C55E', fontSize: 24 }}>eco</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#22C55E' }}>HealthSync</span>
          </div>

          {/* Menu */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            {[
              { name: 'Dashboard', icon: 'grid_view' },
              { name: 'Medical Records', icon: 'description' },
              { name: 'Doctors', icon: 'group' },
              { name: 'Activity', icon: 'directions_run' },
              { name: 'Medications', icon: 'pill' },
              { name: 'Nutrition', icon: 'nutrition' },
              { name: 'Calendar', icon: 'calendar_month' },
            ].map(item => {
              const isActive = activeMenu === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    borderRadius: 12,
                    border: 'none',
                    background: isActive ? '#22C55E' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#64748B',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 13,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: 'none', background: 'transparent', color: '#94A3B8', fontSize: 13, cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>settings</span>
            <span>Settings</span>
          </button>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px', overflowY: 'auto' }}>
          
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ color: '#64748B', cursor: 'pointer' }}>search</span>
            <span className="material-symbols-outlined" style={{ color: '#64748B', cursor: 'pointer' }}>notifications</span>
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" 
              alt="Katerina" 
              style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          {/* Greeting Banner */}
          <div 
            style={{ 
              background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', 
              borderRadius: 20, 
              padding: '24px 28px', 
              marginBottom: 24,
              border: '1px solid #BBF7D0' 
            }}
          >
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', margin: 0 }}>Good morning, Katerina!</h1>
            <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 16px 0' }}>Today you have 3 upcoming health &amp; wellness events</p>
            <div style={{ height: 8, background: '#E2E8F0', borderRadius: 99, width: '40%', overflow: 'hidden' }}>
              <div style={{ width: '65%', height: '100%', background: '#22C55E', borderRadius: 99 }} />
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {/* Sleep Quality */}
            <div style={{ background: '#F8FAFC', borderRadius: 16, padding: 16, border: '1px solid #F1F3F5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748B', marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ color: '#3B82F6', fontSize: 16 }}>bedtime</span>
                <span>Sleep quality</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>
                86% <span style={{ fontSize: 11, fontWeight: 500, color: '#94A3B8' }}>7h 10min</span>
              </div>
            </div>

            {/* Heart Rate */}
            <div style={{ background: '#F8FAFC', borderRadius: 16, padding: 16, border: '1px solid #F1F3F5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748B', marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ color: '#EF4444', fontSize: 16 }}>favorite</span>
                <span>Heart rate</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>
                72 bpm <span style={{ fontSize: 11, fontWeight: 500, color: '#94A3B8' }}>7h 10min</span>
              </div>
            </div>

            {/* Water Intake */}
            <div style={{ background: '#F8FAFC', borderRadius: 16, padding: 16, border: '1px solid #F1F3F5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748B', marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ color: '#06B6D4', fontSize: 16 }}>water_drop</span>
                <span>Water intake</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>
                25% <span style={{ fontSize: 11, fontWeight: 500, color: '#94A3B8' }}>0.5 / 2.0 litres</span>
              </div>
            </div>

            {/* Steps */}
            <div style={{ background: '#F8FAFC', borderRadius: 16, padding: 16, border: '1px solid #F1F3F5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748B', marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ color: '#22C55E', fontSize: 16 }}>directions_walk</span>
                <span>Steps</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>
                42% <span style={{ fontSize: 11, fontWeight: 500, color: '#94A3B8' }}>7,254 / 20,000</span>
              </div>
            </div>
          </div>

          {/* Middle Row: Habit Tracker, Medication, Calendar, Upcoming */}
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 280px', gap: 20, marginBottom: 24 }}>
            
            {/* Habit Tracker */}
            <div style={{ background: '#F8FAFC', borderRadius: 18, padding: 18, border: '1px solid #F1F3F5' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>Habit tracker</span>
                <span style={{ fontSize: 11, color: '#22C55E', fontWeight: 600, cursor: 'pointer' }}>+ New habit</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
                {[
                  { name: 'Drink 250 ml water', time: '07:00 am', done: true, icon: 'water_drop', color: '#06B6D4' },
                  { name: 'Morning run', time: '07:00 am', done: true, icon: 'directions_run', color: '#EAB308' },
                  { name: 'Drink 250 ml water', time: '08:00 am', done: true, icon: 'water_drop', color: '#06B6D4' },
                  { name: 'Vitamins', time: '08:00 am', done: false, icon: 'pill', color: '#A855F7' },
                  { name: 'Breakfast', time: '08:30 am', done: false, icon: 'restaurant', color: '#22C55E' },
                ].map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: h.color }}>{h.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, color: '#1E293B' }}>{h.name}</div>
                        <div style={{ fontSize: 10, color: '#94A3B8' }}>{h.time}</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined" style={{ color: h.done ? '#22C55E' : '#CBD5E1', fontSize: 18 }}>
                      {h.done ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medication Schedule Grid */}
            <div style={{ background: '#F8FAFC', borderRadius: 18, padding: 18, border: '1px solid #F1F3F5' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>Medication</span>
                <span style={{ fontSize: 11, color: '#64748B' }}>This week ⌵</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 11 }}>
                {['Vitamin D 2000mg', 'Omega 3 1000mg', 'Zinc 50mg', 'Ibuprofen 75mg'].map((med, i) => (
                  <div key={i} style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: 10, border: '1px solid #EEF2F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{med}</span>
                    <span style={{ background: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: 4, fontWeight: 700, fontSize: 10 }}>Taken</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar & Upcoming Events */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* September 2025 Calendar */}
              <div style={{ background: '#F8FAFC', borderRadius: 18, padding: 16, border: '1px solid #F1F3F5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>
                  <span>September 2025</span>
                  <span>‹ ›</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', fontSize: 10, color: '#64748B' }}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d} style={{ fontWeight: 700 }}>{d}</span>)}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <span key={i} style={{ padding: '2px 0', borderRadius: 4, background: i === 1 ? '#22C55E' : 'transparent', color: i === 1 ? '#FFF' : '#334155' }}>
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div style={{ background: '#F8FAFC', borderRadius: 18, padding: 16, border: '1px solid #F1F3F5' }}>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 8 }}>Upcoming Events</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
                  {[
                    { doc: 'Dr. Michael Brown', type: 'Orthopedic', time: '09:00 AM' },
                    { doc: 'Dr. Emily White', type: 'Dentist', time: '10:30 AM' },
                    { doc: 'Sun Loft Studio', type: 'Yoga', time: '17:00 PM' },
                  ].map((e, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#FFFFFF', padding: 8, borderRadius: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{e.type}</div>
                        <div style={{ fontSize: 9, color: '#94A3B8' }}>{e.doc}</div>
                      </div>
                      <span style={{ fontSize: 10, color: '#22C55E', fontWeight: 700 }}>{e.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Analytics Chart */}
          <div style={{ background: '#F8FAFC', borderRadius: 20, padding: 20, border: '1px solid #F1F3F5' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Calories', 'Hydration', 'Activity', 'Heart rate', 'Glucose', 'Blood Count', 'Sleep', 'Oxygen Levels'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveAnalyticsFilter(filter)}
                    style={{
                      background: activeAnalyticsFilter === filter ? '#FEF08A' : '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: 14,
                      padding: '4px 10px',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: 11, color: '#64748B' }}>This week ⌵</span>
            </div>

            {/* Monthly Multibar Chart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 100, padding: '0 20px' }}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                <div key={m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 80 }}>
                    <div style={{ width: 6, height: `${30 + (i % 4) * 15}%`, background: '#FEF08A', borderRadius: 2 }} />
                    <div style={{ width: 6, height: `${40 + (i % 3) * 18}%`, background: '#BFDBFE', borderRadius: 2 }} />
                    <div style={{ width: 6, height: `${50 + (i % 5) * 10}%`, background: '#BBF7D0', borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 9, color: '#94A3B8' }}>{m}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default HealthSyncReplica;
