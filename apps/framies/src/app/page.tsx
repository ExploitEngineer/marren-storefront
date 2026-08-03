import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/sections/hero";
import { FeaturedFrames } from "@/components/sections/featured-frames";
import { CollectionsShowcase } from "@/components/sections/collections-showcase";
import { Stats } from "@/components/sections/stats";
import { Reel } from "@/components/sections/reel";
import { Anatomy } from "@/components/sections/anatomy";
import { StorySnippet } from "@/components/sections/story-snippet";
import { Signature } from "@/components/sections/signature";
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
      <FeaturedFrames />
      <CollectionsShowcase />
      <Stats />
      <Reel />
      <Anatomy />
      <StorySnippet />
      <Signature />
      <Testimonials />
      <CustomerGallery />
      <TrustStrip />
      <ClosingCta sub="Free shipping over $75, and a lifetime guarantee on every build you hang." />
    </SiteShell>
  );
}
