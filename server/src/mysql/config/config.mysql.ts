import fs from 'fs';
import mysql2 from 'mysql2/promise';
import { matchaError } from '../../utils/matcha_error.js';
import { FakeActionType, FakeTagNameType, FakeTagType, FakeUserType } from '../interfaces/config.interface.js';
import { banJson, createTableBan, createTableChat, createTableLike, createTableTag, createTableTagName, createTableUser, createTableView, likeJson, tagEditJson, tagJson, userJson, viewJson } from '../utils/config.utils.js';
import { create } from 'domain';

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
    await createTagNameTable();
    await createViewTable();
    await createLikeTable();
    await createBanTable();
    await createTagsTable();
    await createChatTable();

    await insertFakeData();
  } catch (error) {
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
    await mysqlDb.query(createTableUser);
    const query = `SELECT * FROM User LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createTagNameTable(): Promise<void> {
  try {
    await mysqlDb.query(createTableTagName);
    const query = `SELECT * FROM TagEdit LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createLikeTable(): Promise<void> {
  try {
    await mysqlDb.query(createTableLike);
    const query = `SELECT * FROM LikeHistory LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createViewTable(): Promise<void> {
  try {
    await mysqlDb.query(createTableView);
    const query = `SELECT * FROM ViewHistory LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createBanTable(): Promise<void> {
  try {
    await mysqlDb.query(createTableBan);
    const query = `SELECT * FROM BanHistory LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createTagsTable(): Promise<void> {
  try {
    await mysqlDb.query(createTableTag);
    const query = `SELECT * FROM TagHistory LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

async function createChatTable(): Promise<void> {
  try {
    await mysqlDb.query(createTableChat);
    const query = `SELECT * FROM ChatHistory LIMIT 1`;
    await mysqlDb.query(query);
  } catch (error) {
    console.log('error8', error);
    throw new matchaError(500, (error as Error).message);
  }
}

export async function insertFakeTagName() {
  try {
    const rows: any = await mysqlDb.query('SELECT * FROM TagEdit LIMIT 1');
    if (rows[0].length > 0) return;
    if (!fs.existsSync(tagEditJson)) return;
    const query = `INSERT INTO TagEdit SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync(tagEditJson, 'utf8'),
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
    if (!fs.existsSync(userJson)) return;
    const query = `INSERT INTO User SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync(userJson, 'utf8'),
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
    if (!fs.existsSync(likeJson)) return;
    const query = `INSERT INTO LikeHistory SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync(likeJson, 'utf8'),
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
    if (!fs.existsSync(viewJson)) return;
    const query = `INSERT INTO ViewHistory SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync(viewJson, 'utf8'),
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
    if (!fs.existsSync(banJson)) return;
    const query = `INSERT INTO BanHistory SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync(banJson, 'utf8'),
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
    if (!fs.existsSync(tagJson)) return;
    const query = `INSERT INTO TagHistory SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync(tagJson, 'utf8'),
    );
    fakeData.forEach(async (item: FakeTagType) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}
