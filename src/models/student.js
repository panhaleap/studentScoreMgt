import mongoose, { Schema } from 'mongoose';

const studentSchema = Schema(
  {
    firstName: String,
    lastName: String,
    age: { type: Number, required: true },
    gender: String,
    scores: [{ type: Schema.Types.ObjectId, ref: 'Score' }],
    isActive: { type: Boolean, required: true, default: true }
  },
  { collection: 'Student' },
  { timestamps: true }
);

export const Student = mongoose.model('Student', studentSchema);
