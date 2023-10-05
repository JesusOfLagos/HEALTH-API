import mongoose, { Schema } from "mongoose";

interface PaymentRecord {
    _id: string;
    user: string;
    date: string;
    description: string;
    isPaid: boolean;
    amount: number;
    hospital: {
      name: string;
      bankCode: string;
      bankName: string;
      accountNumber: string;
      // Add other hospital details here
    };
  }

const PaymentDetailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    hospital: {
        name: {
        type: String,
        required: true,
        },
        bankCode: {
        type: String,
        required: true,
        },
        bankName: {
        type: String,
        required: true,
        },
        accountNumber: {
        type: String,
        required: true,
        },
    },
})

const PaymentDetail = mongoose.model('PaymentDetail', PaymentDetailSchema);

export default PaymentDetail;