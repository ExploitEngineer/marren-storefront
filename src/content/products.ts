import type { Material } from "./collections";

export type FrameSize = "4x6" | "5x7" | "8x10" | "11x14" | "16x20" | "18x24" | "24x36";
export type FrameStyle = "Classic" | "Wide" | "Thin" | "Float";

export interface Product {
  id: string;
  slug: string;
  name: string;
  material: Material;
  collection: string; // collection slug
  style: FrameStyle;
  sizes: FrameSize[];
  priceFrom: number; // cents
  finish: string;
  description: string;
  /** Photograph shown inside the frame (placeholder art). */
  art: string;
  badges?: string[];
}

const ALL_SIZES: FrameSize[] = ["5x7", "8x10", "11x14", "16x20", "18x24"];
const BIG_SIZES: FrameSize[] = ["8x10", "11x14", "16x20", "18x24", "24x36"];
const SMALL_SIZES: FrameSize[] = ["4x6", "5x7", "8x10", "11x14"];

function art(n: number): string {
  return `/images/art/${String(((n - 1) % 12) + 1).padStart(2, "0")}.jpg`;
}

export const products: Product[] = [
  // Oak
  { id: "oak-studio", slug: "oak-studio", name: "Oak Studio", material: "oak", collection: "oak", style: "Classic", sizes: ALL_SIZES, priceFrom: 4800, finish: "Matte natural oak", description: "Our everyday oak profile: a clean three-quarter-inch face with open grain and a soft matte seal.", art: art(1), badges: ["Bestseller"] },
  { id: "oak-broadside", slug: "oak-broadside", name: "Oak Broadside", material: "oak", collection: "oak", style: "Wide", sizes: BIG_SIZES, priceFrom: 5800, finish: "Matte natural oak", description: "A generous inch-and-a-half moulding that gives large prints room to breathe.", art: art(2) },
  { id: "oak-sliver", slug: "oak-sliver", name: "Oak Sliver", material: "oak", collection: "oak", style: "Thin", sizes: SMALL_SIZES, priceFrom: 4400, finish: "Matte natural oak", description: "A barely-there profile for small photographs that should feel weightless.", art: art(3) },
  { id: "oak-float", slug: "oak-float", name: "Oak Float", material: "oak", collection: "oak", style: "Float", sizes: ALL_SIZES, priceFrom: 6200, finish: "Matte natural oak", description: "A floating mount that suspends the work with a shadow line on every side.", art: art(4), badges: ["New"] },

  // Walnut
  { id: "walnut-studio", slug: "walnut-studio", name: "Walnut Studio", material: "walnut", collection: "walnut", style: "Classic", sizes: ALL_SIZES, priceFrom: 5800, finish: "Low-sheen walnut", description: "Close, even grain finished to a quiet sheen. The frame that makes a print look collected.", art: art(5), badges: ["Bestseller"] },
  { id: "walnut-broadside", slug: "walnut-broadside", name: "Walnut Broadside", material: "walnut", collection: "walnut", style: "Wide", sizes: BIG_SIZES, priceFrom: 6800, finish: "Low-sheen walnut", description: "A wide walnut face with real presence, built for statement pieces.", art: art(6) },
  { id: "walnut-sliver", slug: "walnut-sliver", name: "Walnut Sliver", material: "walnut", collection: "walnut", style: "Thin", sizes: SMALL_SIZES, priceFrom: 5400, finish: "Low-sheen walnut", description: "Dark, thin, and precise. A slim outline for tight arrangements.", art: art(7) },
  { id: "walnut-float", slug: "walnut-float", name: "Walnut Float", material: "walnut", collection: "walnut", style: "Float", sizes: ALL_SIZES, priceFrom: 7200, finish: "Low-sheen walnut", description: "Floating walnut mount with a deep shadow line for gallery-style hanging.", art: art(8) },

  // Black Ash
  { id: "ash-studio", slug: "ash-studio", name: "Black Ash Studio", material: "black-ash", collection: "black-ash", style: "Classic", sizes: ALL_SIZES, priceFrom: 5400, finish: "Stained ash, near-black", description: "Ash grain stained to a deep near-black. The crispest outline we make.", art: art(9), badges: ["Bestseller"] },
  { id: "ash-broadside", slug: "ash-broadside", name: "Black Ash Broadside", material: "black-ash", collection: "black-ash", style: "Wide", sizes: BIG_SIZES, priceFrom: 6400, finish: "Stained ash, near-black", description: "A wide, graphic black profile that frames bold, high-contrast work.", art: art(10) },
  { id: "ash-sliver", slug: "ash-sliver", name: "Black Ash Sliver", material: "black-ash", collection: "black-ash", style: "Thin", sizes: SMALL_SIZES, priceFrom: 5000, finish: "Stained ash, near-black", description: "The thinnest black line in the range, for dense gallery walls.", art: art(11) },
  { id: "ash-float", slug: "ash-float", name: "Black Ash Float", material: "black-ash", collection: "black-ash", style: "Float", sizes: ALL_SIZES, priceFrom: 6800, finish: "Stained ash, near-black", description: "Floating black mount that reads as a sharp shadow around the work.", art: art(12), badges: ["New"] },

  // Brass
  { id: "brass-studio", slug: "brass-studio", name: "Brass Studio", material: "brass", collection: "brass", style: "Classic", sizes: ["5x7", "8x10", "11x14", "16x20"], priceFrom: 7200, finish: "Brushed brass", description: "A slim brushed-brass face with warm, even shine that softens as it ages.", art: art(2), badges: ["Bestseller"] },
  { id: "brass-sliver", slug: "brass-sliver", name: "Brass Sliver", material: "brass", collection: "brass", style: "Thin", sizes: SMALL_SIZES, priceFrom: 6800, finish: "Brushed brass", description: "The finest metal profile we make, bright against a pale mat.", art: art(6) },
  { id: "brass-float", slug: "brass-float", name: "Brass Float", material: "brass", collection: "brass", style: "Float", sizes: ["8x10", "11x14", "16x20"], priceFrom: 8400, finish: "Brushed brass", description: "A floating brass surround for work that earns a little glow.", art: art(9) },
  { id: "brass-broadside", slug: "brass-broadside", name: "Brass Broadside", material: "brass", collection: "brass", style: "Wide", sizes: ["11x14", "16x20", "18x24", "24x36"], priceFrom: 8800, finish: "Brushed brass", description: "A wider brass moulding with quiet weight, for a single large statement.", art: art(1) },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByMaterial(material: Material): Product[] {
  return products.filter((p) => p.material === material);
}

export const featuredProducts = products.filter((p) => p.badges?.includes("Bestseller"));

/** Simple "pairs well with" helper: same style, different material. */
export function relatedProducts(product: Product, count = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.style === product.style || p.material === product.material))
    .slice(0, count);
}
