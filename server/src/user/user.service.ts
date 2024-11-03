import {
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import { UserType } from '../interfaces/user.interface.js';
import { convertFullUserType } from '../utils/convertData.js';
import * as mysql from '../mysql/mysql.service.js';

export const userGetMe = async (
  existingUser: MysqlUserType,
  existingUserTags: MysqlUserTagsType[] | null,
  region: string,
  county: string,
  town: string,
): Promise<UserType> => {
  try {
    let query = 'UPDATE User SET region = ?, county = ?, town = ? WHERE id = ?';
    let values = [region, county, town, existingUser.id];
    await mysql.updateUserMysqlData(query, values);

    query = 'SELECT * FROM User WHERE id = ?';
    values = [existingUser.id];
    const user = await mysql.getFullUserData(query, values);
    if (!user) throw new Error('Utilisateur inconnu');
    return convertFullUserType(user, existingUserTags);
  } catch (error) {
    throw error;
  }
};
