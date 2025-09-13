import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageWithBackButton } from "../../_components/PageWithBackButton";
import { ProductDetailsForm } from "../../_components/forms/ProductDetailsForm";
import { HasPermission } from "@/components/HasPermission";
import { canCreateProduct } from "@/app/server/permissions";

export default function NewProductPage() {
  return (
    <HasPermission
      permission={canCreateProduct}
      renderFallback
      fallbackText="You have reached the maximum number of products allowed on your current plan. Please upgrade to create more products."
    >
      <PageWithBackButton
        pageTitle="Create Product"
        backButtonHref="/dashboard/products"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductDetailsForm />
          </CardContent>
        </Card>
      </PageWithBackButton>
    </HasPermission>
  );
}
