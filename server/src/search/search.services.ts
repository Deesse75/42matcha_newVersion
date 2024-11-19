import {
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import { ProfileBackType } from '../interfaces/user.interface.js';
import * as mysql from '../mysql/mysql.service.js';
import { convertPublicProfileList } from '../utils/convertData.js';

export const searchLocationService = async (
  user: MysqlUserType,
): Promise<ProfileBackType[] | null> => {
  const query: string = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
    FROM User 
    WHERE id != ?
    ORDER BY
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
  `;
  const values: any[] = [user.id, user.town, user.county, user.region];
  try {
    const listing = await mysql.getListing(query, values);
    if (!listing) return null;
    return await convertPublicProfileList(listing);
  } catch (error) {
    throw error;
  }
};

export const searchUsernameService = async (
  user: MysqlUserType,
  username: string,
): Promise<ProfileBackType[] | null> => {
  const query: string = `
  SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
    FROM User 
    WHERE id != ?
    AND username LIKE ?
    ORDER BY
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC
    `;
  const values: any[] = [
    user.id,
    `%${username}%`,
    user.town,
    user.county,
    user.region,
  ];
  console.log('searchUsernameService 1');
  try {
    const listing = await mysql.getListing(query, values);
    console.log('searchUsernameService getListing');
    if (!listing) return null;
    console.log('searchUsernameService go convertListingMiniUser');
    return convertPublicProfileList(listing);
  } catch (error) {
    throw error;
  }
};

export const searchTagsService = async (
  user: MysqlUserType,
  tags: MysqlUserTagsType,
): Promise<ProfileBackType[] | null> => {
  const query: string = '';
  const values: any[] = [];
  try {
    return null;
  } catch (error) {
    throw error;
  }
};

// export const searchAdvanceService = async (
//   user: MysqlUserType,
//   searchRequest: SearchRequestType,
// ): Promise<ProfileBackType[] | null> => {
//   let query: string = `
//   SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
//   FROM User 
//   WHERE id != ?
//   AND age BETWEEN ? AND ?
//   AND tall BETWEEN ? AND ?
//   `;
//   let values: any[] = [user.id, searchRequest.ageMin, searchRequest.ageMax, searchRequest.tallMin, searchRequest.tallMax];
//   if (searchRequest.gender) {
//     query += ' AND gender = ? ';
//     values.push(searchRequest.gender);
//   }
//   if (searchRequest.orientation) {
//     query += ' AND orientation = ? ';
//     values.push(searchRequest.orientation);
//   }
//   if (searchRequest.advancePhoto)
//     query += ' AND photo1 IS NOT NULL ';
//   query += `
//     ORDER BY
//     CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
//     CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
//     CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
//   `;
//   try {
//     const listing = await mysql.getListing(query, values);
//     if (!listing) return null;
//     return convertListingMiniUser(listing);
//   } catch (error) {
//     throw error;
//   }
// };


