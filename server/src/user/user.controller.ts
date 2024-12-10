import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import {
  addTagService,
  deleteAccountService,
  deleteOnePhotoPlusService,
  deletePhotoProfileService,
  deleteTagService,
  getMeService,
  getNewTokenService,
  getProfileService,
  getUserDataService,
  getUserPhotosPlusService,
  updateBioService,
  updateEmailService,
  updateOnePhotoPlusService,
  updatePasswordService,
  updatePhotoProfileService,
  updateProfileDataService,
  updateUserDataService,
} from './user.service.js';

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const me = await getMeService(req.body.existingUser, req.body.userTags);
    res.status(200).json({
      user: me.user,
      userTags: me.userTags,
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
      req.body.currentPassword,
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
    await updateEmailService(req.body.existingUser, req.body.newEmail);
    res.status(200).json({ message: 'Un lien vous a été envoyé par email.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const updateBio = async (req: Request, res: Response): Promise<void> => {
  try {
    await updateBioService(req.body.existingUser, req.body.bio);
    res.status(200).json({ message: 'Le profil a été mis à jour.' });
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
    const token = await getNewTokenService(parseInt(req.params.id));
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
    await deleteTagService(req.body.existingUser, parseInt(req.params.id));
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
      delTall: req.body.delTall ?? false,
    };
    await updateProfileDataService(req.body.existingUser, updateProfile);
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

export const updateOnePhotoPlus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await updateOnePhotoPlusService(
      req.body.existingUser,
      req.body.userPhotosPlus,
      req.body.photo,
      req.body.index,
    );
    res
      .status(200)
      .json({ message: 'Les photos secondaires ont été mises à jour.' });
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const deleteOnePhotoPlus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await deleteOnePhotoPlusService(
      req.body.existingUser,
      parseInt(req.params.index),
    );
    res
      .status(200)
      .json({ message: 'Les photos secondaires ont été mises à jour.' });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const profile = await getProfileService(
      req.body.existingUser,
      parseInt(req.params.id),
    );
    res.status(200).json({ profile: profile });
    return;
  } catch (error) {
    return matchaError.catched(error as Error, res);
  }
};
