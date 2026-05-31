import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const navItems = [
  { path: '/', icon: '⬛', label: 'Dashboard' },
  { path: '/courses', icon: '📚', label: 'Courses' },
  { path: '/profile', icon: '👤', label: 'Profile' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={{
      width: collapsed ? 72 : 240, background: '#1e293b',
      borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column',
      transition: 'width 0.3s', minHeight: '100vh', position: 'sticky', top: 0
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 16px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>S</div>
        {!collapsed && <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: '#f1f5f9' }}>SmartLearn</span>}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 8px' }}>
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px',
                borderRadius: 8, marginBottom: 4, cursor: 'pointer',
                background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: active ? '#818cf8' : '#94a3b8',
                borderLeft: active ? '3px solid #6366f1' : '3px solid transparent',
                transition: 'all 0.2s', fontSize: 14, fontWeight: active ? 600 : 400
              }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: '16px 8px', borderTop: '1px solid #334155' }}>
        {!collapsed && user && (
          <div style={{ padding: '12px', marginBottom: 8, background: 'rgba(99,102,241,0.1)', borderRadius: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>{user.name}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'capitalize' }}>{user.role}</div>
          </div>
        )}
        <button onClick={handleLogout} style={{
          width: '100%', padding: '10px 12px', background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, color: '#f87171',
          cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif"
        }}>
          {collapsed ? '🚪' : '🚪 Logout'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{
            background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18
          }}>{collapsed ? '→' : '←'}</button>
        </div>
      </div>
    </div>
  );
}
