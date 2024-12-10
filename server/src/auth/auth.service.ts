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
      fameRating: 100,
    });
    const query = 'SELECT * FROM User WHERE email = ?';
    const user = await mysql.getUser(query, [email]);
    if (!user) {
      throw new matchaError(
        400,
        'Une erreur est survenue lors de la création de votre profil. Merci de réessayer.',
      );
    }
    await mailer.sendEmailTokenProcess(user.email, emailCode);
  } catch (error) {
    throw error;
  }
};

export const authSignin = async (
  existingUser: MysqlUserType,
  password: string,
  region: string | null,
  county: string | null,
  town: string | null,
): Promise<string> => {
  let query: string = 'UPDATE User SET age = TIMESTAMPDIFF(YEAR, birthdate, CURDATE())';
  let values: any[] = [];
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
    if (region) {
      query += ', region = ?';
      values.push(region);
    }
    if (county) {
      query += ', county = ?';
      values.push(county);
    }
    if (town) {
      query += ', town = ?';
      values.push(town);
    }
    query += ' WHERE id = ?';
    values.push(existingUser.id);
    await mysql.updateTable(query, values);
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
    await mysql.updateTable(query, ['', existingUser.id]);
    if (!compareCode) {
      throw new matchaError(401, 'Token invalide, absent ou expiré.');
    }
    query = 'UPDATE User SET emailCertified = 1 WHERE id = ?';
    await mysql.updateTable(query, [existingUser.id]);
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
    await mysql.updateTable(query, [num, existingUser.id]);
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
    await mysql.updateTable(query, [num, existingUser.id]);
    mailer.sendEmailCodeProcess(existingUser.email, num);
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
    await mysql.updateTable(query, ['', existingUser.id]);
    if (code !== copyCode)
      throw new matchaError(401, 'Le code ne correspond pas.');
    const hashedPassword = await argon.hashedData(newPassword);
    query = 'UPDATE User SET hashedPassword = ? WHERE id = ?';
    await mysql.updateTable(query, [hashedPassword, existingUser.id]);
  } catch (error) {
    throw error;
  }
};

export const authContactUs = (
  contactName: string,
  contactEmail: string,
  subject: string,
  text: string,
): void => {
  try {
    mailer.sendContactUsProcess(contactName, contactEmail, subject, text);
  } catch (error) {
    throw error;
  }
};
