import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { BaseService } from '../base/base.service';
import { IUser, User } from './user.model';
import { userRepository } from './user.repository';

export class UserService extends BaseService<IUser> {
  constructor() {
    super(userRepository);
  }

  async createUser(password: string, userData: IUser) {
    const hasEmail = userData?.email;

    //Check if the email is already Used
    const checkStudentEmail = await User.findOne({
      email: userData.email,
    });
    if (checkStudentEmail) {
      throw new AppError(httpStatus.CONFLICT, 'Email already exists');
    }

    const user = await (this.repository as typeof userRepository).createUser(
      password,
      userData,
    );
    if (!user) {
      throw new AppError(404, 'No user found with that ID');
    }

    return user;
  }

  async updateUserRole(id: string, role: 'admin' | 'user') {
    if (!['admin', 'user'].includes(role)) {
      throw new AppError(400, 'Invalid Role');
    }

    const user = await (this.repository as typeof userRepository).updateRole(
      id,
      role,
    );
    if (!user) {
      throw new AppError(404, 'No user found with that ID');
    }

    return user;
  }
}

export const userService = new UserService();
