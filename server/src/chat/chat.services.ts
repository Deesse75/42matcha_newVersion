// import {
//   MysqlChatMessageType,
//   MysqlUserType,
// } from '../interfaces/mysql_out.interfaces.js';
// import * as mysql from '../mysql/mysql.service.js';

// export const getChatStatService = async (
//   statChat: MysqlChatMessageType[] | null,
// ): Promise<{ nbMess: number; lastMess: string } | null> => {
//   try {
//     if (!statChat) return null;
//     const nbMess = statChat.length;
//     const lastMess = statChat[nbMess - 1].createdAt;
//     return { nbMess, lastMess };
//   } catch (error) {
//     throw error;
//   }
// };

// export const getUnseenMessageService = async (
//   user: MysqlUserType,
// ): Promise<UnseenMessageType[] | null> => {
//   const query: string = `
//       SELECT id, senderId, message 
//       FROM ChatHistory 
//       WHERE receiverId = ? 
//       AND readed = 0
//       `;
//   const values: any[] = [user.id];
//   try {
//     const listing = await mysql.getUnseenMess(query, values);
//     if (!listing) return null;
//     return convertUnseenMessageListing(listing);
//   } catch (error) {
//     throw error;
//   }
// };
