import mongoose, { Schema, Document } from 'mongoose';

export interface IFriendship extends Document {
  userA: mongoose.Types.ObjectId;
  userB: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
}

const friendshipSchema: Schema = new Schema({
  userA: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userB: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

export default mongoose.model<IFriendship>('Friendship', friendshipSchema);
