export type MysqlUserType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  emailCertified: boolean;
  emailCode: string | null;
  hashedPassword: string;
  birthdate: string;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  county: string | null;
  town: string | null;
  tall: number;
  biography: string | null;
  fameRating: number;
  photo: Buffer | null;
  lastConnection: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MysqlMiniUserType = {
  id: number;
  username: string;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  county: string | null;
  town: string | null;
  fameRating: number;
  photo: Buffer | null;
  lastConnection: string | null;
};

export type MysqlPhotosType = {
  id: number;
  userId: number;
  photo2: Buffer | null;
  photo3: Buffer | null;
  photo4: Buffer | null;
  photo5: Buffer | null;
};

export type MysqlUserTagsType = {
  id: number;
  userId: number;
  tagName: string;
};

export type MysqlLookForType = {
  id: number;
  userId: number;
  ageMin: number;
  ageMax: number;
  tallMin: number;
  tallMax: number;
  gender: string | null;
  withPhoto: boolean;
};

export type MysqlLastSearchType = {
  id: number;
  userId: number;
  ageMin: number;
  ageMax: number;
  tallMin: number;
  tallMax: number;
  gender: string | null;
  orientation: string | null;
  withPhoto: boolean;
  withBio: boolean;
  fameRatingMin: number;
};

export type MysqlUserChatType = {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  readed: boolean;
  createdAt: string;
};

export type MysqlNotifType = {
  id: number;
  userId: number;
  message: string;
  createdAt: string;
};

