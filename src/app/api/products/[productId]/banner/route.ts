import { getProductForBanner } from "@/app/server/db/products";
import { createProductView } from "@/app/server/db/productViews";
import {
  canRemoveBranding,
  canShowDiscountBanner,
} from "@/app/server/permissions";
import { Banner } from "@/components/Banner";
import { env } from "@/data/env/server";
import { removeTrailingSlash } from "@/lib/utils";
import { ProductCustomizationDto } from "@/types/products";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";
import { createElement } from "react";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const headersMap = headers();
  const requestingUrl =
    (await headersMap).get("referer") || (await headersMap).get("origin");
  if (requestingUrl == null) return notFound();
  const countryCode = getCountryCode(request);
  if (countryCode == null) return notFound();

  const { product, discount, country } = await getProductForBanner({
    id: productId,
    countryCode,
    url: removeTrailingSlash(requestingUrl),
  });

  if (product == null) return notFound();

  const canShowBanner = await canShowDiscountBanner(product.clerkUserId);

  await createProductView({
    productId: product.id,
    countryId: country?.id,
    userId: product.clerkUserId,
  });

  if (!canShowBanner) return notFound();
  if (country == null || discount == null) return notFound();

  const canRemoveBrand = await canRemoveBranding(product.clerkUserId);

  return new Response(
    await getJavaScript(product, country, discount, canRemoveBrand),
    { headers: { "Content-Type": "text/javascript" } }
  );
}

type GeoEnabledRequest = NextRequest & {
  geo?: { country?: string };
};

export function getCountryCode(req: GeoEnabledRequest): string | undefined {
  return (
    req.geo?.country ??
    (process.env.NODE_ENV === "development" ? env.TEST_COUNTRY_CODE : undefined)
  );
}

async function getJavaScript(
  product: {
    customization: Omit<
      ProductCustomizationDto,
      "id" | "productId" | "createdAt" | "updatedAt"
    >;
  },
  country: { name: string },
  discount: { coupon: string; percentage: number },
  canRemoveBrand: boolean
) {
  const { renderToStaticMarkup } = await import("react-dom/server");
  return `
    const banner = document.createElement("div");
    banner.innerHTML = '${renderToStaticMarkup(
      createElement(Banner, {
        message: product.customization.locationMessage,
        mappings: {
          country: country.name,
          coupon: discount.coupon,
          discount: (discount.percentage * 100).toString(),
        },
        customization: product.customization,
        canRemoveBrand,
      })
    )}';
    document.querySelector("${
      product.customization.bannerContainer
    }").prepend(...banner.children);
  `.replace(/(\r\n|\n|\r)/g, "");
}
