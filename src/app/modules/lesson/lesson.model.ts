import mongoose, { Document, Schema } from 'mongoose';

export interface ILesson extends Document {
  name: string;
  lessonNumber: number;
  vocabularyCount: number;
}

const lessonSchema = new Schema<ILesson>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a lesson name'],
      trim: true,
    },
    lessonNumber: {
      type: Number,
      required: [true, 'Please provide a lesson number'],
      unique: true,
    },
    vocabularyCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema);
