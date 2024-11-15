import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../utils/matcha_error.js';

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.status(200).json({ user: req.body.existingUser, userTags: req.body.tags });
    return;
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};
