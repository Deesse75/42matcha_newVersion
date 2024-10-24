import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import { userGetMe } from './user.service.js';

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await userGetMe(
      req.body.existingUser,
      req.body.userTags,
      req.body.region,
      req.body.county,
      req.body.town,
    );
    res.status(200).json({ user: user });
    return;
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};
