const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Get quiz by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ course: req.params.courseId });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit quiz and get score
router.post('/submit', async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });
    const percentage = Math.round((score / quiz.questions.length) * 100);
    res.json({ score, total: quiz.questions.length, percentage, passed: percentage >= 60 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
