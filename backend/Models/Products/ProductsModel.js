// const mongoose = require("mongoose");

// const schemaProduct = new mongoose.Schema({
//     name: { type: String, required: true },
//     category: { type: String, required: true },
//     image: { type: String, required: true },
//     price: { type: String, required: true },
//     description: { type: String, required: true },
//     stock: { type: Number, required: true },

//   });
  
//   module.exports = mongoose.model('product', schemaProduct);

const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema({
    name: { type: String, required: true }, // Product name (can be feed or flock name)
    category: { type: String, required: true }, // Category (e.g., 'Feed' or 'Flock')
    image: { type: String, required: true }, // Product image URL
    price: { type: Number, required: true }, // Price of the product (per bird or per kg)
    description: { type: String, required: true }, // Product description
    stock: { type: Number, required: true }, // Available stock (size for flock or quantity for feed)
    refId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        refPath: 'category' // Dynamic reference based on category (can be Feed or Flock)
    },
}, { timestamps: true });

module.exports = mongoose.model('product', schemaProduct);
