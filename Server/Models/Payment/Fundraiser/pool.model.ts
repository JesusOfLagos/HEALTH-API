import { Schema, Document } from "mongoose";

export interface IPool extends Document {
    user: Schema.Types.ObjectId;
    balance: number;
    name: string;
    description: string;
    status: string;
    timestamp: Date;
}


const poolSchema: Schema = new Schema <IPool>({
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 },
    name: { type: String, required: true },
    description: { type: String, required:true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    timestamp: { type: Date, default: Date.now }, 
})