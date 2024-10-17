import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../../utils/matcha_error.js';
import * as mysql from '../../mysql/service/user.mysql.js';

export const findExistingUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    req.body.existingUser = await mysql.getUserById(req.body.payloadToken.id);
    next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};