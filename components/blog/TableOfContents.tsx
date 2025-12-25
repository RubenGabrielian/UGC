"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/extract-headings";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((h) => {
        const element = document.getElementById(h.id);
        return { id: h.id, element, top: element?.getBoundingClientRect().top ?? 0 };
      });

      // Find the heading that's currently in view
      const currentHeading = headingElements
        .filter((h) => h.top <= 100 && h.top >= -100)
        .sort((a, b) => b.top - a.top)[0];

      if (currentHeading) {
        setActiveId(currentHeading.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-24 hidden lg:block">
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Table of Contents
        </h3>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "block w-full text-left text-sm transition-colors hover:text-zinc-900 dark:hover:text-zinc-50",
                heading.level === 3 && "ml-4",
                activeId === heading.id
                  ? "font-semibold text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-600 dark:text-zinc-400"
              )}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

