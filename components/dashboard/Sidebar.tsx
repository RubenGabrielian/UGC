"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Mail,
  ExternalLink,
} from "lucide-react";

interface SidebarProps {
  publicUrl: string;
}

export function Sidebar({ publicUrl }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get("tab") || "editor";
  const basePath = "/dashboard";

  const navItems = [
    {
      name: "Editor",
      href: basePath,
      icon: LayoutDashboard,
      tab: "editor",
    },
    {
      name: "Analytics",
      href: `${basePath}?tab=analytics`,
      icon: BarChart3,
      tab: "analytics",
    },
    {
      name: "Leads",
      href: `${basePath}?tab=leads`,
      icon: Mail,
      tab: "leads",
    },
    {
      name: "Settings",
      href: `${basePath}?tab=settings`,
      icon: Settings,
      tab: "settings",
    },
  ];

  const isActive = (tab: string) => {
    return currentTab === tab;
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white">
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center border-b border-zinc-200 px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-zinc-900"></div>
            <span className="text-sm font-semibold text-zinc-900">CreatorKit</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.tab);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
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

