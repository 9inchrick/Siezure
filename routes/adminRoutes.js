const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/adminController');

// Admin routes
router.get('/users', authMiddleware, roleMiddleware(['admin']), adminController.listUsers);
router.delete('/user/:userId', authMiddleware, roleMiddleware(['admin']), adminController.deleteUser);

module.exports = router;