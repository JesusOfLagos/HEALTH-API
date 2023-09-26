

import mongoose, { Schema, Document } from "mongoose";

export interface ICard extends Document {
    cardNumber: string;
    cardHolder: string;
    expirationDate: string;
    cvv: string;
    balance: number;
    userId: mongoose.Types.ObjectId;
    dateCreated: Date;
    dateUpdated: Date;
}

const cardSchema: Schema = new Schema({
    cardNumber: { type: String, required: true },
    cardHolder: { type: String, required: true },
    expirationDate: { type: String, required: true },
    cvv: { type: String, required: true },
    balance: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
})

const Card = mongoose.model<ICard>('Card', cardSchema);

export default Card;