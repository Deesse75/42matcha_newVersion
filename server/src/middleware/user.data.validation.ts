import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import * as mysql from '../mysql/mysql.service.js';

export const findExistingUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const query = 'SELECT * FROM User WHERE id = ?';
    const values = [req.body.payloadToken.id];
    const existingUser = await mysql.getUser(query, values);
    if (!existingUser) {
      res.status(400).json({
        message:
        'Une erreur est survenue lors de la récupération de vos données.',
      });
      return;
    }
    req.body.existingUser = existingUser;
    console.log('findExistingUser', req.body.existingUser);
    return next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const findTags = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const query = 'SELECT * FROM Tags WHERE userId = ?';
  const values: any[] = [req.body.payloadToken.id];
  try {
    req.body.userTags = await mysql.getTags(query, values);
    return next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const findLastSearch = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const query = 'SELECT * FROM LastSearch WHERE userId = ?';
  const values: any[] = [req.body.payloadToken.id];
  try {
    req.body.userLastSearch = await mysql.getLastSearch(query, values);
    return next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const findPhotosPlus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const query = 'SELECT * FROM PhotosPlus WHERE userId = ?';
  const values: any[] = [req.body.payloadToken.id];
  try {
    req.body.userPhotosPlus = await mysql.getPhotosPlus(query, values);
    return next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};
