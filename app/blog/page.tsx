import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts, getFeaturedPosts, calculateReadingTime } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog | CreatorKit - Creator Resources & Tips",
  description:
    "Learn how to grow your creator business, build your media kit, and land brand partnerships. Expert tips and guides for content creators.",
  keywords: [
    "creator blog",
    "influencer tips",
    "media kit guide",
    "brand collaboration",
    "content creator resources",
  ],
};

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const allPosts = blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="CreatorKit"
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
              className="text-sm font-medium text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl mb-4">
            CreatorKit Blog
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Expert tips, guides, and resources to help you grow your creator business and land more brand partnerships.
          </p>
        </div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
              Featured Posts
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => {
                const readingTime = calculateReadingTime(post.content);
                return (
                  <Card key={post.slug} className="group overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900 p-4">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {post.category && (
                          <div className="absolute top-6 left-6">
                            <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>
                      <CardHeader className="p-6">
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors mb-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" aria-hidden="true" />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </time>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" aria-hidden="true" />
                            <span>{readingTime} min read</span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* All Posts Section */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
            All Posts
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => {
              const readingTime = calculateReadingTime(post.content);
              return (
                <Card key={post.slug} className="group overflow-hidden border-2 hover:border-primary/50 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900 p-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {post.category && (
                        <div className="absolute top-6 left-6">
                          <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-6">
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" aria-hidden="true" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" aria-hidden="true" />
                          <span>{readingTime} min read</span>
                        </div>
                      </div>
                      <Button variant="ghost" className="w-full group-hover:bg-primary/10">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
