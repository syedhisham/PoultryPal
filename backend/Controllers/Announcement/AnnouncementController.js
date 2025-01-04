const Announcement = require("../../Models/Announcement/Announcement");
const User = require("../../Models/User/UserModel");
const { getIoInstance } = require("../../SocketInstance/Socket");
const fs = require('fs'); // Required for file handling
const path = require('path'); // Required for path handling



// Create a new announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const { title, content, targetAudience, scheduledFor } = req.body;
        let recipients = JSON.parse(req.body.recipients);

        // Extract attachments from req.files (assuming you're using multer or similar)
        const attachments = req.files ? req.files.map(file => ({
            filename: file.originalname,
            path: file.path,
            size: file.size,
          })) : [];


                if (targetAudience === 'all') {
            // Fetch users excluding the current user and with role 'Admin' or 'Employee'
            const users = await User.find({
                _id: { $ne: req.user._id },
                role: { $in: ['Admin', 'Employee'] },
            }, '_id'); // Retrieve only the `_id` field
            
            // Map the user IDs to the recipients array
            recipients = users.map(user => user._id);
        }

        const announcement = new Announcement({
            title,
            content,
            attachments,
            targetAudience,
            recipients,
            createdBy: req.user._id,
            scheduledFor,
            status: scheduledFor ? 'scheduled' : 'sent'
        });

        await announcement.save();

        if (!scheduledFor) {
            const io = getIoInstance();
            io.emit('ANNOUNCEMENT_SENT', announcement);
        }

        res.status(201).json({ message: "Announcement created successfully.", announcement });
    } catch (error) {
        res.status(500).json({ message: "Failed to create announcement.", error: error.message });
    }
};

// Get all announcements
exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().populate("createdBy", "firstName lastName");
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch announcements.", error });
    }
};

exports.getRecipientAnnouncement = async (req, res) => {
    try {
        // Extract the recipient ID from the request body
        const recipientId  = req.user._id;

        // Validate input
        if (!recipientId) {
            return res.status(400).json({ message: "Recipient ID is required." });
        }

        // Fetch announcements for the specified recipient ID
        const announcements = await Announcement.find({ recipients: recipientId })
            .populate("createdBy", "firstName lastName")
            .sort({ createdAt: -1 });

        if (announcements.length === 0) {
            return res.status(404).json({ message: "No announcements found for the specified recipient." });
        }

        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch recipient-specific announcements.", error });
    }
};

// Schedule announcement
exports.scheduleAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { scheduledFor } = req.body;

        const announcement = await Announcement.findByIdAndUpdate(
            id,
            { scheduledFor, status: 'scheduled' },
            { new: true }
        );

        if (!announcement) return res.status(404).json({ message: "Announcement not found." });

        res.status(200).json({ message: "Announcement scheduled successfully.", announcement });
    } catch (error) {
        res.status(500).json({ message: "Failed to schedule announcement.", error });
    }
};

// Download a specific attachment by filename
exports.downloadAttachment = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../uploads', filename); // Adjust the path if necessary

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: "File not found." });
        }

        // Send the file as a downloadable response
        res.download(filePath, (err) => {
            if (err) {
                res.status(500).json({ message: "Failed to download the file.", error: err.message });
            }
        });
    });
};
