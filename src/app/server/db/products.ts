import { db } from "@/drizzle/db";
import {
  CountryGroupDiscountTable,
  ProductCustomizationTable,
  ProductTable,
} from "@/drizzle/schema";
import {
  CACHE_TAGS,
  dbCache,
  getGlobalTag,
  getIdTag,
  getUserTag,
  revalidateDbCache,
} from "@/lib/cache";
import { and, eq, inArray, sql } from "drizzle-orm";
import { BatchItem } from "drizzle-orm/batch";

export function getProductCountryGroups({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) {
  const cacheFn = dbCache(getProductCountryGroupsInternal, {
    tags: [getIdTag(userId, CACHE_TAGS.products)],
  });

  return cacheFn({ userId, productId });
}

export function getProductCustomization({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) {
  const cacheFn = dbCache(getProductCustomizationInternal, {
    tags: [
      getIdTag(userId, CACHE_TAGS.products),
      getGlobalTag(CACHE_TAGS.countries),
      getGlobalTag(CACHE_TAGS.countryGroups),
    ],
  });

  return cacheFn({ userId, productId });
}

export function getProducts(userId: string, { limit }: { limit?: number }) {
  const cacheFn = dbCache(getInternalProducts, {
    tags: [getUserTag(userId, CACHE_TAGS.products)],
  });

  return cacheFn(userId, { limit });
}

export function getProduct({ id, userId }: { id: string; userId: string }) {
  const cacheFn = dbCache(getInternalProduct, {
    tags: [getIdTag(userId, CACHE_TAGS.products)],
  });

  return cacheFn({ id, userId });
}

export async function createProduct(data: typeof ProductTable.$inferInsert) {
  const [newProduct] = await db
    .insert(ProductTable)
    .values(data)
    .returning({ id: ProductTable.id, userId: ProductTable.clerkUserId });

  try {
    await db
      .insert(ProductCustomizationTable)
      .values({
        productId: newProduct.id,
      })
      .onConflictDoNothing({
        target: ProductCustomizationTable.productId,
      });
  } catch (error) {
    await db.delete(ProductTable).where(eq(ProductTable.id, newProduct.id));
    throw error;
  }

  revalidateDbCache({
    tag: CACHE_TAGS.products,
    userId: newProduct.userId,
    id: newProduct.id,
  });

  return newProduct;
}

export async function updateProduct(
  data: Partial<typeof ProductTable.$inferInsert>,
  { id, userId }: { id: string; userId: string }
) {
  const { rowCount } = await db
    .update(ProductTable)
    .set(data)
    .where(and(eq(ProductTable.id, id), eq(ProductTable.clerkUserId, userId)));

  if (rowCount > 0) {
    revalidateDbCache({
      tag: CACHE_TAGS.products,
      userId,
      id,
    });
  }

  return rowCount > 0;
}

export async function deleteProduct({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const { rowCount } = await db
    .delete(ProductTable)
    .where(and(eq(ProductTable.id, id), eq(ProductTable.clerkUserId, userId)));

  revalidateDbCache({ tag: CACHE_TAGS.products, userId, id });

  return rowCount > 0;
}

export async function updateCountryDiscounts(
  deleteGroup: { countryGroupId: string }[],
  insertGroup: (typeof CountryGroupDiscountTable.$inferInsert)[],
  { productId, userId }: { productId: string; userId: string }
) {
  const product = await getProduct({ id: productId, userId });
  if (product == null) return false;

  const statements: BatchItem<"pg">[] = [];
  if (deleteGroup.length > 0) {
    statements.push(
      db.delete(CountryGroupDiscountTable).where(
        and(
          eq(CountryGroupDiscountTable.productId, productId),
          inArray(
            CountryGroupDiscountTable.countryGroupId,
            deleteGroup.map((group) => group.countryGroupId)
          )
        )
      )
    );
  }

  console.log("insertGroup", insertGroup);

  if (insertGroup.length > 0) {
    statements.push(
      db
        .insert(CountryGroupDiscountTable)
        .values(insertGroup)
        .onConflictDoUpdate({
          target: [
            CountryGroupDiscountTable.productId,
            CountryGroupDiscountTable.countryGroupId,
          ],
          set: {
            coupon: sql.raw(
              `EXCLUDED.${CountryGroupDiscountTable.coupon.name}`
            ),
            discountPercentage: sql.raw(
              `EXCLUDED.${CountryGroupDiscountTable.discountPercentage.name}`
            ),
          },
        })
    );
  }

  if (statements.length > 0) {
    await db.batch(statements as [BatchItem<"pg">]);
  }

  revalidateDbCache({
    tag: CACHE_TAGS.products,
    userId,
    id: productId,
  });

  return true;
}

export async function updateProductCustomization(
  data: Partial<typeof ProductCustomizationTable.$inferInsert>,
  { productId, userId }: { productId: string; userId: string }
) {
  const product = await getProduct({ id: productId, userId });
  if (product == null) return false;

  const { rowCount } = await db
    .update(ProductCustomizationTable)
    .set(data)
    .where(eq(ProductCustomizationTable.productId, productId));

  if (rowCount > 0) {
    revalidateDbCache({
      tag: CACHE_TAGS.products,
      userId,
      id: productId,
    });
  }

  return rowCount > 0;
}

async function getProductCountryGroupsInternal({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) {
  const product = await getProduct({ id: productId, userId });

  if (product === null) return [];

  const data = await db.query.CountryGroupTable.findMany({
    with: {
      countries: {
        columns: {
          code: true,
          name: true,
        },
      },
      countryGroupDiscounts: {
        columns: {
          coupon: true,
          discountPercentage: true,
        },
        where: ({ productId: id }, { eq }) => eq(id, productId),
        limit: 1,
      },
    },
  });

  return data.map((group) => ({
    id: group.id,
    name: group.name,
    recommendedDiscountPercentage: group.recommendedDiscountPercentage,
    countries: group.countries,
    discount: group.countryGroupDiscounts.at(0),
  }));
}

async function getInternalProducts(
  userId: string,
  { limit }: { limit?: number }
) {
  return await db.query.ProductTable.findMany({
    where: (products, { eq }) => eq(products.clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    limit,
  });
}

async function getInternalProduct({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  return await db.query.ProductTable.findFirst({
    where: ({ clerkUserId, id: idCol }, { eq, and }) =>
      and(eq(clerkUserId, userId), eq(idCol, id)),
  });
}

async function getProductCustomizationInternal({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) {
  const data = await db.query.ProductTable.findFirst({
    where: ({ id, clerkUserId }, { eq, and }) =>
      and(eq(id, productId), eq(clerkUserId, userId)),
    with: {
      customizations: true,
    },
  });

  return data?.customizations;
}
