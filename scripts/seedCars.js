// scripts/seedCars.js
// Script to populate the database with sample car data
// Run with: npm run seed

require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('../models/Car');
const connectDB = require('../config/db');

// Connect to MongoDB
connectDB();

// Sample car data
const sampleCars = [
  {
    name: 'Civic',
    brand: 'Honda',
    year: 2023,
    price: 28500,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    description: 'Reliable and fuel-efficient sedan with modern safety features and comfortable interior.',
  },
  {
    name: 'Accord',
    brand: 'Honda',
    year: 2023,
    price: 36500,
    imageUrl: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=400&h=300&fit=crop',
    description: 'Premium midsize sedan offering excellent performance, luxury features, and advanced technology.',
  },
  {
    name: 'Camry',
    brand: 'Toyota',
    year: 2023,
    price: 32000,
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    description: 'Best-selling midsize sedan known for reliability, comfort, and strong resale value.',
  },
  {
    name: 'Mustang',
    brand: 'Ford',
    year: 2023,
    price: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=400&h=300&fit=crop',
    description: 'Iconic American muscle car with powerful engine, sports handling, and head-turning design.',
  },
  {
    name: 'Model 3',
    brand: 'Tesla',
    year: 2023,
    price: 150000,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    description: 'All-electric sedan with cutting-edge technology, impressive range, and zero emissions.',
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Delete existing cars to avoid duplicates
    await Car.deleteMany({});
    console.log('✅ Cleared existing cars from database');

    // Insert new sample cars
    const insertedCars = await Car.insertMany(sampleCars);
    console.log(`✅ Successfully inserted ${insertedCars.length} sample cars into database`);

    // Display the inserted cars
    console.log('\n📋 Inserted Cars:');
    insertedCars.forEach((car, index) => {
      console.log(
        `${index + 1}. ${car.brand} ${car.name} (${car.year}) - $${car.price.toLocaleString()}`
      );
    });

    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
