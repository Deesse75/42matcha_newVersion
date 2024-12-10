import { matchaError } from '../utils/matcha_error.js';
import { Response, Request } from 'express';
import {
  authContactUs,
  authForgotPassword,
  authInitDatabase,
  authReinitPassword,
  authResendEmail,
  authSignin,
  authSignup,
  authValidate,
} from './auth.service.js';

export const initializeDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await authInitDatabase();
    res.status(200).json({ message: 'Le serveur est opérationnel' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    await authSignup(
      req.body.firstname,
      req.body.lastname,
      req.body.username,
      req.body.birthdate,
      req.body.email,
      req.body.password,
    );
    res.status(201).json({
      message: 'Un lien vous a été envoyé par email.',
    });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await authSignin(
      req.body.existingUser,
      req.body.password,
      req.body.region,
      req.body.county,
      req.body.town,
    );
    res.status(200).json({
      token: token,
    });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const validateEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await authValidate(req.body.existingUser, req.body.code);
    res.status(200).json({
      message: 'Votre adresse email a été validée.',
    });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const resendEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await authResendEmail(req.body.existingUser);
    res.status(200).json({
      message: 'Un lien vous a été envoyé par email.',
    });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await authForgotPassword(req.body.existingUser);
    res.status(200).json({ message: 'Un code vous a été envoyé par email.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const reinitPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await authReinitPassword(
      req.body.code,
      req.body.newPassword,
      req.body.existingUser,
    );
    res.status(200).json({
      message: 'Votre mot de passe a été modifié.',
    });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const contactUs = async (req: Request, res: Response) => {
  try {
    authContactUs(
      req.body.contactName,
      req.body.contactEmail,
      req.body.subject,
      req.body.text,
    );
    res.status(200).json({ message: 'Votre message a été envoyé.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};
