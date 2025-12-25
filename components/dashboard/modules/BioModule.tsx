"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface BioModuleProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  full_name?: string | null;
  username?: string | null;
  bio?: string | null;
  collaboration_headline?: string | null;
}

export function BioModule<T extends FieldValues>({
  register,
  full_name,
  username,
  bio,
  collaboration_headline,
}: BioModuleProps<T>) {
  return (
    <Card className="border-zinc-100 bg-white p-6 rounded-xl">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-zinc-900 mb-1">Bio & Identity</h3>
        <p className="text-xs text-zinc-500">Your name, username, and description</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-xs font-medium text-zinc-700">
            Full Name
          </Label>
          <Input
            id="full_name"
            placeholder="John Doe"
            {...register("full_name" as Path<T>)}
            defaultValue={full_name || ""}
            className="h-9 text-sm focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username" className="text-xs font-medium text-zinc-700">
            Username
          </Label>
          <Input
            id="username"
            placeholder="johndoe"
            {...register("username" as Path<T>)}
            defaultValue={username || ""}
            className="h-8 text-sm font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="collaboration_headline" className="text-xs font-medium text-zinc-700">
            Headline
          </Label>
          <Input
            id="collaboration_headline"
            placeholder="Professional Creator & Content Strategist"
            {...register("collaboration_headline" as Path<T>)}
            defaultValue={collaboration_headline || ""}
            className="h-9 text-sm focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio" className="text-xs font-medium text-zinc-700">
            Bio
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell brands about your niche, audience, and results..."
            {...register("bio" as Path<T>)}
            defaultValue={bio || ""}
            className="min-h-[100px] text-sm resize-none focus:ring-2 focus:ring-black focus:border-transparent"
            maxLength={300}
          />
          <p className="text-[10px] text-zinc-400">Max 300 characters</p>
        </div>
      </div>
    </Card>
  );
}

