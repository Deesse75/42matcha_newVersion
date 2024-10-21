import { Router } from 'express';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import { listingBodyValidation } from '../middleware/listing.body.validation.js';
import { findExistingUser } from '../middleware/user.data.validation.js';
import { ageFilter, fameFilter, getListing, locationFilter, tagsFilter } from './listing.controller.js';

const listingRoute = Router();

listingRoute.post(
  '/get_listing',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  getListing,
);

listingRoute.post(
  '/get_age_filter',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  ageFilter,
);

listingRoute.post(
  '/get_fame_filter',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  fameFilter,
);

listingRoute.post(
  '/get_location_filter',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  locationFilter,
);

listingRoute.post(
  '/get_tags_filter',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  tagsFilter,
);

export default listingRoute;
