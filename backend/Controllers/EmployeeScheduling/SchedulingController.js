const Announcement = require("../../Models/Announcement/Announcement");
const EmployeeScheduling = require("../../Models/EmployeeScheduling/EmployeeScheduling");
const UserModel = require("../../Models/User/UserModel");
const { getIoInstance } = require("../../SocketInstance/Socket");


exports.createSchedule = async (req, res) => {
    const { employee, weekRecords } = req.body;

    try {
        // Find existing schedule for the employee
        const existingSchedule = await EmployeeScheduling.findOne({ employee });
        console.log('Existing Schedule', existingSchedule);
        console.log('Week Records', weekRecords);


        // Normalize the new dates into a comparable format
        const newDates = weekRecords.map(day => {
            const date = new Date(day.date); // Convert to Date object
            return date.toISOString().split('T')[0]; // Extract only the date part (YYYY-MM-DD)
        });

        // Log the extracted new dates
        console.log("Extracted new dates:", newDates);

        const employeeDetails = await UserModel.findById(employee);
        if (!employeeDetails) {
            return res.status(404).json({ message: "Employee not found." });
        }

        // Prepare announcement content with employee details
        const announcementContent = existingSchedule
            ? `The weekly schedule for ${employeeDetails.firstName} ${employeeDetails.lastName} (${employeeDetails.email}) has been updated.`
            : `A new weekly schedule has been created for ${employeeDetails.firstName} ${employeeDetails.lastName} (${employeeDetails.email}) starting from ${new Date().toLocaleDateString()}.`;

        if (existingSchedule) {
            // Get existing dates from the existing schedule
            const existingDates = existingSchedule.weekRecords.map(day => {
                return new Date(day.date).toISOString().split('T')[0]; // Normalize existing dates
            });

            // Check for duplicates
            const duplicateDates = newDates.filter(date => existingDates.includes(date));
            if (duplicateDates.length > 0) {
                return res.status(400).json({
                    message: "Error: Schedule already exists for the following date.",
                    duplicateDates
                });
            }

            // Validate task durations for each day in the new weekRecords
            const invalidDays = weekRecords.filter(day => !existingSchedule.validateTasksDuration(day));

            if (invalidDays.length > 0) {
                return res.status(400).json({
                    message: "Error: Total task durations exceed shift durations for the following days.",
                    invalidDays
                });
            }

            // Add new weekRecords to the existing schedule
            existingSchedule.weekRecords = [...existingSchedule.weekRecords, ...weekRecords];

            // Save the updated schedule
            await existingSchedule.save();

            // Create an announcement
            const announcement = new Announcement({
                title: "Weekly Schedule Updated",
                content: announcementContent,
                targetAudience: 'individuals',
                recipients: [employee],
                createdBy: req.user._id,
                status: 'sent'
            });

            const io = getIoInstance();
            io.emit('ANNOUNCEMENT_SENT', announcement);
            await announcement.save();

            return res.status(200).json({
                message: "Week schedule updated successfully.",
                schedule: existingSchedule
            });
        } else {
            // If no existing schedule, create a new one
            const newSchedule = new EmployeeScheduling({ employee, weekRecords, createdBy: req.user._id });

            // Validate task durations for each day
            const invalidDays = weekRecords.filter(day => !newSchedule.validateTasksDuration(day));

            if (invalidDays.length > 0) {
                return res.status(400).json({
                    message: "Error: Total task durations exceed shift durations for the following days.",
                    invalidDays
                });
            }

            // Save the new schedule
            await newSchedule.save();

            // Create an announcement
            const announcement = new Announcement({
                title: "New Weekly Schedule Created",
                content: announcementContent,
                targetAudience: 'individuals',
                recipients: [employee],
                createdBy: req.user._id,
                status: 'sent'
            });

            const io = getIoInstance();
            io.emit('ANNOUNCEMENT_SENT', announcement);
            await announcement.save();

            return res.status(201).json({
                message: "Week schedule created successfully.",
                schedule: newSchedule
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to schedule week.", error: error.message });
    }
};




// Update an existing week's schedule for an employee
exports.updateSchedule = async (req, res) => {
    const { id } = req.params;
    const { weekRecords } = req.body; // Expecting an array of weekRecords in the request body

    try {
        const schedule = await EmployeeScheduling.findById(id);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found." });
        }

        const employeeDetails = await UserModel.findById(schedule.employee._id);
        if (!employeeDetails) {
            return res.status(404).json({ message: "Employee not found." });
        }

        // Update each day's details in weekRecords
        if (weekRecords && Array.isArray(weekRecords)) {
            weekRecords.forEach((updatedDay) => {
                const dayToUpdate = schedule.weekRecords.find(
                    (day) => new Date(day.date).toISOString() === new Date(updatedDay.date).toISOString()
                );

                if (dayToUpdate) {
                    dayToUpdate.shiftStart = updatedDay.shiftStart;
                    dayToUpdate.shiftEnd = updatedDay.shiftEnd;
                    dayToUpdate.tasks = updatedDay.tasks;
                    dayToUpdate.status = updatedDay.status;
                }
            });
        }

        // Validate task durations within each updated shift
        const invalidDays = schedule.weekRecords.filter(
            (day) => !schedule.validateTasksDuration(day)
        );

        if (invalidDays.length > 0) {
            return res.status(400).json({
                message: "Error: Total task durations exceed shift durations for the following days.",
                invalidDays,
            });
        }

        await schedule.save();

        // Create and save an announcement
        const announcement = new Announcement({
            title: "Schedule Updated",
            content: `The schedule has been updated for ${employeeDetails.firstName} ${employeeDetails.lastName} (${employeeDetails.email}) on ${new Date().toLocaleDateString()}.`,
            targetAudience: 'individuals',
            recipients: [schedule.employee._id],
            createdBy: req.user._id,
            status: 'sent',
        });
        await announcement.save();

        // Emit the announcement after saving
        const io = getIoInstance();
        io.emit('ANNOUNCEMENT_SENT', announcement);

        res.status(200).json({ message: "Schedule updated successfully.", schedule });
    } catch (error) {
        console.error("Error updating schedule:", error);
        res.status(500).json({ message: "Failed to update schedule.", error: error.message });
    }
};



// Get schedules for a specific employee
exports.getEmployeeSchedules = async (req, res) => {

    try {
        const schedules = await EmployeeScheduling.find()
            .populate('employee', 'firstName lastName email') 
            .populate('createdBy', 'username email');

        if (schedules.length === 0) {
            return res.status(404).json({ message: "No schedules found for this employee." });
        }

        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch schedules.", error: error.message });
    }
};


// Get schedules for a specific date
exports.getSchedulesByDate = async (req, res) => {
    const { employeeId, date } = req.params;

    try {
        const schedule = await EmployeeScheduling.findOne({
            employee: employeeId,
            'weekRecords.date': new Date(date)
        }, { weekRecords: { $elemMatch: { date: new Date(date) } } })
        .populate('employee', 'firstName lastName email')
        .populate("createdBy", "firstName lastName");

        if (!schedule || schedule.weekRecords.length === 0) {
            return res.status(404).json({ message: "No schedules found for this employee on the specified date." });
        }

        res.status(200).json(schedule.weekRecords[0]);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch schedules.", error: error.message });
    }
};

exports.getEmployeeSpecificSchedule = async (req, res) => {
    const employeeId = req.user._id;

    try {
        // Find the schedule for the specified employee
        const schedule = await EmployeeScheduling.findOne({ employee: employeeId })
            .populate('employee', 'firstName lastName email') // Populate employee details
            .populate('createdBy', 'firstName lastName email'); // Populate creator details

        if (!schedule) {
            return res.status(404).json({ message: "No schedule found for this employee." });
        }

        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch schedule.", error: error.message });
    }
};

exports.deleteScheduleByDate = async (req, res) => {
    const { id } = req.params; // `id` is the employee schedule ID, `date` is the specific date to delete
    const { date } = req.body; // Expecting the specific date to delete in the request body
    try {
        // Find the schedule for the specific employee and date
        const schedule = await EmployeeScheduling.findById(id);

        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found." });
        }

        
        const employeeDetails = await UserModel.findById(schedule.employee._id);
        if (!employeeDetails) {
            return res.status(404).json({ message: "Employee not found." });
        }

        // Filter out the record for the specified date from `weekRecords`
        const formattedDate = new Date(date).toISOString().split('T')[0];
        const updatedWeekRecords = schedule.weekRecords.filter(record => {
            const recordDate = new Date(record.date).toISOString().split('T')[0];
            return recordDate !== formattedDate;
        });

        // If no date found to delete, return an error
        if (updatedWeekRecords.length === schedule.weekRecords.length) {
            return res.status(404).json({ message: "No record found for the specified date." });
        }

        // Update the schedule with the filtered `weekRecords` and save
        schedule.weekRecords = updatedWeekRecords;
        await schedule.save();

        // Optionally, create an announcement or log the deletion
        const announcement = new Announcement({
            title: "Schedule Date Deleted",
            content: `The schedule for ${employeeDetails.firstName} ${employeeDetails.lastName} (${employeeDetails.email}) on ${new Date(date).toLocaleDateString()} has been deleted.`,
            targetAudience: 'individuals',
            recipients: [schedule.employee._id],
            createdBy: req.user._id,
            status: 'sent'
        });
        await announcement.save();

        // Emit an announcement event if needed
        const io = getIoInstance();
        io.emit('ANNOUNCEMENT_SENT', announcement);

        res.status(200).json({
            message: "Date record deleted successfully.",
            updatedSchedule: schedule
        });
    } catch (error) {
        console.error("Error deleting date from schedule:", error);
        res.status(500).json({ message: "Failed to delete date from schedule.", error: error.message });
    }
};
