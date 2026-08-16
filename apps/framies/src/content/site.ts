/**
 * Global site configuration for Framies.
 * Placeholder values (contact details) are flagged for replacement.
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
  name: "Framies",
  tagline: "Hypercars, framed.",
  description:
    "Hand-built 3D die-cast car frames. Your favourite hypercar, mounted, detailed and shadow-boxed, ready to hang the day it lands.",
  url: "https://framies.co",
  locale: "en_US",
  currency: "USD",
  freeShippingThreshold: 7500, // cents

  contact: {
    // Placeholder - replace with real studio details.
    address: "Workshop 4, Mill Road",
    city: "Sialkot",
    phone: "(0300) 555-0142",
    phoneHref: "tel:+923005550142",
    email: "hello@framies.co",
    emailHref: "mailto:hello@framies.co",
    hours: "Mon-Sat, 10am-7pm",
  },

  socials: [
    { label: "TikTok", href: "https://vt.tiktok.com/ZS45YWwDx/" },
    { label: "Instagram", href: "https://www.instagram.com/reel/Dbh714FqRNU/?igsh=YXVoZ3d1eDBvc3B3" },
    { label: "WhatsApp", href: "https://wa.me/923005550142" },
  ] satisfies SocialLink[],
} as const;

export const primaryNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Garage Wall", href: "/gallery-wall" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Porsche", href: "/shop/porsche" },
      { label: "Audi", href: "/shop/audi" },
      { label: "Bugatti", href: "/shop/bugatti" },
      { label: "Lamborghini", href: "/shop/lamborghini" },
      { label: "Garage Wall Sets", href: "/gallery-wall" },
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
