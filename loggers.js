// utils/logger.js
//
// This module configures a Winston logger for consistent logging across the application.
// It logs messages to the console and to a file, and includes error stack traces for easier debugging.
// Ensure the "logs" directory exists or add logic to create it if needed.

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  // Set log level based on environment
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  
  // Combine timestamp, error stacks, and formatting for a clean log message
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }), // Capture stack trace when logging errors
    format.splat(),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} ${level}: ${stack || message}`;
    })
  ),
  
  // Define transports: where to send log messages (console and file)
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.log', level: 'info' })
  ],
  
  // Handle uncaught exceptions by logging them
  exceptionHandlers: [
    new transports.Console(),
    new transports.File({ filename: 'logs/exceptions.log' })
  ]
});

// Optionally, you can add a handler for unhandled promise rejections if needed:
process.on('unhandledRejection', (err) => {
  throw err;
});

module.exports = logger;