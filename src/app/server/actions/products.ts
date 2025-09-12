"use server";

import {
  ProductCountryDiscountsDto,
  productCountryDiscountsFormSchema,
  ProductDetailsDto,
  productDetailsFormSchema,
} from "@/schemas/products";
import { auth } from "@clerk/nextjs/server";
import { createProduct as dbCreateProduct } from "@/app/server/db/products";
import { redirect } from "next/navigation";
import { deleteProduct as dbDeleteProduct } from "@/app/server/db/products";
import { updateProduct as dbUpdateProduct } from "@/app/server/db/products";
import { updateCountryDiscounts as DbUpdateCountryDiscounts } from "@/app/server/db/products";

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

export async function updateCountryDiscounts(
  id: string,
  unsafeData: ProductCountryDiscountsDto
) {
  const { userId } = await auth();
  const { success, data } =
    productCountryDiscountsFormSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return {
      error: true,
      message: "There was an error saving your country discounts",
    };
  }

  const insert: {
    countryGroupId: string;
    productId: string;
    coupon: string;
    discountPercentage: number;
  }[] = [];
  const deleteIds: { countryGroupId: string }[] = [];

  data.groups.forEach((group) => {
    if (
      group.coupon != null &&
      group.coupon.length > 0 &&
      group.discountPercentage != null &&
      group.discountPercentage > 0
    ) {
      insert.push({
        countryGroupId: group.countryGroupId,
        coupon: group.coupon,
        discountPercentage: group.discountPercentage / 100,
        productId: id,
      });
    } else {
      deleteIds.push({ countryGroupId: group.countryGroupId });
    }
  });

  const isSuccess = await DbUpdateCountryDiscounts(deleteIds, insert, {
    productId: id,
    userId,
  });

  return {
    error: !isSuccess,
    message: isSuccess
      ? "Successfully updated country discounts."
      : "There was an error saving your country discounts",
  };
}
