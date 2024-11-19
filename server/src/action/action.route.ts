import { Router } from 'express';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import { findExistingUser } from '../middleware/user.data.validation.js';
import { actionBan, actionLike, actionView, deleteLike, getInteractions } from './action.controller.js';
import { findActionBetween } from '../middleware/action.data.validation.js';

const actionRoute = Router();

actionRoute.get(
  '/get_interactions/:id',
  userTokenValidation,
  findExistingUser,
  findActionBetween,
  getInteractions,
);

actionRoute.post(
  '/action_like/:id',
  userTokenValidation,
  findExistingUser,
  findActionBetween,
  actionLike,
);

actionRoute.post(
  '/action_view/:id',
  userTokenValidation,
  findExistingUser,
  findActionBetween,
  actionView,
);

actionRoute.post(
  '/action_ban/:id',
  userTokenValidation,
  findExistingUser,
  findActionBetween,
  actionBan,
);

actionRoute.post(
  '/delete_like/:id',
  userTokenValidation,
  findExistingUser,
  deleteLike,
);

export default actionRoute;
