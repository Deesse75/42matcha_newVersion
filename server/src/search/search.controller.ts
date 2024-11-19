import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import {
  searchLocationService,
  searchUsernameService,
  searchTagsService,
} from './search.services.js';
import { exist } from 'joi';

export const searchLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const searchResult = await searchLocationService(req.body.existingUser);
    res.status(200).json({ searchResult: searchResult });
    return;
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const searchUsername = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const searchResult = await searchUsernameService(
      req.body.existingUser,
      req.params.username,
    );
    res.status(200).json({ searchResult: searchResult });
    return;
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const searchTags = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const searchResult = await searchTagsService(
      req.body.tags,
      req.body.existingUser,
    );
    res.status(200).json({ searchResult: searchResult });
    return;
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

// export const searchAdvance = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const searchResult = await searchAdvanceService(
//       req.body.existingUser,
//       req.body.searchRequest,
//     );
//     res.status(200).json({ searchResult: searchResult });
//     return;
//   } catch (error) {
//     matchaError.catched(error as Error, res);
//   }
// };

// export const searchMulti = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const searchResult = await searchMultiService(
//       req.body.existingUser.id,
//       req.body?.ageMin || null,
//       req.body?.ageMax || null,
//       req.body?.gender || null,
//       req.body?.orientation || null,
//       req.body?.region || null,
//       req.body?.tallMin || null,
//       req.body?.tallMax || null,
//       req.body?.withPhoto || null,
//       req.body?.withBio || null,
//       req.body?.connected || null,
//     );
//     res.status(200).json({ searchResult: searchResult });
//     return;
//   } catch (error) {
//     matchaError.catched(error as Error, res);
//   }
// };
