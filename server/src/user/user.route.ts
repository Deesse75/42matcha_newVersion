import { Router } from 'express';
import { tokenValidation } from './validation/token.validation.js';
import { findExistingUser } from './validation/user.validation.js';

const userRoute = Router();

userRoute.get(
  'get_me',
  tokenValidation,
  findExistingUser,
  findTags,
  findLookFor,
  getMe,
);



//findReceiver
export default userRoute;
