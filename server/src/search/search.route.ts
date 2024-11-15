import { Router } from 'express';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import {
  findExistingUser,
  findTags,
  searchRequestValidation,
} from '../middleware/user.data.validation.js';
import { searchBodyValidation } from '../middleware/search.body.validation.js';
import {
  searchAdvance,
  searchLocation,
  searchTags,
  searchUsername,
} from './search.controller.js';

const searchRouter = Router();

searchRouter.get(
  '/search_username/:username',
  userTokenValidation,
  findExistingUser,
  searchUsername,
);

searchRouter.get(
  '/search_location',
  userTokenValidation,
  findExistingUser,
  searchLocation,
);

searchRouter.get(
  '/search_tags',
  userTokenValidation,
  findExistingUser,
  findTags,
  searchTags,
);

searchRouter.post(
  '/search_advance',
  searchBodyValidation,
  userTokenValidation,
  searchRequestValidation,
  findExistingUser,
  searchAdvance,
);

export default searchRouter;
