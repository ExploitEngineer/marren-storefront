import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Intro } from "@/components/motion/intro";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";

const spaceGrotesk = localFont({
  variable: "--font-space-grotesk",
  display: "swap",
  src: [{ path: "../fonts/space-grotesk.woff2", weight: "300 700", style: "normal" }],
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
  keywords: ["metal wall art", "LED wall art", "wall clocks", "backlit signs", "car metal art", "sports LED art", "custom wall decor"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: site.locale,
    images: [{ url: "/images/product.jpeg", width: 680, height: 540, alt: "Decor.HBX metal and LED wall art" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: ["/images/product.jpeg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* Pre-paint: opt the intro overlay in only on a first visit with motion enabled. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!sessionStorage.getItem('aurora:intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-play')}}catch(e){}",
          }}
        />
        <a
          href="#content"
          className="sr-only z-[100] rounded-md bg-race-500 px-4 py-2 text-sm font-medium text-carbon-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Intro />
        <CartProvider>{children}</CartProvider>
        <WhatsAppButton />
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
