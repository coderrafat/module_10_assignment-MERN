const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    createdAt: {
        type: Date,
    }

}, { timestamps: true, versionKey: false })


const Product = model('products', productSchema)


module.exports = { Product };



