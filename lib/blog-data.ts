export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorAvatar?: string;
  image: string;
  featured: boolean;
  content: string; // Markdown content
  category?: string;
  tags?: string[];
  keywords?: string[]; // SEO keywords
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-create-ugc-portfolio-2025",
    title: "How to Create a Professional UGC Portfolio That Lands Brand Deals in 2025",
    description:
      "Discover why static PDFs are dead and live portfolios are the future for UGC creators. Learn how to showcase your content, display live analytics, and land more brand collaborations with a high-end digital portfolio.",
    date: "2025-01-20",
    author: "CreatorKit Team",
    authorAvatar: "/logo.png",
    image: "/img/blog4.png",
    featured: true,
    category: "Guides",
    tags: ["UGC Portfolio", "Media Kit builder", "Brand collaborations", "User Generated Content"],
    keywords: ["UGC Portfolio", "Media Kit builder", "Brand collaborations", "User Generated Content"],
    content: `# How to Create a Professional UGC Portfolio That Lands Brand Deals in 2025

The era of static PDF media kits is over. In 2025, brands expect more from UGC creators—they want to see live data, interactive content showcases, and real-time engagement metrics. If you're still sending screenshots of your follower count in a PDF, you're already behind.

The future belongs to **live, interactive UGC portfolios** that showcase your work dynamically and prove your value with real-time analytics. Here's how to create one that actually lands brand deals.

## Why Static PDFs Are Dead (And Live Portfolios Are the Future)

Remember when you had to manually update your follower count every month in your media kit? Those days are gone. Brands now expect:

- **Real-time analytics** that update automatically
- **Interactive video portfolios** where they can see your work immediately
- **Live engagement rates** that prove your audience is engaged
- **Professional presentation** that reflects your brand quality

A static PDF can't deliver any of this. It's outdated the moment you send it, and it doesn't showcase your content effectively. Brands want to see your videos playing, not click through to external links.

**The Solution:** A live, interactive portfolio that updates automatically and showcases your content beautifully.

## The Essential Elements of a High-Converting Portfolio

Your UGC portfolio needs three core elements to convert brands into partnerships:

### 1. Your Bio and Brand Identity

Start with a compelling introduction that answers:
- Who you are and what you create
- Your niche and target audience
- What makes your content unique
- Why brands should work with you

**Pro Tip:** Include a professional headshot and a collaboration headline that immediately communicates your value proposition. For example: "Fashion & Lifestyle Creator | 250K+ Engaged Followers | Proven ROI for Beauty Brands"

### 2. Social Links and Unified Presence

Brands want to see your presence across all platforms. Your portfolio should include:
- Links to all your social media profiles
- Follower counts that update automatically
- Platform-specific engagement rates
- Cross-platform reach totals

**Why This Matters:** Brands often work with creators who have a strong presence on multiple platforms. Showing your unified social presence demonstrates your ability to reach audiences across TikTok, Instagram, YouTube, and more.

### 3. Live Verified Audience Stats

This is where live portfolios shine. Instead of screenshots, show:
- **Real-time follower counts** that sync automatically
- **Engagement rates** calculated from actual performance data
- **Audience demographics** (age, location, interests)
- **Growth trends** over time

**The Brand Perspective:** When a brand sees your engagement rate is 4.2% and your followers are growing, they can immediately assess your value. Static screenshots don't provide this level of transparency.

## Showcasing Your Content: Why Inline Video Players Beat Drive Links

This is crucial. How you showcase your UGC content can make or break a brand partnership.

### The Problem with External Links

Many creators still use:
- Google Drive links to video folders
- Dropbox links that require downloads
- YouTube playlists that send brands away from your portfolio
- Instagram links that require app switching

**Why This Fails:**
- Brands are busy—they won't click through multiple links
- External links break the professional experience
- You lose control over how your content is presented
- Analytics become fragmented across platforms

### The Solution: Inline Video Players

A professional UGC portfolio should embed videos directly on the page. When brands visit your portfolio, they should be able to:
- Watch your best UGC content immediately
- See multiple videos in a clean, organized grid
- Understand your content style at a glance
- Get a sense of your production quality

**Real Example:** A UGC creator using CreatorKit showcases 12 of their best brand collaboration videos directly on their portfolio. When a beauty brand visits, they can watch 3-4 videos in under 2 minutes and immediately understand the creator's style, quality, and audience engagement.

**The Result:** Higher conversion rates from portfolio views to brand partnerships.

### Best Practices for Video Showcases

1. **Curate Your Best Work:** Don't show everything—show your top 10-15 pieces
2. **Organize by Category:** Group videos by niche (beauty, fashion, tech, etc.)
3. **Include Context:** Add brief descriptions of what each video achieved
4. **Show Results:** If possible, include engagement metrics for each video

## Why Brands Love Live Data

Brands are data-driven. They make decisions based on metrics, not assumptions. Here's why live data matters:

### Engagement Rate: The Golden Metric

Your engagement rate tells brands:
- How active your audience is
- Whether your followers are real or fake
- How likely your content is to perform
- The ROI potential of working with you

**Industry Benchmarks:**
- **Excellent:** 4-6% engagement rate
- **Good:** 2-4% engagement rate
- **Average:** 1-2% engagement rate
- **Below Average:** <1% engagement rate

When your portfolio shows a live engagement rate of 4.2%, brands immediately know you're in the "excellent" category. This data speaks louder than any pitch.

### Verified vs. Unverified Stats

Brands are increasingly skeptical of self-reported metrics. A live portfolio that pulls data directly from social media APIs provides:
- **Verification:** Brands can trust the numbers
- **Transparency:** No need to question authenticity
- **Real-time accuracy:** Always up-to-date information
- **Professional credibility:** Shows you're serious about your business

### The Trust Factor

When a brand sees your follower count updated yesterday and your engagement rate calculated from your last 30 posts, they trust you. When they see a screenshot from 3 months ago, they question everything.

## Building Your UGC Portfolio: Step-by-Step

### Step 1: Choose Your Platform

You have two options:

**Option A: Build from Scratch**
- Use website builders like Webflow or Framer
- Requires design skills and technical knowledge
- Time-consuming but fully customizable
- You'll need to integrate analytics manually

**Option B: Use a Creator Portfolio Platform**
- Platforms like CreatorKit are built specifically for creators
- Pre-designed templates optimized for conversions
- Automatic analytics integration
- Live updates without manual work
- Professional presentation out of the box

**Our Recommendation:** Unless you're a designer and developer, use a dedicated platform. Your time is better spent creating content than building websites.

### Step 2: Gather Your Assets

Before building, collect:
- Your best UGC videos (10-15 pieces)
- Professional headshot
- Brand logos from past collaborations
- Social media handles for all platforms
- Any testimonials from brand partners

### Step 3: Set Up Analytics Integration

Connect your social media accounts to automatically sync:
- Follower counts
- Engagement metrics
- Post performance data
- Audience demographics

**Pro Tip:** Use a platform that supports multiple social media APIs (Instagram, TikTok, YouTube) so all your data syncs automatically.

### Step 4: Organize Your Content

Structure your portfolio with:
- **Hero Section:** Your name, headline, and key stats
- **About Section:** Your story and niche
- **Video Portfolio:** Your best UGC content
- **Social Stats:** Live metrics from all platforms
- **Services:** What you offer brands
- **Contact Form:** Easy way for brands to reach you

### Step 5: Optimize for Mobile

Most brands will view your portfolio on their phone. Ensure:
- Fast loading times
- Mobile-responsive design
- Easy navigation
- Videos play smoothly on mobile

### Step 6: Test and Refine

Before sharing with brands:
- Test on multiple devices
- Check all links work
- Verify analytics are updating
- Get feedback from fellow creators
- Make sure contact forms work

## Common Mistakes to Avoid

1. **Outdated Information:** If your follower count is from last month, brands will notice
2. **Broken Links:** Test every link before sharing
3. **Too Much Content:** Curate your best work, don't show everything
4. **Poor Mobile Experience:** Most brands view portfolios on mobile
5. **No Clear CTA:** Make it obvious how brands can contact you
6. **Generic Templates:** Customize to reflect your unique brand
7. **Missing Analytics:** Brands want to see data, not just content

## The ROI of a Professional Portfolio

Investing in a professional UGC portfolio pays off:

**Time Saved:**
- No more manually updating follower counts
- No more creating new PDFs for each brand
- No more hunting for video links

**More Opportunities:**
- Brands discover you through SEO-optimized portfolios
- Professional presentation increases conversion rates
- Live data builds trust faster

**Higher Rates:**
- Professional presentation justifies premium pricing
- Verified analytics support higher rates
- Portfolio quality reflects content quality

**Real Results:** Creators using professional portfolio platforms report 3-5x more brand inquiries compared to those using static PDFs.

## Conclusion & Next Steps

The future of UGC creator portfolios is live, interactive, and data-driven. Static PDFs are a thing of the past, and brands expect more from creators in 2025.

Your portfolio is often the first impression brands get of you. Make it count by:
- Showcasing your content with inline video players
- Displaying live, verified analytics
- Presenting a professional, mobile-optimized experience
- Making it easy for brands to contact you

**Ready to upgrade your UGC portfolio?** [Create your professional portfolio on CreatorKit now](/login) and have it live in under 60 seconds. Show brands your value with live data, showcase your best content beautifully, and start landing more brand deals.

The creators who adapt to this new standard will dominate brand partnerships in 2025. Will you be one of them?`,
  },
  {
    slug: "how-to-create-professional-media-kit-2025",
    title: "How to Create a Professional Media Kit in 2025",
    description:
      "Learn the essential steps to build a standout media kit that brands will love. From design tips to analytics integration, this guide covers everything you need.",
    date: "2025-01-15",
    author: "CreatorKit Team",
    authorAvatar: "/logo.png",
    image: "/img/blog1.png",
    featured: true,
    category: "Guides",
    tags: ["Media Kit", "Branding", "Tutorial"],
    content: `# How to Create a Professional Media Kit in 2025

A professional media kit is your digital business card—it's the first impression brands get of you and your work. In 2025, the standards have evolved, and simply having a PDF isn't enough. Here's how to create a media kit that stands out.

## Why Your Media Kit Matters

Your media kit is often the deciding factor in whether a brand chooses to collaborate with you. It showcases your:

- **Audience reach** across all platforms
- **Engagement rates** and authentic connections
- **Past collaborations** and success stories
- **Professional presentation** of your brand

## Essential Components of a Modern Media Kit

### 1. Your Story and Brand Identity

Start with a compelling introduction. Who are you? What makes your content unique? Brands want to work with creators who have a clear brand identity and authentic voice.

**Pro Tip:** Include a professional headshot and a brief bio that highlights your niche and expertise.

### 2. Audience Analytics

In 2025, brands expect real-time, verified analytics. Don't just share screenshots—use a platform that automatically syncs your follower counts and engagement metrics.

**Key Metrics to Include:**
- Total reach across all platforms
- Average engagement rate
- Audience demographics
- Growth trends over time

### 3. Content Portfolio

Showcase your best work. Include:
- High-quality images from past collaborations
- Video examples (if applicable)
- Testimonials from previous brand partners
- Case studies showing campaign results

### 4. Services and Rates

Be transparent about what you offer:
- Content creation packages
- Collaboration types (sponsored posts, UGC, long-term partnerships)
- Pricing structure (or "contact for rates" if preferred)

### 5. Contact Information

Make it easy for brands to reach you:
- Direct inquiry form
- Email address
- Social media links
- Preferred communication method

## Design Best Practices

### Keep It Clean and Professional

- Use a consistent color scheme that matches your brand
- Choose readable fonts (avoid decorative fonts for body text)
- Maintain plenty of white space
- Use high-quality images throughout

### Make It Interactive

Instead of a static PDF, consider a live, interactive media kit:
- Real-time analytics that update automatically
- Clickable links to your best content
- Embedded video portfolios
- Direct contact forms

## Common Mistakes to Avoid

1. **Outdated Information:** Keep your follower counts and metrics current
2. **Too Much Text:** Brands are busy—get to the point quickly
3. **Low-Quality Images:** Your media kit reflects your brand quality
4. **Missing Contact Info:** Make it easy for brands to reach you
5. **Generic Templates:** Customize your media kit to reflect your unique brand

## Tools to Create Your Media Kit

While you can create a media kit using design tools like Canva or Figma, using a dedicated platform like CreatorKit offers several advantages:

- **Automatic Analytics Sync:** Your metrics stay current without manual updates
- **Professional Templates:** Start with a polished design
- **Brand Inquiry Forms:** Streamline the collaboration process
- **SEO Benefits:** Your media kit becomes discoverable by brands searching for creators

## Next Steps

1. **Gather Your Assets:** Collect your best images, videos, and testimonials
2. **Choose Your Platform:** Decide between a static PDF or a live, interactive media kit
3. **Design Your Layout:** Use a template or create a custom design
4. **Add Your Analytics:** Include real-time metrics from all your platforms
5. **Test and Refine:** Share with a friend or fellow creator for feedback

## Conclusion

A professional media kit in 2025 is more than just a document—it's a dynamic showcase of your brand. By following these guidelines and using modern tools, you'll create a media kit that helps you land more brand collaborations and grow your creator business.

Ready to create your professional media kit? [Get started with CreatorKit for free](/) and have your media kit live in under 60 seconds.`,
  },
  {
    slug: "5-reasons-tiktoker-needs-link-in-bio-tool",
    title: "5 Reasons Why Every TikToker Needs a Link in Bio Tool",
    description:
      "Discover why a link-in-bio tool is essential for TikTok creators looking to monetize their content and build their brand partnerships.",
    date: "2025-01-10",
    author: "CreatorKit Team",
    authorAvatar: "/logo.png",
    image: "/img/blog2.png",
    featured: true,
    category: "Tips",
    tags: ["TikTok", "Link in Bio", "Monetization"],
    content: `# 5 Reasons Why Every TikToker Needs a Link in Bio Tool

TikTok has become one of the most powerful platforms for creators, but there's one major limitation: you can only add one link to your bio. That's where a link-in-bio tool becomes essential.

## The TikTok Link Problem

TikTok allows creators to add just one clickable link in their profile. This creates a significant challenge when you want to:
- Share multiple pieces of content
- Link to different social platforms
- Promote brand collaborations
- Drive traffic to your website or store
- Collect email subscribers

A link-in-bio tool solves this problem by creating a single landing page that houses all your important links.

## Reason 1: Maximize Your Monetization Opportunities

As a TikToker, you're likely exploring multiple revenue streams:
- Brand partnerships
- Affiliate marketing
- Product sales
- Sponsored content
- Consulting or services

With a link-in-bio tool, you can promote all of these in one place. Instead of constantly updating your bio link, you maintain one link that directs followers to a page with all your offerings.

**Real Example:** A TikTok creator with 500K followers uses their link-in-bio page to showcase:
- Their latest brand collaboration
- A link to their merchandise store
- An affiliate link to their favorite products
- A contact form for brand inquiries

This single link drives more conversions than a single destination ever could.

## Reason 2: Track What's Working

One of the biggest advantages of using a professional link-in-bio tool is analytics. You can see:
- Which links get the most clicks
- What time of day your audience is most engaged
- Which content drives the most traffic
- Geographic data about your audience

This data helps you make informed decisions about what to promote and when.

**Pro Tip:** Use analytics to A/B test different link placements and see what resonates with your audience.

## Reason 3: Professional Brand Presentation

Your link-in-bio page is often the first impression brands get of you. A well-designed page shows that you:
- Take your creator business seriously
- Have a professional approach to partnerships
- Understand the importance of presentation
- Are organized and easy to work with

A generic link shortener or basic landing page doesn't convey the same level of professionalism as a custom-designed link-in-bio page.

## Reason 4: Showcase Your Best Content

A link-in-bio tool allows you to:
- Highlight your most successful videos
- Create collections of themed content
- Link to your other social platforms
- Share behind-the-scenes content
- Promote your YouTube channel or podcast

This creates a comprehensive hub that represents your entire brand, not just your TikTok presence.

## Reason 5: Build Your Email List and Community

Your link-in-bio page is the perfect place to:
- Collect email subscribers for newsletters
- Link to your Discord or community platform
- Promote your Patreon or membership program
- Share links to exclusive content

Building an email list gives you a direct line to your audience, independent of any social media platform's algorithm changes.

## What to Look for in a Link-in-Bio Tool

Not all link-in-bio tools are created equal. Here's what to prioritize:

### Essential Features:
- **Customization:** Ability to match your brand aesthetic
- **Analytics:** Detailed insights into link performance
- **Mobile-Optimized:** Most TikTok traffic is mobile
- **Fast Loading:** Users won't wait for slow pages
- **Easy Updates:** Change links without technical knowledge

### Advanced Features:
- **Contact Forms:** Let brands reach you directly
- **Social Media Integration:** Auto-sync follower counts
- **Video Embeds:** Showcase your best TikTok content
- **Scheduling:** Plan link updates in advance

## Getting Started

Creating your link-in-bio page is easier than you think:

1. **Choose a Platform:** Select a tool that fits your needs and budget
2. **Design Your Page:** Use templates or create a custom design
3. **Add Your Links:** Organize your most important links
4. **Update Your TikTok Bio:** Replace your current link with your new link-in-bio URL
5. **Monitor Performance:** Use analytics to optimize your page

## Conclusion

A link-in-bio tool isn't just a convenience—it's a necessity for serious TikTok creators. It maximizes your monetization opportunities, provides valuable insights, and presents a professional image to potential brand partners.

Don't let TikTok's single-link limitation hold you back. Create a comprehensive link-in-bio page that showcases everything you have to offer.

[Start building your link-in-bio page today](/login) and unlock the full potential of your TikTok presence.`,
  },
  {
    slug: "how-to-land-first-brand-collaboration-step-by-step",
    title: "How to Land Your First Brand Collaboration: A Step-by-Step Guide",
    description:
      "A comprehensive guide for creators looking to secure their first brand partnership. Learn the strategies that work in 2025.",
    date: "2025-01-05",
    author: "CreatorKit Team",
    authorAvatar: "/logo.png",
    image: "/img/blog3.png",
    featured: true,
    category: "Guides",
    tags: ["Brand Partnerships", "Collaboration", "Getting Started"],
    content: `# How to Land Your First Brand Collaboration: A Step-by-Step Guide

Landing your first brand collaboration can feel overwhelming, but with the right approach, it's entirely achievable. This step-by-step guide will walk you through the process from preparation to partnership.

## Step 1: Build Your Foundation

Before reaching out to brands, you need a solid foundation.

### Create Quality Content Consistently

Brands want to work with creators who:
- Post regularly (at least 3-5 times per week)
- Have a consistent style and voice
- Engage authentically with their audience
- Show growth over time

**Action Item:** Audit your last 30 posts. Do they represent the quality and style you want brands to see?

### Grow Your Audience Organically

While follower count matters, engagement is more important. Focus on:
- Building genuine connections with your audience
- Responding to comments and messages
- Creating content that encourages interaction
- Collaborating with other creators in your niche

**Target Metrics:** Aim for at least 1,000 engaged followers before actively pursuing brand partnerships.

## Step 2: Create Your Professional Media Kit

Your media kit is your sales pitch. It should include:

### Essential Components:
1. **Your Story:** Who you are and what makes you unique
2. **Audience Demographics:** Age, location, interests
3. **Engagement Metrics:** Average likes, comments, shares
4. **Content Examples:** Your best-performing posts
5. **Collaboration Packages:** What you offer and pricing
6. **Contact Information:** How brands can reach you

**Pro Tip:** Use a platform like CreatorKit to create a live, interactive media kit that automatically updates your analytics.

## Step 3: Identify Your Niche and Target Brands

### Define Your Niche

Be specific about what you create:
- Fashion and style
- Tech reviews
- Fitness and wellness
- Food and cooking
- Travel and lifestyle
- Education and tutorials

### Research Brands in Your Niche

Create a list of brands that:
- Align with your values and content
- Have worked with creators before
- Are within your reach (start with smaller brands)
- Have products you genuinely use or would use

**Tools for Research:**
- Check hashtags in your niche
- Look at creators similar to you
- Browse brand websites for creator programs
- Use social listening tools

## Step 4: Perfect Your Outreach

### Crafting the Perfect Pitch Email

Your pitch should be:
- **Personalized:** Show you know the brand
- **Concise:** Get to the point quickly
- **Professional:** But still authentic
- **Value-Focused:** What can you offer them?

**Email Template Structure:**
1. **Subject Line:** Clear and compelling
2. **Introduction:** Who you are and why you're reaching out
3. **Why You're a Fit:** Connect your content to their brand
4. **What You Offer:** Specific collaboration ideas
5. **Social Proof:** Key metrics and past work
6. **Call to Action:** Next steps

### Example Subject Line:
"Collaboration Opportunity: [Your Name] x [Brand Name]"

### When to Follow Up

- Send a follow-up email after 7-10 days if no response
- Be polite and brief
- Offer additional value (new content idea, updated metrics)

## Step 5: Leverage Creator Platforms

Don't rely solely on cold outreach. Join creator platforms:

### Popular Platforms:
- **AspireIQ:** Connects creators with brands
- **Influence.co:** Creator marketplace
- **Grin:** Influencer marketing platform
- **Upfluence:** For larger creators
- **Brand-specific programs:** Many brands have their own creator programs

**Pro Tip:** Create profiles on multiple platforms to increase your visibility.

## Step 6: Start with Micro-Influencer Programs

Many brands have specific programs for smaller creators:

### Benefits of Starting Small:
- Lower competition
- More opportunities to build your portfolio
- Chance to prove your value
- Often leads to long-term partnerships

### Where to Find Micro-Influencer Programs:
- Brand websites (look for "Creator Program" or "Ambassador Program")
- Social media announcements
- Creator communities and forums
- Email newsletters from brands you follow

## Step 7: Negotiate Your First Deal

### Understanding Your Value

Before negotiating, know:
- Your average engagement rate
- Your audience demographics
- Your content creation costs
- Industry rates for your niche and size

### What to Negotiate:
- **Compensation:** Payment, products, or both
- **Content Rights:** Who owns the content
- **Timeline:** Deadlines and posting schedule
- **Creative Freedom:** How much input the brand has
- **Usage Rights:** How long brands can use your content

**Red Flags to Watch For:**
- "Exposure" as the only payment
- Requests for free content "to see if you're a good fit"
- Unreasonable usage rights
- Pressure to accept immediately

## Step 8: Deliver Exceptional Work

Your first collaboration sets the tone for future partnerships.

### Best Practices:
- **Exceed Expectations:** Go above and beyond
- **Communicate Clearly:** Keep brands updated
- **Meet Deadlines:** Be reliable and professional
- **Engage Authentically:** Don't oversell the product
- **Share Results:** Provide analytics and feedback

### After the Collaboration:
- Send a thank-you note
- Share results and analytics
- Ask for a testimonial
- Request to work together again
- Add the collaboration to your portfolio

## Step 9: Build Long-Term Relationships

One-time collaborations are great, but long-term partnerships are better.

### How to Build Relationships:
- Stay in touch with brand contacts
- Share their content organically
- Provide value beyond sponsored posts
- Be reliable and easy to work with
- Refer other creators when appropriate

## Step 10: Scale Your Brand Partnerships

Once you've landed your first collaboration:

1. **Document Everything:** Keep records of what worked
2. **Build Your Portfolio:** Showcase all collaborations
3. **Ask for Referrals:** Happy brands often refer you to others
4. **Increase Your Rates:** As you grow, adjust your pricing
5. **Diversify:** Work with multiple brands in your niche

## Common Mistakes to Avoid

1. **Being Too Generic:** Personalize every pitch
2. **Ignoring Small Brands:** Start where you can get yeses
3. **Undervaluing Yourself:** Know your worth
4. **Poor Communication:** Respond promptly and professionally
5. **Giving Up Too Soon:** Persistence pays off

## Conclusion

Landing your first brand collaboration is a milestone, but it's just the beginning. By following these steps, building your foundation, and staying persistent, you'll not only land your first partnership but set yourself up for long-term success.

Remember: Every big creator started with their first collaboration. Your time is now.

Ready to create the professional media kit that will help you land your first brand partnership? [Get started with CreatorKit for free](/login) and have your media kit ready in 60 seconds.`,
  },
];

// Helper function to get a post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Helper function to get featured posts
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

// Helper function to get related posts (excluding current post)
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  // Find posts with similar tags or category
  const related = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => {
      // Match by category first
      if (post.category === currentPost.category) return true;
      // Then match by tags
      if (currentPost.tags && post.tags) {
        return post.tags.some((tag) => currentPost.tags?.includes(tag));
      }
      return false;
    })
    .slice(0, limit);

  // If not enough related posts, fill with any other posts
  if (related.length < limit) {
    const additional = blogPosts
      .filter((post) => post.slug !== currentSlug && !related.includes(post))
      .slice(0, limit - related.length);
    return [...related, ...additional];
  }

  return related;
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
