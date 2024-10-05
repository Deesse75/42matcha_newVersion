import jwt from 'jsonwebtoken';
import { matchaError } from './matcha_error.js';

export const createUserToken = (
  id: number,
  email: string,
  SECRET: string,
): string => {
  try {
    const token = jwt.sign({ id: id, email: email }, SECRET, {
      expiresIn: '1h',
    });
    if (!token) throw new matchaError(500, 'Une erreur interne est survenue');
    return token;
  } catch (error) {
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
};

export const createEmailToken = (
  emailCode: string,
  email: string,
  SECRET: string,
): string => {
  try {
    const token = jwt.sign({ code: emailCode, email: email }, SECRET, {
      expiresIn: 900,
    });
    if (!token) throw new matchaError(500, 'Une erreur interne est survenue');
    return token;
  } catch (error) {
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
};

export const verifyEmailToken = (
  SECRET: string,
  token: string,
): { code: string; email: string } => {
  const payload: any = jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      throw new matchaError(401, 'Token invalide, absent ou expiré.');
    }
    return decoded;
  });
  return { code: payload.code, email: payload.email };
};

export const verifyHeaderToken = (
  SECRET: string,
  token: string,
): { id: number; email: string } => {
  const payload: any = jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      throw new matchaError(401, 'Token invalide, absent ou expiré.');
    }
    return decoded;
  });
  return { id: payload.id, email: payload.email };
};
