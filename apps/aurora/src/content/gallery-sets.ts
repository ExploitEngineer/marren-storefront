import type { Material } from "./collections";
import { mockPkr } from "@/lib/money";

export interface GallerySet {
  id: string;
  slug: string;
  name: string;
  material: Material;
  frameCount: number;
  /** Selling price in paisa. */
  price: number;
  /** Price of the pieces bought separately, in paisa. The saving is derived from the pair. */
  compareAtPrice: number;
  dimensions: string;
  description: string;
  /** Finished pieces shown in the on-wall arrangement. */
  pieces: string[];
}

const img = (name: string) => `/images/products/${name}.jpeg`;

// MOCK PRICES - placeholders for the owner. compareAtPrice is the sum of the
// individual pieces at their current ladder price.
export const gallerySets: GallerySet[] = [
  {
    id: "fan-cave",
    slug: "fan-cave",
    name: "The Fan Cave",
    material: "sports",
    frameCount: 3,
    price: mockPkr(8999),
    compareAtPrice: mockPkr(10497),
    dimensions: "Fills roughly 48 × 20 in",
    description:
      "The three greats together, Messi, Ronaldo and Mbappe, in bold backlit LED. Instant fan-cave energy for a wall of legends.",
    pieces: [img("decor-02"), img("decor-10"), img("decor-13")],
  },
  {
    id: "garage-wall",
    slug: "garage-wall",
    name: "The Garage Wall",
    material: "cars",
    frameCount: 3,
    price: mockPkr(9999),
    compareAtPrice: mockPkr(11997),
    dimensions: "Fills roughly 52 × 22 in",
    description:
      "Three car pieces that hang as one: the M4 face, the AMG GT profile and the Aventador line art. Steel, glow and clean lines.",
    pieces: ["/images/product.jpeg", img("decor-05"), img("decor-08")],
  },
  {
    id: "statement-six",
    slug: "statement-six",
    name: "The Statement Six",
    material: "led",
    frameCount: 6,
    price: mockPkr(17999),
    compareAtPrice: mockPkr(20994),
    dimensions: "Fills roughly 64 × 40 in",
    description:
      "A full feature wall of six pieces across clocks, LED art and metal, balanced in size and glow to hang as one considered arrangement.",
    pieces: [
      img("decor-01"),
      img("decor-04"),
      img("decor-16"),
      img("decor-12"),
      img("decor-09"),
      img("decor-11"),
    ],
  },
];

export function getGallerySet(slug: string): GallerySet | undefined {
  return gallerySets.find((s) => s.slug === slug);
}

/** Server-side lookup for checkout re-pricing, which carries ids rather than slugs. */
export function getGallerySetById(id: string): GallerySet | undefined {
  return gallerySets.find((s) => s.id === id);
}
