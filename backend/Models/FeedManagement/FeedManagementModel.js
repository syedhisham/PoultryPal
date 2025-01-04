// const mongoose = require('mongoose');

// const feedManagementSchema = new mongoose.Schema({
//   feedType: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   unit: { type: String, required: true }, // e.g., kg, lb
//   usageHistory: [{
//     date: { type: Date, default: Date.now },
//     amountUsed: { type: Number }
//   }],
//   threshold: { type: Number, required: true }, // Minimum required quantity
//   supplier: { type: String },
//   lastOrderDate: { type: Date },
//   nextOrderDate: { type: Date },
//   managedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Reference to User (Flock Manager)
//   image: { type: String, required: true }, // Image of the feed
// });

// module.exports = mongoose.model('FeedManagement', feedManagementSchema);


const mongoose = require('mongoose');

const feedManagementSchema = new mongoose.Schema({
  feedType: { type: String, required: true }, // Type of feed (e.g., Layer feed, Broiler feed)
  quantity: { type: Number, required: true }, // Total quantity available (e.g., in kg or lbs)
  unit: { type: String, required: true }, // Unit of measurement (e.g., kg, lb)
  usageHistory: [{
    date: { type: Date, default: Date.now },
    amountUsed: { type: Number }
  }],
  threshold: { type: Number, required: true }, // Minimum required quantity before ordering more
  supplier: { type: String },
  lastOrderDate: { type: Date },
  nextOrderDate: { type: Date },
  price: { type: Number, required: true }, // Price per unit (e.g., per kg)
  perUnit:{type:String, required: true},
  image: { type: String, required: true }, // Image URL for the feed
  managedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Reference to User (Feed Manager)
  createdAt: { type: Date, default: Date.now }, // Timestamp for when feed entry was added
  updatedAt: { type: Date, default: Date.now } // Timestamp for the last update
});

module.exports = mongoose.model('FeedManagement', feedManagementSchema);
