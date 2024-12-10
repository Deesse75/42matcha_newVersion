import { Request, Response, NextFunction } from 'express';
import * as mysql from '../mysql/mysql.service.js';
import { matchaError } from '../utils/matcha_error.js';
import { match } from 'assert';

// export const findActionBetween = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   let query: string = '';
//   try {
//     query = 'SELECT * FROM BanTable WHERE senderId = ? AND receiverId = ?';
//     const actionBanned = await mysql.getActionBetween(query, [
//       req.body.existingUser.id,
//       parseInt(req.params.id),
//     ]);
//     if (actionBanned) {
//       res.status(403).json({ message: 'Vous avez bloqué ce profil.' });
//       return;
//     }
//     query = 'SELECT * FROM BanTable WHERE receiverId = ? AND senderId = ?';
//     const actionBan = await mysql.getActionBetween(query, [
//       req.body.existingUser.id,
//       parseInt(req.params.id),
//     ]);
//     if (actionBan) {
//       res.status(403).json({ message: 'Profil indisponible.' });
//       return;
//     }
//     query = 'SELECT * FROM LikeTable WHERE senderId = ? AND receiverId = ?';
//     const actionLike = await mysql.getActionBetween(query, [
//       req.body.existingUser.id,
//       parseInt(req.params.id),
//     ]);
//     query = 'SELECT * FROM LikeTable WHERE receiverId = ? AND senderId = ?';
//     const actionLiked = await mysql.getActionBetween(query, [
//       req.body.existingUser.id,
//       parseInt(req.params.id),
//     ]);
//     if (actionLike && actionLiked) req.body.interaction = 'match';
//     if (actionLike) req.body.interaction = 'like';
//     query = 'SELECT * FROM ViewTable WHERE receiverId = ? AND senderId = ?';
//     const actionView = await mysql.getActionBetween(query, [
//       req.body.existingUser.id,
//       parseInt(req.params.id),
//     ]);
//     if (actionView) req.body.interaction = 'view';
//     req.body.interaction = 'none';
//     return next();
//   } catch (error) {
//     matchaError.catched(error as Error, res);
//   }
// };

export const alreadyViewed = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const receiverId: number = parseInt(req.params.id);
  const query: string =
    'SELECT * FROM ViewTable WHERE senderId = ? AND receiverId = ?';
  const values: any[] = [req.body.existingUser.id, receiverId];
  try {
    const action = await mysql.getAction(query, values);
    if (action) {
      res.status(200).json({ message: 'view.' });
      return;
    }
    return next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};
