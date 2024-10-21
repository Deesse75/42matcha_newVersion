import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import { userGetMe } from './user.service.js';

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const me = await userGetMe(req.body.existingUser, req.body.userTags);
    res.status(200).json({ me: me });
    return;
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};
