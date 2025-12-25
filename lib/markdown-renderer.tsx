import React from "react";
import Link from "next/link";

// Simple markdown renderer for blog content
export function renderMarkdown(content: string): React.ReactNode {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let listItems: string[] = [];
  let inList = false;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ");
      if (text.trim()) {
        elements.push(
          <p key={elements.length} className="mb-4 text-zinc-700 dark:text-zinc-300 leading-7">
            {renderInlineMarkdown(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={elements.length} className="mb-6 ml-6 list-disc space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-zinc-700 dark:text-zinc-300">
              {renderInlineMarkdown(item.replace(/^[-*]\s+/, ""))}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const renderInlineMarkdown = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;

    // Match bold **text**
    const boldRegex = /\*\*(.+?)\*\*/g;
    // Match italic *text*
    const italicRegex = /\*(.+?)\*/g;
    // Match links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    // Match inline code `code`
    const codeRegex = /`([^`]+)`/g;

    const matches: Array<{
      index: number;
      length: number;
      type: "bold" | "italic" | "link" | "code";
      content: string;
      url?: string;
    }> = [];

    let match;
    while ((match = boldRegex.exec(text)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        type: "bold",
        content: match[1],
      });
    }
    while ((match = italicRegex.exec(text)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        type: "italic",
        content: match[1],
      });
    }
    while ((match = linkRegex.exec(text)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        type: "link",
        content: match[1],
        url: match[2],
      });
    }
    while ((match = codeRegex.exec(text)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        type: "code",
        content: match[1],
      });
    }

    matches.sort((a, b) => a.index - b.index);

    matches.forEach((match) => {
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index));
      }
      if (match.type === "bold") {
        parts.push(
          <strong key={parts.length} className="font-semibold text-zinc-900 dark:text-zinc-50">
            {match.content}
          </strong>
        );
      } else if (match.type === "italic") {
        parts.push(
          <em key={parts.length} className="italic">
            {match.content}
          </em>
        );
      } else if (match.type === "link") {
        const isExternal = match.url?.startsWith("http");
        parts.push(
          <Link
            key={parts.length}
            href={match.url || "#"}
            className="text-primary hover:underline font-medium"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {match.content}
          </Link>
        );
      } else if (match.type === "code") {
        parts.push(
          <code
            key={parts.length}
            className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono"
          >
            {match.content}
          </code>
        );
      }
      currentIndex = match.index + match.length;
    });

    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }

    return parts.length > 0 ? <>{parts}</> : text;
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Code blocks
    if (trimmedLine.startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <pre
            key={elements.length}
            className="mb-6 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-zinc-100"
          >
            <code className="text-sm">{codeBlockContent.join("\n")}</code>
          </pre>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        // Start code block
        flushParagraph();
        flushList();
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Headings
    if (trimmedLine.startsWith("# ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h1 key={elements.length} className="mb-6 mt-8 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          {trimmedLine.substring(2)}
        </h1>
      );
      return;
    }
    if (trimmedLine.startsWith("## ")) {
      flushParagraph();
      flushList();
      const headingText = trimmedLine.substring(3);
      const headingId = headingText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      elements.push(
        <h2 
          key={elements.length} 
          id={headingId}
          className="mb-4 mt-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50 scroll-mt-24"
        >
          {headingText}
        </h2>
      );
      return;
    }
    if (trimmedLine.startsWith("### ")) {
      flushParagraph();
      flushList();
      const headingText = trimmedLine.substring(4);
      const headingId = headingText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      elements.push(
        <h3 
          key={elements.length} 
          id={headingId}
          className="mb-3 mt-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50 scroll-mt-24"
        >
          {headingText}
        </h3>
      );
      return;
    }

    // Lists
    if (trimmedLine.match(/^[-*]\s+/)) {
      if (!inList) {
        flushParagraph();
        inList = true;
      }
      listItems.push(trimmedLine);
      return;
    } else {
      if (inList) {
        flushList();
      }
    }

    // Empty line
    if (trimmedLine === "") {
      flushParagraph();
      return;
    }

    // Regular paragraph
    currentParagraph.push(trimmedLine);
  });

  flushParagraph();
  flushList();

  return <>{elements}</>;
}
