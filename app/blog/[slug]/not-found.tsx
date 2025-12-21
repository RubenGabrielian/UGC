import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
        Post Not Found
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8">
        The blog post you're looking for doesn't exist.
      </p>
      <Button asChild>
        <Link href="/blog">Back to Blog</Link>
      </Button>
    </div>
  );
}
