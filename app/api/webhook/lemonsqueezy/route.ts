import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
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
    const supabase = await createClient();

    // Handle different event types
    if (eventName === "subscription_created" || eventName === "subscription_updated") {
      const subscription = data;

      if (!userId) {
        console.error("No user_id in custom_data");
        return NextResponse.json(
          { error: "Missing user_id" },
          { status: 400 }
        );
      }

      // Update user profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          is_pro: true,
          subscription_status: subscription.attributes.status,
          subscription_id: subscription.id,
          subscription_variant_id: subscription.attributes.variant_id?.toString(),
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        return NextResponse.json(
          { error: "Failed to update profile" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
      const subscription = data;

      if (!userId) {
        // Try to find user by subscription_id
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("subscription_id", subscription.id)
          .single();

        if (profile) {
          const { error: updateError } = await supabase
            .from("profiles")
            .update({
              is_pro: false,
              subscription_status: subscription.attributes.status,
            })
            .eq("id", profile.id);

          if (updateError) {
            console.error("Error updating profile:", updateError);
            return NextResponse.json(
              { error: "Failed to update profile" },
              { status: 500 }
            );
          }

          return NextResponse.json({ success: true });
        }

        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          is_pro: false,
          subscription_status: subscription.attributes.status,
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        return NextResponse.json(
          { error: "Failed to update profile" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // Return success for unhandled events (to avoid retries)
    return NextResponse.json({ success: true, message: "Event not handled" });
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
