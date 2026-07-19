import Link from "next/link";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { site, footerNav, legalNav } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-oat-900 text-oat-100">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div className="max-w-sm">
            <span className="inline-flex items-center gap-2.5 font-serif text-2xl font-semibold tracking-[-0.02em] text-oat-50">
              <span aria-hidden className="size-3 rounded-[3px] bg-clay-400" />
              Marren
            </span>
            <p className="mt-4 text-sm leading-relaxed text-oat-100/70">
              Solid-wood frames worth hanging, shipped ready to go. Get 10% off your first frame.
            </p>
            <NewsletterForm />
          </div>

          {/* Link columns */}
          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-oat-100/50 uppercase">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-oat-100/75 transition-colors hover:text-oat-50">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-oat-100/70 transition-colors hover:text-oat-50">
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <Link key={l.label} href={l.href} className="text-xs text-oat-100/55 transition-colors hover:text-oat-100">
                {l.label}
              </Link>
            ))}
            <p className="text-xs text-oat-100/45">© {new Date().getFullYear()} Marren</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
