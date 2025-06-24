// middlewares/errorHandler.js
//
// Global error handling middleware. It captures any errors that occur in the app,
// logs them, and sends a response to the client with the error message and status code.

module.exports = (err, req, res, next) => {
  console.error('Global Error:', err);

  // Use a custom status code if provided, otherwise default to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ message });
};