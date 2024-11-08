export type SearchRequestType = {
  ageMin: number;
  ageMax: number;
  gender: string | null;
  orientation: string | null;
  tallMin: number;
  tallMax: number;
  advancePhoto: boolean;
};
