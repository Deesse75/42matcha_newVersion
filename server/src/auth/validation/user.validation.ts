import { Request, Response, NextFunction } from 'express';
import * as mysql from '../../mysql/service/auth.mysql.js';
import { matchaError } from '../../utils/matcha_error.js';

export const dontFindUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await mysql.getUserByEmail(req.body.email);
    if (!user) return next();
    res.status(400).json({ message: 'Adresse email déjà utilisée.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const dontFindUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await mysql.getUserByUsername(req.body.username);
    if (!user) return next();
    res.status(400).json({ message: "Nom d'utilisateur déjà utilisé." });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const findUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await mysql.getUserByUsername(req.body.username);
    if (user) {
      if (user.emailCertified) {
        req.body.existingUser = user;
        return next();
      }
      res.status(400).json({ message: "En attente de validation de l'adresse email." });
      return;
    }
    res.status(400).json({ message: "Utilisateur inconnu." });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const findUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await mysql.getUserByEmail(req.body.email);
    if (user) {
      if (user.emailCertified) {
        req.body.existingUser = user;
        return next();
      }
      res.status(400).json({ message: "En attente de validation de l'adresse email." });
      return;
    }
    res.status(400).json({ message: "Adresse email inconnue." });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const findUserNotCertified = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await mysql.getUserByEmail(req.body.email);
    if (user) {
      if (!user.emailCertified) {
        req.body.existingUser = user;
        return next();
      }
      res.status(400).json({ message: 'Adresse email déjà validée.' });
      return;
    }
    res.status(400).json({ message: 'Adresse email inconnue.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};
