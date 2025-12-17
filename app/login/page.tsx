import type { Metadata } from "next";
import Link from "next/link";
import { AuthButton } from "@/components/auth/AuthButton";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Login | CreatorKit",
  description: "Sign in securely with Google to access your CreatorKit workspace.",
  keywords: ["creatorkit login", "creator dashboard sign in", "ugc tool login", "google auth"],
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">CreatorKit</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to home
          </Link>
        </nav>
      </header>

      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl rounded-3xl border bg-card p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Sign in
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight">Log in to CreatorKit</h1>
            <p className="text-sm text-muted-foreground">
              Use your Google account to access your creator dashboard. One click, no passwords to
              remember.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <AuthButton
              variant="default"
              size="lg"
              className="w-full justify-center"
            />
            <p className="text-center text-xs text-muted-foreground">
              Securely handled via Google. No other sign-in methods required.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
