import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("LEMONSQUEEZY_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get("X-Signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 401 }
      );
    }

    // Verify signature (LemonSqueezy uses hex HMAC-SHA256)
    const hmac = crypto.createHmac("sha256", webhookSecret);
    const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
    const receivedSignature = Buffer.from(signature, "utf8");

    if (!crypto.timingSafeEqual(digest, receivedSignature)) {
      console.error("Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);
    const { meta, data } = payload;

    if (!meta || !data) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const eventName = meta.event_name;
    const customData = meta.custom_data || {};
    const userId = customData.user_id;
    const subscription = data;

    // Use admin client to bypass RLS
    const supabase = createAdminClient();

    // Helper function to find user by subscription_id if userId is missing
    const findUserBySubscriptionId = async (subscriptionId: string) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("subscription_id", subscriptionId)
        .single();
      return profile?.id || null;
    };

    // Handle different event types with switch statement
    switch (eventName) {
      case "subscription_created": {
        const resolvedUserId = userId || await findUserBySubscriptionId(subscription.id);

        if (!resolvedUserId) {
          console.error("No user_id in custom_data and could not find user by subscription_id");
          return NextResponse.json(
            { error: "Missing user_id" },
            { status: 400 }
          );
        }

        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            is_pro: true,
            subscription_status: subscription.attributes.status || "active",
            subscription_id: subscription.id,
            subscription_variant_id: subscription.attributes.variant_id?.toString(),
          })
          .eq("id", resolvedUserId);

        if (updateError) {
          console.error("Error updating profile for subscription_created:", updateError);
          return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
          );
        }

        console.log(`Subscription created for user ${resolvedUserId}`);
        return NextResponse.json({ success: true });
      }

      case "subscription_updated": {
        const resolvedUserId = userId || await findUserBySubscriptionId(subscription.id);

        if (!resolvedUserId) {
          console.error("No user_id in custom_data and could not find user by subscription_id");
          return NextResponse.json(
            { error: "Missing user_id" },
            { status: 400 }
          );
        }

        // Update status - keep is_pro true if status is still active
        const status = subscription.attributes.status || "active";
        const isPro = status === "active" || status === "trialing";

        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            is_pro: isPro,
            subscription_status: status,
            subscription_id: subscription.id,
            subscription_variant_id: subscription.attributes.variant_id?.toString(),
          })
          .eq("id", resolvedUserId);

        if (updateError) {
          console.error("Error updating profile for subscription_updated:", updateError);
          return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
          );
        }

        console.log(`Subscription updated for user ${resolvedUserId}, status: ${status}`);
        return NextResponse.json({ success: true });
      }

      case "subscription_expired":
      case "subscription_terminated": {
        const resolvedUserId = userId || await findUserBySubscriptionId(subscription.id);

        if (!resolvedUserId) {
          console.error("No user_id in custom_data and could not find user by subscription_id");
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          );
        }

        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            is_pro: false,
            subscription_status: "expired",
          })
          .eq("id", resolvedUserId);

        if (updateError) {
          console.error(`Error updating profile for ${eventName}:`, updateError);
          return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
          );
        }

        console.log(`Subscription ${eventName} for user ${resolvedUserId}`);
        return NextResponse.json({ success: true });
      }

      case "subscription_cancelled": {
        const resolvedUserId = userId || await findUserBySubscriptionId(subscription.id);

        if (!resolvedUserId) {
          console.error("No user_id in custom_data and could not find user by subscription_id");
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          );
        }

        // Subscription is cancelled but may still be active until end of billing period
        const status = subscription.attributes.status || "cancelled";
        const isPro = status === "active"; // Keep pro if still active

        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            is_pro: isPro,
            subscription_status: status,
          })
          .eq("id", resolvedUserId);

        if (updateError) {
          console.error("Error updating profile for subscription_cancelled:", updateError);
          return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
          );
        }

        console.log(`Subscription cancelled for user ${resolvedUserId}`);
        return NextResponse.json({ success: true });
      }

      default:
        // Return success for unhandled events (to avoid retries)
        console.log(`Unhandled webhook event: ${eventName}`);
        return NextResponse.json({ success: true, message: "Event not handled" });
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Disable body parsing for signature verification
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
