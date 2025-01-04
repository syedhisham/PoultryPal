const express = require('express');
const router = express.Router();
const eggController = require('../../Controllers/Eggs/EggsController');
const authMiddleware = require('../../Middleware/AuthMiddleware/AuthMiddleware');


//Add egg entry
router.post('/add',authMiddleware, eggController.createEggs);
// Update eggs entry
router.put('/update/:id', authMiddleware, eggController.updateEggs);

// Delete eggs entry
router.delete('/delete/:id', authMiddleware, eggController.deleteEggs);

// Get single eggs entry
router.get('/single/:id',authMiddleware, eggController.getEggs);

// Get all eggs entries
router.get('/all', authMiddleware, eggController.getAllEggs);


module.exports = router;
