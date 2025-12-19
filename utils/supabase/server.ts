import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// This file is server-only - do not import in client components

export async function createClient() {
    const cookieStore = await cookies();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            "Missing Supabase environment variables. Please check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
        );
    }

    // Validate URL format
    if (
        supabaseUrl === "your_supabase_project_url" ||
        (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://"))
    ) {
        try {
            new URL(supabaseUrl);
        } catch {
            throw new Error(
                `Invalid NEXT_PUBLIC_SUPABASE_URL: "${supabaseUrl}". Please update your .env.local file with a valid Supabase project URL (e.g., https://xxxxx.supabase.co). Get it from: https://supabase.com/dashboard/project/_/settings/api`
            );
        }
    }

    // Validate that placeholder key is replaced
    if (
        supabaseAnonKey === "your_supabase_anon_key" ||
        supabaseAnonKey.length < 50
    ) {
        throw new Error(
            `Invalid NEXT_PUBLIC_SUPABASE_ANON_KEY. Please update your .env.local file with your actual Supabase anon key. Get it from: https://supabase.com/dashboard/project/_/settings/api`
        );
    }

    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch {
                    // The `setAll` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
        },
    });
}

