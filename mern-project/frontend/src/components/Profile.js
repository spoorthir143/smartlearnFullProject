import React from 'react';
import { useAuth } from '../AuthContext';

export default function Profile() {
  const { user } = useAuth();

  const stats = [
    { label: 'Courses Enrolled', value: 4, icon: '📚', color: '#6366f1' },
    { label: 'Quizzes Completed', value: 7, icon: '🎯', color: '#10b981' },
    { label: 'Avg Score', value: '82%', icon: '⭐', color: '#f59e0b' },
    { label: 'Hours Learned', value: 34, icon: '⏱️', color: '#8b5cf6' },
  ];

  const skills = ['React.js', 'Node.js', 'MongoDB', 'Python', 'Machine Learning', 'SQL', 'Express.js', 'JavaScript'];

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Your learning journey at SmartLearn</p>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Profile Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 32 }}>
          <div style={{ width: 88, height: 88, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 16 }}>
            {user?.name?.[0]?.toUpperCase() || 'S'}
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, marginBottom: 4 }}>{user?.name || 'Spoorthi R'}</h2>
          <span className="badge badge-purple" style={{ marginBottom: 12, textTransform: 'capitalize' }}>{user?.role || 'Student'}</span>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>{user?.email || 'spoorthiacharyar@gmail.com'}</p>
          <div style={{ marginTop: 20, width: '100%', padding: '14px', background: 'rgba(99,102,241,0.08)', borderRadius: 8, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Member Since</p>
            <p style={{ fontSize: 14, color: '#f1f5f9', fontWeight: 600 }}>May 2026</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {stats.map(s => (
            <div key={s.label} className="card" style={{ textAlign: 'center', borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 26, fontFamily: "'Syne',sans-serif", fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, marginBottom: 16 }}>Skills & Technologies</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {skills.map(skill => (
            <span key={skill} className="tag" style={{ padding: '8px 14px', fontSize: 13 }}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="card">
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, marginBottom: 20 }}>Learning Progress</h3>
        {[
          { course: 'Full Stack Web Development', progress: 75, color: '#6366f1' },
          { course: 'Machine Learning with Python', progress: 50, color: '#10b981' },
          { course: 'React.js Advanced Concepts', progress: 90, color: '#8b5cf6' },
          { course: 'Node.js & Express APIs', progress: 30, color: '#f59e0b' },
        ].map(item => (
          <div key={item.course} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: '#cbd5e1' }}>{item.course}</span>
              <span style={{ color: item.color, fontWeight: 600 }}>{item.progress}%</span>
            </div>
            <div style={{ height: 8, background: '#334155', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${item.progress}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}99)`, borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
