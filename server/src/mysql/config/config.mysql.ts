import fs from 'fs';
import mysql2 from 'mysql2/promise';
import { matchaError } from '../../utils/matcha_error.js';
import { FakeActionType, FakeTagNameType, FakeTagType, FakeUserType } from '../interfaces/fake.interface.js';
import { banHistorySchema, chatHistorySchema, likeHistorySchema, tagHistorySchema, userSchema, viewHistorySchema } from './mysql.schemas.js';

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
    await createViewTable();
    await createLikeTable();
    await createBanTable();
    await createTagsTable();
    await createChatTable();

    // await insertFakeData();
  } catch (error) {
    console.log('config mysql', error);
    throw error;
  }
}

export async function insertFakeData() {
  try {
    await insertFakeUser();
    await insertFakeView();
    await insertFakeTags();
    await insertFakeLike();
    await insertFakeBan();
  } catch (error) {
    //ignore error
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

async function createLikeTable(): Promise<void> {
  try {
    await mysqlDb.query(likeHistorySchema);
    const query = `SELECT * FROM LikeHistory LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createViewTable(): Promise<void> {
  try {
    await mysqlDb.query(viewHistorySchema);
    const query = `SELECT * FROM ViewHistory LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    console.log('error', error);
    throw new matchaError(500, (error as Error).message);
  }
}

async function createBanTable(): Promise<void> {
  try {
    await mysqlDb.query(banHistorySchema);
    const query = `SELECT * FROM BanHistory LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createTagsTable(): Promise<void> {
  try {
    await mysqlDb.query(tagHistorySchema);
    const query = `SELECT * FROM TagHistory LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createChatTable(): Promise<void> {
  try {
    await mysqlDb.query(chatHistorySchema);
    const query = `SELECT * FROM ChatHistory LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function insertFakeTagName() {
  try {
    const rows: any = await mysqlDb.query('SELECT * FROM TagEdit LIMIT 1');
    if (rows[0].length > 0) return;
    if (!fs.existsSync('./src/mysql/fakeData/mysql_tagedit.json')) return;
    const query = `INSERT INTO TagEdit SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync('./src/mysql/fakeData/mysql_tagedit.json', 'utf8'),
    );
    fakeData.forEach(async (item: FakeTagNameType) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function insertFakeUser(): Promise<void> {
  try {
    const rows: any = await mysqlDb.query('SELECT * FROM User LIMIT 1');
    if (rows[0].length > 0) return;
    if (!fs.existsSync('./src/mysql/fakeData/mysql_users.json')) return;
    const query = `INSERT INTO User SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync('./src/mysql/fakeData/mysql_users.json', 'utf8'),
    );
    fakeData.forEach(async (item: FakeUserType) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function insertFakeLike() {
  try {
    const rows: any = await mysqlDb.query('SELECT * FROM LikeHistory LIMIT 1');
    if (rows[0].length > 0) return;
    if (!fs.existsSync('./src/mysql/fakeData/mysql_like.json')) return;
    const query = `INSERT INTO LikeHistory SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync('./src/mysql/fakeData/mysql_like.json', 'utf8'),
    );
    fakeData.forEach(async (item: FakeActionType) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function insertFakeView() {
  try {
    const rows: any = await mysqlDb.query('SELECT * FROM ViewHistory LIMIT 1');
    if (rows[0].length > 0) return;
    if (!fs.existsSync('./src/mysql/fakeData/mysql_view.json')) return;
    const query = `INSERT INTO ViewHistory SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync('./src/mysql/fakeData/mysql_view.json', 'utf8'),
    );
    fakeData.forEach(async (item: FakeActionType) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function insertFakeBan() {
  try {
    const rows: any = await mysqlDb.query('SELECT * FROM BanHistory LIMIT 1');
    if (rows[0].length > 0) return;
    if (!fs.existsSync('./src/mysql/fakeData/mysql_ban.json')) return;
    const query = `INSERT INTO BanHistory SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync('./src/mysql/fakeData/mysql_ban.json', 'utf8'),
    );
    fakeData.forEach(async (item: FakeActionType) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function insertFakeTags() {
  try {
    const rows: any = await mysqlDb.query('SELECT * FROM TagHistory LIMIT 1');
    if (rows[0].length > 0) return;
    if (!fs.existsSync('./src/mysql/fakeData/mysql_tags.json')) return;
    const query = `INSERT INTO TagHistory SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync('./src/mysql/fakeData/mysql_tags.json', 'utf8'),
    );
    fakeData.forEach(async (item: FakeTagType) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}
