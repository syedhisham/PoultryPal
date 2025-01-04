const mongoose = require('mongoose');

const freshAndSpecialtyEggsSchema = new mongoose.Schema({
  eggType: { type: String, required: true }, // Type of eggs (e.g., Organic, Free-range, Specialty)
  quantity: { type: Number, required: true }, // Total quantity available in dozens
  unit: { type: String, default: 'dozen' }, // Fixed unit for eggs (dozen)
  supplier: { type: String, required: true }, // Supplier of eggs
  pricePerDozen: { type: Number, required: true }, // Price per dozen
  productionDate: { type: Date, required: true }, // Date eggs were produced
  expiryDate: { type: Date, required: true }, // Expiry date of eggs
  image: { type: String, required: true }, // Image URL for eggs
  managedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to User (Egg Manager)
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the egg entry was added
  updatedAt: { type: Date, default: Date.now } // Timestamp for the last update
});

module.exports = mongoose.model('Eggs', freshAndSpecialtyEggsSchema);
