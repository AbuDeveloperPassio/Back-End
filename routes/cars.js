// routes/cars.js
// Handles car-related routes (fetch all cars, search cars)

const express = require('express');
const Car = require('../models/Car');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// ============================================
// GET /api/cars
// Fetch all cars (protected route - requires JWT token)
// ============================================
router.get('/', verifyToken, async (req, res) => {
  try {
    // Fetch all cars from database
    const cars = await Car.find();

    // Return success response with cars data
    res.status(200).json({
      success: true,
      message: 'Cars fetched successfully',
      data: cars,
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cars',
      error: error.message,
    });
  }
});

// ============================================
// GET /api/cars/search?query=...
// Search cars by name or brand (protected route - requires JWT token)
// ============================================
router.get('/search', verifyToken, async (req, res) => {
  try {
    // Extract search query from URL parameters (e.g., ?query=honda)
    const { query } = req.query;

    // Validation: Check if query parameter is provided
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query',
      });
    }

    // Search for cars matching the query in name or brand fields (case-insensitive)
    // $regex performs pattern matching, $options: 'i' makes it case-insensitive
    const cars = await Car.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
      ],
    });

    // Return success response with matching cars
    res.status(200).json({
      success: true,
      message: `Found ${cars.length} car(s) matching "${query}"`,
      data: cars,
    });
  } catch (error) {
    console.error('Error searching cars:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching cars',
      error: error.message,
    });
  }
});

module.exports = router;
