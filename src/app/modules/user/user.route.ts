import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.registerSchema),
  userController.createUser,
);

router.get('/', userController.findAll);
router.get('/pagination', userController.findPaginationQuery);
router.get('/:id', userController.findById);
router.get('/client/:email', userController.findByEmailForClient);
router.patch('/:id', userController.updateUserRole);
router.patch(
  '/update/:id',
  validateRequest(UserValidation.updateUserSchema),
  userController.update,
);
router.delete('/:id', userController.delete);

export const UserRoutes = router;
