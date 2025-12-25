"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { ActionBar } from "./ActionBar";
import { Editor } from "./Editor";
import { Analytics } from "./Analytics";
import { Leads } from "./Leads";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpgradeButton } from "./UpgradeButton";
import { Toaster } from "@/components/ui/sonner";

interface DashboardContentProps {
  profile: any;
  userId: string;
  initialTab: string;
  username: string;
}

export function DashboardContent({
  profile,
  userId,
  initialTab,
  username,
}: DashboardContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get("tab") || initialTab || "editor";
  const publicUrl = `/u/${username}`;

  return (
    <>
      <Toaster />
      <div className="flex h-screen overflow-hidden bg-white">
        {/* Sidebar */}
        <Sidebar publicUrl={publicUrl} />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden ml-64">
          {/* Action Bar */}
          <ActionBar publicUrl={publicUrl} username={profile?.username} />

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto bg-white">
            <div className="p-8">
            {/* Editor Tab */}
            {activeTab === "editor" && (
              <div>
                <Editor initialData={profile} userId={userId} />
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="mx-auto max-w-5xl">
                <Analytics userId={userId} />
              </div>
            )}

            {/* Leads Tab */}
            {activeTab === "leads" && (
              <div className="mx-auto max-w-5xl">
                <Leads userId={userId} />
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="mx-auto max-w-5xl space-y-6">
                <Card className="border-zinc-100 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 mb-2">
                        Subscription
                      </h3>
                      {profile?.is_pro ? (
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-zinc-100 px-3 py-2">
                            <p className="text-sm font-semibold text-zinc-900">Pro Plan</p>
                            <p className="text-xs text-zinc-500">Active</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg border border-zinc-200 px-3 py-2">
                            <p className="text-sm font-semibold text-zinc-900">Free Plan</p>
                            <p className="text-xs text-zinc-500">Upgrade to unlock Pro features</p>
                          </div>
                          <UpgradeButton
                            isPro={false}
                            variantId={process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ID || undefined}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

