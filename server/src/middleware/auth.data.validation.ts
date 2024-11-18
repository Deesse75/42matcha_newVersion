import { Request, Response, NextFunction } from 'express';
import * as mysql from '../mysql/mysql.service.js';
import { matchaError } from '../utils/matcha_error.js';
import { MysqlUserType } from '../interfaces/mysql_out.interfaces.js';

export const birthdateValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const currentLegalDate = [
    new Date().getFullYear() - 18,
    new Date().getMonth(),
    new Date().getDate(),
  ];
  const currentBirthdate = [
    new Date(req.body.birthdate).getFullYear(),
    new Date(req.body.birthdate).getMonth(),
    new Date(req.body.birthdate).getDate(),
  ];
  if (currentBirthdate[0] > currentLegalDate[0]) {
    res.status(400).json({ message: 'Vous devez avoir au moins 18 ans.' });
    return;
  }
  if (currentBirthdate[0] === currentLegalDate[0]) {
    if (currentBirthdate[1] > currentLegalDate[1]) {
      res.status(400).json({ message: 'Vous devez avoir au moins 18 ans.' });
      return;
    }
    if (currentBirthdate[1] === currentLegalDate[1]) {
      if (currentBirthdate[2] > currentLegalDate[2]) {
        res.status(400).json({ message: 'Vous devez avoir au moins 18 ans.' });
        return;
      }
    }
  }
  return next();
};

export const authUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let query: string = '';
  let existingUser: MysqlUserType | null = null;
  try {
    if (req.path === '/signup') {
      query = 'SELECT * FROM User WHERE email = ?';
      if (await mysql.getUser(query, [req.body.email])) {
        res.status(400).json({ message: 'Adresse email déjà utilisée.' });
        return;
      } else {
        query = 'SELECT * FROM User WHERE username = ?';
        if (await mysql.getUser(query, [req.body.username])) {
          res
            .status(400)
            .json({ message: "Le nom d'utilisateur est déjà utilisée." });
          return;
        }
      }
      return next();
    } else {
      if (req.path === '/signin_username') {
        query = 'SELECT * FROM User WHERE username = ?';
        existingUser = await mysql.getUser(query, [req.body.username]);
        if (!existingUser) {
          res.status(400).json({ message: "Nom d'utilisateur inconnu." });
          return;
        }
      } else if (
        req.path === '/signin_email' ||
        req.path === '/forgot_password' ||
        req.path === '/resend_email' ||
        req.path === '/reinit_password'
      ) {
        query = 'SELECT * FROM User WHERE email = ?';
        existingUser = await mysql.getUser(query, [req.body.email]);
        if (!existingUser) {
          res.status(400).json({ message: 'Adresse email inconnue.' });
          return;
        }
      } else if (req.path === '/validate_email') {
        query = 'SELECT * FROM User WHERE email = ?';
        existingUser = await mysql.getUser(query, [
          req.body.email,
        ]);
        if (!existingUser) {
          res.status(400).json({ message: 'Utilisateur inconnu.' });
          return;
        }
      }
      req.body.existingUser = existingUser;
      return next();
    }
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const isEmailCertified = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    if (req.body.existingUser.emailCertified) {
      if (req.path === '/resend_email' || req.path === '/validate_email') {
        res.status(400).json({ message: 'Adresse email déjà validée.' });
        return;
      }
      return next();
    } else {
      if (req.path === '/resend_email' || req.path === '/validate_email')
        return next();
      res
        .status(400)
        .json({ message: "En attente de validation de l'adresse email." });
      return;
    }
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};
