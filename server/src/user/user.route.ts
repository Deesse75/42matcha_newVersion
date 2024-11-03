import { Router } from 'express';
import {
  findExistingUser,
  findUserTags,
} from '../middleware/user.data.validation.js';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import { getMe } from './user.controller.js';
import { userBodyValidation } from '../middleware/user.body.validation.js';

const userRoute = Router();

userRoute.post(
  '/get_me',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  findUserTags,
  getMe,
);

export default userRoute;
