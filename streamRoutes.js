// routes/streamRoutes.js
//
// This file defines the routes related to stream management. It provides endpoints to:
// - Start a new stream via POST /api/stream/
// - End a live stream via PUT /api/stream/:streamId/end
// - Retrieve details for a specific stream via GET /api/stream/:streamId
// - List all live streams via GET /api/stream/
//
// Endpoints that modify stream state (e.g., start or end a stream) are protected with authentication middleware.

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const streamController = require('../controllers/streamController');

// Route to start a new stream (protected)
router.post('/', authMiddleware, streamController.startStream);

// Route to end an active stream (protected)
router.put('/:streamId/end', authMiddleware, streamController.endStream);

// Route to get details of a specific stream (public)
router.get('/:streamId', streamController.getStreamDetails);

// Route to retrieve a list of all currently live streams (public)
router.get('/', streamController.getLiveStreams);

module.exports = router;