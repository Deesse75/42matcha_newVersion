import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import {
  searchLocationService,
  searchUsernameService,
  searchTagsService,
  searchMultiService,
} from './search.services.js';

export const searchUsername = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const listing = await searchUsernameService(
      req.body.existingUser,
      req.params.username,
    );
    res.status(200).json({ listing: listing });
    return;
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const searchLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const listing = await searchLocationService(
      req.body.existingUser,
      req.params.zone,
    );
    res.status(200).json({ listing: listing });
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
    const listing = await searchTagsService(
      req.body.existingUser,
      req.params.tag,
    );
    res.status(200).json({ listing: listing });
    return;
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const searchMulti = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const listing = await searchMultiService(
      req.body.existingUser,
      req.body.searchMulti,
    );
    res.status(200).json({ listing: listing });
    return;
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};
