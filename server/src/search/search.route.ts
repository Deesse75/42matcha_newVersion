import { Router } from 'express';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import { findExistingUser } from '../middleware/user.data.validation.js';
import {
  searchLocation,
  searchMulti,
  searchTags,
  searchUsername,
} from './search.controller.js';
import { searchBodyValidation } from '../middleware/search.body.validation.js';
import {
  searchRequestValidation,
  setLastSearch,
} from '../middleware/search.data.validation.js';

const searchRoute = Router();

searchRoute.get(
  '/search_username/:username',
  userTokenValidation,
  findExistingUser,
  searchUsername,
);

searchRoute.get(
  '/search_location/:zone',
  userTokenValidation,
  findExistingUser,
  searchLocation,
);

searchRoute.get(
  '/search_tag/:tag',
  userTokenValidation,
  findExistingUser,
  searchTags,
);

searchRoute.post(
  '/search_multi',
  searchBodyValidation,
  userTokenValidation,
  findExistingUser,
  searchRequestValidation,
  setLastSearch,
  searchMulti,
);

export default searchRoute;
