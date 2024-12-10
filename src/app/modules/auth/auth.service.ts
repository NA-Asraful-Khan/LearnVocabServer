import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { userRepository } from '../user/user.repository';
import bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';

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
    email: user?.email,
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

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const isUserExists = await userRepository.findByEmail(userData.email);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, `User not found with this Email!`);
  }

  // check if the password is incorrect
  if (
    !isUserExists ||
    !(await isUserExists.comparePassword(payload.oldPassword))
  ) {
    throw new AppError(401, 'Incorrect email or password');
  }
  // Hash new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData?.email,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
  //   refreshToken,
  //   forgetPassword,
  //   resetPassword,
};
