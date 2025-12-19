"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

interface DashboardHeaderProps {
  isPro: boolean;
}

export function DashboardHeader({ isPro }: DashboardHeaderProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Show success message if redirected from checkout
    if (searchParams.get("checkout") === "success") {
      // Refresh page data to show Pro status
      router.refresh();
      
      // Small delay to ensure page is loaded
      setTimeout(() => {
        toast.success("Congratulations! You are now a Pro user.", {
          description: "Your Pro features are now unlocked. Enjoy!",
          duration: 5000,
        });
      }, 500);
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center gap-2">
      {isPro && (
        <Badge
          variant="default"
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 flex items-center gap-1"
        >
          <Crown className="h-3 w-3" />
          Pro Plan Active
        </Badge>
      )}
    </div>
  );
}
