import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  reporter: mongoose.Types.ObjectId;
  reportedUser: mongoose.Types.ObjectId;
  content: string;
  status: 'pending' | 'resolved' | 'rejected';
}

const reportSchema: Schema = new Schema({
  reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reportedUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: String,
  status: { type: String, enum: ['pending', 'resolved', 'rejected'], default: 'pending' },
});

export default mongoose.model<IReport>('Report', reportSchema);
