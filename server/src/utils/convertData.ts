import {
  MysqlMiniUserType,
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import {
  MiniUserType,
  UnseenMessageType,
  UserType,
} from '../interfaces/user.interface.js';
import * as mysql from '../mysql/mysql.service.js';
import { matchaError } from './matcha_error.js';

export function convertPhoto(photo: Buffer | null): string | null {
  if (!photo) return null;
  console.log(`data:image/jpeg;base64,${photo.toString('base64')}`);
  return `data:image/jpeg;base64,${photo.toString('base64')}`;
}

export function convertFullUserType(
  user: MysqlUserType,
  userTags: MysqlUserTagsType[] | null,
): UserType {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    birthdate: user.birthdate,
    age: user.age,
    gender: user.gender,
    orientation: user.orientation,
    region: user.region,
    county: user.county,
    town: user.town,
    tall: user.tall,
    biography: user.biography,
    fameRating: user.fameRating,
    photo1: convertPhoto(user.photo1),
    photo2: convertPhoto(user.photo2),
    photo3: convertPhoto(user.photo3),
    photo4: convertPhoto(user.photo4),
    photo5: convertPhoto(user.photo5),
    ageMin: user.ageMin,
    ageMax: user.ageMax,
    genderLookFor: user.genderLookFor,
    lastConnection: user.lastConnection,
    tags: userTags ? convertTags(userTags) : null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function convertListingMiniUser(
  listing: MysqlMiniUserType[],
): Promise<MiniUserType[]> {
  let newListing: MiniUserType[] = [];
  for (let i = 0; i < listing.length; i++) {
    const query = 'SELECT * FROM Tags WHERE userId = ?';
    const tags = await mysql.getTags(query, [listing[i].id]);
    newListing.push(convertMiniUserType(listing[i], tags));
  }
  return newListing;
}

export function convertMiniUserType(
  listing: MysqlMiniUserType,
  tags: MysqlUserTagsType[] | null,
): MiniUserType {
  return {
    id: listing.id,
    username: listing.username,
    age: listing.age,
    gender: listing.gender ? listing.gender : null,
    orientation: listing.orientation ? listing.orientation : null,
    region: listing.region ? listing.region : null,
    county: listing.county ? listing.county : null,
    town: listing.town ? listing.town : null,
    fameRating: listing.fameRating,
    photo1: listing.photo1 ? convertPhoto(listing.photo1) : null,
    lastConnection: listing.lastConnection ? listing.lastConnection : null,
    tags: tags ? convertTags(tags) : null,
  };
}

export function convertTags(tags: MysqlUserTagsType[]): string[] {
  return tags.map((tag) => tag.tagName);
}

export async function convertUnseenMessageListing(
  listing: { id: number; senderId: number; message: string }[],
): Promise<UnseenMessageType[]> {
  const query = `
    SELECT username 
    FROM User 
    WHERE id = ?
  `;
  try {
    const newListing: UnseenMessageType[] = [];
    for (let i = 0; i < listing.length; i++) {
      const username = await mysql.getUsername(query, [listing[i].senderId]);
      if (!username) throw new matchaError(500, 'Erreur interne');
      newListing.push({
        id: listing[i].id,
        senderId: listing[i].senderId,
        senderUsername: username,
        message: listing[i].message,
      });
    }
    return newListing;
  } catch (error) {
    throw error;
  }
}
