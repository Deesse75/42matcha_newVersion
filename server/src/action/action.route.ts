import { Router } from 'express';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import { findExistingUser } from '../middleware/user.data.validation.js';
import {
  actionBan,
  actionLike,
  actionView,
  deleteLike,
  getInteractions,
} from './action.controller.js';
import { alreadyViewed } from '../middleware/action.data.validation.js';

const actionRoute = Router();

actionRoute.get(
  '/action_view/:id',
  userTokenValidation,
  findExistingUser,
  alreadyViewed,
  actionView,
);

actionRoute.get(
  '/get_interactions/:id',
  userTokenValidation,
  findExistingUser,
  getInteractions,
);

actionRoute.post(
  '/action_like/:id',
  userTokenValidation,
  findExistingUser,
  actionLike,
);

actionRoute.post(
  '/action_ban/:id',
  userTokenValidation,
  findExistingUser,
  actionBan,
);

actionRoute.post(
  '/delete_like/:id',
  userTokenValidation,
  findExistingUser,
  deleteLike,
);

export default actionRoute;
