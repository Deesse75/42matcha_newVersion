import { Request, Response, NextFunction } from 'express';
import * as jwt from '../utils/jwt.service.js';
import { matchaError } from '../utils/matcha_error.js';

export const userTokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    if (!req.headers?.authorization)
      res.status(401).json({ message: 'Token invalide, absent ou expiré.' });
    const token: string = req.headers?.authorization?.split(' ')[1] || '';
    if (!token)
      res.status(401).json({ message: 'Token invalide, absent ou expiré.' });
    const payload: { id: number; email: string } = jwt.verifyHeaderToken(
      process.env.JWT_SECRET_TOKEN || '',
      token,
    );
    req.body.payloadToken = {
      id: payload.id,
      email: payload.email,
    };
    next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};
