import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/sections/hero";
import { CollectionsShowcase } from "@/components/sections/collections-showcase";
import { Stats } from "@/components/sections/stats";
import { FeaturedFrames } from "@/components/sections/featured-frames";
import { Testimonials } from "@/components/sections/testimonials";
import { CustomerGallery } from "@/components/sections/customer-gallery";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ClosingCta } from "@/components/sections/closing-cta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <CollectionsShowcase />
      <Stats />
      <FeaturedFrames />
      <CustomerGallery />
      <Testimonials />
      <TrustStrip />
      <ClosingCta sub="Free shipping over $75, and a lifetime guarantee on every piece you hang." />
    </SiteShell>
  );
}
