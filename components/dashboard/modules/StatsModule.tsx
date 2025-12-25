"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instagram, Music, Youtube, Facebook } from "lucide-react";
import Image from "next/image";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface StatsModuleProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  instagram_handle?: string | null;
  instagram_followers?: number | null;
  tiktok_handle?: string | null;
  tiktok_followers?: number | null;
  youtube_handle?: string | null;
  youtube_subscribers?: number | null;
  facebook_handle?: string | null;
  facebook_followers?: number | null;
}

export function StatsModule<T extends FieldValues>({
  register,
  instagram_handle,
  instagram_followers,
  tiktok_handle,
  tiktok_followers,
  youtube_handle,
  youtube_subscribers,
  facebook_handle,
  facebook_followers,
}: StatsModuleProps<T>) {
  const formatCount = (value?: number | null) => {
    if (value == null || Number.isNaN(value)) return "";
    return value.toLocaleString();
  };

  return (
    <Card className="border-zinc-100 bg-white p-6 rounded-xl">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-0.5">Social Stats</h3>
        <p className="text-xs text-zinc-500">Manage your social media follower counts</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Instagram */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/img/instagram.webp" alt="Instagram" width={16} height={16} />
            <Label htmlFor="instagram_handle" className="text-xs font-medium text-zinc-700">
              Instagram Handle
            </Label>
          </div>
                  <Input
                    id="instagram_handle"
                    placeholder="@username"
                    {...register("instagram_handle" as Path<T>)}
                    defaultValue={instagram_handle || ""}
                    className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <Input
                    id="instagram_followers"
                    type="number"
                    placeholder="0"
                    {...register("instagram_followers" as Path<T>, { valueAsNumber: true })}
                    defaultValue={instagram_followers || ""}
                    className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
                  />
          <p className="text-[10px] text-zinc-400 font-mono">
            {formatCount(instagram_followers)} followers
          </p>
        </div>

        {/* TikTok */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/img/tiktok.webp" alt="TikTok" width={16} height={16} />
            <Label htmlFor="tiktok_handle" className="text-xs font-medium text-zinc-700">
              TikTok Handle
            </Label>
          </div>
          <Input
            id="tiktok_handle"
            placeholder="@username"
            {...register("tiktok_handle" as Path<T>)}
            defaultValue={tiktok_handle || ""}
                    className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <Input
            id="tiktok_followers"
            type="number"
            placeholder="0"
            {...register("tiktok_followers" as Path<T>, { valueAsNumber: true })}
            defaultValue={tiktok_followers || ""}
                    className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <p className="text-[10px] text-zinc-400 font-mono">
            {formatCount(tiktok_followers)} followers
          </p>
        </div>

        {/* YouTube */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/img/youtube.webp" alt="YouTube" width={16} height={16} />
            <Label htmlFor="youtube_handle" className="text-xs font-medium text-zinc-700">
              YouTube Handle
            </Label>
          </div>
          <Input
            id="youtube_handle"
            placeholder="@username"
            {...register("youtube_handle" as Path<T>)}
            defaultValue={youtube_handle || ""}
                    className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <Input
            id="youtube_subscribers"
            type="number"
            placeholder="0"
            {...register("youtube_subscribers" as Path<T>, { valueAsNumber: true })}
            defaultValue={youtube_subscribers || ""}
                    className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <p className="text-[10px] text-zinc-400 font-mono">
            {formatCount(youtube_subscribers)} subscribers
          </p>
        </div>

        {/* Facebook */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-blue-600">f</span>
            <Label htmlFor="facebook_handle" className="text-xs font-medium text-zinc-700">
              Facebook Handle
            </Label>
          </div>
          <Input
            id="facebook_handle"
            placeholder="@username"
            {...register("facebook_handle" as Path<T>)}
            defaultValue={facebook_handle || ""}
                    className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <Input
            id="facebook_followers"
            type="number"
            placeholder="0"
            {...register("facebook_followers" as Path<T>, { valueAsNumber: true })}
            defaultValue={facebook_followers || ""}
                    className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <p className="text-[10px] text-zinc-400 font-mono">
            {formatCount(facebook_followers)} followers
          </p>
        </div>
      </div>
    </Card>
  );
}

