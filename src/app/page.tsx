import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/sections/hero";
import { CollectionsShowcase } from "@/components/sections/collections-showcase";
import { Reel } from "@/components/sections/reel";
import { Anatomy } from "@/components/sections/anatomy";
import { StorySnippet } from "@/components/sections/story-snippet";
import { Signature } from "@/components/sections/signature";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ClosingCta } from "@/components/sections/closing-cta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <CollectionsShowcase />
      <Reel />
      <Anatomy />
      <StorySnippet />
      <Signature />
      <Testimonials />
      <TrustStrip />
      <ClosingCta sub="Free shipping over $75, and a lifetime guarantee on every build you hang." />
    </SiteShell>
  );
}
