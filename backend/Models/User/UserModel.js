const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    payment: {
        type: Number,  
        default: null,
    },
    password: String,
    image: String,
    role: {
        type: String,
        enum: ['Admin', 'Customer', 'Employee'], 
        default: 'Customer'
    },
    phoneNumber: {
        type: String,
        required: function() {
            return this.role === 'Employee';
        }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("user", userSchema);
