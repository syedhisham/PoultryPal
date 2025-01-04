const express = require('express');
const router = express.Router();
const supplierController = require('../../Controllers/Supplier/Supplier');
const adminMiddleware = require('../../Middleware/AuthMiddleware/AdminMiddleware');

router.post('/add-supplier',adminMiddleware,supplierController.addSupplier );
router.get('/all-suppliers', supplierController.getAllSuppliers);
router.put('/update/:id',adminMiddleware, supplierController.updateSupplier);
router.delete('/delete/:id',adminMiddleware, supplierController.deleteSupplier);

module.exports = router;
