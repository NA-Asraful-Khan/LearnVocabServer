import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { userRepository } from '../user/user.repository';

const loginUser = async (payload: TLoginUser) => {
  if (!payload.email || !payload.password) {
    throw new AppError(400, 'Please provide email and password');
  }
  const user = await userRepository.findByEmail(payload.email);

  // check if the password is incorrect
  if (!user || !(await user.comparePassword(payload.password))) {
    throw new AppError(401, 'Incorrect email or password');
  }
  // generate and return the JWT token

  const jwtPayload = {
    userId: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_token_expiration_time as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expiration_time as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  loginUser,
  //   changePassword,
  //   refreshToken,
  //   forgetPassword,
  //   resetPassword,
};
