import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";

const fraunces = localFont({
  variable: "--font-fraunces",
  display: "swap",
  src: [
    { path: "../fonts/fraunces-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/fraunces-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/fraunces-600.woff2", weight: "600", style: "normal" },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-600.woff2", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["picture frames", "photo frames", "wood frames", "gallery wall", "ready-to-hang frames"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: site.locale,
    images: [{ url: "/images/og/default.jpg", width: 1200, height: 630, alt: "Marren frames" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: ["/images/og/default.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#content"
          className="sr-only z-[100] rounded-md bg-oat-900 px-4 py-2 text-sm font-medium text-oat-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <CartProvider>{children}</CartProvider>
        <Toaster position="bottom-right" toastOptions={{ className: "font-sans" }} />
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
