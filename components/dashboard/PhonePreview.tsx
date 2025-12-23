"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Film, Lock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { countryByCode } from "@/lib/countries";
import { calculateTotalFollowers } from "@/lib/followers";

type PreviewValues = {
  avatar_url?: string | null;
  username?: string | null;
  country?: string | null;
  categories?: string[] | null;
  full_name?: string | null;
  bio?: string | null;
  primary_email?: string | null;
  primary_phone?: string | null;
  booking_link?: string | null;
  instagram_handle?: string | null;
  instagram_followers?: number | null;
  tiktok_handle?: string | null;
  tiktok_followers?: number | null;
  youtube_handle?: string | null;
  youtube_subscribers?: number | null;
  facebook_handle?: string | null;
  facebook_followers?: number | null;
  audience_demographics?: {
    geo?: { location?: string | null; percentage?: string | null }[];
    age?: string | null;
    gender?: string | null;
  } | null;
  video_urls?: { url: string; views?: string | null }[] | string[] | null;
  brand_logos?: { url: string }[] | string[] | null;
   services_packages?: {
     title?: string | null;
     platform?: "instagram" | "tiktok" | "youtube" | "other";
     price?: string | null;
     is_contact_only?: boolean;
   }[] | null;
  followers_count?: number | null;
  engagement_rate?: number | null;
  collaboration_headline?: string | null;
};

