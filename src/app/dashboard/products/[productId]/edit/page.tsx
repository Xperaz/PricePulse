import { ProductDetailsForm } from "@/app/dashboard/_components/forms/ProductDetailsForm";
import { PageWithBackButton } from "@/app/dashboard/_components/PageWithBackButton";
import { getProduct } from "@/app/server/db/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  if (product === null) return notFound();

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
          {/* @ts-expect-error Server Component */}
          <DetailsTab product={product} />
        </TabsContent>

        <TabsContent value="country" className="mt-6">
          {/* @ts-expect-error Server Component */}
          <CountryTab product={product} />
        </TabsContent>

        <TabsContent value="customization" className="mt-6">
          {/* @ts-expect-error Server Component */}
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

const CountryTab = ({ product }: { product: ProductDto }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Product Country</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Country form will go here</div>
      </CardContent>
    </Card>
  );
};

const CustomizationTab = ({ product }: { product: ProductDto }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Product Customization</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Customization form will go here</div>
      </CardContent>
    </Card>
  );
};
