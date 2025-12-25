"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, ArrowRight, Mail, Phone, Calendar, TrendingUp, Users } from "lucide-react";
import { ContactModal, type ServicePackage } from "@/components/ContactModal";
import { VideoPlayer } from "@/components/VideoPlayer";
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
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingCTA(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-zinc-50 to-white py-20 px-4 sm:py-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(99,102,241,0.05),_transparent_50%)]" aria-hidden />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            {/* Avatar - Enhanced Circular Profile Image */}
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse" />
              <Avatar className="relative h-36 w-36 border-4 border-white shadow-2xl ring-4 ring-zinc-100 sm:h-44 sm:w-44">
                <AvatarImage alt={name} src={values.avatar_url || undefined} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 text-zinc-800 text-4xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name and Badge */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                  {name}
                </h1>
                {isPro && (
                  <CheckCircle2 className="h-7 w-7 text-blue-500 sm:h-8 sm:w-8" aria-label="verified" />
                )}
              </div>
              {values.collaboration_headline && (
                <p className="text-xl font-medium text-zinc-700 sm:text-2xl mb-2">
                  {values.collaboration_headline}
                </p>
              )}
              <p className="text-lg text-zinc-500 sm:text-xl">{handle}</p>
              {countryName && (
                <p className="mt-3 flex items-center justify-center gap-2 text-zinc-500">
                  <span className="text-2xl leading-none">{countryFlag}</span>
                  <span className="text-lg">{countryName}</span>
                </p>
              )}
            </div>

            {/* Bio */}
            {bio && (
              <div className="mb-8 max-w-2xl">
                <p className="text-lg text-zinc-600 leading-relaxed sm:text-xl">
                  {bio}
                </p>
              </div>
            )}

            {/* Social Media Icons */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              {values.instagram_handle && (
                <Link
                  href={igHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
                >
                  <Image src={"/img/instagram.webp"} alt="Instagram" width={20} height={20} />
                  <span className="text-sm font-medium text-zinc-700">Instagram</span>
                </Link>
              )}
              {values.tiktok_handle && (
                <Link
                  href={ttHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
                >
                  <Image src={"/img/tiktok.webp"} alt="TikTok" width={20} height={20} />
                  <span className="text-sm font-medium text-zinc-700">TikTok</span>
                </Link>
              )}
              {values.youtube_handle && (
                <Link
                  href={ytHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
                >
                  <Image src={"/img/youtube.webp"} alt="YouTube" width={20} height={20} />
                  <span className="text-sm font-medium text-zinc-700">YouTube</span>
                </Link>
              )}
            </div>

            {/* Categories / Niche Section */}
            {categories.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">Content Niche</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 px-5 py-2.5 text-sm font-medium text-indigo-700"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Live Metrics Section */}
            <div className="mb-10 w-full max-w-4xl">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl mb-2">Live Metrics</h2>
                <p className="text-sm text-zinc-500">Real-time audience insights</p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                <div className="rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-zinc-400" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Total Reach</p>
                  </div>
                  <p className="text-2xl font-bold text-zinc-900 sm:text-3xl font-mono">{totalFollowers}</p>
                </div>
                {values.instagram_followers && (
                  <Link
                    href={igHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Image src={"/img/instagram.webp"} alt="Instagram" width={18} height={18} />
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Instagram</p>
                    </div>
                    <p className="text-2xl font-bold text-zinc-900 sm:text-3xl font-mono">{formatCount(values.instagram_followers)}</p>
                  </Link>
                )}
                {values.tiktok_followers && (
                  <Link
                    href={ttHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Image src={"/img/tiktok.webp"} alt="TikTok" width={18} height={18} />
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">TikTok</p>
                    </div>
                    <p className="text-2xl font-bold text-zinc-900 sm:text-3xl font-mono">{formatCount(values.tiktok_followers)}</p>
                  </Link>
                )}
                {values.youtube_subscribers && (
                  <Link
                    href={ytHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Image src={"/img/youtube.webp"} alt="YouTube" width={18} height={18} />
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">YouTube</p>
                    </div>
                    <p className="text-2xl font-bold text-zinc-900 sm:text-3xl font-mono">{formatCount(values.youtube_subscribers)}</p>
                  </Link>
                )}
                {values.engagement_rate && (
                  <div className="rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-zinc-400" />
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Engagement</p>
                    </div>
                    <p className="text-2xl font-bold text-zinc-900 sm:text-3xl font-mono">{values.engagement_rate.toFixed(1)}%</p>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 hover:scale-105"
              >
                <Mail className="h-5 w-5" />
                Collaborate with Me
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              {values.booking_link && (
                <Link
                  href={values.booking_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-300 bg-white px-8 py-4 text-base font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50 hover:scale-105"
                >
                  <Calendar className="h-5 w-5" />
                  Book a Call
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

   
      {/* Brand Logos Section */}
      {brandLogos.length > 0 && (
        <section className="border-y border-zinc-200 bg-zinc-50 py-16 px-4 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Brands I&apos;ve Worked With
              </h2>
              <p className="mt-4 text-lg text-zinc-600">
                Trusted by leading brands to deliver exceptional results
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6 justify-center items-center">
              {brandLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md"
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
        </section>
      )}

      {/* Interactive Video Portfolio Section */}
      {videoUrls.length > 0 && (
        <section className="bg-white py-16 px-4 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl mb-3">
                Video Portfolio
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                Watch my best UGC content and brand collaborations. Click any video to play inline.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videoUrls.map((video, idx) => {
                const url = typeof video === "string" ? video : video.url || "";
                const views = typeof video === "string" ? null : video.views;
                const thumbnail = getVideoThumb(url);
                return (
                  <VideoPlayer
                    key={idx}
                    url={url}
                    thumbnail={thumbnail}
                    views={views || undefined}
                    className="w-full"
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services.length > 0 && (
        <section className="border-y border-zinc-200 bg-zinc-50 py-16 px-4 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Services & Packages</h2>
              <p className="mt-4 text-lg text-zinc-600">
                Tailored collaboration packages designed for your brand
              </p>
            </div>
            <div className="space-y-4">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-zinc-900">{service.title || "Service"}</p>
                    <p className="mt-1 text-sm font-medium capitalize text-zinc-600">{service.platform}</p>
                  </div>
                  <div className="ml-6 text-right">
                    {service.is_contact_only ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        Contact for Quote
                      </span>
                    ) : (
                      <p className="text-2xl font-bold text-zinc-900">{service.price || "—"}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Audience Insights Section */}
      {demographics && (
        <section className="bg-white py-16 px-4 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Audience Insights</h2>
              <p className="mt-4 text-lg text-zinc-600">
                Understanding my audience to maximize campaign effectiveness
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {topGeo.length > 0 && (
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">Top Locations</p>
                  <div className="space-y-2">
                    {topGeo.map((geo, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-900">{geo.location}</span>
                        {geo.percentage && (
                          <span className="text-sm text-zinc-600">{geo.percentage}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {demographics.age && (
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">Age Range</p>
                  <p className="text-2xl font-bold text-zinc-900">{demographics.age}</p>
                </div>
              )}
              {demographics.gender && (
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">Gender</p>
                  <p className="text-lg font-semibold text-zinc-900">{demographics.gender}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 py-16 px-4 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Ready to Collaborate?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Let&apos;s create something amazing together. Get in touch to discuss your next campaign.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-indigo-700 hover:to-purple-700"
            >
              <Mail className="h-5 w-5" />
              Send Message
            </button>
            {values.booking_link && (
              <Link
                href={values.booking_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-300 bg-white px-8 py-4 text-base font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                <Calendar className="h-5 w-5" />
                Schedule a Call
              </Link>
            )}
            {phoneHref && (
              <Link
                href={phoneHref}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-300 bg-white px-8 py-4 text-base font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                <Phone className="h-5 w-5" />
                Call / WhatsApp
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      {!isPro && (
        <footer className="border-t border-zinc-200 bg-zinc-50 py-8 px-4 sm:px-6">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm text-zinc-600 sm:text-base">
              Created with{" "}
              <Link
                href="https://creatorskit.app"
                className="font-semibold text-zinc-900 underline transition hover:text-indigo-600"
              >
                CreatorKit
              </Link>
            </p>
            <Link
              href="https://creatorskit.app"
              className="mt-2 inline-block text-xs text-zinc-500 transition hover:text-indigo-600 sm:text-sm"
            >
              Create your own page →
            </Link>
          </div>
        </footer>
      )}

      {/* Floating CTA Button for Mobile */}
      {showFloatingCTA && (
        <button
          type="button"
          onClick={() => setIsContactModalOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-2xl transition hover:shadow-3xl hover:scale-105 sm:hidden"
          aria-label="Collaborate with me"
        >
          <Mail className="h-5 w-5" />
          <span>Collaborate</span>
        </button>
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
