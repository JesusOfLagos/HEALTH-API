
import mongoose, { Schema } from 'mongoose';

const WithdrawalRequestSchema: Schema = new Schema({
  fundRaiser: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  fundraiserName: { type: String, required: true },
  target: { type: Number, required: true },
  anountGenerated: { type: Number, required: true },
  withdrawals: { type: [], default: [] },
  dueDate: { type: Date, required: true },
  image: { type: String, required: false },
  isBlocked: { type: Boolean, default: true}
});

module.exports = mongoose.model('Withdrawal', WithdrawalRequestSchema);
