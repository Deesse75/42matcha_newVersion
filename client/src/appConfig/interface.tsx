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
  lastConnection: string;
  createdAt: string;
  updatedAt: string;
};

export type ProfilePlusType = {
  userId: number;
  ageMinLookFor: number;
  ageMaxLookFor: number;
  genderLookFor: string | null;
  orientationLookFor: string | null;
  regionLookFor: string | null;
  countyLookFor: string | null;
  townLookFor: string | null;
  tallMinLookFor: number;
  tallMaxLookFor: number;
  withPhoto: boolean;
  withBiography: boolean;
  fameRatingMin: number;
};

export type DuoProfileType = {
  id: number;
  username: string;
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
  lastConnection: string;
};

