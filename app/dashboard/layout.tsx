import { DashboardHeader } from "@/components/dashboard/Header"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("avatar_url, full_name, username")
    .eq("id", user.id)
    .maybeSingle()

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        avatarUrl={profile?.avatar_url || null}
        fullName={profile?.full_name || user.email}
        username={profile?.username || user.email?.split("@")[0]}
        email={user.email}
      />
      <main className="container mx-auto px-4 pb-12 pt-24 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}

