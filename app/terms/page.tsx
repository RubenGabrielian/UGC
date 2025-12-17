import type { Metadata } from "next";

const sections = [
  {
    title: "Acceptance of terms",
    items: [
      "By creating an account or using CreatorKit, you agree to these Terms & Conditions.",
      "If you do not agree, do not access or use the service.",
    ],
  },
  {
    title: "Accounts and security",
    items: [
      "You are responsible for maintaining the confidentiality of your login credentials.",
      "You are responsible for all activity that occurs under your account.",
      "Notify us promptly if you believe your account has been compromised.",
    ],
  },
  {
    title: "Your content",
    items: [
      "You own the content you upload or publish through CreatorKit.",
      "You grant us a limited license to host, display, and distribute your content as needed to operate the service.",
      "Do not upload content you do not have permission to share.",
    ],
  },
  {
    title: "Acceptable use",
    items: [
      "Do not use CreatorKit for unlawful, fraudulent, or harmful activities.",
      "Do not attempt to disrupt, overload, or reverse engineer the service.",
      "Do not upload malicious code or content that infringes intellectual property, privacy, or other rights.",
    ],
  },
  {
    title: "Service changes and availability",
    items: [
      "We may update, suspend, or discontinue features or the service at any time.",
      "We strive for reliable uptime but do not guarantee uninterrupted availability.",
    ],
  },
  {
    title: "Disclaimers and liability",
    items: [
      "The service is provided on an “as is” and “as available” basis without warranties of any kind.",
      "To the fullest extent permitted by law, our liability is limited to the amount you paid for the service (if any) in the 12 months before the claim, or $0 if you have not paid.",
    ],
  },
  {
    title: "Termination",
    items: [
      "You may stop using the service at any time.",
      "We may suspend or terminate access if you violate these terms or misuse the service.",
      "Upon termination, your right to access the service ends, but certain provisions may continue to apply.",
    ],
  },
  {
    title: "Changes to these terms",
    items: [
      "We may update these terms to reflect product, legal, or operational changes.",
      "If changes are significant, we will provide reasonable notice through the product or other channels.",
      "Continued use after changes take effect constitutes acceptance of the updated terms.",
    ],
  },
  {
    title: "Contact",
    items: [
      "For questions about these terms, please reach out through our support channel and include the email tied to your account.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Terms & Conditions | CreatorKit",
  description: "Understand the terms that govern your use of CreatorKit.",
  keywords: [
    "creatorkit terms",
    "creator terms of service",
    "ugc platform policies",
    "media kit terms",
    "user agreement",
  ],
};

export default function TermsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="max-w-3xl space-y-3">
          <p className="text-sm font-medium text-primary">Terms &amp; Conditions</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Using CreatorKit responsibly</h1>
          <p className="text-muted-foreground">
            These terms describe your rights, responsibilities, and the ground rules for using CreatorKit.
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
