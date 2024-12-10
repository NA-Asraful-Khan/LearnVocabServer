import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { handleResponse } from '../../utils/responseHandler';
import { BaseController } from '../base/base.controller';
import { IUser } from './user.model';
import { userService } from './user.service';
import AppError from '../../errors/AppError';

export class UserController extends BaseController<IUser> {
  constructor() {
    super(userService);
  }

  createUser = catchAsync(async (req, res) => {
    const { password, user: userData } = req.body;

    if (!userData) {
      throw new AppError(403, 'User data are required');
    }
    const result = await (this.service as typeof userService).createUser(
      password,
      userData,
    );

    handleResponse.sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  });
}

export const userController = new UserController();
