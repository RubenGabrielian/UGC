"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  MessageSquare,
  Share2,
  Palette,
  TrendingUp,
  Eye,
  Check,
  CheckCircle2,
  Instagram,
  Music,
  Youtube,
  ArrowRight,
  Zap,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LandingPageProps {
  authButton: ReactNode;
}

export function LandingPage({ authButton }: LandingPageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-zinc-950">
        <div className="container relative mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
              Your Professional Media Kit &{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Link in Bio
              </span>{" "}
              – All in One Link
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
              Stop sending messy screenshots to brands. Share live, verified analytics instead. 
              Create your digital portfolio for influencers in 60 seconds.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Link href="/login">
                  Get Your Free Media Kit
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href="#demo">
                  View Live Demo
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              Free to start • No credit card required • 17,000+ creators already using CreatorKit
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="border-y bg-zinc-50 dark:bg-zinc-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Trusted by 500+ Influencers
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {Array.from({ length: 25 }, (_, index) => {
                const userNumber = (index % 3) + 1;
                const userImage = `/img/user${userNumber}.jpeg`;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0"
                  >
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={userImage} alt={`Creator ${index + 1} using CreatorKit`} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-sm font-semibold">
                        C{index + 1}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                17,000+ users already created their pages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="bg-white dark:bg-zinc-950 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                  The Problem: Messy Media Kits
                </h2>
                <ul className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-red-500">✗</span>
                    <span>Sending outdated screenshots to brands</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-red-500">✗</span>
                    <span>No way to track who's viewing your profile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-red-500">✗</span>
                    <span>Generic link-in-bio tools that don't showcase your work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-red-500">✗</span>
                    <span>Missing analytics to prove your reach</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                  The Solution: CreatorKit
                </h2>
                <ul className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>Live, verified analytics that update automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>Track page views and see which brands are visiting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>Professional portfolio templates that showcase your work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>Direct brand inquiry form for seamless collaboration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Examples Section */}
      <section id="demo" className="bg-zinc-50 dark:bg-zinc-900 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-4">
              See It In Action
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Real examples from creators using CreatorKit to showcase their work and connect with brands.
            </p>
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Mobile Frame 1: Profile Page */}
              <div className="group relative flex justify-center">
                <div className="relative w-[280px]">
                  <div className="relative bg-zinc-900 dark:bg-zinc-800 rounded-[3rem] p-3 shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 dark:bg-zinc-800 rounded-b-2xl z-10"></div>
                    <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-zinc-950">
                      <Image
                        src="/img/profile3.png"
                        alt="CreatorKit profile page example showing professional media kit layout"
                        fill
                        className="object-cover"
                        sizes="280px"
                        priority={false}
                      />
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-700 dark:bg-zinc-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Mobile Frame 2: Services Section */}
              <div className="group relative flex justify-center">
                <div className="relative w-[280px]">
                  <div className="relative bg-zinc-900 dark:bg-zinc-800 rounded-[3rem] p-3 shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 dark:bg-zinc-800 rounded-b-2xl z-10"></div>
                    <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-zinc-950">
                      <Image
                        src="/img/profile.png"
                        alt="CreatorKit services section showing brand collaboration packages"
                        fill
                        className="object-cover"
                        sizes="280px"
                        priority={false}
                      />
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-700 dark:bg-zinc-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Mobile Frame 3: Analytics Dashboard */}
              <div className="group relative flex justify-center">
                <div className="relative w-[280px]">
                  <div className="relative bg-zinc-900 dark:bg-zinc-800 rounded-[3rem] p-3 shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 dark:bg-zinc-800 rounded-b-2xl z-10"></div>
                    <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-zinc-950">
                      <Image
                        src="/img/profile2.png"
                        alt="CreatorKit analytics dashboard showing real-time page view statistics"
                        fill
                        className="object-cover"
                        sizes="280px"
                        priority={false}
                      />
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-700 dark:bg-zinc-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white dark:bg-zinc-950 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Powerful features designed to help you close more brand partnerships.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                  <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Real-time Instagram & TikTok Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Track your reach with built-in daily page view charts. See which brands are visiting and optimize your content accordingly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                  <Palette className="h-6 w-6 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Customizable Portfolio Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Switch designs instantly with professional presets. From minimal to vibrant, find the perfect look for your brand.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Direct Brand Inquiry Form</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  A custom booking modal for brands to contact you directly. Receive structured partnership requests with all the details you need.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                  <Share2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Social Media Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Auto-calculate total followers across Instagram, TikTok, and YouTube. Show your combined reach in one impressive number.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                  <CheckCircle2 className="h-6 w-6 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Verified Badge for Pro Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Get a blue verified checkmark next to your name. Show brands you're a verified Pro creator and stand out from the crowd.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Performance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Monitor your page performance with lifetime and weekly view counts. Understand what content resonates with brands.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-y bg-zinc-50 dark:bg-zinc-900 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Choose the plan that works best for you. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2">
              {/* Free Plan */}
              <Card className="h-full border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Perfect for getting started
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">Basic profile page</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">Social media integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">Contact form</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">Basic templates</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">Get Your Free Media Kit</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="h-full border-2 border-indigo-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                  POPULAR
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Pro</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    For serious creators and brands
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-indigo-600 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">Everything in Free</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-indigo-600 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">Real-time Instagram & TikTok analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-indigo-600 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">All premium templates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-indigo-600 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">Verified badge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-indigo-600 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">Priority support</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                    <Link href="/login">Upgrade to Pro</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white dark:bg-zinc-950 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Everything you need to know about CreatorKit
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  <h3 className="text-lg font-semibold">How do I create a media kit for free?</h3>
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                  <p>
                    Creating a free media kit is simple! Sign up for CreatorKit (no credit card required), 
                    fill in your profile information, connect your social media accounts, and choose a template. 
                    Your professional media kit will be live in under 60 seconds. You can upgrade to Pro later 
                    for advanced analytics and premium features.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  <h3 className="text-lg font-semibold">Can I track my link clicks?</h3>
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                  <p>
                    Yes! CreatorKit provides real-time analytics for all users. Free users get basic page view 
                    tracking, while Pro users get detailed analytics including daily page views, weekly summaries, 
                    and lifetime statistics. You can see exactly which brands are visiting your profile and when.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  <h3 className="text-lg font-semibold">Is it compatible with Instagram and TikTok?</h3>
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                  <p>
                    Absolutely! CreatorKit integrates seamlessly with Instagram, TikTok, YouTube, and Facebook. 
                    Your follower counts are automatically synced and displayed on your profile. You can also 
                    add direct links to your social media profiles so brands can easily find and follow you.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  <h3 className="text-lg font-semibold">What makes CreatorKit different from other link-in-bio tools?</h3>
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                  <p>
                    CreatorKit is specifically designed for brand collaborations. Unlike generic link-in-bio tools, 
                    CreatorKit focuses on showcasing your work as a creator with professional portfolio templates, 
                    real-time analytics, and a direct brand inquiry form. It's built to help you close more 
                    partnerships, not just share links.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  <h3 className="text-lg font-semibold">Do I need a Pro plan to use CreatorKit?</h3>
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                  <p>
                    No! CreatorKit is completely free to start. The free plan includes a professional profile page, 
                    social media integration, contact form, and basic templates. Pro plans unlock advanced analytics, 
                    premium templates, verified badges, and priority support. You can upgrade anytime.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-b from-indigo-50 via-violet-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Create your professional media kit and link in bio in 60 seconds. No credit card required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Link href="/login">
                Get Your Free Media Kit
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href="#demo">
                View Live Demo
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
