import { MysqlUserType } from '../interfaces/mysql_out.interfaces.js';
import * as mysql from '../mysql/mysql.service.js';
import { matchaError } from '../utils/matcha_error.js';

export const actionLikeService = async (
  user: MysqlUserType,
  interaction: string,
  receiverId: number,
): Promise<void> => {
  let query: string = '';
  try {
    if (interaction === 'like' || interaction === 'match')
      throw new matchaError(400, 'Vous avez déjà liké ce profil.');
    query = 'Insert INTO LikeTable (senderId, receiverId) VALUES (?, ?)';
    await mysql.updateTable(query, [user.id, receiverId]);
    query = 'UPDATE User SET fameRating = ? WHERE id = ?';
    await mysql.updateTable(query, [user.fameRating + 100, user.id]);
    query = 'UPDATE User SET fameRating = ? WHERE id = ?';
    await mysql.updateTable(query, [user.fameRating + 150, receiverId]);
  } catch (error) {
    throw error;
  }
};

export const deleteLikeService = async (
  user: MysqlUserType,
  interaction: string,
  receiverId: number,
): Promise<void> => {
  let query: string = '';
  try {
    if (interaction !== 'like' && interaction !== 'match')
      throw new matchaError(400, "Vous n'avez pas liké ce profil.");
    query = 'DELETE FROM LikeTable WHERE senderId = ? AND receiverId = ?';
    await mysql.updateTable(query, [user.id, receiverId]);
    query = 'UPDATE User SET fameRating = ? WHERE id = ?';
    await mysql.updateTable(query, [user.fameRating - 100, user.id]);
    query = 'UPDATE User SET fameRating = ? WHERE id = ?';
    await mysql.updateTable(query, [user.fameRating - 150, receiverId]);
  } catch (error) {
    throw error;
  }
};

export const actionViewService = async (
  user: MysqlUserType,
  interaction: string,
  receiverId: number,
): Promise<void> => {
  let query: string = '';
  try {
    if (interaction !== 'none') return;
    query = 'Insert INTO ViewTable (senderId, receiverId) VALUES (?, ?)';
    await mysql.updateTable(query, [user.id, receiverId]);
    query = 'UPDATE User SET fameRating = ? WHERE id = ?';
    await mysql.updateTable(query, [user.fameRating + 50, user.id]);
    query = 'UPDATE User SET fameRating = ? WHERE id = ?';
    await mysql.updateTable(query, [user.fameRating + 20, receiverId]);
  } catch (error) {
    throw error;
  }
};

export const actionBanService = async (
  user: MysqlUserType,
  receiverId: number,
): Promise<void> => {
  let query: string = '';
  try {
    query = 'DELETE FROM LikeTable WHERE senderId = ? AND receiverId = ?';
    await mysql.updateTable(query, [user.id, receiverId]);
  } catch (error) {}
  try {
    query = 'DELETE FROM LikeTable WHERE receiverId = ? AND senderId = ?';
    await mysql.updateTable(query, [user.id, receiverId]);
  } catch (error) {}
  try {
    query = 'DELETE FROM ViewTable WHERE senderId = ? AND receiverId = ?';
    await mysql.updateTable(query, [user.id, receiverId]);
  } catch (error) {}
  try {
    query = 'DELETE FROM ViewTable WHERE receiverId = ? AND senderId = ?';
    await mysql.updateTable(query, [user.id, receiverId]);
  } catch (error) {}
  try {
    query = 'INSERT INTO BanTable (senderId, receiverId) VALUES (?, ?)';
    await mysql.updateTable(query, [user.id, receiverId]);
  } catch (error) {
    throw error;
  }
};

