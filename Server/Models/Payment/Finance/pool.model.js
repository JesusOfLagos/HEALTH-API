

import { Schema } from "mongoose";


const poolSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    timestamp: { type: Date, default: Date.now },
})