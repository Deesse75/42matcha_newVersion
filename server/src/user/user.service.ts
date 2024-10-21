import {
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import { MeType } from '../interfaces/user.interface.js';
import { convertUserType } from '../utils/convertData.js';

export const userGetMe = async (
  existingUser: MysqlUserType,
  existingUserTags: MysqlUserTagsType[] | null,
): Promise<MeType> => {
  return { user: convertUserType(existingUser), userTags: existingUserTags };
};
