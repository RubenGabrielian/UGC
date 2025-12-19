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

    if (authError) {
      console.error("Auth error in checkout:", {
        message: authError.message,
        status: authError.status,
        name: authError.name,
      });
      return NextResponse.json(
        {
          error: "Unauthenticated",
          details: process.env.NODE_ENV === "development" ? authError.message : undefined
        },
        { status: 401 }
      );
    }

    if (!user) {
      console.error("No user found in checkout route");
      return NextResponse.json(
        { error: "Unauthenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const variant_id = body.variant_id || process.env.LEMONSQUEEZY_VARIANT_ID;

    if (!variant_id) {
      console.error("Missing variant_id:", { body, env: !!process.env.LEMONSQUEEZY_VARIANT_ID });
      return NextResponse.json(
        { error: "variant_id is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;

    if (!apiKey || !storeId) {
      console.error("Missing LemonSqueezy config:", {
        hasApiKey: !!apiKey,
        hasStoreId: !!storeId,
      });
      return NextResponse.json(
        { error: "LemonSqueezy configuration missing" },
        { status: 500 }
      );
    }

    // Ensure IDs are strings (LemonSqueezy requires string IDs)
    const variantIdString = String(variant_id).trim();
    const storeIdString = String(storeId).trim();

    if (!variantIdString || !storeIdString) {
      return NextResponse.json(
        { error: "Invalid variant_id or store_id format" },
        { status: 400 }
      );
    }

    // Create checkout URL via LemonSqueezy API
    const requestBody = {
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
          test_mode: process.env.NODE_ENV !== "production",
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: storeIdString,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: variantIdString,
            },
          },
        },
      },
    };

    // Log request in development for debugging
    if (process.env.NODE_ENV === "development") {
      console.log("LemonSqueezy checkout request:", JSON.stringify(requestBody, null, 2));
    }

    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: await response.text() };
      }

      console.error("LemonSqueezy API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      // Extract error message from LemonSqueezy response
      const errorMessage = errorData?.errors?.[0]?.detail ||
        errorData?.errors?.[0]?.title ||
        errorData?.message ||
        "Failed to create checkout";

      return NextResponse.json(
        {
          error: errorMessage,
          details: process.env.NODE_ENV === "development" ? errorData : undefined
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data?.data?.attributes?.url) {
      console.error("Invalid LemonSqueezy response:", data);
      return NextResponse.json(
        { error: "Invalid response from LemonSqueezy" },
        { status: 500 }
      );
    }

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
