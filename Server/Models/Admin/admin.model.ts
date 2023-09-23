import mongoose, { Schema, model } from "mongoose"

export interface IAdmin extends mongoose.Document {
    email: string;
    password: string;
    profile: mongoose.Schema.Types.ObjectId;
}

const AdminSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Admin"}
}) 


module.exports = model("Admin", AdminSchema)