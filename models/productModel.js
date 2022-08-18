const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'you must enter a product name'],
        trim: true,
        minlength: [1, 'please provide non empty name'],
        maxlength: [20, "name can't be longer than 20"],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'you must enter a product price'],
        min: 1,
    },
    category: {
        type: String,
        enum: ['sport', 'music', 'games', 'general'],
        default: 'general',
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium',
    },
});

const Product = mongoose.model('Products', productSchema);
module.exports = Product;
