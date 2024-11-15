import { UserType, MiniProfileType, UserTagsType } from '../appConfig/interface';

export function calculateDistance(
  profile: MiniProfileType,
  user: UserType | null,
): number {
  if (!user) return 0;
  if (profile.town === user.town) return 3;
  if (profile.county === user.county) return 2;
  if (profile.region === user.region) return 1;
  return 0;
}

export function communTags(
  profile: MiniProfileType,
  tags: UserTagsType[] | null,
): number {
  if (!tags || !profile.tags) return 0;
  const userTagName = tags.map((tag) => tag.tagName);
  return userTagName.filter((tagName) => profile.tags!.includes(tagName)).length;
}
