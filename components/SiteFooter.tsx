import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="CreatorKit" width={32} height={32} />
          <div>
            <p className="text-sm font-semibold">CreatorKit</p>
            <p className="text-xs text-muted-foreground">Build and share your media kit.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link href="/#features" className="transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="/#who" className="transition-colors hover:text-foreground">
            Who it&apos;s for
          </Link>
          <Link href="/login" className="transition-colors hover:text-foreground">
            Login
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/privacy-policy" className="transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms &amp; Conditions
          </Link>
        </div>

        <p className="text-xs text-muted-foreground sm:text-right">
          &copy; {new Date().getFullYear()} CreatorKit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

