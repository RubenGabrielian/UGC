"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Plus, Trash2, Package } from "lucide-react";
import {
  UseFieldArrayReturn,
  UseFormRegister,
  FieldValues,
  Path,
  Control,
  Controller,
} from "react-hook-form";

interface ServicesModuleProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  control: Control<T>;
  fields: UseFieldArrayReturn<T, "services_packages">;
}

interface ServiceItemProps<T extends FieldValues> {
  index: number;
  register: UseFormRegister<T>;
  control: Control<T>;
  onRemove: () => void;
}

function ServiceItem<T extends FieldValues>({
  index,
  register,
  control,
  onRemove,
}: ServiceItemProps<T>) {
  return (
    <Controller
      control={control}
      name={`services_packages.${index}.is_contact_only` as Path<T>}
      render={({ field: contactField }) => {
        const isContactOnly = contactField.value || false;
        
        return (
            <div className="space-y-3 p-3 border border-zinc-100 rounded-lg bg-zinc-50/50">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-[10px] font-medium text-zinc-600">Title</Label>
                <Input
                  {...register(`services_packages.${index}.title` as Path<T>)}
                  placeholder="Instagram Post"
                        className="h-9 text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] font-medium text-zinc-600">
                  Platform
                </Label>
                <Controller
                  control={control}
                  name={`services_packages.${index}.platform` as Path<T>}
                  render={({ field }) => (
                    <Select
                      value={field.value || "instagram"}
                      onChange={(e) => field.onChange(e.target.value)}
                        className="h-9 text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="youtube">YouTube</option>
                      <option value="other">Other</option>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-medium text-zinc-600">Price</Label>
              <Input
                {...register(`services_packages.${index}.price` as Path<T>)}
                placeholder="$500"
                      className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
                disabled={isContactOnly}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`contact_only_${index}`}
                checked={isContactOnly}
                onChange={(e) => contactField.onChange(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-zinc-300"
              />
              <Label
                htmlFor={`contact_only_${index}`}
                className="text-[10px] font-medium text-zinc-600 cursor-pointer"
              >
                Contact for quote
              </Label>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-7 w-full text-xs text-zinc-400 hover:text-zinc-900"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Remove
            </Button>
          </div>
        );
      }}
    />
  );
}

export function ServicesModule<T extends FieldValues>({
  register,
  control,
  fields,
}: ServicesModuleProps<T>) {
  return (
    <Card className="border-zinc-100 bg-white p-6 rounded-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 mb-0.5">
            Services & Packages
          </h3>
          <p className="text-xs text-zinc-500">Your collaboration offerings</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            fields.append({
              title: "",
              platform: "instagram",
              price: "",
              is_contact_only: false,
            })
          }
          className="h-7 text-xs border-zinc-200"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>
      <div className="space-y-3">
        {fields.fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-zinc-200 rounded-lg bg-zinc-50/50">
            <Package className="h-8 w-8 text-zinc-300 mb-2" />
            <p className="text-xs text-zinc-500">No services yet</p>
          </div>
        ) : (
          fields.fields.map((field, index) => (
            <ServiceItem
              key={field.id}
              index={index}
              register={register}
              control={control}
              onRemove={() => fields.remove(index)}
            />
          ))
        )}
      </div>
    </Card>
  );
}

