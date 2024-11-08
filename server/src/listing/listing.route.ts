import { Router } from 'express';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import { listingBodyValidation } from '../middleware/listing.body.validation.js';
import { findExistingUser } from '../middleware/user.data.validation.js';
import {
  ageFilter,
  fameFilter,
  getListing,
  locationFilter,
  tagsFilter,
} from './listing.controller.js';

const listingRouter = Router();

listingRouter.post(
  '/get_listing',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  getListing,
);

listingRouter.post(
  '/get_age_filter',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  ageFilter,
);

listingRouter.post(
  '/get_fame_filter',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  fameFilter,
);

listingRouter.post(
  '/get_location_filter',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  locationFilter,
);

listingRouter.post(
  '/get_tags_filter',
  listingBodyValidation,
  userTokenValidation,
  findExistingUser,
  tagsFilter,
);

export default listingRouter;
