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
  region: string;
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
  ageMinLookFor: number;
  ageMaxLookFor: number;
  genderLookFor: string | null;
  orientationLookFor: string | null;
  locationLookFor: string | null;
  tallMinLookFor: number;
  tallMaxLookFor: number;
  withPhoto: boolean;
  withBiography: boolean;
  withConnectionOn: boolean;
  lastConnection: string;
  createdAt: string;
  updatedAt: string;
};

export type MiniProfileType = {
  id: number;
  username: string;
};

export type MediumProfileType = {
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
};

export type ChatDataType = {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: string;
};
