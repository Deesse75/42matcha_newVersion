import {
  MysqlPhotosPlusType,
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import {
  PhotosPlusBackType,
  UserBackType,
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
  delTall: boolean;
};

export const getMeService = async (
  user: MysqlUserType,
  userTags: MysqlUserTagsType[],
): Promise<GetMeType> => {
  try {
    const publicUser = convertPublicUser(user);
    return {
      user: publicUser,
      userTags: userTags ? userTags : null,
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
): Promise<PhotosPlusBackType | null> => {
  try {
    if (!userPhotosPlus) return null;
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
    let comma: number = 0;

    if (updateUser.firstname) {
      query += ' firstname = ?';
      values.push(updateUser.firstname);
      comma = 1;
    }

    if (updateUser.lastname) {
      if (comma) query += ', lastname = ?';
      else {
        query += ' lastname = ?';
        comma = 1;
      }
      values.push(updateUser.lastname);
    }

    if (updateUser.username) {
      const q = 'SELECT * FROM User WHERE username = ?';
      const v = [updateUser.username];
      const testUser = await mysql.getUser(q, v);
      if (testUser)
        throw new matchaError(400, "Ce nom d'utilisateur existe déjà.");
      if (comma) query += ', username = ?';
      else {
        query += ' username = ?';
        comma = 1;
      }
      values.push(updateUser.username);
    }

    if (updateUser.birthdate) {
      if (comma) query += ', birthdate = ?';
      else query += ' birthdate = ?';
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
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  try {
    const comparePassword = await argon.verifyData(
      user.hashedPassword,
      currentPassword,
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
  newEmail: string,
): Promise<void> => {
  let query: string = '';
  try {
    query = 'SELECT * FROM User WHERE email = ?';
    const testEmail = await mysql.getUser(query, [newEmail]);
    if (testEmail)
      throw new matchaError(400, 'Cette adresse email existe déjà.');
    const num = (Math.floor(Math.random() * 900000) + 100000).toString();
    const emailCode = await argon.hashedData(num);
    query = 'UPDATE User SET emailCode = ? WHERE id = ?';
    await mysql.updateTable(query, [num, user.id]);
    await mailer.sendEmailTokenProcess(newEmail, emailCode);
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
    const query = 'INSERT INTO Tags (userId, tagName) VALUES (?, ?)';
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
    const query = 'DELETE FROM Tags WHERE id = ?';
    await mysql.updateTable(query, [tagId]);
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
  let comma: number = 0;
  try {
    if (profile.gender) {
      if (profile.gender === 'delete') query += ' gender = NULL';
      else {
        query += ' gender = ?';
        values.push(profile.gender);
      }
      comma = 1;
    }
    if (profile.orientation) {
      if (comma) query += ',';
      if (profile.orientation === 'delete') query += ' orientation = NULL';
      else {
        query += ' orientation = ?';
        values.push(profile.orientation);
      }
      comma = 1;
    }
    if (profile.tall || profile.delTall) {
      if (comma) query += ',';
      if (profile.delTall) query += ' tall = 0';
      if (profile.tall) {
        query += ' tall = ?';
        values.push(profile.tall);
      }
    }
    query += ' WHERE id = ?';
    values.push(user.id);
    await mysql.updateTable(query, values);
  } catch (error) {
    throw error;
  }
};

export const deleteAccountService = async (
  user: MysqlUserType,
): Promise<void> => {
  try {
    const query = 'DELETE FROM User WHERE id = ?';
    await mysql.updateTable(query, [user.id]);
  } catch (error) {
    throw error;
  }
};

export const updatePhotoProfileService = async (
  user: MysqlUserType,
  photo: string,
): Promise<void> => {
  try {
    const query = 'UPDATE User SET photo = ? WHERE id = ?';
    const base64Data = photo.replace(/^data:.*,/, '');
    const photoBuffer = Buffer.from(base64Data, 'base64');
    await mysql.updateTable(query, [photoBuffer, user.id]);
  } catch (error) {
    throw error;
  }
};

export const deletePhotoProfileService = async (
  user: MysqlUserType,
): Promise<void> => {
  try {
    const query = 'UPDATE User SET photo = NULL WHERE id = ?';
    await mysql.updateTable(query, [user.id]);
  } catch (error) {
    throw error;
  }
};

export const updateOnePhotoPlusService = async (
  user: MysqlUserType,
  userPhotosPlus: MysqlPhotosPlusType,
  photo: string,
  index: number,
): Promise<void> => {
  try {
    let query: string = '';
    let values: any[] = [];
    const base64Data = photo.replace(/^data:.*,/, '');
    const photoBuffer = Buffer.from(base64Data, 'base64');
    if (userPhotosPlus) {
      query = `UPDATE PhotosPlus SET photo${index} = ? WHERE userId = ?`;
      values.push(photoBuffer, user.id);
    } else {
      query = `INSERT INTO PhotosPlus (userId, photo${index}) VALUES (?, ?)`;
      values.push(user.id, photoBuffer);
    }
    await mysql.updateTable(query, values);
  } catch (error) {
    throw error;
  }
};

export const deleteOnePhotoPlusService = async (
  user: MysqlUserType,
  index: number,
): Promise<void> => {
  try {
    const query = `UPDATE PhotosPlus SET photo${index} = NULL WHERE userId = ?`;
    await mysql.updateTable(query, [user.id]);
  } catch (error) {
    throw error;
  }
};

export const updateBioService = async (
  user: MysqlUserType,
  bio: string | null,
): Promise<void> => {
  try {
    const query = 'UPDATE User SET biography = ? WHERE id = ?';
    await mysql.updateTable(query, [bio, user.id]);
  } catch (error) {
    throw error;
  }
};
