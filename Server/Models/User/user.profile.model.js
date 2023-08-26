
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phonenumber: { type: String, required: true },
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
