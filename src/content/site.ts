/**
 * Global site configuration for Marren.
 * Placeholder values (contact details, socials) are flagged for replacement.
 * Shaped as a single typed module so it can move to a CMS or env later.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: "Marren",
  tagline: "Frames worth the wall.",
  description:
    "Solid-wood picture frames, cut and finished to gallery standard, and ready to hang the day they arrive.",
  url: "https://marren.co",
  locale: "en_US",
  currency: "USD",
  freeShippingThreshold: 7500, // cents

  contact: {
    // Placeholder - replace with real studio details.
    address: "118 Kiln Street, Suite 4",
    city: "Portland, OR 97201",
    phone: "(503) 555-0142",
    phoneHref: "tel:+15035550142",
    email: "hello@marren.co",
    emailHref: "mailto:hello@marren.co",
    hours: "Mon-Fri, 9am-5pm PT",
  },

  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ] satisfies SocialLink[],
} as const;

export const primaryNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Gallery Wall", href: "/gallery-wall" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Oak", href: "/shop/oak" },
      { label: "Walnut", href: "/shop/walnut" },
      { label: "Black Ash", href: "/shop/black-ash" },
      { label: "Brass", href: "/shop/brass" },
      { label: "Gallery Wall Sets", href: "/gallery-wall" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Journal", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "/shop#faq" },
      { label: "Returns", href: "/shop#faq" },
      { label: "Sizing guide", href: "/shop#faq" },
      { label: "Care", href: "/shop#faq" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/about" },
  { label: "Terms", href: "/about" },
  { label: "Accessibility", href: "/about" },
];
