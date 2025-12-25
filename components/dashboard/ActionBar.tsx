"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Share2, Copy, Check, Crown, Menu } from "lucide-react";
import { toast } from "sonner";

interface ActionBarProps {
  publicUrl: string;
  username?: string | null;
  isPro?: boolean;
  onMenuClick?: () => void;
}

export function ActionBar({ publicUrl, username, isPro = false, onMenuClick }: ActionBarProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${publicUrl}` : "";

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("URL copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${username || "My"} - CreatorKit`,
          url: fullUrl,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback to copy
      handleCopyUrl();
    }
  };

  return (
    <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onMenuClick?.();
            }}
            className="lg:hidden h-8 w-8 p-0 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            aria-label="Toggle menu"
            type="button"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-sm font-semibold text-zinc-900">Dashboard</h1>
          {isPro && (
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
              <Crown className="h-2.5 w-2.5" />
              PRO
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyUrl}
            className="h-7 px-2 text-xs text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            aria-label="Copy URL"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-7 px-2 text-xs text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 hidden sm:flex"
            aria-label="Share"
          >
            <Share2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-7 border-zinc-300 text-xs text-zinc-700 hover:bg-zinc-50"
          >
            <Link href={publicUrl} target="_blank" rel="noopener noreferrer">
              <span className="hidden sm:inline">View Live</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="ml-1.5 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

