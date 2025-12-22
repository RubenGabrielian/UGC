import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  BarChart3,
  Palette,
  MessageSquare,
  Share2,
  TrendingUp,
  ArrowRight,
  FileText,
  Users,
  Zap,
  Instagram,
  Music,
  Youtube,
  Star,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Professional Media Kit for Influencers | Media Kit Builder | CreatorKit",
  description:
    "Create a professional media kit for influencers in minutes. The best media kit builder and influencer marketing tool with link in bio features. Free media kit templates, Instagram & TikTok analytics. Start free today.",
  keywords: [
    "professional media kit for influencers",
    "influencer marketing tool",
    "media kit builder",
    "link in bio",
    "creator media kit",
    "influencer portfolio",
    "brand collaboration tool",
    "social media media kit",
    "digital media kit",
    "media kit template",
    "influencer media kit",
    "content creator media kit",
    "instagram media kit",
    "tiktok media kit",
    "youtube media kit",
    "free media kit builder",
    "media kit generator",
    "influencer rate card",
    "creator portfolio builder",
    "social media portfolio",
    "influencer press kit",
    "brand partnership tool",
    "influencer analytics tool",
    "media kit design",
    "influencer marketing platform",
  ],
  openGraph: {
    title: "Professional Media Kit for Influencers | Media Kit Builder | CreatorKit",
    description:
      "Create a professional media kit for influencers in minutes. The best media kit builder and influencer marketing tool with link in bio features, Instagram & TikTok analytics.",
    type: "website",
    url: "https://creatorskit.app/media-kit-guide",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Media Kit for Influencers | Media Kit Builder",
    description:
      "Create a professional media kit for influencers in minutes. The best media kit builder and influencer marketing tool with link in bio features.",
  },
  alternates: {
    canonical: "https://creatorskit.app/media-kit-guide",
  },
};

