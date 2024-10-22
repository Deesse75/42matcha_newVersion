import { FullProfileType, MiniProfileType } from '../appConfig/interface';

export function calculateDistance(
  profile: MiniProfileType,
  me: FullProfileType | null,
): number {
  if (!me) return 0;
  if (profile.town === me.town) return 3;
  if (profile.county === me.county) return 2;
  if (profile.region === me.region) return 1;
  return 0;
}

export function communTags(profile: MiniProfileType, me: FullProfileType | null): number {
  if (!me || !me.tags || !profile.tags) return 0;
  return me.tags.filter((tag) => profile.tags!.includes(tag)).length;
};
