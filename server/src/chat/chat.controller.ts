// import { Request, Response, NextFunction } from 'express';
// import { matchaError } from '../utils/matcha_error.js';
// import {
//   getChatStatService,
//   getUnseenMessageService,
// } from './chat.services.js';

// export const getChatStat = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const stat = await getChatStatService(req.body.statChat);
//     if (!stat) res.status(200).json({ nbMess: 0, lastMess: '' });
//     else
//       res.status(200).json({
//         nbMess: stat.nbMess,
//         lastMess: stat.lastMess,
//       });
//     return;
//   } catch (error) {
//     matchaError.catched(error as Error, res);
//   }
// };

// export const getUnseenMessage = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const unseenList = await getUnseenMessageService(req.body.existingUser);
//     res.status(200).json({ unseenList: unseenList });
//     return;
//   } catch (error) {
//     matchaError.catched(error as Error, res);
//   }
// };
