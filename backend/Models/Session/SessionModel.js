const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  status: { type: String, required: true, enum: ['pending', 'completed', 'cancelled','refunded'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  customerEmail: { type: String },
});

module.exports = mongoose.model('Session', sessionSchema);
