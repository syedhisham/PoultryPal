const express = require('express');
const router = express.Router();
const orderController = require('../../Controllers/Order/OrderController');
const authMiddleware = require('../../Middleware/AuthMiddleware/AuthMiddleware');
const adminMiddleware = require('../../Middleware/AuthMiddleware/AdminMiddleware');

router.post('/create-order',authMiddleware, orderController.createOrder);
router.get('/all-order',adminMiddleware, orderController.getAllOrders);
router.patch('/update-order-status',authMiddleware, orderController.updateOrderStatus);
router.get('/own-orders',authMiddleware, orderController.getUserOrders);
router.patch('/cancel/:orderId',authMiddleware, orderController.CancelOrder);




module.exports = router;
