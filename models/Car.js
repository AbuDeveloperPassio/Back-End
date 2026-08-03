// models/Car.js
// Defines the Car schema with all car information

const mongoose = require('mongoose');

// Define the Car schema
const carSchema = new mongoose.Schema(
  {
    // Car name/model (e.g., "Civic", "Accord")
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Car brand/manufacturer (e.g., "Honda", "Toyota")
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    // Manufacturing year
    year: {
      type: Number,
      required: true,
    },
    // Price in USD
    price: {
      type: Number,
      required: true,
    },
    // URL to car image
    imageUrl: {
      type: String,
      required: true,
    },
    // Detailed description of the car
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create and export the Car model
const Car = mongoose.model('Car', carSchema);
module.exports = Car;
