export type UserFrontType = {
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
  photo: string | null;
  lastConnection: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserTagsFrontType = {
  id: number;
  userId: number;
  tagName: string;
};

export type UserLookForFrontType = {
  id: number;
  userId: number;
  ageMin: number;
  ageMax: number;
  tallMin: number;
  tallMax: number;
  gender: string | null;
  withPhoto: boolean;
};

export type UserLastSearchFrontType = {
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

export type UserNotifFrontType = {
  id: number;
  userId: number;
  message: string;
  createdAt: string;
};

export type ChatMessageFrontType = {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  readed: boolean;
  createdAt: string;
};

export type FullProfileFrontType = {
  id: number;
  username: string;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  county: string | null;
  town: string | null;
  tall: number;
  biography: string | null;
  fameRating: number;
  photo1: string | null;
  photo2: string | null;
  photo3: string | null;
  photo4: string | null;
  photo5: string | null;
  lastConnection: string | null;
  tags: string[] | null;
  createdAt: string;
  updatedAt: string;
};

export type MiniProfileFrontType = {
  id: number;
  username: string;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  county: string | null;
  town: string | null;
  fameRating: number;
  photo: string | null;
  lastConnection: string | null;
  tags: string[] | null;
};

export type PhotosPlusFrontType = {
  id: number;
  userId: number;
  photo2: string | null;
  photo3: string | null;
  photo4: string | null;
  photo5: string | null;
};  


export type OpenChatListType = {
  userId: number;
  username: string;
};
