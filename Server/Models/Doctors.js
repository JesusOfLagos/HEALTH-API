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

    verified: {
        type: Boolean,
        required: false
    }
})