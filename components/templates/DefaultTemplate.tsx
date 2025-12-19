"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Info } from "lucide-react";
import { ContactModal, type ServicePackage } from "@/components/ContactModal";
import { countryByCode } from "@/lib/countries";
import { calculateTotalFollowers } from "@/lib/followers";
import type { PublicProfileValues } from "../PublicProfileView";

interface DefaultTemplateProps {
  values: PublicProfileValues;
  creatorId: string;
  servicesPackages: ServicePackage[];
  isPro?: boolean;
}

export function DefaultTemplate({ values, creatorId, servicesPackages, isPro = false }: DefaultTemplateProps) {
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
                      {isPro && (
                        <CheckCircle2 className="h-5 w-5 text-blue-500" aria-label="verified" />
                      )}
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
                    {phoneHref && (
                      <Link
                        href={phoneHref}
                        className="w-full rounded-xl border border-zinc-200 px-5 py-3 text-center text-sm font-semibold text-zinc-800 hover:border-primary/60 hover:text-primary"
                      >
                        Call / WhatsApp
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {values.collaboration_headline && (
                <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
                  <h2 className="text-xl font-bold text-zinc-900">{values.collaboration_headline}</h2>
                </div>
              )}

              <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
                <h3 className="mb-4 text-lg font-semibold text-zinc-900">About</h3>
                <p className="text-zinc-700 leading-relaxed">{bio}</p>
              </div>

              {brandLogos.length > 0 && (
                <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
                  <h3 className="mb-4 text-lg font-semibold text-zinc-900">Brands I&apos;ve Worked With</h3>
                  <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
                    {brandLogos.map((logo, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50"
                      >
                        <Image
                          src={logo.url}
                          alt={`Brand ${idx + 1}`}
                          fill
                          className="object-contain p-2"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {videoUrls.length > 0 && (
                <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
                  <h3 className="mb-4 text-lg font-semibold text-zinc-900">Featured Content</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {videoUrls.map((video, idx) => {
                      const url = typeof video === "string" ? video : video.url || "";
                      const views = typeof video === "string" ? null : video.views;
                      return (
                        <div key={idx} className="group relative overflow-hidden rounded-xl border border-zinc-200">
                          <div className="relative aspect-video bg-zinc-100">
                            <Image
                              src={getVideoThumb(url)}
                              alt={`Video ${idx + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                              <Link
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-lg"
                              >
                                Watch
                              </Link>
                            </div>
                          </div>
                          {views && (
                            <div className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                              {views}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {services.length > 0 && (
                <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
                  <h3 className="mb-4 text-lg font-semibold text-zinc-900">Services & Packages</h3>
                  <div className="space-y-3">
                    {services.map((service, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/50 p-4"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-zinc-900">{service.title || "Service"}</p>
                          <p className="text-sm text-zinc-600 capitalize">{service.platform}</p>
                        </div>
                        <div className="text-right">
                          {service.is_contact_only ? (
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                              Contact for Quote
                            </span>
                          ) : (
                            <p className="font-bold text-zinc-900">{service.price || "—"}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {demographics && (
                <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
                  <h3 className="mb-4 text-lg font-semibold text-zinc-900">Audience Insights</h3>
                  <div className="space-y-4">
                    {topGeo.length > 0 && (
                      <div>
                        <p className="mb-2 text-sm font-semibold text-zinc-700">Top Locations</p>
                        <div className="flex flex-wrap gap-2">
                          {topGeo.map((geo, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
                            >
                              {geo.location} {geo.percentage ? `(${geo.percentage})` : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {demographics.age && (
                      <div>
                        <p className="mb-1 text-sm font-semibold text-zinc-700">Age Range</p>
                        <p className="text-sm text-zinc-600">{demographics.age}</p>
                      </div>
                    )}
                    {demographics.gender && (
                      <div>
                        <p className="mb-1 text-sm font-semibold text-zinc-700">Gender Distribution</p>
                        <p className="text-sm text-zinc-600">{demographics.gender}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isPro && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-6 px-4">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              Created with{" "}
              <Link href="https://creatorskit.app" className="font-semibold text-zinc-900 dark:text-zinc-50 hover:text-primary underline">
                CreatorKit
              </Link>
            </p>
            <Link
              href="https://creatorskit.app"
              className="text-xs text-zinc-500 dark:text-zinc-500 hover:text-primary transition-colors"
            >
              Create your own page →
            </Link>
          </div>
        </div>
      )}

      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        creatorId={creatorId}
        servicesPackages={servicesPackages}
      />
    </>
  );
}
