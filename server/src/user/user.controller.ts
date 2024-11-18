import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import * as mysql from '../mysql/mysql.service.js';
import {
  addTagService,
  deleteAccountService,
  deletePhotoProfileService,
  deleteTagService,
  getMeService,
  getNewTokenService,
  getUserDataService,
  getUserPhotosPlusService,
  updateEmailService,
  updateLookForService,
  updatePasswordService,
  updatePhotoProfileService,
  updateProfileDataService,
  updateUserDataService,
  validateUpdateEmailService,
} from './user.service.js';

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const me = await getMeService(
      req.body.existingUser,
      req.body.tags,
      req.body.lookFor,
    );
    res.status(200).json({
      user: me.user,
      userTags: me.userTags,
      userLookFor: me.userLookFor,
    });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const getUserData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await getUserDataService(req.body.existingUser);
    res.status(200).json({
      user: user,
    });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const getUserTags = (req: Request, res: Response): void => {
  res.status(200).json({
    userTags: req.body.userTags ? req.body.userTags : null,
  });
  return;
};

export const getUserLookFor = (req: Request, res: Response): void => {
  res.status(200).json({
    userLookFor: req.body.userLookFor ? req.body.userLookFor : null,
  });
  return;
};

export const getUserPhotosPlus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userPhotos = await getUserPhotosPlusService(
      req.body.existingUser,
      req.body.userPhotosPlus,
    );
    res.status(200).json({
      userPhotosPlus: userPhotos,
    });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const updateUserData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const updateUser = {
      firstname: req.body?.firstname ?? null,
      lastname: req.body?.lastname ?? null,
      username: req.body?.username ?? null,
      birthdate: req.body?.birthdate ?? null,
    };
    await updateUserDataService(req.body.existingUser, updateUser);
    res.status(200).json({ message: 'Le profil a été mis à jour.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await updatePasswordService(
      req.body.existingUser,
      req.body.activePassword,
      req.body.newPassword,
    );
    res.status(200).json({ message: 'Le mot de passe a été mis à jour.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const updateEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await updateEmailService(
      req.body.existingUser,
      req.body.currentPassword,
      req.body.newEmail,
    );
    res.status(200).json({ message: 'Un lien vous a été envoyé par email.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const validateUpdateEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await validateUpdateEmailService(
      req.body.existingUser,
      req.body.code,
      req.body.email,
    );
    res.status(200).json({
      message: 'Votre adresse email a été modifiée.',
    });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const getNewToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = await getNewTokenService(req.body.params.id);
    res.status(200).json({ token: token });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const addTag = async (req: Request, res: Response): Promise<void> => {
  try {
    await addTagService(
      req.body.existingUser,
      req.body.userTags,
      req.body.newTag,
    );
    res
      .status(200)
      .json({ message: "Les centres d'intérêt ont été mis à jour." });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const deleteTag = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteTagService(req.body.existingUser, req.body.params.id);
    res.status(200).json({ message: 'Le profil a été mis à jour.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const updateLookFor = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const lookFor = {
      ageMin: req.body?.ageMin ?? null,
      ageMax: req.body?.ageMax ?? null,
      tallMin: req.body?.tallMin ?? null,
      tallMax: req.body?.tallMax ?? null,
      gender: req.body?.gender ?? null,
      withPhoto: req.body.withPhoto,
    };
    await updateLookForService(req.body.existingUser, lookFor);
    res.status(200).json({ message: 'Le profil a été mis à jour.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const updateProfileData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const updateProfile = {
      gender: req.body?.gender ?? null,
      orientation: req.body?.orientation ?? null,
      tall: req.body?.tall ?? null,
      biography: req.body?.biography ?? null,
    };
    const profile = await updateProfileDataService(
      req.body.existingUser,
      updateProfile,
    );
    res.status(200).json({ message: 'Le profil a été mis à jour.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await deleteAccountService(req.body.existingUser);
    res.status(200).json({ message: 'Le compte a été supprimé avec success.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const updatePhotoProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await updatePhotoProfileService(req.body.existingUser, req.body.photo);
    res.status(200).json({ message: 'Le profil a été mis à jour.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const deletePhotoProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await deletePhotoProfileService(req.body.existingUser);
    res.status(200).json({ message: 'Le profil a été mis à jour.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const updatePhotoPlus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};
