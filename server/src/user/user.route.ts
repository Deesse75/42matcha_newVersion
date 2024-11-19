import { Router } from 'express';
import {
  findExistingUser,
  findLookFor,
  findPhotosPlus,
  findTags,
} from '../middleware/user.data.validation.js';
import { urlTokenValidation, userTokenValidation } from '../middleware/userToken.validation.js';
import { addTag, deleteAccount, deletePhotoProfile, deleteTag, getMe, getNewToken, getUserData, getUserLookFor, getUserPhotosPlus, getUserTags, updateEmail, updateLookFor, updatePassword, updatePhotoPlus, updatePhotoProfile, updateProfileData, updateUserData, validateUpdateEmail } from './user.controller.js';
import { userBodyValidation } from '../middleware/user.body.validation.js';

const userRoute = Router();

userRoute.get(
  '/get_me',
  userTokenValidation,
  findExistingUser,
  findTags,
  findLookFor,
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
  '/get_user_look_for',
  userTokenValidation,
  findExistingUser,
  findLookFor,
  getUserLookFor,
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

userRoute.post('/update_password',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  updatePassword,
);

userRoute.post('/update_email',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  updateEmail,
);

userRoute.post('/validate_link_new_email',
  userBodyValidation,
  urlTokenValidation,
  findExistingUser,
  validateUpdateEmail,
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
  '/update_look_for',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  findLookFor,
  updateLookFor,
);

userRoute.post(
  '/update_photo_profile',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  updatePhotoProfile,
);

userRoute.post(
  '/update_photo_plus',
  userBodyValidation,
  userTokenValidation,
  findExistingUser,
  updatePhotoPlus,
);

userRoute.delete(
  '/delete_photo_profile',
  userTokenValidation,
  findExistingUser,
  deletePhotoProfile,
);

userRoute.delete(
  '/delete_account',
  userTokenValidation,
  findExistingUser,
  deleteAccount,
);

export default userRoute;
