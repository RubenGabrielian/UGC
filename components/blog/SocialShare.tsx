"use client";

import { Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareProps {
  title: string;
  url: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const fullUrl = typeof window !== "undefined" ? window.location.href : url;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    window.open(linkedInUrl, "_blank", "width=550,height=420");
  };

  return (
    <div className="flex items-center gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-6">
      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Share:</span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnTwitter}
          className="h-8 border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Share on Twitter"
        >
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnLinkedIn}
          className="h-8 border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </Button>
      </div>
    </div>
  );
}

