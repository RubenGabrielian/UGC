"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, Toaster } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Instagram, Music, Loader2, Monitor, Smartphone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhonePreview } from "./PhonePreview";

const formSchema = z.object({
  avatar_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  username: z.string().optional().nullable(),
  full_name: z.string().optional().nullable(),
  bio: z.string().max(300, "Bio must be under 300 characters").optional().nullable(),
  // Socials
  instagram_handle: z.string().optional().nullable(),
  instagram_followers: z.number().nonnegative("Followers cannot be negative").optional().nullable(),
  tiktok_handle: z.string().optional().nullable(),
  tiktok_followers: z.number().nonnegative("Followers cannot be negative").optional().nullable(),
  // Legacy stats (optional)
  followers_count: z.number().nonnegative("Followers cannot be negative").optional().nullable(),
  engagement_rate: z.number().nonnegative("Engagement rate cannot be negative").optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  initialData: Partial<FormValues> | null;
  userId: string;
}

export function ProfileForm({ initialData, userId }: ProfileFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      instagram_handle: initialData?.instagram_handle ?? "",
      instagram_followers: toNumberOrUndefined(
        initialData?.instagram_followers ?? initialData?.followers_count
      ),
      tiktok_handle: initialData?.tiktok_handle ?? "",
      tiktok_followers: toNumberOrUndefined(initialData?.tiktok_followers),
      followers_count: toNumberOrUndefined(initialData?.followers_count),
      engagement_rate: toNumberOrUndefined(initialData?.engagement_rate),
    }),
    [
      initialData?.avatar_url,
      initialData?.username,
      initialData?.full_name,
      initialData?.bio,
      initialData?.instagram_handle,
      initialData?.instagram_followers,
      initialData?.followers_count,
      initialData?.tiktok_handle,
      initialData?.tiktok_followers,
      initialData?.engagement_rate,
    ]
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: normalizedInitial,
  });

  const watchedValues = useWatch({ control: form.control });

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
    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        avatar_url: values.avatar_url || null,
        username: values.username,
        full_name: values.full_name,
        bio: values.bio || null,
        instagram_handle: values.instagram_handle || null,
        instagram_followers: values.instagram_followers ?? null,
        tiktok_handle: values.tiktok_handle || null,
        tiktok_followers: values.tiktok_followers ?? null,
        followers_count: values.followers_count ?? null,
        engagement_rate: values.engagement_rate ?? null,
      });

    setIsSaving(false);

    if (error) {
      toast.error("Failed to save changes", {
        description: error.message,
      });
      return;
    }

    toast.success("Profile saved", {
      description: "Your creator profile has been updated.",
    });
  });

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="h-[calc(100vh-64px)] overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm">
        <div className="flex h-full overflow-hidden">
          <form
            onSubmit={onSubmit}
            className="w-[380px] lg:w-[400px] shrink-0 border-r border-border/70 bg-background/95 px-5 py-6 lg:px-6 overflow-y-auto space-y-6"
          >
            <Tabs defaultValue="identity" className="space-y-6">
              <TabsList className="mb-2">
                <TabsTrigger value="identity">Identity</TabsTrigger>
                <TabsTrigger value="socials">Socials</TabsTrigger>
              </TabsList>

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
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="sticky bottom-4 z-20">
              <div className="backdrop-blur-lg bg-background/70 border border-border/80 shadow-lg rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Save your changes</p>
                  <p>Keep your profile up to date.</p>
                </div>
                <Button type="submit" disabled={isSaving} className="min-w-[140px]">
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </form>
          <div className="flex-1 relative bg-zinc-100/80 dark:bg-zinc-900/80 ">
            <div className="absolute top-8 left-0 right-0 flex justify-center z-30">
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
            </div>
            <div className="flex h-full w-full items-start justify-center px-6 pb-10 pt-16 overflow-auto">
              <div className="relative mx-auto flex min-h-[720px] w-full items-start justify-center overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_1px_1px,#d4d4d8_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,#3f3f46_1px,transparent_0)] bg-[length:24px_24px] p-6">
                <PhonePreview values={watchedValues} mode={previewMode} username={watchedValues.username || undefined} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

