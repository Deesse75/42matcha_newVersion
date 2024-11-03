import { matchaError } from '../utils/matcha_error.js';
import { configMysql } from '../mysql/mysql.config.js';
import * as argon from '../utils/argon.services.js';
import * as mysql from '../mysql/mysql.service.js';
import * as mailer from '../utils/mailer.services.js';
import * as jwt from '../utils/jwt.service.js';
import { MysqlUserType } from '../interfaces/mysql_out.interfaces.js';

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
  birthdate: string,
  email: string,
  password: string,
): Promise<void> => {
  console.log("TEST")
  try {
    const hash = await argon.hashedData(password);
    const num = (Math.floor(Math.random() * 900000) + 100000).toString();
    const emailCode = await argon.hashedData(num);

    await mysql.createNewUser({
      firstname: firstname,
      lastname: lastname,
      username: username,
      birthdate: new Date(birthdate),
      email: email,
      emailCode: num,
      hashedPassword: hash,
    });
    const query = 'SELECT * FROM User WHERE email = ?';
    const user = await mysql.getFullUserData(query, [email]);
    if (!user) {
      throw new matchaError(500, 'Une erreur interne est survenue');
    }
    await mailer.sendEmailTokenProcess(user.email, emailCode);
  } catch (error) {
    throw error;
  }
};

export const authSignin = async (
  existingUser: MysqlUserType,
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
    const query =
      'UPDATE User SET age = TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) WHERE id = ?';
    await mysql.updateUserMysqlData(query, [existingUser.id]);
    return token;
  } catch (error) {
    throw error;
  }
};

export const authValidate = async (
  existingUser: MysqlUserType,
  code: string,
): Promise<void> => {
  let query: string = '';
  try {
    const compareCode = await argon.verifyData(code, existingUser.emailCode);
    query = 'UPDATE User SET emailCode = ? WHERE id = ?';
    await mysql.updateUserMysqlData(query, ['', existingUser.id]);
    if (!compareCode) {
      throw new matchaError(401, 'Token invalide, absent ou expiré.');
    }
    query = 'UPDATE User SET emailCertified = 1 WHERE id = ?';
    await mysql.updateUserMysqlData(query, [existingUser.id]);
  } catch (error) {
    throw error;
  }
};

export const authResendEmail = async (
  existingUser: MysqlUserType,
): Promise<void> => {
  try {
    const num = (Math.floor(Math.random() * 900000) + 100000).toString();
    const emailCode = await argon.hashedData(num);
    const query = 'UPDATE User SET emailCode = ? WHERE id = ?';
    await mysql.updateUserMysqlData(query, [num, existingUser.id]);
    mailer.sendEmailTokenProcess(existingUser.email, emailCode);
  } catch (error) {
    throw error;
  }
};

export const authForgotPassword = async (
  existingUser: MysqlUserType,
): Promise<void> => {
  try {
    const num = (Math.floor(Math.random() * 900000) + 100000).toString();
    const query = 'UPDATE User SET emailCode = ? WHERE id = ?';
    await mysql.updateUserMysqlData(query, [num, existingUser.id]);
    mailer.sendEmailPasswordProcess(existingUser.email, num);
  } catch (error) {
    throw error;
  }
};

export const authReinitPassword = async (
  code: string,
  newPassword: string,
  existingUser: MysqlUserType,
): Promise<void> => {
  let query: string = '';
  try {
    const copyCode = existingUser.emailCode;
    query = 'UPDATE User SET emailCode = ? WHERE id = ?';
    await mysql.updateUserMysqlData(query, ['', existingUser.id]);
    if (code !== copyCode)
      throw new matchaError(401, 'Le code ne correspond pas.');
    const hashedPassword = await argon.hashedData(newPassword);
    query = 'UPDATE User SET hashedPassword = ? WHERE id = ?';
    await mysql.updateUserMysqlData(query, [hashedPassword, existingUser.id]);
  } catch (error) {
    throw error;
  }
};
