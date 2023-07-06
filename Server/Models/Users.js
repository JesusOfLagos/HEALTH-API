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
        type: [
            {
                type: String
            }
        ],
        default: "No language yet!"
    },

    image: {
        type: String,
        required: false
    },

    complaints: {
        type: [
            {
                 type: String,
                 resolved: Boolean
            },
         ],
        required: false
    },

    verified: {
        type: Boolean,
        required: false
    }
})

module.exports = UserSchema;




