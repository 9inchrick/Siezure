'use strict';

// Entry point for the backend application.
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
require('./config/db');

const authRoutes = require('./routes/authRoutes');
const streamRoutes = require('./routes/streamRoutes');
const clipRoutes = require('./routes/clipRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const videoRoutes = require('./routes/videoroutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true,
}));

if ((process.env.NODE_ENV || 'development') === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/auth', authRoutes);
app.use('/api/stream', streamRoutes);
app.use('/api/clips', clipRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/video', videoRoutes);

try {
  const { swaggerUi, swaggerDocument } = require('./docs/swagger');
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.warn('Swagger UI not configured:', e.message || e);
}

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('Global Error:', err.stack || err.message || err);
  }
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`Server started in ${MODE} mode on port ${PORT}`);
});

module.exports = app;
