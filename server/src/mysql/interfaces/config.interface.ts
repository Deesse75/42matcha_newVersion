export type FakeTagNameType = {
  id: number;
  userId: number;
  tag: string;
};

export type FakeUserType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  emailCertified: boolean;
  emailCode: string;
  hashedPassword: string;
  birthdate: Date;
  age: number;
  gender: string;
  orientation: string;
  region: string;
  departement: string | null;
  ville: string | null;
  tall: number;
  biography: string;
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
  lastConnection: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type FakeActionType = {
  id: number;
  senderId: number;
  receiverId: number;
};

export type FakeTagType = {
  id: number;
  userId: number;
  tagName: string;
};
