import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Instagram, Music, Film } from "lucide-react";

type PreviewValues = {
  avatar_url?: string | null;
  username?: string | null;
  full_name?: string | null;
  bio?: string | null;
  instagram_handle?: string | null;
  instagram_followers?: number | null;
  tiktok_handle?: string | null;
  tiktok_followers?: number | null;
  followers_count?: number | null;
  engagement_rate?: number | null;
};

function formatNumber(value?: number | null) {
  if (value == null || Number.isNaN(value)) return "—";
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

type Mode = "mobile" | "desktop";

export function PhonePreview({
  values,
  mode = "mobile",
  username,
}: {
  values: PreviewValues;
  mode?: Mode;
  username?: string;
}) {
  const name = values.full_name || values.username || "Creator Name";
  const handle = values.instagram_handle || values.tiktok_handle || "@handle";
  const bio =
    values.bio ||
    "Short intro for brand managers. Showcase your niche, audience, and performance.";

  const igFollowers = formatNumber(values.instagram_followers);
  const ttFollowers = formatNumber(values.tiktok_followers);

  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2) || "CR";

  const isMobile = mode === "mobile";
  const browserUrl = `https://creatorkit.com/${username || "yourname"}`;

  return (
    <Card
      className={cn(
        "mx-auto relative overflow-hidden transition-all duration-500 ease-in-out",
        isMobile
          ? "w-[375px] min-h-[812px] rounded-[36px] border-8 border-gray-900 bg-zinc-900 shadow-2xl shadow-black/20"
          : "w-full max-w-[960px] min-h-[640px] rounded-lg border border-white/10 bg-zinc-900 shadow-2xl shadow-black/20"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950" />
      {isMobile ? (
        <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur" />
      ) : (
        <div className="relative z-10 flex items-center gap-2 border-b border-white/10 bg-zinc-900/80 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="mx-auto flex-1 truncate rounded-md border border-white/10 bg-black/30 px-3 py-1 text-xs text-zinc-200">
            {browserUrl}
          </div>
        </div>
      )}
      <div
        className={cn(
          "relative flex flex-col p-4 pb-24 text-zinc-900 overflow-y-auto",
          isMobile ? "min-h-[760px]" : "min-h-[640px]"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-100" />
        <div className="relative grid grid-cols-2 gap-3">
          <div className="col-span-2 rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center gap-3">
              <Avatar
                className={cn(
                  "border border-zinc-200 shadow-sm overflow-hidden",
                  isMobile ? "h-20 w-20" : "h-22 w-22"
                )}
              >
                <AvatarImage alt={name} src={values.avatar_url || undefined} />
                <AvatarFallback className="bg-zinc-100 text-zinc-800 text-lg font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold leading-tight text-zinc-900">{name}</p>
                <p className="text-sm text-zinc-500">{handle}</p>
              </div>
              <p className="text-sm text-zinc-600">{bio}</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="rounded-full bg-pink-100 p-2 text-pink-500">
                <Instagram className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-zinc-900">{igFollowers}</p>
            </div>
            <p className="mt-2 text-sm font-medium text-zinc-900">Instagram</p>
            <p className="text-xs text-zinc-500">{values.instagram_handle || "@instagram"}</p>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="rounded-full bg-cyan-100 p-2 text-cyan-600">
                <Music className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-zinc-900">{ttFollowers}</p>
            </div>
            <p className="mt-2 text-sm font-medium text-zinc-900">TikTok</p>
            <p className="text-xs text-zinc-500">{values.tiktok_handle || "@tiktok"}</p>
          </div>

          <div className="col-span-2 rounded-[2rem] bg-transparent p-1">
            <p className="text-sm font-semibold text-zinc-800 mb-2">Featured Work</p>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="aspect-[4/5] overflow-hidden rounded-xl border border-dashed border-zinc-200 bg-zinc-100 flex items-center justify-center text-zinc-400"
                >
                  <Film className="h-6 w-6" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none sticky bottom-4 left-0 right-0 px-6 mt-4">
          <div className="pointer-events-auto rounded-full bg-zinc-900 text-white px-4 py-3 text-sm font-semibold shadow-lg shadow-black/20 backdrop-blur-md w-full text-center">
            Book this creator
          </div>
        </div>
      </div>
    </Card>
  );
}

