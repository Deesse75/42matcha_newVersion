import { MysqlUserType } from '../interfaces/mysql_out.interfaces.js';

export const matchaRet = (
  user: MysqlUserType,
): { query: string; values: any[] } => {
  let values: any = [];
  let query: string = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
    FROM User 
    WHERE id != ?`;
  values.push(user.id);

  const ageMin: number = user.ageMin ? user.ageMin : 18;
  const ageMax: number = user.ageMax ? user.ageMax : 120;
  query += ` AND (age BETWEEN ? AND ?) `;
  values.push(ageMin, ageMax);

  const gender: string | null = user.gender ? user.gender : null;
  const orientation: string | null = user.orientation ? user.orientation : null;
  const genderLookFor: string | null = user.genderLookFor
    ? user.genderLookFor
    : null;

  return { query, values };
};

export const matchRet = (
  user: MysqlUserType,
): { query: string; values: any[] } => {
  const query = `
  SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
  FROM User 
  WHERE id != ?
  AND id IN 
  (SELECT senderId FROM LikeTable WHERE receiverId = ? 
  AND senderId IN 
  (SELECT receiverId FROM LikeTable WHERE senderId = ?))
  ORDER BY 
  CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
  CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
  CASE WHEN region = ? THEN 1 ELSE 0 END DESC
  `;
  const values = [
    user.id,
    user.id,
    user.id,
    user.town,
    user.county,
    user.region,
  ];
  return { query, values };
};

export const viewRet = (
  user: MysqlUserType,
): { query: string; values: any[] } => {
  const query = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
    FROM User 
    WHERE id != ?
    AND id IN 
    (SELECT senderId FROM ViewTable WHERE receiverId = ?)
    ORDER BY 
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
  `;
  const values = [user.id, user.id, user.town, user.county, user.region];
  return { query, values };
};

export const likeRet = (
  user: MysqlUserType,
): { query: string; values: any[] } => {
  const query = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
    FROM User 
    WHERE id != ?
    AND id IN 
    (SELECT senderId FROM LikeTable WHERE receiverId = ?)
    ORDER BY 
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
  `;
  const values = [user.id, user.id, user.town, user.county, user.region];
  return { query, values };
};

export const visitedRet = (
  user: MysqlUserType,
): { query: string; values: any[] } => {
  const query = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
    FROM User 
    WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM ViewTable WHERE senderId = ?)
    ORDER BY 
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
  `;
  const values = [user.id, user.id, user.town, user.county, user.region];
  return { query, values };
};

export const likedRet = (
  user: MysqlUserType,
): { query: string; values: any[] } => {
  const query = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
    FROM User 
    WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM LikeTable WHERE senderId = ?)
    ORDER BY 
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
  `;
  const values = [user.id, user.id, user.town, user.county, user.region];
  return { query, values };
};

export const bannedRet = (
  user: MysqlUserType,
): { query: string; values: any[] } => {
  const query = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection 
    FROM User 
    WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM BanTable WHERE senderId = ?)
    AND id NOT IN 
    (SELECT senderId FROM BanTable WHERE receiverId = ?)
    ORDER BY 
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC,
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
  `;
  const values = [
    user.id,
    user.id,
    user.id,
    user.town,
    user.county,
    user.region,
  ];
  return { query, values };
};
