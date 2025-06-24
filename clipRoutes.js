// routes/clipRoutes.js
//
// This file defines routes related to clip management.
// Endpoints include:
//   - POST /api/clips/         : Create a new clip
//   - GET /api/clips/:clipId    : Retrieve a single clip by ID
//   - GET /api/clips/user/all   : Retrieve all clips for the authenticated user
//   - PUT /api/clips/:clipId    : Update clip details (title/description)
//   - DELETE /api/clips/:clipId : Delete a clip
//
// All routes require the user to be authenticated.

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const clipController = require('../controllers/clipController');

// Create a new clip (protected)
router.post('/', authMiddleware, clipController.createClip);

// Retrieve a single clip by its ID (protected)
router.get('/:clipId', authMiddleware, clipController.getClip);

// Retrieve all clips for the authenticated user (protected)
router.get('/user/all', authMiddleware, clipController.getUserClips);

// Update a clip's details (protected)
router.put('/:clipId', authMiddleware, clipController.updateClip);

// Delete a clip (protected)
router.delete('/:clipId', authMiddleware, clipController.deleteClip);

module.exports = router;