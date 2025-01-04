const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, 
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  address:{type:String, required: true},
  city:{type:String, required: true},
  zipcode:{type:Number, required: true},
  phoneNumber:{type:Number, required: true},
  totalPrice: { type: Number, required: true },
  orderStatus: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'], default: 'Pending' },
  orderDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ['Debit Card','Cash'], required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  sessionId: { type: String },
  refundRequest: {
    type: String,
    enum: ['Not Started', 'Requested', 'Approved', 'Denied', 'Processing', 'Completed'],
    default: 'Not Started'
  }
});

module.exports = mongoose.model('Order', orderSchema);
