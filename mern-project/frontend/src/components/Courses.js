import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const LEVEL_COLORS = { Beginner: '#10b981', Intermediate: '#f59e0b', Advanced: '#ef4444' };

const CourseCard = ({ course }) => (
  <Link to={`/courses/${course._id}`} style={{ textDecoration: 'none' }}>
    <div className="card" style={{ height: '100%', cursor: 'pointer' }}>
      <div style={{ height: 100, background: `linear-gradient(135deg, #6366f133, #8b5cf633)`, borderRadius: 8, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
        {course.category === 'Web Development' ? '🌐' : course.category === 'Data Science' ? '📊' : course.category === 'Frontend' ? '⚛️' : course.category === 'Backend' ? '⚙️' : course.category === 'Database' ? '🗄️' : '📚'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <span className="tag">{course.category}</span>
        <span style={{ fontSize: 12, color: LEVEL_COLORS[course.level] || '#94a3b8', fontWeight: 600 }}>{course.level}</span>
      </div>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, marginBottom: 8, color: '#f1f5f9', lineHeight: 1.3 }}>{course.title}</h3>
      <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 14, lineHeight: 1.5 }}>{course.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b' }}>
        <span>👨‍🏫 {course.instructor}</span>
        <span>⭐ {course.rating}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: '#64748b' }}>
        <span>📅 {course.duration}</span>
        <span>👥 {course.enrolledCount} enrolled</span>
      </div>
    </div>
  </Link>
);

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/courses').then(r => {
      setCourses(r.data); setFiltered(r.data); setLoading(false);
    }).catch(() => {
      // Fallback sample data
      const sample = [
        { _id: '1', title: 'Full Stack Web Development', description: 'Learn MERN stack from scratch', instructor: 'Spoorthi R', category: 'Web Development', duration: '12 weeks', level: 'Beginner', enrolledCount: 145, rating: 4.8 },
        { _id: '2', title: 'Machine Learning with Python', description: 'Master ML algorithms and data science', instructor: 'Spoorthi R', category: 'Data Science', duration: '10 weeks', level: 'Intermediate', enrolledCount: 98, rating: 4.7 },
        { _id: '3', title: 'React.js Advanced Concepts', description: 'Hooks, Context, Redux and performance', instructor: 'Spoorthi R', category: 'Frontend', duration: '6 weeks', level: 'Advanced', enrolledCount: 67, rating: 4.9 },
        { _id: '4', title: 'Node.js & Express APIs', description: 'Build scalable REST APIs', instructor: 'Spoorthi R', category: 'Backend', duration: '8 weeks', level: 'Intermediate', enrolledCount: 112, rating: 4.6 },
        { _id: '5', title: 'MongoDB Database Design', description: 'NoSQL database design and aggregations', instructor: 'Spoorthi R', category: 'Database', duration: '4 weeks', level: 'Beginner', enrolledCount: 89, rating: 4.5 },
        { _id: '6', title: 'Python for Data Analysis', description: 'Pandas, NumPy, Matplotlib and Seaborn', instructor: 'Spoorthi R', category: 'Data Science', duration: '6 weeks', level: 'Beginner', enrolledCount: 203, rating: 4.8 },
      ];
      setCourses(sample); setFiltered(sample); setLoading(false);
    });
  }, []);

  useEffect(() => {
    let res = courses;
    if (search) res = res.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'All') res = res.filter(c => c.category === category);
    setFiltered(res);
  }, [search, category, courses]);

  const categories = ['All', ...new Set(courses.map(c => c.category))];

  if (loading) return <div style={{ color: '#94a3b8', padding: 20 }}>Loading courses...</div>;

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Course Catalog</h1>
        <p>{filtered.length} courses available</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        <input placeholder="🔍 Search courses..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 300 }} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className="btn" style={{
              padding: '8px 16px', fontSize: 13,
              background: category === cat ? '#6366f1' : 'transparent',
              color: category === cat ? 'white' : '#94a3b8',
              border: `1px solid ${category === cat ? '#6366f1' : '#334155'}`
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid-3">
        {filtered.map(course => <CourseCard key={course._id} course={course} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <p>No courses found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
