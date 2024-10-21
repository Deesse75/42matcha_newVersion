import { ListingUserType } from '../interfaces/listing.interfaces.js';
import {
  MysqlMiniUserType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import * as mysql from '../mysql/mysql.service.js';
import { convertListing } from '../utils/convertData.js';
import { matchaError } from '../utils/matcha_error.js';

export const getListingService = async (
  user: MysqlUserType,
  listingName: string,
): Promise<ListingUserType[] | null> => {
  let ret: { query: string; values: any };
  let listing: MysqlMiniUserType[] | null = null;
  try {
    if (listingName === 'matcha') ret = matchaRet(user);
    else if (listingName === 'match') ret = matchRet(user.id);
    else if (listingName === 'view') ret = viewRet(user.id);
    else if (listingName === 'like') ret = likeRet(user.id);
    else if (listingName === 'visited') ret = visitedRet(user.id);
    else if (listingName === 'liked') ret = likedRet(user.id);
    else if (listingName === 'banned') ret = bannedRet(user.id);
    else throw new matchaError(400, 'Requête invalide');
    listing = await mysql.getListing(ret.query, ret.values);
    if (!listing) return null;
    return addTags(listing);
  } catch (error) {
    throw error;
  }
};

const addTags = async (
  listing: MysqlMiniUserType[],
): Promise<ListingUserType[]> => {
  let newListing: ListingUserType[] = [];
  for (let i = 0; i < listing.length; i++) {
    const query = 'SELECT * FROM UserTags WHERE id = ?';
    const tags = await mysql.getUserTags(query, [listing[i].id]);
    newListing.push(convertListing(listing[i], tags));
  }
  return newListing;
};

const matchaRet = (user: MysqlUserType): { query: string; values: any } => {
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

const matchRet = (id: number): { query: string; values: any } => {
  const query = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection FROM User 
    WHERE id != ?
    AND id IN 
    (SELECT senderId FROM LikeTable WHERE receiverId = ? 
    AND senderId IN 
    (SELECT receiverId FROM LikeTable WHERE senderId = ?));
  `;
  const values = [id, id, id];
  return { query, values };
};

const viewRet = (id: number): { query: string; values: any } => {
  const query = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection FROM User 
    WHERE id != ?
    AND id IN 
    (SELECT senderId FROM ViewHistory WHERE receiverId = ?);
  `;
  const values = [id, id];
  return { query, values };
};

const likeRet = (id: number): { query: string; values: any } => {
  const query = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection FROM User 
    WHERE id != ?
    AND id IN 
    (SELECT senderId FROM LikeHistory WHERE receiverId = ?);
  `;
  const values = [id, id];
  return { query, values };
};

const visitedRet = (id: number): { query: string; values: any } => {
  const query = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection FROM User 
    WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM ViewHistory WHERE senderId = ?);
  `;
  const values = [id, id];
  return { query, values };
};

const likedRet = (id: number): { query: string; values: any } => {
  const query = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection FROM User 
    WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM LikeHistory WHERE senderId = ?);
  `;
  const values = [id, id];
  return { query, values };
};

const bannedRet = (id: number): { query: string; values: any } => {
  const query = `
    SELECT id, username, age, gender, orientation, region, county, town, fameRating, photo1, lastConnection FROM User 
    WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM BanHistory WHERE senderId = ?)
    AND id NOT IN 
    (SELECT senderId FROM BanHistory WHERE receiverId = ?);
  `;
  const values = [id, id, id];
  return { query, values };
};

export const listingAgeFilter = async (
  user: MysqlUserType,
  listingName: string,
  ageMin: number,
  ageMax: number,
): Promise<ListingUserType[] | null> => {
  let ret: { query: string; values: any };
  let listing: MysqlMiniUserType[] | null = null;
  try {
    if (listingName === 'matcha') ret = matchaRet(user);
    else if (listingName === 'match') ret = matchRet(user.id);
    else if (listingName === 'view') ret = viewRet(user.id);
    else if (listingName === 'like') ret = likeRet(user.id);
    else if (listingName === 'visited') ret = visitedRet(user.id);
    else if (listingName === 'liked') ret = likedRet(user.id);
    else throw new matchaError(400, 'Requête invalide');
    ret.query += ` AND (age BETWEEN ? AND ?) `;
    ret.values.push(ageMin, ageMax);
    listing = await mysql.getListing(ret.query, ret.values);
    if (!listing) return null;
    return addTags(listing);
  } catch (error) {
    throw error;
  }
};

export const listingFameFilter = async (
  user: MysqlUserType,
  listingName: string,
  fameMin: number,
): Promise<ListingUserType[] | null> => {
  let ret: { query: string; values: any };
  let listing: MysqlMiniUserType[] | null = null;
  try {
    if (listingName === 'matcha') ret = matchaRet(user);
    else if (listingName === 'match') ret = matchRet(user.id);
    else if (listingName === 'view') ret = viewRet(user.id);
    else if (listingName === 'like') ret = likeRet(user.id);
    else if (listingName === 'visited') ret = visitedRet(user.id);
    else if (listingName === 'liked') ret = likedRet(user.id);
    else throw new matchaError(400, 'Requête invalide');
    ret.query += ` AND fameRating >= ? `;
    ret.values.push(fameMin);
    listing = await mysql.getListing(ret.query, ret.values);
    if (!listing) return null;
    return addTags(listing);
  } catch (error) {
    throw error;
  }
};

export const listingLocationFilter = async (
  user: MysqlUserType,
  listingName: string,
  zone: string,
): Promise<ListingUserType[] | null> => {
  let ret: { query: string; values: any };
  let listing: MysqlMiniUserType[] | null = null;
  try {
    if (listingName === 'matcha') ret = matchaRet(user);
    else if (listingName === 'match') ret = matchRet(user.id);
    else if (listingName === 'view') ret = viewRet(user.id);
    else if (listingName === 'like') ret = likeRet(user.id);
    else if (listingName === 'visited') ret = visitedRet(user.id);
    else if (listingName === 'liked') ret = likedRet(user.id);
    else throw new matchaError(400, 'Requête invalide');
    if (zone === 'region') {
      ret.query += ` AND region = ? `;
      ret.values.push(user.region);
    } else if (zone === 'county') {
      ret.query += ` AND county = ? `;
      ret.values.push(user.county);
    } else if (zone === 'town') {
      ret.query += ` AND town = ? `;
      ret.values.push(user.town);
    } else throw new matchaError(400, 'Requête invalide');
    listing = await mysql.getListing(ret.query, ret.values);
    if (!listing) return null;
    return addTags(listing);
  } catch (error) {
    throw error;
  }
};

export const listingTagsFilter = async (
  user: MysqlUserType,
  listingName: string,
  tag: string[],
): Promise<ListingUserType[] | null> => {
  let ret: { query: string; values: any };
  let listing: MysqlMiniUserType[] | null = null;
  try {
    if (listingName === 'matcha') ret = matchaRet(user);
    else if (listingName === 'match') ret = matchRet(user.id);
    else if (listingName === 'view') ret = viewRet(user.id);
    else if (listingName === 'like') ret = likeRet(user.id);
    else if (listingName === 'visited') ret = visitedRet(user.id);
    else if (listingName === 'liked') ret = likedRet(user.id);
    else throw new matchaError(400, 'Requête invalide');

    listing = await mysql.getListing(ret.query, ret.values);
    if (!listing) return null;
    return addTags(listing);
  } catch (error) {
    throw error;
  }
};

// SELECT *
// FROM User
// WHERE
//   -- 1. Filtrer par fourchette d'âge
//   (age BETWEEN :ageMin AND :ageMax)

//   -- 2. Filtrer par genre et orientation
//   AND (
//     (:currentGender = 'female' AND :currentOrientation = 'hetero' AND gender = 'male' AND orientation IN ('hetero', 'bi'))
//     OR (:currentGender = 'female' AND :currentOrientation = 'homo' AND gender = 'female' AND orientation IN ('homo', 'bi'))
//     OR (:currentGender = 'male' AND :currentOrientation = 'hetero' AND gender = 'female' AND orientation IN ('hetero', 'bi'))
//     OR (:currentGender = 'male' AND :currentOrientation = 'homo' AND gender = 'male' AND orientation IN ('homo', 'bi'))
//     -- Ajoutez d'autres cas si nécessaires, comme pour les personnes non-binaires
//   )

//   -- 3. Trier d'abord par ville, puis par département, puis par région
// ORDER BY
//   CASE WHEN town = :searchedTown THEN 1 ELSE 0 END DESC,
//   CASE WHEN county = :searchedCounty THEN 1 ELSE 0 END DESC,
//   CASE WHEN region = :searchedRegion THEN 1 ELSE 0 END DESC,
//   fameRating DESC, -- Trier aussi par popularité (optionnel)
//   lastConnection DESC; -- Trier par dernière connexion (optionnel)
