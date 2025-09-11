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
    z
      .object({
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
      .refine(
        (value) => {
          const hasCoupon =
            value.coupon !== null &&
            value.coupon !== undefined &&
            value.coupon?.length > 0;
          const hasDiscount =
            value.discountPercentage !== null &&
            value.discountPercentage !== undefined;

          return !(hasCoupon && !hasDiscount);
        },
        {
          message: "A coupon requires a discount %",
          path: ["root"],
        }
      )
  ),
});

export type ProductCountryDiscountsDto = z.infer<
  typeof productCountryDiscountsFormSchema
>;
