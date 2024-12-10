import { Router } from 'express';
import {
  findExistingUser,
  findPhotosPlus,
  findTags,
} from '../middleware/user.data.validation.js';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import {
  addTag,
  deleteAccount,
  deleteOnePhotoPlus,
  deletePhotoProfile,
  deleteTag,
  getMe,
  getNewToken,
  getProfile,
  getUserData,
  getUserPhotosPlus,
  getUserTags,
  updateBio,
  updateEmail,
  updateOnePhotoPlus,
  updatePassword,
  updatePhotoProfile,
  updateProfileData,
  updateUserData,
} from './user.controller.js';
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
  '/get_user_data',
  userTokenValidation,
  findExistingUser,
  getUserData,
);

userRoute.get(
  '/get_user_tags',
  userTokenValidation,
  findExistingUser,
  findTags,
  getUserTags,
);

userRoute.get(
  '/get_user_photos_plus',
  userTokenValidation,
  findExistingUser,
  findPhotosPlus,
  getUserPhotosPlus,
);

userRoute.post(
  '/update_user_data',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  updateUserData,
);

userRoute.post(
  '/update_password',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  updatePassword,
);

userRoute.post(
  '/update_email',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  updateEmail,
);

userRoute.post(
  '/update_bio',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  updateBio,
);

userRoute.get('/get_new_token/:id', getNewToken);

userRoute.post(
  '/add_tag',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  findTags,
  addTag,
);

userRoute.delete(
  '/delete_tag/:id',
  userTokenValidation,
  findExistingUser,
  deleteTag,
);

userRoute.post(
  '/update_profile_data',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  updateProfileData,
);

userRoute.post(
  '/update_photo_profile',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  updatePhotoProfile,
);

userRoute.post(
  '/update_one_photo_plus',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  findPhotosPlus,
  updateOnePhotoPlus,
);

userRoute.delete(
  '/delete_photo_profile',
  userTokenValidation,
  findExistingUser,
  deletePhotoProfile,
);

userRoute.delete(
  '/delete_one_photo_plus/:index',
  userTokenValidation,
  findExistingUser,
  deleteOnePhotoPlus,
);

userRoute.delete(
  '/delete_account',
  userTokenValidation,
  findExistingUser,
  deleteAccount,
);

userRoute.get(
  '/get_profile/:id',
  userTokenValidation,
  findExistingUser,
  getProfile,
);

export default userRoute;
