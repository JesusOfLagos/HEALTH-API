
const mongoose = require('mongoose');

const FundraiserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  fundraiserName: { type: String, required: true },
  target: { type: Number, required: true },
  anountGenerated: { type: Number, default: 0 },
  withdrawals: { type: [mongoose.Schema.Types.ObjectId], ref: 'Withdrawals', default: [] },
  dueDate: { type: Date, required: true },
  image: { type: String, required: false },
  isBlocked: { type: Boolean, default: true}
});

module.exports = mongoose.model('Fundraiser', FundraiserSchema);
