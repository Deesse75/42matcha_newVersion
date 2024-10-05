export type MysqlUserType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  emailCertified: boolean;
  emailCode: string;
  hashedPassword: string;
  birthdate: string;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  departement: string | null;
  ville: string | null;
  tall: number;
  biography: string | null;
  fameRating: number;
  photo1: Buffer | null;
  photo2: Buffer | null;
  photo3: Buffer | null;
  photo4: Buffer | null;
  photo5: Buffer | null;
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

export type MysqlUserValidationType = {
  id: number;
  username: string;
  email: string;
  emailCertified: boolean;
  emailCode: string;
  hashedPassword: string;
};

