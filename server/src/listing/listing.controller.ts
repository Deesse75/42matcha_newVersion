import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import {
  getListingService,
  listingAgeFilter,
  listingFameFilter,
  listingLocationFilter,
  listingTagsFilter,
} from './listing.services.js';

export const getListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const listing = await getListingService(
      req.body.existingUser,
      req.body.listingName,
    );
    res.status(200).json({ listing: listing });
    return;
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const ageFilter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const listing = await listingAgeFilter(
      req.body.existingUser,
      req.body.listingName,
      req.body.ageMin,
      req.body.ageMax,
    );
    res.status(200).json({ listing: listing });
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const fameFilter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const listing = await listingFameFilter(
      req.body.existingUser,
      req.body.listingName,
      req.body.fameMin,
    );
    res.status(200).json({ listing: listing });
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const locationFilter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const listing = await listingLocationFilter(
      req.body.existingUser,
      req.body.listingName,
      req.body.zone,
    );
    res.status(200).json({ listing: listing });
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const tagsFilter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const listing = await listingTagsFilter(
      req.body.existingUser,
      req.body.listingName,
      req.body.tags,
    );
    res.status(200).json({ listing: listing });
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};
