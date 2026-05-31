import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SAMPLE_COURSES = {
  '1': { title: 'Full Stack Web Development', description: 'Learn MERN stack from scratch with hands-on projects.', instructor: 'Spoorthi R', category: 'Web Development', duration: '12 weeks', level: 'Beginner', enrolledCount: 145, rating: 4.8, lessons: [{ title: 'Introduction to MERN', content: 'Overview of MongoDB, Express, React, Node.js stack.' }, { title: 'Setting up the Environment', content: 'Install Node.js, npm, MongoDB and VS Code.' }, { title: 'Building your first API', content: 'Create Express routes and connect to MongoDB.' }] },
  '2': { title: 'Machine Learning with Python', description: 'Master ML algorithms and data science techniques.', instructor: 'Spoorthi R', category: 'Data Science', duration: '10 weeks', level: 'Intermediate', enrolledCount: 98, rating: 4.7, lessons: [{ title: 'Python for ML', content: 'Pandas, NumPy fundamentals for data science.' }, { title: 'Supervised Learning', content: 'Regression and Classification algorithms.' }, { title: 'Model Evaluation', content: 'Cross-validation, precision, recall and F1 score.' }] },
};

const SAMPLE_QUIZ = {
  questions: [
    { question: 'What does MERN stand for?', options: ['MongoDB, Express, React, Node', 'MySQL, Express, React, Node', 'MongoDB, Express, Ruby, Node', 'MongoDB, Ember, React, Node'], correctAnswer: 0 },
    { question: 'Which command initializes a Node.js project?', options: ['node init', 'npm start', 'npm init', 'node start'], correctAnswer: 2 },
    { question: 'What is React.js primarily used for?', options: ['Backend APIs', 'Database management', 'Frontend UI', 'Server hosting'], correctAnswer: 2 },
  ]
};

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = SAMPLE_COURSES[id] || SAMPLE_COURSES['1'];
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  const submitQuiz = () => {
    let score = 0;
    SAMPLE_QUIZ.questions.forEach((q, i) => { if (answers[i] === q.correctAnswer) score++; });
    const pct = Math.round((score / SAMPLE_QUIZ.questions.length) * 100);
    setResult({ score, total: SAMPLE_QUIZ.questions.length, percentage: pct, passed: pct >= 60 });
  };

  return (
    <div className="fade-in">
      <button onClick={() => navigate('/courses')} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: 14, marginBottom: 20, fontFamily: "'Space Grotesk',sans-serif" }}>← Back to Courses</button>

      {/* Hero */}
      <div className="card" style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.15))', border: '1px solid rgba(99,102,241,0.3)', marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ fontSize: 60 }}>🌐</div>
          <div style={{ flex: 1 }}>
            <span className="tag" style={{ marginBottom: 8, display: 'inline-block' }}>{course.category}</span>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, marginBottom: 10 }}>{course.title}</h1>
            <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>{course.description}</p>
            <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#94a3b8', flexWrap: 'wrap' }}>
              <span>👨‍🏫 {course.instructor}</span>
              <span>⭐ {course.rating}</span>
              <span>📅 {course.duration}</span>
              <span>👥 {course.enrolledCount} enrolled</span>
              <span style={{ color: course.level === 'Beginner' ? '#10b981' : course.level === 'Intermediate' ? '#f59e0b' : '#ef4444' }}>🎯 {course.level}</span>
            </div>
          </div>
          <button onClick={() => setEnrolled(!enrolled)} className="btn" style={{ background: enrolled ? '#10b981' : '#6366f1', color: 'white', padding: '12px 24px' }}>
            {enrolled ? '✅ Enrolled' : 'Enroll Now'}
          </button>
        </div>
      </div>

      <div className="grid-2">
        {/* Lessons */}
        <div>
          <div className="card">
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, marginBottom: 20 }}>Course Lessons</h2>
            {course.lessons?.map((lesson, i) => (
              <div key={i} style={{ padding: '14px 0', borderBottom: i < course.lessons.length - 1 ? '1px solid #334155' : 'none' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, background: 'rgba(99,102,241,0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#818cf8', flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 4 }}>{lesson.title}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>{lesson.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz */}
        <div>
          <div className="card">
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, marginBottom: 16 }}>Course Quiz</h2>
            {!showQuiz && !result && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
                <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Test your knowledge with {SAMPLE_QUIZ.questions.length} questions</p>
                <button onClick={() => setShowQuiz(true)} className="btn btn-primary">Start Quiz</button>
              </div>
            )}
            {showQuiz && !result && (
              <div>
                {SAMPLE_QUIZ.questions.map((q, qi) => (
                  <div key={qi} style={{ marginBottom: 24 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#f1f5f9' }}>{qi + 1}. {q.question}</p>
                    {q.options.map((opt, oi) => (
                      <div key={oi} onClick={() => setAnswers({...answers, [qi]: oi})} style={{
                        padding: '10px 14px', borderRadius: 8, marginBottom: 8, cursor: 'pointer', fontSize: 13,
                        background: answers[qi] === oi ? 'rgba(99,102,241,0.2)' : '#334155',
                        border: `1px solid ${answers[qi] === oi ? '#6366f1' : 'transparent'}`,
                        color: answers[qi] === oi ? '#818cf8' : '#cbd5e1', transition: 'all 0.2s'
                      }}>{opt}</div>
                    ))}
                  </div>
                ))}
                <button onClick={submitQuiz} className="btn btn-primary" style={{ width: '100%' }}>Submit Quiz</button>
              </div>
            )}
            {result && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>{result.passed ? '🎉' : '📚'}</div>
                <div style={{ fontSize: 40, fontFamily: "'Syne',sans-serif", fontWeight: 800, color: result.passed ? '#10b981' : '#ef4444', marginBottom: 8 }}>{result.percentage}%</div>
                <p style={{ color: '#94a3b8', marginBottom: 4 }}>{result.score}/{result.total} correct</p>
                <p style={{ color: result.passed ? '#10b981' : '#ef4444', fontWeight: 600, marginBottom: 20 }}>{result.passed ? 'Passed! 🎊' : 'Keep studying!'}</p>
                <button onClick={() => { setResult(null); setShowQuiz(false); setAnswers({}); }} className="btn btn-outline">Try Again</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
