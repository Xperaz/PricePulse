"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ProductCountryDiscountsInputDto,
  productCountryDiscountsFormSchema,
} from "@/schemas/products";
import { CountryGroupDto } from "@/types/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { updateCountryDiscounts } from "@/app/server/actions/products";
import { toast } from "sonner";

type CountryDiscountsFormProps = {
  countryGroups: CountryGroupDto[];
  productId: string;
};

export function CountryDiscountsForm({
  countryGroups,
  productId,
}: CountryDiscountsFormProps) {
  const form = useForm<ProductCountryDiscountsInputDto>({
    resolver: zodResolver(productCountryDiscountsFormSchema),
    defaultValues: {
      groups: countryGroups.map((group) => {
        const discount =
          group.discount?.discountPercentage ??
          group.recommendedDiscountPercentage;

        return {
          countryGroupId: group.id,
          discountPercentage: discount !== null ? discount * 100 : undefined,
          coupon: group.discount?.coupon || "",
        };
      }),
    },
  });

  const handleSubmit = async (values: ProductCountryDiscountsInputDto) => {
    const response = await updateCountryDiscounts(productId, values);
    if (!response.error) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        {countryGroups.map((group, index) => (
          <Card key={group.id}>
            <CardContent className="pt-6 flex gap-16 items-center">
              <div>
                <h2>{group.name}</h2>
                <div className="flex gap-2 flex-wrap">
                  {group.countries.map((country) => (
                    <Image
                      key={country.code}
                      width={24}
                      height={16}
                      alt={country.name}
                      title={country.name}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code.toUpperCase()}.svg`}
                      className="border"
                    />
                  ))}
                </div>
              </div>

              <Input
                type="hidden"
                {...form.register(`groups.${index}.countryGroupId`)}
              />

              <div className="ml-auto flex-shrink-0 flex gap-2 flex-col w-min">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`groups.${index}.discountPercentage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount %</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="w-48"
                            {...field}
                            value={field.value?.toFixed(2) ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                            min={0}
                            max={100}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`groups.${index}.coupon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coupon</FormLabel>
                        <FormControl>
                          <Input className="w-48" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormMessage>
                  {form.formState.errors.groups?.[index]?.root?.message}
                </FormMessage>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="self-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save Discounts
          </Button>
        </div>
      </form>
    </Form>
  );
}
