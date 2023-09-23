import mongoose, { Schema, Document } from 'mongoose';

interface IBlacklist extends Document {
  tokens: string[];
}

const BlacklistSchema: Schema = new Schema({
  tokens: [{ type: String, unique: true }],
});

const BlacklistModel = mongoose.model<IBlacklist>('Blacklist', BlacklistSchema);

export default BlacklistModel;
