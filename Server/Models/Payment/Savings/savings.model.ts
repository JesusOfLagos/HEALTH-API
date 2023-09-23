import mongoose, { Schema, Document } from "mongoose";

export interface ISavings extends Document {
    user: Schema.Types.ObjectId;
    balance: number;
    name: string;
    description: string;
    status: string;
    timestamp: Date;
}



const savingsSchema: Schema = new Schema <ISavings>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 },
    name: { type: String, required: true },
    description: { type: String, required:true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    timestamp: { type: Date, default: Date.now },
})


const Savings = mongoose.model('Savings', savingsSchema);

export default Savings;