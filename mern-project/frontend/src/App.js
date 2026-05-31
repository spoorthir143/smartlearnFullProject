import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', color:'#6366f1', fontSize:'18px' }}>Loading SmartLearn...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppLayout = ({ children }) => (
  <div className="layout">
    <Sidebar />
    <div className="main-content">{children}</div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><AppLayout><Dashboard /></AppLayout></PrivateRoute>} />
          <Route path="/courses" element={<PrivateRoute><AppLayout><Courses /></AppLayout></PrivateRoute>} />
          <Route path="/courses/:id" element={<PrivateRoute><AppLayout><CourseDetail /></AppLayout></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><AppLayout><Profile /></AppLayout></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
