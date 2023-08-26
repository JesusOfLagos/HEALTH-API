
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true },
  refreshTokens: { type: [], required: false },
  resetToken: { type: String, required: false },
  verificationToken: { type: String, required: false },
  resetTokenExpiration: { type: Date, required: false },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  isSubscribed: { type: Boolean, default: false },
  subscriptions: { type: [], default: []}
});

module.exports = mongoose.model('User', userSchema);
