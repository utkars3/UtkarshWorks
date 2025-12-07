const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { User, Project, Experience, Education, Achievement, Review } = require('./models');
const initialData = require('./data/initialData');

dotenv.config(); // Load env vars from current directory
// Or just load from root if running from root. Let's assume running from backend root.
// Actually, let's make it robust.
if (!process.env.MONGO_URI) {
    dotenv.config(); // Try default location
}

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Experience.deleteMany();
    await Education.deleteMany();
    await Achievement.deleteMany();
    await Review.deleteMany();

    // Import new data
    await User.create(initialData.users);
    await Project.insertMany(initialData.projects);
    await Experience.insertMany(initialData.experience);
    await Education.insertMany(initialData.education);
    await Achievement.insertMany(initialData.achievements);
    await Review.insertMany(initialData.reviews);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();
    await Experience.deleteMany();
    await Education.deleteMany();
    await Achievement.deleteMany();
    await Review.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
