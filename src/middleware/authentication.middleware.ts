import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../lib/Error';
import User, { IUser } from '../api/auth/auth.schema';
import { config } from '../../config/env';

const authenticate = async (
  req: Request & { id?: string, email?: string },
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    next(CustomError.unauthorized());
    return;
  }

  try {
    const decoded = jwt.verify(token, config.secret_access_token as string) as {userId: string, name: string, email: string}
    const user: IUser | null = await User.findOne({email: decoded.email});

    if (!user) {
      next(CustomError.unauthorized());
      return;
    }

    req.id = user._id as string;
    req.email = user.email as string;
    next();
  } catch (error) {
    console.log('Error authenticating user:');
    next(CustomError.unauthorized());
    return;
  }
};

export default authenticate;
