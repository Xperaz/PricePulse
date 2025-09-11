import { revalidateTag, unstable_cache } from "next/cache";
import { cache } from "react";

export type ValidTags =
  | ReturnType<typeof getGlobalTag>
  | ReturnType<typeof getUserTag>
  | ReturnType<typeof getIdTag>;

export const CACHE_TAGS = {
  products: "products",
  productViews: "productViews",
  subscription: "subscription",
  countries: "countries",
  countryGroups: "countryGroups",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export function getGlobalTag(tag: CacheTag) {
  return `global:${CACHE_TAGS[tag]}` as const;
}

export function getUserTag(userId: string, tag: CacheTag) {
  return `user:${userId}-${CACHE_TAGS[tag]}` as const;
}

export function getIdTag(id: string, tag: CacheTag) {
  return `id:${id}-${CACHE_TAGS[tag]}` as const;
}

export function clearFullCache() {
  revalidateTag("*");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbCache<T extends (...args: any[]) => Promise<any>>(
  cb: Parameters<typeof unstable_cache<T>>[0],
  { tags }: { tags: ValidTags[] }
) {
  return cache(unstable_cache<T>(cb, undefined, { tags: [...tags, "*"] }));
}

export function revalidateDbCache({
  tag,
  userId,
  id,
}: {
  tag: CacheTag;
  userId?: string;
  id?: string;
}) {
  revalidateTag(getGlobalTag(tag));
  if (userId !== null && userId !== undefined) {
    revalidateTag(getUserTag(userId, tag));
  }
  if (id !== null && id !== undefined) {
    revalidateTag(getIdTag(id, tag));
  }
}
