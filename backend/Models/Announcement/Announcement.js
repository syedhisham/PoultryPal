const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    attachments: [{ // Array of file metadata
        filename: { type: String, required: true },
        path: { type: String, required: true },
        size: { type: Number, required: true },
        uploadedAt: { type: Date, default: Date.now },
      }],
    targetAudience: {
        type: String,
        enum: ['all', 'individuals'],
        required: true
    },
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // Only if targetAudience is 'individuals'
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    createdAt: { type: Date, default: Date.now },
    scheduledFor: Date,
    status: { type: String, enum: ['draft', 'sent', 'scheduled'], default: 'draft' }
});

module.exports = mongoose.model("Announcement", announcementSchema);
