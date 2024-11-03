import {
  MysqlMiniUserType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import { MiniUserType } from '../interfaces/user.interface.js';
import * as mysql from '../mysql/mysql.service.js';
import { convertListingMiniUser } from '../utils/convertData.js';
import { matchaError } from '../utils/matcha_error.js';
import { matchaRet, matchRet, viewRet, likeRet, visitedRet, likedRet, bannedRet } from './listing.utils.js';

export const getListingService = async (
  user: MysqlUserType,
  listingName: string,
): Promise<MiniUserType[] | null> => {
  let ret: { query: string; values: any };
  let listing: MysqlMiniUserType[] | null = null;
  try {
    if (listingName === 'matcha') ret = matchaRet(user);
    else if (listingName === 'match') ret = matchRet(user);
    else if (listingName === 'view') ret = viewRet(user);
    else if (listingName === 'like') ret = likeRet(user);
    else if (listingName === 'visited') ret = visitedRet(user);
    else if (listingName === 'liked') ret = likedRet(user);
    else if (listingName === 'banned') ret = bannedRet(user);
    else throw new matchaError(400, 'Requête invalide');
    listing = await mysql.getListing(ret.query, ret.values);
    if (!listing) return null;
    return convertListingMiniUser(listing);
  } catch (error) {
    throw error;
  }
};

export const listingAgeFilter = async (
  user: MysqlUserType,
  listingName: string,
  ageMin: number,
  ageMax: number,
): Promise<MiniUserType[] | null> => {
  let ret: { query: string; values: any };
  let listing: MysqlMiniUserType[] | null = null;
  try {
    if (listingName === 'matcha') ret = matchaRet(user);
    else if (listingName === 'match') ret = matchRet(user);
    else if (listingName === 'view') ret = viewRet(user);
    else if (listingName === 'like') ret = likeRet(user);
    else if (listingName === 'visited') ret = visitedRet(user);
    else if (listingName === 'liked') ret = likedRet(user);
    else throw new matchaError(400, 'Requête invalide');
    ret.query += ` AND (age BETWEEN ? AND ?) `;
    ret.values.push(ageMin, ageMax);
    listing = await mysql.getListing(ret.query, ret.values);
    if (!listing) return null;
    return convertListingMiniUser(listing);
  } catch (error) {
    throw error;
  }
};

export const listingFameFilter = async (
  user: MysqlUserType,
  listingName: string,
  fameMin: number,
): Promise<MiniUserType[] | null> => {
  let ret: { query: string; values: any };
  let listing: MysqlMiniUserType[] | null = null;
  try {
    if (listingName === 'matcha') ret = matchaRet(user);
    else if (listingName === 'match') ret = matchRet(user);
    else if (listingName === 'view') ret = viewRet(user);
    else if (listingName === 'like') ret = likeRet(user);
    else if (listingName === 'visited') ret = visitedRet(user);
    else if (listingName === 'liked') ret = likedRet(user);
    else throw new matchaError(400, 'Requête invalide');
    ret.query += ` AND fameRating >= ? `;
    ret.values.push(fameMin);
    listing = await mysql.getListing(ret.query, ret.values);
    if (!listing) return null;
    return convertListingMiniUser(listing);
  } catch (error) {
    throw error;
  }
};

export const listingLocationFilter = async (
  user: MysqlUserType,
  listingName: string,
  zone: string,
): Promise<MiniUserType[] | null> => {
  let ret: { query: string; values: any };
  let listing: MysqlMiniUserType[] | null = null;
  try {
    if (listingName === 'matcha') ret = matchaRet(user);
    else if (listingName === 'match') ret = matchRet(user);
    else if (listingName === 'view') ret = viewRet(user);
    else if (listingName === 'like') ret = likeRet(user);
    else if (listingName === 'visited') ret = visitedRet(user);
    else if (listingName === 'liked') ret = likedRet(user);
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
    return convertListingMiniUser(listing);
  } catch (error) {
    throw error;
  }
};

export const listingTagsFilter = async (
  user: MysqlUserType,
  listingName: string,
  tag: string[],
): Promise<MiniUserType[] | null> => {
  let ret: { query: string; values: any };
  let listing: MysqlMiniUserType[] | null = null;
  try {
    if (listingName === 'matcha') ret = matchaRet(user);
    else if (listingName === 'match') ret = matchRet(user);
    else if (listingName === 'view') ret = viewRet(user);
    else if (listingName === 'like') ret = likeRet(user);
    else if (listingName === 'visited') ret = visitedRet(user);
    else if (listingName === 'liked') ret = likedRet(user);
    else throw new matchaError(400, 'Requête invalide');

    listing = await mysql.getListing(ret.query, ret.values);
    if (!listing) return null;
    return convertListingMiniUser(listing);
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
