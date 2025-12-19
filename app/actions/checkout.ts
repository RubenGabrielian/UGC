"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// Helper to create a serializable error response
function createErrorResponse(
  error: string,
  message: string,
  debug: Record<string, any>
): { error: string; message: string; debug: Record<string, any> } {
  // Ensure all values are primitives
  const cleanDebug: Record<string, any> = {};
  for (const [key, value] of Object.entries(debug)) {
    if (value === null || value === undefined) {
      cleanDebug[key] = null;
    } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      cleanDebug[key] = value;
    } else if (Array.isArray(value)) {
      cleanDebug[key] = value.map(v => String(v));
    } else {
      cleanDebug[key] = String(value);
    }
  }

  const response = {
    error: String(error),
    message: String(message),
    debug: cleanDebug,
  };

  // Force serialization test
  const serialized = JSON.parse(JSON.stringify(response));
  return serialized;
}

export async function createCheckout(variantId?: string) {
  console.log("=== CHECKOUT ACTION START ===");
  console.log("Input params:", { variantId });

  // Wrap everything to catch any unexpected errors
  try {
    // Debug: Check which cookies are present
    let cookieStore;
    let allCookies: any[] = [];
    let cookieNames: string[] = [];

    try {
      cookieStore = await cookies();
      allCookies = cookieStore.getAll();
      cookieNames = allCookies.map(c => c.name);
      console.log("Cookies present:", cookieNames);
      console.log("Supabase-related cookies:", cookieNames.filter(name =>
        name.includes("supabase") || name.includes("sb-")
      ));
    } catch (cookieError) {
      console.error("Error reading cookies:", cookieError);
      return {
        error: "Configuration Error",
        message: "Failed to read cookies.",
        debug: {
          step: "cookie reading",
          error: cookieError instanceof Error ? cookieError.message : String(cookieError),
        },
      };
    }

    let supabase;
    try {
      supabase = await createClient();
      console.log("Supabase client created");
    } catch (clientError) {
      console.error("Error creating Supabase client:", clientError);
      return {
        error: "Configuration Error",
        message: "Failed to initialize authentication.",
        debug: {
          step: "supabase client creation",
          error: clientError instanceof Error ? clientError.message : String(clientError),
          cookiesPresent: cookieNames,
        },
      };
    }

    // Simple auth check - just get the user
    let user;
    let authError: any = undefined;

    try {
      console.log("About to call supabase.auth.getUser()...");
      const userResult = await supabase.auth.getUser();
      console.log("getUser() returned, checking result...");
      console.log("userResult structure:", {
        hasData: !!userResult.data,
        hasUser: !!userResult.data?.user,
        hasError: !!userResult.error,
        errorType: typeof userResult.error,
      });

      user = userResult.data?.user || undefined;
      authError = userResult.error || undefined;

      if (authError) {
        console.error("Auth error from getUser():", {
          message: authError.message,
          status: authError.status,
          name: authError.name,
          code: authError.code,
          toString: String(authError),
        });

        // Use helper to create properly serialized error response
        const errorMsg = String(authError.message || "Authentication failed. Please log in again.");
        const immediateErrorResponse = createErrorResponse(
          "Unauthenticated",
          errorMsg,
          {
            step: "getUser() - immediate return",
            errorMessage: String(authError.message || "No message"),
            errorStatus: authError.status ?? null,
            errorName: String(authError.name || "Unknown"),
            errorCode: String(authError.code || "No code"),
            cookieCount: allCookies.length,
            cookiesPresent: cookieNames.map(n => String(n)),
            supabaseCookies: cookieNames
              .filter(name => name.includes("supabase") || name.includes("sb-"))
              .map(n => String(n)),
          }
        );

        console.error("Returning immediate error response:", JSON.stringify(immediateErrorResponse, null, 2));
        console.error("Response keys:", Object.keys(immediateErrorResponse));
        console.error("Debug exists:", !!immediateErrorResponse.debug);
        console.error("Debug keys:", immediateErrorResponse.debug ? Object.keys(immediateErrorResponse.debug) : "none");

        return immediateErrorResponse;
      }
    } catch (getUserError) {
      console.error("Exception thrown by getUser():", getUserError);
      const errorResponse = {
        error: "Unauthenticated",
        message: "Authentication check failed.",
        debug: {
          step: "getUser() call - exception caught",
          error: getUserError instanceof Error ? getUserError.message : String(getUserError),
          errorType: getUserError instanceof Error ? getUserError.constructor.name : typeof getUserError,
          cookiesPresent: cookieNames,
          supabaseCookies: cookieNames.filter(name =>
            name.includes("supabase") || name.includes("sb-")
          ),
        },
      };
      console.error("Returning exception error response:", JSON.stringify(errorResponse, null, 2));
      return errorResponse;
    }

    console.log("getUser() result:", {
      hasUser: !!user,
      userId: user?.id,
      error: authError ? (authError.message || String(authError)) : null,
      errorStatus: (authError as any)?.status,
      errorName: (authError as any)?.name,
      errorCode: (authError as any)?.code,
      fullError: authError ? JSON.stringify(authError, Object.getOwnPropertyNames(authError)) : null,
    });

    if (authError) {
      console.error("Auth error detected:", authError);
      console.error("Auth error type:", typeof authError);
      console.error("Auth error keys:", Object.keys(authError || {}));

      // Extract error message safely
      let errorMessage = "Authentication failed";
      try {
        if (authError && typeof authError === 'object' && 'message' in authError) {
          errorMessage = String(authError.message) || errorMessage;
        } else if (authError) {
          errorMessage = String(authError) || errorMessage;
        }
      } catch (e) {
        errorMessage = "Authentication failed (error parsing failed)";
      }

      // Use helper to create properly serialized error response
      const errorResponse = createErrorResponse(
        "Unauthenticated",
        errorMessage.includes("Refresh Token")
          ? "Your session has expired. Please log in again."
          : "Authentication failed. Please log in again.",
        {
          errorMessage: errorMessage,
          errorStatus: (authError as any)?.status ?? null,
          errorName: (authError as any)?.name ?? null,
          errorCode: (authError as any)?.code ?? null,
          cookiesPresent: cookieNames.map(n => String(n)),
          supabaseCookies: cookieNames
            .filter(name => name.includes("supabase") || name.includes("sb-"))
            .map(n => String(n)),
          cookieCount: allCookies.length,
          step: "getUser() - authError present",
          errorType: typeof authError,
          errorString: String(authError),
        }
      );

      console.error("Returning auth error response:", JSON.stringify(errorResponse, null, 2));
      console.error("Error response keys:", Object.keys(errorResponse));
      console.error("Error response.debug exists:", !!errorResponse.debug);
      console.error("Error response.debug keys:", errorResponse.debug ? Object.keys(errorResponse.debug) : "no debug");

      return errorResponse;
    }

    if (!user) {
      console.error("No user found - cookies may be missing or expired");
      const errorResponse = createErrorResponse(
        "Unauthenticated",
        "No user session found. Please log in again.",
        {
          cookiesPresent: cookieNames.map(n => String(n)),
          supabaseCookies: cookieNames
            .filter(name => name.includes("supabase") || name.includes("sb-"))
            .map(n => String(n)),
          cookieCount: allCookies.length,
          step: "getUser() - no user returned",
          hasAuthError: false,
        }
      );
      console.error("Returning no user error response:", JSON.stringify(errorResponse, null, 2));
      return errorResponse;
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
    console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");

    // Try to get cookies even in error case for debugging
    let cookieNames: string[] = [];
    try {
      const cookieStore = await cookies();
      cookieNames = cookieStore.getAll().map(c => c.name);
    } catch (e) {
      // Ignore cookie errors in catch block
    }

    // Check if this is a Supabase auth error
    const errorMessage = error instanceof Error ? error.message : String(error);
    const isAuthError = errorMessage.includes("Unauthenticated") ||
      errorMessage.includes("JWT") ||
      errorMessage.includes("session") ||
      errorMessage.includes("token");

    const errorResponse = createErrorResponse(
      isAuthError ? "Unauthenticated" : "Internal server error",
      isAuthError ? "Authentication failed. Please log in again." : errorMessage,
      {
        errorType: error instanceof Error ? error.constructor.name : typeof error,
        errorMessage: errorMessage,
        errorStack: error instanceof Error ? (error.stack || null) : null,
        cookiesPresent: cookieNames.map(n => String(n)),
        step: "catch block - top level",
        isAuthError: isAuthError,
      }
    );

    console.error("Returning catch block error response:", JSON.stringify(errorResponse, null, 2));
    console.error("Catch block response has debug:", !!errorResponse.debug);
    return errorResponse;
  }
}
