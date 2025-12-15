import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CreatorNotFoundPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-6 text-center">
        <Card className="w-full border border-dashed border-zinc-200 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            creatorkit
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Creator profile not found
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            This CreatorKit URL doesn&apos;t match any live media kit. The link may be broken
            or the creator hasn&apos;t published their page yet.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/">Back to homepage</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard">Create your own CreatorKit</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}


