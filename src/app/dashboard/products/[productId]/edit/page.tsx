import { CountryDiscountsForm } from "@/app/dashboard/_components/forms/CountryDiscountsForm";
import { ProductDetailsForm } from "@/app/dashboard/_components/forms/ProductDetailsForm";
import { PageWithBackButton } from "@/app/dashboard/_components/PageWithBackButton";
import {
  getProduct,
  getProductCountryGroups,
  getProductCustomization,
} from "@/app/server/db/products";
import { canRemoveBranding } from "@/app/server/permissions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountryGroupDto } from "@/types/countries";
import { ProductDto } from "@/types/products";
import { auth } from "@clerk/nextjs/server";
import { TabsContent } from "@radix-ui/react-tabs";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params: { productId },
  searchParams: { tab = "details" },
}: {
  params: { productId: string };
  searchParams: { tab?: string };
}) {
  const { userId, redirectToSignIn } = await auth();
  if (userId === null) return redirectToSignIn();

  const product = await getProduct({ id: productId, userId });
  if (product === null || product === undefined) return notFound();

  return (
    <PageWithBackButton
      backButtonHref="/dashboard/products"
      pageTitle="Edit Product"
    >
      <Tabs defaultValue={tab}>
        <TabsList className="bg-background/60">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="country">Country</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <DetailsTab product={product} />
        </TabsContent>

        <TabsContent value="country" className="mt-6">
          <CountryTab product={product} />
        </TabsContent>

        <TabsContent value="customization" className="mt-6">
          <CustomizationTab product={product} />
        </TabsContent>
      </Tabs>
    </PageWithBackButton>
  );
}

const DetailsTab = ({ product }: { product: ProductDto }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductDetailsForm product={product} />
      </CardContent>
    </Card>
  );
};

async function CountryTab({ product }: { product: ProductDto }) {
  const countryGroups: CountryGroupDto[] = await getProductCountryGroups({
    userId: product.clerkUserId,
    productId: product.id,
  });

  if (countryGroups.length === 0) {
    return <div>No country groups found.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Product Discounts</CardTitle>
        <CardDescription>
          Leave the discount field empty if you do not want to display deals for
          any specific parity group.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CountryDiscountsForm
          countryGroups={countryGroups}
          productId={product.id}
        />
      </CardContent>
    </Card>
  );
}

async function CustomizationTab({ product }: { product: ProductDto }) {
  const customizations = await getProductCustomization({
    userId: product.clerkUserId,
    productId: product.id,
  });

  if (customizations === null) return notFound();

  const canRemoveBrand = await canRemoveBranding(product.clerkUserId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Banner Customization</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Customization form will go here</div>
      </CardContent>
    </Card>
  );
}
