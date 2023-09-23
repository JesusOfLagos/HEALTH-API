import mongoose, { Schema, mongo } from "mongoose";

import { Document } from 'mongoose';


export interface IDoctor extends Document {
    firstName: string;
    lastName: string;
    email: string;
    qualifications: string[];
    education: {
        school: string;
        degree: string;
    }[];
    location: Location;
    speciality: string[];
    rating: number;
    reviews: {
        author: string;
        rating: number;
        review: string;
    }[];
    availability: Date[];
    isAvailable: boolean;
    insuranceAccepted: string[];
    experience: number;
    gender: string;
    age: number;
    contact: string;
    affiliation: string[];
    languageSpoken: string[];
    image: string;
    verified: boolean;
}





const Doctor: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type:String, required: true, unique: true },
    qualifications: { type: [String], required: true },
    education: { type: [{
        school: String,
        degree: String,
    }]},
    location: { type: Location, required: true },
    speciality: { type: [String], required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: [{
        author: String,
        rating: Number,
        review: String,
    }]},
    availability: { type: [Date], required: false },
    isAvailable: { type: Boolean, default: true },
    insuranceAccepted: { type: [String], default: "No Insurance!" },
    experience: { type: Number, default: 0 },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    contact: { type: String, required: true },
    affiliation: { type: [String], default: "No affiliation at this moment" },
    languageSpoken: { type: [String], default: "No language input yet!" },
    image: { type: String, default: "https://res.cloudinary.com/dacp0ugig/image/upload/v1682420313/cld-sample.jpg", required: false },
    verified: { type: Boolean, required: false }
})


export default mongoose.model<IDoctor>('Doctor', Doctor);






