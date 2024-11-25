import { Router } from 'express';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import { listingBodyValidation } from '../middleware/listing.body.validation.js';
import { findExistingUser, findLastSearch, findTags } from '../middleware/user.data.validation.js';
import {
  getListing,
} from './listing.controller.js';
import { selectListingName } from '../middleware/listingName.validation.js';

const listingRoute = Router();

listingRoute.get(
  '/get_listing/:listingName',
  userTokenValidation,
  findExistingUser,
  findTags,
  findLastSearch,
  selectListingName,
  getListing,
);

listingRoute.post(
  '/get_age_filter/:listingName',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  findTags,
  findLastSearch,
  selectListingName,
  getListing,
);

listingRoute.post(
  '/get_fame_filter/:listingName',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  findTags,
  findLastSearch,
  selectListingName,
  getListing,
);

listingRoute.post(
  '/get_location_filter/:listingName',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  findTags,
  findLastSearch,
  selectListingName,
  getListing,
);

listingRoute.post(
  '/get_tags_filter/:listingName',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  findTags,
  findLastSearch,
  selectListingName,
  getListing,
);

export default listingRoute;
