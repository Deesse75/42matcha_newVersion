import { Request, Response, NextFunction } from 'express';
import * as jwt from '../utils/jwt.service.js';
import url from 'url';
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

export const urlTokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const parseUrl = url.parse(req.body.url, true).query;
    const token = parseUrl.token || '';
    if (typeof token !== 'string' || token.length === 0) {
      res.status(401).json({
        message: 'Token invalide, absent ou expiré.',
      });
      return;
    }
    const payload: { code: string; email: string } = jwt.verifyEmailToken(
      process.env.JWT_SECRET_MAIL || '',
      token,
    );
    req.body.code = payload.code;
    req.body.email = payload.email;
    return next();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
