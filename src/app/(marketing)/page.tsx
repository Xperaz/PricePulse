import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subscriptionTiersInOrder } from "@/data/subscriptionTiers";
import { formatCompactNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRight, CheckIcon, FunnelX } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen hero-gradient  flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
        {" "}
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">
          Price Smarter, Sell bigger
        </h1>
        <p className="text-lg lg:text-3xl max-w-screen-xl">
          PricePulse is the revenue OS built directly on Stripe so you can
          launch, localize, and optimize any pricing model without touching code
        </p>
        <SignUpButton>
          <Button className="text-lg p-6 rounded-xl flex gap-2 w-full sm:w-auto">
            Get started for free <ArrowRight className="size-5" />
          </Button>
        </SignUpButton>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 flex flex-col gap-16 px-8 md:px-16">
          <h2 className="text-3xl text-center text-balance">
            Trusted by the top modern companies
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-16">
            {/* TODO: Replace with actual logos */}
            logos to be added here
          </div>
        </div>
      </section>

      <section id="pricing" className="px-8 py-16 bg-accent/5">
        <h2 className="text-4xl text-center text-balance font-semibold mb-8">
          Pricing software which pays for itself 20x over.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto ">
          {subscriptionTiersInOrder.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </section>
    </>
  );
}

type PricingCardProps = (typeof subscriptionTiersInOrder)[number];

function PricingCard({
  name,
  priceInCents,
  maxNumberOfProducts,
  maxNumberOfVisits,
  canAccessAnalytics,
  canCustomizeBanner,
  canRemoveBranding,
}: PricingCardProps) {
  const isMostPopular = name === "Standard";
  return (
    <Card>
      <CardHeader>
        <div className="text-accent font-semibold mb-8">{name}</div>
        <CardTitle className="text-xl font-bold">
          ${priceInCents / 100} /mo
        </CardTitle>
        <CardDescription>
          {formatCompactNumber(maxNumberOfVisits)} pricing page visits/mo
        </CardDescription>

        <CardContent>
          <SignUpButton>
            <Button
              variant={isMostPopular ? "accent" : "default"}
              className="text-lg w-full rounded-lg"
            >
              Get Started
            </Button>
          </SignUpButton>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 items-start">
          <Feature>
            {maxNumberOfProducts}{" "}
            {maxNumberOfProducts === 1 ? "product" : "products"}
          </Feature>
          <Feature>Price Pulse discounts</Feature>
          {canAccessAnalytics && <Feature>Analytics access</Feature>}
          {canCustomizeBanner && <Feature>Customizable banner</Feature>}
          {canRemoveBranding && <Feature>Remove PricePulse branding</Feature>}
        </CardFooter>
      </CardHeader>
    </Card>
  );
}

function Feature({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CheckIcon className="size-4 stroke-accent bg-accent/25 rounded-full p-0.5" />
      <span>{children}</span>
    </div>
  );
}
