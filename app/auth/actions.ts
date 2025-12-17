"use server";

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const getSiteUrl = async () => {
    const envSite = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
    const origin = (await headers()).get("origin") ?? undefined;
    return envSite || vercelUrl || origin || "http://localhost:3000";
};

export async function loginWithGoogle() {
    const supabase = await createClient();
    const redirectBase = await getSiteUrl();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${redirectBase}/auth/callback`,
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    if (data.url) {
        return { url: data.url };
    }

    throw new Error("No URL returned from OAuth provider");
}

