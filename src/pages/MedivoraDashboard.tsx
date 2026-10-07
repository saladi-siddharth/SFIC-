import React, { useState } from 'react';
import { localAiService } from '../services/localAiService';
import { PatientsPage } from './medivora/PatientsPage';
import { AppointmentsPage } from './medivora/AppointmentsPage';
import { HealthRecordsPage } from './medivora/HealthRecordsPage';
import { AiInsightsPage } from './medivora/AiInsightsPage';
import { DiagnosticsPage } from './medivora/DiagnosticsPage';
import { TreatmentsPage } from './medivora/TreatmentsPage';
import { MedicationsPage } from './medivora/MedicationsPage';
import { ReportsPage } from './medivora/ReportsPage';
import { AnalyticsPage } from './medivora/AnalyticsPage';
import { AlertsPage } from './medivora/AlertsPage';
import { MessagesPage } from './medivora/MessagesPage';
import { SettingsPage } from './medivora/SettingsPage';

export const MedivoraDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrgan, setSelectedOrgan] = useState<string>('Heart');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Local Qwen2.5-Coder-7B AI Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      role: 'assistant',
      text: 'Hello, Dr. Reynolds. I am your Medivora AI Copilot powered by the on-device Qwen2.5-Coder-7B GGUF model. How can I assist with patient telemetry analysis or baseline trends today?',
      time: '10:42 AM'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSendChatMessage = async (msgToSend?: string) => {
    const text = msgToSend || chatInput;
    if (!text.trim() || isChatLoading) return;

    const userEntry = {
      role: 'user' as const,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userEntry]);
    if (!msgToSend) setChatInput('');
    setIsChatLoading(true);

    try {
      const reply = await localAiService.askAssistant(text.trim());
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant' as const,
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant' as const,
          text: 'Error connecting to local inference engine. Telemetry grounded fallback active.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: 'grid_view' },
    { name: 'Patients', icon: 'people' },
    { name: 'Appointments', icon: 'calendar_month' },
    { name: 'Health Records', icon: 'folder_shared' },
    { name: 'AI Insights', icon: 'auto_awesome' },
    { name: 'Diagnostics', icon: 'biotech' },
    { name: 'Treatments', icon: 'medication' },
    { name: 'Medications', icon: 'pill' },
    { name: 'Reports', icon: 'description' },
    { name: 'Analytics', icon: 'bar_chart' },
    { name: 'Alerts', icon: 'notifications', badge: 6 },
    { name: 'Messages', icon: 'chat_bubble' },
    { name: 'Settings', icon: 'settings' },
  ];

  const upcomingAppointments = [
    {
      name: 'Sarah Johnson',
      type: 'Cardiology Consultation',
      time: '10:00 AM',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      status: 'Upcoming'
    },
    {
      name: 'James Williams',
      type: 'Follow-up Checkup',
      time: '11:30 AM',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      status: 'Upcoming'
    },
    {
      name: 'Olivia Brown',
      type: 'Blood Test',
      time: '02:00 PM',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      status: 'Upcoming'
    },
    {
      name: 'Michael Davis',
      type: 'X-Ray Scan',
      time: '03:30 PM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      status: 'Upcoming'
    },
  ];

  const recentLabResults = [
    { test: 'Complete Blood Count', date: 'May 14, 2025 • 9:15 AM', status: 'Normal', color: '#10B981', bg: '#DCFCE7' },
    { test: 'Lipid Profile', date: 'May 13, 2025 • 2:30 PM', status: 'Borderline', color: '#D97706', bg: '#FEF3C7' },
    { test: 'Liver Function Test', date: 'May 12, 2025 • 11:45 AM', status: 'Normal', color: '#10B981', bg: '#DCFCE7' },
    { test: 'Thyroid Profile', date: 'May 11, 2025 • 10:20 AM', status: 'Normal', color: '#10B981', bg: '#DCFCE7' },
    { test: 'Vitamin D (25-OH)', date: 'May 10, 2025 • 09:30 AM', status: 'Normal', color: '#10B981', bg: '#DCFCE7' },
  ];

  const activityFeed = [
    { title: 'Lab results for Sarah Johnson are ready', time: '5 min ago', icon: 'science', color: '#10B981' },
    { title: 'New patient registered: Olivia Brown', time: '15 min ago', icon: 'person_add', color: '#3B82F6' },
    { title: 'Appointment with James Williams confirmed', time: '25 min ago', icon: 'event_available', color: '#8B5CF6' },
    { title: 'High BP alert for Michael Davis', time: '40 min ago', icon: 'warning', color: '#EF4444' },
    { title: 'Medication reminder sent to 8 patients', time: '1 hour ago', icon: 'medication', color: '#F59E0B' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F7FC', color: '#1E293B', fontFamily: "'Inter', sans-serif" }}>
      
      {/* ================= LEFT SIDEBAR ================= */}
      <aside 
        style={{ 
          width: 250, 
          background: '#FFFFFF', 
          borderRight: '1px solid #E5E9F2', 
          display: 'flex', 
          flexDirection: 'column', 
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto'
        }}
      >
        {/* Logo */}
        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div 
            style={{ 
              width: 38, 
              height: 38, 
              borderRadius: 10, 
              background: 'linear-gradient(135deg, #2563EB, #06B6D4)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' 
            }}
          >
            <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 20, fontFamily: "'Inter', sans-serif" }}>M</span>
          </div>
          <div>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>Medivora</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#2563EB', marginLeft: 4 }}>AI</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ padding: '0 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => {
            const isActive = activeMenu === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: 'none',
                  background: isActive ? '#EFF6FF' : 'transparent',
                  color: isActive ? '#2563EB' : '#64748B',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span 
                    className="material-symbols-outlined" 
                    style={{ fontSize: 20, color: isActive ? '#2563EB' : '#94A3B8' }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span 
                    style={{ 
                      background: '#EF4444', 
                      color: '#FFFFFF', 
                      borderRadius: '50%', 
                      width: 20, 
                      height: 20, 
                      fontSize: 11, 
                      fontWeight: 700, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* AI Health Assistant Box at Bottom of Sidebar */}
        <div style={{ padding: '16px 14px 20px' }}>
          <div 
            style={{ 
              background: 'linear-gradient(145deg, #F0F4FF, #E6F0FA)', 
              border: '1px solid #D6E4FF', 
              borderRadius: 16, 
              padding: 16,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>AI Health Assistant</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }}></span>
                <span style={{ fontSize: 10, color: '#10B981', fontWeight: 600 }}>Online</span>
              </div>
            </div>
            
            <p style={{ fontSize: 11, color: '#64748B', lineHeight: 1.4, marginBottom: 12 }}>
              Ask anything about patients or insights
            </p>

            <button 
              onClick={() => setIsAiModalOpen(true)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                padding: '9px 12px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: '0 4px 10px rgba(37, 99, 235, 0.25)'
              }}
            >
              <span>Chat with AI</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Header Bar */}
        <header 
          style={{ 
            height: 70, 
            background: '#FFFFFF', 
            borderBottom: '1px solid #E5E9F2', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 40
          }}
        >
          {/* Search Box & Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {activeMenu !== 'Dashboard' && (
              <button
                onClick={() => setActiveMenu('Dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: 10,
                  padding: '7px 14px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#2563EB',
                  cursor: 'pointer'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
                <span>Dashboard</span>
              </button>
            )}

            <div style={{ position: 'relative', width: activeMenu !== 'Dashboard' ? 340 : 440 }}>
              <span 
                className="material-symbols-outlined" 
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: 18 }}
              >
                search
              </span>
              <input 
                type="text" 
                placeholder={`Search ${activeMenu.toLowerCase()}, clinical records, tests... ⌘ K`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 10,
                  padding: '9px 16px 9px 40px',
                  fontSize: 13,
                  color: '#1E293B',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
              />
            </div>
          </div>

          {/* Right Doctor Profile & Notifications */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Notification Bell */}
            <button 
              onClick={() => setActiveMenu('Alerts')}
              title="6 Active Clinical Alerts"
              style={{ 
                position: 'relative', 
                background: activeMenu === 'Alerts' ? '#EFF6FF' : '#F8FAFC', 
                border: activeMenu === 'Alerts' ? '1px solid #BFDBFE' : '1px solid #E2E8F0', 
                borderRadius: '50%', 
                width: 40, 
                height: 40, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer',
                color: activeMenu === 'Alerts' ? '#2563EB' : '#64748B'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>notifications</span>
              <span 
                style={{ 
                  position: 'absolute', 
                  top: 8, 
                  right: 8, 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  background: '#EF4444', 
                  boxShadow: '0 0 0 2px #FFFFFF'
                }} 
              />
            </button>

            {/* Chat Icon */}
            <button 
              onClick={() => setActiveMenu('Messages')}
              title="Clinical Messages"
              style={{ 
                background: activeMenu === 'Messages' ? '#EFF6FF' : '#F8FAFC', 
                border: activeMenu === 'Messages' ? '1px solid #BFDBFE' : '1px solid #E2E8F0', 
                borderRadius: '50%', 
                width: 40, 
                height: 40, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer',
                color: activeMenu === 'Messages' ? '#2563EB' : '#64748B'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chat</span>
            </button>

            {/* Doctor Profile Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 8, borderLeft: '1px solid #E2E8F0' }}>
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&crop=face" 
                alt="Dr. Alex Morgan" 
                style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>Dr. Alex Morgan</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>Cardiologist</div>
              </div>
            </div>
          </div>
        </header>

        {/* Clinical Workspace Body */}
        <main style={{ padding: '24px 32px 48px', display: 'flex', flexDirection: 'column', gap: 24, flex: 1, minWidth: 0 }}>
          {/* Sub-Pages for All 12 Navigation Items */}
          {activeMenu === 'Patients' && <PatientsPage />}
          {activeMenu === 'Appointments' && <AppointmentsPage />}
          {activeMenu === 'Health Records' && <HealthRecordsPage />}
          {activeMenu === 'AI Insights' && <AiInsightsPage />}
          {activeMenu === 'Diagnostics' && <DiagnosticsPage />}
          {activeMenu === 'Treatments' && <TreatmentsPage />}
          {activeMenu === 'Medications' && <MedicationsPage />}
          {activeMenu === 'Reports' && <ReportsPage />}
          {activeMenu === 'Analytics' && <AnalyticsPage />}
          {activeMenu === 'Alerts' && <AlertsPage />}
          {activeMenu === 'Messages' && <MessagesPage />}
          {activeMenu === 'Settings' && <SettingsPage />}

          {/* Medivora Core Dashboard View */}
          {activeMenu === 'Dashboard' && (
            <>
              {/* ================= GREETING & 3 KPI CARDS ================= */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
                Good morning, Dr. Alex 👋
              </h1>
              <p style={{ fontSize: 13, color: '#64748B', marginTop: 4, margin: 0 }}>
                Here's an overview of your patients and key health insights.
              </p>
            </div>

            {/* 3 KPI Cards */}
            <div style={{ display: 'flex', gap: 16, flex: 1, justifyContent: 'flex-end', minWidth: 600 }}>
              {/* Total Patients */}
              <div 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 14, 
                  padding: '14px 20px', 
                  border: '1px solid #E5E9F2', 
                  flex: 1, 
                  maxWidth: 220,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>people</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Total Patients</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>2,458</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>↑ 12.5%</span>
                </div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>vs last month</div>
              </div>

              {/* Appointments */}
              <div 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 14, 
                  padding: '14px 20px', 
                  border: '1px solid #E5E9F2', 
                  flex: 1, 
                  maxWidth: 220,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_month</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Appointments</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>63</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>↑ 8.3%</span>
                </div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>vs last month</div>
              </div>

              {/* Critical Alerts */}
              <div 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 14, 
                  padding: '14px 20px', 
                  border: '1px solid #E5E9F2', 
                  flex: 1, 
                  maxWidth: 220,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>warning</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Critical Alerts</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>12</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#EF4444' }}>↓ 4.2%</span>
                </div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>vs last month</div>
              </div>
            </div>
          </div>

          {/* ================= MAIN 3-COLUMN CORE GRID ================= */}
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 340px', gap: 20 }}>
            
            {/* ================= COL 1: 3D ANATOMICAL MODEL ================= */}
            <div 
              style={{ 
                background: '#FFFFFF', 
                borderRadius: 18, 
                border: '1px solid #E5E9F2', 
                padding: '24px 20px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              {/* Interactive Organ Callout Badges on Left & Right */}
              <div style={{ width: '100%', position: 'relative', minHeight: 440, display: 'flex', justifyContent: 'center' }}>
                
                {/* Floating Organ Indicator Pills */}
                {/* Heart */}
                <div 
                  onClick={() => setSelectedOrgan('Heart')}
                  style={{
                    position: 'absolute',
                    top: 100,
                    left: 0,
                    background: selectedOrgan === 'Heart' ? '#FEF2F2' : '#FFFFFF',
                    border: selectedOrgan === 'Heart' ? '1.5px solid #EF4444' : '1px solid #E2E8F0',
                    borderRadius: 20,
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }}></span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0F172A' }}>Heart</span>
                  <span style={{ fontSize: 10, color: '#10B981', fontWeight: 600 }}>Normal</span>
                </div>

                {/* Lungs */}
                <div 
                  onClick={() => setSelectedOrgan('Lungs')}
                  style={{
                    position: 'absolute',
                    top: 170,
                    left: 0,
                    background: selectedOrgan === 'Lungs' ? '#EFF6FF' : '#FFFFFF',
                    border: selectedOrgan === 'Lungs' ? '1.5px solid #3B82F6' : '1px solid #E2E8F0',
                    borderRadius: 20,
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6' }}></span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0F172A' }}>Lungs</span>
                  <span style={{ fontSize: 10, color: '#10B981', fontWeight: 600 }}>Good</span>
                </div>

                {/* Muscles */}
                <div 
                  onClick={() => setSelectedOrgan('Muscles')}
                  style={{
                    position: 'absolute',
                    top: 240,
                    left: 0,
                    background: selectedOrgan === 'Muscles' ? '#FFFBEB' : '#FFFFFF',
                    border: selectedOrgan === 'Muscles' ? '1.5px solid #F59E0B' : '1px solid #E2E8F0',
                    borderRadius: 20,
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }}></span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0F172A' }}>Muscles</span>
                  <span style={{ fontSize: 10, color: '#10B981', fontWeight: 600 }}>Strong</span>
                </div>

                {/* Mental */}
                <div 
                  onClick={() => setSelectedOrgan('Mental')}
                  style={{
                    position: 'absolute',
                    top: 310,
                    left: 0,
                    background: selectedOrgan === 'Mental' ? '#F5F3FF' : '#FFFFFF',
                    border: selectedOrgan === 'Mental' ? '1.5px solid #8B5CF6' : '1px solid #E2E8F0',
                    borderRadius: 20,
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#8B5CF6' }}></span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0F172A' }}>Mental</span>
                  <span style={{ fontSize: 10, color: '#10B981', fontWeight: 600 }}>Stable</span>
                </div>

                {/* Highly Realistic 3D Anatomical Human Model Graphic */}
                <svg viewBox="0 0 220 440" style={{ width: 220, height: 440, filter: 'drop-shadow(0 6px 16px rgba(37, 99, 235, 0.2))' }}>
                  <defs>
                    <linearGradient id="bodyMuscleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                    <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="1" />
                      <stop offset="60%" stopColor="#DC2626" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#991B1B" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="lungGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Anatomical Head and Brain */}
                  <ellipse cx="110" cy="40" rx="20" ry="26" fill="url(#bodyMuscleGrad)" opacity="0.95" />
                  <ellipse cx="110" cy="36" rx="14" ry="16" fill="#8B5CF6" opacity="0.75" />

                  {/* Neck and Shoulders */}
                  <path d="M 100,64 L 120,64 L 126,78 L 94,78 Z" fill="url(#bodyMuscleGrad)" />
                  <path d="M 94,78 C 65,82 50,105 44,130 L 58,135 C 64,115 75,98 94,92 Z" fill="url(#bodyMuscleGrad)" />
                  <path d="M 126,78 C 155,82 170,105 176,130 L 162,135 C 156,115 145,98 126,92 Z" fill="url(#bodyMuscleGrad)" />

                  {/* Arms */}
                  <path d="M 44,130 C 38,165 32,205 28,245 L 38,248 C 42,210 48,170 58,135 Z" fill="url(#bodyMuscleGrad)" opacity="0.9" />
                  <path d="M 176,130 C 182,165 188,205 192,245 L 182,248 C 178,210 172,170 162,135 Z" fill="url(#bodyMuscleGrad)" opacity="0.9" />

                  {/* Torso & Muscle Ribcage */}
                  <path 
                    d="M 94,92 L 126,92 C 145,100 150,140 148,190 C 146,230 140,250 135,260 L 85,260 C 80,250 74,230 72,190 C 70,140 75,100 94,92 Z" 
                    fill="url(#bodyMuscleGrad)" 
                    opacity="0.92"
                  />

                  {/* Glowing Internal Organs */}
                  {/* Lungs (Bilateral) */}
                  <ellipse cx="94" cy="125" rx="14" ry="22" fill="url(#lungGlow)" />
                  <ellipse cx="126" cy="125" rx="14" ry="22" fill="url(#lungGlow)" />

                  {/* Glowing 3D Heart */}
                  <circle cx="114" cy="130" r="16" fill="url(#heartGlow)" />
                  <path 
                    d="M 114,124 C 114,120 110,116 106,116 C 101,116 98,120 98,124 C 98,132 114,142 114,142 C 114,142 130,132 130,124 C 130,120 127,116 122,116 C 118,116 114,120 114,124 Z" 
                    fill="#EF4444" 
                    filter="drop-shadow(0 0 8px #EF4444)"
                  />

                  {/* Abdominal & Intestinal tract */}
                  <ellipse cx="110" cy="195" rx="22" ry="18" fill="#F59E0B" opacity="0.8" />
                  <path d="M 95,215 C 105,222 115,212 125,220 C 115,228 105,225 95,215 Z" fill="#F97316" />

                  {/* Pelvis & Legs */}
                  <path d="M 85,260 L 105,260 L 100,340 L 92,420 L 78,420 L 84,340 Z" fill="url(#bodyMuscleGrad)" />
                  <path d="M 135,260 L 115,260 L 120,340 L 128,420 L 142,420 L 136,340 Z" fill="url(#bodyMuscleGrad)" />

                  {/* Subtle Joint Ring Targets */}
                  <circle cx="114" cy="130" r="24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                  <circle cx="68" cy="275" r="12" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                  <circle cx="152" cy="275" r="12" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                </svg>
              </div>

              {/* Overall Health Score Pill Box */}
              <div 
                style={{ 
                  width: '100%', 
                  background: 'linear-gradient(135deg, #0F172A, #1E293B)', 
                  borderRadius: 14, 
                  padding: '14px 18px', 
                  color: '#FFFFFF',
                  marginTop: 12,
                  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.15)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8' }}>Overall Health Score</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981', background: '#064E3B', padding: '2px 8px', borderRadius: 12 }}>Excellent</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif" }}>92</span>
                    <span style={{ fontSize: 14, color: '#94A3B8' }}>/100</span>
                  </div>
                  {/* Mini ECG waveform curve */}
                  <svg viewBox="0 0 80 24" style={{ width: 80, height: 24 }}>
                    <path d="M 0,12 L 20,12 L 28,4 L 36,20 L 44,6 L 52,16 L 60,12 L 80,12" fill="none" stroke="#10B981" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* Zoom and 3D View Controls */}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {['rotate_left', 'zoom_out', 'zoom_in', 'accessibility'].map((icon) => (
                  <button 
                    key={icon}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: 8,
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#64748B'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ================= COL 2: VITALS, CONTINUOUS RHYTHM & LABS ================= */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              
              {/* Vitals Overview Card */}
              <div 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 18, 
                  border: '1px solid #E5E9F2', 
                  padding: 20,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                {/* Vitals Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>Vitals Overview</h3>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Real-time sensor telemetry</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#475569' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#64748B' }}>calendar_today</span>
                    <span>Today, 14 May 2025</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>expand_more</span>
                  </div>
                </div>

                {/* 4 Vital Stat Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                  {/* Heart Rate */}
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#EF4444', marginBottom: 4 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>favorite</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>Heart Rate</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>72 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>bpm</span></div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981', background: '#DCFCE7', padding: '2px 6px', borderRadius: 4, display: 'inline-block', marginTop: 4 }}>Normal</span>
                  </div>

                  {/* Blood Pressure */}
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#3B82F6', marginBottom: 4 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>water_drop</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>Blood Pressure</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>120/80 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>mmHg</span></div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981', background: '#DCFCE7', padding: '2px 6px', borderRadius: 4, display: 'inline-block', marginTop: 4 }}>Normal</span>
                  </div>

                  {/* Oxygen Level */}
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0EA47A', marginBottom: 4 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>air</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>Oxygen Level</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>98 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>%</span></div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981', background: '#DCFCE7', padding: '2px 6px', borderRadius: 4, display: 'inline-block', marginTop: 4 }}>Normal</span>
                  </div>

                  {/* Temperature */}
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#F59E0B', marginBottom: 4 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>device_thermostat</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>Temperature</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>36.6 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>°C</span></div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981', background: '#DCFCE7', padding: '2px 6px', borderRadius: 4, display: 'inline-block', marginTop: 4 }}>Normal</span>
                  </div>
                </div>

                {/* Continuous 24h Rhythm Chart */}
                <div style={{ background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', padding: 16 }}>
                  <div style={{ position: 'relative', height: 140 }}>
                    <svg viewBox="0 0 600 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      {/* Grid Horizontal Guidelines */}
                      <line x1="0" y1="20" x2="600" y2="20" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="60" x2="600" y2="60" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="100" x2="600" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

                      {/* Continuous Heart Wave Curve */}
                      <path 
                        d="M 0,70 Q 30,72 60,65 T 120,68 T 160,50 T 200,60 T 240,65 L 260,30 L 270,110 L 280,40 L 290,75 L 340,70 T 400,60 T 450,55 T 500,68 T 550,65 L 600,65" 
                        fill="none" 
                        stroke="#3B82F6" 
                        strokeWidth="2.5" 
                      />

                      {/* Floating Tooltip at 72 bpm */}
                      <circle cx="280" cy="40" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                      <g transform="translate(280, 20)">
                        <rect x="-30" y="-18" width="60" height="20" rx="4" fill="#2563EB" />
                        <text x="0" y="-4" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle">72 bpm</text>
                      </g>
                    </svg>
                  </div>

                  {/* Time Labels */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94A3B8', marginTop: 8 }}>
                    <span>12 AM</span>
                    <span>4 AM</span>
                    <span>8 AM</span>
                    <span>12 PM</span>
                    <span>4 PM</span>
                    <span>8 PM</span>
                    <span>12 AM</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#64748B', marginTop: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }}></span>
                    <span>Last updated: 5 min ago</span>
                  </div>
                </div>
              </div>

              {/* Lower 3 Diagnostic Cards: Risk Analysis, Lab Results, Top Conditions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                
                {/* 1. Health Risk Analysis */}
                <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E5E9F2', padding: 18, boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', margin: 0 }}>Health Risk Analysis</h4>
                    <span style={{ fontSize: 11, color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>View details</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { name: 'Cardiovascular Risk', level: 'Low', val: 18, color: '#10B981' },
                      { name: 'Diabetes Risk', level: 'Low', val: 22, color: '#06B6D4' },
                      { name: 'Respiratory Risk', level: 'Medium', val: 46, color: '#F59E0B' },
                      { name: 'Stress Level', level: 'Low', val: 24, color: '#10B981' },
                      { name: 'Sleep Quality', level: 'Good', val: 82, color: '#3B82F6' },
                    ].map(r => (
                      <div key={r.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                          <span style={{ color: '#475569' }}>{r.name}</span>
                          <span style={{ fontWeight: 700, color: r.color }}>{r.level} {r.val}%</span>
                        </div>
                        <div style={{ height: 6, background: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                          <div style={{ width: `${r.val}%`, height: '100%', background: r.color, borderRadius: 99 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Recent Lab Results */}
                <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E5E9F2', padding: 18, boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', margin: 0 }}>Recent Lab Results</h4>
                    <span style={{ fontSize: 11, color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>View all</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {recentLabResults.map((lab, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A' }}>{lab.test}</div>
                          <div style={{ fontSize: 10, color: '#94A3B8' }}>{lab.date}</div>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: lab.color, background: lab.bg, padding: '2px 8px', borderRadius: 4 }}>
                          {lab.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Top Conditions Donut Chart */}
                <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E5E9F2', padding: 18, boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', margin: 0 }}>Top Conditions</h4>
                    <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>This Month ⌵</span>
                  </div>

                  {/* SVG Donut */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: 120 }}>
                    <svg viewBox="0 0 100 100" style={{ width: 110, height: 110 }}>
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#3B82F6" strokeWidth="14" strokeDasharray="75 160" strokeDashoffset="0" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#06B6D4" strokeWidth="14" strokeDasharray="55 180" strokeDashoffset="-75" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="40 195" strokeDashoffset="-130" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#EF4444" strokeWidth="14" strokeDasharray="26 210" strokeDashoffset="-170" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#8B5CF6" strokeWidth="14" strokeDasharray="20 215" strokeDashoffset="-196" />
                    </svg>
                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 900, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>2,458</div>
                      <div style={{ fontSize: 8, color: '#94A3B8' }}>Total Cases</div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontSize: 10, marginTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6' }}></span>Hypertension 34%</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06B6D4' }}></span>Diabetes 26%</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }}></span>Respiratory 18%</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }}></span>Cardiovascular 12%</div>
                  </div>
                </div>

              </div>

            </div>

            {/* ================= COL 3: APPOINTMENTS, AI INSIGHTS & FEED ================= */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              
              {/* Upcoming Appointments */}
              <div 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 18, 
                  border: '1px solid #E5E9F2', 
                  padding: 20,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0 }}>Upcoming Appointments</h4>
                  <span style={{ fontSize: 11, color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>View all</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {upcomingAppointments.map((apt, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img 
                          src={apt.avatar} 
                          alt={apt.name} 
                          style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{apt.name}</div>
                          <div style={{ fontSize: 10, color: '#64748B' }}>{apt.type}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>{apt.time}</div>
                        <span style={{ fontSize: 9, fontWeight: 600, color: '#2563EB', background: '#EFF6FF', padding: '1px 6px', borderRadius: 4 }}>
                          {apt.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Health Insights Gradient Card */}
              <div 
                style={{ 
                  background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', 
                  borderRadius: 18, 
                  padding: 20, 
                  color: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(124, 58, 237, 0.25)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 800 }}>AI Health Insights</span>
                  <span style={{ fontSize: 9, fontWeight: 800, background: '#FFFFFF', color: '#7C3AED', padding: '2px 6px', borderRadius: 8 }}>New</span>
                </div>

                <p style={{ fontSize: 12, lineHeight: 1.5, opacity: 0.9, marginBottom: 14 }}>
                  Our AI has detected 3 important insights for your review.
                </p>

                <button 
                  onClick={() => setIsAiModalOpen(true)}
                  style={{
                    background: '#FFFFFF',
                    color: '#7C3AED',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span>View Insights</span>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </button>

                {/* 3D Glowing Star Element Graphic */}
                <svg viewBox="0 0 60 60" style={{ position: 'absolute', right: 10, bottom: 10, width: 60, height: 60, opacity: 0.85 }}>
                  <polygon points="30,0 38,20 60,22 42,36 48,58 30,44 12,58 18,36 0,22 22,20" fill="url(#starGrad)" />
                  <defs>
                    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#C4B5FD" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Activity Feed */}
              <div 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 18, 
                  border: '1px solid #E5E9F2', 
                  padding: 20,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0 }}>Activity Feed</h4>
                  <span style={{ fontSize: 11, color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>View all</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {activityFeed.map((feed, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div 
                        style={{ 
                          width: 26, 
                          height: 26, 
                          borderRadius: '50%', 
                          background: `${feed.color}15`, 
                          color: feed.color, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 2
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{feed.icon}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#1E293B', lineHeight: 1.3 }}>{feed.title}</div>
                        <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{feed.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ================= BOTTOM QUICK ACTIONS BAR ================= */}
          <div 
            style={{ 
              background: '#FFFFFF', 
              borderRadius: 18, 
              border: '1px solid #E5E9F2', 
              padding: '20px 24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 14 }}>Quick Actions</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
              {[
                { title: 'Add Patient', sub: 'Create new profile', icon: 'person_add', color: '#2563EB', target: 'Patients' },
                { title: 'Schedule Appointment', sub: 'Book a new slot', icon: 'calendar_add_on', color: '#7C3AED', target: 'Appointments' },
                { title: 'Order Lab Test', sub: 'Request test', icon: 'science', color: '#0EA47A', target: 'Diagnostics' },
                { title: 'Generate Report', sub: 'AI summary', icon: 'summarize', color: '#F59E0B', target: 'Reports' },
                { title: 'Prescription', sub: 'Write prescription', icon: 'prescription', color: '#EC4899', target: 'Medications' },
                { title: 'Send Message', sub: 'To patient', icon: 'chat', color: '#6366F1', target: 'Messages' },
              ].map(action => (
                <button
                  key={action.title}
                  onClick={() => setActiveMenu(action.target)}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    padding: '12px 14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${action.color}15`, color: action.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{action.icon}</span>
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{action.title}</div>
                    <div style={{ fontSize: 10, color: '#64748B', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{action.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
            </>
          )}

        </main>
      </div>

      {/* AI Assistant Chat Modal Powered by Local Qwen2.5 GGUF Model */}
      {isAiModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
          onClick={() => setIsAiModalOpen(false)}
        >
          <div 
            style={{ 
              background: '#FFFFFF', 
              borderRadius: 24, 
              width: '100%', 
              maxWidth: 620, 
              height: 640,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              border: '1px solid #E2E8F0'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ padding: '20px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>smart_toy</span>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>Medivora Clinical AI Assistant</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981' }}></span>
                    <span style={{ fontSize: 11, color: '#2563EB', fontWeight: 700 }}>Local Model: Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)} 
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>

            {/* Quick Suggestion Pills */}
            <div style={{ padding: '10px 24px', background: '#EFF6FF', borderBottom: '1px solid #DBEAFE', display: 'flex', gap: 8, overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {[
                'Explain Sarah Vance resting HR elevation',
                'Analyze 24h ECG rhythm consistency',
                'Suggest preventive lifestyle recovery steps'
              ].map((pill, i) => (
                <button
                  key={i}
                  onClick={() => handleSendChatMessage(pill)}
                  disabled={isChatLoading}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #BFDBFE',
                    borderRadius: 14,
                    padding: '4px 10px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#1E40AF',
                    cursor: 'pointer'
                  }}
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Chat Message Scroll Area */}
            <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div 
                    style={{
                      padding: '12px 16px',
                      borderRadius: msg.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      background: msg.role === 'user' ? '#2563EB' : '#F1F5F9',
                      color: msg.role === 'user' ? '#FFFFFF' : '#0F172A',
                      fontSize: 13,
                      lineHeight: 1.5,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                    }}
                  >
                    {msg.text}
                  </div>
                  <span style={{ fontSize: 10, color: '#94A3B8', marginTop: 4, padding: '0 4px' }}>
                    {msg.time} {msg.role === 'assistant' ? '• Qwen2.5 Local' : ''}
                  </span>
                </div>
              ))}

              {isChatLoading && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#F1F5F9', borderRadius: 14 }}>
                  <span style={{ fontSize: 12, color: '#2563EB', fontWeight: 600 }}>Qwen2.5 is thinking...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', background: '#FFFFFF', display: 'flex', gap: 10 }}>
              <input 
                type="text" 
                placeholder="Ask Qwen2.5 about vitals, baselines, ECG, or labs..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendChatMessage(); }}
                disabled={isChatLoading}
                style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: '1px solid #CBD5E1', fontSize: 13, outline: 'none' }}
              />
              <button 
                onClick={() => handleSendChatMessage()}
                disabled={isChatLoading || !chatInput.trim()}
                style={{
                  background: isChatLoading || !chatInput.trim() ? '#94A3B8' : '#2563EB',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 20px',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: isChatLoading || !chatInput.trim() ? 'not-allowed' : 'pointer'
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MedivoraDashboard;
