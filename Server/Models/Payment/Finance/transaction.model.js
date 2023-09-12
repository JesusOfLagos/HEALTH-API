import { Schema } from "mongoose";


const transactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: ['credit', 'debit'], required: true },
    transactionMethod: { type: String, enum: ['card', 'bank', 'wallet'], required: true },
    // transactionId: { type: String, required: true },
    transactionStatus: { type: String, enum: ['success', 'pending', 'failed'], required: true },
    transactionDate: { type: Date, default: Date.now },
    transactionReference: { type: String, required: true },
    transactionDescription: { type: String, required: true },
    // transactionChannel: { type: String, required: true },
    transactionFee: { type: Number, required: true },
    transactionCurrency: { type: String, required: true },
    // transactionAmount: { type: Number, required: true },
    // transactionCustomer: { type: String, required: true },
    // transactionCode: { type: String, required: true },
    // transactionMessage: { type: String, required: true },
    // transactionReceipt: { type: String, required: true },
})


const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;