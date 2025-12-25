"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Film } from "lucide-react";
import { UseFieldArrayReturn, UseFormRegister, FieldValues, Path, ArrayPath } from "react-hook-form";

interface VideosModuleProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fields: UseFieldArrayReturn<T, ArrayPath<T> & "video_urls">;
}

export function VideosModule<T extends FieldValues>({
  register,
  fields,
}: VideosModuleProps<T>) {
  return (
    <Card className="border-zinc-100 bg-white p-6 rounded-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 mb-0.5">Video Portfolio</h3>
          <p className="text-xs text-zinc-500">Showcase your best content</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fields.append({ url: "", views: "" } as Parameters<typeof fields.append>[0])}
          className="h-7 text-xs border-zinc-200"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>
      <div className="space-y-3">
        {fields.fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-zinc-200 rounded-lg bg-zinc-50/50">
            <Film className="h-8 w-8 text-zinc-300 mb-2" />
            <p className="text-xs text-zinc-500">No videos yet</p>
          </div>
        ) : (
          fields.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 p-3 border border-zinc-100 rounded-lg bg-zinc-50/50">
              <div className="flex-1 space-y-2">
                <div className="space-y-1">
                  <Label className="text-[10px] font-medium text-zinc-600">
                    Video URL
                  </Label>
                  <Input
                    {...register(`video_urls.${index}.url` as Path<T>)}
                    placeholder="https://youtube.com/..."
                      className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-medium text-zinc-600">
                    Views (optional)
                  </Label>
                  <Input
                    {...register(`video_urls.${index}.views` as Path<T>)}
                    placeholder="1.2M"
                      className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => fields.remove(index)}
                className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-900"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

