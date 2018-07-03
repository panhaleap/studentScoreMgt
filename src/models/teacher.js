import mongoose, { Schema } from 'mongoose';

const teacherSchema = Schema(
  {
    firstName: String,
    lastName: String,
    gender: String,
    isActive: { type: Boolean, required: true, default: true }
  },
  { collection: 'Teacher' },
  { timestamps: true }
);

export const Teacher = mongoose.model('Teacher', teacherSchema);
