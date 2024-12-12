import { BaseRepository } from '../base/base.repository';
import { IVocabulary, Vocabulary } from './vocabulary.model';

export class VocabularyRepository extends BaseRepository<IVocabulary> {
  constructor() {
    super(Vocabulary);
  }
  async findByLessonNumber(lessonNumber: number): Promise<IVocabulary | null> {
    return await this.findOne({ lessonNo: lessonNumber });
  }
}

export const vocabularyRepository = new VocabularyRepository();
