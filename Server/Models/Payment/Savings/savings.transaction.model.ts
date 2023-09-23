

import mongoose, { Schema, Document } from "mongoose";

export interface ISavingsTransaction extends Document {
    user: Schema.Types.ObjectId;
    savings: Schema.Types.ObjectId;
    amount: number;
    type: string;
    timestamp: Date;
}


const savingsTransactionSchema: Schema = new Schema <ISavingsTransaction>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    savings: { type: Schema.Types.ObjectId, ref: 'Savings', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Deposit', 'Withdrawal'], required: true },
    timestamp: { type: Date, default: Date.now },
})

const SavingsTransaction = mongoose.model('SavingsTransaction', savingsTransactionSchema);

export default SavingsTransaction;