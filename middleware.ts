import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // CRITICAL: Refresh session if needed - this will update cookies automatically
  // getSession() is the correct method to refresh the session in middleware
  // This ensures the session is synced before Server Actions/Components run
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  // If session exists but might be expired, getUser() will trigger a refresh
  // This ensures we have a valid user token for Server Actions
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // Log for debugging (only in development)
  if (process.env.NODE_ENV === "development") {
    console.log("Middleware - Session refresh:", {
      hasSession: !!session,
      hasUser: !!user,
      sessionError: sessionError?.message,
      userError: userError?.message,
      path: request.nextUrl.pathname,
      cookiesSet: response.cookies.getAll().length,
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
