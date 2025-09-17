"use server";
import { PaidTierNames, subscriptionTiers } from "@/data/subscriptionTiers";
import { currentUser, User } from "@clerk/nextjs/server";
import { getUserSubscription } from "../db/subscription";
import { Stripe } from "stripe";
import { env as serverEnv } from "@/data/env/server";
import { env as clientEnv } from "@/data/env/client";
import { redirect } from "next/navigation";

const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY);

export async function createCancelSession() {}

export async function createCustomerPortalSession() {}

export async function createCheckoutSession(tier: PaidTierNames) {
  const user = await currentUser();
  if (user === null || user === undefined) {
    return { error: true };
  }

  const subscription = await getUserSubscription(user.id);
  if (
    subscription?.stripeCustomerId === null ||
    subscription?.stripeCustomerId === undefined
  ) {
    const url = await getCheckoutSession(tier, user);
    if (url === null || url === undefined) {
      return { error: true };
    }
    redirect(url);
  } else {
    // TODO: Handle upgrading existing subscriptions
  }
}

async function getCheckoutSession(tier: PaidTierNames, user: User) {
  const session = await stripe.checkout.sessions.create({
    customer_email: user.primaryEmailAddress?.emailAddress,
    subscription_data: {
      metadata: {
        clerkUserId: user.id,
      },
    },
    line_items: [
      {
        price: subscriptionTiers[tier].stripePriceId?.trim() as string,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
    cancel_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
  });

  return session.url;
}
