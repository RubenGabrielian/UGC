"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  views?: string | null;
  className?: string;
}

export function VideoPlayer({ url, thumbnail, views, className = "" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const { videoType, embedUrl } = useMemo(() => {
    const lower = url.toLowerCase();
    
    let newVideoType: "youtube" | "tiktok" | "unknown" = "unknown";
    let newEmbedUrl: string | null = null;
    
    // Check if YouTube
    if (lower.includes("youtube") || lower.includes("youtu.be")) {
      newVideoType = "youtube";
      const extractYouTubeId = (link: string) => {
        try {
          const ytRegex = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
          const match = link.match(ytRegex);
          if (match?.[1]) return match[1];
          const parsed = new URL(link);
          const v = parsed.searchParams.get("v");
          if (v && v.length >= 6) return v;
        } catch {
          return null;
        }
        return null;
      };
      
      const videoId = extractYouTubeId(url);
      if (videoId) {
        newEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }
    }
    // Check if TikTok
    else if (lower.includes("tiktok")) {
      newVideoType = "tiktok";
      // Extract TikTok video ID from URL
      // TikTok URLs can be: tiktok.com/@username/video/1234567890
      const tiktokRegex = /tiktok\.com\/.+\/video\/(\d+)/;
      const match = url.match(tiktokRegex);
      if (match?.[1]) {
        // Use TikTok's embed URL format
        newEmbedUrl = `https://www.tiktok.com/embed/v2/${match[1]}`;
      } else {
        // For other TikTok URL formats, use the URL directly
        newEmbedUrl = url;
      }
    }
    
    return { videoType: newVideoType, embedUrl: newEmbedUrl };
  }, [url]);

  const getThumbnailUrl = () => {
    if (thumbnail) return thumbnail;
    
    const lower = url.toLowerCase();
    if (lower.includes("youtube") || lower.includes("youtu.be")) {
      const extractYouTubeId = (link: string) => {
        try {
          const ytRegex = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
          const match = link.match(ytRegex);
          if (match?.[1]) return match[1];
          const parsed = new URL(link);
          const v = parsed.searchParams.get("v");
          if (v && v.length >= 6) return v;
        } catch {
          return null;
        }
        return null;
      };
      
      const videoId = extractYouTubeId(url);
      if (videoId) {
        return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      }
    }
    
    return `https://api.microlink.io/?url=${encodeURIComponent(url)}&embed=image.url`;
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (isPlaying && embedUrl && videoType !== "unknown") {
    return (
      <div className={`relative aspect-video bg-black rounded-2xl overflow-hidden ${className}`}>
        {videoType === "youtube" ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video player"
          />
        ) : videoType === "tiktok" ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="encrypted-media"
            allowFullScreen
            title="TikTok video"
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className={`relative aspect-video group cursor-pointer ${className}`} onClick={handlePlay}>
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-100">
        <Image
          src={getThumbnailUrl()}
          alt="Video thumbnail"
          fill
          className="object-cover transition group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
          <div className="rounded-full bg-white/90 p-4 shadow-xl group-hover:scale-110 transition">
            <svg
              className="w-12 h-12 text-zinc-900 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {views && (
          <div className="absolute top-4 right-4 rounded-full bg-black/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            {views}
          </div>
        )}
      </div>
    </div>
  );
}

