import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  type: string;
  content: string;
  isRead: boolean;
}

const notificationSchema: Schema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: String, // E.g., 'chat_message', 'friend_request'
  content: String,
  isRead: { type: Boolean, default: false },
});

export default mongoose.model<INotification>('Notification', notificationSchema);
