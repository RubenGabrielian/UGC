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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import type { ReactNode } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};


interface LandingPageProps {
  authButton: ReactNode;
}

export function LandingPage({ authButton }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#eef2ff,_transparent)] opacity-50 dark:bg-[radial-gradient(circle_at_top,_#1e1e2e,_transparent)]" />
        <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl text-center"
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Your Professional Media Kit{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                in 60 Seconds
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-muted-foreground sm:text-2xl">
              A beautiful, analytics-driven bio link designed for creators and brands to collaborate.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="w-full sm:w-auto">{authButton}</div>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href="#demo">View Live Demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Example Profiles Section */}
      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Creators
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See how creators are using CreatorKit to grow their brand partnerships.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {Array.from({ length: 25 }, (_, index) => {
                const userNumber = index + 1;
                const userImage = `/img/user${userNumber}.jpeg`;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0"
                  >
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={userImage} alt={`User ${index + 1}`} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-sm font-semibold">
                        U{index + 1}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                17,000+ users already created their pages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Examples Section */}
      <section id="demo" className="relative overflow-hidden bg-background py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              See It In Action
            </h2>
            <p className="text-lg text-muted-foreground">
              Real examples from creators using CreatorKit to showcase their work and connect with brands.
            </p>
          </motion.div>

          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {/* Mobile Frame 1: Profile Page */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative flex justify-center"
              >
                <div className="relative w-[280px]">
                  {/* Phone Frame */}
                  <div className="relative bg-zinc-900 dark:bg-zinc-800 rounded-[3rem] p-3 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 dark:bg-zinc-800 rounded-b-2xl z-10"></div>
                    {/* Screen */}
                    <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-zinc-950">
                      <Image
                        src="/img/profile3.png"
                        alt="Profile Page Screenshot"
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    </div>
                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-700 dark:bg-zinc-600 rounded-full"></div>
                  </div>
                  {/* Label */}
                  <div className="mt-4 text-center">
                    {/* <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Profile Page</div> */}
                    {/* <div className="text-xs text-zinc-500 mt-1">Clean, professional design</div> */}
                  </div>
                </div>
              </motion.div>

              {/* Mobile Frame 2: Services Section */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative flex justify-center"
              >
                <div className="relative w-[280px]">
                  {/* Phone Frame */}
                  <div className="relative bg-zinc-900 dark:bg-zinc-800 rounded-[3rem] p-3 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 dark:bg-zinc-800 rounded-b-2xl z-10"></div>
                    {/* Screen */}
                    <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-zinc-950">
                      <Image
                        src="/img/profile.png"
                        alt="Services Section Screenshot"
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    </div>
                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-700 dark:bg-zinc-600 rounded-full"></div>
                  </div>
                  {/* Label */}
                  <div className="mt-4 text-center">
                    {/* <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Services Section</div> */}
                    {/* <div className="text-xs text-zinc-500 mt-1">Showcase your offerings</div> */}
                  </div>
                </div>
              </motion.div>

              {/* Mobile Frame 3: Analytics Dashboard */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative flex justify-center"
              >
                <div className="relative w-[280px]">
                  {/* Phone Frame */}
                  <div className="relative bg-zinc-900 dark:bg-zinc-800 rounded-[3rem] p-3 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 dark:bg-zinc-800 rounded-b-2xl z-10"></div>
                    {/* Screen */}
                    <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-zinc-950">
                      <Image
                        src="/img/profile2.png"
                        alt="Analytics Dashboard Screenshot"
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    </div>
                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-700 dark:bg-zinc-600 rounded-full"></div>
                  </div>
                  {/* Label */}
                  <div className="mt-4 text-center">
                    {/* <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Analytics Dashboard</div> */}
                    {/* <div className="text-xs text-zinc-500 mt-1">Track your performance</div> */}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

     

      {/* Features Section */}
      <section id="features" className="border-y bg-muted/30 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features designed to help you close more brand partnerships.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Real-time Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track your reach with built-in daily page view charts. See which brands are visiting and optimize your content accordingly.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Direct Lead Intake</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A custom booking modal for brands to contact you directly. Receive structured partnership requests with all the details you need.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Social Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Auto-calculate total followers across Instagram, TikTok, and YouTube. Show your combined reach in one impressive number.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Verified Badge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get a blue verified checkmark next to your name. Show brands you're a verified Pro creator and stand out from the crowd.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Dynamic Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Switch designs instantly with professional presets. From minimal to vibrant, find the perfect look for your brand.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Performance Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Monitor your page performance with lifetime and weekly view counts. Understand what content resonates with brands.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Brand Visibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Showcase your past collaborations, services, and audience insights. Build trust and credibility with every visit.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="border-y bg-background py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that works best for you. Upgrade or downgrade anytime.
            </p>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
            >
              {/* Free Plan */}
              <motion.div variants={fadeInUp}>
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
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Basic profile page</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Social media integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Contact form</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Basic templates</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/login">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Pro Plan */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-2 border-primary relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
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
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Everything in Free</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Advanced analytics & insights</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">All premium templates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Custom domain support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Priority support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Unlimited service packages</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Brand logo showcase</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Video portfolio integration</span>
                      </li>
                    </ul>
                    <Button className="w-full" asChild>
                      <Link href="/login">Upgrade to Pro</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="border-t bg-gradient-to-b from-muted/50 to-background py-24">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Create your professional creator page in 60 seconds. No credit card required.
            </p>
            <div className="mt-10">
              <div className="w-full sm:w-auto">{authButton}</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
