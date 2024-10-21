import { Router } from 'express';
import {
  findExistingUser,
  findUserTags,
} from '../middleware/user.data.validation.js';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import { getMe } from './user.controller.js';

const userRoute = Router();

userRoute.get(
  '/get_me',
  userTokenValidation,
  findExistingUser,
  findUserTags,
  getMe,
);

//findReceiver
export default userRoute;
