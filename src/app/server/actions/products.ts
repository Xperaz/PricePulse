"use server";

import {
  ProductDetailsDto,
  productDetailsFormSchema,
} from "@/schemas/products";
import { auth } from "@clerk/nextjs/server";
import { createProduct as dbCreateProduct } from "@/app/server/db/products";
import { redirect } from "next/navigation";

export async function createProduct(payload: ProductDetailsDto) {
  const { userId } = await auth();
  const { success, data } = productDetailsFormSchema.safeParse(payload);

  if (!success || userId === null) {
    return { error: true, message: "There wa an error creating your product." };
  }

  const { id } = await dbCreateProduct({ ...data, clerkUserId: userId });

  redirect(`/dashboard/products/${id}/edit?tab=countries`);
}
