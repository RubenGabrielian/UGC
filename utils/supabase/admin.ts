import { createClient } from "@supabase/supabase-js";

// Admin client for server-side operations that require service role
// This bypasses RLS and should ONLY be used in secure server contexts (webhooks, admin operations)
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing Supabase admin credentials. SUPABASE_SERVICE_ROLE_KEY must be set for admin operations."
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
