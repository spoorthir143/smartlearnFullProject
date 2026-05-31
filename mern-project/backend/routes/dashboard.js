const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments();
    const totalFaculty = await User.countDocuments({ role: 'faculty' });
    const courses = await Course.find();
    const totalEnrollments = courses.reduce((sum, c) => sum + c.enrolledCount, 0);

    res.json({
      totalStudents,
      totalCourses,
      totalFaculty,
      totalEnrollments,
      recentCourses: courses.slice(0, 4)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
