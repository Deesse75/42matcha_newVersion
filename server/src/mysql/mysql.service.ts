import { matchaError } from '../utils/matcha_error.js';
import { mysqlDb } from '../mysql/mysql.config.js';
import {
  MysqlMiniUserType,
  MysqlUserChatType,
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import { CreateNewUserType } from '../interfaces/auth.interfaces.js';

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

export async function updateUserData(
  query: string,
  values: any[],
): Promise<void> {
  try {
    await mysqlDb.query(query, values);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function getFullUserData(
  query: string,
  values: any[],
): Promise<MysqlUserType | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows[0];
  } catch (error) {
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
}

export async function getMiniUserData(
  query: string,
  values: any[],
): Promise<MysqlMiniUserType | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows[0];
  } catch (error) {
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
}

export async function getUsername(
  query: string,
  values: any[],
): Promise<string | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows[0].username;
  } catch (error) {
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
}

export async function getTags(
  query: string,
  values: any[],
): Promise<MysqlUserTagsType[] | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows;
  } catch (error) {
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
}

export async function getListing(
  query: string,
  values: any[],
): Promise<MysqlMiniUserType[] | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows;
  } catch (error) {
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
}

export async function getUnseenMess(
  query: string,
  values: any[],
): Promise<{ id: number; senderId: number; message: string }[] | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows;
  } catch (error) {
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
}

export async function getCommonTags(
  query: string,
  values: any[],
): Promise<number[] | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows;
  } catch (error) {
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
}

export async function getUserStatChat(
  query: string,
  values: any[],
): Promise<MysqlUserChatType[] | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows;
  } catch (error) {
    throw new matchaError(500, 'Une erreur interne est survenue');
  }
}
