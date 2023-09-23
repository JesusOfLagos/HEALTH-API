import mongoose, { Schema, Document } from 'mongoose';

export interface IVideoCallInvitation extends Document {
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  videoCallRoom: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
}

const videoCallInvitationSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoCallRoom: { type: Schema.Types.ObjectId, ref: 'VideoCallRoom', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

export default mongoose.model<IVideoCallInvitation>('VideoCallInvitation', videoCallInvitationSchema);
