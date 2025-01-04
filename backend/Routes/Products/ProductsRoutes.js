const express = require('express');
const router = express.Router();
const productController = require('../../Controllers/Products/ProductsController');


router.get("/product",productController.GetAllProducts);
router.get("/product/:category",productController.ProductsOfSpecificCategory);
router.post('/add', productController.addProduct);


module.exports = router;
