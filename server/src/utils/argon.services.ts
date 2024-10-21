import argon2 from 'argon2';
import { matchaError } from './matcha_error.js';

export const hashedData = async (data: string): Promise<string> => {
  try {
    const hash = await argon2.hash(data);
    if (!hash) throw new matchaError(500, 'Une erreur interne est survenue');
    return hash;
  } catch (error) {
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
};

export const verifyData = async (
  currentData: string | null,
  newData: string | null,
): Promise<boolean> => {
  if (!currentData || !newData) return false;
  try {
    return await argon2.verify(currentData, newData);
  } catch (error) {
    console.log('verifyData error', error);
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
};
