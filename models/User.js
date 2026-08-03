// models/User.js
// Defines the User schema with name, email, and hashed password

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // User's email (must be unique, no two users with same email)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    // User's password (will be hashed before saving)
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Don't return password by default when querying users
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Middleware: Hash password before saving to database
// This runs automatically before any user is saved
userSchema.pre('save', async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified('password')) {
    next();
    return;
  }

  try {
    // Generate a "salt" (random value) for hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method: Compare plain-text password with hashed password during login
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
