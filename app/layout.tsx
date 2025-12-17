import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CreatorKit - Professional Media Kits for UGC Creators",
  description: "Build a professional, mobile-first digital portfolio URL with your stats, video examples, and rates. Stop sending ugly PDFs to brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Script
          defer
          data-website-id="dfid_BYwSzwlP6rWkUj3ff6yM2"
          data-domain="www.creatorskit.app"
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
