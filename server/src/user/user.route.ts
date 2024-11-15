import { Router } from 'express';
import {
  findExistingUser,
  findTags,
} from '../middleware/user.data.validation.js';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import { getMe } from './user.controller.js';
import { userBodyValidation } from '../middleware/user.body.validation.js';

const userRoute = Router();

userRoute.get(
  '/get_me',
  userTokenValidation,
  findExistingUser,
  findTags,
  getMe,
);

userRoute.get(
  '/get_account_data',
  userTokenValidation,
  findExistingUser,
  getAccountData,
);

userRoute.post(
  '/update_name',
  userTokenValidation,
  userBodyValidation,
  findExistingUser,
  updateName,
);

userRoute.post(
  '/update_valide_email',
  userTokenValidation,
  userBodyValidation,
  findExistingUser,
  updateValideEmail,
);

userRoute.post(
  '/send_email_new_password',
  userTokenValidation,
  findExistingUser,
  sendEmailNewPassword,
);

userRoute.post(
  '/update_password',
  userTokenValidation,
  userBodyValidation,
  findExistingUser,
  updatePassword,
);

userRoute.post(
  '/update_email',
  userTokenValidation,
  userBodyValidation,
  findExistingUser,
  updateEmail,
);

userRoute.post(
  '/update_birthdate',
  userTokenValidation,
  userBodyValidation,
  findExistingUser,
  updateBirthdate,
);

userRoute.post(
  '/update_photo',
  userTokenValidation,
  userBodyValidation,
  findExistingUser,
  updatePhoto,
);

userRoute.delete(
  '/delete_photo',
  userTokenValidation,
  userBodyValidation,
  findExistingUser,
  deletePhoto,
);

userRoute.delete(
  '/delete_account',
  userTokenValidation,
  userBodyValidation,
  findExistingUser,
  deleteAccount,
);

export default userRoute;

