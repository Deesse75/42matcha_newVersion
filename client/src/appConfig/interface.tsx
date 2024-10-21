export type FullProfileType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: string | null;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string;
  county: string;
  town: string;
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
  createdAt: string;
  updatedAt: string;
};


export type MiniProfileType = {
  id: number;
  username: string;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string;
  county: string | null;
  town: string | null;
  photo: string | null;
  fameRating: number;
  lastConnection: string | null;
};

export type UserTagsType = {
  id: number;
  userId: number;
  tagName: string;
};
