import { db } from "@/drizzle/db";

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
