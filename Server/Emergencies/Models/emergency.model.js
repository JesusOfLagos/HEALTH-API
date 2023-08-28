import mongoose from "mongoose"



const Emergency = new mongoose.Schema({
    urgency: { type: String, enum: [ "Very Urgent", "Urgent", "Critical"] },
    description: { type: String, required: true},
    location: { type: String, required: true},
    isAttendedTo: { type: Boolean, default: false}
})


module.exports = mongoose.model("Emergency", Emergency)




//Implement a service that can allow users use speech to text, in cases they cannot type.