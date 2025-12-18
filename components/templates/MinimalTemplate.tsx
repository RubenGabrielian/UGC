"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";
import { ContactModal, type ServicePackage } from "@/components/ContactModal";
import { countryByCode } from "@/lib/countries";
import { calculateTotalFollowers } from "@/lib/followers";
import type { PublicProfileValues } from "../PublicProfileView";

interface MinimalTemplateProps {
  values: PublicProfileValues;
  creatorId: string;
  servicesPackages: ServicePackage[];
}

export function MinimalTemplate({ values, creatorId, servicesPackages }: MinimalTemplateProps) {
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
      <div className="min-h-screen bg-white px-4 py-16 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-4xl">
          {/* Header Section - Centered */}
          <div className="mb-12 text-center">
            <Avatar className="mx-auto mb-6 h-24 w-24 border-2 border-zinc-200 dark:border-zinc-800">
              <AvatarImage alt={name} src={values.avatar_url || undefined} />
              <AvatarFallback className="bg-zinc-100 text-zinc-800 text-xl font-semibold dark:bg-zinc-800 dark:text-zinc-200">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="mb-4">
              <div className="mb-2 flex items-center justify-center gap-2">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{name}</h1>
                <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-label="verified" />
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">{handle}</p>
              {countryName && (
                <p className="mt-2 flex items-center justify-center gap-2 text-sm text-zinc-500">
                  <span className="text-lg">{countryFlag}</span>
                  <span>{countryName}</span>
                </p>
              )}
            </div>

            {/* Social Links - Horizontal */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
              {values.instagram_handle && (
                <Link
                  href={igHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <Image src={"/img/instagram.webp"} alt="Instagram" width={20} height={20} />
                  <span>{formatCount(values.instagram_followers)}</span>
                </Link>
              )}
              {values.tiktok_handle && (
                <Link
                  href={ttHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <Image src={"/img/tiktok.webp"} alt="TikTok" width={20} height={20} />
                  <span>{formatCount(values.tiktok_followers)}</span>
                </Link>
              )}
              {values.youtube_handle && (
                <Link
                  href={ytHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <Image src={"/img/youtube.webp"} alt="YouTube" width={20} height={20} />
                  <span>{formatCount(values.youtube_subscribers)}</span>
                </Link>
              )}
              {values.facebook_handle && (
                <Link
                  href={fbHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <span className="text-lg font-bold text-blue-600">f</span>
                  <span>{formatCount(values.facebook_followers)}</span>
                </Link>
              )}
            </div>

            {/* Total Followers */}
            <div className="mb-8 inline-block rounded-lg border border-zinc-200 bg-zinc-50 px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Total Followers</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">{totalFollowers}</p>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="mb-8 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="w-full rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto"
              >
                Contact for Collabs
              </button>
              {values.booking_link && (
                <Link
                  href={values.booking_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-lg border border-zinc-300 px-6 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 sm:w-auto"
                >
                  Book a Call
                </Link>
              )}
              {phoneHref && (
                <Link
                  href={phoneHref}
                  className="w-full rounded-lg border border-zinc-300 px-6 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 sm:w-auto"
                >
                  Call / WhatsApp
                </Link>
              )}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {values.collaboration_headline && (
              <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {values.collaboration_headline}
                </h2>
              </div>
            )}

            <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
              <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">About</h3>
              <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">{bio}</p>
            </div>

            {brandLogos.length > 0 && (
              <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <h3 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Brands I&apos;ve Worked With
                </h3>
                <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-5">
                  {brandLogos.map((logo, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <Image
                        src={logo.url}
                        alt={`Brand ${idx + 1}`}
                        fill
                        className="object-contain p-3"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {videoUrls.length > 0 && (
              <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <h3 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Featured Content</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {videoUrls.map((video, idx) => {
                    const url = typeof video === "string" ? video : video.url || "";
                    const views = typeof video === "string" ? null : video.views;
                    return (
                      <div key={idx} className="group relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-900">
                          <Image
                            src={getVideoThumb(url)}
                            alt={`Video ${idx + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                            <Link
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-lg"
                            >
                              Watch
                            </Link>
                          </div>
                        </div>
                        {views && (
                          <div className="absolute top-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white">
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
              <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <h3 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Services & Packages</h3>
                <div className="space-y-4">
                  {services.map((service, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-zinc-900 dark:text-zinc-50">{service.title || "Service"}</p>
                        <p className="text-sm text-zinc-600 capitalize dark:text-zinc-400">{service.platform}</p>
                      </div>
                      <div className="text-right">
                        {service.is_contact_only ? (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                            Contact for Quote
                          </span>
                        ) : (
                          <p className="font-bold text-zinc-900 dark:text-zinc-50">{service.price || "—"}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {demographics && (
              <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <h3 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Audience Insights</h3>
                <div className="space-y-4">
                  {topGeo.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Top Locations</p>
                      <div className="flex flex-wrap gap-2">
                        {topGeo.map((geo, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                          >
                            {geo.location} {geo.percentage ? `(${geo.percentage})` : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {demographics.age && (
                    <div>
                      <p className="mb-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Age Range</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{demographics.age}</p>
                    </div>
                  )}
                  {demographics.gender && (
                    <div>
                      <p className="mb-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Gender Distribution</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{demographics.gender}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(values.primary_email || values.primary_phone) && (
              <div>
                <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Contact</h3>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {values.primary_email && (
                    <p>
                      Email:{" "}
                      <a
                        href={`mailto:${values.primary_email}`}
                        className="font-medium text-zinc-900 underline dark:text-zinc-50"
                      >
                        {values.primary_email}
                      </a>
                    </p>
                  )}
                  {values.primary_phone && phoneHref && (
                    <p>
                      Phone / WhatsApp:{" "}
                      <a href={phoneHref} className="font-medium text-zinc-900 underline dark:text-zinc-50">
                        {values.primary_phone}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}
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
