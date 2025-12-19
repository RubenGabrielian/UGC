"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCheckout(variantId?: string, userId?: string) {
  console.log("=== CHECKOUT ACTION START ===");
  console.log("Input params:", { variantId, userId });
  console.log("userId type:", typeof userId);
  console.log("userId value:", userId);
  console.log("userId truthy:", !!userId);

  try {
    if (!userId) {
      console.error("ERROR: userId is not provided!");
      return {
        error: "Configuration Error",
        message: "User ID is required but was not provided.",
        debug: {
          step: "parameter validation",
          providedUserId: userId,
          variantIdProvided: !!variantId,
        },
      };
    }

    const supabase = await createClient();
    console.log("Supabase client created");

    // If userId is provided, verify it matches the authenticated user
    // Otherwise, try to get the user from session
    let user;
    let authError;

    if (userId) {
      console.log("UserId provided, verifying authentication...");
      // Verify the user exists and matches the authenticated session
      const {
        data: { user: authenticatedUser },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("getUser() result:", {
        hasUser: !!authenticatedUser,
        userId: authenticatedUser?.id,
        expectedUserId: userId,
        error: userError?.message,
      });

      if (userError) {
        authError = userError;
        console.error("getUser() error:", userError);
        const errorResponse = {
          error: "Unauthenticated",
          message: userError.message || "Authentication failed. Please log in again.",
          debug: {
            providedUserId: userId,
            errorMessage: userError.message,
            errorStatus: userError.status,
            errorName: userError.name,
            errorCode: (userError as any).code,
            step: "getUser() verification",
            fullError: JSON.stringify(userError, Object.getOwnPropertyNames(userError)),
          },
        };
        console.error("Returning error response:", errorResponse);
        return errorResponse;
      } else if (!authenticatedUser) {
        console.error("No authenticated user found");
        const errorResponse = {
          error: "Unauthenticated",
          message: "No authenticated user found. Please log in again.",
          debug: {
            providedUserId: userId,
            authenticatedUserId: null,
            step: "user verification - no user returned",
            getUserResult: "user is null or undefined",
          },
        };
        console.error("Returning error response:", errorResponse);
        return errorResponse;
      } else if (authenticatedUser.id !== userId) {
        console.error("User ID mismatch:", {
          provided: userId,
          authenticated: authenticatedUser.id,
        });
        const errorResponse = {
          error: "Unauthenticated",
          message: "User verification failed. Please log in again.",
          debug: {
            providedUserId: userId,
            authenticatedUserId: authenticatedUser.id,
            idsMatch: false,
            step: "user verification - ID mismatch",
          },
        };
        console.error("Returning error response:", errorResponse);
        return errorResponse;
      } else {
        user = authenticatedUser;
        console.log("User verified successfully:", user.id);
      }
    } else {
      console.log("No userId provided, trying to get from session...");
      // Fallback: try to get user from session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      console.log("getSession() result:", {
        hasSession: !!session,
        sessionExpiresAt: session?.expires_at,
        isExpired: session?.expires_at ? session.expires_at * 1000 < Date.now() : null,
        error: sessionError?.message,
      });

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
        console.log("No user from session, trying getUser()...");
        const userResult = await supabase.auth.getUser();
        user = userResult.data?.user || undefined;
        authError = userResult.error;
        console.log("getUser() fallback result:", {
          hasUser: !!user,
          userId: user?.id,
          error: userResult.error?.message,
        });
      }
    }

    if (authError) {
      console.error("Auth error in checkout action:", {
        message: authError.message,
        status: authError.status,
        name: authError.name,
        code: (authError as any).code,
      });
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
          providedUserId: userId,
          step: "authentication check",
          hasRefreshTokenError: authError.message?.includes("Refresh Token") || false,
        },
      };
    }

    if (!user) {
      console.error("No user found in checkout action");
      return {
        error: "Unauthenticated",
        message: "No user session found. Please log in again.",
        debug: {
          providedUserId: userId,
          triedSession: true,
          triedGetUser: true,
          step: "user retrieval - no user found",
        },
      };
    }

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
