"use client";
import { updateProductCustomization } from "@/app/server/actions/products";
import { Banner } from "@/components/Banner";
import { NoPermissionCard } from "@/components/NoPermissionCard";
import { RequiredLabelIcon } from "@/components/RequiredLabelIcon";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  productCustomizationFormSchema,
  ProductCustomizationInputDto,
} from "@/schemas/products";
import { ProductCustomizationDto } from "@/types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ProductCustomizationFormProps = {
  customization: ProductCustomizationDto;
  canRemoveBrand: boolean;
  canCustomizeBanner: boolean;
};

export function ProductCustomizationForm({
  customization,
  canRemoveBrand,
  canCustomizeBanner,
}: ProductCustomizationFormProps) {
  console.log({ customization });
  const form = useForm<ProductCustomizationInputDto>({
    resolver: zodResolver(productCustomizationFormSchema),
    defaultValues: {
      ...customization,
      classPrefix: customization.classPrefix ?? "",
    },
  });

  const handleSubmit = async (values: ProductCustomizationInputDto) => {
    const response = await updateProductCustomization(
      customization.productId,
      values
    );
    if (!response?.error) {
      toast.success(response.message);
    } else {
      toast.error(
        response?.message ?? "There was an error saving your changes."
      );
    }
  };

  const formValues = form.watch();

  return (
    <>
      <Banner
        message={formValues.locationMessage}
        mappings={{
          country: "United States",
          coupon: "SUMMER21",
          discount: "20",
        }}
        customization={formValues}
        canRemoveBrand={canRemoveBrand}
      />

      {!canCustomizeBanner && <NoPermissionCard />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex gap-6 flex-col mt-8"
        >
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="locationMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Price Pulse Discount Message
                    <RequiredLabelIcon />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={!canCustomizeBanner}
                      className="min-h-20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {`Data Parameters; {country}, {coupon}, {discount}`}
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Background Color
                      <RequiredLabelIcon />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={!canCustomizeBanner} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="textColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Text Color
                      <RequiredLabelIcon />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={!canCustomizeBanner} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Font Size
                      <RequiredLabelIcon />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={!canCustomizeBanner} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isSticky"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Sticky?
                      <RequiredLabelIcon />
                    </FormLabel>
                    <FormControl>
                      <Switch
                        className="block"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!canCustomizeBanner}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bannerContainer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Banner Container
                      <RequiredLabelIcon />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={!canCustomizeBanner} {...field} />
                    </FormControl>
                    <FormDescription>
                      HTML element selector where the banner will be injected.
                      (e.g. body, #root)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classPrefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      CSS Class Prefix
                      <RequiredLabelIcon />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={!canCustomizeBanner} {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional prefix add to all CSS classes to avoid conflicts.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {canCustomizeBanner && (
            <div className="self-end">
              <Button disabled={form.formState.isSubmitting} type="submit">
                Save
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
}
