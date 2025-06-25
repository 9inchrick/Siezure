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

// New routes for liking and commenting on clips
router.post('/:clipId/like', authMiddleware, clipController.likeClip);
router.post('/:clipId/comment', authMiddleware, clipController.commentOnClip);

module.exports = router;