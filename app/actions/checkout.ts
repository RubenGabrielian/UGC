"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function createCheckout(variantId?: string) {
  console.log("=== CHECKOUT ACTION START ===");
  console.log("Input params:", { variantId });

  try {
    // Debug: Check which cookies are present
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieNames = allCookies.map(c => c.name);
    console.log("Cookies present:", cookieNames);
    console.log("Supabase-related cookies:", cookieNames.filter(name =>
      name.includes("supabase") || name.includes("sb-")
    ));

    const supabase = await createClient();
    console.log("Supabase client created");

    // Simple auth check - just get the user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log("getUser() result:", {
      hasUser: !!user,
      userId: user?.id,
      error: authError?.message,
      errorStatus: authError?.status,
      errorName: authError?.name,
    });

    if (authError) {
      console.error("Auth error:", authError);
      return {
        error: "Unauthenticated",
        message: authError.message?.includes("Refresh Token")
          ? "Your session has expired. Please log in again."
          : "Authentication failed. Please log in again.",
        debug: {
          errorMessage: authError.message,
          errorStatus: authError.status,
          errorName: authError.name,
          errorCode: (authError as any).code,
          cookiesPresent: cookieNames,
          supabaseCookies: cookieNames.filter(name =>
            name.includes("supabase") || name.includes("sb-")
          ),
          step: "getUser()",
        },
      };
    }

    if (!user) {
      console.error("No user found - cookies may be missing or expired");
      return {
        error: "Unauthenticated",
        message: "No user session found. Please log in again.",
        debug: {
          cookiesPresent: cookieNames,
          supabaseCookies: cookieNames.filter(name =>
            name.includes("supabase") || name.includes("sb-")
          ),
          cookieCount: allCookies.length,
          step: "getUser() - no user returned",
        },
      };
    }

    console.log("User authenticated successfully:", user.id);

    console.log("User authenticated successfully:", user.id);
    console.log("Creating checkout for user:", user.id);

    const finalVariantId = variantId || process.env.LEMONSQUEEZY_VARIANT_ID;
    console.log("Variant ID:", finalVariantId ? "provided" : "missing");

    if (!finalVariantId) {
      console.error("Missing variant_id");
      return {
        error: "variant_id is required",
        message: "Checkout configuration is missing. Please contact support.",
        debug: {
          variantIdProvided: !!variantId,
          envVariantId: !!process.env.LEMONSQUEEZY_VARIANT_ID,
        },
      };
    }

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;

    console.log("LemonSqueezy config:", {
      hasApiKey: !!apiKey,
      hasStoreId: !!storeId,
    });

    if (!apiKey || !storeId) {
      console.error("Missing LemonSqueezy configuration");
      return {
        error: "LemonSqueezy configuration missing",
        message: "Payment system is not configured. Please contact support.",
        debug: {
          hasApiKey: !!apiKey,
          hasStoreId: !!storeId,
        },
      };
    }

    // Ensure IDs are strings (LemonSqueezy requires string IDs)
    const variantIdString = String(finalVariantId).trim();
    const storeIdString = String(storeId).trim();

    if (!variantIdString || !storeIdString) {
      return {
        error: "Invalid variant_id or store_id format",
        message: "Invalid checkout configuration.",
      };
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

      return {
        error: errorMessage,
        message: errorMessage,
      };
    }

    const data = await response.json();

    if (!data?.data?.attributes?.url) {
      console.error("Invalid LemonSqueezy response:", data);
      return {
        error: "Invalid response from LemonSqueezy",
        message: "Failed to create checkout. Please try again.",
      };
    }

    const checkoutUrl = data.data.attributes.url;
    console.log("Checkout URL created successfully:", checkoutUrl);
    console.log("=== CHECKOUT ACTION SUCCESS ===");

    return {
      success: true,
      checkout_url: checkoutUrl,
    };
  } catch (error) {
    console.error("=== CHECKOUT ACTION ERROR ===");
    console.error("Checkout creation error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    return {
      error: "Internal server error",
      message: error instanceof Error ? error.message : "An unexpected error occurred.",
      debug: {
        errorType: error instanceof Error ? error.constructor.name : typeof error,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    };
  }
}
