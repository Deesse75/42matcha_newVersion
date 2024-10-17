import { matchaError } from "../../utils/matcha_error.js";
import {mysqlDb} from '../config/config.mysql.js';

export async function getUserById(id: number) {
  const query = `SELECT * FROM User WHERE id = ?`;
  try {
    const [rows]: any = await mysqlDb.query(query, [id]);
    if (!rows[0]) throw new matchaError(404, "Utilisateur introuvable");
    return rows[0];
  } catch (error) {
    throw new matchaError(500, "Une erreur interne est survenue");
  }
};

export async function getUserTagsById(id: number) {
  const query = `SELECT tagName FROM TagList WHERE userId = ?`;
  try {
    const [rows]: any = await mysqlDb.query(query, [id]);
    return rows;
  } catch (error) {
    throw new matchaError(500, "Une erreur interne est survenue");
  }
}
