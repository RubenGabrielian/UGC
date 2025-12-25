"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Calendar } from "lucide-react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface ContactModuleProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  primary_email?: string | null;
  primary_phone?: string | null;
  booking_link?: string | null;
}

export function ContactModule<T extends FieldValues>({
  register,
  primary_email,
  primary_phone,
  booking_link,
}: ContactModuleProps<T>) {
  return (
    <Card className="border-zinc-100 bg-white p-6 rounded-xl">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-0.5">Contact Information</h3>
        <p className="text-xs text-zinc-500">How brands can reach you</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="primary_email" className="text-xs font-medium text-zinc-700 flex items-center gap-2">
            <Mail className="h-3.5 w-3.5" />
            Email
          </Label>
          <Input
            id="primary_email"
            type="email"
            placeholder="your@email.com"
            {...register("primary_email" as Path<T>)}
            defaultValue={primary_email || ""}
            className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="primary_phone" className="text-xs font-medium text-zinc-700 flex items-center gap-2">
            <Phone className="h-3.5 w-3.5" />
            Phone / WhatsApp
          </Label>
          <Input
            id="primary_phone"
            type="tel"
            placeholder="+1 234 567 8900"
            {...register("primary_phone" as Path<T>)}
            defaultValue={primary_phone || ""}
            className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="booking_link" className="text-xs font-medium text-zinc-700 flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            Booking Link
          </Label>
          <Input
            id="booking_link"
            type="url"
            placeholder="https://calendly.com/..."
            {...register("booking_link" as Path<T>)}
            defaultValue={booking_link || ""}
            className="h-9 text-sm font-mono focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>
    </Card>
  );
}

