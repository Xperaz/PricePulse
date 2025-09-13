"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  productDetailsFormSchema,
  ProductDetailsInputDto,
} from "@/schemas/products";
import { createProduct, updateProduct } from "@/app/server/actions/products";
import { toast } from "sonner";
import { ProductDto } from "@/types/products";

export function ProductDetailsForm({ product }: { product?: ProductDto }) {
  const form = useForm<ProductDetailsInputDto>({
    resolver: zodResolver(productDetailsFormSchema),
    defaultValues: {
      name: product?.name || "",
      url: product?.url || "",
      description: product?.description || "",
    },
  });

  const handleSubmit = async (values: ProductDetailsInputDto) => {
    const action = product
      ? updateProduct(values, product.id)
      : createProduct(values);
    const data = await action;

    if (data.error) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="-mt-6">Product Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-1 md:mt-10 xl:mt-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Enter your website URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-sm text-muted-foreground">
              Make sure to include http:// or https:// and the full path to the
              sales page.
            </span>
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea className="min-h-20 resize-none" {...field} />
              </FormControl>
              <FormDescription className="text-start">
                A short description to help you identify the product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="self-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
