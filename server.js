// server.js
// Main server file - connects to MongoDB and starts the Express server

require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ============================================
// Middleware
// ============================================

// Enable CORS (allows frontend on different port to call this backend)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Parse incoming JSON requests
app.use(express.json());

// ============================================
// Routes
// ============================================

// Mount auth routes at /api/auth
// This makes signup available at POST /api/auth/signup
// and login available at POST /api/auth/login
app.use('/api/auth', authRoutes);

// Mount car routes at /api/cars
// This makes GET /api/cars (fetch all) and GET /api/cars/search?query=...
app.use('/api/cars', carRoutes);

// Health check endpoint (optional, but useful for testing)
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// ============================================
// Start Server
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
