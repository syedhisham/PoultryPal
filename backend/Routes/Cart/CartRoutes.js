const express = require('express');
const router = express.Router();
const cartController = require('../../Controllers/Cart/CartController');

router.get('/get-cart/:userEmail',cartController.GetSpecificCart);
router.post('/add-to-cart', cartController.addToCart);
router.delete('/clear-cart/:userEmail',cartController.clearCart);
router.delete('/delete-product/:userEmail/:productId',cartController.deleteSpecificProductFromCart);

module.exports = router;

