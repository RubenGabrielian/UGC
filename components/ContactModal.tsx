"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const contactFormSchema = z.object({
  brand_name: z.string().min(1, "Բրենդի անունը պարտադիր է"),
  email: z.string().email("Խնդրում ենք մուտքագրել վավեր էլ. հասցե"),
  service_id: z.string().min(1, "Խնդրում ենք ընտրել ծառայություն"),
  message: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export type ServicePackage = {
  title?: string | null
  platform?: "instagram" | "tiktok" | "youtube" | "other"
  price?: string | null
  is_contact_only?: boolean
}

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  creatorId: string
  servicesPackages: ServicePackage[]
}

export function ContactModal({
  open,
  onOpenChange,
  creatorId,
  servicesPackages,
}: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      brand_name: "",
      email: "",
      service_id: "",
      message: "",
    },
  })

  // Generate service options for the select dropdown
  const serviceOptions = React.useMemo(() => {
    return servicesPackages.map((service, index) => {
      const title = service.title || "Անանուն ծառայություն"
      const platform =
        service.platform === "instagram"
          ? "Instagram"
          : service.platform === "tiktok"
          ? "TikTok"
          : service.platform === "youtube"
          ? "YouTube"
          : "Այլ"
      const price = service.price || "Պայմանավորված"
      const displayText = `${title} - ${platform}${price !== "Պայմանավորված" ? ` - ${price}` : ""}`
      return {
        value: index.toString(),
        label: displayText,
        service,
      }
    })
  }, [servicesPackages])

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    try {
      const supabase = createClient()

      // Get the selected service details
      const selectedService = serviceOptions[parseInt(data.service_id)]?.service
      const serviceTitle = selectedService?.title || "Անհայտ ծառայություն"
      const servicePlatform = selectedService?.platform || "other"
      const servicePrice = selectedService?.price || "Պայմանավորված"

      // Insert lead into database
      const { error } = await supabase.from("leads").insert({
        creator_id: creatorId,
        brand_name: data.brand_name,
        email: data.email,
        service: `${serviceTitle} - ${servicePlatform}${servicePrice !== "Պայմանավորված" ? ` - $${servicePrice}` : ""}`,
        message: data.message || null,
      })

      if (error) {
        console.error("Error submitting lead:", error)
        toast.error("Ձեր հարցումը ուղարկել չհաջողվեց: Խնդրում ենք կրկին փորձել:")
        return
      }

      toast.success("Շնորհակալություն! Ստեղծողը կապ կհաստատի ձեզ հետ:")
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting lead:", error)
      toast.error("Տեղի ունեցավ անսպասելի սխալ: Խնդրում ենք կրկին փորձել:")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogClose onClick={() => onOpenChange(false)} />
        <DialogHeader>
          <DialogTitle>Համագործակցության համար կապ</DialogTitle>
          <DialogDescription>
            Լրացրեք ստորև նշված ձևը, և մենք շուտով կապ կհաստատենք ձեզ հետ:
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="brand_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Բրենդի անուն *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Մուտքագրեք ձեր բրենդի անունը"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ձեր էլ. հասցեն *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ձեր.էլ.հասցե@օրինակ.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Պահանջվող ծառայություն *</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <option value="">Ընտրեք ծառայություն...</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Հաղորդագրություն / Մանրամասներ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Պատմեք մեզ ձեր համագործակցության գաղափարի մասին..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Չեղարկել
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Ուղարկվում է..." : "Ուղարկել"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

