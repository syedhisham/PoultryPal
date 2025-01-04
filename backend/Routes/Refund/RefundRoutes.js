const express = require('express');
const router = express.Router();
const refundController = require('../../Controllers/Refund/RefundController');
const authMiddleware = require('../../Middleware/AuthMiddleware/AuthMiddleware');
const adminMiddleware = require('../../Middleware/AuthMiddleware/AdminMiddleware');

router.post('/process',authMiddleware, refundController.processRefund);
router.get('/all-refunds',authMiddleware, refundController.getAllRefunds);
router.patch('/update/:id',authMiddleware, refundController.updateRefundStatus);

module.exports = router;
