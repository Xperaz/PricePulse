import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export function NoProducts() {
  return (
    <div className="mt-32 text-center text-balanced">
      <h1 className="text-4xl font-semibold mb-2"> You have no products</h1>
      <p className="mb-4">Get started with Price Pulse by creating a product</p>

      <Button size="lg" asChild>
        <Link href="/dashboard/products/new">Add product</Link>
      </Button>
    </div>
  );
}
