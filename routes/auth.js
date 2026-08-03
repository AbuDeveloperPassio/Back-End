// routes/auth.js
// Handles user registration (signup) and login

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ============================================
// POST /api/auth/signup
// Register a new user
// ============================================
router.post('/signup', async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, password } = req.body;

    // Validation: Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // Check if user already exists (prevents duplicate emails)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Create new user (password is automatically hashed by the schema middleware)
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during signup',
      error: error.message,
    });
  }
});

// ============================================
// POST /api/auth/login
// Authenticate user and return JWT token
// ============================================
router.post('/login', async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validation: Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user by email (use .select('+password') to include password field)
    const user = await User.findOne({ email }).select('+password');

    // If user not found, return error
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare provided password with hashed password in database
    const isPasswordCorrect = await user.comparePassword(password);

    // If password doesn't match, return error
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Create JWT token (valid for 7 days)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success response with token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message,
    });
  }
});

module.exports = router;
