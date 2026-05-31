import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="fade-in" style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' }}>S</div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: '#f1f5f9' }}>SmartLearn</h1>
          <p style={{ color: '#94a3b8', marginTop: 6, fontSize: 14 }}>Create your account</p>
        </div>

        <div className="card">
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, marginBottom: 24, color: '#f1f5f9' }}>Sign Up</h2>
          {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {[['Full Name','name','text','Spoorthi R'],['Email','email','email','you@example.com'],['Password','password','password','••••••••']].map(([label,field,type,ph]) => (
              <div key={field} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>{label}</label>
                <input type={type} placeholder={ph} value={form[field]} onChange={e => setForm({...form,[field]:e.target.value})} required />
              </div>
            ))}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>I am a</label>
              <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '13px', fontSize: 15 }} disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#94a3b8' }}>
            Already have an account? <Link to="/login" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
