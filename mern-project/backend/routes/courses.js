const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'smartlearn_secret_key';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create course (faculty/admin)
router.post('/', auth, async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed sample courses
router.post('/seed/sample', async (req, res) => {
  try {
    await Course.deleteMany({});
    const sampleCourses = [
      { title: 'Full Stack Web Development', description: 'Learn MERN stack from scratch', instructor: 'Spoorthi R', category: 'Web Development', duration: '12 weeks', level: 'Beginner', enrolledCount: 145, rating: 4.8 },
      { title: 'Machine Learning with Python', description: 'Master ML algorithms and data science', instructor: 'Spoorthi R', category: 'Data Science', duration: '10 weeks', level: 'Intermediate', enrolledCount: 98, rating: 4.7 },
      { title: 'React.js Advanced Concepts', description: 'Hooks, Context, Redux and performance', instructor: 'Spoorthi R', category: 'Frontend', duration: '6 weeks', level: 'Advanced', enrolledCount: 67, rating: 4.9 },
      { title: 'Node.js & Express APIs', description: 'Build scalable REST APIs with Node.js', instructor: 'Spoorthi R', category: 'Backend', duration: '8 weeks', level: 'Intermediate', enrolledCount: 112, rating: 4.6 },
      { title: 'MongoDB Database Design', description: 'NoSQL database design and aggregations', instructor: 'Spoorthi R', category: 'Database', duration: '4 weeks', level: 'Beginner', enrolledCount: 89, rating: 4.5 },
      { title: 'Python for Data Analysis', description: 'Pandas, NumPy, Matplotlib and Seaborn', instructor: 'Spoorthi R', category: 'Data Science', duration: '6 weeks', level: 'Beginner', enrolledCount: 203, rating: 4.8 },
    ];
    const created = await Course.insertMany(sampleCourses);
    res.json({ message: 'Sample courses seeded', count: created.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
