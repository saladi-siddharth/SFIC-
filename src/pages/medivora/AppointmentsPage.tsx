import React, { useState } from 'react';

interface Appointment {
  id: string;
  patientName: string;
  patientAge: number;
  avatar: string;
  doctorName: string;
  department: string;
  time: string;
  date: string;
  type: 'In-Person' | 'Telehealth' | 'Follow-up' | 'Emergency Triage';
  status: 'Confirmed' | 'In Progress' | 'Completed' | 'Pending';
  room: string;
  notes: string;
}

const APPOINTMENTS_DATA: Appointment[] = [
  {
    id: 'apt_1',
    patientName: 'Sarah Vance',
    patientAge: 42,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face',
    doctorName: 'Dr. Gregory Reynolds',
    department: 'Cardiology',
    time: '10:00 AM - 10:45 AM',
    date: 'Today',
    type: 'In-Person',
    status: 'In Progress',
    room: 'Consultation Suite 302',
    notes: 'Investigating post-viral sinus tachycardia and HRV decline.'
  },
  {
    id: 'apt_2',
    patientName: 'Robert Chen',
    patientAge: 58,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    doctorName: 'Dr. Gregory Reynolds',
    department: 'Endocrinology',
    time: '11:30 AM - 12:00 PM',
    date: 'Today',
    type: 'Follow-up',
    status: 'Confirmed',
    room: 'Room 204',
    notes: 'Glycemic variability assessment and wearable glucose sensor calibration.'
  },
  {
    id: 'apt_3',
    patientName: 'Elena Rostova',
    patientAge: 29,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face',
    doctorName: 'Dr. Maya Lin',
    department: 'Neurology',
    time: '02:00 PM - 02:30 PM',
    date: 'Today',
    type: 'Telehealth',
    status: 'Confirmed',
    room: 'Virtual Clinic Room 1',
    notes: 'Orthostatic fatigue review via remote telemetry baseline.'
  },
  {
    id: 'apt_4',
    patientName: 'David Okafor',
    patientAge: 63,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    doctorName: 'Dr. Gregory Reynolds',
    department: 'Cardiology',
    time: '03:45 PM - 04:15 PM',
    date: 'Today',
    type: 'Emergency Triage',
    status: 'Confirmed',
    room: 'Bay 1A - ICU Stepdown',
    notes: 'Hypertensive crisis follow-up; continuous 24h ECG rhythm check.'
  },
  {
    id: 'apt_5',
    patientName: 'Aisha Al-Mansoor',
    patientAge: 35,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face',
    doctorName: 'Dr. Rajesh Patel',
    department: 'General Surgery',
    time: '09:00 AM - 09:30 AM',
    date: 'Tomorrow',
    type: 'Follow-up',
    status: 'Pending',
    room: 'Day Care 04',
    notes: 'Surgical wound inspection and post-op mobility review.'
  }
];

