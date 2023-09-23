import mongoose, { Schema, Document } from 'mongoose';

export interface IChatRoom extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
}

const chatRoomSchema: Schema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);