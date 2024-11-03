import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import * as mysqlReq from '../mysql/mysql.service.js';

export const findExistingUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const query = 'SELECT * FROM User WHERE id = ?';
    const existingUser = await mysqlReq.getFullUserData(query, [req.body.payloadToken.id]);
    if (!existingUser) {
      res.status(400).json({ message: 'Une erreur est survenue lors de la récupération de vos données.' });
      return;
    }
    req.body.existingUser = existingUser;
    return next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const findUserTags = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const query = 'SELECT * FROM UserTags WHERE userId = ?';
  try {
    req.body.userTags = await mysqlReq.getUserTags(query, [req.body.payloadToken.id]);
    return next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const findChatStatUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const query = 'SELECT * FROM ChatHistory WHERE senderId = ?';
  try {
    req.body.statChat = await mysqlReq.getUserStatChat(query, [
      req.body.payloadToken.id,
    ]);
    return next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};
