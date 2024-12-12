import mongoose, { Document, Schema } from 'mongoose';

export interface IVocabulary extends Document {
  word: string;
  pronunciation: string;
  meaning: string;
  whenToSay: string;
  lessonNo: number;
  adminEmail: string;
}

const vocabularySchema = new Schema<IVocabulary>(
  {
    word: {
      type: String,
      required: [true, 'Please provide the Japanese word'],
      trim: true,
    },
    pronunciation: {
      type: String,
      required: [true, 'Please provide the pronunciation'],
      trim: true,
    },
    meaning: {
      type: String,
      required: [true, 'Please provide when to use this word'],
      trim: true,
    },
    whenToSay: {
      type: String,
      required: [true, 'Please provide when to use this word'],
      trim: true,
    },
    lessonNo: {
      type: Number,
      required: [true, 'Please provide the lesson number'],
      ref: 'Lesson',
    },
    adminEmail: {
      type: String,
      required: [true, 'Admin email is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Vocabulary = mongoose.model<IVocabulary>(
  'Vocabulary',
  vocabularySchema,
);
