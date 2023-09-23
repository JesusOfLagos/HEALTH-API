import mongoose, { Schema, Document } from 'mongoose';

export interface IBlockList extends Document {
  user: mongoose.Types.ObjectId;
  blockedUsers: mongoose.Types.ObjectId[];
}

const blockListSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IBlockList>('BlockList', blockListSchema);
