import { removeTrailingSlash } from "@/lib/utils";
import z from "zod";

export const productDetailsFormSchema = z.object({
  name: z.string().min(1, "required"),
  url: z.url().min(1, "required").transform(removeTrailingSlash),
  description: z.string().optional(),
});

export type ProductDetailsDto = z.infer<typeof productDetailsFormSchema>;

export const productCountryDiscountsFormSchema = z.object({
  groups: z.array(
    z.object({
      countryGroupId: z.string().min(1, "required"),
      discountPercentage: z
        .number()
        .min(1)
        .max(100)
        .or(z.nan())
        .transform((val) => (isNaN(val) ? undefined : val))
        .optional(),
      coupon: z.string().optional(),
    })
  ),
});

export type ProductCountryDiscountsDto = z.infer<
  typeof productCountryDiscountsFormSchema
>;
