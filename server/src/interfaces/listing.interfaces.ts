export type ListingUserType = {
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
