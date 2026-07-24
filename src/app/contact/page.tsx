import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Questions about sizing, an order, or a custom car you want built? Talk to a real person at Framies.",
  path: "/contact",
});

const infoRows = [
  { icon: MapPin, label: "Studio", lines: [site.contact.address, site.contact.city] },
  { icon: Phone, label: "Phone", lines: [site.contact.phone], href: site.contact.phoneHref },
  { icon: Mail, label: "Email", lines: [site.contact.email], href: site.contact.emailHref },
  { icon: Clock, label: "Hours", lines: [site.contact.hours] },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <Section tone="cream" size="sm">
        <Container>
          <h1 className="font-serif text-[clamp(2.25rem,1.7rem+2.4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.015em] text-oat-900">
            Talk to a real person.
          </h1>
          <p className="measure-wide mt-4 text-lg text-oat-700">
            Questions about sizing, an order, or a custom car you want built? We answer fast.
          </p>
        </Container>
      </Section>

      <Section tone="cream" size="sm" className="pt-0">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Info */}
          <div>
            <dl className="space-y-6">
              {infoRows.map((row) => (
                <div key={row.label} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-clay-50 text-clay-600">
                    <row.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <dt className="text-sm text-oat-500">{row.label}</dt>
                    <dd className="mt-0.5 text-oat-900">
                      {row.href ? (
                        <a href={row.href} className="transition-colors hover:text-clay-700">
                          {row.lines.join(", ")}
                        </a>
                      ) : (
                        row.lines.map((l, i) => <span key={i} className="block">{l}</span>)
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <p className="text-sm text-oat-500">Follow along</p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="font-medium text-clay-600 transition-colors hover:text-clay-700">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-oat-900/5">
              <Image src="/images/products/audi-r8-3.jpeg" alt="A finished Audi R8 build held up in the Framies workshop" fill sizes="(max-width: 1024px) 92vw, 46vw" className="object-cover" />
              <span className="absolute bottom-4 left-4 rounded-full bg-oat-900/85 px-3 py-1 text-xs font-medium text-oat-50 backdrop-blur">
                {site.contact.city}
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-oat-200 bg-surface p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-2xl font-medium text-oat-900">Send us a note</h2>
            <p className="mt-1.5 text-sm text-oat-600">We reply within one business day.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
