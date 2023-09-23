import mongoose, { Schema, Document } from 'mongoose';

export interface IUserActivity extends Document {
  user: mongoose.Types.ObjectId;
  lastLogin: Date;
  lastLogout: Date;
  status: 'online' | 'offline' | 'away';
}

const userActivitySchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lastLogin: Date,
  lastLogout: Date,
  status: { type: String, enum: ['online', 'offline', 'away'], default: 'offline' },
});

export default mongoose.model<IUserActivity>('UserActivity', userActivitySchema);
