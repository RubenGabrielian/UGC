"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, Check, Lock } from "lucide-react";
import { UpgradeButton } from "./UpgradeButton";

interface TemplateSelectorProps {
  userId: string;
  currentTemplate: string;
  isPro?: boolean;
}

const templates = [
  {
    id: "default",
    name: "Default",
    description: "Clean, modern landing page with light theme",
    preview: "/img/template-default.png",
    isPro: false, // Default template is free
  },
  {
    id: "midnight",
    name: "Midnight Bento",
    description: "Dark mode with glassmorphism and bento grid layout",
    preview: "/img/template-midnight.png",
    isPro: true,
  },
  {
    id: "neon",
    name: "Neon Gradient",
    description: "Vibrant gradients with bold typography and smooth animations",
    preview: "/img/template-gradient.png",
    isPro: true,
  },
];

export function TemplateSelector({ userId, currentTemplate, isPro = false }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(currentTemplate);
  const [isSaving, setIsSaving] = useState(false);

  const handleTemplateClick = (templateId: string, templateIsPro: boolean) => {
    if (!isPro && templateIsPro) {
      toast.info("Upgrade to Pro to use premium templates", {
        description: "This template is available for Pro users only.",
      });
      return;
    }
    setSelectedTemplate(templateId);
  };

  const handleSave = async () => {
    if (selectedTemplate === currentTemplate) {
      toast.info("Template is already selected");
      return;
    }

    const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);
    if (!isPro && selectedTemplateData?.isPro) {
      toast.error("This template requires a Pro subscription");
      return;
    }

    setIsSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({ template_id: selectedTemplate })
        .eq("id", userId);

      if (error) {
        toast.error("Failed to update template", { description: error.message });
        setIsSaving(false);
        return;
      }

      toast.success("Template updated successfully");
      // Reload the page to see the new template
      window.location.reload();
    } catch (error) {
      console.error("Error updating template:", error);
      toast.error("Something went wrong");
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600">
        Choose a template for your public profile page. Changes will be visible immediately.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const isDisabled = !isPro && template.isPro;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => handleTemplateClick(template.id, template.isPro)}
              disabled={isDisabled}
              className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                isDisabled
                  ? "cursor-not-allowed opacity-60"
                  : "hover:shadow-md"
              } ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 z-10 rounded-full bg-indigo-600 p-1">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
              {isDisabled && (
                <div className="absolute top-2 left-2 z-10 rounded-full bg-indigo-600 px-2 py-0.5 flex items-center gap-1">
                  <Lock className="h-2.5 w-2.5 text-white" />
                  <span className="text-[10px] font-semibold text-white">Pro</span>
                </div>
              )}
              <div className={`mb-3 aspect-video rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 overflow-hidden relative ${
                isDisabled ? "opacity-50" : ""
              }`}>
                {template.preview ? (
                  <Image
                    src={template.preview}
                    alt={`${template.name} template preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-xs font-medium text-zinc-500">{template.name}</span>
                  </div>
                )}
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-1">{template.name}</h3>
              <p className="text-xs text-zinc-600">{template.description}</p>
            </button>
          );
        })}
      </div>

      {!isPro && (
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 mt-4">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-indigo-900 mb-1">
                Upgrade to Pro to unlock premium templates
              </p>
              <p className="text-xs text-indigo-700 mb-3">
                Get access to Midnight Bento, Neon Gradient, and more professional designs.
              </p>
              <UpgradeButton
                isPro={false}
                variantId={process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ID || undefined}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-zinc-100">
        <Button
          onClick={handleSave}
          disabled={isSaving || selectedTemplate === currentTemplate}
          className="h-9 bg-black text-sm text-white hover:bg-zinc-900 focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Template"
          )}
        </Button>
      </div>
    </div>
  );
}

