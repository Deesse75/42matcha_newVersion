import {
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import { UserType } from '../interfaces/user.interface.js';
import { convertFullUserType } from '../utils/convertData.js';
import * as mysql from '../mysql/mysql.service.js';

export const userGetMe = async (
  existingUser: MysqlUserType,
  tags: MysqlUserTagsType[] | null,
): Promise<UserType> => {
  try {
    const query = 'SELECT * FROM User WHERE id = ?';
    const values = [existingUser.id];
    const user = await mysql.getFullUserData(query, values);
    if (!user) throw new Error('Utilisateur inconnu');
    return convertFullUserType(user, tags);
  } catch (error) {
    throw error;
  }
};
