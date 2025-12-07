const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Load env vars immediately

const connectDB = require('./config/db');
const { User, Project, Experience, Education, Achievement, Review } = require('./models');
const initialData = require('./data/initialData');
// Or just load from root if running from root. Let's assume running from backend root.
// Actually, let's make it robust.
if (!process.env.MONGO_URI) {
    dotenv.config(); // Try default location
}

connectDB();

const importData = async () => {
  try {
    // Check if data exists
    const userCount = await User.countDocuments();
    
    if (userCount > 0 && !process.argv.includes('--force')) {
      console.log('Data already exists.');
      
      // Update admin password if env vars are present
      if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
        const adminUser = await User.findOne({ username: process.env.ADMIN_USERNAME });
        if (adminUser) {
          adminUser.password = process.env.ADMIN_PASSWORD;
          await adminUser.save();
          console.log(`Password updated for user: ${process.env.ADMIN_USERNAME}`);
        } else {
             // If admin username changed, we might want to create it or update the existing one?
             // For simplicity, let's assume we just want to update the password for the configured admin.
             console.log(`User ${process.env.ADMIN_USERNAME} not found to update.`);
        }
      }
      
      console.log('Use --force to overwrite all data or -d to destroy.');
      process.exit();
    }
    
    // If we are here, either DB is empty OR --force was used.
    // Import new data

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
