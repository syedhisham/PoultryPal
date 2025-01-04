const mongoose = require("mongoose");

const schemaCart = new mongoose.Schema({
    userEmail: { type: String, required: true },
    products: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
      quantity: { type: Number, required: true }
    }]
  });
  
module.exports = mongoose.model('Cart', schemaCart);