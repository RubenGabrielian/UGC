"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Film, PlayCircle, Eye, Globe2, Users, Calendar } from "lucide-react";
import { ContactModal, type ServicePackage } from "@/components/ContactModal";

export type PublicProfileValues = {
  avatar_url?: string | null;
  username?: string | null;
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

export type PublicProfileMode = "mobile" | "desktop";

function formatNumber(value?: number | null) {
  if (value == null || Number.isNaN(value)) return "—";
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

function formatViewsLabel(raw?: string | null) {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (/[kKmM]/.test(trimmed) || /million/i.test(trimmed)) return trimmed;

  const numeric = Number(trimmed.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(numeric)) return trimmed;

  if (numeric >= 1_000_000) return `${(numeric / 1_000_000).toFixed(1)}M`;
  if (numeric >= 1_000) return `${(numeric / 1_000).toFixed(1)}K`;
  return numeric.toLocaleString();
}

export function PublicProfileView({
  values,
  creatorId,
  servicesPackages,
}: {
  values: PublicProfileValues;
  mode?: PublicProfileMode;
  username?: string;
  creatorId: string;
  servicesPackages: ServicePackage[];
}) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const name = values.full_name || values.username || "Creator Name";
  const handle = values.instagram_handle || values.tiktok_handle || "@username";
  const bio =
    values.bio ||
    "Short introduction for brand managers: tell them about your niche, audience, and results.";

  const igFollowers = formatNumber(values.instagram_followers);
  const ttFollowers = formatNumber(values.tiktok_followers);
  const ytFollowers = formatNumber(values.youtube_subscribers);
  const fbFollowers = formatNumber(values.facebook_followers);
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
  const collabHeadline =
    (values.collaboration_headline && values.collaboration_headline.trim()) || "Who I've Collaborated With";

  const services = values.services_packages ?? [];

  const getCtaHrefAndLabel = () => {
    const booking = values.booking_link?.trim();
    const email = values.primary_email?.trim();

    if (booking) {
      const href = booking;
      return { href, label: "Book Now" };
    }

    if (email) {
      return { href: `mailto:${email}`, label: "Contact Me" };
    }

    return { href: "#", label: "Book this creator" };
  };

  const { label: ctaLabel } = getCtaHrefAndLabel();

  const getPhoneHref = () => {
    const raw = values.primary_phone?.trim();
    if (!raw) return null;
    if (raw.startsWith("http")) return raw;
    if (raw.includes("wa.me") || raw.toLowerCase().includes("whatsapp")) return raw;
    const digits = raw.replace(/[^+\d]/g, "");
    return digits ? `tel:${digits}` : null;
  };      

  const phoneHref = getPhoneHref();

  const getVideoBadgeIcon = (url: string) => {
    const lower = url.toLowerCase();
    if (lower.includes("tiktok")) {
      return <Image src={"/img/tiktok.webp"} alt="TikTok" width={24} height={24} />;
    }
    if (lower.includes("youtube")) {
      return <Image src={"/img/youtube.webp"} alt="YouTube" width={24} height={24} />;
    }
    if (lower.includes("instagram") || lower.includes("insta")) {
      return <Image src={"/img/instagram.webp"} alt="Instagram" width={24} height={24} />;
    }
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

    const encoded = encodeURIComponent(url);
    return `https://api.microlink.io/?url=${encoded}&embed=image.url&palette=true`;
  };

  const renderVideoItem = useMemo(
    () =>
      function renderVideoItem(video: { url: string; views?: string | null }) {
        const url = video.url;
        const aspectClass = "aspect-[9/16]";
        const thumb = getThumbnailUrl(url);
        const handleClick = () => {
          if (typeof window !== "undefined") {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        };

        return (
          <div
            className={cn(
              "group relative w-full overflow-hidden rounded-xl bg-zinc-100",
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
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="h-10 w-10 text-white drop-shadow-lg opacity-90 group-hover:scale-105 transition" />
            </div>
            <div className="absolute top-2 left-2">{getVideoBadgeIcon(url)}</div>
            {formatViewsLabel(video.views).length > 0 && (
              <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] text-white flex items-center gap-1">
                <Eye strokeWidth={2.25} size={15} />
                <span>{formatViewsLabel(video.views)}</span>
              </div>
            )}
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

  return (
    <>
      {/* Mobile Layout */}
      <div className="relative flex flex-col p-4 pb-24 text-zinc-900 overflow-y-auto md:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-100" />
        <div className="relative grid grid-cols-2 gap-3">
          <div className="col-span-2 rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center gap-3">
              <Avatar className="h-20 w-20 border border-zinc-200 shadow-sm overflow-hidden">
                <AvatarImage alt={name} src={values.avatar_url || undefined} />
                <AvatarFallback className="bg-zinc-100 text-zinc-800 text-lg font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            <div>
              <p className="text-lg font-semibold leading-tight text-zinc-900">{name}</p>
              <p className="text-sm text-zinc-500">{handle}</p>
            </div>
            <p className="text-sm text-zinc-600">{bio}</p>
          </div>
        </div>

        {values.instagram_handle && (
          <Link
            href={igHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[2rem] bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-center rounded-full p-2 text-pink-500">
              <Image src={"/img/instagram.webp"} alt="Instagram" width={24} height={24} />
            </div>
            <p className="mt-2 text-sm font-medium text-zinc-900 text-center">Instagram</p>
            <p className="text-xs text-zinc-500 text-center">
              {values.instagram_handle || "@instagram"}
            </p>
            <p className="text-center text-2xl font-bold text-zinc-900">{igFollowers}</p>
          </Link>
        )}

        {values.tiktok_handle && (
          <Link
            href={ttHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[2rem] bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-center rounded-full">
              <Image src={"/img/tiktok.webp"} alt="TikTok" width={24} height={24} />
            </div>
            <p className="mt-2 text-center text-sm font-medium text-zinc-900">TikTok</p>
            <p className="text-center text-xs text-zinc-500">
              {values.tiktok_handle || "@tiktok"}
            </p>
            <p className="text-center text-2xl font-bold text-zinc-900">{ttFollowers}</p>
          </Link>
        )}

        {values.youtube_handle && (
          <Link
            href={ytHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[2rem] bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-center rounded-full  p-2 text-red-500">
              <Image src={"/img/youtube.webp"} alt="YouTube" width={24} height={24} />
            </div>
            <p className="mt-2 text-center text-sm font-medium text-zinc-900">YouTube</p>
            <p className="text-center text-xs text-zinc-500">
              {values.youtube_handle || "@youtube"}
            </p>
            <p className="text-center text-2xl font-bold text-zinc-900">{ytFollowers}</p>
          </Link>
        )}

        {values.facebook_handle && (
          <Link
            href={fbHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[2rem] bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-center rounded-full p-2 text-blue-600">
              <span className="text-lg font-bold">f</span>
            </div>
            <p className="mt-2 text-center text-sm font-medium text-zinc-900">Facebook</p>
            <p className="text-center text-xs text-zinc-500">
              {values.facebook_handle || "@facebook"}
            </p>
            <p className="text-center text-2xl font-bold text-zinc-900">{fbFollowers}</p>
          </Link>
        )}

        <div className="col-span-2 rounded-[2rem] bg-transparent p-1">
          <p className="mb-2 text-sm font-semibold text-zinc-800">Selected Work</p>
          <div className="grid grid-cols-2 gap-2">
            {videos.length > 0
              ? videos.map((video, idx) => (
                  <div key={`${video.url}-${idx}`} className="relative">
                    {renderVideoItem(video)}
                  </div>
                ))
              : Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="aspect-[9/16] rounded-xl border border-dashed border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-300"
                  >
                    <Film className="h-6 w-6" />
                  </div>
                ))}
          </div>
        </div>

        {services && services.length > 0 && (
          <div className="col-span-2 rounded-[2rem] bg-white p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-zinc-900">My Services & Packages</p>
            </div>
            <div className="space-y-3">
              {services.map((service, idx) => {
                const platform = service.platform || "other";
                const title = service.title || "Untitled service";
                const price = service.price || "Custom";
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
                    className="flex items-center justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                            platformColor
                          )}
                        >
                          {platformLabel}
                        </span>
                        <span className="truncate text-sm font-medium text-zinc-900">
                          {title}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {isContact ? (
                        <button
                          type="button"
                          className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white shadow-sm"
                        >
                          Contact for Pricing
                        </button>
                      ) : (
                        <>
                          <span className="text-sm font-semibold text-zinc-900">{price}</span>
                          <button
                            type="button"
                            className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-800 bg-white"
                          >
                            Book Now
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {brandLogos.length > 0 && (
          <div className="col-span-2 mt-4 rounded-[1.5rem] bg-white p-4 shadow-sm">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              {collabHeadline.toUpperCase()}
            </p>
            <p className="mt-1 text-center text-sm text-zinc-400">
              Collaborations based on authentic stories.
            </p>
           <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
              {brandLogos.map((logo, idx) => (
                <img
                  key={`${logo.url}-${idx}`}
                  src={logo.url}
                  alt="Brand logo"
                  className="h-8 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        )}

        {demographics && (topGeo.length > 0 || demographics.gender || demographics.age) && (
          <div className="col-span-2 rounded-[2rem] bg-white p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-zinc-900">Who Follows Me</p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-zinc-500">
                  <Globe2 className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                    Top Geographic Locations
                  </p>
                  <p className="mt-1 text-sm text-zinc-900">
                    {topGeo.length > 0
                      ? topGeo
                          .map((g) =>
                            g.percentage ? `${g.location} (${g.percentage})` : g.location
                          )
                          .join(", ")
                      : "Creator hasn't added geographic data yet."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-zinc-500">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                    Gender
                  </p>
                  <p className="mt-1 text-sm font-semibold text-zinc-900">
                    {demographics.gender || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-zinc-500">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                    Age Group
                  </p>
                  <p className="mt-1 text-sm font-semibold text-zinc-900">
                    {demographics.age || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col-span-2 mt-4 space-y-2">
          {(values.primary_email || values.primary_phone) && (
            <div className="rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 text-xs text-zinc-600 flex flex-col gap-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Contact Information
              </p>
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
              {values.primary_phone && phoneHref && (
                <p className="text-xs">
                  Phone / WhatsApp:{" "}
                  <a
                    href={phoneHref}
                    className="font-medium text-zinc-900 underline underline-offset-2"
                  >
                    {values.primary_phone}
                  </a>
                </p>
              )}
            </div>
          )}

          <div className="pointer-events-none bottom-4 left-0 right-0 px-2">
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="pointer-events-auto inline-flex w-full items-center justify-center rounded-full bg-zinc-900 text-white px-4 py-3 text-sm font-semibold shadow-lg shadow-black/20 backdrop-blur-md hover:bg-zinc-800 transition"
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
        <div className="container mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile Info & Socials */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile Card */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center text-center gap-4">
                <Avatar className="h-24 w-24 border border-zinc-200 shadow-sm overflow-hidden">
                  <AvatarImage alt={name} src={values.avatar_url || undefined} />
                  <AvatarFallback className="bg-zinc-100 text-zinc-800 text-xl font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xl font-semibold leading-tight text-zinc-900">{name}</p>
                  <p className="text-sm text-zinc-500 mt-1">{handle}</p>
                </div>
                <p className="text-sm text-zinc-600">{bio}</p>
              </div>
            </div>

            {/* Social Platforms */}
            <div className="grid grid-cols-2 gap-4">
              {values.instagram_handle && (
                <Link
                  href={igHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center justify-center rounded-full p-2 text-pink-500">
                    <Image src={"/img/instagram.webp"} alt="Instagram" width={24} height={24} />
                  </div>
                  <p className="mt-2 text-sm font-medium text-zinc-900 text-center">Instagram</p>
                  <p className="text-xs text-zinc-500 text-center">
                    {values.instagram_handle || "@instagram"}
                  </p>
                  <p className="text-center text-xl font-bold text-zinc-900">{igFollowers}</p>
                </Link>
              )}

              {values.tiktok_handle && (
                <Link
                  href={ttHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center justify-center rounded-full">
                    <Image src={"/img/tiktok.webp"} alt="TikTok" width={24} height={24} />
                  </div>
                  <p className="mt-2 text-center text-sm font-medium text-zinc-900">TikTok</p>
                  <p className="text-center text-xs text-zinc-500">
                    {values.tiktok_handle || "@tiktok"}
                  </p>
                  <p className="text-center text-xl font-bold text-zinc-900">{ttFollowers}</p>
                </Link>
              )}

              {values.youtube_handle && (
                <Link
                  href={ytHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center justify-center rounded-full p-2 text-red-500">
                    <Image src={"/img/youtube.webp"} alt="YouTube" width={24} height={24} />
                  </div>
                  <p className="mt-2 text-center text-sm font-medium text-zinc-900">YouTube</p>
                  <p className="text-center text-xs text-zinc-500">
                    {values.youtube_handle || "@youtube"}
                  </p>
                  <p className="text-center text-xl font-bold text-zinc-900">{ytFollowers}</p>
                </Link>
              )}

              {values.facebook_handle && (
                <Link
                  href={fbHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center justify-center rounded-full p-2 text-blue-600">
                    <span className="text-lg font-bold">f</span>
                  </div>
                  <p className="mt-2 text-center text-sm font-medium text-zinc-900">Facebook</p>
                  <p className="text-center text-xs text-zinc-500">
                    {values.facebook_handle || "@facebook"}
                  </p>
                  <p className="text-center text-xl font-bold text-zinc-900">{fbFollowers}</p>
                </Link>
              )}
            </div>

            {/* Contact Info - Desktop */}
            {(values.primary_email || values.primary_phone) && (
              <div className="rounded-xl border border-zinc-200 bg-white/70 px-4 py-3 text-xs text-zinc-600 flex flex-col gap-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Contact Information
                </p>
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
                {values.primary_phone && phoneHref && (
                  <p className="text-xs">
                    Phone / WhatsApp:{" "}
                    <a
                      href={phoneHref}
                      className="font-medium text-zinc-900 underline underline-offset-2"
                    >
                      {values.primary_phone}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Selected Work */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <p className="mb-4 text-base font-semibold text-zinc-900">Selected Work</p>
              <div className="grid grid-cols-3 gap-4">
                {videos.length > 0
                  ? videos.map((video, idx) => (
                      <div key={`${video.url}-${idx}`} className="relative">
                        {renderVideoItem(video)}
                      </div>
                    ))
                  : Array.from({ length: 3 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="aspect-[9/16] rounded-xl border border-dashed border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-300"
                      >
                        <Film className="h-6 w-6" />
                      </div>
                    ))}
              </div>
            </div>

            {/* Services & Packages */}
            {services && services.length > 0 && (
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <p className="mb-4 text-base font-semibold text-zinc-900">My Services & Packages</p>
                <div className="space-y-3">
                  {services.map((service, idx) => {
                    const platform = service.platform || "other";
                    const title = service.title || "Untitled service";
                    const price = service.price || "Custom";
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
                        className="flex items-center justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                                platformColor
                              )}
                            >
                              {platformLabel}
                            </span>
                            <span className="truncate text-sm font-medium text-zinc-900">
                              {title}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {isContact ? (
                            <button
                              type="button"
                              className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm whitespace-nowrap"
                            >
                              Contact for Pricing
                            </button>
                          ) : (
                            <>
                              <span className="text-sm font-semibold text-zinc-900 whitespace-nowrap">{price}</span>
                              <button
                                type="button"
                                className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-medium text-zinc-800 bg-white whitespace-nowrap"
                              >
                                Book Now
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Collaborations */}
            {brandLogos.length > 0 && (
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  {collabHeadline.toUpperCase()}
                </p>
                <p className="mt-2 text-center text-sm text-zinc-400">
                  Collaborations based on authentic stories.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
                  {brandLogos.map((logo, idx) => (
                    <img
                      key={`${logo.url}-${idx}`}
                      src={logo.url}
                      alt="Brand logo"
                      className="h-10 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Audience Demographics */}
            {demographics && (topGeo.length > 0 || demographics.gender || demographics.age) && (
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <p className="mb-4 text-base font-semibold text-zinc-900">Who Follows Me</p>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-zinc-500">
                      <Globe2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                        Top Geographic Locations
                      </p>
                      <p className="mt-1 text-sm text-zinc-900">
                        {topGeo.length > 0
                          ? topGeo
                              .map((g) =>
                                g.percentage ? `${g.location} (${g.percentage})` : g.location
                              )
                              .join(", ")
                          : "Creator hasn't added geographic data yet."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-zinc-500">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                        Gender
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        {demographics.gender || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-zinc-500">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                        Age Group
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        {demographics.age || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Button - Desktop */}
            <div className="sticky bottom-6">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="w-full inline-flex items-center justify-center rounded-full bg-zinc-900 text-white px-6 py-4 text-base font-semibold shadow-lg shadow-black/20 hover:bg-zinc-800 transition"
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>

      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        creatorId={creatorId}
        servicesPackages={servicesPackages}
      />
    </>
  );
}


