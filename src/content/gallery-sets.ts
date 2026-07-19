import type { Material } from "./collections";

export interface GallerySet {
  id: string;
  slug: string;
  name: string;
  material: Material;
  frameCount: number;
  price: number; // cents
  savings: number; // cents
  dimensions: string;
  description: string;
  /** Art photographs in the set, for the on-wall arrangement. */
  pieces: string[];
}

const p = (n: number) => `/images/art/${String(n).padStart(2, "0")}.jpg`;

export const gallerySets: GallerySet[] = [
  {
    id: "salon-six",
    slug: "salon-six",
    name: "The Salon Six",
    material: "walnut",
    frameCount: 6,
    price: 26800,
    savings: 4400,
    dimensions: "Fills roughly 60 × 40 in",
    description:
      "Six walnut frames in mixed sizes, balanced to fill a wall above a sofa or bed. Our most-hung set.",
    pieces: [1, 2, 3, 4, 5, 6].map(p),
  },
  {
    id: "the-corridor",
    slug: "the-corridor",
    name: "The Corridor",
    material: "oak",
    frameCount: 4,
    price: 18400,
    savings: 2800,
    dimensions: "Fills roughly 64 × 20 in",
    description:
      "Four oak frames in a long row, sized for a hallway or stairwell where a single line of work looks best.",
    pieces: [7, 8, 9, 10].map(p),
  },
  {
    id: "the-trio",
    slug: "the-trio",
    name: "The Trio",
    material: "black-ash",
    frameCount: 3,
    price: 13200,
    savings: 1800,
    dimensions: "Fills roughly 42 × 18 in",
    description:
      "Three black ash frames, evenly spaced. The simplest way to make a small wall feel intentional.",
    pieces: [11, 12, 1].map(p),
  },
];

export function getGallerySet(slug: string): GallerySet | undefined {
  return gallerySets.find((s) => s.slug === slug);
}
