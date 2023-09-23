import mongoose, { Schema, Document } from 'mongoose';

export interface IGroupChat extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
}

const groupChatSchema: Schema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'ChatMessage' }],
});

export default mongoose.model<IGroupChat>('GroupChat', groupChatSchema);
