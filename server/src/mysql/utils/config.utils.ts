import { banHistorySchema, chatHistorySchema, likeHistorySchema, tagHistorySchema, tagsSchema, userSchema, viewHistorySchema } from "../config/mysql.schemas.js";

export const createTableUser = `CREATE TABLE IF NOT EXISTS User ${userSchema}`;

export const createTableTagName = `CREATE TABLE IF NOT EXISTS TagEdit ${tagsSchema}`;

export const createTableLike = `CREATE TABLE IF NOT EXISTS LikeHistory ${likeHistorySchema}`;

export const createTableView = `CREATE TABLE IF NOT EXISTS ViewHistory ${viewHistorySchema}`;

export const createTableBan = `CREATE TABLE IF NOT EXISTS BanHistory ${banHistorySchema}`;

export const createTableTag = `CREATE TABLE IF NOT EXISTS TagHistory ${tagHistorySchema}`;

export const createTableChat = `CREATE TABLE IF NOT EXISTS ChatHistory ${chatHistorySchema}`;

export const tagEditJson = './src/mysql/fakeData/mysql_tagedit.json';

export const userJson = './src/mysql/fakeData/mysql_users.json';

export const likeJson = './src/mysql/fakeData/mysql_like.json';

export const viewJson = './src/mysql/fakeData/mysql_view.json';

export const banJson = './src/mysql/fakeData/mysql_ban.json';

export const tagJson = './src/mysql/fakeData/mysql_tags.json';


