// routes/analyticsRoutes.js
//
// This file defines the analytics-related routes for the application.
//
// Endpoints:
//   - GET /api/analytics/stream/:streamId  : Retrieve analytics data for a specific stream.
//   - GET /api/analytics/user              : Retrieve analytics for all streams belonging to the authenticated user.
//   - GET /api/analytics/global            : Retrieve aggregated global analytics (protected)

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const analyticsController = require('../controllers/analyticsController');

// Endpoint to retrieve analytics for a specific stream (public access)
router.get('/stream/:streamId', analyticsController.getStreamAnalytics);

// Endpoint to retrieve aggregated analytics for the authenticated user's streams (protected)
router.get('/user', authMiddleware, analyticsController.getUserAnalytics);

// Endpoint to retrieve aggregated global analytics (protected)
// Optionally, you might add additional admin checks if needed.
router.get('/global', authMiddleware, analyticsController.getGlobalAnalytics);

module.exports = router;