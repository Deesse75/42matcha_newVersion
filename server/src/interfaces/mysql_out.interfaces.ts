export type MysqlUserType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  emailCertified: boolean;
  emailCode: string | null;
  hashedPassword: string;
  birthdate: string | null;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  county: string | null;
  town: string | null;
  tall: number;
  biography: string | null;
  fameRating: number;
  photo1: Buffer | null;
  photo2: Buffer | null;
  photo3: Buffer | null;
  photo4: Buffer | null;
  photo5: Buffer | null;
  ageMin: number;
  ageMax: number;
  genderLookFor: string | null;
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
  photo1: Buffer | null;
  lastConnection: string | null;
};

export type MysqlUserTagsType = {
  id: number;
  userId: number;
  tagName: string;
};



