// config/config.js
//
// Centralized configuration: Loads environment variables from the .env file (using dotenv)
// and exports settings as an object. This file manages all the configurable parameters,
// making it easy to adjust settings for different environments (development, production, etc.).

require('dotenv').config();

module.exports = {
  // Environment setting (development, production, etc.)
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Server port configuration
  PORT: process.env.PORT || 5000,

  // MongoDB connection string
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/twitchkiller',

  // Secret key for JWT or other token-based authentication mechanisms
  JWT_SECRET: process.env.JWT_SECRET || 'your_super_secret_key_here',

  // Add additional configuration keys as needed (e.g., API keys, third party services, etc.)
};