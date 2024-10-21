import { MysqlUserTagsType } from "./mysql_out.interfaces.js";

export type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
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

export type MeType = {
  user: UserType;
  userTags: MysqlUserTagsType[] | null;
}