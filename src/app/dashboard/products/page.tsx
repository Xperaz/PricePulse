import { getProducts } from "@/app/server/db/products";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ProductGrid } from "../_components/ProductGrid";

export default async function ProductsPage() {
  const { userId, redirectToSignIn } = await auth();
  if (userId === null) return redirectToSignIn();

  const products = await getProducts(userId);

  if (products === null) return <div>No products found</div>;

  return (
    <>
      <div className="mb-6 flex justify-between">
        <h1 className="text-3xl font-semibold ">Products</h1>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <PlusIcon className="size-4 mr-2" /> New Product
          </Link>
        </Button>
      </div>
      <ProductGrid products={products} />
    </>
  );
}
