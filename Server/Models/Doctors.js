const Mongoose = require("mongoose");
const UserSchema = require("./Users");
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
        type: [
            {
                type: String,
            }
        ],
        required: true
    },

    education: {
        type: [
       {
        school: String,
        degree: String,
       }
     ]
    },

    location: {
       type: String,
       required: true
    },

    speciality: {
        type: [ 
            {
              type: String,
              required: true
            }
        ]      
    },

    rating: {
        type: Number,
        default: 0
    },

    reviews: {
        type: [
            {
                author: String,
                rating: Number,
                review: String
            }
        ]
    },

    availability: {
        type: [
            {
                type: Date()
            }
        ],
        required: false
    },

    isAvailable: {
        type: Boolean,
        default: true
    },

    insuranceAccepted: {
        type: [
            {
                type: String,
            }
        ],
        default: {
            type: "No Insurance!"
        }
    },

    experience: {
        type: Number,
        default: 0
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
        type: [
            {
                type: String
            }
        ],
        default: "No affiliation at this moment"
    },

    languageSpoken: {
        type: [
            {
                type: String
            }
        ],
        default: "No language input yet!"
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