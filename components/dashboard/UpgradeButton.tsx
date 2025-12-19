"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Crown } from "lucide-react";
import { toast } from "sonner";
import { createCheckout } from "@/app/actions/checkout";
import { createClient } from "@/utils/supabase/client";

interface UpgradeButtonProps {
  isPro: boolean;
  variantId?: string;
}

export function UpgradeButton({ isPro, variantId }: UpgradeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    console.log("=== UPGRADE BUTTON CLICKED ===");
    console.log("Props:", { isPro, variantId });
    setIsLoading(true);

    try {
      // First, verify the user is authenticated on the client side
      console.log("Checking client-side session...");
      const supabase = createClient();
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      console.log("Client session check:", {
        hasSession: !!session,
        sessionExpiresAt: session?.expires_at,
        isExpired: session?.expires_at ? session.expires_at * 1000 < Date.now() : null,
        error: sessionError?.message,
      });
      
      if (sessionError || !session) {
        console.error("Client session error or missing");
        toast.error("Session Expired", {
          description: "Please log in again to continue.",
          duration: 5000,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        setIsLoading(false);
        return;
      }

      // If session is expired, try to refresh it
      if (session.expires_at && session.expires_at * 1000 < Date.now()) {
        console.log("Client session expired, refreshing...");
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        console.log("Refresh result:", {
          success: !!refreshData?.session,
          error: refreshError?.message,
        });
        if (refreshError || !refreshData?.session) {
          console.error("Failed to refresh client session");
          toast.error("Session Expired", {
            description: "Please log in again to continue.",
            duration: 5000,
          });
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          setIsLoading(false);
          return;
        }
      }

      console.log("Calling createCheckout with:", { variantId });
      
      console.log("About to call createCheckout...");
      let result: any;
      try {
        // Call the Server Action
        const actionResult = await createCheckout(variantId);
        
        // Log the raw result immediately
        console.log("=== RAW SERVER ACTION RESULT ===");
        console.log("Type:", typeof actionResult);
        console.log("Is null:", actionResult === null);
        console.log("Is undefined:", actionResult === undefined);
        console.log("Stringified:", JSON.stringify(actionResult));
        console.log("Keys:", actionResult ? Object.keys(actionResult) : "no keys");
        
        // Try to access debug
        if (actionResult && typeof actionResult === 'object') {
          console.log("Has debug property:", 'debug' in actionResult);
          console.log("Debug value:", (actionResult as any).debug);
          console.log("Debug type:", typeof (actionResult as any).debug);
        }
        
        result = actionResult;
        console.log("createCheckout completed");
      } catch (error) {
        console.error("createCheckout threw an error:", error);
        console.error("Error type:", typeof error);
        console.error("Error stringified:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
        alert(`Server Action Exception:\n\n${error instanceof Error ? error.message : String(error)}\n\nThis is an unexpected error.`);
        toast.error("Unexpected Error", {
          description: error instanceof Error ? error.message : "An unexpected error occurred.",
        });
        setIsLoading(false);
        return;
      }
      
      console.log("createCheckout result:", result);
      console.log("Result type:", typeof result);
      console.log("Result keys:", result ? Object.keys(result) : "result is null/undefined");
      console.log("Result.error:", result?.error);
      console.log("Result.debug:", result?.debug);
      console.log("Result.message:", result?.message);
      
      // Additional debugging
      if (result && typeof result === 'object') {
        console.log("Checking for debug field...");
        console.log("'debug' in result:", 'debug' in result);
        console.log("result.debug:", result.debug);
        console.log("Object.getOwnPropertyNames:", Object.getOwnPropertyNames(result));
        console.log("Object.keys:", Object.keys(result));
      }

      if (result.error) {
        console.error("=== CHECKOUT ERROR ===");
        console.error("Full result object:", JSON.stringify(result, null, 2));
        console.error("Error details:", result.debug);
        
        // Build detailed error message with debug info
        let errorDescription = result.message || result.error;
        if (result.debug) {
          const debugStr = JSON.stringify(result.debug, null, 2);
          errorDescription += `\n\nDebug Info:\n${debugStr}`;
          console.error("Full debug info:", result.debug);
          
          // Also show in alert for visibility
          alert(`Checkout Error:\n\n${result.error}\n\n${result.message}\n\nDebug:\n${debugStr}`);
        } else {
          alert(`Checkout Error:\n\n${result.error}\n\n${result.message}\n\n(No debug info available)`);
        }
        
        // If it's an authentication error, redirect to login
        if (result.error === "Unauthenticated" || result.message?.includes("session")) {
          toast.error("Session Expired", {
            description: errorDescription,
            duration: 10000,
          });
          // Redirect to login after a short delay
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
          setIsLoading(false);
          return;
        }
        
        toast.error("Failed to start checkout", {
          description: errorDescription,
          duration: 10000,
        });
        setIsLoading(false);
        return;
      }

      if ('success' in result && result.success && 'checkout_url' in result && result.checkout_url) {
        window.location.href = result.checkout_url;
      } else {
        toast.error("Failed to start checkout", {
          description: "Invalid response from server.",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
      setIsLoading(false);
    }
  };

  if (isPro) {
    return (
      <Button disabled variant="outline" size="sm">
        <Crown className="mr-2 h-4 w-4" />
        Pro Active
      </Button>
    );
  }

  return (
    <Button
      onClick={handleUpgrade}
      disabled={isLoading}
      size="sm"
      className="w-full sm:w-auto"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Crown className="mr-2 h-4 w-4" />
          Upgrade to Pro
        </>
      )}
    </Button>
  );
}
