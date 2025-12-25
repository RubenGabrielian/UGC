"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

interface AvatarModuleProps {
  avatarUrl?: string | null;
  fullName?: string | null;
  userId: string;
  setValue: UseFormSetValue<any>;
  onUpload: (url: string) => Promise<void>;
}

export function AvatarModule({
  avatarUrl,
  fullName,
  userId,
  setValue,
  onUpload,
}: AvatarModuleProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initials = fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please upload an image under 2MB.",
      });
      e.target.value = "";
      return;
    }

    setIsUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `avatars/${userId}/${Date.now()}-${sanitizedName || `avatar.${ext}`}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: false, cacheControl: "3600" });

    if (error) {
      toast.error("Avatar upload failed", { description: error.message });
      setIsUploading(false);
      e.target.value = "";
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    setValue("avatar_url", data.publicUrl, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    toast.success("Avatar uploaded");
    await onUpload(data.publicUrl);
    setIsUploading(false);
    e.target.value = "";
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        handleUpload({ target: input } as any);
      }
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={handleUpload}
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-dashed transition-all ${
          isDragging
            ? "border-zinc-400 bg-zinc-50"
            : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
        }`}
      >
        {avatarUrl ? (
          <Avatar className="h-full w-full border-0">
            <AvatarImage src={avatarUrl} alt={fullName || "User"} />
            <AvatarFallback className="bg-zinc-100 text-zinc-700 text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Upload className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600" />
            <span className="text-[10px] text-zinc-500">Click to upload</span>
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/80">
            <Loader2 className="h-5 w-5 animate-spin text-zinc-600" />
          </div>
        )}
      </div>
    </>
  );
}

