"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Crown } from "lucide-react";
import { toast } from "sonner";
import { createCheckout } from "@/app/actions/checkout";

interface UpgradeButtonProps {
  isPro: boolean;
  variantId?: string;
}

export function UpgradeButton({ isPro, variantId }: UpgradeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);

    try {
      const result = await createCheckout(variantId);

      if (result.error) {
        // If it's an authentication error, redirect to login
        if (result.error === "Unauthenticated" || result.message?.includes("session")) {
          toast.error("Session Expired", {
            description: result.message || "Please log in again to continue.",
            duration: 5000,
          });
          // Redirect to login after a short delay
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          setIsLoading(false);
          return;
        }
        
        toast.error("Failed to start checkout", {
          description: result.message || result.error,
        });
        setIsLoading(false);
        return;
      }

      if (result.success && result.checkout_url) {
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
