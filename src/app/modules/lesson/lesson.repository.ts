import AppError from '../../errors/AppError';
import { BaseRepository } from '../base/base.repository';
import { ILesson, Lesson } from './lesson.model';

export class LessonRepository extends BaseRepository<ILesson> {
  constructor() {
    super(Lesson);
  }

  async createLesson(lessonData: Partial<ILesson>): Promise<ILesson | null> {
    // Check if lessonNumber is provided
    if (!lessonData.lessonNumber) {
      throw new AppError(400, 'Lesson number is required');
    }

    const lesson = await lessonRepository.findByLessonNumber(
      lessonData.lessonNumber,
    );

    if (lesson) {
      throw new AppError(404, 'Lesson with this number already exists');
    }
    try {
      const newLesson = await this.create(lessonData);

      return newLesson;
    } catch (error) {
      console.log(error);
      throw new AppError(500, 'Error creating student');
    }
  }
  async findByLessonNumber(lessonNumber: number): Promise<ILesson | null> {
    return await this.findOne({ lessonNumber });
  }

  async updateVocabularyCount(id: string, increment: number): Promise<void> {
    await this.model.findByIdAndUpdate(id, {
      $inc: { vocabularyCount: increment },
    });
  }
}

export const lessonRepository = new LessonRepository();
