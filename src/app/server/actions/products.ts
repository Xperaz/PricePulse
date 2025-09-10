"use server";

import {
  ProductDetailsDto,
  productDetailsFormSchema,
} from "@/schemas/products";
import { auth } from "@clerk/nextjs/server";
import { createProduct as dbCreateProduct } from "@/app/server/db/products";
import { redirect } from "next/navigation";
import { deleteProduct as dbDeleteProduct } from "@/app/server/db/products";
import { updateProduct as dbUpdateProduct } from "@/app/server/db/products";

export async function createProduct(payload: ProductDetailsDto) {
  const { userId } = await auth();
  const { success, data } = productDetailsFormSchema.safeParse(payload);

  if (!success || userId === null) {
    return { error: true, message: "There wa an error creating your product." };
  }

  const { id } = await dbCreateProduct({ ...data, clerkUserId: userId });

  redirect(`/dashboard/products/${id}/edit?tab=countries`);
}

export async function updateProduct(payload: ProductDetailsDto, id: string) {
  const { userId } = await auth();
  const { success, data } = productDetailsFormSchema.safeParse(payload);

  if (!success || userId === null) {
    return { error: true, message: "There wa an error creating your product." };
  }

  const isSuccess = await dbUpdateProduct(data, { userId, id });

  return {
    error: !isSuccess,
    message: isSuccess
      ? "Successfully updated your product."
      : "There was an error updating your product.",
  };
}

export async function deleteProduct(id: string) {
  const { userId } = await auth();

  const errorMessage = "There was an error deleting your product.";
  if (userId === null) {
    return {
      error: true,
      message: errorMessage,
    };
  }

  const isSuccess = await dbDeleteProduct({ id, userId });

  return {
    error: !isSuccess,
    message: isSuccess ? "Successfully deleted your product." : errorMessage,
  };
}
