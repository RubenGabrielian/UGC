import { DefaultTemplate } from "./DefaultTemplate";
import { MinimalTemplate } from "./MinimalTemplate";
import type { PublicProfileValues } from "../PublicProfileView";
import type { ServicePackage } from "@/components/ContactModal";

export type TemplateComponent = React.ComponentType<{
  values: PublicProfileValues;
  creatorId: string;
  servicesPackages: ServicePackage[];
}>;

export const templates: Record<string, TemplateComponent> = {
  default: DefaultTemplate,
  minimal: MinimalTemplate,
};

export type TemplateId = keyof typeof templates;

export function getTemplate(templateId: string | null | undefined): TemplateComponent {
  const id = (templateId || "default") as TemplateId;
  return templates[id] || templates.default;
}
