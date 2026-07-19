export type Material = "oak" | "walnut" | "black-ash" | "brass";

export interface MaterialMeta {
  label: string;
  /** Visible frame moulding tone, for the rendered frame chrome. */
  frame: string;
  /** Inner bevel highlight. */
  frameEdge: string;
  /** Mat (passe-partout) tone inside the frame. */
  mat: string;
}

export const materialMeta: Record<Material, MaterialMeta> = {
  oak: { label: "Oak", frame: "#c7a878", frameEdge: "#e0c99b", mat: "#f4ece0" },
  walnut: { label: "Walnut", frame: "#5c4433", frameEdge: "#7a5b44", mat: "#f1e9db" },
  "black-ash": { label: "Black Ash", frame: "#2a2622", frameEdge: "#454039", mat: "#efe8dc" },
  brass: { label: "Brass", frame: "#b0894f", frameEdge: "#d8b878", mat: "#f3ecdd" },
};

export interface Collection {
  id: string;
  slug: string;
  name: string;
  material: Material;
  priceFrom: number; // cents
  tagline: string;
  intro: string;
}

export const collections: Collection[] = [
  {
    id: "oak",
    slug: "oak",
    name: "Oak",
    material: "oak",
    priceFrom: 4800,
    tagline: "Light, warm, quietly grained.",
    intro:
      "The everyday frame that goes with everything. Pale, open grain and a soft matte finish that lets the work stay the loudest thing on the wall.",
  },
  {
    id: "walnut",
    slug: "walnut",
    name: "Walnut",
    material: "walnut",
    priceFrom: 5800,
    tagline: "Deep, even, gallery-grade.",
    intro:
      "A rich, close grain finished to a low sheen. Walnut gives a photograph the weight of something worth keeping.",
  },
  {
    id: "black-ash",
    slug: "black-ash",
    name: "Black Ash",
    material: "black-ash",
    priceFrom: 5400,
    tagline: "Graphic, crisp, modern.",
    intro:
      "Ash grain stained near-black. The sharpest outline in the range, and the one that disappears against a bold print.",
  },
  {
    id: "brass",
    slug: "brass",
    name: "Brass",
    material: "brass",
    priceFrom: 7200,
    tagline: "Thin, bright, considered.",
    intro:
      "A slim brushed-brass profile for work that earns a little shine. Warm metal that ages gracefully in the light.",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
