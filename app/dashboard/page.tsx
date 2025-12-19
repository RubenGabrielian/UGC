import type { Metadata } from "next";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { UpgradeButton } from "@/components/dashboard/UpgradeButton";

export const metadata: Metadata = {
  title: "Dashboard | CreatorKit",
  description:
    "Manage your CreatorKit profile, update services and rates, and preview the public page brands see.",
  keywords: [
    "creatorkit dashboard",
    "creator profile editor",
    "ugc services",
    "influencer rates",
    "media kit builder",
  ],
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*, is_pro, subscription_status")
    .eq("id", user.id)
    .maybeSingle();

  const publicPath = `/u/${profile?.username || user.email?.split("@")[0]}`;

  return (
    <div>
      <div className="px-4 pt-2 pb-4 sm:px-6 lg:px-10">
        <div className="flex max-w-9xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              Creator Studio
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Edit your public creator page, connect your social platforms, and see how brands will view your page.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <UpgradeButton
              isPro={profile?.is_pro ?? false}
              variantId={process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ID || undefined}
            />
            <Button asChild variant="outline" size="sm" className="w-full shrink-0 justify-center sm:w-auto">
              <Link href={publicPath}>
                View public page
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="min-h-screen flex flex-col dark:bg-zinc-950">
        <div className="px-4 pb-8 pt-7 sm:px-6 lg:px-10 flex-1">
          <ProfileForm initialData={profile ?? null} userId={user.id} isPro={profile?.is_pro ?? false} />
        </div>
      </div>
    </div>
  );
}

