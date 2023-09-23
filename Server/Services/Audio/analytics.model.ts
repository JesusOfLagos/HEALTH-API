import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  event: string;
  user: mongoose.Types.ObjectId;
  timestamp: Date;
  // Additional data fields as needed
}

const analyticsSchema: Schema = new Schema({
  event: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: Date,
  // Add more fields as needed for specific analytics data
});

export default mongoose.model<IAnalytics>('Analytics', analyticsSchema);
