"use server";

import { createClient } from "@/utils/supabase/server";

export async function createCheckout(variantId?: string) {
  // Get Supabase client and user
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      error: "Unauthenticated",
      message: "Please log in to continue.",
    };
  }

  // Get LemonSqueezy configuration
  const finalVariantId = variantId || process.env.LEMONSQUEEZY_VARIANT_ID;
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;

  if (!finalVariantId || !apiKey || !storeId) {
    return {
      error: "Configuration Error",
      message: "Checkout is not properly configured.",
    };
  }

  // Create checkout via LemonSqueezy API
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
            id: String(storeId).trim(),
          },
        },
        variant: {
          data: {
            type: "variants",
            id: String(finalVariantId).trim(),
          },
        },
      },
    },
  };

  try {
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
      const errorData = await response.json().catch(() => ({ message: "Failed to create checkout" }));
      const errorMessage = errorData?.errors?.[0]?.detail || errorData?.message || "Failed to create checkout";
      return {
        error: errorMessage,
        message: errorMessage,
      };
    }

    const data = await response.json();

    if (!data?.data?.attributes?.url) {
      return {
        error: "Invalid Response",
        message: "Failed to create checkout. Please try again.",
      };
    }

    return {
      success: true,
      checkout_url: data.data.attributes.url,
    };
  } catch (error) {
    return {
      error: "Network Error",
      message: error instanceof Error ? error.message : "Failed to create checkout.",
    };
  }
} 