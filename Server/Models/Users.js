const Mongoose = require("mongoose");
const Schema = Mongoose.Schema

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    location: {
        type: String,
        required: true
    },

    availability: {
        type: String,
        required: false
    },

    insurance: {
        type: String,
        required: false
    },

    gender: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    languageSpoken: {
        type: [],
        required: true
    },

    image: {
        type: String,
        required: false
    },

    verified: {
        type: Boolean,
        required: false
    }
})




