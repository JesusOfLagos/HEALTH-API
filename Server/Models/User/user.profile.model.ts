
import mongoose, { Schema } from 'mongoose';

const profileSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  address: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  allergy: { type: String, default: '' },
  intolerance: { type: String, default: '' },
  bloodGroup: { type: String, enum: ['A', 'B', 'AB', 'O'], required: true },
  genotype: { type: String, enum: ['AA', 'AS', 'SS'], required: true },
  image: { type: String, required: false },
});

module.exports = mongoose.model('Profile', profileSchema);
