import express from 'express';
import { vocabularyController } from './vocabulary.controller';
import validateRequest from '../../middleware/validateRequest';
import {
  updateVocabularySchema,
  vocabularySchema,
} from './vocabularyvalidation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router
  .route('/')
  .get(vocabularyController.findAll)
  .post(
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(vocabularySchema),
    vocabularyController.createVocabulary,
  );

router.get('/pagination', vocabularyController.findPaginationQuery);

router
  .route('/:id')
  .get(vocabularyController.findById)
  .patch(
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(updateVocabularySchema),
    vocabularyController.update,
  )
  .delete(
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    vocabularyController.deleteVocabulary,
  );

export const VocabularyRoutes = router;
