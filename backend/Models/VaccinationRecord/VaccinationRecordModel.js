const mongoose = require('mongoose');

const vaccinationRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to User (Flock Manager)
  flockId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flock', required: true },
  vaccineType: { type: String, required: true },
  dosageAmount: { type: String, required: true },
  vaccinationDate: { type: Date, required: true },
  veterinarian: { type: String },
  nextVaccinationDate: { type: Date },
  notes: { type: String }
});

module.exports = mongoose.model('VaccinationRecord', vaccinationRecordSchema);
