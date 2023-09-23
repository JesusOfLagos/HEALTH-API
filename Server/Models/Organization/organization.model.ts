import { Schema } from "mongoose";

export interface IOrganization {
    name: string;
    description: string;
    location: {
        address: string;
        city: string;
        state: string;
        zip: string;
    };
    contact: string;
    email: string;
    website: string;
    image: string;
    verified: boolean;
    doctors: Schema.Types.ObjectId[];
    users: Schema.Types.ObjectId[];
    date: Date;
}

const Organization: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type:String, required: true },
        zip: { type: String, required: true },
    },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    website: { type: String, required: true },
    image: { type: String, required: true },
    verified: { type: Boolean, default: false },
    doctors: { type: [Schema.Types.ObjectId], default: [] },
    users: { type: [Schema.Types.ObjectId], default: [] },
    date: { type: Date, default: Date.now },
})