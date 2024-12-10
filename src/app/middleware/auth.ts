import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole, User } from '../modules/user/user.model';
import { userRepository } from '../modules/user/user.repository';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Auth
    const token = req.headers.authorization;
    // if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You must be logged in');
    }
    // check if the token is valid
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    const { role, email } = decoded;
    console.log(decoded);
    const isUserExists = await userRepository.findByEmail(email);

    if (!isUserExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `User not found with this Email!`,
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      //Check if the user is authorized
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are Unauthorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
