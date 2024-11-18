import {
  MysqlLookForType,
  MysqlPhotosPlusType,
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import {
  PhotosPlusBackType,
  UserBackType,
  UserLookForBackType,
  UserTagsBackType,
} from '../interfaces/user.interface.js';
import * as mysql from '../mysql/mysql.service.js';
import { convertPublicPhoto, convertPublicUser } from '../utils/convertData.js';
import { matchaError } from '../utils/matcha_error.js';
import * as argon from '../utils/argon.services.js';
import * as mailer from '../utils/mailer.services.js';
import * as jwt from '../utils/jwt.service.js';

type GetMeType = {
  user: UserBackType;
  userTags: UserTagsBackType[] | null;
  userLookFor: UserLookForBackType | null;
};

type UpdateUserType = {
  firstname: string;
  lastname: string;
  username: string;
  birthdate: string;
};

type ProfileType = {
  gender: string | null;
  orientation: string | null;
  tall: number | null;
  biography: string | null;
};

type LookForType = {
  ageMin: number | null;
  ageMax: number | null;
  tallMin: number | null;
  tallMax: number | null;
  gender: string | null;
  withPhoto: boolean;
};

export const getMeService = async (
  user: MysqlUserType,
  userTags: MysqlUserTagsType[],
  userLookFor: MysqlLookForType,
): Promise<GetMeType> => {
  try {
    const publicUser = convertPublicUser(user);
    return {
      user: publicUser,
      userTags: userTags ? userTags : null,
      userLookFor: userLookFor ? userLookFor : null,
    };
  } catch (error) {
    throw error;
  }
};

export const getUserDataService = async (
  user: MysqlUserType,
): Promise<UserBackType> => {
  try {
    return convertPublicUser(user);
  } catch (error) {
    throw error;
  }
};

export const getUserPhotosPlusService = async (
  user: MysqlUserType,
  userPhotosPlus: MysqlPhotosPlusType,
): Promise<PhotosPlusBackType> => {
  try {
    return {
      userId: user.id,
      photo2: userPhotosPlus.photo2
        ? convertPublicPhoto(userPhotosPlus.photo2)
        : null,
      photo3: userPhotosPlus.photo3
        ? convertPublicPhoto(userPhotosPlus.photo3)
        : null,
      photo4: userPhotosPlus.photo4
        ? convertPublicPhoto(userPhotosPlus.photo4)
        : null,
      photo5: userPhotosPlus.photo5
        ? convertPublicPhoto(userPhotosPlus.photo5)
        : null,
    };
  } catch (error) {
    throw error;
  }
};

export const updateUserDataService = async (
  user: MysqlUserType,
  updateUser: UpdateUserType,
): Promise<void> => {
  try {
    let query: string = 'UPDATE User SET';
    const values: any[] = [];
    let emailCode: string = '';

    if (updateUser.firstname) {
      query += ' firstname = ?,';
      values.push(updateUser.firstname);
    }
    if (updateUser.lastname) {
      query += ' lastname = ?,';
      values.push(updateUser.lastname);
    }
    if (updateUser.username) {
      const q = 'SELECT * FROM User WHERE username = ?';
      const v = [updateUser.username];
      const testUser = await mysql.getUser(q, v);
      if (testUser)
        throw new matchaError(400, "Ce nom d'utilisateur existe déjà.");
      query += ' username = ?,';
      values.push(updateUser.username);
    }
    if (updateUser.birthdate) {
      query += ' birthdate = ?,';
      values.push(new Date(updateUser.birthdate));
    }
    query += ' WHERE id = ?';
    values.push(user.id);
    await mysql.updateTable(query, values);
    if (updateUser.birthdate) {
      query =
        'UPDATE User SET age = TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) WHERE id = ?';
      await mysql.updateTable(query, [user.id]);
    }
  } catch (error) {
    throw error;
  }
};

export const updatePasswordService = async (
  user: MysqlUserType,
  activePassword: string,
  newPassword: string,
): Promise<void> => {
  try {
    const comparePassword = await argon.verifyData(
      user.hashedPassword,
      activePassword,
    );
    if (!comparePassword)
      throw new matchaError(401, 'Le mot de passe actuel est incorrect.');
    const hashedPassword = await argon.hashedData(newPassword);
    const query: string = 'UPDATE User SET hashedPassword = ? WHERE id = ?';
    const values: any[] = [hashedPassword, user.id];
    await mysql.updateTable(query, values);
  } catch (error) {
    throw error;
  }
};

export const updateEmailService = async (
  user: MysqlUserType,
  currentPassword: string,
  newEmail: string,
): Promise<void> => {
  let query: string = '';
  try {
    const comparePassword = await argon.verifyData(
      user.hashedPassword,
      currentPassword,
    );
    if (!comparePassword)
      throw new matchaError(401, 'Le mot de passe est incorrect.');
    query = 'SELECT * FROM User WHERE email = ?';
    const testEmail = await mysql.getUser(query, [newEmail]);
    if (testEmail)
      throw new matchaError(400, 'Cette adresse email existe déjà.');
    const num = (Math.floor(Math.random() * 900000) + 100000).toString();
    const emailCode = await argon.hashedData(num);
    query = 'UPDATE User SET emailCode = ? WHERE id = ?';
    await mysql.updateTable(query, [num, user.id]);
    await mailer.sendEmailUserTokenProcess(newEmail, emailCode);
  } catch (error) {
    throw error;
  }
};

export const getNewTokenService = async (id: number): Promise<string> => {
  try {
    const query = 'SELECT * FROM User WHERE id = ?';
    const user = await mysql.getUser(query, [id]);
    if (!user) throw new matchaError(404, 'Utilisateur introuvable.');
    return jwt.createUserToken(
      user.id,
      user.email,
      process.env.JWT_SECRET_TOKEN || '',
    );
  } catch (error) {
    throw error;
  }
};

export const addTagService = async (
  user: MysqlUserType,
  UserTags: MysqlUserTagsType[] | null,
  newTag: string,
): Promise<void> => {
  try {
    if (UserTags && UserTags.length >= 6)
      throw new matchaError(
        400,
        'Vous avez atteint le nombre maximum de tags.',
      );
    const query = 'INSERT INTO UserTags (userId, tagName) VALUES (?, ?)';
    await mysql.updateTable(query, [user.id, newTag]);
  } catch (error) {
    throw error;
  }
};

export const deleteTagService = async (
  user: MysqlUserType,
  tagId: number,
): Promise<void> => {
  try {
    const query = 'DELETE FROM UserTags WHERE id = ?';
    await mysql.updateTable(query, [tagId]);
  } catch (error) {
    throw error;
  }
};

export const validateUpdateEmailService = async (
  user: MysqlUserType,
  code: string,
  email: string,
): Promise<void> => {
  try {
    const compareCode = await argon.verifyData(code, user.emailCode);
    let query = 'UPDATE User SET emailCode = ? WHERE id = ?';
    await mysql.updateTable(query, ['', user.id]);
    if (!compareCode) {
      throw new matchaError(401, 'Token invalide, absent ou expiré.');
    }
    query = 'UPDATE User SET email = ? WHERE id = ?';
    await mysql.updateTable(query, [email, user.id]);
  } catch (error) {
    throw error;
  }
};

export const updateProfileDataService = async (
  user: MysqlUserType,
  profile: ProfileType,
): Promise<void> => {
  let query: string = 'UPDATE User SET';
  const values: any[] = [];
  try {
    if (profile.gender) {
      if (profile.gender === 'delete') query += ' gender = NULL,';
      else {
        query += ' gender = ?,';
        values.push(profile.gender);
      }
    }
    if (profile.orientation) {
      if (profile.orientation === 'delete') query += ' orientation = NULL,';
      else {
        query += ' orientation = ?,';
        values.push(profile.orientation);
      }
    }
    if (profile.tall) {
      query += ' tall = ?,';
      values.push(profile.tall);
    }
    if (profile.biography) {
      query += ' biography = ?,';
      values.push(profile.biography);
    }
    query += ' WHERE id = ?';
    values.push(user.id);
    await mysql.updateTable(query, values);
  } catch (error) {
    throw error;
  }
};

export const updateLookForService = async (
  user: MysqlUserType,
  lookFor: LookForType,
) => {
  try {
    let query: string = 'UPDATE LookFor SET';
    const values: any[] = [];
    if (lookFor.ageMin && lookFor.ageMax && lookFor.ageMin > lookFor.ageMax) {
      throw new matchaError(
        400,
        "L'âge minimum doit être inférieur à l'âge maximum.",
      );
    }
    if (lookFor.tallMin && lookFor.tallMax && lookFor.tallMin > lookFor.tallMax) {
      throw new matchaError(
        400,
        "La taille minimum doit être inférieure à la taille maximum.",
      );
    }
    if (lookFor.ageMin) {
      query += ' ageMin >= ?,';
      values.push(lookFor.ageMin);
    }
    if (lookFor.ageMax) {
      query += ' ageMax <= ?,';
      values.push(lookFor.ageMax);
    }
    if (lookFor.tallMin) {
      query += ' tallMin >= ?,';
      values.push(lookFor.tallMin);
    }
    if (lookFor.tallMax) {
      query += ' tallMax <= ?,';
      values.push(lookFor.tallMax);
    }
    if (lookFor.gender) {
      if (lookFor.gender === 'delete') query += ' gender = NULL,';
      else {
        query += ' gender = ?,';
        values.push(lookFor.gender);
      }
    }
    if (lookFor.withPhoto) query += ' photo IS NOT NULL,';
    query += ' WHERE userId = ?';
    values.push(user.id);
    await mysql.updateTable(query, values);
  } catch (error) {
    throw error;
  }
};

export const deleteAccountService = async (user: MysqlUserType): Promise<void> => {
  try {
    const query = 'DELETE FROM User WHERE id = ?';
    await mysql.updateTable(query, [user.id]);
  } catch (error) {
    throw error;
  }
};

export const updatePhotoProfileService = async (user: MysqlUserType, photo: string) => {
  try {
    const query = 'UPDATE User SET photo = ? WHERE id = ?';
    await mysql.updateTable(query, [photo, user.id]);
  } catch (error) {
    throw error;
  }
};

export const deletePhotoProfileService = async (user: MysqlUserType) => {
  try {
    const query = 'UPDATE User SET photo = NULL WHERE id = ?';
    await mysql.updateTable(query, [user.id]);
  } catch (error) {
    throw error;
  }
};
