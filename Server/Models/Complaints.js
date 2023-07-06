const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const ComplaintsSchema = new Schema({
    complain: {
        type: String,
        required: true
    },

    urgency: {
        type: String,
        required: true
    },

    isSolved: {
        type: Boolean,
        default: false
    }
})

module.exports = ComplaintsSchema;