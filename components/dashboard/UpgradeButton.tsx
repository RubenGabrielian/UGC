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
        const errorMessage = error.error || "Failed to create checkout";
        const errorDetails = error.details ? ` Details: ${JSON.stringify(error.details)}` : "";
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
