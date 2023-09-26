import mongoose, { Schema } from "mongoose";


export interface IHealthCard extends Document {
    user: mongoose.Types.ObjectId;
    cardNumber: string;
    cardType: string;
    cardHolderName: string;
    expiryDate: string;
    isBlocked: boolean;
    cvv: string;
    dateCreated: Date;
    dateUpdated: Date;
}


const healthCardSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cardNumber: { type: String, required: true },
    cardType: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    expiryDate: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    cvv: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
})

const HealthCard = mongoose.model<IHealthCard>('HealthCard', healthCardSchema);

export default HealthCard;