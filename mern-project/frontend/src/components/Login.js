import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="fade-in" style={{ width: '100%', maxWidth: 420 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' }}>S</div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: '#f1f5f9' }}>SmartLearn</h1>
          <p style={{ color: '#94a3b8', marginTop: 6, fontSize: 14 }}>AI-Powered Learning Platform</p>
        </div>

        <div className="card">
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, marginBottom: 24, color: '#f1f5f9' }}>Sign In</h2>
          {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Email Address</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '13px', fontSize: 15 }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#94a3b8' }}>
            Don't have an account? <Link to="/register" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>Sign Up</Link>
          </p>

          {/* Demo credentials */}
          <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(99,102,241,0.08)', borderRadius: 8, border: '1px solid rgba(99,102,241,0.2)' }}>
            <p style={{ fontSize: 12, color: '#818cf8', fontWeight: 600, marginBottom: 4 }}>Demo Account</p>
            <p style={{ fontSize: 12, color: '#94a3b8' }}>Register a new account to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
}