export default function MediaKitGuidePage() {
  // HowTo Schema for SEO - Featured Snippet Optimization
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create a Professional Media Kit for Influencers",
    description: "Step-by-step guide to create a professional media kit for influencers using CreatorKit's media kit builder",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Sign Up for Free",
        text: "Create your free CreatorKit account. No credit card required—just your email address to get started with our media kit builder.",
        itemListElement: [
          {
            "@type": "HowToDirection",
            text: "Visit CreatorKit and click Register Now",
          },
          {
            "@type": "HowToDirection",
            text: "Sign up with Google for instant access",
          },
          {
            "@type": "HowToDirection",
            text: "Complete your basic profile information",
          },
        ],
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Connect Your Social Media Accounts",
        text: "Link your Instagram, TikTok, YouTube, and other platforms to automatically sync your follower counts and engagement metrics.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Choose a Professional Template",
        text: "Select from our collection of professional media kit templates designed specifically for influencers and content creators.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Add Your Content and Branding",
        text: "Customize your media kit with your bio, best content examples, services, and brand information.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Set Up Your Contact Form",
        text: "Enable the brand inquiry form so potential partners can reach you directly through your media kit.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Publish and Share Your Media Kit",
        text: "Your professional media kit is ready! Get your unique URL and start sharing it with brands.",
      },
    ],
    totalTime: "PT5M",
  };

  // Enhanced FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a professional media kit for influencers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A professional media kit for influencers is a digital portfolio that showcases your brand, audience metrics, past collaborations, and services. It's essential for landing brand partnerships and demonstrating your value to potential sponsors. Think of it as your digital business card that tells brands everything they need to know about working with you.",
        },
      },
      {
        "@type": "Question",
        "name": "How do I create a media kit for influencers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Creating a media kit for influencers is easy with CreatorKit's media kit builder. Simply register for free (no credit card required), fill in your profile information, connect your Instagram, TikTok, and YouTube accounts, and choose a professional template. Your influencer media kit will be live in under 60 seconds. You can customize it further with your branding, services, and portfolio items.",
        },
      },
      {
        "@type": "Question",
        "name": "What should be included in an influencer media kit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An influencer media kit should include your bio, audience demographics, follower counts across all platforms (Instagram, TikTok, YouTube), engagement rates, past brand collaborations, services offered, and contact information. CreatorKit automatically syncs your social media metrics for real-time accuracy, so you never have to manually update your numbers.",
        },
      },
      {
        "@type": "Question",
        "name": "Is there a free media kit builder?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! CreatorKit offers a completely free media kit builder. You can create your professional media kit with no credit card required. Free plans include basic templates, social media integration, contact forms, and automatic follower count syncing. Upgrade to Pro for advanced analytics, premium templates, verified badges, and priority support.",
        },
      },
      {
        "@type": "Question",
        "name": "How is this different from other influencer marketing tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CreatorKit is specifically designed for influencers who want to showcase their work professionally. Unlike generic link-in-bio tools, we focus on creating comprehensive media kits with real-time analytics, brand inquiry forms, and professional presentation. Our platform combines the best of media kit builders and link in bio tools into one powerful influencer marketing tool.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I use this as an Instagram media kit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! CreatorKit is perfect for creating an Instagram media kit. Our platform automatically syncs your Instagram follower count, engagement rates, and you can showcase your best Instagram content. You can also integrate TikTok, YouTube, and other platforms to create a comprehensive social media media kit.",
        },
      },
      {
        "@type": "Question",
        "name": "Do I need design skills to create a media kit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No design skills required! CreatorKit's media kit builder comes with professional templates that you can customize. Simply choose a template, add your information, and your professional media kit is ready. The entire process takes less than 60 seconds.",
        },
      },
    ],
  };

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Professional Media Kit for Influencers - Complete Guide",
    description:
      "Learn how to create a professional media kit for influencers using the best media kit builder. Includes templates, analytics, and link in bio features.",
    author: {
      "@type": "Organization",
      name: "CreatorKit",
    },
    publisher: {
      "@type": "Organization",
      name: "CreatorKit",
      logo: {
        "@type": "ImageObject",
        url: "https://creatorskit.app/logo.png",
      },
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://creatorskit.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Professional Media Kit for Influencers",
        item: "https://creatorskit.app/media-kit-guide",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2" aria-label="CreatorKit Home">
              <Image
                src="/logo.png"
                alt="CreatorKit - Professional Media Kit Builder for Influencers"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">CreatorKit</span>
            </Link>
            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Blog
              </Link>
              <Link
                href="/#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </Link>
            </div>
            <Button asChild size="sm">
              <Link href="/login">Register Now</Link>
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-16 sm:py-24">
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl mb-6">
                Professional Media Kit for Influencers
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
                Create a stunning professional media kit for influencers in minutes. The ultimate media kit builder and influencer marketing tool that helps you land more brand partnerships with real-time Instagram & TikTok analytics, link in bio features, and professional media kit templates.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Link href="/login">
                    Register Now - Free
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Link href="/#demo">
                    View Examples
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                No credit card required • 17,000+ influencers already using CreatorKit
              </p>
            </div>
          </div>
        </section>

        {/* What is a Media Kit Section */}
        <section className="bg-white dark:bg-zinc-950 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-6 text-center">
                What is a Professional Media Kit for Influencers?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                A professional media kit for influencers is your digital portfolio and brand collaboration tool. It's a comprehensive showcase that includes your audience metrics, engagement rates, past brand partnerships, services, and contact information. Unlike static PDFs, a modern influencer media kit is interactive, always up-to-date, and helps you stand out to brands looking for authentic partnerships.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                Whether you're creating an Instagram media kit, TikTok media kit, or a comprehensive social media portfolio, CreatorKit's media kit builder makes it easy to create a professional presentation that brands will love.
              </p>
              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Link href="/login">
                    Start Building Your Media Kit
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How To Section - SEO Optimized */}
        <section className="bg-zinc-50 dark:bg-zinc-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-4 text-center">
                How to Create a Professional Media Kit for Influencers
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12 text-center">
                Follow these simple steps to create your professional media kit in minutes
              </p>

              <div className="space-y-8">
                {/* Step 1 */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">Sign Up for Free</CardTitle>
                        <CardDescription className="text-base">
                          Create your free CreatorKit account. No credit card required—just your email address to get started with our media kit builder.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-14">
                    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Visit CreatorKit and click "Register Now"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Sign up with Google for instant access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Complete your basic profile information</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Step 2 */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg flex-shrink-0">
                        2
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">Connect Your Social Media Accounts</CardTitle>
                        <CardDescription className="text-base">
                          Link your Instagram, TikTok, YouTube, and other platforms to automatically sync your follower counts and engagement metrics.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-14">
                    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Add your Instagram handle and connect your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Connect your TikTok profile for TikTok media kit metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Link your YouTube channel for comprehensive analytics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Your follower counts update automatically—no manual work needed</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Step 3 */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg flex-shrink-0">
                        3
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">Choose a Professional Template</CardTitle>
                        <CardDescription className="text-base">
                          Select from our collection of professional media kit templates designed specifically for influencers and content creators.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-14">
                    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Browse our template gallery in the dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Preview different designs to find your perfect match</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Choose between minimal, professional, or vibrant styles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Switch templates anytime—your content stays intact</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Step 4 */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg flex-shrink-0">
                        4
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">Add Your Content and Branding</CardTitle>
                        <CardDescription className="text-base">
                          Customize your media kit with your bio, best content examples, services, and brand information.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-14">
                    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Write a compelling bio that showcases your unique brand voice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Upload your best content examples and portfolio pieces</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Add your services and collaboration packages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Include past brand collaborations and testimonials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Add your logo and customize colors to match your brand</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Step 5 */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg flex-shrink-0">
                        5
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">Set Up Your Contact Form</CardTitle>
                        <CardDescription className="text-base">
                          Enable the brand inquiry form so potential partners can reach you directly through your media kit.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-14">
                    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Enable the contact form in your dashboard settings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Customize the inquiry form fields to collect the information you need</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Add your email address to receive notifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Test the form to ensure it's working correctly</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Step 6 */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg flex-shrink-0">
                        6
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">Publish and Share Your Media Kit</CardTitle>
                        <CardDescription className="text-base">
                          Your professional media kit is ready! Get your unique URL and start sharing it with brands.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-14">
                    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Get your unique CreatorKit URL (e.g., creatorskit.app/u/yourname)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Add the link to your Instagram bio, TikTok profile, and email signature</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Share your media kit when pitching brands or responding to collaboration requests</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Track views and see which brands are checking out your profile</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-900/20 px-6 py-4 mb-6">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                  <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    Total Time: Less than 5 minutes to create your professional media kit
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Link href="/login">
                    Start Creating Your Media Kit Now
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-zinc-50 dark:bg-zinc-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-4">
                Why Choose Our Media Kit Builder?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Everything you need to create a professional media kit for influencers that brands will love
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-2">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                    <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">Professional Media Kit Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Choose from beautifully designed media kit templates that showcase your brand professionally. Perfect for Instagram media kits, TikTok media kits, and comprehensive influencer portfolios. Switch designs instantly to match your style.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                    <BarChart3 className="h-6 w-6 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">Real-Time Instagram & TikTok Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Automatically sync your Instagram, TikTok, and YouTube follower counts. Show brands your real-time reach, engagement rates, and audience demographics. No more outdated screenshots—your influencer analytics update automatically.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Share2 className="h-6 w-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">Link in Bio Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Combine your professional media kit with a powerful link in bio tool. Share one link that showcases everything brands need to know about you. Perfect for Instagram bios and TikTok profiles.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                    <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">Direct Brand Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Receive structured partnership requests directly through your media kit. No more messy email threads—everything organized in one place. Perfect for brand collaboration and influencer marketing campaigns.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                    <Palette className="h-6 w-6 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">Customizable Media Kit Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Fully customize your influencer media kit to match your brand. Add your logo, choose colors, showcase your best work, and create a unique creator portfolio that stands out from competitors.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">60-Second Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Get your professional media kit for influencers live in under 60 seconds. No design skills required—just fill in your information and you're ready to go. Our media kit generator does the heavy lifting.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Link href="/login">
                  Register Now - Start Building
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Platform-Specific Sections */}
        <section className="bg-white dark:bg-zinc-950 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-12 text-center">
                Media Kit Builder for Every Platform
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <Card className="border-2">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30">
                      <Instagram className="h-6 w-6 text-pink-600 dark:text-pink-400" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">Instagram Media Kit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Create a professional Instagram media kit with automatic follower sync, engagement metrics, and your best Instagram content. Perfect for Instagram influencers and content creators.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-black dark:bg-zinc-800">
                      <Music className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">TikTok Media Kit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Build a TikTok media kit that showcases your viral content, follower growth, and engagement rates. Essential for TikTok creators and influencers looking to work with brands.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                      <Youtube className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">YouTube Media Kit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Create a comprehensive YouTube media kit with subscriber counts, view analytics, and your best video content. Perfect for YouTube creators and video influencers.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-zinc-50 dark:bg-zinc-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-8 text-center">
                What Makes Our Influencer Marketing Tool Different?
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      Always Up-to-Date Metrics
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Your follower counts and engagement rates update automatically. No more sending outdated screenshots to brands. Your influencer analytics stay current 24/7.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      Professional Presentation
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Stand out from competitors with a polished, professional media kit that shows you take your brand seriously. Perfect for brand collaboration and influencer marketing.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      Track Brand Interest
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      See which brands are viewing your media kit with built-in analytics. Know who's interested before they even reach out. Essential for influencer marketing success.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      Mobile-Optimized Media Kit
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Your media kit looks perfect on any device. Brands can view your creator portfolio whether they're on desktop, tablet, or mobile. Perfect for on-the-go brand managers.
                    </p>
                  </div>
                </div>
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
                  Frequently Asked Questions About Media Kits for Influencers
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Everything you need to know about creating your professional media kit
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    <h3 className="text-lg font-semibold">What is a professional media kit for influencers?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                    <p>
                      A professional media kit for influencers is a digital portfolio that showcases your brand, audience metrics, past collaborations, and services. It's essential for landing brand partnerships and demonstrating your value to potential sponsors. Think of it as your digital business card that tells brands everything they need to know about working with you. Whether you're creating an Instagram media kit, TikTok media kit, or a comprehensive social media portfolio, a professional media kit is your key to successful influencer marketing.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    <h3 className="text-lg font-semibold">How do I create a media kit for influencers?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                    <p>
                      Creating a media kit for influencers is easy with CreatorKit's media kit builder. Simply register for free (no credit card required), fill in your profile information, connect your Instagram, TikTok, and YouTube accounts, and choose a professional template. Your influencer media kit will be live in under 60 seconds. You can customize it further with your branding, services, and portfolio items. Our media kit generator handles all the technical aspects, so you can focus on showcasing your best work.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    <h3 className="text-lg font-semibold">What should be included in an influencer media kit?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                    <p>
                      An influencer media kit should include your bio, audience demographics, follower counts across all platforms (Instagram, TikTok, YouTube), engagement rates, past brand collaborations, services offered, and contact information. CreatorKit automatically syncs your social media metrics for real-time accuracy, so you never have to manually update your numbers. You can also include your best content examples, testimonials from past brand partnerships, and your collaboration packages or rate card.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    <h3 className="text-lg font-semibold">Is there a free media kit builder?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                    <p>
                      Yes! CreatorKit offers a completely free media kit builder. You can create your professional media kit with no credit card required. Free plans include basic templates, social media integration, contact forms, and automatic follower count syncing. Upgrade to Pro for advanced analytics, premium templates, verified badges, and priority support. Our free media kit generator gives you everything you need to get started with influencer marketing.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    <h3 className="text-lg font-semibold">How is this different from other influencer marketing tools?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                    <p>
                      CreatorKit is specifically designed for influencers who want to showcase their work professionally. Unlike generic link-in-bio tools, we focus on creating comprehensive media kits with real-time analytics, brand inquiry forms, and professional presentation. Our platform combines the best of media kit builders and link in bio tools into one powerful influencer marketing tool. Perfect for Instagram influencers, TikTok creators, YouTube content creators, and multi-platform influencers.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">
                    <h3 className="text-lg font-semibold">Can I use this as an Instagram media kit?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                    <p>
                      Absolutely! CreatorKit is perfect for creating an Instagram media kit. Our platform automatically syncs your Instagram follower count, engagement rates, and you can showcase your best Instagram content. You can also integrate TikTok, YouTube, and other platforms to create a comprehensive social media media kit. Many Instagram influencers use CreatorKit to create professional media kits that help them land brand partnerships.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left">
                    <h3 className="text-lg font-semibold">Do I need design skills to create a media kit?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                    <p>
                      No design skills required! CreatorKit's media kit builder comes with professional templates that you can customize. Simply choose a template, add your information, and your professional media kit is ready. The entire process takes less than 60 seconds. Our media kit generator handles all the design work, so you can focus on what matters—showcasing your brand and landing partnerships.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-12 text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Link href="/login">
                    Register Now - Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="bg-zinc-50 dark:bg-zinc-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-8 text-center">
                Learn More About Media Kits for Influencers
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Blog: How to Create a Professional Media Kit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      Read our comprehensive guide on creating a professional media kit for influencers, including design tips, analytics integration, and best practices.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/blog/how-to-create-professional-media-kit-2025">
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Blog: Landing Your First Brand Collaboration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      Learn step-by-step strategies for landing your first brand partnership using your professional media kit and influencer marketing best practices.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/blog/how-to-land-first-brand-collaboration-step-by-step">
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-gradient-to-b from-indigo-50 via-violet-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-4">
              Ready to Create Your Professional Media Kit for Influencers?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Join 17,000+ influencers who are using CreatorKit's media kit builder to land more brand partnerships. Create your professional influencer media kit in 60 seconds—completely free. Perfect for Instagram influencers, TikTok creators, YouTube content creators, and multi-platform influencers.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Link href="/login">
                  Register Now - Free Forever
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href="/#demo">
                  See Examples
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
