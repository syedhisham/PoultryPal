const express = require('express');
const router = express.Router();
const paymentController = require('../../Controllers/Payment/PaymentController');
const authMiddleware = require('../../Middleware/AuthMiddleware/AuthMiddleware');
const adminMiddleware = require('../../Middleware/AuthMiddleware/AdminMiddleware');


// Route to create checkout session
router.post('/create-checkout-session',authMiddleware, paymentController.createCheckoutSession);

// Route to retrieve session status
router.get('/session-status',authMiddleware, paymentController.getSessionStatus);

router.post('/complete-session',authMiddleware, paymentController.completeSession);

router.post('/refund-session',adminMiddleware, paymentController.refundSession);



module.exports = router;
