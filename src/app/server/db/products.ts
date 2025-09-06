import { db } from "@/drizzle/db";
import { ProductCustomizationTable, ProductTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function getProducts(
  userId: string,
  { limit }: { limit?: number }
) {
  return await db.query.ProductTable.findMany({
    where: (products, { eq }) => eq(products.clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    limit,
  });
}

export async function createProduct(data: typeof ProductTable.$inferInsert) {
  const [newProduct] = await db
    .insert(ProductTable)
    .values(data)
    .returning({ id: ProductTable.id });

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

  return newProduct;
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

  return rowCount > 0;
}
