import { BaseRepository } from '../base/base.repository';
import { ILesson, Lesson } from './lesson.model';

export class LessonRepository extends BaseRepository<ILesson> {
  constructor() {
    super(Lesson);
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
