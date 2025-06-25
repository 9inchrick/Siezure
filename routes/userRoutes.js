const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Get current user's profile
router.get('/me', authMiddleware, userController.getProfile);

// Update profile (username, avatar, etc.)
router.put('/me', authMiddleware, userController.updateProfile);

// Get a user's public profile by ID
router.get('/:userId', userController.getPublicProfile);

router.post('/:userId/block', authMiddleware, userController.blockUser);
router.post('/:userId/report', authMiddleware, userController.reportUser);

router.post('/apikey', authMiddleware, userController.createApiKey);
router.delete('/apikey/:key', authMiddleware, userController.revokeApiKey);

module.exports = router;