import React, { useState } from 'react';

interface Conversation {
  id: string;
  name: string;
  role: string;
  avatar: string;
  unread: number;
  lastMessage: string;
  time: string;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: 'c_1',
    name: 'Sarah Vance',
    role: 'Patient (Bay 3A)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face',
    unread: 1,
    lastMessage: 'Dr. Reynolds, the 500ml electrolyte drink helped with the morning dizziness.',
    time: '10:45 AM'
  },
  {
    id: 'c_2',
    name: 'Dr. Rajesh Patel',
    role: 'Attending Surgeon',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&h=120&fit=crop&crop=face',
    unread: 0,
    lastMessage: 'Aisha Al-Mansoor is clear for post-cholecystectomy discharge tomorrow.',
    time: '09:20 AM'
  },
  {
    id: 'c_3',
    name: 'Rapid Response Team (RTT)',
    role: 'Emergency Escalation',
    avatar: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&h=120&fit=crop&crop=face',
    unread: 0,
    lastMessage: 'Bay 1A bed vitals reviewed. Amlodipine titration taking effect.',
    time: 'Yesterday'
  },
  {
    id: 'c_4',
    name: 'Central Pharmacy Dispensary',
    role: 'Hospital Pharmacy',
    avatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&h=120&fit=crop&crop=face',
    unread: 0,
    lastMessage: 'Metoprolol Succinate 25mg batch refilled for floor distribution.',
    time: 'Yesterday'
  }
];

export const MessagesPage: React.FC = () => {
  const [activeConv, setActiveConv] = useState<Conversation>(CONVERSATIONS[0]);
  const [messages, setMessages] = useState<Array<{ sender: 'them' | 'me'; text: string; time: string }>>([
    {
      sender: 'them',
      text: 'Good morning Dr. Reynolds. I checked my resting heart rate this morning as instructed on the app, it was 84 bpm.',
      time: '10:15 AM'
    },
    {
      sender: 'me',
      text: 'Good morning Sarah. Yes, our local baseline telemetry flagged the +19% departure. Have you taken the 500ml oral electrolyte pack yet?',
      time: '10:30 AM'
    },
    {
      sender: 'them',
      text: 'Dr. Reynolds, the 500ml electrolyte drink helped with the morning dizziness.',
      time: '10:45 AM'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        sender: 'me',
        text: inputMsg.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputMsg('');
  };

  return (
    <div style={{ padding: '24px 32px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
          <span>💬</span>
          <span>ENCRYPTED CLINICAL DIRECT MESSAGING</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>
          Clinical Consultations &amp; Handover Messages
        </h1>
      </div>

      {/* Main Chat Split Interface */}
      <div style={{ background: '#FFFFFF', borderRadius: 20, border: '1px solid #E2E8F0', height: 620, display: 'flex', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        {/* Left: Conversations List */}
        <div style={{ width: 340, borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0' }}>
            <input
              type="text"
              placeholder="Search conversations..."
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13 }}
            />
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {CONVERSATIONS.map(c => (
              <div
                key={c.id}
                onClick={() => setActiveConv(c)}
                style={{
                  padding: '14px 18px',
                  borderBottom: '1px solid #F1F5F9',
                  cursor: 'pointer',
                  background: activeConv.id === c.id ? '#EFF6FF' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <img src={c.avatar} alt={c.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: 13, color: '#0F172A' }}>{c.name}</strong>
                    <span style={{ fontSize: 10, color: '#94A3B8' }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#2563EB', fontWeight: 600 }}>{c.role}</div>
                  <div style={{ fontSize: 12, color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
                    {c.lastMessage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Chat Window */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Active Conv Header */}
          <div style={{ padding: '14px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={activeConv.avatar} alt={activeConv.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#0F172A' }}>{activeConv.name}</h3>
                <div style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>● {activeConv.role} • Secure TLS Channel</div>
              </div>
            </div>

            <button
              onClick={() => alert(`Starting video consultation with ${activeConv.name}`)}
              style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <span>📹</span>
              <span>Launch Video Call</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'me' ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'me' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: m.sender === 'me' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    background: m.sender === 'me' ? '#2563EB' : '#F1F5F9',
                    color: m.sender === 'me' ? '#FFFFFF' : '#0F172A',
                    fontSize: 13,
                    lineHeight: 1.5
                  }}
                >
                  {m.text}
                </div>
                <span style={{ fontSize: 10, color: '#94A3B8', marginTop: 4 }}>{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: 10, background: '#FFFFFF' }}>
            <input
              type="text"
              placeholder="Type clinical consultation message..."
              value={inputMsg}
              onChange={e => setInputMsg(e.target.value)}
              style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: 13 }}
            />
            <button
              type="submit"
              style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 10, padding: '12px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
