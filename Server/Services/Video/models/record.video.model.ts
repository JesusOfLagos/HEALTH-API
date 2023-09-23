import mongoose, { Schema, Document } from 'mongoose';

export interface ICallRecording extends Document {
  roomId: string;
  recordingUrl: string;
  recordingDate: Date;
  participants: mongoose.Types.ObjectId[];
}

const callRecordingSchema: Schema = new Schema({
  roomId: { type: String, required: true }, // Unique identifier for the call
  recordingUrl: { type: String, required: true }, // URL or path to the recorded call file
  recordingDate: { type: Date, default: Date.now }, // Date and time when the call was recorded
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Users who participated in the call
});

export default mongoose.model<ICallRecording>('CallRecording', callRecordingSchema);
