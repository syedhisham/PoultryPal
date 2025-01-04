const express = require('express');
const router = express.Router();
const scheduleController = require('../../Controllers/EmployeeScheduling/SchedulingController');
const authMiddleware = require('../../Middleware/AuthMiddleware/AuthMiddleware');
const adminMiddleware = require('../../Middleware/AuthMiddleware/AdminMiddleware');

router.post('/createSchedule',authMiddleware, scheduleController.createSchedule);
router.get('/employee-specific-schedule',authMiddleware, scheduleController.getEmployeeSpecificSchedule);
router.get('/getEmployeeSchedules',authMiddleware, scheduleController.getEmployeeSchedules);
router.put('/updateSchedule/:id',authMiddleware, scheduleController.updateSchedule);
router.delete('/deleteSchedule/:id',authMiddleware, scheduleController.deleteScheduleByDate);



module.exports = router;
