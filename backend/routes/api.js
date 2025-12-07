const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
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

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Image upload endpoint
router.post('/upload', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Return the file path (relative to uploads folder)
    res.json({ 
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// Resume upload configuration
const resumeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'resume' + path.extname(file.originalname));
  }
});

const resumeFileFilter = (req, file, cb) => {
  // Accept only PDF and DOC files
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and DOC files are allowed!'), false);
  }
};

const resumeUpload = multer({
  storage: resumeStorage,
  fileFilter: resumeFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Resume upload endpoint
router.post('/upload-resume', protect, resumeUpload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ 
      message: 'Resume uploaded successfully',
      filePath: `/uploads/${req.file.filename}`,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading resume', error: error.message });
  }
});

// Get resume info
router.get('/resume', async (req, res) => {
  const fs = require('fs');
  const resumePath = path.join(__dirname, '../uploads/');
  
  try {
    const files = fs.readdirSync(resumePath);
    const resumeFile = files.find(file => file.startsWith('resume'));
    
    if (resumeFile) {
      const stats = fs.statSync(path.join(resumePath, resumeFile));
      res.json({
        exists: true,
        filename: resumeFile,
        filePath: `/uploads/${resumeFile}`,
        size: stats.size,
        uploadedAt: stats.mtime
      });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting resume info', error: error.message });
  }
});

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
