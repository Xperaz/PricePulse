import { TierNames } from "@/data/subscriptionTiers";

export type SubscriptionDto = {
  id: string;
  clerkUserId: string;
  createdAt: Date;
  updatedAt: Date;
  tier: TierNames;
  stripeSubscriptionItemId: string | null;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
};
