// middleware/auth.js
// Middleware to verify JWT token for protected routes

const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    // Get the token from Authorization header
    // Expected format: "Bearer <token>"
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token is provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first.',
      });
    }

    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request object for later use
    req.user = decoded;

    // Call next() to pass control to the next middleware/route handler
    next();
  } catch (error) {
    console.error('Token verification error:', error);

    // Handle different JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please login again.',
      error: error.message,
    });
  }
};

module.exports = verifyToken;
