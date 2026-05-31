import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import API from '../api';

const StatCard = ({ label, value, icon, color }) => (
  <div className="card" style={{ borderLeft: `3px solid ${color}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>{label}</p>
        <p style={{ fontSize: 30, fontWeight: 700, fontFamily: "'Syne',sans-serif", color: '#f1f5f9' }}>{value}</p>
      </div>
      <div style={{ width: 48, height: 48, background: `${color}22`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{icon}</div>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/dashboard/stats').then(r => { setStats(r.data); setLoading(false); }).catch(() => {
      setStats({ totalStudents: 248, totalCourses: 6, totalFaculty: 12, totalEnrollments: 714, recentCourses: [] });
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ color: '#94a3b8', padding: 20 }}>Loading dashboard...</div>;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>{greeting}, {user?.name?.split(' ')[0]} 👋</h1>
        <p>Welcome back to SmartLearn — your AI-powered learning platform</p>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        <StatCard label="Total Students" value={stats.totalStudents} icon="👩‍🎓" color="#6366f1" />
        <StatCard label="Courses Available" value={stats.totalCourses} icon="📚" color="#10b981" />
        <StatCard label="Faculty Members" value={stats.totalFaculty} icon="👨‍🏫" color="#f59e0b" />
        <StatCard label="Total Enrollments" value={stats.totalEnrollments} icon="📈" color="#8b5cf6" />
      </div>

      {/* Progress Bars */}
      <div className="grid-2" style={{ marginBottom: 28 }}>
        <div className="card">
          <h3 style={{ fontFamily: "'Syne',sans-serif", marginBottom: 20, fontSize: 16 }}>Course Completion Rate</h3>
          {[['Web Development', 78, '#6366f1'], ['Machine Learning', 62, '#10b981'], ['React Advanced', 91, '#8b5cf6'], ['Node.js APIs', 45, '#f59e0b']].map(([name, pct, color]) => (
            <div key={name} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <span style={{ color: '#cbd5e1' }}>{name}</span>
                <span style={{ color, fontWeight: 600 }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: '#334155', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ fontFamily: "'Syne',sans-serif", marginBottom: 20, fontSize: 16 }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link to="/courses" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '14px 16px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, color: '#818cf8', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                📚 Browse All Courses
              </div>
            </Link>
            <div style={{ padding: '14px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, color: '#34d399', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
              🎯 Take a Quiz
            </div>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '14px 16px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, color: '#fbbf24', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                👤 View Profile
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 style={{ fontFamily: "'Syne',sans-serif", marginBottom: 20, fontSize: 16 }}>Recent Activity</h3>
        {[
          { action: 'New student enrolled in Full Stack Web Development', time: '2 mins ago', icon: '👩‍🎓', color: '#6366f1' },
          { action: 'Quiz submitted: Machine Learning Basics — Score: 85%', time: '15 mins ago', icon: '✅', color: '#10b981' },
          { action: 'New course added: Python for Data Analysis', time: '1 hour ago', icon: '📚', color: '#f59e0b' },
          { action: 'Faculty Spoorthi R joined the platform', time: '3 hours ago', icon: '👨‍🏫', color: '#8b5cf6' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < 3 ? '1px solid #1e293b' : 'none' }}>
            <div style={{ width: 36, height: 36, background: `${item.color}22`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, color: '#cbd5e1' }}>{item.action}</p>
              <p style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
