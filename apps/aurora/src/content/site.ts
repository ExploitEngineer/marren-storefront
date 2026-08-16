/**
 * Global site configuration for Decor.HBX.
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
  name: "Decor.HBX",
  tagline: "Walls worth staring at.",
  description:
    "Decor.HBX makes hand-finished metal and LED wall art, statement clocks, backlit sports and car pieces, and fully custom designs, ready to hang the day they land.",
  url: "https://decorhbx.com",
  locale: "en_US",
  currency: "USD",
  freeShippingThreshold: 7500, // cents

  contact: {
    // Placeholder - replace with real studio details.
    address: "Workshop 4, Mill Road",
    city: "Sialkot",
    phone: "(0300) 555-0142",
    phoneHref: "tel:+923005550142",
    email: "hello@decorhbx.com",
    emailHref: "mailto:hello@decorhbx.com",
    hours: "Mon-Sat, 10am-7pm",
  },

  socials: [
    { label: "TikTok", href: "https://tiktok.com/@decor.hbx" },
    { label: "Instagram", href: "https://instagram.com/decor.hbx" },
    { label: "WhatsApp", href: "https://wa.me/923005550142" },
  ] satisfies SocialLink[],
} as const;

export const primaryNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Wall Sets", href: "/gallery-wall" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Wall Clocks", href: "/shop/clocks" },
      { label: "LED Wall Art", href: "/shop/led" },
      { label: "Sports Legends", href: "/shop/sports" },
      { label: "Metal Car Art", href: "/shop/cars" },
      { label: "Wall Sets", href: "/gallery-wall" },
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
