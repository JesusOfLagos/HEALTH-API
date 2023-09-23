import mongoose, { Schema } from 'mongoose';

const WalletSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  transactions: { type: [Schema.Types.ObjectId] , ref: 'Transaction', default: [] },
  balance: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  isBlocked: { type: Boolean, default: true}
});

module.exports = mongoose.model('Wallet', WalletSchema);
