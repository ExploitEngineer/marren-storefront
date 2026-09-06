import type { Material } from "./collections";
import { mockPkr, pkr } from "@/lib/money";

/**
 * Physical size label. Rectangular pieces are width x height in inches;
 * clocks are a diameter. The label is the key used by the cart, the shop
 * filter and the Stripe line item, so renaming one means bumping the cart
 * storage key in components/cart/cart-provider.tsx.
 */
export type FrameSize =
  | "12x16 in"
  | "12x24 in"
  | "16x24 in"
  | "12 in round"
  | "16 in round"
  | "24 in round"
  | "32 in round";

/** How the piece is made. */
export type FrameStyle = "Backlit LED" | "Metal Cut" | "Vinyl Clock" | "Steel Clock" | "Custom";

export interface ProductVariant {
  size: FrameSize;
  /** Selling price in paisa. */
  price: number;
  /** Original price in paisa, shown struck through. Omit when not discounted. */
  compareAtPrice?: number;
}

/** Non-empty by construction, so `variants[0]` is always safe. */
export type VariantLadder = readonly [ProductVariant, ...ProductVariant[]];

export interface Product {
  id: string;
  slug: string;
  name: string;
  material: Material; // category
  collection: string; // collection slug (category)
  style: FrameStyle;
  variants: VariantLadder;
  finish: string;
  description: string;
  /** Studio photograph of the finished piece. */
  art: string;
  /** Extra angles shown on the product page. */
  gallery?: string[];
  badges?: string[];
}

/**
 * The standard three tiers for rectangular pieces. The percentage off is
 * derived from these two numbers by lib/pricing.ts (33% / 30% / 27%), never
 * stored, so the badge can never disagree with the price beside it.
 */
const RECT_VARIANTS: VariantLadder = [
  { size: "12x16 in", price: pkr(2999), compareAtPrice: pkr(4499) },
  { size: "12x24 in", price: pkr(3499), compareAtPrice: pkr(4999) },
  { size: "16x24 in", price: pkr(3999), compareAtPrice: pkr(5499) },
];

/**
 * MOCK PRICES - placeholders for the owner to replace.
 * No compareAtPrice: a strike-through on an invented number is a bad look
 * and a consumer-law hazard.
 */
const CLOCK_VARIANTS: VariantLadder = [
  { size: "16 in round", price: mockPkr(5999) },
  { size: "24 in round", price: mockPkr(7999) },
  { size: "32 in round", price: mockPkr(9999) },
];

const img = (name: string) => `/images/products/${name}.jpeg`;

