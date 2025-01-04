const mongoose = require('mongoose');

const stockControlSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  currentStock: { type: Number, required: true },
  threshold: { type: Number, required: true },
  status: { type: String, enum: ['Normal', 'Low Stock'], default: 'Normal' },
  alerts: [{ 
    date: { type: Date, default: Date.now },
    message: { type: String }
  }],
  managedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true } // Reference to User (Inventory Manager)
});

module.exports = mongoose.model('StockControl', stockControlSchema);
