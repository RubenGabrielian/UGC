import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Debug: Check if cookies are being received
    const cookieHeader = request.headers.get("cookie");
    const hasCookies = !!cookieHeader;

    // Create Supabase client with explicit cookie handling
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // In API routes, we can't set cookies directly
          // But we can return them in the response
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Ignore cookie setting errors in API routes
          }
        },
      },
    });

    // Always log cookie info for debugging (even in production)
    const allCookies = cookieStore.getAll();
    console.log("Checkout API - Cookie info:", {
      hasCookies,
      cookieHeader: cookieHeader ? "present" : "missing",
      cookieStoreCount: allCookies.length,
      cookieNames: allCookies.map(c => c.name),
      supabaseCookies: allCookies.filter(c => c.name.includes("supabase") || c.name.includes("sb-")).map(c => c.name),
    });

    // Try to get session first (more reliable in API routes)
    let {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    // If session exists but is expired, try to refresh it
    if (session && session.expires_at && session.expires_at * 1000 < Date.now()) {
      console.log("Session expired, attempting refresh...");
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
      if (!refreshError && refreshData?.session) {
        // Session refreshed successfully
        session = refreshData.session;
        sessionError = null;
        console.log("Session refreshed successfully");
      } else {
        console.error("Failed to refresh session:", refreshError?.message);
      }
    }

    // If session fails, try getUser as fallback
    let user = session?.user || undefined;
    let authError = sessionError;

    if (!user && !authError) {
      const userResult = await supabase.auth.getUser();
      user = userResult.data?.user || undefined;
      authError = userResult.error;
    }

    // Log detailed auth info for debugging
    console.error("Auth check in checkout:", {
      hasSession: !!session,
      hasUser: !!user,
      sessionError: sessionError?.message,
      authError: authError?.message,
      hasCookies,
      cookieHeader: cookieHeader ? "present" : "missing",
      cookieStoreCount: cookieStore.getAll().length,
      supabaseCookies: cookieStore.getAll().filter(c =>
        c.name.includes("supabase") || c.name.includes("sb-")
      ).map(c => c.name),
    });

    if (authError) {
      console.error("Auth error in checkout:", {
        message: authError.message,
        status: authError.status,
        name: authError.name,
        hasCookies,
        cookieHeader: cookieHeader ? "present" : "missing",
      });
      return NextResponse.json(
        {
          error: "Unauthenticated",
          details: {
            message: authError.message,
            hasCookies,
            cookieCount: cookieHeader ? cookieHeader.split(";").length : 0,
            cookieStoreCount: cookieStore.getAll().length,
            supabaseCookies: allCookies.filter(c => c.name.includes("supabase") || c.name.includes("sb-")).map(c => c.name),
          }
        },
        { status: 401 }
      );
    }

    if (!user) {
      console.error("No user found in checkout route", {
        hasCookies,
        cookieHeader: cookieHeader ? "present" : "missing",
        cookieStoreCount: cookieStore.getAll().length,
      });
      return NextResponse.json(
        {
          error: "Unauthenticated",
          details: {
            hasCookies,
            cookieCount: cookieHeader ? cookieHeader.split(";").length : 0,
            cookieStoreCount: cookieStore.getAll().length,
            message: "No user session found. Please log in again.",
          }
        },
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
