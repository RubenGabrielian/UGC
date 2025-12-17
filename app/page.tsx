import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  DollarSign,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  Briefcase,
  Sparkles,
} from "lucide-react";
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
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#who"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Who it&apos;s for
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Help brands understand who you are and how to work with you.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            One professional page where brands can see your social profiles, audience insights, services, pricing, and contact information. Make it easy for them to decide.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AuthButton size="lg" variant="default" className="w-full sm:w-auto" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-y bg-muted/30 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              The back-and-forth is exhausting
            </h2>
            <div className="mt-12 space-y-8">
              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <span className="text-sm font-semibold">×</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Brands ask the same questions repeatedly</h3>
                  <p className="mt-1 text-muted-foreground">
                    &quot;What&apos;s your follower count?&quot; &quot;What services do you offer?&quot; &quot;What are your rates?&quot;
                    You answer these questions in every conversation.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <span className="text-sm font-semibold">×</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Screenshots, PDFs, and long DMs don&apos;t scale</h3>
                  <p className="mt-1 text-muted-foreground">
                    Sending screenshots of your analytics or attaching PDFs feels unprofessional. Long DMs get lost in inboxes.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <span className="text-sm font-semibold">×</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Hard to build trust and look professional</h3>
                  <p className="mt-1 text-muted-foreground">
                    Without a dedicated page, it&apos;s difficult to present yourself as a serious creator who brands can trust with their campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            One page that answers everything
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            Create a professional creator page that gives brands everything they need to make a decision—without the back-and-forth.
          </p>
          <div className="mt-16 space-y-8">
            <div className="flex gap-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Clear services and transparent pricing</h3>
                <p className="mt-1 text-muted-foreground">
                  Display your service packages and rates upfront. Brands know exactly what they&apos;re getting and how much it costs.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Social proof and past collaborations</h3>
                <p className="mt-1 text-muted-foreground">
                  Showcase your follower counts, engagement rates, and brands you&apos;ve worked with. Build credibility instantly.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Easy contact and collaboration requests</h3>
                <p className="mt-1 text-muted-foreground">
                  Let brands submit partnership requests directly through your page. No more email tag or DMs that get missed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-y bg-muted/30 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything brands need to know
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your creator page includes all the essential information brands look for when evaluating creators.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Social Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect your Instagram, TikTok, YouTube, and other platforms. Display follower counts and engagement metrics automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Services & Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  List your service packages with clear pricing. Whether it&apos;s Instagram Stories, TikTok videos, or blog posts—make it transparent.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Past Collaborations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Showcase brands you&apos;ve worked with. Display logos and highlight successful partnerships to build trust.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Contact & Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Receive structured partnership requests directly on your page. Brands can submit their details and service requirements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track page views and see which brands are visiting your page. Understand what&apos;s working and optimize your content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Audience Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Share your audience demographics, geographic distribution, and engagement rates. Help brands understand your reach.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Pricing that grows with you
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start with everything you need for free. Upgrade to unlock the
              next wave of tools as soon as they launch.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Free</CardTitle>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Available now
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Publish a complete creator profile and start sharing it today.
                </p>
                <div className="text-4xl font-bold">
                  $0 <span className="text-base font-medium text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    Unlimited sections, links, and social profiles
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    Services, rates, and contact form in one page
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    Audience highlights and past collaborations
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    Instant link to share with brands
                  </li>
                </ul>
                <AuthButton size="lg" variant="default" className="w-full" />
              </CardContent>
            </Card>

            <Card className="border-primary/40 shadow-lg shadow-primary/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pro</CardTitle>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Coming soon
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Unlock advanced workflows as soon as they roll out.
                </p>
                <div className="text-4xl font-bold">
                  $9 <span className="text-base font-medium text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    Advanced analytics and brand visit insights
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    Saved proposals and rate cards by service
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    CRM-style pipeline for brand conversations
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    Priority support and early feature access
                  </li>
                </ul>
                <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm text-primary">
                  Join the waitlist—your spot carries over when Pro launches.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Is It For Section */}
      <section id="who" className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Built for creators who work with brands
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            Whether you&apos;re just starting out or already working with established brands, a professional creator page helps you stand out.
          </p>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>UGC Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Showcase your content creation skills and make it easy for brands to understand your style, rates, and availability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bloggers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Display your blog stats, audience demographics, and sponsored post packages. Help brands see the value you bring.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Micro-influencers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Build credibility with a professional page that showcases your niche, engagement rates, and past brand partnerships.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Freelance Content Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Present your services, portfolio, and pricing in one place. Make it simple for brands to evaluate and hire you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30 py-24">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stop explaining yourself. Let brands decide faster.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Create your professional creator page in minutes. Give brands everything they need to make a decision, and close more partnerships.
          </p>
          <div className="mt-10">
            <AuthButton size="lg" variant="default" className="w-full sm:w-auto" />
          </div>
        </div>
      </section>

    </div>
  );
}
