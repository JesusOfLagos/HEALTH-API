import mongoose from "mongoose"



const Emergency = new mongoose.Schema({
    urgency: { type: String, enum: [ "Very Urgent", "Urgent", "Critical"] },
    description: { type: String, required: false},
    location: { type: String, required: true},
    isAttendedTo: { type: Boolean, default: false},
    needsAmbulance: { type: Boolean, default: false},
    needsFireService: { type: Boolean, default: false},
    needsPolice: { type: Boolean, default: false},
    needsSOS: { type: Boolean, default: false},
    needsOthers: { type: Boolean, default: false},
    others: { type: String, required: false},
    user: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
})


module.exports = mongoose.model("Emergency", Emergency)




//Implement a service that can allow users use speech to text, in cases they cannot type.