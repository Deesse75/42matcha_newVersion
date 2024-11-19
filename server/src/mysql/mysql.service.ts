import { matchaError } from '../utils/matcha_error.js';
import { mysqlDb } from '../mysql/mysql.config.js';
import {
  MysqlActionType,
  MysqlChatMessageType,
  MysqlLastSearchType,
  MysqlLookForType,
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import {
  PhotosPlusBackType,
} from '../interfaces/user.interface.js';

type CreateNewUserType = {
  firstname: string;
  lastname: string;
  username: string;
  birthdate: Date;
  email: string;
  emailCode: string;
  hashedPassword: string;
  fameRating: number;
};

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

export async function updateTable(query: string, values: any[]): Promise<void> {
  try {
    await mysqlDb.query(query, values);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function getUser(
  query: string,
  values: any[],
): Promise<MysqlUserType | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows[0];
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
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
    throw new matchaError(500, (error as Error).message);
  }
}

export async function getLookFor(
  query: string,
  values: any[],
): Promise<MysqlLookForType | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows[0];
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function getLastSearch(
  query: string,
  values: any[],
): Promise<MysqlLastSearchType | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows[0];
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function getPhotosPlus(
  query: string,
  values: any[],
): Promise<PhotosPlusBackType | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows[0];
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function getListing(
  query: string,
  values: any[],
): Promise<MysqlUserType[] | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows;
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function getActionBetween(
  query: string,
  values: any[],
): Promise<boolean> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return false;
    return true;
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
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
    throw new matchaError(500, (error as Error).message);
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
    throw new matchaError(500, (error as Error).message);
  }
}

export async function getUserStatChat(
  query: string,
  values: any[],
): Promise<MysqlChatMessageType[] | null> {
  try {
    const [rows]: any[] = await mysqlDb.query(query, values);
    if (!rows[0]) return null;
    return rows;
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}
