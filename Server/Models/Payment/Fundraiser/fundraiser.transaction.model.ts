

import mongoose, { Schema, Document } from "mongoose";

export interface IFundraiserTransaction extends Document {
    user: Schema.Types.ObjectId;
    fundraiser: Schema.Types.ObjectId;
    amount: number;
    type: string;
    timestamp: Date;
}


const FundraiserTransactionSchema: Schema = new Schema <IFundraiserTransaction>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fundraiser: { type: Schema.Types.ObjectId, ref: 'Savings', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Deposit', 'Withdrawal'], required: true },
    timestamp: { type: Date, default: Date.now },
})

const FundraiserTransaction = mongoose.model('SavingsTransaction', FundraiserTransactionSchema);

export default FundraiserTransaction;