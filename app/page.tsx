import type { Metadata } from "next";
import Image from "next/image";
import { AuthButton } from "@/components/auth/AuthButton";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "CreatorKit | Your Professional Media Kit in 60 Seconds",
  description:
    "A beautiful, analytics-driven bio link designed for creators and brands to collaborate. Track your reach, receive direct leads, and switch designs instantly.",
  keywords: [
    "creatorkit",
    "ugc media kit",
    "creator portfolio",
    "influencer rate card",
    "booking link",
    "creator landing page",
    "social proof",
    "creator analytics",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="CreatorKit"
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
  );
}
