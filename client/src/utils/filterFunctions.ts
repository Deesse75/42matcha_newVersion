import { MediumProfileType } from '../appConfig/interface';

export function byAge(
  min: number,
  max: number,
  filterList: MediumProfileType[],
): MediumProfileType[] | null {
  const ageMin = min >= 18 ? min : 18;
  const ageMax = max <= 120 ? max : 120;
  if (ageMin > ageMax) {
    return null;
  }
  return filterList.filter(
    (profile) => profile.age >= ageMin && profile.age <= ageMax,
  );
}

export function byLocation(
  location: string,
  geoloc: boolean,
  filterList: MediumProfileType[],
): MediumProfileType[] {}

export function byTags(
  tagsList: string[],
  filterList: MediumProfileType[],
): MediumProfileType[] {}

export function byFameFilter(
  fameRating: number,
  filterList: MediumProfileType[] | null,
): MediumProfileType[] {
  if (fameRating === 0) return filterList;
  return filterList.filter((profile) => profile.fameRating >= fameRating);
}
