import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, PlayCircle, DollarSign, Check, Sparkles } from "lucide-react";
import { AuthButton } from "@/components/auth/AuthButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CreatorKit</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              FAQ
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Stop sending ugly PDF Media Kits to brands.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Build a professional, live digital portfolio that showcases your best TikToks & Reels, stats, and rates. Close more deals, faster.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AuthButton size="lg" variant="default" className="w-full sm:w-auto" />
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View Example Kit
            </Button>
          </div>
          <div className="mt-16">
            <div className="mx-auto aspect-video max-w-5xl overflow-hidden rounded-lg border bg-muted shadow-2xl">
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                <img src="https://ph-files.imgix.net/052cb503-cfee-4a5c-9c1e-f055b6e8d599.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fm=pjpg&w=1100&h=619&fit=max&frame=1&dpr=2" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Trusted by creators who work with top brands.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-8 opacity-40">
            <div className="text-sm font-semibold">Brand Logo 1</div>
            <div className="text-sm font-semibold">Brand Logo 2</div>
            <div className="text-sm font-semibold">Brand Logo 3</div>
            <div className="text-sm font-semibold">Brand Logo 4</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why standard link-in-bio tools aren&apos;t enough for pitching.
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Look Like a Pro</h3>
            <p className="text-muted-foreground">
              Ditch the Google Drive links. Send a custom URL that impresses brand managers instantly.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <PlayCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Embed Your Best Videos</h3>
            <p className="text-muted-foreground">
              Don&apos;t just link to your profile. Showcase your highest-performing Reels and TikToks directly on the page.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Transparent Pricing</h3>
            <p className="text-muted-foreground">
              Display your service packages clearly so brands know exactly what they&apos;re buying.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <div className="mt-16 space-y-12">
            <div className="flex gap-6">
              <div className="flex shrink-0">
                <Badge variant="default" className="h-10 w-10 items-center justify-center rounded-full p-0 text-base font-semibold">
                  1
                </Badge>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Connect your socials & import stats</h3>
                <p className="mt-2 text-muted-foreground">
                  Link your TikTok and Instagram accounts. We automatically pull your latest follower counts, engagement rates, and top-performing content.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex shrink-0">
                <Badge variant="default" className="h-10 w-10 items-center justify-center rounded-full p-0 text-base font-semibold">
                  2
                </Badge>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Select your best video examples</h3>
                <p className="mt-2 text-muted-foreground">
                  Choose which TikToks and Reels to showcase. Drag and drop to reorder, add captions, and highlight your best work.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex shrink-0">
                <Badge variant="default" className="h-10 w-10 items-center justify-center rounded-full p-0 text-base font-semibold">
                  3
                </Badge>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Share your custom &quot;CreatorKit&quot; link with brands</h3>
                <p className="mt-2 text-muted-foreground">
                  Get your unique URL (e.g., creatorkit.com/yourname) and start sharing it in your pitch emails. Watch your conversion rate soar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple pricing that pays for itself with one deal.
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/mo</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">1 Media Kit</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Basic Stats</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">&quot;Powered by CreatorKit&quot; branding</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Start Free
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-primary/50 ring-2 ring-primary/20">
            <CardHeader>
              <div className="mb-2">
                <Badge variant="default" className="mb-2">Most Popular</Badge>
              </div>
              <CardTitle>Pro Creator</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-foreground">$12</span>
                <span className="text-muted-foreground">/mo</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Unlimited Videos</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Remove Branding</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Custom Domain support</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Analytics</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Go Pro
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-16">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Do I need coding skills?</AccordionTrigger>
                <AccordionContent>
                  Not at all! CreatorKit is designed for creators, not developers. Our drag-and-drop interface makes it easy to build your media kit in minutes. Just connect your social accounts, select your videos, and you&apos;re ready to go.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I connect TikTok?</AccordionTrigger>
                <AccordionContent>
                  Yes! CreatorKit supports both TikTok and Instagram. Simply connect your accounts through our secure OAuth integration, and we&apos;ll automatically import your stats and top-performing content.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is there a free trial?</AccordionTrigger>
                <AccordionContent>
                  Our Starter plan is completely free forever. You can build one media kit with basic features at no cost. If you want to remove branding, add unlimited videos, or use a custom domain, you can upgrade to Pro Creator anytime.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do brands access my media kit?</AccordionTrigger>
                <AccordionContent>
                  You&apos;ll get a unique URL (like creatorkit.com/yourname) that you can share in emails, DMs, or anywhere you pitch brands. The link works on all devices and looks professional on mobile, which is how most brand managers will view it.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="border-t bg-muted/30 py-24">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to level up your pitches?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Join thousands of creators who are closing more deals with professional media kits.
          </p>
          <div className="mt-8">
            <AuthButton size="lg" variant="default" className="w-full sm:w-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
}
