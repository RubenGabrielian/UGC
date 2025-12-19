import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const variant_id = body.variant_id || process.env.LEMONSQUEEZY_VARIANT_ID;

    if (!variant_id) {
      return NextResponse.json(
        { error: "variant_id is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;

    if (!apiKey || !storeId) {
      return NextResponse.json(
        { error: "LemonSqueezy configuration missing" },
        { status: 500 }
      );
    }

    // Create checkout URL via LemonSqueezy API
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            product_options: {
              name: "CreatorKit Pro",
              description: "Pro plan subscription for CreatorKit",
            },
            checkout_options: {
              embed: true,
              media: false,
              logo: false,
            },
            checkout_data: {
              custom: {
                user_id: user.id,
              },
            },
            preview: true,
            test_mode: process.env.NODE_ENV !== "production",
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: storeId,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: variant_id,
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("LemonSqueezy API error:", errorData);
      return NextResponse.json(
        { error: "Failed to create checkout" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const checkoutUrl = data.data.attributes.url;

    return NextResponse.json({ checkout_url: checkoutUrl });
  } catch (error) {
    console.error("Checkout creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
