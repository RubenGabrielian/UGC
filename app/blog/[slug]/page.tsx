import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import {
  getPostBySlug,
  getRelatedPosts,
  calculateReadingTime,
  type BlogPost,
} from "@/lib/blog-data";
import { renderMarkdown } from "@/lib/markdown-renderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | CreatorKit Blog",
    };
  }

  return {
    title: `${post.title} | CreatorKit Blog`,
    description: post.description,
    keywords: post.tags || [],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  // This would be dynamic in a real app, but for now we'll generate for all posts
  const { blogPosts } = await import("@/lib/blog-data");
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const relatedPosts = getRelatedPosts(slug, 3);

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "CreatorKit",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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

        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-[200px] truncate">
                  {post.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <article className="mx-auto max-w-3xl">
            {/* Article Header */}
            <header className="mb-8">
              {post.category && (
                <div className="mb-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              )}
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                {post.title}
              </h1>
              <p className="mb-6 text-xl text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  {post.authorAvatar && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.authorAvatar} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <span className="font-medium">{post.author}</span>
                </div>
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
            </header>

            {/* Featured Image */}
            <div className="relative mb-12 aspect-video overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 p-6">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-50 prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-900 dark:prose-strong:text-zinc-50 prose-code:text-zinc-900 dark:prose-code:text-zinc-50 prose-pre:bg-zinc-900 prose-pre:text-zinc-100">
              {renderMarkdown(post.content)}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Back to Blog Button */}
            <div className="mt-12">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mx-auto mt-16 max-w-6xl">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Related Posts
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => {
                  const relatedReadingTime = calculateReadingTime(relatedPost.content);
                  return (
                    <Card
                      key={relatedPost.slug}
                      className="group overflow-hidden border-2 hover:border-primary/50 transition-colors"
                    >
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900 p-4">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <CardHeader className="p-6">
                          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors mb-2">
                            {relatedPost.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {relatedPost.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" aria-hidden="true" />
                              <time dateTime={relatedPost.date}>
                                {new Date(relatedPost.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </time>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" aria-hidden="true" />
                              <span>{relatedReadingTime} min</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            className="mt-4 w-full group-hover:bg-primary/10"
                          >
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
          )}
        </main>
      </div>
    </>
  );
}
