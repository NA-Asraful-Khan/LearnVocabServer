import { z } from 'zod';

export const lessonSchema = z.object({
  name: z.string().min(2, 'Lesson name must be at least 2 characters'),
  lessonNumber: z
    .number()
    .int()
    .positive('Lesson number must be a positive integer'),
  vocabularyCount: z.number().int().min(0).default(0),
});

export const updateLessonSchema = z.object({
  name: z
    .string()
    .min(2, 'Lesson name must be at least 2 characters')
    .optional(),
  lessonNumber: z
    .number()
    .int()
    .positive('Lesson number must be a positive integer')
    .optional(),
});

export const LessonValidation = {
  lessonSchema,
  updateLessonSchema,
};
