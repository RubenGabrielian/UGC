"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCheckout(variantId?: string, userId?: string) {
  try {
    const supabase = await createClient();

    // If userId is provided, verify it matches the authenticated user
    // Otherwise, try to get the user from session
    let user;
    let authError;

    if (userId) {
      // Verify the user exists and matches the authenticated session
      const {
        data: { user: authenticatedUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        authError = userError;
      } else if (!authenticatedUser || authenticatedUser.id !== userId) {
        return {
          error: "Unauthenticated",
          message: "User verification failed. Please log in again.",
        };
      } else {
        user = authenticatedUser;
      }
    } else {
      // Fallback: try to get user from session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      let currentSession = session;
      if (session && session.expires_at && session.expires_at * 1000 < Date.now()) {
        console.log("Session expired, attempting refresh...");
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        if (!refreshError && refreshData?.session) {
          currentSession = refreshData.session;
          console.log("Session refreshed successfully");
        } else {
          console.error("Failed to refresh session:", refreshError?.message);
        }
      }

      user = currentSession?.user;
      authError = sessionError;

      if (!user && !authError) {
        const userResult = await supabase.auth.getUser();
        user = userResult.data?.user || undefined;
        authError = userResult.error;
      }
    }

    if (authError) {
      console.error("Auth error in checkout action:", {
        message: authError.message,
        status: authError.status,
        name: authError.name,
      });
      return {
        error: "Unauthenticated",
        message: authError.message?.includes("Refresh Token")
          ? "Your session has expired. Please log in again."
          : "Authentication failed. Please log in again.",
      };
    }

    if (!user) {
      console.error("No user found in checkout action");
      return {
        error: "Unauthenticated",
        message: "No user session found. Please log in again.",
      };
    }

    const finalVariantId = variantId || process.env.LEMONSQUEEZY_VARIANT_ID;

    if (!finalVariantId) {
      return {
        error: "variant_id is required",
        message: "Checkout configuration is missing. Please contact support.",
      };
    }

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;

    if (!apiKey || !storeId) {
      return {
        error: "LemonSqueezy configuration missing",
        message: "Payment system is not configured. Please contact support.",
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

    return {
      success: true,
      checkout_url: checkoutUrl,
    };
  } catch (error) {
    console.error("Checkout creation error:", error);
    return {
      error: "Internal server error",
      message: error instanceof Error ? error.message : "An unexpected error occurred.",
    };
  }
}
