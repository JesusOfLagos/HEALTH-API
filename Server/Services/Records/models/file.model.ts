import mongoose, { Schema } from 'mongoose';


const FileSchema = new Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})


const FileType = mongoose.model('File', FileSchema);

export default FileType;