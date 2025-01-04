const express = require('express');
const router = express.Router();
const feedController = require('../../Controllers/Feed/FeedController');
const authMiddleware = require('../../Middleware/AuthMiddleware/AuthMiddleware');


//Add feed entry
router.post('/add',authMiddleware, feedController.createFeed);
// Update feed entry
router.put('/update/:id',authMiddleware, feedController.updateFeed);

// Delete feed entry
router.delete('/delete/:id', authMiddleware, feedController.deleteFeed);

// Get single feed entry by ID
router.get('/single/:id', authMiddleware, feedController.getFeedById);

// Get all feed entries
router.get('/all', authMiddleware, feedController.getAllFeeds);

// Add usage history to a feed entry
router.post('/usage/:id',authMiddleware, feedController.addUsageHistory);

// Calculate next order date based on threshold
router.put('/next-order-date/:id', authMiddleware, feedController.calculateNextOrderDate);

module.exports = router;
