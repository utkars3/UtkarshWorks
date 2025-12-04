const express = require('express');
const router = express.Router();
const {
  User,
  Project,
  Experience,
  Education,
  Achievement,
  Review,
} = require('../models');
const { protect } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Auth Routes
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Project Routes
router.get('/projects', async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });
  res.json(projects);
});

router.post('/projects', protect, async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

router.put('/projects/:id', protect, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

router.delete('/projects/:id', protect, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project removed' });
});

// Experience Routes
router.get('/experience', async (req, res) => {
  const experience = await Experience.find({}).sort({ order: 1 });
  res.json(experience);
});

router.post('/experience', protect, async (req, res) => {
  const experience = await Experience.create(req.body);
  res.status(201).json(experience);
});

router.put('/experience/:id', protect, async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(experience);
});

router.delete('/experience/:id', protect, async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({ message: 'Experience removed' });
});

// Education Routes
router.get('/education', async (req, res) => {
  const education = await Education.find({}).sort({ order: 1 });
  res.json(education);
});

router.post('/education', protect, async (req, res) => {
  const education = await Education.create(req.body);
  res.status(201).json(education);
});

router.put('/education/:id', protect, async (req, res) => {
  const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(education);
});

router.delete('/education/:id', protect, async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ message: 'Education removed' });
});

// Achievement Routes
router.get('/achievements', async (req, res) => {
  const achievements = await Achievement.find({}).sort({ date: -1 });
  res.json(achievements);
});

router.post('/achievements', protect, async (req, res) => {
  const achievement = await Achievement.create(req.body);
  res.status(201).json(achievement);
});

router.put('/achievements/:id', protect, async (req, res) => {
  const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(achievement);
});

router.delete('/achievements/:id', protect, async (req, res) => {
  await Achievement.findByIdAndDelete(req.params.id);
  res.json({ message: 'Achievement removed' });
});

// Review Routes
router.get('/reviews', async (req, res) => {
  const reviews = await Review.find({}).sort({ createdAt: -1 });
  res.json(reviews);
});

router.post('/reviews', protect, async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
});

router.put('/reviews/:id', protect, async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(review);
});

router.delete('/reviews/:id', protect, async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review removed' });
});

module.exports = router;
