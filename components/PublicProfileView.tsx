"use client";

import type { ServicePackage } from "@/components/ContactModal";
import { DefaultTemplate } from "./templates/DefaultTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";

export type PublicProfileValues = {
  avatar_url?: string | null;
  username?: string | null;
  full_name?: string | null;
  country?: string | null;
  categories?: string[] | null;
  bio?: string | null;
  primary_email?: string | null;
  primary_phone?: string | null;
  booking_link?: string | null;
  instagram_handle?: string | null;
  instagram_followers?: number | null;
  tiktok_handle?: string | null;
  tiktok_followers?: number | null;
  youtube_handle?: string | null;
  youtube_subscribers?: number | null;
  facebook_handle?: string | null;
  facebook_followers?: number | null;
  followers_count?: number | null;
  engagement_rate?: number | null;
  collaboration_headline?: string | null;
  brand_logos?: { url: string }[] | string[] | null;
  video_urls?: ({ url?: string | null } | string)[] | null;
  services_packages?: {
    title?: string | null;
    platform?: "instagram" | "tiktok" | "youtube" | "other";
    price?: string | null;
    is_contact_only?: boolean;
  }[] | null;
  audience_demographics?: {
    geo?: { location?: string | null; percentage?: string | null }[];
    age?: string | null;
    gender?: string | null;
  } | null;
};

export function PublicProfileView({
  values,
  creatorId,
  servicesPackages,
  templateId,
  mode: _mode,
  username: _username,
}: {
  values: PublicProfileValues;
  creatorId: string;
  servicesPackages: ServicePackage[];
  templateId?: string | null;
  mode?: "mobile" | "desktop";
  username?: string;
}) {
  void _mode;
  void _username;
  
  const template = templateId || "default";
  
  if (template === "minimal") {
    return (
      <MinimalTemplate
        values={values}
        creatorId={creatorId}
        servicesPackages={servicesPackages}
      />
    );
  }
  
  // Default template
  return (
    <DefaultTemplate
      values={values}
      creatorId={creatorId}
      servicesPackages={servicesPackages}
    />
  );
}
