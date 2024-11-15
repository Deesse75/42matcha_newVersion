export type UserType = {
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
  tags: string[] | null;
  createdAt: string;
  updatedAt: string;
};

export type MiniUserType = {
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
  tags: string[] | null;
};

export type UserPhotosType = {
  id: number;
  userId: number;
  photo2: Buffer | null;
  photo3: Buffer | null;
  photo4: Buffer | null;
  photo5: Buffer | null;
};

export type UserTagsType = {
  id: number;
  userId: number;
  tagName: string;
};

export type UserLookForType = {
  id: number;
  userId: number;
  ageMin: number;
  ageMax: number;
  tallMin: number;
  tallMax: number;
  gender: string | null;
  withPhoto: boolean;
};

export type UserLastSearchType = {
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

export type UserChatType = {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  readed: boolean;
  createdAt: string;
};

export type UserNotifType = {
  id: number;
  userId: number;
  message: string;
  createdAt: string;
};

