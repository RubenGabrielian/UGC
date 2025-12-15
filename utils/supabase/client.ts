import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            "Missing Supabase environment variables. Please check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
        );
    }

    // Validate URL format
    if (supabaseUrl === "your_supabase_project_url") {
        throw new Error(
            `Please replace the placeholder value in .env.local with your actual Supabase URL. Get it from: https://supabase.com/dashboard/project/_/settings/api`
        );
    }

    if (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) {
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

    return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

