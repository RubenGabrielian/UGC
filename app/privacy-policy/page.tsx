import type { Metadata } from "next";

const sections = [
  {
    title: "Information we collect",
    items: [
      "Account details you provide such as name, email, and authentication info.",
      "Profile content you add to your media kit (bio, links, images, services, pricing).",
      "Usage data that helps us keep the product reliable and secure (device, browser, interactions, and basic analytics).",
    ],
  },
  {
    title: "How we use your information",
    items: [
      "Operate, maintain, and improve CreatorKit and its features.",
      "Provide customer support and respond to inquiries.",
      "Protect the platform from abuse, fraud, and security threats.",
      "Communicate important updates about the product or your account.",
    ],
  },
  {
    title: "Sharing and disclosure",
    items: [
      "We do not sell your personal information.",
      "We may share data with service providers who support hosting, analytics, or communications—only as needed to deliver the product.",
      "We may disclose information if required by law or to protect the rights and safety of our users.",
    ],
  },
  {
    title: "Data retention",
    items: [
      "We retain account and profile data while your account is active.",
      "You can request deletion of your account data, subject to legal or operational requirements.",
    ],
  },
  {
    title: "Your choices",
    items: [
      "You can update or remove profile content from your dashboard at any time.",
      "You can request deletion of your account and associated data.",
      "You can opt out of non-essential communications where offered.",
    ],
  },
  {
    title: "Cookies and tracking",
    items: [
      "We use cookies or similar technologies to keep you signed in, secure your session, and understand product usage.",
      "You can control cookies through your browser settings; disabling them may affect functionality.",
    ],
  },
  {
    title: "Third-party links",
    items: [
      "CreatorKit may include links to third-party sites or services.",
      "We are not responsible for the privacy practices of those third parties; review their policies before sharing information.",
    ],
  },
  {
    title: "Updates to this policy",
    items: [
      "We may update this policy to reflect product, legal, or operational changes.",
      "If changes are significant, we will provide reasonable notice through the product or other channels.",
    ],
  },
  {
    title: "Contact",
    items: [
      "For privacy questions or requests, please reach out through our support channel and include the email tied to your account.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy | CreatorKit",
  description: "Understand how CreatorKit collects, uses, and protects your data.",
  keywords: [
    "creatorkit privacy",
    "data protection",
    "ugc privacy policy",
    "creator data usage",
    "gdpr",
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="max-w-3xl space-y-3">
          <p className="text-sm font-medium text-primary">Privacy Policy</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">How we handle your data</h1>
          <p className="text-muted-foreground">
            Your trust matters. This policy explains what we collect, why we collect it, and the choices you have.
          </p>
          <p className="text-sm text-muted-foreground">Last updated: December 17, 2025</p>
        </header>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <ul className="space-y-2 text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
