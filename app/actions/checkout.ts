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
  console.log("!!! ACTION EXECUTED !!!");
  return { success: true, message: "Action reached" };
}