import { Router } from 'express';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import {
  findExistingUser,
  findTags,
} from '../middleware/user.data.validation.js';
import { searchBodyValidation } from '../middleware/search.body.validation.js';
import {
  searchLocation,
  searchTags,
  searchUsername,
} from './search.controller.js';

const searchRoute = Router();

searchRoute.get(
  '/search_username/:username',
  userTokenValidation,
  findExistingUser,
  searchUsername,
);

searchRoute.get(
  '/search_location',
  userTokenValidation,
  findExistingUser,
  searchLocation,
);

searchRoute.get(
  '/search_tags',
  userTokenValidation,
  findExistingUser,
  findTags,
  searchTags,
);

// searchRoute.post(
//   '/search_advance',
//   searchBodyValidation,
//   userTokenValidation,
//   searchRequestValidation,
//   findExistingUser,
//   searchAdvance,
// );

export default searchRoute;
