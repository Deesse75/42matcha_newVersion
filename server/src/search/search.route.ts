import { Router } from 'express';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import { findExistingUser, findUserTags } from '../middleware/user.data.validation.js';
import { searchUsername, searchLocation, searchTags } from './search.controller.js';

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
  findUserTags,
  searchTags,
);

// searchRouter.patch(
//   '/search_multi',
//   userTokenValidation,
//   findExistingUser,
//   searchMulti,
// );

export default searchRouter;
