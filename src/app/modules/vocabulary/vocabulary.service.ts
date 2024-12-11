import AppError from '../../errors/AppError';
import { BaseService } from '../base/base.service';
import { lessonRepository } from '../lesson/lesson.repository';
import { IVocabulary } from './vocabulary.model';
import { vocabularyRepository } from './vocabulary.repository';

export class VocabularyService extends BaseService<IVocabulary> {
  constructor() {
    super(vocabularyRepository);
  }

  async createVocabulary(vocabularyData: any) {
    const lesson = await lessonRepository.findByLessonNumber(
      vocabularyData.lessonNo,
    );
    if (!lesson) {
      throw new AppError(404, 'No lesson found with that lesson number');
    }

    // Explicitly check or cast lesson._id
    const lessonId = lesson._id as string;

    const vocabulary = await this.create(vocabularyData);
    await lessonRepository.updateVocabularyCount(lessonId, 1);

    return vocabulary;
  }

  async deleteVocabulary(id: string) {
    // Find the vocabulary by ID and handle null
    const vocabulary = await this.findById(id);
    if (!vocabulary) {
      throw new AppError(404, 'Vocabulary not found');
    }

    // Delete the vocabulary
    await this.delete(id);

    // Find the lesson by lessonNo and handle null
    const lesson = await lessonRepository.findByLessonNumber(
      vocabulary.lessonNo,
    );
    if (lesson) {
      // Explicitly ensure lesson._id is treated as a string
      const lessonId = lesson._id as string;
      await lessonRepository.updateVocabularyCount(lessonId, -1);
    }

    return vocabulary;
  }
}

export const vocabularyService = new VocabularyService();
