
const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  transactions: { type: [mongoose.Schema.Types.ObjectId] , ref: 'Transaction', default: [] },
  balance: { type: Number, required: true },
  withdrawals: { type: [mongoose.Schema.Types.ObjectId], ref: 'Withdrawals', default: [] },
  createdAt: { type: Date, required: true },
  isBlocked: { type: Boolean, default: true}
});

module.exports = mongoose.model('Wallet', WalletSchema);
