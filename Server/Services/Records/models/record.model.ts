import mongoose, { Schema } from "mongoose";
import FileType from "./file.model";

const MedicalRecordSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    disease: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    files: { type: [FileType], required: true, default: []},
    prescription: { type: String, required: true },
    status: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
})

const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);

export default MedicalRecord;