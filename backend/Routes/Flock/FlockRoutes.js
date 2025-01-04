const express = require('express');
const router = express.Router();
const flockController = require('../../Controllers/FlockManagement/FlockManagementController');
const authMiddleware = require('../../Middleware/AuthMiddleware/AuthMiddleware');


// Add Flock
router.post('/add',authMiddleware, flockController.addFlock);
// Update a flock by ID
router.put('/flock/:id',authMiddleware, flockController.updateFlock);

// Delete a flock by ID
router.delete('/flock/:id',authMiddleware, flockController.deleteFlock);

// Get all flocks
router.get('/flocks',authMiddleware, flockController.getAllFlocks);

// Get a single flock by ID
router.get('/flock/:id',authMiddleware, flockController.getFlockById);

// Add a vaccination record
router.post('/vaccination-record',authMiddleware, flockController.addVaccinationRecord);


module.exports = router;
