import { Request, Response, NextFunction } from 'express';
import {
  MysqlLastSearchType,
  MysqlLookForType,
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import { ListingRequestType } from '../interfaces/listing.interface.js';

export const selectListingName = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let listingRequest: ListingRequestType | null = null;
  if (req.body.params.listingName === 'matcha')
    listingRequest = matchaSelect(
      req.body.existingUser,
      req.body.userTags,
      req.body.userLookFor,
    );
  else if (req.body.params.listingName === 'match')
    listingRequest = matchSelect(req.body.existingUser);
  else if (req.body.params.listingName === 'view')
    listingRequest = viewSelect(req.body.existingUser);
  else if (req.body.params.listingName === 'like')
    listingRequest = likeSelect(req.body.existingUser);
  else if (req.body.params.listingName === 'visited')
    listingRequest = visitedSelect(req.body.existingUser);
  else if (req.body.params.listingName === 'liked')
    listingRequest = likedSelect(req.body.existingUser);
  else if (req.body.params.listingName === 'banned')
    listingRequest = bannedSelect(req.body.existingUser);
  else if (req.body.params.listingName === 'search')
    listingRequest = searchSelect(
      req.body.existingUser,
      req.body.userLastSearch,
    );
  else {
    res.status(400).json({ message: 'Requête invalide' });
    return;
  }
  if (listingRequest) {
    if (req.body.ageMin && req.body.ageMax) {
      listingRequest.query += ` AND age BETWEEN ? AND ? `; //attention pour matcha
      listingRequest.values.push(req.body.ageMin, req.body.ageMax);
    }
    if (req.body.fameMin) {
      listingRequest.query += ` AND fame >= ? `;
      listingRequest.values.push(req.body.fameMin);
    }
    if (req.body.tags) {
      //a completer
    }
    if (req.body.zone) {
      listingRequest.query += `
      AND ${req.body.zone} = ?;
      `;
      listingRequest.values.push(req.body.existingUser[req.body.zone]);
    } else {
      listingRequest.query += `
      ORDER BY 
      CASE WHEN town = ? THEN 1 ELSE 0 END DESC, 
      CASE WHEN county = ? THEN 1 ELSE 0 END DESC, 
      CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
    `;
      listingRequest.values.push(
        req.body.existingUser.town,
        req.body.existingUser.county,
        req.body.existingUser.region,
      );
    }
  }
  return next();
};

const matchaSelect = (
  user: MysqlUserType,
  userTags: MysqlUserTagsType,
  userLookFor: MysqlLookForType,
): ListingRequestType | null => {
  let values: any = [];
  let query: string = `
    SELECT * FROM User 
    WHERE id != ?`;
  values.push(user.id);

  return { query, values };
};

const matchSelect = (user: MysqlUserType): ListingRequestType | null => {
  const query = `
  SELECT * FROM User WHERE id != ?
  AND id IN 
  (SELECT senderId FROM LikeTable WHERE receiverId = ? 
  AND senderId IN 
  (SELECT receiverId FROM LikeTable WHERE senderId = ?))
  `;
  const values = [user.id, user.id, user.id];
  return { query, values };
};

const viewSelect = (user: MysqlUserType): ListingRequestType | null => {
  const query = `
    SELECT * FROM User WHERE id != ?
    AND id IN 
    (SELECT senderId FROM ViewTable WHERE receiverId = ?)
  `;
  const values = [user.id, user.id];
  return { query, values };
};

const likeSelect = (user: MysqlUserType): ListingRequestType | null => {
  const query = `
    SELECT * FROM User WHERE id != ?
    AND id IN 
    (SELECT senderId FROM LikeTable WHERE receiverId = ?)
  `;
  const values = [user.id, user.id];
  return { query, values };
};

const visitedSelect = (user: MysqlUserType): ListingRequestType | null => {
  const query = `
    SELECT * FROM User WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM ViewTable WHERE senderId = ?)
  `;
  const values = [user.id, user.id];
  return { query, values };
};

const likedSelect = (user: MysqlUserType): ListingRequestType | null => {
  const query = `
    SELECT * FROM User WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM LikeTable WHERE senderId = ?)
  `;
  const values = [user.id, user.id];
  return { query, values };
};

const bannedSelect = (user: MysqlUserType): ListingRequestType | null => {
  const query = `
    SELECT * FROM User WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM BanTable WHERE senderId = ?)
    AND id NOT IN 
    (SELECT senderId FROM BanTable WHERE receiverId = ?)
  `;
  const values = [user.id, user.id, user.id];
  return { query, values };
};

const searchSelect = (
  user: MysqlUserType,
  userLastSearch: MysqlLastSearchType,
): ListingRequestType | null => {
  const query = '';
  const values: any[] = [];

  return { query, values };
};
