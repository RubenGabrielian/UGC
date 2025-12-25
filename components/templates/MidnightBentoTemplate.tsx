"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, ArrowRight, Mail, Phone, Calendar, TrendingUp, Users, Sparkles } from "lucide-react";
import { ContactModal, type ServicePackage } from "@/components/ContactModal";
import { VideoPlayer } from "@/components/VideoPlayer";
import { countryByCode } from "@/lib/countries";
import { calculateTotalFollowers } from "@/lib/followers";
import type { PublicProfileValues } from "../PublicProfileView";

interface MidnightBentoTemplateProps {
  values: PublicProfileValues;
  creatorId: string;
  servicesPackages: ServicePackage[];
  isPro?: boolean;
}

export function MidnightBentoTemplate({ values, creatorId, servicesPackages, isPro = false }: MidnightBentoTemplateProps) {
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
  const bio = values.bio || "Short introduction for brand managers: tell them about your niche, audience, and results.";

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
    values.brand_logos?.map((l) => (typeof l === "string" ? { url: l } : l)).filter((l) => l && l.url && l.url.trim().length > 0) ?? [];
  const videoUrls = values.video_urls ?? [];
  const services = values.services_packages ?? [];
  const demographics = values.audience_demographics;
  const topGeo = demographics?.geo?.filter((g) => (g.location || "").trim().length > 0).slice(0, 3) ?? [];

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

  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2) || "CR";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-slate-950">
      {/* Radial gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(99,102,241,0.1),_transparent_50%)] pointer-events-none" aria-hidden />

      <div className="relative z-10">
        {/* Hero Section with Bento Grid */}
        <section className="py-12 px-4 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto]"
            >
              {/* Large Profile Card - Spans 2 columns, 2 rows */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-5 lg:row-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl transition-all hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
                    <Avatar className="relative h-32 w-32 border-2 border-white/20 shadow-2xl sm:h-40 sm:w-40">
                      <AvatarImage alt={name} src={values.avatar_url || undefined} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-white text-3xl font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {name}
                      </h1>
                      {isPro && <CheckCircle2 className="h-6 w-6 text-indigo-400 sm:h-7 sm:w-7" aria-label="verified" />}
                    </div>
                    {values.collaboration_headline && (
                      <p className="text-lg font-medium text-zinc-300 sm:text-xl mb-2">
                        {values.collaboration_headline}
                      </p>
                    )}
                    <p className="text-base text-zinc-400 sm:text-lg">{handle}</p>
                    {countryName && (
                      <p className="mt-3 flex items-center justify-center gap-2 text-zinc-400">
                        <span className="text-xl leading-none">{countryFlag}</span>
                        <span className="text-sm">{countryName}</span>
                      </p>
                    )}
                  </div>

                  {bio && (
                    <p className="mb-6 text-sm leading-relaxed text-zinc-300 sm:text-base max-w-md">
                      {bio}
                    </p>
                  )}

                  {/* Categories */}
                  {categories.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Content Niche</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                          <span
                            key={cat}
                            className="inline-flex items-center rounded-full bg-indigo-500/20 border border-indigo-400/30 px-4 py-1.5 text-xs font-medium text-indigo-300 backdrop-blur-sm"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {values.instagram_handle && (
                      <Link
                        href={igHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-lg backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
                      >
                        <Image src={"/img/instagram.webp"} alt="Instagram" width={18} height={18} />
                        <span className="text-xs font-medium text-zinc-300">Instagram</span>
                      </Link>
                    )}
                    {values.tiktok_handle && (
                      <Link
                        href={ttHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-lg backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
                      >
                        <Image src={"/img/tiktok.webp"} alt="TikTok" width={18} height={18} />
                        <span className="text-xs font-medium text-zinc-300">TikTok</span>
                      </Link>
                    )}
                    {values.youtube_handle && (
                      <Link
                        href={ytHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-lg backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
                      >
                        <Image src={"/img/youtube.webp"} alt="YouTube" width={18} height={18} />
                        <span className="text-xs font-medium text-zinc-300">YouTube</span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Stats Cards - Top Row */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-indigo-500/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg bg-indigo-500/20 p-2">
                    <Users className="h-5 w-5 text-indigo-400" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Reach</p>
                </div>
                <p className="text-3xl font-bold text-white font-mono sm:text-4xl">{totalFollowers}</p>
              </motion.div>

              {values.instagram_followers && (
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-pink-500/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Image src={"/img/instagram.webp"} alt="Instagram" width={20} height={20} />
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Instagram</p>
                  </div>
                  <p className="text-2xl font-bold text-white font-mono sm:text-3xl">{formatCount(values.instagram_followers)}</p>
                </motion.div>
              )}

              {values.tiktok_followers && (
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-cyan-500/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Image src={"/img/tiktok.webp"} alt="TikTok" width={20} height={20} />
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">TikTok</p>
                  </div>
                  <p className="text-2xl font-bold text-white font-mono sm:text-3xl">{formatCount(values.tiktok_followers)}</p>
                </motion.div>
              )}

              {/* Engagement Rate Card */}
              {values.engagement_rate && (
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-emerald-500/20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-lg bg-emerald-500/20 p-2">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Engagement</p>
                  </div>
                  <p className="text-3xl font-bold text-white font-mono sm:text-4xl">{values.engagement_rate.toFixed(1)}%</p>
                </motion.div>
              )}

              {/* YouTube Subscribers */}
              {values.youtube_subscribers && (
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-red-500/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Image src={"/img/youtube.webp"} alt="YouTube" width={20} height={20} />
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">YouTube</p>
                  </div>
                  <p className="text-2xl font-bold text-white font-mono sm:text-3xl">{formatCount(values.youtube_subscribers)}</p>
                </motion.div>
              )}

              {/* CTA Button Card */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-7 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl p-6 shadow-2xl transition-all hover:border-indigo-400/50 hover:shadow-indigo-500/30"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Ready to Collaborate?</h2>
                    <p className="text-sm text-zinc-300">Let&apos;s create something amazing together</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105"
                  >
                    <Sparkles className="h-5 w-5" />
                    Collaborate with Me
                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 blur-xl transition group-hover:opacity-50" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Video Portfolio Section */}
        {videoUrls.length > 0 && (
          <section className="py-12 px-4 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8 text-center"
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-3">Video Portfolio</h2>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                  Watch my best UGC content and brand collaborations
                </p>
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {videoUrls.map((video, idx) => {
                  const url = typeof video === "string" ? video : video.url || "";
                  const views = typeof video === "string" ? null : video.views;
                  const thumbnail = getVideoThumb(url);
                  return (
                    <motion.div key={idx} variants={itemVariants}>
                      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-indigo-500/20">
                        <VideoPlayer url={url} thumbnail={thumbnail} views={views || undefined} className="w-full" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>
        )}

        {/* Brand Logos Section */}
        {brandLogos.length > 0 && (
          <section className="py-12 px-4 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8 text-center"
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-3">
                  Brands I&apos;ve Worked With
                </h2>
                <p className="text-lg text-zinc-400">Trusted by leading brands</p>
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6 justify-center items-center"
              >
                {brandLogos.map((logo, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10 hover:shadow-indigo-500/20"
                  >
                    <Image src={logo.url} alt={`Brand ${idx + 1}`} fill className="object-contain p-2" unoptimized />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Services Section */}
        {services.length > 0 && (
          <section className="py-12 px-4 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8 text-center"
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-3">Services & Packages</h2>
                <p className="text-lg text-zinc-400">Tailored collaboration packages</p>
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg transition hover:border-white/20 hover:bg-white/10 hover:shadow-indigo-500/20"
                  >
                    <div className="flex-1">
                      <p className="text-xl font-semibold text-white">{service.title || "Service"}</p>
                      <p className="mt-1 text-sm font-medium capitalize text-zinc-400">{service.platform}</p>
                    </div>
                    <div className="ml-6 text-right">
                      {service.is_contact_only ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-400/30 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-sm">
                          Contact for Quote
                        </span>
                      ) : (
                        <p className="text-2xl font-bold text-white">{service.price || "—"}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        <section className="py-12 px-4 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                Ready to Collaborate?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-400">
                Let&apos;s create something amazing together. Get in touch to discuss your next campaign.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105"
                >
                  <Mail className="h-5 w-5" />
                  Send Message
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 blur-xl transition group-hover:opacity-50" />
                </button>
                {values.booking_link && (
                  <Link
                    href={values.booking_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    <Calendar className="h-5 w-5" />
                    Schedule a Call
                  </Link>
                )}
                {phoneHref && (
                  <Link
                    href={phoneHref}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    <Phone className="h-5 w-5" />
                    Call / WhatsApp
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        {!isPro && (
          <footer className="border-t border-white/10 bg-white/5 backdrop-blur-sm py-8 px-4 sm:px-6">
            <div className="mx-auto max-w-6xl text-center">
              <p className="text-sm text-zinc-400 sm:text-base">
                Created with{" "}
                <Link
                  href="https://creatorskit.app"
                  className="font-semibold text-white underline transition hover:text-indigo-400"
                >
                  CreatorKit
                </Link>
              </p>
            </div>
          </footer>
        )}

        {/* Floating CTA Button for Mobile */}
        {showFloatingCTA && (
          <motion.button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-2xl transition hover:shadow-3xl hover:scale-105 sm:hidden"
            aria-label="Collaborate with me"
          >
            <Mail className="h-5 w-5" />
            <span>Collaborate</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 blur-xl transition hover:opacity-50" />
          </motion.button>
        )}

        <ContactModal
          open={isContactModalOpen}
          onOpenChange={setIsContactModalOpen}
          creatorId={creatorId}
          servicesPackages={servicesPackages}
        />
      </div>
    </div>
  );
}

