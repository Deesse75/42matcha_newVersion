import { Response, Request, NextFunction } from 'express';
import url from 'url';
import * as jwt from '../utils/jwt.service.js';

export const authTokenValidation = (
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
