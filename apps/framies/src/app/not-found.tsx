import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteShell showAnnouncement={false}>
      <Section tone="base">
        <Container className="flex flex-col items-center py-16 text-center">
          <span aria-hidden className="mb-6 grid size-16 place-items-center rounded-[6px] border-4 border-carbon-700 bg-carbon-850" />
          <p className="text-eyebrow text-race-500">Page not found</p>
          <h1 className="mt-4 max-w-xl font-heading text-[clamp(2rem,1.6rem+2vw,3rem)] leading-[1.05] font-medium tracking-[-0.015em] text-carbon-50">
            This wall is empty.
          </h1>
          <p className="mt-4 max-w-md text-carbon-300">
            The page you are after may have moved. Let us point you back to the frames.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/shop">Shop frames</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
