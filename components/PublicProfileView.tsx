"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Info } from "lucide-react";
import { ContactModal, type ServicePackage } from "@/components/ContactModal";
import { countryByCode } from "@/lib/countries";
import { calculateTotalFollowers } from "@/lib/followers";

export type PublicProfileValues = {
  avatar_url?: string | null;
  username?: string | null;
  full_name?: string | null;
  country?: string | null;
  categories?: string[] | null;
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
  followers_count?: number | null;
  brand_logos?: { url: string }[] | string[] | null;
  video_urls?: ({ url?: string | null } | string)[] | null;
  services_packages?: {
    title?: string | null;
    platform?: "instagram" | "tiktok" | "youtube" | "other";
    price?: string | null;
    is_contact_only?: boolean;
  }[] | null;
  audience_demographics?: {
    geo?: { location?: string | null; percentage?: string | null }[];
    age?: string | null;
    gender?: string | null;
  } | null;
};

export function PublicProfileView({
  values,
  creatorId,
  servicesPackages,
}: {
  values: PublicProfileValues;
  creatorId: string;
  servicesPackages: ServicePackage[];
}) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
  const videoUrls = values.video_urls ?? [];
  const services = values.services_packages ?? [];
  const demographics = values.audience_demographics;
  const topGeo =
    demographics?.geo
      ?.filter((g) => (g.location || "").trim().length > 0)
      .slice(0, 3) ?? [];

  const formatCount = (value?: number | null) => {
    if (value == null || Number.isNaN(value)) return "—";
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  const getVideoThumb = (url: string) => {
    const lower = url.toLowerCase();
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
        return null;
      }
      return null;
    };

    if (lower.includes("youtube") || lower.includes("youtu.be")) {
      const id = extractYouTubeId(url);
      if (id) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    }

    return `https://api.microlink.io/?url=${encodeURIComponent(url)}&embed=image.url`;
  };

  const getPhoneHref = () => {
    const raw = values.primary_phone?.trim();
    if (!raw) return null;
    if (raw.startsWith("http")) return raw;
    if (raw.includes("wa.me") || raw.toLowerCase().includes("whatsapp")) return raw;
    const digits = raw.replace(/[^+\d]/g, "");
    return digits ? `tel:${digits}` : null;
  };
  const phoneHref = getPhoneHref();

  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2) || "CR";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white px-4 py-12 lg:px-8">
        <div className="relative mx-auto w-full max-w-6xl">
          <div
            className="absolute inset-0 rounded-[48px] bg-[radial-gradient(circle_at_top,_#eef2ff,_#f8fafc)] blur-3xl opacity-70"
            aria-hidden
          />

          <div className="relative space-y-6 lg:grid lg:grid-cols-3 lg:items-start lg:gap-8 lg:space-y-0">
            <div className="space-y-6 lg:sticky lg:top-10">
              <div className="rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-2xl shadow-black/10 backdrop-blur lg:p-8">
                <div className="flex flex-col items-center gap-4 text-center">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl ring-4 ring-white/70">
                    <AvatarImage alt={name} src={values.avatar_url || undefined} />
                    <AvatarFallback className="bg-zinc-100 text-zinc-800 text-2xl font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 text-2xl font-semibold text-zinc-900">
                      <span>{name}</span>
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-label="verified" />
                    </div>
                    <p className="text-sm text-zinc-500">{handle}</p>
                    {countryName && (
                      <p className="flex items-center justify-center gap-2 text-sm text-zinc-600">
                        <span className="leading-none text-lg">{countryFlag}</span>
                        <span>{countryName}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
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
                      <Info className="h-3.5 w-3.5 text-zinc-400" />
                    </p>
                    <p className="mt-1 text-3xl font-bold text-primary">{totalFollowers}</p>
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
                    <button
                      type="button"
                      onClick={() => setIsContactModalOpen(true)}
                      className="w-full rounded-xl bg-[#FDE68A] px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:shadow-md"
                    >
                      Contact for collabs
                    </button>
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
              <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur lg:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-zinc-900">About</p>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    Verified Creator
                  </span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-zinc-700">{bio}</p>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-2">
             

              {videoUrls.length > 0 && (
                <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur lg:p-8">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-zinc-900">Featured Videos</p>
                    <span className="text-xs text-zinc-500">Grid highlights</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
                    {videoUrls.map((video, idx) => {
                      const url = typeof video === "string" ? video : video.url;
                      if (!url) return null;
                      const thumb = getVideoThumb(url);
                      const domain = (() => {
                        try {
                          const parsed = new URL(url);
                          return parsed.hostname.replace(/^www\./, "");
                        } catch {
                          return "";
                        }
                      })();
                      return (
                        <Link
                          key={`${url}-${idx}`}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative block aspect-square overflow-hidden rounded-2xl bg-zinc-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                          <Image
                            src={thumb}
                            alt="Video thumbnail"
                            width={600}
                            height={600}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-70 transition group-hover:opacity-90" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs font-medium text-white">
                            <span className="truncate">{domain || "Watch"}</span>
                            <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-zinc-800 shadow-sm">
                              View
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {services.length > 0 && (
                  <div className="md:col-span-2 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur">
                    <p className="text-sm font-semibold text-zinc-900">Services & Packages</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {services.map((service, idx) => {
                        const platform = service.platform || "other";
                        const title = service.title || "Untitled service";
                        const price = service.price || (service.is_contact_only ? "Contact for pricing" : "Custom");
                        const isContactOnly = service.is_contact_only;
                        const platformLabel =
                          platform === "instagram"
                            ? "Instagram"
                            : platform === "tiktok"
                            ? "TikTok"
                            : platform === "youtube"
                            ? "YouTube"
                            : "Other";
                        return (
                          <div
                            key={`${title}-${idx}`}
                            className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-white to-zinc-50/70 px-4 py-4 text-sm shadow-sm ring-1 ring-white/60"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="truncate text-[15px] font-semibold text-zinc-900">{title}</p>
                              <span className="whitespace-nowrap rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                                {price}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                                {platformLabel}
                              </span>
                              {isContactOnly && (
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
                  <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur">
                    <p className="text-sm font-semibold text-zinc-900">Collaborations</p>
                    <div className="mt-4 flex flex-wrap items-center gap-6">
                      {brandLogos.map((logo, idx) => (
                        <Image
                          key={`${logo.url}-${idx}`}
                          src={logo.url}
                          alt="Brand logo"
                          width={96}
                          height={36}
                          className="h-9 w-auto object-contain opacity-80 transition hover:opacity-100"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {(values.primary_email || values.primary_phone) && (
                  <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600">Contact</p>
                    <div className="mt-3 space-y-2 text-xs text-zinc-700">
                      {values.primary_email && (
                        <p>
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
                        <p>
                          Phone / WhatsApp:{" "}
                          <a href={phoneHref} className="font-medium text-zinc-900 underline underline-offset-2">
                            {values.primary_phone}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {demographics && (topGeo.length > 0 || demographics.gender || demographics.age) && (
                  <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur">
                    <p className="text-sm font-semibold text-zinc-900">Audience</p>
                    <div className="mt-3 space-y-2 text-xs text-zinc-600">
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

              <p className="pb-6 text-center text-xs text-zinc-400">
                Powered by <span className="font-semibold text-zinc-600">creatorskit.app</span>
              </p>
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
