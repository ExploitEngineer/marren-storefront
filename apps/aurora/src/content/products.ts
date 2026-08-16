import type { Material } from "./collections";

/** Physical sizes a piece ships in. */
export type FrameSize = "40 cm" | "60 cm" | "80 cm";
/** How the piece is made. */
export type FrameStyle = "Backlit LED" | "Metal Cut" | "Vinyl Clock" | "Steel Clock" | "Custom";

export interface Product {
  id: string;
  slug: string;
  name: string;
  material: Material; // category
  collection: string; // collection slug (category)
  style: FrameStyle;
  sizes: FrameSize[];
  priceFrom: number; // cents
  finish: string;
  description: string;
  /** Studio photograph of the finished piece. */
  art: string;
  /** Extra angles shown on the product page. */
  gallery?: string[];
  badges?: string[];
}

const ALL_SIZES: FrameSize[] = ["40 cm", "60 cm", "80 cm"];
const SMALL_SIZES: FrameSize[] = ["40 cm", "60 cm"];

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
    sizes: ALL_SIZES,
    priceFrom: 4500,
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
    sizes: SMALL_SIZES,
    priceFrom: 4200,
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
    sizes: ALL_SIZES,
    priceFrom: 4800,
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
    sizes: ALL_SIZES,
    priceFrom: 7500,
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
    sizes: ALL_SIZES,
    priceFrom: 6900,
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
    sizes: ALL_SIZES,
    priceFrom: 5900,
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
    sizes: ALL_SIZES,
    priceFrom: 5900,
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
    sizes: SMALL_SIZES,
    priceFrom: 5500,
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
    sizes: ALL_SIZES,
    priceFrom: 6900,
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
    sizes: ALL_SIZES,
    priceFrom: 6900,
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
    sizes: ALL_SIZES,
    priceFrom: 6200,
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
    sizes: ALL_SIZES,
    priceFrom: 6600,
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
    sizes: SMALL_SIZES,
    priceFrom: 6400,
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
    sizes: ALL_SIZES,
    priceFrom: 8500,
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