export const products: Product[] = [
  // Wall Clocks
  {
    id: "aurelia-gold-clock",
    slug: "aurelia-gold-wall-clock",
    name: "Aurelia Gold Wall Clock",
    material: "clocks",
    collection: "clocks",
    style: "Steel Clock",
    variants: CLOCK_VARIANTS,
    finish: "Matte-black steel with brushed-gold numerals",
    description:
      "A bold ringed clock cut from steel, warm gold numerals floating over matte black. Silent sweep movement, ready to hang out of the box.",
    art: img("decor-01"),
    badges: ["Bestseller"],
  },
  {
    id: "bmw-vinyl-clock",
    slug: "bmw-vinyl-record-clock",
    name: "BMW Vinyl Record Clock",
    material: "clocks",
    collection: "clocks",
    style: "Vinyl Clock",
    // A real vinyl record is 12 inches, so this piece ships in one size only.
    variants: [{ size: "12 in round", price: mockPkr(3499) }],
    finish: "Real vinyl record on a steel movement",
    description:
      "A genuine vinyl record laser-cut into a BMW motif, spinning hands over the classic roundel. A conversation piece for the garage or study.",
    art: img("decor-09"),
    badges: ["New"],
  },
  {
    id: "olive-branch-clock",
    slug: "olive-branch-wall-clock",
    name: "Olive Branch Wall Clock",
    material: "clocks",
    collection: "clocks",
    style: "Steel Clock",
    variants: CLOCK_VARIANTS,
    finish: "Black steel with gold hands",
    description:
      "A calm, botanical clock, hand-finished steel leaves around a slim gold movement. Soft, organic, and quietly premium.",
    art: img("decor-11"),
  },

  // LED Wall Art
  {
    id: "hero-duo-led",
    slug: "hero-duo-led-sign",
    name: "Hero Duo LED Sign",
    material: "led",
    collection: "led",
    style: "Backlit LED",
    variants: RECT_VARIANTS,
    finish: "Laser-cut acrylic + steel, warm-white LED halo",
    description:
      "The two greatest crests fused into one backlit emblem. A soft LED glow lifts it off the wall, brilliant by day, cinematic at night.",
    art: img("decor-04"),
    badges: ["Bestseller"],
  },
  {
    id: "galloping-horse-led",
    slug: "galloping-horse-led-art",
    name: "Galloping Horse LED Art",
    material: "led",
    collection: "led",
    style: "Backlit LED",
    variants: RECT_VARIANTS,
    finish: "Black steel silhouette, warm LED backlight",
    description:
      "A horse mid-stride, cut from steel and floated over a warm glow. Movement and light in one striking wall piece.",
    art: img("decor-16"),
  },

  // Sports Legends
  {
    id: "messi-10-led",
    slug: "messi-10-led-silhouette",
    name: "Messi 10 LED Silhouette",
    material: "sports",
    collection: "sports",
    style: "Backlit LED",
    variants: RECT_VARIANTS,
    finish: "Steel silhouette, warm-white LED halo",
    description:
      "The iconic celebration in backlit steel. A glowing tribute for the fan cave, the bedroom, or the five-a-side clubhouse.",
    art: img("decor-02"),
    badges: ["Bestseller"],
  },
  {
    id: "ronaldo-7-led",
    slug: "ronaldo-7-led-silhouette",
    name: "Ronaldo 7 LED Silhouette",
    material: "sports",
    collection: "sports",
    style: "Backlit LED",
    variants: RECT_VARIANTS,
    finish: "Steel silhouette, red LED halo",
    description:
      "The signature stance, backlit in bold red. Cut from steel and wired to glow, ready to hang the day it lands.",
    art: img("decor-10"),
  },
  {
    id: "mbappe-led-ring",
    slug: "mbappe-led-ring",
    name: "Mbappe LED Ring",
    material: "sports",
    collection: "sports",
    style: "Backlit LED",
    variants: RECT_VARIANTS,
    finish: "Ringed steel silhouette, cool-blue LED",
    description:
      "A circular tribute with a crisp cool-blue glow. Modern, clean, and impossible to walk past.",
    art: img("decor-13"),
    badges: ["New"],
  },

  // Metal Car Art
  {
    id: "bmw-m4-led-face",
    slug: "bmw-m4-led-wall-art",
    name: "BMW M4 LED Wall Art",
    material: "cars",
    collection: "cars",
    style: "Backlit LED",
    variants: RECT_VARIANTS,
    finish: "Steel front-face cut, warm-white LED backlight",
    description:
      "The unmistakable M4 face, kidney grilles and all, cut from steel and backlit to glow. The centrepiece of the car collection.",
    art: "/images/product.jpeg",
    badges: ["Bestseller"],
  },
  {
    id: "amg-gt-led",
    slug: "mercedes-amg-gt-led-art",
    name: "Mercedes-AMG GT LED Art",
    material: "cars",
    collection: "cars",
    style: "Backlit LED",
    variants: RECT_VARIANTS,
    finish: "Black steel silhouette, warm LED halo",
    description:
      "The long-nosed AMG GT in profile, cut clean and backlit against the wall. Menace and elegance in equal measure.",
    art: img("decor-05"),
  },
  {
    id: "aventador-line-art",
    slug: "lamborghini-aventador-line-art",
    name: "Lamborghini Aventador Line Art",
    material: "cars",
    collection: "cars",
    style: "Metal Cut",
    variants: RECT_VARIANTS,
    finish: "Single-line steel silhouette",
    description:
      "The Aventador reduced to one continuous, precise line of steel. Minimal, architectural, unmistakable.",
    art: img("decor-08"),
  },
  {
    id: "bmw-m4-silhouette-led",
    slug: "bmw-m4-silhouette-led",
    name: "BMW M4 Silhouette LED",
    material: "cars",
    collection: "cars",
    style: "Backlit LED",
    variants: RECT_VARIANTS,
    finish: "Steel side-profile cut, warm LED backlight",
    description:
      "The M4 in full side profile, low and wide, floated over a warm glow. Built to own a wall.",
    art: img("decor-12"),
  },
  {
    id: "bmw-metal-led",
    slug: "bmw-metal-led-art",
    name: "BMW Metal LED Art",
    material: "cars",
    collection: "cars",
    style: "Backlit LED",
    variants: RECT_VARIANTS,
    finish: "Framed steel cut, warm LED backlight",
    description:
      "A framed steel BMW, detailed and backlit. Clean lines, warm light, garage-ready.",
    art: img("decor-14"),
  },
  {
    id: "custom-car-metal-art",
    slug: "custom-car-metal-art",
    name: "Custom Car Metal Art",
    material: "cars",
    collection: "cars",
    style: "Custom",
    variants: RECT_VARIANTS,
    finish: "Made to order from your car",
    description:
      "Send us your car and we cut it in steel, backlit or clean. A one-off piece of the car you actually drive.",
    art: img("decor-07"),
    gallery: [img("decor-07"), img("decor-06"), img("decor-03")],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Server-side lookup for checkout re-pricing, which carries ids rather than slugs. */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function productsByMaterial(material: Material): Product[] {
  return products.filter((p) => p.material === material);
}

export const featuredProducts = products.filter((p) => p.badges?.includes("Bestseller"));

/** Simple "pairs well with" helper: same category first, then same style. */
export function relatedProducts(product: Product, count = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.material === product.material || p.style === product.style))
    .slice(0, count);
}
