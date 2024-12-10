import { BaseService } from '../base/base.service';
import { ILesson } from './lesson.model';
import { lessonRepository } from './lesson.repository';

export class LessonService extends BaseService<ILesson> {
  constructor() {
    super(lessonRepository);
  }
}

export const lessonService = new LessonService();
