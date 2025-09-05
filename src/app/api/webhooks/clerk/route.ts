import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { env } from "@/data/env/server";
import { db } from "@/drizzle/db";
import { UserSubscriptionTable } from "@/drizzle/schema";
import { createUserSubscription } from "@/app/server/db/subscription";
import { deleteUser } from "@/app/server/db/users";

// const stripe = new Stripe(env.)

export async function POST(req: Request) {
  const headerPayload = headers();
  const svixId = (await headerPayload).get("svix-id");
  const svixTimestamp = (await headerPayload).get("svix-timestamp");
  const svixSignature = (await headerPayload).get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(env.CLERK_WEB_SECRET_HOOK);
  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  switch (event.type) {
    case "user.created": {
      await createUserSubscription({
        clerkUserId: event.data.id,
        tier: "Free",
      });
      break;
    }
    case "user.deleted": {
      if (event.data.id !== null && event.data.id !== undefined) {
        await deleteUser(event.data.id);
        // TODO: Delete Stripe Subscription
      }
      break;
    }
  }

  return new Response("", { status: 200 });
}
