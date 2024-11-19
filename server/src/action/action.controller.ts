import { Request, Response } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import { actionBanService, actionLikeService, actionViewService, deleteLikeService } from './action.services.js';

export const getInteractions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.status(200).json({ interactions: req.body.interaction });
  return;
};

export const actionLike = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await actionLikeService(
      req.body.existingUser,
      req.body.interaction,
      req.body.params.id,
    );
    res.status(200).json({ message: 'like' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const deleteLike = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await deleteLikeService(
      req.body.existingUser,
      req.body.interaction,
      req.body.params.id,
    );
    res.status(200).json({ message: 'dislike' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const actionView = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await actionViewService(
      req.body.existingUser,
      req.body.interaction,
      req.body.params.id,
    );
    res.status(200).json({ message: 'view' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const actionBan = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await actionBanService(
      req.body.existingUser,
      req.body.params.id,
    );
    res.status(200).json({ message: 'ban' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

