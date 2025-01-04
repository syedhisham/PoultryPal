// const mongoose = require('mongoose');

// const flockSchema = new mongoose.Schema({
//   name: { type: String, required: true }, // Name of the flock
//   type: { type: String, required: true }, // Type of flock (e.g., Broiler, Layer)
//   size: { type: Number, required: true }, // Number of birds in the flock
//   ageInWeeks: { type: Number, required: true }, // Age of the flock in weeks
//   healthStatus: { type: String, enum: ['Healthy', 'Sick', 'Recovered'], default: 'Healthy' }, // Health status of the flock
//   location: { type: String }, // Location of the flock within the farm
//   lastInspectionDate: { type: Date, required: true }, // Date of the last health inspection
//   image: { type: String, required: true }, // Image of the flock
//   managedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to User (Flock Manager)
//   createdAt: { type: Date, default: Date.now }, // Timestamp for when the flock was added
//   updatedAt: { type: Date, default: Date.now } // Timestamp for last update
// });

// module.exports = mongoose.model('Flock', flockSchema);



const mongoose = require('mongoose');

const flockSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the flock
  type: { type: String, required: true }, // Type of flock (e.g., Broiler, Layer)
  size: { type: Number, required: true }, // Number of birds in the flock
  ageInWeeks: { type: Number, required: true }, // Age of the flock in weeks
  healthStatus: { type: String, enum: ['Healthy', 'Sick', 'Recovered'], default: 'Healthy' }, // Health status of the flock
  location: { type: String }, // Location of the flock within the farm
  lastInspectionDate: { type: Date }, // Date of the last health inspection
  managedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to User (Flock Manager)
  price: { type: Number, required: true }, // Price per bird
  image: { type: String, required: true }, // Image URL for the flock
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the flock was added
  updatedAt: { type: Date, default: Date.now } // Timestamp for last update
});

module.exports = mongoose.model('Flock', flockSchema);
