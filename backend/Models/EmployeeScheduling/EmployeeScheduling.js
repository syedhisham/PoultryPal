const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    duration: { type: Number, required: true } // Duration in minutes
}, { _id: false }); // Disable automatic _id for sub-documents

const dailyScheduleSchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true },
    shiftStart: { type: Date, required: true },
    shiftEnd: { type: Date, required: true },
    tasks: [taskSchema], // Array of tasks for that day
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
    },
}, { _id: false }); // Disable automatic _id for sub-documents

const employeeSchedulingSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    weekRecords: [dailyScheduleSchema], // Array of daily schedules for a week
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    createdAt: { type: Date, default: Date.now }
});

// Custom validator to ensure tasks duration do not exceed shift duration
employeeSchedulingSchema.methods.validateTasksDuration = function(day) {
    // Ensure task durations are valid numbers
    const totalDuration = day.tasks.reduce((acc, task) => {
        const duration = Number(task.duration); // Convert to number
        return acc + (isNaN(duration) ? 0 : duration); // Add only valid numbers
    }, 0);
    console.log('Total duration:', totalDuration);

    // Ensure shiftStart and shiftEnd are valid dates
    const start = new Date(day.shiftStart);
    const end = new Date(day.shiftEnd);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error('Invalid shift start or end time');
        return false; // Return false if dates are invalid
    }

    const shiftDuration = (end - start) / 60000; // Convert ms to minutes
    console.log('Shift duration:', shiftDuration);

    return totalDuration <= shiftDuration; // Returns true if valid
};


module.exports = mongoose.model("EmployeeScheduling", employeeSchedulingSchema);
