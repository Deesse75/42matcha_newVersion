import { ListingRequestType } from '../interfaces/listing.interface.js';
import { MysqlUserType } from '../interfaces/mysql_out.interfaces.js';
import { ProfileBackType } from '../interfaces/user.interface.js';
import * as mysql from '../mysql/mysql.service.js';
import { convertPublicProfileList } from '../utils/convertData.js';
import { matchaError } from '../utils/matcha_error.js';

export const getListingService = async (
  listingRequest: ListingRequestType,
): Promise<ProfileBackType[] | null> => {
  try {
    const listing = await mysql.getListing(
      listingRequest.query,
      listingRequest.values,
    );
    if (!listing) return null;
    return convertPublicProfileList(listing);
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
