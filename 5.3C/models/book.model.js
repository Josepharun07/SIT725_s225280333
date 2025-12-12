// models/book.model.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, 
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    summary: { type: String, required: true },
    // TASK REQUIREMENT: Price as Decimal128
    price: { 
        type: mongoose.Schema.Types.Decimal128, 
        required: true,
        // Getter to convert Decimal128 to string for JSON response
        get: (v) => v ? v.toString() : v 
    } 
}, {
    toJSON: { getters: true }, // Ensure getter runs when converting to JSON
    toObject: { getters: true }
});

module.exports = mongoose.model('Book', bookSchema);