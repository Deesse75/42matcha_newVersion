import nodemailer from 'nodemailer';
import { matchaError } from './matcha_error.js';
import * as jwt from './jwt.service.js';
import * as mess from './mailer.template.js';

const transporter = nodemailer.createTransport({
  service: 'smtps',
  host: process.env.MAILER_HOST || '',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILER_EMAIL || '',
    pass: process.env.MAILER_PASS || '',
  },
  pool: true,
});

export const sendNewEmail = (
  to: string,
  subject: string,
  text: string,
): void => {
  const MAIL = process.env.MAILER_EMAIL || '';
  try {
    console.log('MAILER to: ', to, 'subject: ', subject, 'text: ', text);
    // transporter.sendMail(
    //   {
    //     from: `no-reply <${MAIL}>`,
    //     to: to,
    //     subject: subject,
    //     html: text,
    //   },
    //   (error, info) => {
    //     if (error) {
    //       throw error;
    //     }
    //   },
    // );
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
};

export const sendEmailTokenProcess = async (
  email: string,
  emailCode: string,
): Promise<void> => {
  try {
    const token = jwt.createEmailToken(
      emailCode,
      email,
      process.env.JWT_SECRET_MAIL || '',
    );
    sendNewEmail(
      email,
      'Validation de votre adresse email',
      mess.sendToken(token),
    );
  } catch (error) {
    throw error;
  }
};

export const sendEmailCodeProcess = async (
  email: string,
  num: string,
): Promise<void> => {
  try {
    sendNewEmail(
      email,
      'Réinitialisation de votre mot de passe',
      mess.sendCode(num),
    );
  } catch (error) {
    throw error;
  }
};

export const sendContactUsProcess = async (
  userName: string,
  userEmail: string,
  subject: string,
  text: string,
): Promise<void> => {
  try {
    sendNewEmail(
      process.env.MAILER_EMAIL || '',
      'Message via Contactez-nous',
      mess.sendContact(userName, userEmail, subject, text),
    );
  } catch (error) {
    throw error;
  }
};

export const sendAlertProcess = async (
  userId: number,
  text: string,
): Promise<void> => {
  try {
    sendNewEmail(
      process.env.MAILER_EMAIL || '',
      'Message de signalement',
      mess.sendAdmin(userId, text),
    );
  } catch (error) {
    throw error;
  }
};
