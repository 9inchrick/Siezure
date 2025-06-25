// config/db.js
//
// This file sets up the connection to your MongoDB database using Mongoose.
// It uses the configuration values from config/config.js and defines event listeners
// to log the status of the connection.

const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log connection success
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${config.MONGODB_URI}`);
});

// Log connection errors
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

// Log when disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Export the mongoose instance for use in your models
module.exports = mongoose;