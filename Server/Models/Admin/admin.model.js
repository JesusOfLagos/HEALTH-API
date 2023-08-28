

const mongoose = require('mongoose')
const Schema = mongoose.Schema



const AdminSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Admin"}
}) 


module.exports = mongoose.model("Admin", AdminSchema)