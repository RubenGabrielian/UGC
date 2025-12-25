import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard | CreatorKit",
  description:
    "Manage your CreatorKit profile, update services and rates, and track your performance.",
  keywords: [
    "creatorkit dashboard",
    "creator profile editor",
    "ugc services",
    "influencer rates",
    "media kit builder",
  ],
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
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

  const tab = searchParams?.tab || "editor";

  return (
    <DashboardContent
      profile={profile}
      userId={user.id}
      initialTab={tab}
      username={profile?.username || user.email?.split("@")[0] || ""}
    />
  );
}
