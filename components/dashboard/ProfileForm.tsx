"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, Toaster } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Instagram,
  Music,
  Loader2,
  Youtube,
  Trash2,
  Plus,
  Image as ImageIcon,
  User,
  Share2,
  Briefcase,
  Package,
  Facebook,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhonePreview } from "./PhonePreview";

const formSchema = z.object({
  avatar_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  username: z.string().optional().nullable(),
  full_name: z.string().optional().nullable(),
  bio: z.string().max(300, "Bio must be under 300 characters").optional().nullable(),
  collaboration_headline: z.string().optional().nullable(),
  primary_email: z
    .union([z.string().email("Must be a valid email address"), z.literal("")])
    .optional()
    .nullable(),
  primary_phone: z.string().optional().nullable(),
  booking_link: z.string().optional().nullable(),
  // Socials
  instagram_handle: z.string().optional().nullable(),
  instagram_followers: z.number().nonnegative("Followers cannot be negative").optional().nullable(),
  tiktok_handle: z.string().optional().nullable(),
  tiktok_followers: z.number().nonnegative("Followers cannot be negative").optional().nullable(),
  youtube_handle: z.string().optional().nullable(),
  youtube_subscribers: z.number().nonnegative("Subscribers cannot be negative").optional().nullable(),
  facebook_handle: z.string().optional().nullable(),
  facebook_followers: z.number().nonnegative("Followers cannot be negative").optional().nullable(),
  audience_demographics: z
    .object({
      geo: z
        .array(
          z.object({
            location: z.string().optional().nullable(),
            percentage: z.string().optional().nullable(),
          })
        )
        .optional(),
      age: z.string().optional().nullable(),
      gender: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  video_urls: z
    .array(
      z.object({
        url: z.string().url("Must be a valid URL"),
        views: z.string().optional().nullable(),
      })
    )
    .optional(),
  brand_logos: z
    .array(
      z.object({
        url: z.string().url("Must be a valid URL"),
      })
    )
    .optional(),
  services_packages: z
    .array(
      z.object({
        title: z.string().optional().nullable(),
        platform: z.enum(["instagram", "tiktok", "youtube", "other"]),
        price: z.string().optional().nullable(),
        is_contact_only: z.boolean().optional(),
      })
    )
    .optional(),
  // Legacy stats (optional)
  followers_count: z.number().nonnegative("Followers cannot be negative").optional().nullable(),
  engagement_rate: z.number().nonnegative("Engagement rate cannot be negative").optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

type PreviewValues = {
  avatar_url?: string | null;
  username?: string | null;
  full_name?: string | null;
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
  audience_demographics?: {
    geo?: { location?: string | null; percentage?: string | null }[];
    age?: string | null;
    gender?: string | null;
  } | null;
  video_urls?: { url: string; views?: string | null }[];
  brand_logos?: { url: string }[];
  services_packages?: {
    title?: string | null;
    platform?: "instagram" | "tiktok" | "youtube" | "other";
    price?: string | null;
    is_contact_only?: boolean;
  }[];
  followers_count?: number | null;
  engagement_rate?: number | null;
  collaboration_headline?: string | null;
};

type SectionKey = "identity" | "socials" | "collabs" | "services";

interface ProfileFormProps {
  initialData: Partial<FormValues> | null;
  userId: string;
}

export function ProfileForm({ initialData, userId }: ProfileFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [uploadingLogoIndex, setUploadingLogoIndex] = useState<number | null>(null);
  const [previewMode] = useState<"mobile" | "desktop">("mobile");
  const [activeSection, setActiveSection] = useState<SectionKey>("identity");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const [, setIsPersistingAvatar] = useState(false);

  const toNumberOrUndefined = (value: unknown) => {
    if (value === null || value === undefined || value === "") return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  };

  const normalizedInitial: FormValues = useMemo(
    () => ({
      avatar_url: initialData?.avatar_url ?? "",
      username: initialData?.username ?? "",
      full_name: initialData?.full_name ?? "",
      bio: initialData?.bio ?? "",
      collaboration_headline: (initialData as { collaboration_headline?: string | null })?.collaboration_headline ?? "",
      primary_email: (initialData as { primary_email?: string | null })?.primary_email ?? "",
      primary_phone: (initialData as { primary_phone?: string | null })?.primary_phone ?? "",
      booking_link: (initialData as { booking_link?: string | null })?.booking_link ?? "",
      instagram_handle: initialData?.instagram_handle ?? "",
      instagram_followers: toNumberOrUndefined(
        initialData?.instagram_followers ?? initialData?.followers_count
      ),
      tiktok_handle: initialData?.tiktok_handle ?? "",
      tiktok_followers: toNumberOrUndefined(initialData?.tiktok_followers),
      youtube_handle: (initialData as { youtube_handle?: string })?.youtube_handle ?? "",
      youtube_subscribers: toNumberOrUndefined(
        (initialData as { youtube_subscribers?: number })?.youtube_subscribers
      ),
      facebook_handle: (initialData as { facebook_handle?: string })?.facebook_handle ?? "",
      facebook_followers: toNumberOrUndefined(
        (initialData as { facebook_followers?: number })?.facebook_followers
      ),
      audience_demographics: {
        geo:
          ((initialData as {
            audience_demographics?: { geo?: { location?: string; percentage?: string }[] };
          })?.audience_demographics?.geo as { location?: string; percentage?: string }[]) ?? [],
        age:
          (initialData as { audience_demographics?: { age?: string | null } })
            ?.audience_demographics?.age ?? "",
        gender:
          (initialData as { audience_demographics?: { gender?: string | null } })
            ?.audience_demographics?.gender ?? "",
      },
      video_urls:
        (initialData as { video_urls?: { url: string; views?: string | null }[] | string[] })
          ?.video_urls?.map((v) =>
            typeof v === "string" ? { url: v, views: "" } : { url: v.url, views: v.views ?? "" }
          ) ?? [],
      brand_logos:
        (initialData as { brand_logos?: { url: string }[] | string[] })?.brand_logos?.map((v) =>
          typeof v === "string" ? { url: v } : v
        ) ?? [],
      services_packages:
        (initialData as {
          services_packages?: {
            title?: string | null;
            platform?: string | null;
            price?: string | null;
            is_contact_only?: boolean | null;
          }[];
        })?.services_packages?.map((s) => ({
          title: s.title ?? "",
          platform: (s.platform as "instagram" | "tiktok" | "youtube" | "other") || "instagram",
          price: s.price ?? "",
          is_contact_only: Boolean(s.is_contact_only),
        })) ?? [],
      followers_count: toNumberOrUndefined(initialData?.followers_count),
      engagement_rate: toNumberOrUndefined(initialData?.engagement_rate),
    }),
    [initialData]
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: normalizedInitial,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "video_urls",
  });
  const {
    fields: brandFields,
    append: appendBrand,
    remove: removeBrand,
  } = useFieldArray({
    control: form.control,
    name: "brand_logos",
  });

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control: form.control,
    name: "services_packages",
  });

  const {
    fields: geoFields,
    append: appendGeo,
    remove: removeGeo,
  } = useFieldArray({
    control: form.control,
    name: "audience_demographics.geo",
  });

  const watchedValues = useWatch({ control: form.control });
  const previewValues = useMemo<PreviewValues>(() => {
    const normalizedVideos =
      watchedValues.video_urls?.map((v) => ({
        url: typeof v === "string" ? v : v?.url ?? "",
        views: typeof v === "string" ? "" : (v as { views?: string | null })?.views ?? "",
      })) ?? [];
    const normalizedBrands =
      watchedValues.brand_logos?.map((v) => ({
        url: typeof v === "string" ? v : v?.url ?? "",
      })) ?? [];
    return {
      ...watchedValues,
      video_urls: normalizedVideos,
      brand_logos: normalizedBrands,
      services_packages: watchedValues.services_packages as PreviewValues["services_packages"],
    };
  }, [watchedValues]);

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...normalizedInitial,
      });
    }
  }, [initialData, normalizedInitial, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSaving(true);
    const supabase = createClient();

    // Check if profile row already exists for this user
    const { data: existing, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (fetchError) {
      setIsSaving(false);
      toast.error("Failed to save changes", {
        description: fetchError.message,
      });
      return;
    }

    const payload = {
      avatar_url: values.avatar_url || null,
      username: values.username,
      full_name: values.full_name,
      bio: values.bio || null,
      collaboration_headline: values.collaboration_headline || null,
      primary_email: values.primary_email || null,
      primary_phone: values.primary_phone || null,
      booking_link: values.booking_link || null,
      instagram_handle: values.instagram_handle || null,
      instagram_followers: values.instagram_followers ?? null,
      tiktok_handle: values.tiktok_handle || null,
      tiktok_followers: values.tiktok_followers ?? null,
      youtube_handle: values.youtube_handle || null,
      youtube_subscribers: values.youtube_subscribers ?? null,
      facebook_handle: values.facebook_handle || null,
      facebook_followers: values.facebook_followers ?? null,
      video_urls: values.video_urls ?? [],
      brand_logos: values.brand_logos ?? [],
      services_packages: values.services_packages ?? [],
      followers_count: values.followers_count ?? null,
      engagement_rate: values.engagement_rate ?? null,
      audience_demographics: values.audience_demographics ?? null,
    };

    let error: { message?: string } | null = null;

    if (existing) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update(payload)
        .eq("id", userId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({ id: userId, ...payload });
      error = insertError;
    }

    setIsSaving(false);

    if (error) {
      toast.error("Failed to save changes", {
        description: (error as { message?: string }).message ?? "Unknown error",
      });
      return;
    }

    toast.success("Profile saved", {
      description: "Your creator profile has been updated.",
    });
  });

  const persistAvatarUrl = async (publicUrl: string) => {
    setIsPersistingAvatar(true);
    const supabase = createClient();

    const { data: existing, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (fetchError) {
      setIsPersistingAvatar(false);
      toast.error("Avatar not saved", { description: fetchError.message });
      return;
    }

    let error: { message?: string } | null = null;

    if (existing) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({ id: userId, avatar_url: publicUrl });
      error = insertError;
    }

    setIsPersistingAvatar(false);

    if (error) {
      toast.error("Avatar not saved", {
        description: (error as { message?: string }).message ?? "Unknown error",
      });
      return;
    }

    toast.success("Avatar updated");
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="h-full min-h-[720px] overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm">
        <div className="flex h-full flex-col overflow-hidden lg:flex-row">
          <form
            onSubmit={onSubmit}
            className="w-full border-b border-border/70 bg-background/95 px-5 py-6 lg:w-[920px] lg:shrink-0 lg:border-b-0 lg:border-r lg:px-6 overflow-y-auto space-y-6"
          >
            
            <Tabs
              value={activeSection}
              onValueChange={(v) => setActiveSection(v as SectionKey)}
              className="space-y-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row">
                <aside className="w-full lg:w-40 lg:shrink-0 lg:border-r lg:border-border/60 lg:pr-2">
                  <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:flex-col lg:space-y-1 lg:gap-0">
                    <Button
                      type="button"
                      variant={activeSection === "identity" ? "secondary" : "ghost"}
                      className="w-full justify-center gap-2 text-sm lg:justify-start"
                      onClick={() => setActiveSection("identity")}
                    >
                      <User className="h-4 w-4" />
                      Identity
                    </Button>
                    <Button
                      type="button"
                      variant={activeSection === "socials" ? "secondary" : "ghost"}
                      className="w-full justify-center gap-2 text-sm lg:justify-start"
                      onClick={() => setActiveSection("socials")}
                    >
                      <Share2 className="h-4 w-4" />
                      Socials
                    </Button>
                    <Button
                      type="button"
                      variant={activeSection === "collabs" ? "secondary" : "ghost"}
                      className="w-full justify-center gap-2 text-sm lg:justify-start"
                      onClick={() => setActiveSection("collabs")}
                    >
                      <Briefcase className="h-4 w-4" />
                      Collabs
                    </Button>
                    <Button
                      type="button"
                      variant={activeSection === "services" ? "secondary" : "ghost"}
                      className="w-full justify-center gap-2 text-sm lg:justify-start"
                      onClick={() => setActiveSection("services")}
                    >
                      <Package className="h-4 w-4" />
                      Services
                    </Button>
                  </nav>
                </aside>

                <div className="flex-1 space-y-6">
              <TabsContent value="identity" className="space-y-6">
                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">Identity</CardTitle>
                        <CardDescription>This info appears at the top of your kit.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-muted/50 p-4">
                      <button
                        type="button"
                        className="relative"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingAvatar || isSaving}
                      >
                        <Avatar className="h-16 w-16 border border-border/60 transition hover:scale-[1.02]">
                          <AvatarImage
                            src={watchedValues.avatar_url || undefined}
                            alt={watchedValues.full_name || "Avatar"}
                          />
                          <AvatarFallback>
                            {(watchedValues.full_name || "CR").slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute inset-0 rounded-full bg-black/30 opacity-0 transition hover:opacity-100 text-[10px] text-white flex items-center justify-center">
                          {isUploadingAvatar ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Change"
                          )}
                        </span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          if (file.size > 2 * 1024 * 1024) {
                            toast.error("File too large", {
                              description: "Please upload an image under 2MB.",
                            });
                            e.target.value = "";
                            return;
                          }

                          setIsUploadingAvatar(true);
                          const supabase = createClient();
                          const ext = file.name.split(".").pop() || "jpg";
                          const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
                          const filePath = `avatars/${userId}/${Date.now()}-${sanitizedName || `avatar.${ext}`}`;

                          const { error } = await supabase.storage
                            .from("avatars")
                            .upload(filePath, file, { upsert: false, cacheControl: "3600" });

                          if (error) {
                            toast.error("Avatar upload failed", { description: error.message });
                            setIsUploadingAvatar(false);
                            e.target.value = "";
                            return;
                          }

                          const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
                          form.setValue("avatar_url", data.publicUrl, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          });
                          toast.success("Avatar uploaded");
                          await persistAvatarUrl(data.publicUrl);
                          setIsUploadingAvatar(false);
                          e.target.value = "";
                        }}
                      />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">Profile Photo</p>
                        <p>PNG or JPG up to 2MB. Click the avatar to upload.</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        placeholder="Alex Creator"
                        {...form.register("full_name")}
                        disabled={isSaving}
                        className="focus-visible:ring-offset-0 transition-colors"
                      />
                      {form.formState.errors.full_name && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.full_name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <Input
                        placeholder="creator123"
                        {...form.register("username")}
                        disabled={isSaving}
                        className="focus-visible:ring-offset-0 transition-colors"
                      />
                      {form.formState.errors.username && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea
                        placeholder="Short intro for brand managers..."
                        {...form.register("bio")}
                        disabled={isSaving}
                        rows={4}
                        className="focus-visible:ring-offset-0 transition-colors"
                      />
                      {form.formState.errors.bio && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.bio.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="socials" className="space-y-6">
                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Social Links</CardTitle>
                    <CardDescription>Connect your platforms to show stats.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="instagram">
                        <AccordionTrigger className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 " />
                          Instagram
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Instagram Handle</label>
                            <Input
                              placeholder="@yourhandle"
                              {...form.register("instagram_handle")}
                              disabled={isSaving}
                              className="focus-visible:ring-offset-0 transition-colors"
                            />
                            {form.formState.errors.instagram_handle && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.instagram_handle.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Followers count</label>
                            <Input
                              type="number"
                              placeholder="120000"
                              {...form.register("instagram_followers", {
                                setValueAs: (v) => (v === "" || v === null ? undefined : Number(v)),
                              })}
                              disabled={isSaving}
                              className="focus-visible:ring-offset-0 transition-colors"
                            />
                            {form.formState.errors.instagram_followers && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.instagram_followers.message}
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="tiktok">
                        <AccordionTrigger className="flex items-center gap-2">
                          <Music className="h-4 w-4 text-cyan-400" />
                          TikTok
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">TikTok Handle</label>
                            <Input
                              placeholder="@yourtiktok"
                              {...form.register("tiktok_handle")}
                              disabled={isSaving}
                              className="focus-visible:ring-offset-0 transition-colors"
                            />
                            {form.formState.errors.tiktok_handle && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.tiktok_handle.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Followers count</label>
                            <Input
                              type="number"
                              placeholder="250000"
                              {...form.register("tiktok_followers", {
                                setValueAs: (v) => (v === "" || v === null ? undefined : Number(v)),
                              })}
                              disabled={isSaving}
                              className="focus-visible:ring-offset-0 transition-colors"
                            />
                            {form.formState.errors.tiktok_followers && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.tiktok_followers.message}
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="youtube">
                        <AccordionTrigger className="flex items-center gap-2">
                          <Youtube className="h-4 w-4 text-red-500" />
                          YouTube
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">YouTube Channel</label>
                            <Input
                              placeholder="youtube.com/@yourchannel"
                              {...form.register("youtube_handle")}
                              disabled={isSaving}
                              className="focus-visible:ring-offset-0 transition-colors"
                            />
                            {form.formState.errors.youtube_handle && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.youtube_handle.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Subscribers</label>
                            <Input
                              type="number"
                              placeholder="150000"
                              {...form.register("youtube_subscribers", {
                                setValueAs: (v) => (v === "" || v === null ? undefined : Number(v)),
                              })}
                              disabled={isSaving}
                              className="focus-visible:ring-offset-0 transition-colors"
                            />
                            {form.formState.errors.youtube_subscribers && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.youtube_subscribers.message}
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="facebook">
                        <AccordionTrigger className="flex items-center gap-2">
                          <Facebook className="h-4 w-4 text-blue-600" />
                          Facebook
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Facebook Page Handle (@...)</label>
                            <Input
                              placeholder="@yourpage"
                              {...form.register("facebook_handle")}
                              disabled={isSaving}
                              className="focus-visible:ring-offset-0 transition-colors"
                            />
                            {form.formState.errors.facebook_handle && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.facebook_handle.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Followers (e.g., 15K)</label>
                            <Input
                              type="number"
                              placeholder="15000"
                              {...form.register("facebook_followers", {
                                setValueAs: (v) =>
                                  v === "" || v === null ? undefined : Number(v),
                              })}
                              disabled={isSaving}
                              className="focus-visible:ring-offset-0 transition-colors"
                            />
                            {form.formState.errors.facebook_followers && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.facebook_followers.message}
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Featured Work</CardTitle>
                    <CardDescription>Add TikTok, Reels, or YouTube links.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <Input
                            placeholder="Paste TikTok, Reel, or YouTube link"
                            {...form.register(`video_urls.${index}.url` as const)}
                            disabled={isSaving}
                            className="flex-1 focus-visible:ring-offset-0 transition-colors"
                          />
                          <Input
                            placeholder="Views (e.g., 50K, 1.2M)"
                            {...form.register(`video_urls.${index}.views` as const)}
                            disabled={isSaving}
                            className="w-28 focus-visible:ring-offset-0 transition-colors"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => remove(index)}
                            disabled={isSaving}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {fields.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          Add your top videos to showcase in the preview.
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ url: "", views: "" })}
                      disabled={isSaving}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Video
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Audience Demographics</CardTitle>
                    <CardDescription>
                      Share who is following you so brands can understand your core audience.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Top Geographies (up to 3)</label>
                      <p className="text-xs text-muted-foreground">
                        Add your top countries or cities and their share of your audience (e.g., Armenia — 60%).
                      </p>
                      <div className="space-y-2">
                        {geoFields.map((field, index) => (
                          <div key={field.id} className="flex gap-2 items-center">
                            <Input
                              placeholder="Country or City"
                              {...form.register(
                                `audience_demographics.geo.${index}.location` as const
                              )}
                              disabled={isSaving}
                              className="flex-1 focus-visible:ring-offset-0 transition-colors"
                            />
                            <select
                              className="w-28 rounded-md border border-input bg-background px-2 py-1 text-sm"
                              {...form.register(
                                `audience_demographics.geo.${index}.percentage` as const
                              )}
                              disabled={isSaving}
                            >
                              <option value="">%</option>
                              <option value="10%">10%</option>
                              <option value="20%">20%</option>
                              <option value="30%">30%</option>
                              <option value="40%">40%</option>
                              <option value="50%">50%</option>
                              <option value="60%">60%</option>
                              <option value="70%">70%</option>
                              <option value="80%">80%</option>
                              <option value="90%">90%</option>
                            </select>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeGeo(index)}
                              disabled={isSaving}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        {geoFields.length === 0 && (
                          <p className="text-xs text-muted-foreground">
                            Add at least one location so brands can see where your audience is based.
                          </p>
                        )}
                        {geoFields.length < 3 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-1 flex items-center gap-2"
                            onClick={() => appendGeo({ location: "", percentage: "" })}
                            disabled={isSaving}
                          >
                            <Plus className="h-4 w-4" />
                            Add Location
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Age Group</label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-2 py-2 text-sm"
                        {...form.register("audience_demographics.age" as const)}
                        disabled={isSaving}
                      >
                        <option value="">Select age range</option>
                        <option value="13–17 years">13–17 years</option>
                        <option value="18–24 years">18–24 years</option>
                        <option value="25–34 years">25–34 years</option>
                        <option value="35–44 years">35–44 years</option>
                        <option value="45+ years">45+ years</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gender Split</label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-2 py-2 text-sm"
                        {...form.register("audience_demographics.gender" as const)}
                        disabled={isSaving}
                      >
                        <option value="">Select gender split</option>
                        <option value="Mostly Female">Mostly Female</option>
                        <option value="Balanced">Balanced</option>
                        <option value="Mostly Male">Mostly Male</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="collabs" className="space-y-6">
                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Past Collaborations</CardTitle>
                    <CardDescription>Show brands you’ve successfully partnered with.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Section headline</label>
                      <Input
                        placeholder="Brands I've Successfully Partnered With"
                        {...form.register("collaboration_headline")}
                        disabled={isSaving}
                        className="focus-visible:ring-offset-0 transition-colors"
                      />
                      <p className="text-xs text-muted-foreground">
                        Customize the headline to reflect your relationship with these brands.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {brandFields.map((field, index) => {
                        const logoUrl = form.getValues(`brand_logos.${index}.url`);
                        const isUploadingThis = uploadingLogoIndex === index;
                        return (
                          <div key={field.id} className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-md border border-border/60 bg-muted/40 flex items-center justify-center overflow-hidden">
                              {logoUrl ? (
                                <img
                                  src={logoUrl}
                                  alt="Logo"
                                  className="h-full w-full object-contain"
                                />
                              ) : (
                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex flex-1 items-center gap-2">
                              {logoUrl ? (
                                <>
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => {
                                      setUploadingLogoIndex(index);
                                      logoInputRef.current?.click();
                                    }}
                                    disabled={isSaving}
                                  >
                                    {isUploadingThis ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      "Replace"
                                    )}
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => {
                                      form.setValue(`brand_logos.${index}.url`, "", {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                      });
                                      removeBrand(index);
                                    }}
                                    disabled={isSaving}
                                  >
                                    Remove
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => {
                                    setUploadingLogoIndex(index);
                                    logoInputRef.current?.click();
                                  }}
                                  disabled={isSaving}
                                >
                                  {isUploadingThis ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Upload Logo"
                                  )}
                                </Button>
                              )}
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeBrand(index)}
                              disabled={isSaving}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                      {brandFields.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          Upload brand logos you’ve collaborated with.
                        </p>
                      )}
                    </div>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file || uploadingLogoIndex === null) return;
                        if (file.size > 2 * 1024 * 1024) {
                          toast.error("File too large", {
                            description: "Please upload an image under 2MB.",
                          });
                          e.target.value = "";
                          return;
                        }
                        setUploadingLogoIndex(uploadingLogoIndex);
                        const supabase = createClient();
                        const ext = file.name.split(".").pop() || "jpg";
                        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
                        // Store without duplicating the bucket name in the path
                        const filePath = `${userId}/${Date.now()}-${sanitizedName || `logo.${ext}`}`;
                        const { error } = await supabase.storage
                          .from("brand_logos")
                          .upload(filePath, file, { upsert: false, cacheControl: "3600" });
                        if (error) {
                          toast.error("Logo upload failed", { description: error.message });
                          setUploadingLogoIndex(null);
                          e.target.value = "";
                          return;
                        }
                        const { data: publicUrlData } = supabase.storage
                          .from("brand_logos")
                          .getPublicUrl(filePath);
                        const finalUrl = publicUrlData.publicUrl;
                        form.setValue(`brand_logos.${uploadingLogoIndex}.url`, finalUrl, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                        toast.success("Logo uploaded");
                        setUploadingLogoIndex(null);
                        e.target.value = "";
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendBrand({ url: "" })}
                      disabled={isSaving}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Brand Logo
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Services & Rate Card</CardTitle>
                    <CardDescription>
                      List the services you offer and how brands can book you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {serviceFields.map((field, index) => (
                        <div
                          key={field.id}
                          className="space-y-3 rounded-lg border border-border/60 bg-muted/40 p-3"
                        >
                          <div className="flex gap-2">
                            <Input
                              placeholder="Service title (e.g., 3 TikTok Videos)"
                              {...form.register(`services_packages.${index}.title` as const)}
                              disabled={isSaving}
                              className="flex-1 focus-visible:ring-offset-0 transition-colors"
                            />
                            <select
                              className="w-32 rounded-md border border-input bg-background px-2 py-1 text-sm"
                              {...form.register(`services_packages.${index}.platform` as const)}
                              disabled={isSaving}
                            >
                              <option value="instagram">Instagram</option>
                              <option value="tiktok">TikTok</option>
                              <option value="youtube">YouTube</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <Input
                              placeholder="Price (e.g., $500 or 150,000 AMD)"
                              {...form.register(`services_packages.${index}.price` as const)}
                              disabled={isSaving}
                              className="flex-1 min-w-[160px] focus-visible:ring-offset-0 transition-colors"
                            />
                            <label className="flex items-center gap-2 text-xs text-muted-foreground">
                              <input
                                type="checkbox"
                                {...form.register(
                                  `services_packages.${index}.is_contact_only` as const
                                )}
                                disabled={isSaving}
                              />
                              Use &quot;Contact for Quote&quot; instead of price
                            </label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="ml-auto text-destructive hover:text-destructive"
                              onClick={() => removeService(index)}
                              disabled={isSaving}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {serviceFields.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          Add services you offer so brands know what to book you for.
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendService({
                          title: "",
                          platform: "instagram",
                          price: "",
                          is_contact_only: false,
                        })
                      }
                      disabled={isSaving}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add New Service
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Booking &amp; Contact Information</CardTitle>
                    <CardDescription>
                      Make it easy for brands to reach you and book you for campaigns.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Email</label>
                      <Input
                        type="email"
                        placeholder="brand-contact@you.com"
                        {...form.register("primary_email")}
                        disabled={isSaving}
                        className="focus-visible:ring-offset-0 transition-colors"
                      />
                      <p className="text-xs text-muted-foreground">
                        This email will be shown to brands and used as a fallback for the main button.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Phone / WhatsApp</label>
                      <Input
                        placeholder="+1 555 000 0000 or WhatsApp number"
                        {...form.register("primary_phone")}
                        disabled={isSaving}
                        className="focus-visible:ring-offset-0 transition-colors"
                      />
                      <p className="text-xs text-muted-foreground">
                        Optional. We&apos;ll turn this into a tap-to-call or WhatsApp link where possible.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Main CTA Link</label>
                      <Input
                        placeholder="https://calendly.com/yourbooking or mailto:you@email"
                        {...form.register("booking_link")}
                        disabled={isSaving}
                        className="focus-visible:ring-offset-0 transition-colors"
                      />
                      <p className="text-xs text-muted-foreground">
                        This powers the main &quot;Book&quot; button on your public profile.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
                </div>
              </div>
            </Tabs>

            <div className="sticky bottom-4 z-20">
              <div className="backdrop-blur-lg bg-background/70 border border-border/80 shadow-lg rounded-xl px-4 py-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Save your changes</p>
                  <p>Keep your profile up to date.</p>
                </div>
                <Button type="submit" disabled={isSaving} className="min-w-[140px] w-full sm:w-auto">
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </form>
          <div className="flex-1 relative border-t border-border/70 dark:bg-zinc-900/80 lg:border-t-0 ">
            {/* <div className="absolute top-8 left-0 right-0 flex justify-center z-30">
              <Tabs
                value={previewMode}
                onValueChange={(v) => setPreviewMode(v as "mobile" | "desktop")}
                className="w-fit rounded-full border border-border/70 bg-white/90 dark:bg-zinc-900/90 shadow-md px-2 py-1"
              >
                <TabsList className="grid grid-cols-2 gap-1 bg-transparent">
                  <TabsTrigger value="mobile" className="gap-2 rounded-full">
                    <Smartphone className="h-4 w-4" />
                    Mobile
                  </TabsTrigger>
                  <TabsTrigger value="desktop" className="gap-2 rounded-full">
                    <Monitor className="h-4 w-4" />
                    Desktop
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div> */}
            <div className="flex h-full w-full items-start justify-center px-4 pb-10 pt-10 overflow-auto sm:px-6 sm:pt-12 lg:pt-16">
              <div className="relative mx-auto flex min-h-[720px] w-full items-start justify-center overflow-hidden rounded-2xl  dark:bg-[radial-gradient(circle_at_1px_1px,#3f3f46_1px,transparent_0)] bg-[length:24px_24px] p-6">
                <PhonePreview
                  values={previewValues}
                  mode={previewMode}
                  username={watchedValues.username || undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

