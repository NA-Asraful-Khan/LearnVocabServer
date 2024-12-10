import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { BaseRepository } from '../base/base.repository';
import { IUser, User } from './user.model';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email }).select('+password');
  }

  async createUser(password: string, userData: IUser): Promise<IUser | null> {
    //Use Default Password
    userData.password = password || (config.default_password as string);
    try {
      const newUser = await this.create(userData);

      return newUser;
    } catch (error) {
      console.log(error);
      throw new AppError(500, 'Error creating student');
    }
  }
}

export const userRepository = new UserRepository();
