import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { lessonController } from './lesson.controller';
import validateRequest from '../../middleware/validateRequest';
import { LessonValidation } from './lesson.validation';

const router = express.Router();

router
  .route('/')
  .get(lessonController.findAll)
  .post(
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(LessonValidation.lessonSchema),
    lessonController.create,
  );
router.get('/pagination', lessonController.findPaginationQuery);
router.get('/lesson/:id', lessonController.findByLessonNumber);
router
  .route('/:id')
  .get(lessonController.findById)
  .patch(
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(LessonValidation.updateLessonSchema),
    lessonController.update,
  )
  .delete(auth(USER_ROLE.admin, USER_ROLE.superAdmin), lessonController.delete);

export const LessonRoutes = router;
