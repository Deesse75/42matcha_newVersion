import { Request, Response } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import {
  getListingService,
} from './listing.services.js';

export const getListing = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const listing = await getListingService(
      req.body.listingRequest,
    );
    res.status(200).json({ listing: listing });
    return;
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

