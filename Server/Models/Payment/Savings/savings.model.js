import { Schema } from "mongoose";

const savingsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    timestamp: { type: Date, default: Date.now },
})


const Savings = mongoose.model('Savings', savingsSchema);

export default Savings;