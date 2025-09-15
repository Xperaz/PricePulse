import { getProductCount } from "@/app/server/db/products";
import { getUserSubscriptionTier } from "@/app/server/db/subscription";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { startOfMonth } from "date-fns";
import { getProductViewCount } from "@/app/server/db/productViews";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/formatters";
import { Progress } from "@/components/ui/progress";
import { subscriptionTiers } from "@/data/subscriptionTiers";
import { Button } from "@/components/ui/button";

export default async function SubscriptionPage() {
  const { userId, redirectToSignIn } = await auth();
  if (userId === null || userId === undefined) {
    return redirectToSignIn();
  }

  const tier = await getUserSubscriptionTier({ userId });
  const productCount = await getProductCount(userId);
  const pricingViewCount = await getProductViewCount(
    userId,
    startOfMonth(new Date())
  );

  const createCustomerPortal = async () => {
    console.log("Creating customer portal link");
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Your Subscription</h1>
      <div className="flex flex-col gap-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Usage</CardTitle>
              <CardDescription>
                {formatCompactNumber(pricingViewCount)} /{" "}
                {formatCompactNumber(tier.maxNumberOfVisits)} pricing page
                visits this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                value={(pricingViewCount / tier.maxNumberOfVisits) * 100}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Number of Products</CardTitle>
              <CardDescription>
                {productCount} / {tier.maxNumberOfProducts} products created
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                value={(productCount / tier.maxNumberOfProducts) * 100}
              />
            </CardContent>
          </Card>
        </div>

        {tier !== subscriptionTiers.Free && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                You are currently on the {tier.name} plan
              </CardTitle>
              <CardDescription>
                If you would like to upgrade, cancel, or changer you payment
                method user the button below.
              </CardDescription>
              <CardContent>
                <form action={createCustomerPortal}>
                  <Button
                    variant="accent"
                    className="text-lg rounded-lg mt-6"
                    size="lg"
                  >
                    Manage Subscription
                  </Button>
                </form>
              </CardContent>
            </CardHeader>
          </Card>
        )}
      </div>
    </>
  );
}
