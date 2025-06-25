// routes/videoroutes.js
//
// This file defines the routes for video processing, editing, and download operations.
// Endpoints include:
//   - GET /api/video/list         : List all available video files
//   - GET /api/video/download/:id   : Download a video file by its ID
//   - POST /api/video/edit          : Trigger automated video editing (e.g., trimming)
// Each route is protected by the auth middleware to secure sensitive operations.

const express = require('express');
const router = express.Router();

const videoController = require('../controllers/videoController');
const authMiddleware = require('../middlewares/authMiddleware');

// List all available video files (e.g., raw and processed)
router.get('/list', authMiddleware, videoController.listVideos);

// Download a specific video file by videoId
router.get('/download/:videoId', authMiddleware, videoController.downloadVideo);

// Trigger automated video editing (e.g., trimming between startTime and endTime)
// Request body should include videoId, startTime, and endTime.
router.post('/edit', authMiddleware, videoController.automatedEdit);

module.exports = router;