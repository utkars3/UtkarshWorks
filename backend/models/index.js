const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema (for Admin)
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Project Schema
const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  tags: [String],
  liveLink: { type: String },
  githubLink: { type: String }, // Keep for backward compatibility
  githubFrontend: { type: String },
  githubBackend: { type: String },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

// Experience Schema
const experienceSchema = mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Education Schema
const educationSchema = mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Achievement Schema
const achievementSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  icon: { type: String },
}, { timestamps: true });

// Review Schema
const reviewSchema = mongoose.Schema({
  clientName: { type: String, required: true },
  company: { type: String },
  review: { type: String, required: true },
  rating: { type: Number, default: 5 },
  image: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Project = mongoose.model('Project', projectSchema);
const Experience = mongoose.model('Experience', experienceSchema);
const Education = mongoose.model('Education', educationSchema);
const Achievement = mongoose.model('Achievement', achievementSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = {
  User,
  Project,
  Experience,
  Education,
  Achievement,
  Review,
};
