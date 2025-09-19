import { db } from "@/drizzle/db";
import { ProductTable, ProductViewTable } from "@/drizzle/schema";
import {
  CACHE_TAGS,
  dbCache,
  getUserTag,
  revalidateDbCache,
} from "@/lib/cache";
import { and, count, eq, gte } from "drizzle-orm";

export function getProductViewCount(userId: string, startDate: Date) {
  const cacheFn = dbCache(getProductViewCountInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.productViews)],
  });

  return cacheFn(userId, startDate);
}

export async function createProductView({
  productId,
  countryId,
  userId,
}: {
  productId: string;
  countryId?: string;
  userId: string;
}) {
  const [row] = await db
    .insert(ProductViewTable)
    .values({
      productId,
      countryId,
      visitedAt: new Date(),
    })
    .returning({ id: ProductViewTable.id });

  if (row !== null && row !== undefined) {
    revalidateDbCache({
      tag: CACHE_TAGS.productViews,
      userId,
      id: row.id,
    });
  }
}

async function getProductViewCountInternal(userId: string, startDate: Date) {
  const counts = await db
    .select({ pricingViewCount: count() })
    .from(ProductViewTable)
    .innerJoin(ProductTable, eq(ProductTable.id, ProductViewTable.productId))
    .where(
      and(
        eq(ProductTable.clerkUserId, userId),
        gte(ProductViewTable.visitedAt, startDate)
      )
    );

  return counts[0]?.pricingViewCount ?? 0;
}
