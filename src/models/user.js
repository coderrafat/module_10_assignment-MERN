const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }

}, { timestamps: true, versionKey: false })

const User = model('users', userSchema);


module.exports = { User };