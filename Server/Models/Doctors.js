const Mongoose = require("mongoose");
const Schema = Mongoose.Schema

const DoctorSchema = new Schema({
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

    qualifications: {
        type: [],
        required: true
    },

    location: {
        type: String,
        required: true
    },

    speciality: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: false
    },

    reviews: {
        type: [],
        required: false
    },

    availability: {
        type: String,
        required: false
    },

    insuranceAccepted: {
        type: [],
        required: false
    },

    experience: {
        type: String,
        required: true
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

    affiliation: {
        type: String,
        required: false
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




module.exports = DoctorSchema;