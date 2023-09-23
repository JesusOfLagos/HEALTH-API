
import mongoose, { Schema, Document } from 'mongoose';

export interface IVideoCallRoom extends Document {
  roomId: string;
  participants: mongoose.Types.ObjectId[];
}

const videoCallRoomSchema: Schema = new Schema({
  roomId: { type: String, required: true, unique: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IVideoCallRoom>('VideoCallRoom', videoCallRoomSchema);

