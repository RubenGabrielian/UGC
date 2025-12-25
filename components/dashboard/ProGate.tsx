"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UpgradeButton } from "./UpgradeButton";
import { Lock, Sparkles } from "lucide-react";

interface ProGateProps {
  featureName: string;
  description?: string;
}

export function ProGate({ featureName, description }: ProGateProps) {
  return (
    <div className="mx-auto max-w-5xl">
      <Card className="border-zinc-100 rounded-xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100">
            <Lock className="h-8 w-8 text-indigo-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Pro Feature</CardTitle>
          <CardDescription className="mt-2 text-base">
            {featureName} is available for Pro users only
          </CardDescription>
          {description && (
            <p className="mt-3 text-sm text-zinc-600">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-6">
            <div className="flex items-start gap-4">
              <Sparkles className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-indigo-900 mb-2">
                  Upgrade to Pro to unlock:
                </h3>
                <ul className="space-y-2 text-sm text-indigo-700">
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-500">✓</span>
                    <span>Advanced analytics and insights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-500">✓</span>
                    <span>Multiple premium templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-500">✓</span>
                    <span>Verified badge</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-500">✓</span>
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <UpgradeButton
              isPro={false}
              variantId={process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ID || undefined}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

