import AppError from '../../errors/AppError';
import { BaseService } from '../base/base.service';
import { lessonRepository } from '../lesson/lesson.repository';
import { IVocabulary, Vocabulary } from './vocabulary.model';
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

  async updateVocabulary(
    id: string,
    data: Partial<IVocabulary>,
  ): Promise<IVocabulary | null> {
    const currentData = await Vocabulary.findById(id);

    if (currentData?.lessonNo !== data?.lessonNo) {
      const currentLesson = await lessonRepository.findByLessonNumber(
        Number(currentData?.lessonNo),
      );
      // Explicitly check or cast lesson._id
      const currentLessonId = currentLesson?._id as string;
      await lessonRepository.updateVocabularyCount(currentLessonId, -1);

      const updateLesson = await lessonRepository.findByLessonNumber(
        Number(data?.lessonNo),
      );
      const updateLessonId = updateLesson?._id as string;
      await lessonRepository.updateVocabularyCount(updateLessonId, 1);
    }
    return this.repository.update(id, data);
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

  async findByLessonNumber(lessonNumber: number): Promise<IVocabulary | null> {
    return vocabularyRepository.findByLessonNumber(lessonNumber);
  }
}

export const vocabularyService = new VocabularyService();
