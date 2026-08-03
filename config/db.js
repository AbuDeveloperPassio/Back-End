// config/db.js
// This file creates the connection to MongoDB using Mongoose

const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Use the MONGO_URI from .env file
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    // Exit the process if connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
