import {
  MysqlMiniUserType,
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import { MiniUserType } from '../interfaces/user.interface.js';
import * as mysql from '../mysql/mysql.service.js';
import {
  convertListingMiniUser,
  convertMiniUserType,
} from '../utils/convertData.js';

export const searchLocationService = async (
  user: MysqlUserType,
): Promise<MiniUserType[] | null> => {
  const query: string = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
    FROM User 
    WHERE id != ?
    ORDER BY
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
  `;
  const values: any = [user.id, user.town, user.county, user.region];
  try {
    const listing = await mysql.getListing(query, values);
    if (!listing) return null;
    return await convertListingMiniUser(listing);
  } catch (error) {
    throw error;
  }
};

export const searchUsernameService = async (
  user: MysqlUserType,
  username: string,
): Promise<MiniUserType[] | null> => {
  // const usernameValue = `%${username}%`;
  const query: string = `
  SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
    FROM User 
    WHERE id != ?
    AND username LIKE ?
    ORDER BY
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
    `;
  const values: any = [
    user.id,
    `%${username}%`,
    user.town,
    user.county,
    user.region,
  ];
  try {
    const listing = await mysql.getListing(query, values);
    if (!listing) return null;
    return convertListingMiniUser(listing);
  } catch (error) {
    throw error;
  }
};

export const searchTagsService = async (
  user: MysqlUserType,
  tags: MysqlUserTagsType,
): Promise<MiniUserType[] | null> => {
  const query: string = '';
  const values: any = [];
  try {
    return null;
  } catch (error) {
    throw error;
  }
};

// export const searchLastCoService = async (
//   user: MysqlUserType,
//   lastCo: number,
// ): Promise<MiniUserType[] | null> => {
//   const currentDate = Date.now();
//   const delay = (lastCo + 1) * 24 * 60 * 60 * 1000;
//   const limitDate = currentDate - delay;
//   try {
//     return await mysql.searchByLastCo(user.id, new Date(limitDate));
//   } catch (error) {
//     throw error;
//   }
// };

// export const searchMultiService = async (
//   id: number,
//   ageMin: number | null,
//   ageMax: number | null,
//   gender: string | null,
//   orientation: string | null,
//   region: string | null,
//   tallMin: number | null,
//   tallMax: number | null,
//   withPhoto: boolean | null,
//   withBio: boolean | null,
//   connected: boolean | null,
// ): Promise<MysqlMiniProfileType[] | null> => {
//   let query: string = `SELECT userId, username, age, gender, orientation, region, photo1 FROM Profile WHERE id != ?`;
//   let values: any = [id];
//   if (ageMin && ageMax) {
//     query += ' AND age BETWEEN ? AND ?';
//     values.push(ageMin);
//     values.push(ageMax);
//   }
//   if (!ageMin && ageMax) {
//     query += ' AND age <= ?';
//     values.push(ageMax);
//   }
//   if (ageMin && !ageMax) {
//     query += ' AND age >= ?';
//     values.push(ageMin);
//   }
//   if (gender) {
//     query += ' AND gender = ?';
//     values.push(gender);
//   }
//   if (orientation) {
//     query += ' AND orientation = ?';
//     values.push(orientation);
//   }
//   if (region) {
//     query += ' AND region = ?';
//     values.push(region);
//   }
//   if (tallMin && tallMax) {
//     query += ' AND tall BETWEEN ? AND ?';
//     values.push(tallMin);
//     values.push(tallMax);
//   }
//   if (!tallMin && tallMax) {
//     query += ' AND tall <= ?';
//     values.push(tallMax);
//   }
//   if (tallMin && !tallMax) {
//     query += ' AND tall >= ?';
//     values.push(tallMin);
//   }
//   if (withPhoto) {
//     query += ' AND photo1 IS NOT NULL';
//   }
//   if (withBio) {
//     query += ' AND bio IS NOT NULL';
//   }
//   query +=
//     ' AND id NOT IN (SELECT * FROM BanTable WHERE senderId = ? OR receiverId = ?)';
//   values.push(id);
//   values.push(id);
//   try {
//     return await mysql.searchMulti(query, values);
//   } catch (error) {
//     throw error;
//   }
// };
