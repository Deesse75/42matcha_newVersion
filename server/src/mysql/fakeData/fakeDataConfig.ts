import fs from 'fs';
import { mysqlDb } from '../mysql.config.js';
import { MysqlUserType } from '../../interfaces/mysql_out.interfaces.js';
import { matchaError } from '../../utils/matcha_error.js';

const fakeRoute = './src/mysql/fakeData/';

export async function insertFakeData() {
  try {
    await insertFakeUser();
    await insertFakeTags();
    await insertFakeView();
    await insertFakeLike();
    await insertFakeBan();
  } catch (error) {
    //ignore error
  }
}

export async function insertFakeUser(): Promise<void> {
  try {
    const [rows]: any[] = await mysqlDb.query('SELECT * FROM User LIMIT 1');
    if (rows[0]) return;
    if (!fs.existsSync(`${fakeRoute}/users.json`)) return;
    const query = `INSERT INTO User SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync(`${fakeRoute}/users.json`, 'utf8'),
    );
    fakeData.forEach(async (item: MysqlUserType) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function insertFakeLike() {
  try {
    const [rows]: any[] = await mysqlDb.query(
      'SELECT * FROM LikeTable LIMIT 1',
    );
    if (rows[0]) return;
    if (!fs.existsSync(`${fakeRoute}/like.json`)) return;
    const query = `INSERT INTO LikeTable SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync(`${fakeRoute}/like.json`, 'utf8'),
    );
    fakeData.forEach(async (item: { senderId: number; receiverId: number }) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function insertFakeView() {
  try {
    const [rows]: any[] = await mysqlDb.query(
      'SELECT * FROM ViewTable LIMIT 1',
    );
    if (rows[0]) return;
    if (!fs.existsSync(`${fakeRoute}/view.json`)) return;
    const query = `INSERT INTO ViewTable SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync(`${fakeRoute}/view.json`, 'utf8'),
    );
    fakeData.forEach(async (item: { senderId: number; receiverId: number }) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function insertFakeBan() {
  try {
    const [rows]: any[] = await mysqlDb.query('SELECT * FROM BanTable LIMIT 1');
    if (rows[0]) return;
    if (!fs.existsSync(`${fakeRoute}/ban.json`)) return;
    const query = `INSERT INTO BanTable SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync(`${fakeRoute}/ban.json`, 'utf8'),
    );
    fakeData.forEach(async (item: { senderId: number; receiverId: number }) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}

export async function insertFakeTags() {
  try {
    const [rows]: any[] = await mysqlDb.query('SELECT * FROM Tags LIMIT 1');
    if (rows[0]) return;
    if (!fs.existsSync(`${fakeRoute}/tags.json`)) return;
    const query = `INSERT INTO Tags SET ?`;
    const fakeData = JSON.parse(
      fs.readFileSync(`${fakeRoute}/tags.json`, 'utf8'),
    );
    fakeData.forEach(async (item: { userId: number; tagName: string }) => {
      await mysqlDb.query(query, item);
    });
  } catch (error) {
    throw new matchaError(500, (error as Error).message);
  }
}
