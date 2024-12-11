import { z } from 'zod';

export const vocabularySchema = z.object({
  body: z.object({
    word: z.string().min(1, 'Word is required'),
    pronunciation: z.string().min(1, 'Pronunciation is required'),
    whenToSay: z.string().min(1, 'Usage context is required'),
    lessonNo: z
      .number()
      .int()
      .positive('Lesson number must be a positive integer'),
  }),
});

export const updateVocabularySchema = z.object({
  word: z.string().min(1, 'Word is required').optional(),
  pronunciation: z.string().min(1, 'Pronunciation is required').optional(),
  whenToSay: z.string().min(1, 'Usage context is required').optional(),
  lessonNo: z
    .number()
    .int()
    .positive('Lesson number must be a positive integer')
    .optional(),
});

export const VocabularyValidation = {
  vocabularySchema,
  updateVocabularySchema,
};
