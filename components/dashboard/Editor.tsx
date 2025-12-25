"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, User, BarChart3, Film, Package, Mail } from "lucide-react";
import { AvatarModule } from "./modules/AvatarModule";
import { BioModule } from "./modules/BioModule";
import { StatsModule } from "./modules/StatsModule";
import { ContactModule } from "./modules/ContactModule";
import { VideosModule } from "./modules/VideosModule";
import { BrandsModule } from "./modules/BrandsModule";
import { ServicesModule } from "./modules/ServicesModule";
import { CategoriesModule } from "./modules/CategoriesModule";
import type { Path } from "react-hook-form";

const formSchema = z.object({
  avatar_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  username: z.string().optional().nullable(),
  country: z.string().optional().or(z.literal("")),
  categories: z.array(z.string()).optional(),
  full_name: z.string().optional().nullable(),
  bio: z.string().max(300, "Bio must be under 300 characters").optional().nullable(),
  collaboration_headline: z.string().optional().nullable(),
  primary_email: z
    .union([z.string().email("Must be a valid email address"), z.literal("")])
    .optional()
    .nullable(),
  primary_phone: z.string().optional().nullable(),
  booking_link: z.string().optional().nullable(),
  instagram_handle: z.string().optional().nullable(),
  instagram_followers: z
    .any()
    .transform((val) => {
      if (val === "" || val === null || val === undefined) return null;
      if (typeof val === "string") {
        const num = parseFloat(val);
        return Number.isNaN(num) ? null : num;
      }
      if (typeof val === "number") {
        return Number.isNaN(val) ? null : val;
      }
      return null;
    })
    .refine((val) => val === null || (typeof val === "number" && val >= 0), {
      message: "Followers cannot be negative",
    })
    .optional(),
  tiktok_handle: z.string().optional().nullable(),
  tiktok_followers: z
    .any()
    .transform((val) => {
      if (val === "" || val === null || val === undefined) return null;
      if (typeof val === "string") {
        const num = parseFloat(val);
        return Number.isNaN(num) ? null : num;
      }
      if (typeof val === "number") {
        return Number.isNaN(val) ? null : val;
      }
      return null;
    })
    .refine((val) => val === null || (typeof val === "number" && val >= 0), {
      message: "Followers cannot be negative",
    })
    .optional(),
  youtube_handle: z.string().optional().nullable(),
  youtube_subscribers: z
    .any()
    .transform((val) => {
      if (val === "" || val === null || val === undefined) return null;
      if (typeof val === "string") {
        const num = parseFloat(val);
        return Number.isNaN(num) ? null : num;
      }
      if (typeof val === "number") {
        return Number.isNaN(val) ? null : val;
      }
      return null;
    })
    .refine((val) => val === null || (typeof val === "number" && val >= 0), {
      message: "Subscribers cannot be negative",
    })
    .optional(),
  facebook_handle: z.string().optional().nullable(),
  facebook_followers: z
    .any()
    .transform((val) => {
      if (val === "" || val === null || val === undefined) return null;
      if (typeof val === "string") {
        const num = parseFloat(val);
        return Number.isNaN(num) ? null : num;
      }
      if (typeof val === "number") {
        return Number.isNaN(val) ? null : val;
      }
      return null;
    })
    .refine((val) => val === null || (typeof val === "number" && val >= 0), {
      message: "Followers cannot be negative",
    })
    .optional(),
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
  followers_count: z
    .any()
    .transform((val) => {
      if (val === "" || val === null || val === undefined) return null;
      if (typeof val === "string") {
        const num = parseFloat(val);
        return Number.isNaN(num) ? null : num;
      }
      if (typeof val === "number") {
        return Number.isNaN(val) ? null : val;
      }
      return null;
    })
    .refine((val) => val === null || (typeof val === "number" && val >= 0), {
      message: "Followers cannot be negative",
    })
    .optional(),
  engagement_rate: z
    .any()
    .transform((val) => {
      if (val === "" || val === null || val === undefined) return null;
      if (typeof val === "string") {
        const num = parseFloat(val);
        return Number.isNaN(num) ? null : num;
      }
      if (typeof val === "number") {
        return Number.isNaN(val) ? null : val;
      }
      return null;
    })
    .refine((val) => val === null || (typeof val === "number" && val >= 0), {
      message: "Engagement rate cannot be negative",
    })
    .optional(),
  template_id: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditorProps {
  initialData: Partial<FormValues> | null;
  userId: string;
}

export function Editor({ initialData, userId }: EditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering tabs after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar_url: initialData?.avatar_url ?? "",
      username: initialData?.username ?? "",
      country: (initialData as { country?: string | null })?.country ?? "",
      categories: (initialData as { categories?: string[] | null })?.categories ?? [],
      full_name: initialData?.full_name ?? "",
      bio: initialData?.bio ?? "",
      collaboration_headline: (initialData as { collaboration_headline?: string | null })?.collaboration_headline ?? "",
      primary_email: (initialData as { primary_email?: string | null })?.primary_email ?? "",
      primary_phone: (initialData as { primary_phone?: string | null })?.primary_phone ?? "",
      booking_link: (initialData as { booking_link?: string | null })?.booking_link ?? "",
      instagram_handle: initialData?.instagram_handle ?? "",
      instagram_followers: initialData?.instagram_followers ?? null,
      tiktok_handle: initialData?.tiktok_handle ?? "",
      tiktok_followers: initialData?.tiktok_followers ?? null,
      youtube_handle: initialData?.youtube_handle ?? "",
      youtube_subscribers: initialData?.youtube_subscribers ?? null,
      facebook_handle: initialData?.facebook_handle ?? "",
      facebook_followers: initialData?.facebook_followers ?? null,
      video_urls: initialData?.video_urls ?? [],
      brand_logos: initialData?.brand_logos ?? [],
      services_packages: initialData?.services_packages ?? [],
      followers_count: initialData?.followers_count ?? null,
      engagement_rate: initialData?.engagement_rate ?? null,
      template_id: initialData?.template_id || "default",
    },
  });

  const videoUrlsFieldArray = useFieldArray({
    control: form.control,
    name: "video_urls",
  });

  const brandLogosFieldArray = useFieldArray({
    control: form.control,
    name: "brand_logos",
  });

  const servicesFieldArray = useFieldArray({
    control: form.control,
    name: "services_packages",
  });

  const persistAvatarUrl = async (publicUrl: string) => {
    const supabase = createClient();
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (existing) {
      await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", userId);
    } else {
      await supabase.from("profiles").insert({ id: userId, avatar_url: publicUrl });
    }
  };

  const onSubmit = form.handleSubmit(
    async (values) => {
      setIsSaving(true);
      const supabase = createClient();

      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      const payload = {
        avatar_url: values.avatar_url || null,
        username: values.username,
        country: values.country || null,
        categories: values.categories ?? [],
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
        template_id: values.template_id || "default",
      };

      if (existing) {
        const { error } = await supabase.from("profiles").update(payload).eq("id", userId);
        if (error) {
          toast.error("Failed to save", { description: error.message });
          setIsSaving(false);
          return;
        }
      } else {
        const { error } = await supabase.from("profiles").insert({ id: userId, ...payload });
        if (error) {
          toast.error("Failed to save", { description: error.message });
          setIsSaving(false);
          return;
        }
      }

      toast.success("Changes saved");
      setIsSaving(false);
    },
    (errors) => {
      console.error("Form validation errors:", errors);
      const firstError = Object.values(errors)[0];
      if (firstError?.message) {
        toast.error("Validation error", { description: firstError.message });
      } else {
        toast.error("Please fix the errors in the form");
      }
    }
  );

  // Prevent hydration mismatch - only render tabs after mount
  if (!isMounted) {
    return (
      <div className="mx-auto max-w-5xl">
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="h-9 w-full rounded-lg border border-zinc-200 bg-zinc-50 p-1" />
          <div className="mt-6 space-y-4">
            <div className="h-64 animate-pulse rounded-xl bg-zinc-100" />
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <form onSubmit={onSubmit} className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="inline-flex h-9 items-center justify-start rounded-lg border border-zinc-200 bg-zinc-50 p-1">
            <TabsTrigger
              value="profile"
              className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm"
            >
              <User className="mr-1.5 h-3.5 w-3.5" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm"
            >
              <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
              Social Stats
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm"
            >
              <Film className="mr-1.5 h-3.5 w-3.5" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm"
            >
              <Package className="mr-1.5 h-3.5 w-3.5" />
              Services
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm"
            >
              <Mail className="mr-1.5 h-3.5 w-3.5" />
              Contact
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Identity Card */}
              <Card className="border-zinc-100 bg-white p-6 rounded-xl">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-zinc-900 mb-0.5">Identity</h3>
                  <p className="text-xs text-zinc-500">Photo, name, and username</p>
                </div>
                <div className="space-y-4">
                  <AvatarModule
                    avatarUrl={form.watch("avatar_url")}
                    fullName={form.watch("full_name")}
                    userId={userId}
                    setValue={form.setValue}
                    onUpload={persistAvatarUrl}
                  />
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="full_name" className="text-xs font-medium text-zinc-700">
                        Full Name
                      </Label>
                      <Input
                        id="full_name"
                        placeholder="John Doe"
                        {...form.register("full_name" as Path<FormValues>)}
                        defaultValue={form.watch("full_name") || ""}
                        className="h-9 text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="username" className="text-xs font-medium text-zinc-700">
                        Username
                      </Label>
                      <Input
                        id="username"
                        placeholder="johndoe"
                        {...form.register("username" as Path<FormValues>)}
                        defaultValue={form.watch("username") || ""}
                        className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* About You Card */}
              <Card className="border-zinc-100 bg-white p-6 rounded-xl">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-zinc-900 mb-0.5">About You</h3>
                  <p className="text-xs text-zinc-500">Headline and bio</p>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="collaboration_headline" className="text-xs font-medium text-zinc-700">
                      Headline
                    </Label>
                    <Input
                      id="collaboration_headline"
                      placeholder="Professional Creator & Content Strategist"
                      {...form.register("collaboration_headline" as Path<FormValues>)}
                      defaultValue={form.watch("collaboration_headline") || ""}
                      className="h-9 text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bio" className="text-xs font-medium text-zinc-700">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell brands about your niche, audience, and results..."
                      {...form.register("bio" as Path<FormValues>)}
                      defaultValue={form.watch("bio") || ""}
                      className="min-h-[120px] text-sm resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      maxLength={300}
                    />
                    <p className="text-[10px] text-zinc-400">Max 300 characters</p>
                  </div>
                </div>
              </Card>

              {/* Content Niche Card */}
              <Card className="border-zinc-100 bg-white p-6 rounded-xl lg:col-span-2">
                <CategoriesModule
                  control={form.control}
                  categories={form.watch("categories") || []}
                  country={form.watch("country")}
                />
              </Card>
            </div>
          </TabsContent>

        {/* Social Stats Tab */}
        <TabsContent value="stats" className="mt-6">
          <StatsModule
            register={form.register}
            instagram_handle={form.watch("instagram_handle")}
            instagram_followers={form.watch("instagram_followers")}
            tiktok_handle={form.watch("tiktok_handle")}
            tiktok_followers={form.watch("tiktok_followers")}
            youtube_handle={form.watch("youtube_handle")}
            youtube_subscribers={form.watch("youtube_subscribers")}
            facebook_handle={form.watch("facebook_handle")}
            facebook_followers={form.watch("facebook_followers")}
          />
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="mt-6 space-y-4">
          <VideosModule register={form.register} fields={videoUrlsFieldArray} />
          <BrandsModule register={form.register} fields={brandLogosFieldArray} />
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="mt-6">
          <ServicesModule
            register={form.register}
            control={form.control}
            fields={servicesFieldArray}
          />
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="mt-6">
          <ContactModule
            register={form.register}
            primary_email={form.watch("primary_email")}
            primary_phone={form.watch("primary_phone")}
            booking_link={form.watch("booking_link")}
          />
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-zinc-100">
        <Button
          type="submit"
          disabled={isSaving}
          className="h-9 bg-black text-sm text-white hover:bg-zinc-900 focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
    </div>
  );
}

