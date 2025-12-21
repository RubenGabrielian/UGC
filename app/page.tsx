import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthButton } from "@/components/auth/AuthButton";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Media Kit for Creators | Link in Bio Tool | CreatorKit",
  description:
    "Professional media kit & link in bio tool for influencers. Real-time Instagram & TikTok analytics, customizable templates, and brand collaboration tools. Free to start.",
  keywords: [
    "media kit for creators",
    "link in bio tool",
    "influencer analytics",
    "brand collaboration tool",
    "digital portfolio for influencers",
    "instagram analytics",
    "tiktok analytics",
    "creator media kit",
    "influencer link in bio",
    "social media portfolio",
  ],
  openGraph: {
    title: "Media Kit for Creators | Link in Bio Tool | CreatorKit",
    description:
      "Professional media kit & link in bio tool for influencers. Real-time analytics, customizable templates, and brand collaboration tools.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Media Kit for Creators | Link in Bio Tool | CreatorKit",
    description:
      "Professional media kit & link in bio tool for influencers. Real-time analytics, customizable templates, and brand collaboration tools.",
  },
};

export default function Home() {
  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I create a media kit for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Creating a free media kit is simple! Sign up for CreatorKit (no credit card required), fill in your profile information, connect your social media accounts, and choose a template. Your professional media kit will be live in under 60 seconds. You can upgrade to Pro later for advanced analytics and premium features."
        }
      },
      {
        "@type": "Question",
        "name": "Can I track my link clicks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! CreatorKit provides real-time analytics for all users. Free users get basic page view tracking, while Pro users get detailed analytics including daily page views, weekly summaries, and lifetime statistics. You can see exactly which brands are visiting your profile and when."
        }
      },
      {
        "@type": "Question",
        "name": "Is it compatible with Instagram and TikTok?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! CreatorKit integrates seamlessly with Instagram, TikTok, YouTube, and Facebook. Your follower counts are automatically synced and displayed on your profile. You can also add direct links to your social media profiles so brands can easily find and follow you."
        }
      },
      {
        "@type": "Question",
        "name": "What makes CreatorKit different from other link-in-bio tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CreatorKit is specifically designed for brand collaborations. Unlike generic link-in-bio tools, CreatorKit focuses on showcasing your work as a creator with professional portfolio templates, real-time analytics, and a direct brand inquiry form. It's built to help you close more partnerships, not just share links."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a Pro plan to use CreatorKit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No! CreatorKit is completely free to start. The free plan includes a professional profile page, social media integration, contact form, and basic templates. Pro plans unlock advanced analytics, premium templates, verified badges, and priority support. You can upgrade anytime."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-background">
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="CreatorKit - Professional Media Kit and Link in Bio Tool for Creators"
                width={88}
                height={88}
                className="h-16 w-16"
                priority
              />
              <span className="text-xl font-bold">CreatorKit</span>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#demo"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Demo
              </a>
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Pricing
              </a>
              <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Blog
              </Link>
            </div>
            <div className="hidden md:block">
              <AuthButton size="lg" />
            </div>
            <div className="md:hidden">
              <AuthButton size="sm" />
            </div>
          </nav>
        </header>

        <LandingPage authButton={<AuthButton size="lg" variant="default" className="w-full sm:w-auto" />} />
      </div>
    </>
  );
}
