import { removeTrailingSlash } from "@/lib/utils";
import z from "zod";

export const productDetailsFormSchema = z.object({
  name: z.string().min(1, "required"),
  url: z.url().min(1, "required").transform(removeTrailingSlash),
  description: z.string().optional(),
});

export type ProductDetailsDto = z.infer<typeof productDetailsFormSchema>;
