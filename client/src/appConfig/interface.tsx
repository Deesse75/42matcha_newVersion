export type FullProfileType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
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
  photo1: string | null;
  photo2: string | null;
  photo3: string | null;
  photo4: string | null;
  photo5: string | null;
  ageMin: number;
  ageMax: number;
  genderLookFor: string | null;
  lastConnection: string | null;
  tags: string[] | null;
  createdAt: string;
  updatedAt: string;
};


export type MiniProfileType = {
  id: number;
  username: string;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  county: string | null;
  town: string | null;
  fameRating: number;
  photo1: string | null;
  tags: string[] | null;
  lastConnection: string | null;
};

export type UserTagsType = {
  id: number;
  userId: number;
  tagName: string;
};

export type UnseenMessageType = {
  id: number;
  senderId: number;
  senderUsername: string;
  message: string;
};

export type SearchAdvanceRequestType = {
  ageMin: number;
  ageMax: number;
  gender: string | null;
  orientation: string | null;
  tallMin: number;
  tallMax: number;
  advancePhoto: boolean;
};
