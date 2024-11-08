import { Router } from 'express';
import { userTokenValidation } from '../middleware/userToken.validation.js';
import {
  findChatStatUser,
  findExistingUser,
} from '../middleware/user.data.validation.js';
import { getChatStat, getUnseenMessage } from './chat.controller.js';

const chatRouter = Router();

chatRouter.get(
  '/get_chat_stat',
  userTokenValidation,
  findExistingUser,
  findChatStatUser,
  getChatStat,
);

chatRouter.get(
  '/get_unseen_message',
  userTokenValidation,
  findExistingUser,
  getUnseenMessage,
);

export default chatRouter;
