import AppError from '../../errors/AppError';
import { BaseService } from '../base/base.service';
import { ILesson } from './lesson.model';
import { lessonRepository } from './lesson.repository';

export class LessonService extends BaseService<ILesson> {
  constructor() {
    super(lessonRepository);
  }

  async create(data: Partial<ILesson>): Promise<ILesson> {
    const lesson = await lessonRepository.createLesson(data);

    if (!lesson) {
      throw new AppError(500, 'Failed to create the lesson');
    }

    return lesson;
  }
}

export const lessonService = new LessonService();
