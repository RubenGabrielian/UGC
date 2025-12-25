"use client";

import { useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Mail,
  ExternalLink,
  Palette,
  Crown,
} from "lucide-react";

interface SidebarProps {
  publicUrl: string;
  isPro?: boolean;
}

export function Sidebar({ publicUrl, isPro = false }: SidebarProps) {
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState("editor");
  const basePath = "/dashboard";

  // Update tab from URL params after mount to avoid hydration issues
  useEffect(() => {
    const tabFromUrl = searchParams?.get("tab") || "editor";
    if (tabFromUrl !== currentTab) {
      startTransition(() => {
        setCurrentTab(tabFromUrl);
      });
    }
  }, [searchParams, currentTab]);

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
      isPro: false,
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

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white">
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-zinc-900"></div>
            <span className="text-sm font-semibold text-zinc-900">CreatorKit</span>
          </Link>
          {isPro && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
              <Crown className="h-2.5 w-2.5" />
              PRO
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.tab);
            const showProBadge = item.isPro && !isPro;
            return (
              <Link
                key={item.href}
                href={item.href}
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
                {showProBadge && (
                  <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                    Pro
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Public Page Link */}
        <div className="border-t border-zinc-200 p-4">
          <Link
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Live Page</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

