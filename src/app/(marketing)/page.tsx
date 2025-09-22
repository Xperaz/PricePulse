import { BrandLogo } from "@/components/BrandLogo";
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
import { ArrowRight, CheckIcon } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { MarqueSlider } from "./_components/MarqueSlider";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 flex flex-col gap-16 px-8 md:px-16">
          <h2 className="text-3xl text-center text-balance">
            Trusted by the top modern companies
          </h2>

          <div className="w-full">
            <MarqueSlider />
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

      <footer className="container pt-16 pb-8 flex flex-col sm:flex-row gap-8 sm:gap-4 justify-between items-start">
        <Link href="/">
          <BrandLogo />
        </Link>
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex flex-col gap-8">
            <FooterLinkGroup
              title="Help"
              links={[
                { label: "PricePulse Discounts", href: "#" },
                { label: "Discount API", href: "#" },
              ]}
            />
            <FooterLinkGroup
              title="Solutions"
              links={[
                { label: "Newsletter", href: "#" },
                { label: "SaaS Business", href: "#" },
                { label: "Online Courses", href: "#" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-8">
            <FooterLinkGroup
              title="Features"
              links={[{ label: "PPP Discounts", href: "#" }]}
            />
            <FooterLinkGroup
              title="Tools"
              links={[
                { label: "Salary Converter", href: "#" },
                { label: "Coupon Generator", href: "#" },
                { label: "Stripe App", href: "#" },
              ]}
            />
            <FooterLinkGroup
              title="Company"
              links={[
                { label: "Affiliate", href: "#" },
                { label: "Twitter", href: "#" },
                { label: "Terms of Service", href: "#" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-8">
            <FooterLinkGroup
              title="Integrations"
              links={[
                { label: "Lemon Squeezy", href: "#" },
                { label: "Gumroad", href: "#" },
                { label: "Stripe", href: "#" },
                { label: "Chargebee", href: "#" },
                { label: "Paddle", href: "#" },
              ]}
            />
            <FooterLinkGroup
              title="Tutorials"
              links={[
                { label: "Any Website", href: "#" },
                { label: "Lemon Squeezy", href: "#" },
                { label: "Gumroad", href: "#" },
                { label: "Stripe", href: "#" },
                { label: "Chargebee", href: "#" },
                { label: "Paddle", href: "#" },
              ]}
            />
          </div>
        </div>
      </footer>
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative flex items-center justify-center px-4 pt-28 pb-28 min-h-[92vh] overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl opacity-50" />
        <div className="absolute left-1/2 top-1/2 size-[1200px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.primary/8),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-10 text-center">
        {/* Announcement */}
        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/60 backdrop-blur px-4 py-1 text-xs font-medium text-muted-foreground shadow-sm">
          <span className="inline-flex items-center gap-1 text-primary">
            <span className="size-2 rounded-full bg-green-500 animate-pulse" />{" "}
            Live Beta
          </span>
          <span className="hidden sm:inline">
            Founders save hours on pricing ops
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-bold tracking-tight text-balance text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] bg-gradient-to-br from-foreground via-foreground to-foreground/60 dark:from-white dark:via-white dark:to-white/60 bg-clip-text text-transparent">
          Price smarter.
          <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Scale faster.
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-3xl text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
          The adaptive pricing OS built on Stripe: launch experiments, localize
          with purchasing power parity, and optimize revenue without touching
          backend code.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <SignUpButton>
            <Button
              size="lg"
              className="h-14 px-8 text-base font-medium rounded-xl shadow-md shadow-primary/25"
            >
              Get started free <ArrowRight className="size-5 ml-1" />
            </Button>
          </SignUpButton>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base rounded-xl border-border/60 backdrop-blur cursor-not-allowed opacity-60"
                    disabled
                    aria-disabled="true"
                    data-disabled
                  >
                    View demo
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs text-center">
                Demo preview coming soon
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Social proof / stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-2 text-left w-full max-w-3xl">
          <Stat label="Deploy in" value="&lt;5 min" />
          <Stat label="Average lift" value="18% ARR" />
          <Stat
            label="Global coverage"
            value="190+ locales"
            className="col-span-2 sm:col-span-1"
          />
        </div>

        {/* Preview panel */}
        <div className="w-full max-w-5xl relative mt-4">
          <div className="group rounded-2xl border border-border/60 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur p-6 shadow-xl shadow-black/5">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="flex-1 space-y-3 text-left">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Real‑time Geo Pricing
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Customers in Brazil, India, and 40+ emerging markets see
                  localized pricing & dynamic discount banners powered by live
                  PPP data and your Stripe products.
                </p>
                <div className="flex gap-3 pt-1">
                  <BadgePill label="PPP Adjust" />
                  <BadgePill label="Coupons" />
                  <BadgePill label="A/B Tests" />
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="relative rounded-xl border border-zinc-800/70 bg-gradient-to-br from-zinc-950/90 to-zinc-900/80 dark:from-zinc-900 dark:to-zinc-900/60 backdrop-blur-sm p-0 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800/60 text-[10px] uppercase tracking-wide text-zinc-400/90 bg-zinc-900/60">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Embed Script
                  </div>
                  <div className="p-4 pt-3 font-mono text-[11px] leading-relaxed text-left text-zinc-300/90">
                    <pre className="whitespace-pre-wrap break-all">{`<script src="https://cdn.pricepulse.dev/banner.js" data-product="prod_123" data-theme="dark"></script>`}</pre>
                    <div className="mt-4 rounded-lg border border-zinc-800/60 bg-zinc-950/70 px-3 py-2 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        You are From
                        <span className="inline-flex items-center rounded-md bg-primary/15 text-accent px-1.5 py-0.5 text-[10px] font-medium shadow-sm">
                          BR
                        </span>
                        <span className="text-zinc-400">
                          You save{" "}
                          <span className="text-accent font-medium">35%</span>{" "}
                          with PPP
                        </span>
                      </div>
                      <span className="font-semibold text-accent">$12.99</span>
                    </div>
                    <div className="mt-2 text-[10px] text-zinc-400">
                      (Auto‑localizes pricing + discount banner based on visitor
                      geo)
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/10" />
                </div>
              </div>
            </div>
          </div>
          {/* Glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-2xl opacity-30" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-lg font-semibold text-foreground">{value}</span>
    </div>
  );
}

function BadgePill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[10px] font-medium tracking-wide text-muted-foreground backdrop-blur">
      {label}
    </span>
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
    <Card
      className={cn(
        "relative shadow-none rounded-3xl overflow-hidden",
        isMostPopular ? "border-accent border-2" : "border-none"
      )}
    >
      {isMostPopular && (
        <div className="bg-accent text-accent-foreground absolute py-1 px-10 -right-8 top-24 rotate-45 origin-top-right">
          Most popular
        </div>
      )}
      <CardHeader>
        <div className="text-accent font-semibold mb-8">{name}</div>
        <CardTitle className="text-xl font-bold">
          ${priceInCents / 100} /mo
        </CardTitle>
        <CardDescription>
          {formatCompactNumber(maxNumberOfVisits)} pricing page visits/mo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpButton>
          <Button
            className="text-lg w-full rounded-lg"
            variant={isMostPopular ? "accent" : "default"}
          >
            Get Started
          </Button>
        </SignUpButton>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 items-start">
        <Feature className="font-bold">
          {maxNumberOfProducts}{" "}
          {maxNumberOfProducts === 1 ? "product" : "products"}
        </Feature>
        <Feature>PPP discounts</Feature>
        {canAccessAnalytics && <Feature>Advanced analytics</Feature>}
        {canRemoveBranding && <Feature>Remove Easy PPP branding</Feature>}
        {canCustomizeBanner && <Feature>Banner customization</Feature>}
      </CardFooter>
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

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold self-start">{title}</h3>
      <ul className="flex flex-col text-sm text-muted-foreground items-start">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
