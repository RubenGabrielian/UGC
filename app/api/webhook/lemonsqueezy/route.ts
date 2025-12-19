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
    const subscription = data;

    // Log FULL payload for debugging - this will show us the exact structure
    console.log("=== WEBHOOK RECEIVED ===");
    console.log("Event:", eventName);
    console.log("FULL PAYLOAD:", JSON.stringify(payload, null, 2));
    console.log("Subscription ID:", subscription?.id);
    console.log("Subscription status:", subscription?.attributes?.status);

    // Try multiple ways to get user_id from custom_data
    // LemonSqueezy passes custom_data through checkout -> order -> subscription
    const customData = meta.custom_data || {};
    const metaCheckoutData = meta.checkout_data || {};
    const checkoutCustomData = metaCheckoutData.custom || {};

    // Also check in included relationships (orders, checkouts)
    const included = payload.included || [];
    const order = included.find((item: any) => item.type === "orders");
    const orderCustomData = order?.attributes?.first_order_item?.product_options?.custom || {};
    const orderCheckoutData = order?.attributes?.checkout_data?.custom || {};

    // Try to get user_id from different locations
    const userId =
      customData.user_id ||
      checkoutCustomData.user_id ||
      orderCustomData.user_id ||
      orderCheckoutData.user_id ||
      customData.userId ||
      checkoutCustomData.userId ||
      orderCustomData.userId ||
      orderCheckoutData.userId;

    console.log("User ID extracted:", userId);
    console.log("Custom data locations checked:");
    console.log("  - meta.custom_data:", customData);
    console.log("  - meta.checkout_data.custom:", checkoutCustomData);
    console.log("  - order.first_order_item.product_options.custom:", orderCustomData);
    console.log("  - order.checkout_data.custom:", orderCheckoutData);

    // Use admin client to bypass RLS
    let supabase;
    try {
      supabase = createAdminClient();
      console.log("Admin client created successfully");
    } catch (adminError) {
      console.error("Failed to create admin client:", adminError);
      return NextResponse.json(
        { error: "Server configuration error", details: adminError instanceof Error ? adminError.message : String(adminError) },
        { status: 500 }
      );
    }

    // Helper function to find user by subscription_id if userId is missing
    const findUserBySubscriptionId = async (subscriptionId: string) => {
      try {
        const { data: profile, error: findError } = await supabase
          .from("profiles")
          .select("id")
          .eq("subscription_id", subscriptionId)
          .single();

        if (findError) {
          console.log("No profile found with subscription_id:", subscriptionId);
          return null;
        }
        return profile?.id || null;
      } catch (error) {
        console.error("Error finding user by subscription_id:", error);
        return null;
      }
    };

    // Handle different event types with switch statement
    switch (eventName) {
      case "subscription_created": {
        console.log("Processing subscription_created event...");
        const resolvedUserId = userId || await findUserBySubscriptionId(subscription.id);

        if (!resolvedUserId) {
          console.error("No user_id in custom_data and could not find user by subscription_id");
          console.error("Subscription ID:", subscription.id);
          console.error("Custom data:", JSON.stringify(customData, null, 2));
          return NextResponse.json(
            { error: "Missing user_id" },
            { status: 400 }
          );
        }

        console.log(`Updating profile for user ${resolvedUserId}...`);

        // Verify user exists first
        const { data: existingProfile, error: checkError } = await supabase
          .from("profiles")
          .select("id, is_pro")
          .eq("id", resolvedUserId)
          .single();

        if (checkError || !existingProfile) {
          console.error("User profile not found:", checkError);
          return NextResponse.json(
            { error: "User profile not found", userId: resolvedUserId },
            { status: 404 }
          );
        }

        console.log("Current profile state:", existingProfile);

        const updateData = {
          is_pro: true,
          subscription_status: subscription.attributes?.status || "active",
          subscription_id: subscription.id,
          subscription_variant_id: subscription.attributes?.variant_id?.toString() || null,
        };
        console.log("Update data:", JSON.stringify(updateData, null, 2));

        const { error: updateError, data: updatedProfile } = await supabase
          .from("profiles")
          .update(updateData)
          .eq("id", resolvedUserId)
          .select();

        if (updateError) {
          console.error("Error updating profile for subscription_created:", updateError);
          console.error("Error details:", JSON.stringify(updateError, null, 2));
          return NextResponse.json(
            { error: "Failed to update profile", details: updateError.message, code: updateError.code },
            { status: 500 }
          );
        }

        if (!updatedProfile || updatedProfile.length === 0) {
          console.error("Update succeeded but no profile returned");
          return NextResponse.json(
            { error: "Update succeeded but profile not found" },
            { status: 500 }
          );
        }

        console.log(`✅ Subscription created for user ${resolvedUserId}`);
        console.log("Updated profile:", JSON.stringify(updatedProfile, null, 2));
        return NextResponse.json({
          success: true,
          userId: resolvedUserId,
          updated: updatedProfile[0]
        });
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
