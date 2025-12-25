import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");
    const next = searchParams.get("next") ?? "/dashboard";

    // Handle OAuth provider errors
    if (error) {
        console.error("OAuth error:", error, errorDescription);
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${encodeURIComponent(error)}`);
    }

    if (!code) {
        console.error("No code parameter in callback URL");
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no_code`);
    }

    try {
        const supabase = await createClient();
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
            console.error("Error exchanging code for session:", exchangeError);
            return NextResponse.redirect(
                `${origin}/auth/auth-code-error?error=${encodeURIComponent(exchangeError.message)}`
            );
        }

        if (!data.session) {
            console.error("No session returned from code exchange");
            return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no_session`);
        }

        // Successfully authenticated - redirect to dashboard
        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";

        let redirectUrl: string;
        if (isLocalEnv) {
            redirectUrl = `${origin}${next}`;
        } else if (forwardedHost) {
            redirectUrl = `https://${forwardedHost}${next}`;
        } else {
            redirectUrl = `${origin}${next}`;
        }

        // Use 307 redirect to preserve POST data if any, and ensure cookies are set
        return NextResponse.redirect(redirectUrl, { status: 307 });
    } catch (err) {
        console.error("Unexpected error in callback:", err);
        return NextResponse.redirect(
            `${origin}/auth/auth-code-error?error=${encodeURIComponent(
                err instanceof Error ? err.message : "unknown_error"
            )}`
        );
    }
}

