
import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage extends Document {
  text: string;
  sender: mongoose.Types.ObjectId;
  room: mongoose.Types.ObjectId;
}

const chatMessageSchema: Schema = new Schema({
  text: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
});

export default mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);
