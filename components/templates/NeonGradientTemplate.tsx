"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, ArrowRight, Mail, Phone, Calendar, TrendingUp, Users, Zap, Sparkles } from "lucide-react";
import { ContactModal, type ServicePackage } from "@/components/ContactModal";
import { VideoPlayer } from "@/components/VideoPlayer";
import { countryByCode } from "@/lib/countries";
import { calculateTotalFollowers } from "@/lib/followers";
import type { PublicProfileValues } from "../PublicProfileView";

interface NeonGradientTemplateProps {
  values: PublicProfileValues;
  creatorId: string;
  servicesPackages: ServicePackage[];
  isPro?: boolean;
}

export function NeonGradientTemplate({ values, creatorId, servicesPackages, isPro = false }: NeonGradientTemplateProps) {
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


  const brandLogos =
    values.brand_logos?.map((l) => (typeof l === "string" ? { url: l } : l)).filter((l) => l && l.url && l.url.trim().length > 0) ?? [];
  const videoUrls = values.video_urls ?? [];
  const services = values.services_packages ?? [];

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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-cyan-950 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              {/* Avatar with neon glow */}
              <motion.div variants={itemVariants} className="mb-8 relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                <Avatar className="relative h-32 w-32 border-4 border-white/20 shadow-2xl sm:h-40 sm:w-40">
                  <AvatarImage alt={name} src={values.avatar_url || undefined} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-3xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Name and Badge */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent sm:text-6xl lg:text-7xl">
                    {name}
                  </h1>
                  {isPro && <CheckCircle2 className="h-8 w-8 text-cyan-400 sm:h-10 sm:w-10" aria-label="verified" />}
                </div>
                {values.collaboration_headline && (
                  <p className="text-2xl font-bold text-white sm:text-3xl mb-2">
                    {values.collaboration_headline}
                  </p>
                )}
                <p className="text-lg text-purple-200 sm:text-xl">{handle}</p>
                {countryName && (
                  <p className="mt-3 flex items-center justify-center gap-2 text-purple-300">
                    <span className="text-2xl leading-none">{countryFlag}</span>
                    <span className="text-base">{countryName}</span>
                  </p>
                )}
              </motion.div>

              {/* Bio */}
              <motion.div variants={itemVariants} className="mb-8 max-w-2xl mx-auto">
                <p className="text-lg text-purple-100 leading-relaxed sm:text-xl">
                  {bio}
                </p>
              </motion.div>

              {/* Categories */}
              {categories.length > 0 && (
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat, idx) => (
                      <motion.span
                        key={cat}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 px-5 py-2.5 text-sm font-semibold text-purple-200 backdrop-blur-sm shadow-lg"
                      >
                        {cat}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Stats Grid */}
              <motion.div variants={itemVariants} className="mb-10">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl border border-purple-400/30 p-6 shadow-2xl"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-purple-300" />
                      <p className="text-xs font-semibold uppercase tracking-wider text-purple-200">Total Reach</p>
                    </div>
                    <p className="text-3xl font-black text-white font-mono sm:text-4xl">{totalFollowers}</p>
                  </motion.div>

                  {values.instagram_followers && (
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-xl border border-pink-400/30 p-6 shadow-2xl"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Image src={"/img/instagram.webp"} alt="Instagram" width={18} height={18} />
                        <p className="text-xs font-semibold uppercase tracking-wider text-pink-200">Instagram</p>
                      </div>
                      <p className="text-2xl font-black text-white font-mono sm:text-3xl">{formatCount(values.instagram_followers)}</p>
                    </motion.div>
                  )}

                  {values.tiktok_followers && (
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-xl border border-cyan-400/30 p-6 shadow-2xl"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Image src={"/img/tiktok.webp"} alt="TikTok" width={18} height={18} />
                        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">TikTok</p>
                      </div>
                      <p className="text-2xl font-black text-white font-mono sm:text-3xl">{formatCount(values.tiktok_followers)}</p>
                    </motion.div>
                  )}

                  {values.engagement_rate && (
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-xl border border-orange-400/30 p-6 shadow-2xl"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-orange-300" />
                        <p className="text-xs font-semibold uppercase tracking-wider text-orange-200">Engagement</p>
                      </div>
                      <p className="text-3xl font-black text-white font-mono sm:text-4xl">{values.engagement_rate.toFixed(1)}%</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 px-10 py-5 text-lg font-black text-white shadow-2xl transition hover:shadow-purple-500/50 hover:scale-105"
                >
                  <Sparkles className="h-6 w-6" />
                  <span>Collaborate with Me</span>
                  <ArrowRight className="h-6 w-6 transition group-hover:translate-x-2" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 blur-2xl transition group-hover:opacity-70" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Video Portfolio Section */}
        {videoUrls.length > 0 && (
          <section className="py-16 px-4 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent sm:text-5xl mb-4">
                  Video Portfolio
                </h2>
                <p className="text-lg text-purple-200 max-w-2xl mx-auto">
                  Watch my best UGC content and brand collaborations
                </p>
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {videoUrls.map((video, idx) => {
                  const url = typeof video === "string" ? video : video.url || "";
                  const views = typeof video === "string" ? null : video.views;
                  const thumbnail = getVideoThumb(url);
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, y: -5 }}
                    >
                      <div className="rounded-2xl border-2 border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl overflow-hidden shadow-2xl transition-all hover:border-purple-400/50 hover:shadow-purple-500/30">
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
          <section className="py-16 px-4 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent sm:text-5xl mb-4">
                  Brands I&apos;ve Worked With
                </h2>
                <p className="text-lg text-purple-200">Trusted by leading brands</p>
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6 justify-center items-center"
              >
                {brandLogos.map((logo, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 shadow-xl backdrop-blur-sm transition hover:border-purple-400/50 hover:shadow-purple-500/30"
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
          <section className="py-16 px-4 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent sm:text-5xl mb-4">
                  Services & Packages
                </h2>
                <p className="text-lg text-purple-200">Tailored collaboration packages</p>
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
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center justify-between rounded-2xl border-2 border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl p-6 shadow-xl transition hover:border-purple-400/50 hover:shadow-purple-500/30"
                  >
                    <div className="flex-1">
                      <p className="text-xl font-black text-white">{service.title || "Service"}</p>
                      <p className="mt-1 text-sm font-semibold capitalize text-purple-200">{service.platform}</p>
                    </div>
                    <div className="ml-6 text-right">
                      {service.is_contact_only ? (
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-400/30 px-4 py-2 text-sm font-black text-cyan-200 backdrop-blur-sm">
                          Contact for Quote
                        </span>
                      ) : (
                        <p className="text-3xl font-black text-white">{service.price || "—"}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        <section className="py-16 px-4 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent sm:text-5xl mb-4">
                Ready to Collaborate?
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-purple-200">
                Let&apos;s create something amazing together. Get in touch to discuss your next campaign.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 px-8 py-4 text-base font-black text-white shadow-2xl transition hover:shadow-purple-500/50 hover:scale-105"
                >
                  <Mail className="h-5 w-5" />
                  Send Message
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 blur-2xl transition group-hover:opacity-70" />
                </button>
                {values.booking_link && (
                  <Link
                    href={values.booking_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border-2 border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl px-8 py-4 text-base font-black text-white transition hover:border-purple-400/50 hover:bg-purple-500/20"
                  >
                    <Calendar className="h-5 w-5" />
                    Schedule a Call
                  </Link>
                )}
                {phoneHref && (
                  <Link
                    href={phoneHref}
                    className="inline-flex items-center gap-2 rounded-2xl border-2 border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl px-8 py-4 text-base font-black text-white transition hover:border-purple-400/50 hover:bg-purple-500/20"
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
          <footer className="border-t border-purple-400/20 bg-purple-950/50 backdrop-blur-sm py-8 px-4 sm:px-6">
            <div className="mx-auto max-w-6xl text-center">
              <p className="text-sm text-purple-300 sm:text-base">
                Created with{" "}
                <Link
                  href="https://creatorskit.app"
                  className="font-black text-white underline transition hover:text-cyan-300"
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
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 px-6 py-4 text-base font-black text-white shadow-2xl transition hover:shadow-purple-500/50 hover:scale-105 sm:hidden"
            aria-label="Collaborate with me"
          >
            <Zap className="h-5 w-5" />
            <span>Collaborate</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 blur-2xl transition hover:opacity-70" />
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

