"use client";

import { useEffect, useState, startTransition } from "react";
import type React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Mail,
  ExternalLink,
  Palette,
  Crown,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  publicUrl: string;
  isPro?: boolean;
  userId?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ publicUrl, isPro = false, userId, isOpen = false, onClose }: SidebarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("editor");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [unreadLeadsCount, setUnreadLeadsCount] = useState(0);
  const basePath = "/dashboard";

  // Debug: Log when isOpen changes
  useEffect(() => {
    console.log("Sidebar isOpen prop changed:", isOpen);
  }, [isOpen]);

  // Update tab from URL params after mount to avoid hydration issues
  useEffect(() => {
    const tabFromUrl = searchParams?.get("tab") || "editor";
    if (tabFromUrl !== currentTab) {
      startTransition(() => {
        setCurrentTab(tabFromUrl);
      });
    }
  }, [searchParams, currentTab]);

  // Fetch unread leads count (only for Pro users)
  useEffect(() => {
    if (!isPro || !userId) {
      return;
    }

    async function fetchUnreadCount() {
      const supabase = createClient();
      const { count, error } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("creator_id", userId)
        .eq("is_read", false);

      if (error) {
        console.error("Error fetching unread leads count:", error);
        return;
      }

      setUnreadLeadsCount(count || 0);
    }

    fetchUnreadCount();

    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [isPro, userId]);

  const navItems = [
    {
      name: "Editor",
      href: `${basePath}?tab=editor`,
      icon: LayoutDashboard,
      tab: "editor",
      isPro: false,
    },
    {
      name: "Templates",
      href: `${basePath}?tab=templates`,
      icon: Palette,
      tab: "templates",
      isPro: true,
    },
    {
      name: "Analytics",
      href: `${basePath}?tab=analytics`,
      icon: BarChart3,
      tab: "analytics",
      isPro: true,
    },
    {
      name: "Leads",
      href: `${basePath}?tab=leads`,
      icon: Mail,
      tab: "leads",
      isPro: true,
    },
    {
      name: "Settings",
      href: `${basePath}?tab=settings`,
      icon: Settings,
      tab: "settings",
      isPro: false,
    },
  ];

  const isActive = (tab: string) => {
    return currentTab === tab;
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error("Failed to log out", { description: error.message });
        setIsLoggingOut(false);
        return;
      }

      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while logging out");
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r border-zinc-200 bg-white shadow-lg",
          "transition-transform duration-300 ease-in-out",
          // On desktop (lg+), always visible - use static positioning
          "lg:translate-x-0 lg:static lg:shadow-none",
          // On mobile, control visibility with transform
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Brand */}
          <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2" onClick={onClose}>
              <div className="h-8 w-8 rounded bg-zinc-900"></div>
              <span className="text-sm font-semibold text-zinc-900">CreatorKit</span>
            </Link>
            <div className="flex items-center gap-2">
              {isPro && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                  <Crown className="h-2.5 w-2.5" />
                  PRO
                </span>
              )}
              {/* Mobile Close Button */}
              <button
                onClick={onClose}
                className="lg:hidden rounded-lg p-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.tab);
            const showProBadge = item.isPro && !isPro;
            const isLeadsTab = item.tab === "leads";
            const showUnreadBadge = isLeadsTab && isPro && unreadLeadsCount > 0;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {showUnreadBadge && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
                      {unreadLeadsCount > 99 ? "99+" : unreadLeadsCount}
                    </span>
                  )}
                  {showProBadge && (
                    <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                      Pro
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Public Page Link & Logout */}
        <div className="border-t border-zinc-200 p-4 space-y-2">
          <Link
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Live Page</span>
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="h-4 w-4" />
            <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}

