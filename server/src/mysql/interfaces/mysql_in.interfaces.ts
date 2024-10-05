export type CreateNewUserType = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  emailCode: string;
  hashedPassword: string;
};

export type UpdateProfileDataType = {
  userId: number;
  birthdate: Date | null;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  tall: number | null;
};

export type UpdateBioType = {
  userId: number;
  title: string;
  bio: string;
};

export type UpdateTagsType = {
  userId: number;
  tag1: boolean;
  tag2: boolean;
  tag3: boolean;
  tag4: boolean;
  tag5: boolean;
  tag6: boolean;
  tag7: boolean;
  tag8: boolean;
  tag9: boolean;
  tag10: boolean;
  tag11: boolean;
  tag12: boolean;
  tag13: boolean;
  tag14: boolean;
  tag15: boolean;
  tag16: boolean;
  tag17: boolean;
  tag18: boolean;
  tag19: boolean;
  tag20: boolean;
};