export const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS_DATA);
  const [activeDateTab, setActiveDateTab] = useState<'Today' | 'Tomorrow' | 'All'>('Today');
  const [showBookModal, setShowBookModal] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newType, setNewType] = useState<Appointment['type']>('In-Person');

  const filtered = appointments.filter(a => {
    if (activeDateTab === 'All') return true;
    return a.date === activeDateTab;
  });

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim()) return;

    const newApt: Appointment = {
      id: `apt_${Date.now()}`,
      patientName: newPatientName.trim(),
      patientAge: 38,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=face',
      doctorName: 'Dr. Gregory Reynolds',
      department: 'Preventive Health',
      time: '04:30 PM - 05:00 PM',
      date: 'Today',
      type: newType,
      status: 'Confirmed',
      room: 'Consultation Suite 305',
      notes: 'Scheduled for baseline variance review.'
    };

    setAppointments(prev => [newApt, ...prev]);
    setShowBookModal(false);
    setNewPatientName('');
  };

  return (
    <div style={{ padding: '24px 32px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
            <span>📅</span>
            <span>CLINICAL SCHEDULER &amp; TELEHEALTH GATEWAY</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Appointments &amp; Consultations
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
            Coordinate clinical consultations, in-person examinations, and secure encrypted telehealth sessions.
          </p>
        </div>

        <button
          onClick={() => setShowBookModal(true)}
          style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span>+</span>
          <span>Schedule Appointment</span>
        </button>
      </div>

      {/* Date Switcher */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['Today', 'Tomorrow', 'All'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveDateTab(tab)}
            style={{
              background: activeDateTab === tab ? '#2563EB' : '#FFFFFF',
              color: activeDateTab === tab ? '#FFFFFF' : '#64748B',
              border: activeDateTab === tab ? 'none' : '1px solid #E2E8F0',
              borderRadius: 8,
              padding: '8px 18px',
              fontSize: 13,
              fontWeight: activeDateTab === tab ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            {tab} ({appointments.filter(a => tab === 'All' || a.date === tab).length})
          </button>
        ))}
      </div>

      {/* Appointment Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
        {filtered.map(apt => (
          <div
            key={apt.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: 20,
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16
            }}
          >
            <div>
              {/* Top Row: Time & Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#2563EB' }}>
                  🕒 {apt.time}
                </span>
                <span
                  style={{
                    background: apt.status === 'In Progress' ? '#DCFCE7' : '#EFF6FF',
                    color: apt.status === 'In Progress' ? '#166534' : '#1E40AF',
                    borderRadius: 12,
                    padding: '2px 8px',
                    fontSize: 11,
                    fontWeight: 700
                  }}
                >
                  {apt.status}
                </span>
              </div>

              {/* Patient Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <img src={apt.avatar} alt={apt.patientName} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>{apt.patientName}</h3>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{apt.patientAge} yrs • <span style={{ color: '#059669', fontWeight: 600 }}>{apt.type}</span></div>
                </div>
              </div>

              {/* Department & Doctor */}
              <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: 10, fontSize: 12, color: '#334155', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div><strong>Doctor:</strong> {apt.doctorName} ({apt.department})</div>
                <div><strong>Location:</strong> {apt.room}</div>
                <div><strong>Clinical Notes:</strong> {apt.notes}</div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              {apt.type === 'Telehealth' ? (
                <button
                  onClick={() => alert(`Launching Encrypted WebRTC Telehealth Room for ${apt.patientName}`)}
                  style={{ flex: 1, background: '#7C3AED', color: '#FFF', border: 'none', borderRadius: 8, padding: '8px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <span>📹</span>
                  <span>Join Video Consult</span>
                </button>
              ) : (
                <button
                  onClick={() => alert(`Checking in patient ${apt.patientName} at ${apt.room}`)}
                  style={{ flex: 1, background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 8, padding: '8px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                >
                  Check In Patient
                </button>
              )}
              <button
                onClick={() => alert(`Rescheduling modal opened for ${apt.patientName}`)}
                style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1', borderRadius: 8, padding: '8px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              >
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showBookModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
          onClick={() => setShowBookModal(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              maxWidth: 480,
              width: '100%',
              padding: 28,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              border: '1px solid #E2E8F0'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
              Schedule Clinical Appointment
            </h3>

            <form onSubmit={handleBookAppointment} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                  Patient Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maya Sharma"
                  value={newPatientName}
                  onChange={e => setNewPatientName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13 }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                  Consultation Type
                </label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as Appointment['type'])}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13 }}
                >
                  <option value="In-Person">In-Person Clinical Exam</option>
                  <option value="Telehealth">Encrypted Telehealth (WebRTC)</option>
                  <option value="Follow-up">Baseline Follow-up</option>
                  <option value="Emergency Triage">Urgent Triage Consultation</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setShowBookModal(false)}
                  style={{ background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                >
                  Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
