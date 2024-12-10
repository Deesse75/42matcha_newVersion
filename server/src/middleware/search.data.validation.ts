import { Request, Response, NextFunction } from 'express';
import { matchaError } from '../utils/matcha_error.js';
import * as mysql from '../mysql/mysql.service.js';

export const searchRequestValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const ageMin = req.body.ageMin;
    const ageMax = req.body.ageMax;
    const tallMin = req.body.tallMin;
    const tallMax = req.body.tallMax;
    const fameRatingMin = req.body.fameRatingMin;
    const gender = req.body.gender;
    const orientation = req.body.orientation;
    const withPhoto = req.body.withPhoto;
    const withBio = req.body.withBio;
    if (ageMin && ageMax && ageMin > ageMax) {
      res.status(400).json({
        message: "L'age minimum doit être inférieur à l'age maximum.",
      });
      return;
    }
    if (tallMin && tallMax && tallMin > tallMax) {
      res.status(400).json({
        message: 'La taille minimale doit être inférieur à la taille maximale.',
      });
      return;
    }
    req.body.searchMulti = {
      ageMin,
      ageMax,
      gender,
      orientation,
      tallMin,
      tallMax,
      withPhoto,
      withBio,
      fameRatingMin,
    };
    return next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};

export const setLastSearch = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let query: string = 'SELECT * FROM LastSearch WHERE userId = ?';
    let values: any[] = [];
    let comma: number = 0;
    const lastSearch = await mysql.getLastSearch(query, [
      req.body.payloadToken.id,
    ]);
    if (!lastSearch) {
      query = 'INSERT INTO LastSearch (userId) VALUES (?)';
      await mysql.updateTable(query, [req.body.payloadToken.id]);
    }
    query = 'UPDATE LastSearch SET';
    if (req.body.searchMulti.ageMin) {
      comma = 1;
      query += ' ageMin = ?';
      values.push(req.body.searchMulti.ageMin);
    }
    if (req.body.searchMulti.ageMax) {
      if (comma) query += ',';
      else comma = 1;
      query += ' ageMax = ?';
      values.push(req.body.searchMulti.ageMax);
    }
    if (req.body.searchMulti.tallMin) {
      if (comma) query += ',';
      else comma = 1;
      query += ' tallMin = ?';
      values.push(req.body.searchMulti.tallMin);
    }
    if (req.body.searchMulti.tallMax) {
      if (comma) query += ',';
      else comma = 1;
      query += ' tallMax = ?';
      values.push(req.body.searchMulti.tallMax);
    }
    if (req.body.searchMulti.fameRatingMin) {
      if (comma) query += ',';
      else comma = 1;
      query += ' fameRatingMin = ?';
      values.push(req.body.searchMulti.fameRatingMin);
    }
    if (req.body.searchMulti.gender) {
      if (comma) query += ',';
      else comma = 1;
      query += ' gender = ?';
      values.push(req.body.searchMulti.gender);
    }
    if (req.body.searchMulti.orientation) {
      if (comma) query += ',';
      else comma = 1;
      query += ' orientation = ?';
      values.push(req.body.searchMulti.orientation);
    }
    if (req.body.searchMulti.withPhoto) {
      if (comma) query += ',';
      else comma = 1;
      query += ' withPhoto = ?';
      values.push(req.body.searchMulti.withPhoto);
    }
    if (req.body.searchMulti.withBio) {
      if (comma) query += ',';
      else comma = 1;
      query += ' withBio = ?';
      values.push(req.body.searchMulti.withBio);
    }
    query += ' WHERE userId = ?';
    values.push(req.body.payloadToken.id);
    await mysql.updateTable(query, values);
    return next();
  } catch (error) {
    matchaError.catched(error as Error, res);
  }
};
