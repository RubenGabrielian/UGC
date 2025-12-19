"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Crown } from "lucide-react";
import { toast } from "sonner";

interface UpgradeButtonProps {
  isPro: boolean;
  variantId?: string;
}

export function UpgradeButton({ isPro, variantId }: UpgradeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({ variant_id: variantId || undefined }),
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = error.message || error.error || "Failed to create checkout";
        
        // If it's an authentication error with refresh token issue, redirect to login
        if (response.status === 401 && error.details?.isRefreshTokenError) {
          toast.error("Session Expired", {
            description: "Please log in again to continue.",
            duration: 5000,
          });
          // Redirect to login after a short delay
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          setIsLoading(false);
          return;
        }
        
        const errorDetails = error.details ? `\n\nDebug Info:\n${JSON.stringify(error.details, null, 2)}` : "";
        console.error("Checkout API error:", error);
        throw new Error(`${errorMessage}${errorDetails}`);
      }

      const data = await response.json();
      window.location.href = data.checkout_url;
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
