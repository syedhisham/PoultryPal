const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to User (Customer)
  reason: { type: String, required: true },
  refundAmount: { type: Number, required: true },
  status: { type: String, enum: ['Requested', 'Approved', 'Denied', 'Processing', 'Completed'], default: 'Requested' },
  processedDate: { type: Date }
});

module.exports = mongoose.model('Refund', refundSchema);
