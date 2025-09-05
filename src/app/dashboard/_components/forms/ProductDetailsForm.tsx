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
  ProductDetailsDto,
  productDetailsFormSchema,
} from "@/schemas/products";
import { createProduct } from "@/app/server/actions/products";
import { toast } from "sonner";

export function ProductDetailsForm() {
  const form = useForm<ProductDetailsDto>({
    resolver: zodResolver(productDetailsFormSchema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
    },
  });

  const handleSubmit = async (values: ProductDetailsDto) => {
    const data = await createProduct(values);

    if (data.error) {
      toast.error("There was an error creating your product.");
    } else {
      toast.success("Product created successfully!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your website URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription className="text-start">
                  Make sure to include http:// or https:// and the full path to
                  the sales page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
