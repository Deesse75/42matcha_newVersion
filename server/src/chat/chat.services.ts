import { MysqlUserChatType } from '../interfaces/mysql_out.interfaces.js';

export const getChatStatService = async (
  statChat: MysqlUserChatType[] | null,
): Promise<{nbMess: number, lastMess: string} | null> => {
  try {
    if (!statChat) return null;
    const nbMess = statChat.length;
    const lastMess = statChat[nbMess - 1].createdAt;
    return { nbMess, lastMess };
  } catch (error) {
    throw error;
  }
};