function formatCount(value?: number | null) {
  if (value == null || Number.isNaN(value)) return "—";
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

function formatViewsLabel(raw?: string | null) {
  if (!raw) return "";
  const trimmed = raw.trim();
  // If already contains K/M/million, just return as-is
  if (/[kKmM]/.test(trimmed) || /million/i.test(trimmed)) return trimmed;

  // Extract numeric part
  const numeric = Number(trimmed.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(numeric)) return trimmed;

  if (numeric >= 1_000_000) return `${(numeric / 1_000_000).toFixed(1)}M`;
  if (numeric >= 1_000) return `${(numeric / 1_000).toFixed(1)}K`;
  return numeric.toLocaleString();
}

type Mode = "mobile" | "desktop";

export function PhonePreview({
  values,
  mode = "mobile",
  username,
  isPro = false,
}: {
  values: PreviewValues;
  mode?: Mode;
  username?: string;
  isPro?: boolean;
}) {
  const name = values.full_name || values.username || "Creator Name";
  const handle = values.instagram_handle || values.tiktok_handle || "@username";
  const countryInfo = countryByCode(values.country || undefined);
  const countryName = countryInfo?.name || values.country || "";
  const countryFlag = countryName ? countryInfo?.emoji || "📍" : "";
  const categories = (values.categories ?? []).filter((c) => c && c.trim().length > 0);
  const { formatted: totalFollowers } = calculateTotalFollowers({
    instagram_followers: values.instagram_followers,
    tiktok_followers: values.tiktok_followers,
    youtube_subscribers: values.youtube_subscribers,
    facebook_followers: values.facebook_followers,
  });
  const bio =
    values.bio ||
    "Short introduction for brand managers: tell them about your niche, audience, and results.";

  const demographics = values.audience_demographics;
  const topGeo =
    demographics?.geo
      ?.filter((g) => (g.location || "").trim().length > 0)
      .slice(0, 3) ?? [];
  const videos =
    values.video_urls
      ?.map((v) =>
        typeof v === "string"
          ? { url: v, views: "" }
          : { url: v.url, views: v.views ?? "" }
      )
      .filter(Boolean) ?? [];
  const services = values.services_packages ?? [];
  const igHref =
    values.instagram_handle && values.instagram_handle.startsWith("http")
      ? values.instagram_handle
      : values.instagram_handle
        ? `https://instagram.com/${values.instagram_handle.replace("@", "")}`
        : "#";
  const ttHref =
    values.tiktok_handle && values.tiktok_handle.startsWith("http")
      ? values.tiktok_handle
      : values.tiktok_handle
        ? `https://tiktok.com/@${values.tiktok_handle.replace("@", "")}`
        : "#";
  const ytHref =
    values.youtube_handle && values.youtube_handle.startsWith("http")
      ? values.youtube_handle
      : values.youtube_handle
        ? `https://youtube.com/@${values.youtube_handle.replace("@", "")}`
        : "#";
  const fbHref =
    values.facebook_handle && values.facebook_handle.startsWith("http")
      ? values.facebook_handle
      : values.facebook_handle
        ? `https://facebook.com/${values.facebook_handle.replace("@", "")}`
        : "#";

  const brandLogos =
    values.brand_logos
      ?.map((l) => (typeof l === "string" ? { url: l } : l))
      .filter((l) => l && l.url && l.url.trim().length > 0) ?? [];

  const getCtaHrefAndLabel = () => {
    const booking = values.booking_link?.trim();
    const email = values.primary_email?.trim();

    if (booking) {
      return { href: booking, label: "Book Now" };
    }

    if (email) {
      return { href: `mailto:${email}`, label: "Contact Me" };
    }

    return { href: "#", label: "Book this creator" };
  };

  const { href: ctaHref } = getCtaHrefAndLabel();

  const getVideoBadgeIcon = (url: string) => {
    const lower = url.toLowerCase();
    if (lower.includes("tiktok")) return <Image src={'/img/tiktok.webp'} alt="TikTok" width={24} height={24} />;
    if (lower.includes("youtube")) return <Image src={'/img/youtube.webp'} alt="YouTube" width={24} height={24} />;
    if (lower.includes("instagram") || lower.includes("insta")) return <Image src={'/img/instagram.webp'} alt="Instagram" width={24} height={24} />;
    return null;
  };

  const getThumbnailUrl = (url: string) => {
    const lower = url.toLowerCase();
    const isYouTube = lower.includes("youtube") || lower.includes("youtu.be");

    const extractYouTubeId = (link: string) => {
      try {
        const ytRegex =
          /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
        const match = link.match(ytRegex);
        if (match?.[1]) return match[1];
        const parsed = new URL(link);
        const v = parsed.searchParams.get("v");
        if (v && v.length >= 6) return v;
      } catch {
        // ignore parse errors
      }
      return null;
    };

    if (isYouTube) {
      const id = extractYouTubeId(url);
      if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      return "/img/youtube.webp";
    }

    // Microlink fallback for TikTok/Instagram/others
    const encoded = encodeURIComponent(url);
    return `https://api.microlink.io/?url=${encoded}&embed=image.url&palette=true`;
  };

  const renderVideoItem = useMemo(
    () =>
      function renderVideoItem(video: { url: string; views?: string | null }) {
        const url = video.url;
        const aspectClass = "aspect-square";
        const thumb = getThumbnailUrl(url);
        const handleClick = () => {
          if (typeof window !== "undefined") {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        };
        const domain = (() => {
          try {
            const parsed = new URL(url);
            return parsed.hostname.replace(/^www\./, "");
          } catch {
            return "";
          }
        })();

        return (
          <div
            className={cn(
              "group relative w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md",
              aspectClass
            )}
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleClick();
            }}
          >
            <img
              src={thumb}
              alt="Video thumbnail"
              className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent opacity-80 transition group-hover:opacity-95" />
            <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-zinc-800 shadow-sm">
              {getVideoBadgeIcon(url)}
              <span className="truncate">{domain || "Watch"}</span>
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-semibold text-white">
              {formatViewsLabel(video.views).length > 0 ? (
                <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5">
                  <Eye strokeWidth={2.25} size={14} />
                  {formatViewsLabel(video.views)}
                </span>
              ) : (
                <span />
              )}
              <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-zinc-800 shadow-sm">
                View
              </span>
            </div>
          </div>
        );
      },
    []
  );

  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2) || "CR";

  const isMobile = mode === "mobile";
  const browserUrl = `https://creatorkit.com/${username || "yourname"}`;

  return (
    <Card
      className={cn(
        "mx-auto relative overflow-hidden transition-all duration-500 ease-in-out",
        isMobile
          ? "w-[375px] h-[720px] rounded-[36px] border-[10px] border-black/80 bg-white shadow-2xl shadow-black/25"
          : "w-full max-w-[960px] min-h-[640px] rounded-lg border border-gray-200 bg-white shadow-2xl shadow-black/15"
      )}
    >
      {isMobile ? (
        <div className="relative z-20 flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-2">
          <Lock className="h-3.5 w-3.5 text-zinc-500" />
          <div className="mx-auto flex-1 truncate rounded-lg bg-zinc-100 px-3 py-1 text-[11px] font-medium text-zinc-600">
            {browserUrl}
          </div>
        </div>
      ) : (
        <div className="relative z-20 flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="mx-auto flex-1 truncate rounded-lg bg-zinc-100 px-3 py-1 text-[11px] font-medium text-zinc-600">
            {browserUrl}
          </div>
        </div>
      )}
      <div
        className={cn(
          "relative flex flex-col p-4 pb-24 text-zinc-900 overflow-y-auto",
          isMobile ? "h-full" : "min-h-[640px]"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-100" />
        <div className="relative space-y-6">
          <div className="rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-xl shadow-black/10 backdrop-blur space-y-6">
            <div className="flex flex-col items-center text-center gap-4">
              <Avatar
                className={cn(
                  "border border-white shadow-md ring-4 ring-white/70 overflow-hidden",
                  isMobile ? "h-24 w-24" : "h-28 w-28"
                )}
              >
                <AvatarImage alt={name} src={values.avatar_url || undefined} />
                <AvatarFallback className="bg-zinc-100 text-zinc-800 text-lg font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-xl font-semibold text-zinc-900">
                  <span>{name}</span>
                </div>
                <p className="text-sm text-zinc-500">{handle}</p>
                {countryName && (
                  <p className="text-sm text-zinc-600 flex items-center justify-center gap-2">
                    <span className="leading-none text-lg">{countryFlag}</span>
                    <span>{countryName}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                {values.instagram_handle && (
                  <Link
                    href={igHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 shadow-sm hover:bg-zinc-200 transition">
                      <Image src={"/img/instagram.webp"} alt="Instagram" width={22} height={22} />
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-700">{formatCount(values.instagram_followers)}</span>
                  </Link>
                )}
                {values.tiktok_handle && (
                  <Link
                    href={ttHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 shadow-sm hover:bg-zinc-200 transition">
                      <Image src={"/img/tiktok.webp"} alt="TikTok" width={22} height={22} />
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-700">{formatCount(values.tiktok_followers)}</span>
                  </Link>
                )}
                {values.youtube_handle && (
                  <Link
                    href={ytHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 shadow-sm hover:bg-zinc-200 transition">
                      <Image src={"/img/youtube.webp"} alt="YouTube" width={22} height={22} />
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-700">{formatCount(values.youtube_subscribers)}</span>
                  </Link>
                )}
                {values.facebook_handle && (
                  <Link
                    href={fbHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-lg font-bold text-blue-600 shadow-sm hover:bg-zinc-200 transition">
                      f
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-700">{formatCount(values.facebook_followers)}</span>
                  </Link>
                )}
              </div>

              <div className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/80 px-5 py-4 text-center shadow-sm">
                <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  <span>Total Followers</span>
                  <Eye className="h-3.5 w-3.5 text-zinc-400" />
                </p>
                <p className="mt-1 text-2xl font-bold text-primary">{totalFollowers}</p>
                <p className="text-[11px] text-zinc-500">Across all social platforms</p>
              </div>

              {categories.length > 0 && (
                <div className="flex w-full flex-col gap-2">
                  <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Categories
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex w-full flex-col gap-3">
                <a
                  href={ctaHref}
                  target={ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-full rounded-xl bg-[#FDE68A] px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:shadow-md text-center"
                >
                  Contact for collabs
                </a>
                {values.booking_link && (
                  <Link
                    href={values.booking_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-xl border border-zinc-200 px-5 py-3 text-center text-sm font-semibold text-zinc-800 hover:border-primary/60 hover:text-primary"
                  >
                    Book a call
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">About</p>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                Verified Creator
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">{bio}</p>
          </div>

          {videos.length > 0 && (
            <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-zinc-900">Featured Videos</p>
                <span className="text-xs text-zinc-500">Grid highlights</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {videos.map((video, idx) => (
                  <div key={`${video.url}-${idx}`} className="relative">
                    {renderVideoItem(video)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {videos.length === 0 && (
            <div className="rounded-3xl border border-dashed border-zinc-200 bg-white/80 p-6 shadow-sm">
              <p className="text-sm font-semibold text-zinc-800 mb-3">Featured Videos</p>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-300"
                  >
                    <Film className="h-6 w-6" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {services && services.length > 0 && (
            <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-zinc-900">Services & Packages</p>
              </div>
              <div className="space-y-3">
                {services.map((service, idx) => {
                  const platform = service.platform || "other";
                  const title = service.title || "Untitled service";
                  const price = service.price || (service.is_contact_only ? "Contact for pricing" : "Custom");
                  const isContact = !!service.is_contact_only;

                  const platformLabel =
                    platform === "instagram"
                      ? "Instagram"
                      : platform === "tiktok"
                      ? "TikTok"
                      : platform === "youtube"
                      ? "YouTube"
                      : "Other";

                  const platformColor =
                    platform === "instagram"
                      ? "bg-pink-50 text-pink-600"
                      : platform === "tiktok"
                      ? "bg-cyan-50 text-cyan-600"
                      : platform === "youtube"
                      ? "bg-red-50 text-red-600"
                      : "bg-zinc-100 text-zinc-600";

                  return (
                    <div
                      key={`${title}-${idx}`}
                      className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-white to-zinc-50/70 px-3 py-4 text-sm shadow-sm ring-1 ring-white/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="truncate text-[15px] font-semibold text-zinc-900">{title}</p>
                        <span className="whitespace-nowrap rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                          {price}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
                            platformColor
                          )}
                        >
                          {platformLabel}
                        </span>
                        {isContact && (
                          <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700">
                            Contact only
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {brandLogos.length > 0 && (
            <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur space-y-3">
              <p className="text-sm font-semibold text-zinc-900">Collaborations</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
                {brandLogos.map((logo, idx) => (
                  <img
                    key={`${logo.url}-${idx}`}
                    src={logo.url}
                    alt="Brand logo"
                    className="h-8 w-auto object-contain opacity-80 transition hover:opacity-100"
                  />
                ))}
              </div>
            </div>
          )}

          {demographics && (topGeo.length > 0 || demographics.gender || demographics.age) && (
            <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur space-y-3">
              <p className="text-sm font-semibold text-zinc-900">Audience</p>
              <div className="space-y-2 text-xs text-zinc-600">
                {topGeo.length > 0 && (
                  <p>
                    Top Geo:{" "}
                    {topGeo.map((g) => (g.percentage ? `${g.location} (${g.percentage})` : g.location)).join(", ")}
                  </p>
                )}
                {demographics.gender && <p>Gender: {demographics.gender}</p>}
                {demographics.age && <p>Age: {demographics.age}</p>}
              </div>
            </div>
          )}

          {(values.primary_email || values.primary_phone) && (
            <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600">Contact</p>
              {values.primary_email && (
                <p className="text-xs">
                  Email:{" "}
                  <a
                    href={`mailto:${values.primary_email}`}
                    className="font-medium text-zinc-900 underline underline-offset-2"
                  >
                    {values.primary_email}
                  </a>
                </p>
              )}
              {values.primary_phone && (
                <p className="text-xs">
                  Phone / WhatsApp:{" "}
                  <span className="font-medium text-zinc-900">{values.primary_phone}</span>
                </p>
              )}
            </div>
          )}

          {!isPro && (
            <div className="pb-6 pt-6 border-t border-zinc-200 bg-zinc-50/50 -mx-4 px-4">
              <div className="text-center">
                <p className="text-[12px] sm:text-sm text-zinc-600 mb-3 leading-relaxed">
                  Created with{" "}
                  <Link 
                    href="https://creatorskit.app" 
                    className="font-semibold text-zinc-900 hover:text-primary underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CreatorKit
                  </Link>
                </p>
                <Link
                  href="https://creatorskit.app"
                  className="inline-block text-[11px] sm:text-xs text-zinc-500 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Create your own page →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

