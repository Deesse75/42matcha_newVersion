import {
  MysqlUserTagsType,
  MysqlUserType,
} from '../interfaces/mysql_out.interfaces.js';
import { ProfileBackType, UserBackType } from '../interfaces/user.interface.js';
import * as mysql from '../mysql/mysql.service.js';

export function convertPublicPhoto(photo: Buffer | null): string | null {
  if (!photo) return null;
  return `data:image/jpeg;base64,${photo.toString('base64')}`;
}

export function convertPublicUser(
  user: MysqlUserType,
): UserBackType {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
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
    photo: convertPublicPhoto(user.photo),
    lastConnection: user.lastConnection,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function convertPublicProfile(
  user: MysqlUserType,
  userTags: MysqlUserTagsType[] | null,
): ProfileBackType {
  return {
    id: user.id,
    username: user.username,
    age: user.age,
    gender: user.gender ? user.gender : null,
    orientation: user.orientation ? user.orientation : null,
    region: user.region ? user.region : null,
    county: user.county ? user.county : null,
    town: user.town ? user.town : null,
    tall: user.tall,
    biography: user.biography ? user.biography : null,
    fameRating: user.fameRating,
    photo: user.photo ? convertPublicPhoto(user.photo) : null,
    lastConnection: user.lastConnection ? user.lastConnection : null,
    tags: userTags ? convertTags(userTags) : null,
  };
}

export async function convertPublicProfileList(
  listing: MysqlUserType[],
): Promise<ProfileBackType[]> {
  let newListing: ProfileBackType[] = [];
  for (let i = 0; i < listing.length; i++) {
    const query = 'SELECT * FROM Tags WHERE userId = ?';
    const tags = await mysql.getTags(query, [listing[i].id]);
    newListing.push(convertPublicProfile(listing[i], tags));
  }
  return newListing;
}

export function convertTags(tags: MysqlUserTagsType[]): string[] {
  return tags.map((tag) => tag.tagName);
}

// export async function convertUnseenMessageListing(
//   listing: { id: number; senderId: number; message: string }[],
// ): Promise<UnseenMessageType[]> {
//   const query = `
//     SELECT username 
//     FROM User 
//     WHERE id = ?
//   `;
//   try {
//     const newListing: UnseenMessageType[] = [];
//     for (let i = 0; i < listing.length; i++) {
//       const username = await mysql.getUsername(query, [listing[i].senderId]);
//       if (!username) throw new matchaError(500, 'Erreur interne');
//       newListing.push({
//         id: listing[i].id,
//         senderId: listing[i].senderId,
//         senderUsername: username,
//         message: listing[i].message,
//       });
//     }
//     return newListing;
//   } catch (error) {
//     throw error;
//   }
// }
