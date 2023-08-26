
const mongoose = require('mongoose');

const WithdrawalRequestSchema = new mongoose.Schema({
  fundRaiser: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  fundraiserName: { type: String, required: true },
  target: { type: Number, required: true },
  anountGenerated: { type: Number, required: true },
  withdrawals: { type: [], default: [] },
  dueDate: { type: Date, required: true },
  image: { type: String, required: false },
  isBlocked: { type: Boolean, default: true}
});

module.exports = mongoose.model('Withdrawal', WithdrawalRequestSchema);
