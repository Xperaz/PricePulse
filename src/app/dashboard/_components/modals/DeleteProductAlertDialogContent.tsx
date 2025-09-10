"use client";
import { deleteProduct } from "@/app/server/actions/products";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type DeleteProductAlertDialogContentProps = {
  id: string;
};

export function DeleteProductAlertDialogContent({
  id,
}: DeleteProductAlertDialogContentProps) {
  const router = useRouter();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const handleProductDeletion = () => {
    startDeleteTransition(async () => {
      const response = await deleteProduct(id);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.push("/dashboard/products");
      }
    });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the
          product.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction
          disabled={isDeletePending}
          onClick={handleProductDeletion}
          className="cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-red-600"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
