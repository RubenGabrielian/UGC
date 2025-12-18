import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { PublicProfileView, PublicProfileValues } from "@/components/PublicProfileView";

export default async function ProfilePage({ params }: { params: { username: string } }) {
    const { username } = await params; // ✅ unwrap params


  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`
      id,
      avatar_url,
      username,
      full_name,
      country,
      bio,
      primary_email,
      primary_phone,
      booking_link,
      instagram_handle,
      instagram_followers,
      tiktok_handle,
      tiktok_followers,
      youtube_handle,
      youtube_subscribers,
      facebook_handle,
      facebook_followers,
      followers_count,
      engagement_rate,
      collaboration_headline,
      brand_logos,
      video_urls,
      services_packages,
      categories,
      audience_demographics,
      template_id
    `)
    .eq("username", username.toLowerCase())
    .maybeSingle();

  if (error || !profile) {
    notFound();
  }

  // Record page view (production only)
  const { error: pageViewError } = await supabase.rpc('increment_page_view', { 
    p_id: profile.id 
  });

  console.log('pageViewError', pageViewError);
  const values: PublicProfileValues = {
    avatar_url: profile.avatar_url,
    username: profile.username,
    full_name: profile.full_name,
    country: profile.country,
    bio: profile.bio,
    primary_email: profile.primary_email,
    primary_phone: profile.primary_phone,
    booking_link: profile.booking_link,
    instagram_handle: profile.instagram_handle,
    instagram_followers: profile.instagram_followers,
    tiktok_handle: profile.tiktok_handle,
    tiktok_followers: profile.tiktok_followers,
    youtube_handle: profile.youtube_handle,
    youtube_subscribers: profile.youtube_subscribers,
      facebook_handle: profile.facebook_handle,
      facebook_followers: profile.facebook_followers,
    followers_count: profile.followers_count,
    engagement_rate: profile.engagement_rate,
    collaboration_headline: profile.collaboration_headline,
    brand_logos: profile.brand_logos ?? [],
    video_urls: profile.video_urls ?? [],
    services_packages: profile.services_packages ?? [],
    categories: profile.categories ?? [],
    audience_demographics: profile.audience_demographics ?? null,
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-5 px-4 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-10xl flex-col items-center gap-8">
        <div className="w-full max-w-10xl">
          {/* <Card className="mb-4 border-none bg-transparent shadow-none">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
                creatorkit
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {profile.full_name || profile.username}
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Live media kit powered by CreatorKit.
              </p>
            </div>
          </Card> */}

          <div className="flex justify-center">
            <PublicProfileView
              values={values}
              mode="desktop"
              username={profile.username || undefined}
              creatorId={profile.id}
              servicesPackages={profile.services_packages ?? []}
              templateId={profile.template_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
