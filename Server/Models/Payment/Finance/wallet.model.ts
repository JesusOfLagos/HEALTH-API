import mongoose, { Schema } from 'mongoose';

const WalletSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  transactions: { type: [Schema.Types.ObjectId] , ref: 'Transaction', default: [] },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  isBlocked: { type: Boolean, default: false },
});

const Wallet = mongoose.model('Wallet', WalletSchema);

export default Wallet;
