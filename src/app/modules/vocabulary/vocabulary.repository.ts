import { BaseRepository } from '../base/base.repository';
import { IVocabulary, Vocabulary } from './vocabulary.model';

export class VocabularyRepository extends BaseRepository<IVocabulary> {
  constructor() {
    super(Vocabulary);
  }
}

export const vocabularyRepository = new VocabularyRepository();
