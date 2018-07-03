import mongoose, { Schema } from 'mongoose';

const scoreSchema = Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },

    score: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: true }
  },
  { collection: 'Score' },
  { timestamps: true }
);

export const Score = mongoose.model('Score', scoreSchema);
