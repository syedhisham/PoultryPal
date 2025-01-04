const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name: String,
    image: String,
    phoneNumber: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Supplier", supplierSchema);
