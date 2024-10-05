import { matchaError } from '../../utils/matcha_error.js';
import { mysqlDb } from '../config/config.mysql.js';
import { CreateNewUserType } from '../interfaces/mysql_in.interfaces.js';
import { MysqlUserValidationType } from '../interfaces/mysql_out.interfaces.js';

export async function getUserById(
  id: number,
): Promise<MysqlUserValidationType | null> {
  try {
    const query =
      'SELECT id, username, email, emailCertified, emailCode, hashedPassword FROM User WHERE id = ?';
    const [rows]: any = await mysqlDb.query(query, [id]);
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function getUserByEmail(
  email: string,
): Promise<MysqlUserValidationType | null> {
  try {
    const query =
      'SELECT id, username, email, emailCertified, emailCode, hashedPassword FROM User WHERE email = ?';
    const [rows]: any = await mysqlDb.query(query, [email]);
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function getUserByUsername(
  username: string,
): Promise<MysqlUserValidationType | null> {
  try {
    const query =
      'SELECT id, username, email, emailCertified, emailCode, hashedPassword FROM User WHERE username = ?';
    const [rows]: any = await mysqlDb.query(query, [username]);
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function createNewUser(newUser: CreateNewUserType): Promise<void> {
  const query = 'INSERT INTO User SET ?';
  try {
    await mysqlDb.query(query, [newUser]);
  } catch (error) {
    const mysqlError = error as any;
    if (mysqlError.code === 'ER_DUP_ENTRY')
      throw new matchaError(409, 'Cet utilisateur existe déjà.');
    else throw new matchaError(500, mysqlError.message);
  }
}

export async function updateAge(id: number): Promise<void> {
  const query =
    'UPDATE User SET age = TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) WHERE id = ?';
  try {
    await mysqlDb.query(query, [id]);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function updateEmailCode(
  id: number,
  emailCode: string,
): Promise<void> {
  const query = 'UPDATE User SET emailCode = ? WHERE id = ?';
  try {
    await mysqlDb.query(query, [emailCode, id]);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function updateEmailCertified(id: number): Promise<void> {
  const query = 'UPDATE User SET emailCertified = 1 WHERE id = ?';
  try {
    await mysqlDb.query(query, [id]);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function updateHashedPassword(
  id: number,
  hashedPassword: string,
): Promise<void> {
  const query = 'UPDATE User SET hashedPassword = ? WHERE id = ?';
  try {
    await mysqlDb.query(query, [hashedPassword, id]);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}


