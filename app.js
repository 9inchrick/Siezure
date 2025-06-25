'use strict';

// Core dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const newLocal = require('joi');
const Joi = newLocal;
const { Server } = require('socket.io');
const http = require('http');
const i18n = require('i18n');

// Load environment variables
dotenv.config();
require('./config/db');

// Validate environment variables
const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  CORS_ORIGIN: Joi.string().required(),
  // Add other required env vars here
}).unknown();

const { error: envError } = envSchema.validate(process.env);
if (envError) {
  throw new Error(`Config validation error: ${envError.message}`);
}

// Import routes
const authRoutes = require('./routes/authRoutes');
const streamRoutes = require('./routes/streamRoutes');
const clipRoutes = require('./routes/clipRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const videoRoutes = require('./routes/videoroutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const profileRoutes = require('./routes/profileRoutes');
const metricsRoutes = require('./routes/metricsRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Import custom middleware
const requestLogger = require('./middleware/requestLogger');
const performanceMonitor = require('./middleware/performanceMonitor');
const cacheMiddleware = require('./middleware/cacheMiddleware');
const apiVersion = require('./middleware/apiVersion');

// Initialize app
const app = express();

// Security and performance middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(compression());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true,
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(requestLogger);
app.use(performanceMonitor);
app.use(apiVersion);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// i18n configuration
i18n.configure({
  locales: ['en', 'es', 'fr'],
  directory: __dirname + '/locales'
});
app.use(i18n.init);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Simple ping endpoint
app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// Cache frequently accessed routes
app.use('/api/clips', cacheMiddleware(300));      // 5 minutes
app.use('/api/analytics', cacheMiddleware(600));  // 10 minutes

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/stream', streamRoutes);
app.use('/api/clips', clipRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/admin', adminRoutes);

// Swagger documentation (optional)
try {
  const { swaggerUi, swaggerDocument } = require('./docs/swagger');
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.warn('Swagger UI not configured:', e.message || e);
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('Global Error:', err.stack || err.message || err);
  }
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message || 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV || 'development';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  // Example: send a notification
  socket.emit('notification', { message: 'Welcome to the app!' });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

app.set('io', io); // Make io available in controllers if needed

server.listen(PORT, () => {
  console.log(`Server started in ${MODE} mode on port ${PORT}`);
});

module.exports = app;
