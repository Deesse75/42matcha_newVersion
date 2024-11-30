import { MysqlUserType } from '../interfaces/mysql_out.interfaces.js';
import { ProfileBackType } from '../interfaces/user.interface.js';
import * as mysql from '../mysql/mysql.service.js';
import { convertPublicProfileList } from '../utils/convertData.js';
import { matchaError } from '../utils/matcha_error.js';

type SearchRequestType = {
  ageMin: number | null;
  ageMax: number | null;
  gender: string | null;
  orientation: string | null;
  tallMin: number | null;
  tallMax: number | null;
  withPhoto: boolean;
  withBio: boolean;
  fameRatingMin: number | null;
};

export const searchUsernameService = async (
  user: MysqlUserType,
  username: string,
): Promise<ProfileBackType[]> => {
  const query: string = `
  SELECT * FROM User 
    WHERE id != ?
    AND username LIKE ?
    AND id NOT IN 
    (SELECT senderId FROM BanTable WHERE receiverId = ?)
    AND id NOT IN
    (SELECT receiverId FROM BanTable WHERE senderId = ?)
    ORDER BY
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
    `;
  const values: any[] = [
    user.id,
    `%${username}%`,
    user.id,
    user.id,
    user.town,
    user.county,
    user.region,
  ];
  try {
    const listing = await mysql.getListing(query, values);
    if (!listing) return [] as ProfileBackType[];
    return convertPublicProfileList(listing);
  } catch (error) {
    throw error;
  }
};

export const searchLocationService = async (
  user: MysqlUserType,
  zone: string,
): Promise<ProfileBackType[]> => {
  let query: string = `
  SELECT * FROM User 
    WHERE id != ?
    AND id NOT IN 
    (SELECT senderId FROM BanTable WHERE receiverId = ?)
    AND id NOT IN
    (SELECT receiverId FROM BanTable WHERE senderId = ?)
  `;
  const values: any[] = [user.id, user.id, user.id];
  if (zone === 'town') {
    query += ' AND town = ? ';
    values.push(user.town);
  } else if (zone === 'county') {
    query += ' AND county = ? ';
    values.push(user.county);
  } else if (zone === 'region') {
    query += ' AND region = ? ';
    values.push(user.region);
  } else {
    throw new matchaError(400, 'Requête invalide');
  }
  try {
    const listing = await mysql.getListing(query, values);
    if (!listing) return [] as ProfileBackType[];
    return await convertPublicProfileList(listing);
  } catch (error) {
    throw error;
  }
};

export const searchTagsService = async (
  user: MysqlUserType,
  tag: string,
): Promise<ProfileBackType[]> => {
  let query: string = `
  SELECT * FROM User 
    WHERE id != ?
    AND id IN
    (SELECT userId FROM Tags WHERE tagName LIKE ?)
    AND id NOT IN 
    (SELECT senderId FROM BanTable WHERE receiverId = ?)
    AND id NOT IN
    (SELECT receiverId FROM BanTable WHERE senderId = ?)
    ORDER BY
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
  `;
  const values: any[] = [
    user.id,
    `%${tag}%`,
    user.id,
    user.id,
    user.town,
    user.county,
    user.region,
  ];
  try {
    const listing = await mysql.getListing(query, values);
    if (!listing) return [] as ProfileBackType[];
    return convertPublicProfileList(listing);
  } catch (error) {
    throw error;
  }
};

export const searchMultiService = async (
  user: MysqlUserType,
  searchRequest: SearchRequestType,
): Promise<ProfileBackType[]> => {
  let query: string = 'SELECT * FROM User WHERE id != ?';
  let values: any[] = [user.id];
  if (searchRequest.ageMin || searchRequest.ageMax) {
    if (searchRequest.ageMin && searchRequest.ageMax) {
      query += ' AND age BETWEEN ? AND ?';
      values.push(searchRequest.ageMin, searchRequest.ageMax);
    }
    if (!searchRequest.ageMin) {
      query += ' AND age <= ?';
      values.push(searchRequest.ageMax);
    }
    if (!searchRequest.ageMax) {
      query += ' AND age >= ?';
      values.push(searchRequest.ageMin);
    }
  }
  if (searchRequest.tallMin || searchRequest.tallMax) {
    if (searchRequest.tallMin && searchRequest.tallMax) {
      query += ' AND tall BETWEEN ? AND ?';
      values.push(searchRequest.tallMin, searchRequest.tallMax);
    }
    if (!searchRequest.tallMin) {
      query += ' AND tall <= ?';
      values.push(searchRequest.tallMax);
    }
    if (!searchRequest.tallMax) {
      query += ' AND tall >= ?';
      values.push(searchRequest.tallMin);
    }
  }
  if (searchRequest.fameRatingMin) {
    query += ' AND fameRating >= ?';
    values.push(searchRequest.fameRatingMin);
  }
  if (searchRequest.gender) {
    query += ' AND gender = ?';
    values.push(searchRequest.gender);
  }
  if (searchRequest.orientation) {
    query += ' AND orientation = ?';
    values.push(searchRequest.orientation);
  }
  if (searchRequest.withPhoto) {
    query += ' AND photo IS NOT NULL';
    values.push(searchRequest.withPhoto);
  }
  if (searchRequest.withBio) {
    query += ' AND biography IS NOT NULL';
    values.push(searchRequest.withBio);
  }
  query += `
    AND id NOT IN 
    (SELECT senderId FROM BanTable WHERE receiverId = ?)
    AND id NOT IN
    (SELECT receiverId FROM BanTable WHERE senderId = ?)
    ORDER BY
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
  `;
  values.push(user.id, user.id, user.town, user.county, user.region);
  try {
    const listing = await mysql.getListing(query, values);
    if (!listing) return [] as ProfileBackType[];
    return convertPublicProfileList(listing);
  } catch (error) {
    throw error;
  }
};
