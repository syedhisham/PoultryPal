const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  stockLevel: { type: Number, required: true },
  stockUnit: { type: String, required: true }, // e.g., kg, units
  lastUpdated: { type: Date, default: Date.now },
  supplier: { type: String },
  lowStockThreshold: { type: Number, required: true },
  restockDate: { type: Date },
  managedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true } // Reference to User (Inventory Manager)
});

module.exports = mongoose.model('Inventory', inventorySchema);
