import mysql2 from 'mysql2/promise';
import { matchaError } from '../utils/matcha_error.js';
import {
  userSchema,
  tagsSchema,
  lookForSchema,
  lastSearchSchema,
  likeTableSchema,
  viewTableSchema,
  banTableSchema,
  muteTableSchema,
  notifTableSchema,
  chatTableSchema,
  photosPlusSchema,
} from './mysql.schemas.js';
import { insertFakeData } from './fakeData/fakeDataConfig.js';

export const mysqlDb = mysql2.createPool({
  host: process.env.MYSQL_HOST || '',
  user: process.env.MYSQL_USER || '',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || '',
});

export async function configMysql(): Promise<void> {
  let ret: boolean = false;
  try {
    while (!ret) {
      //try until the mysql container is connected
      ret = await isConnectMysql();
    }

    await createDatabase();
    await createUserTable();
    await createPhotosTable();
    await createTagsTable();
    await createLookForTable();
    await createLastSearchTable();
    await createLikeTable();
    await createViewTable();
    await createBanTable();
    await createMuteTable();
    await createChatTable();
    await createNotifTable();

    await insertFakeData();
  } catch (error) {
    console.log('config mysql', error);
    throw error;
  }
}

async function isConnectMysql(): Promise<boolean> {
  try {
    const connect = await mysqlDb.getConnection();
    if (connect) return true;
    return false;
  } catch (error) {
    return false;
  }
}

export async function createDatabase(): Promise<void> {
  const db = process.env.MYSQL_DATABASE || '';
  let query = `CREATE DATABASE IF NOT EXISTS ${db}`;
  try {
    //try to create db
    await mysqlDb.query(query);

    //check if db is created
    query = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${db}'`;
    const rows: any = await mysqlDb.query(query);
    if (rows[0].length === 0) {
      throw new Error('Database creation failed');
    }
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createUserTable(): Promise<void> {
  try {
    await mysqlDb.query(userSchema);
    const query = `SELECT * FROM User LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createPhotosTable(): Promise<void> {
  try {
    await mysqlDb.query(photosPlusSchema);
    const query = `SELECT * FROM PhotosPlus LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createTagsTable(): Promise<void> {
  try {
    await mysqlDb.query(tagsSchema);
    const query = `SELECT * FROM Tags LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createLookForTable(): Promise<void> {
  try {
    await mysqlDb.query(lookForSchema);
    const query = `SELECT * FROM LookFor LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createLastSearchTable(): Promise<void> {
  try {
    await mysqlDb.query(lastSearchSchema);
    const query = `SELECT * FROM LastSearch LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createLikeTable(): Promise<void> {
  try {
    await mysqlDb.query(likeTableSchema);
    const query = `SELECT * FROM LikeTable LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createViewTable(): Promise<void> {
  try {
    await mysqlDb.query(viewTableSchema);
    const query = `SELECT * FROM ViewTable LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    console.log('error', error);
    throw new matchaError(500, (error as Error).message);
  }
}

async function createBanTable(): Promise<void> {
  try {
    await mysqlDb.query(banTableSchema);
    const query = `SELECT * FROM BanTable LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createMuteTable(): Promise<void> {
  try {
    await mysqlDb.query(muteTableSchema);
    const query = `SELECT * FROM MuteTable LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createNotifTable(): Promise<void> {
  try {
    await mysqlDb.query(notifTableSchema);
    const query = `SELECT * FROM NotifTable LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createChatTable(): Promise<void> {
  try {
    await mysqlDb.query(chatTableSchema);
    const query = `SELECT * FROM ChatTable LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}
