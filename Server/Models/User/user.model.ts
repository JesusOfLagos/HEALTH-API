
import mongoose, { Schema, Document, SchemaDefinitionProperty, ObjectId } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  accountNumber: string;
  customerId: string;
  accountName: string;
  bankName: string;
  password: string;
  wallet: ObjectId
  refreshTokens: string[];
  resetToken: string;
  verificationToken: string;
  resetTokenExpiration: Date;
  profile: ObjectId
  isEmailVerified: boolean;
  status: string;
  isPhoneVerified: boolean;
  isSubscribed: boolean;
  phoneNumber: string;
  tag: string;
  pin: string;
  bvn: string;
  otp: string;
  tier: number;
  isBlocked: boolean;
  isActive: boolean;
  otpExpiration: Date;
  timestamp: Date;
  blockedUntil: Date;
  accessToken: string;
  loginAttempts: number;
  lastLoginAttemptAt: Date;
  subscriptions: string[];
}






// const userSchema: Schema = new Schema <IUser>({
//   email: { type: String, required: true, unique: true },
//   username: { type: String, required: true },
//   accountNumber: { type: String, required: false, unique: true },
//   customerId: { type: String, required: false, unique: true },
//   accountName: { type: String, required: false },
//   bankName: { type: String, required: false },
//   password: { type: String, required: true },
//   wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true },
//   refreshTokens: { type: [], required: false },
//   resetToken: { type: String, required: false },
//   verificationToken: { type: String, required: false },
//   resetTokenExpiration: { type: Date, required: false },
//   profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
//   isEmailVerified: { type: Boolean, default: false },
//   status: { type: String, enum: ['Good', 'Critical', 'Bad', 'Excellent', 'Worse', 'Fair'], default: 'Excellent' },
//   isPhoneVerified: { type: Boolean, default: false },
//   isSubscribed: { type: Boolean, default: false },
//   phoneNumber: { type: String, required: false, unique: true },
//   tag: { type: String, required: false, unique: true },
//   pin: { type: String, required: false },
//   bvn: { type: String, required: false, unique: true },

// })

















 const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  accountNumber: { type: String, required: false, unique: true },
  customerId: { type: String, required: false, unique: true },
  accountName: { type: String, required: false },
  bankName: { type: String, required: false },
  password: { type: String, required: true },
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  refreshTokens: { type: [], required: false },
  resetToken: { type: String, required: false },
  verificationToken: { type: String, required: false },
  resetTokenExpiration: { type: Date, required: false },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  isEmailVerified: { type: Boolean, default: false },
  status: { type: String, enum: ['Good', 'Critical', 'Bad', 'Excellent', 'Worse', 'Fair'], default: 'Excellent' },
  isPhoneVerified: { type: Boolean, default: false },
  isSubscribed: { type: Boolean, default: false },
  phoneNumber: { type: String, required: false, unique: true },
  tag: { type: String, required: false, unique: true },
  pin: { type: String, required: false },
  bvn: { type: String, required: false, unique: true },
  otp: { type: String, required: true},
  tier : { type: Number, default : 0 },
  isBlocked: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  otpExpiration: { type: Date, default: Date.now },
  timestamp: { type: Date, default: Date.now },
  blockedUntil: { type: Date, default: Date.now },
  accessToken: { type: String, required: false },
  loginAttempts: { type: Number, default: 0},
  lastLoginAttemptAt: { type: Date, default: Date.now()},
  subscriptions: { type: [], default: []}
});

const User = mongoose.model('User', userSchema);

export default User;