import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductDto } from "@/types/products";
import { DialogTrigger } from "@radix-ui/react-dialog";

import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { AddToSiteProductModalContent } from "./modals/AddToSiteProductModalContent";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DeleteProductAlertDialogContent } from "./modals/DeleteProductAlertDialogContent";

export function ProductGrid({ products }: { products: ProductDto[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: ProductDto }) {
  const { id, name, url, description } = product;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-end gap-2">
          <CardTitle>
            <Link href={`/dashboard/products/${id}`}>{name}</Link>
          </CardTitle>
          <Dialog>
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="size-8 p-0 cursor-pointer"
                  >
                    <div className="sr-only">Action Menu</div>
                    <Ellipsis className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 flex flex-col gap-2 items-start">
                  <DropdownMenuItem asChild className=" hover:outline-none">
                    <Link href={`/dashboard/products/${id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer hover:outline-none">
                      Add To Site{" "}
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-red-500 cursor-pointer hover:outline-none">
                      Delete{" "}
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeleteProductAlertDialogContent id={id} />
            </AlertDialog>
            <AddToSiteProductModalContent id={id} />
          </Dialog>
        </div>
        <CardDescription>{url}</CardDescription>
      </CardHeader>
      {description && <CardContent>{description}</CardContent>}
    </Card>
  );
}
