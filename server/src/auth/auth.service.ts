import { matchaError } from '../utils/matcha_error.js';
import { MysqlUserValidationType } from '../mysql/interfaces/mysql_out.interfaces.js';
import { configMysql } from '../mysql/config/config.mysql.js';
import * as argon from '../utils/argon.services.js';
import * as authMysql from '../mysql/service/auth.mysql.js';
import * as mailer from '../utils/mailer.services.js';
import * as jwt from '../utils/jwt.service.js';

export const authInitDatabase = async (): Promise<void> => {
  try {
    await configMysql();
  } catch (error) {
    throw error;
  }
};

export const authSignup = async (
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
): Promise<void> => {
  try {
    const hash = await argon.hashedData(password);
    const num = (Math.floor(Math.random() * 900000) + 100000).toString();
    const emailCode = await argon.hashedData(num);

    await authMysql.createNewUser({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      emailCode: num,
      hashedPassword: hash,
    });
    const user = await authMysql.getUserByEmail(email);
    if (!user) {
      throw new matchaError(500, 'Une erreur interne est survenue');
    }
    await mailer.sendEmailTokenProcess(user.email, emailCode);
  } catch (error) {
    throw error;
  }
};

export const authSignin = async (
  existingUser: MysqlUserValidationType,
  password: string,
): Promise<string> => {
  try {
    const comparePassword = await argon.verifyData(
      existingUser.hashedPassword,
      password,
    );
    if (!comparePassword)
      throw new matchaError(401, 'Le mot de passe ne correspond pas.');
    const token = jwt.createUserToken(
      existingUser.id,
      existingUser.email,
      process.env.JWT_SECRET_TOKEN || '',
    );
    await authMysql.updateAge(existingUser.id);
    return token;
  } catch (error) {
    throw error;
  }
};

export const authValidate = async (
  existingUser: MysqlUserValidationType,
  code: string,
): Promise<void> => {
  try {
    const compareCode = await argon.verifyData(code, existingUser.emailCode);
    await authMysql.updateEmailCode(existingUser.id, '');
    if (!compareCode) {
      throw new matchaError(401, 'Token invalide, absent ou expiré.');
    }
    await authMysql.updateEmailCertified(existingUser.id);
  } catch (error) {
    throw error;
  }
};

export const authResendEmail = async (
  existingUser: MysqlUserValidationType,
): Promise<void> => {
  try {
    const num = (Math.floor(Math.random() * 900000) + 100000).toString();
    const emailCode = await argon.hashedData(num);
    await authMysql.updateEmailCode(existingUser.id, num);
    mailer.sendEmailTokenProcess(existingUser.email, emailCode);
  } catch (error) {
    throw error;
  }
};

export const authForgotPassword = async (
  existingUser: MysqlUserValidationType,
): Promise<void> => {
  try {
    const num = (Math.floor(Math.random() * 900000) + 100000).toString();
    const emailCode = await argon.hashedData(num);
    await authMysql.updateEmailCode(existingUser.id, num);
    mailer.sendEmailPasswordProcess(existingUser.email, num);
  } catch (error) {
    throw error;
  }
};

export const authReinitPassword = async (
  code: string,
  newPassword: string,
  existingUser: MysqlUserValidationType,
): Promise<void> => {
  try {
    const copyCode = existingUser.emailCode;
    await authMysql.updateEmailCode(existingUser.id, '');
    if (code !== copyCode)
      throw new matchaError(401, 'Le code ne correspond pas.');
    const hashedPassword = await argon.hashedData(newPassword);
    await authMysql.updateHashedPassword(existingUser.id, hashedPassword);
  } catch (error) {
    throw error;
  }
};
