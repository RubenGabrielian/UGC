"use client";

import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { countries } from "@/lib/countries";

const CATEGORIES = [
  "Lifestyle",
  "Fashion",
  "Beauty",
  "Fitness",
  "Food",
  "Travel",
  "Tech",
  "Gaming",
  "Music",
  "Entertainment",
  "Education",
  "Business",
  "Finance",
  "Health",
  "Parenting",
  "Pet",
  "DIY",
  "Art",
  "Photography",
  "Sports",
];

interface CategoriesModuleProps<T extends FieldValues> {
  control: Control<T>;
  categories?: string[];
  country?: string;
}

export function CategoriesModule<T extends FieldValues>({
  control,
  categories = [],
  country,
}: CategoriesModuleProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-zinc-900 mb-0.5">Content Niche</h3>
        <p className="text-xs text-zinc-500">Categories and location</p>
      </div>
      <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-zinc-900 mb-1">Categories</h3>
        <p className="text-xs text-zinc-500">Select your content categories</p>
      </div>
      <Controller
        control={control}
        name={"categories" as Path<T>}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between h-9 text-sm border-zinc-200 focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <div className="flex items-center gap-2">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="text-zinc-600">
                    {field.value?.length > 0
                      ? `${field.value.length} selected`
                      : "Select categories"}
                  </span>
                </div>
                <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search categories..." className="h-8" />
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup className="max-h-[200px] overflow-y-auto">
                  {CATEGORIES.map((cat) => {
                    const isSelected = field.value?.includes(cat);
                    return (
                      <CommandItem
                        key={cat}
                        onSelect={() => {
                          const current = field.value || [];
                          const updated = isSelected
                            ? current.filter((c: string) => c !== cat)
                            : [...current, cat];
                          field.onChange(updated);
                        }}
                        className="text-xs"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-3.5 w-3.5",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {cat}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="text-[10px] px-2 py-0.5 bg-zinc-100 text-zinc-700"
            >
              {cat}
            </Badge>
          ))}
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-zinc-200">
        <Label className="text-xs font-medium text-zinc-700 mb-2 block">Country</Label>
        <Controller
          control={control}
          name={"country" as Path<T>}
          render={({ field }) => {
            const [countryOpen, setCountryOpen] = useState(false);
            const selectedCountry = countries.find(
              (c) => c.code === field.value || c.name === field.value
            );
            return (
              <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between h-9 text-sm border-zinc-200 focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {selectedCountry ? (
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{selectedCountry.emoji}</span>
                        <span>{selectedCountry.name}</span>
                      </span>
                    ) : (
                      "Select country"
                    )}
                    <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search countries..." className="h-8" />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup className="max-h-[200px] overflow-y-auto">
                      {countries.map((c) => (
                        <CommandItem
                          key={c.code}
                          value={c.name}
                          onSelect={() => {
                            field.onChange(c.code);
                            setCountryOpen(false);
                          }}
                          className="text-xs"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-3.5 w-3.5",
                              field.value === c.code ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span className="mr-2">{c.emoji}</span>
                          {c.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            );
          }}
        />
      </div>
      </div>
    </>
  );
}

