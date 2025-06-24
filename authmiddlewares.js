// middlewares/authMiddleware.js
//
// This middleware verifies the JWT token provided in the Authorization header.
// If the token is valid, it attaches the user payload to req.user and calls next().
// Otherwise, it returns a 401 or 400 error response.

const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  // Check that the authorization header exists
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Expecting token in the format "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the JWT secret from the configuration
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};