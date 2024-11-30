import { Request, Response, NextFunction } from 'express';
import { ListingRequestType } from '../interfaces/listing.interface.js';

export const selectListingName = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let listingRequest: ListingRequestType | null = null;
  let listingName: string = req?.params?.listingName
    ? req.params.listingName
    : req.body.listingName;
  if (listingName === 'matcha') listingRequest = matchaSelect(req);
  else if (listingName === 'match') listingRequest = matchSelect(req);
  else if (listingName === 'view') listingRequest = viewSelect(req);
  else if (listingName === 'like') listingRequest = likeSelect(req);
  else if (listingName === 'visited') listingRequest = visitedSelect(req);
  else if (listingName === 'liked') listingRequest = likedSelect(req);
  else if (listingName === 'banned') listingRequest = bannedSelect(req);
  else if (listingName === 'mute') listingRequest = muteSelect(req);
  else if (listingName === 'search') listingRequest = searchSelect(req);
  else {
    res.status(400).json({ message: 'Requête invalide' });
    return;
  }
  req.body.listingRequest = listingRequest;
  return next();
};

const matchaSelect = (req: Request): ListingRequestType | null => {
  let query: string = `
  SELECT * FROM User WHERE id != ?`;
  let values: any[] = [req.body.existingUser.id];

  const listingRequest: ListingRequestType = addFilter(query, values, req);
  return listingRequest;
};

const matchSelect = (req: Request): ListingRequestType | null => {
  let query: string = `
  SELECT * FROM User WHERE id != ?
  AND id IN 
  (SELECT senderId FROM LikeTable WHERE receiverId = ? 
  AND senderId IN 
  (SELECT receiverId FROM LikeTable WHERE senderId = ?))
  `;
  let values: any[] = [
    req.body.existingUser.id,
    req.body.existingUser.id,
    req.body.existingUser.id,
  ];
  const listingRequest: ListingRequestType = addFilter(query, values, req);
  return listingRequest;
};

const viewSelect = (req: Request): ListingRequestType | null => {
  let query: string = `
    SELECT * FROM User WHERE id != ?
    AND id IN 
    (SELECT senderId FROM ViewTable WHERE receiverId = ?)
  `;
  let values: any[] = [req.body.existingUser.id, req.body.existingUser.id];
  const listingRequest: ListingRequestType = addFilter(query, values, req);
  return listingRequest;
};

const likeSelect = (req: Request): ListingRequestType | null => {
  let query: string = `
    SELECT * FROM User WHERE id != ?
    AND id IN 
    (SELECT senderId FROM LikeTable WHERE receiverId = ?)
  `;
  let values: any[] = [req.body.existingUser.id, req.body.existingUser.id];
  const listingRequest: ListingRequestType = addFilter(query, values, req);
  return listingRequest;
};

const visitedSelect = (req: Request): ListingRequestType | null => {
  let query: string = `
    SELECT * FROM User WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM ViewTable WHERE senderId = ?)
  `;
  let values: any[] = [req.body.existingUser.id, req.body.existingUser.id];
  const listingRequest: ListingRequestType = addFilter(query, values, req);
  return listingRequest;
};

const likedSelect = (req: Request): ListingRequestType | null => {
  let query: string = `
    SELECT * FROM User WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM LikeTable WHERE senderId = ?)
  `;
  let values: any[] = [req.body.existingUser.id, req.body.existingUser.id];
  const listingRequest: ListingRequestType = addFilter(query, values, req);
  return listingRequest;
};

const bannedSelect = (req: Request): ListingRequestType | null => {
  let query: string = `
    SELECT * FROM User WHERE id != ?
    AND id IN 
    (SELECT receiverId FROM BanTable WHERE senderId = ?)
    AND id NOT IN 
    (SELECT senderId FROM BanTable WHERE receiverId = ?)
  `;
  let values: any[] = [
    req.body.existingUser.id,
    req.body.existingUser.id,
    req.body.existingUser.id,
  ];
  const listingRequest: ListingRequestType = addFilter(query, values, req);
  return listingRequest;
};

const muteSelect = (req: Request): ListingRequestType | null => {
  let query: string = `
    SELECT * FROM User WHERE id != ?
    AND id NOT IN 
    (SELECT receiverId FROM MuteTable WHERE senderId = ?)
  `;
  let values: any[] = [req.body.existingUser.id, req.body.existingUser.id];
  const listingRequest: ListingRequestType = addFilter(query, values, req);
  return listingRequest;
};

const searchSelect = (req: Request): ListingRequestType | null => {
  const query = '';
  const values: any[] = [];

  const listingRequest: ListingRequestType = addFilter(query, values, req);
  return listingRequest;
};

const addFilter = (
  q: string,
  v: any[],
  req: Request,
): { query: string; values: any[] } => {
  let query: string = q;
  let values: any[] = v;
  if (req.path.split('/')[1] === 'get_age_filter') {
    query += ' AND age BETWEEN ? AND ?';
    values.push(req.body.ageMin, req.body.ageMax);
  } else if (req.path.split('/')[1] === 'get_fame_filter') {
    query += ' AND fameRating >= ?';
    values.push(req.body.fameMin);
  } else if (req.path.split('/')[1] === 'get_location_filter') {
    query += ` AND ${req.body.zone} = ?`;
    values.push(req.body.existingUser[req.body.zone]);
  } else if (req.path.split('/')[1] === 'get_tags_filter') {
    // a revoir
    query += ' AND id IN (SELECT userId FROM Tags WHERE tagName IN (';
    req.body.tags.forEach((tag: string, index: number) => {
      query += index === 0 ? '?' : ', ?';
      values.push(tag);
    });
    query += '))';
    query += ` 
    ORDER BY 
    CASE WHEN town = ? THEN 1 ELSE 0 END DESC, 
    CASE WHEN county = ? THEN 1 ELSE 0 END DESC, 
    CASE WHEN region = ? THEN 1 ELSE 0 END DESC;
  `;
    values.push(
      req.body.existingUser.town,
      req.body.existingUser.county,
      req.body.existingUser.region,
    );
  }
  return { query, values };
};
