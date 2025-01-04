const express = require('express');
const router = express.Router();
const employeeController = require('../../Controllers/Employee/EmployeeController');
const authMiddleware = require('../../Middleware/AuthMiddleware/AuthMiddleware');
const adminMiddleware = require('../../Middleware/AuthMiddleware/AdminMiddleware');

router.post('/addEmployee',authMiddleware, employeeController.AddEmployee);
router.get('/getAllEmployees',authMiddleware, employeeController.AllEmployees);
router.delete('/deleteEmployee/:id',authMiddleware, employeeController.deleteEmployee);
router.put('/updateEmployee/:id',authMiddleware,employeeController.updateEmployee)


module.exports = router;

