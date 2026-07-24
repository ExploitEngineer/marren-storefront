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
  /** Finished builds shown in the on-wall arrangement. */
  pieces: string[];
}

const img = (name: string) => `/images/products/${name}.jpeg`;

export const gallerySets: GallerySet[] = [
  {
    id: "porsche-podium",
    slug: "porsche-podium",
    name: "The Porsche Podium",
    material: "porsche",
    frameCount: 3,
    price: 16800,
    savings: 2100,
    dimensions: "Fills roughly 48 × 20 in",
    description:
      "Three Porsche builds in a row - 918 Spyder, 911 Carrera S and the GT2 RS poster - sized for a shelf line or a hallway of Stuttgart icons.",
    pieces: [img("porsche-918-spyder"), img("porsche-911-carrera-s"), img("porsche-911-gt2-rs")],
  },
  {
    id: "hypercar-trio",
    slug: "hypercar-trio",
    name: "The Hypercar Trio",
    material: "bugatti",
    frameCount: 3,
    price: 21900,
    savings: 3000,
    dimensions: "Fills roughly 52 × 22 in",
    description:
      "The heavy hitters together: Chiron, Chiron Sport and the Audi R8 V10. Our most-gifted set, and the fastest way to start a wall.",
    pieces: [img("bugatti-chiron"), img("bugatti-chiron-sport"), img("audi-r8-1")],
  },
  {
    id: "garage-six",
    slug: "garage-six",
    name: "The Garage Six",
    material: "nissan",
    frameCount: 6,
    price: 39900,
    savings: 6600,
    dimensions: "Fills roughly 64 × 40 in",
    description:
      "A full salon wall of six builds across every marque, balanced in size and colour to hang as one considered piece above a sofa or bed.",
    pieces: [
      img("collection-trio"),
      img("lamborghini-huracan"),
      img("porsche-918-spyder"),
      img("audi-r8-2"),
      img("bugatti-chiron"),
      img("porsche-911-carrera-s"),
    ],
  },
];

export function getGallerySet(slug: string): GallerySet | undefined {
  return gallerySets.find((s) => s.slug === slug);
}
