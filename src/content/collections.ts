/**
 * A "collection" is a car marque. The `material` field (kept for schema
 * stability across the app) names the marque; `materialMeta` carries the
 * display-card frame tones and a brand accent used for chrome.
 */
export type Material =
  | "porsche"
  | "audi"
  | "bugatti"
  | "lamborghini"
  | "nissan"
  | "mclaren"
  | "ferrari"
  | "bmw"
  | "mercedes";

export interface MaterialMeta {
  label: string;
  /** Display-card keyline tone, echoing the real frame moulding. */
  frame: string;
  /** Inner bevel highlight on the display card. */
  frameEdge: string;
  /** Neutral surface behind the piece in composed layouts. */
  mat: string;
  /** Brand accent, for dots and small chrome. */
  accent: string;
}

export const materialMeta: Record<Material, MaterialMeta> = {
  porsche: { label: "Porsche", frame: "#33322f", frameEdge: "#565450", mat: "#efe8dc", accent: "#9a7b3d" },
  audi: { label: "Audi", frame: "#1c1c1e", frameEdge: "#3a3a3c", mat: "#eceae6", accent: "#9a1f24" },
  bugatti: { label: "Bugatti", frame: "#1b2a3a", frameEdge: "#33475c", mat: "#e8edf1", accent: "#2b6cb0" },
  lamborghini: { label: "Lamborghini", frame: "#2a1614", frameEdge: "#4a2622", mat: "#efe8dc", accent: "#c8892b" },
  nissan: { label: "Nissan", frame: "#1a1a1a", frameEdge: "#363636", mat: "#ecebe9", accent: "#8a1f24" },
  mclaren: { label: "McLaren", frame: "#1c1c1e", frameEdge: "#3a3a3c", mat: "#ecebe9", accent: "#ff5b00" },
  ferrari: { label: "Ferrari", frame: "#1a1113", frameEdge: "#3a2226", mat: "#efe7e5", accent: "#d40000" },
  bmw: { label: "BMW", frame: "#191b1f", frameEdge: "#343841", mat: "#e9ebee", accent: "#2f6fd0" },
  mercedes: { label: "Mercedes-AMG", frame: "#1b1c1d", frameEdge: "#3a3b3c", mat: "#ecedee", accent: "#00a19c" },
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
    id: "porsche",
    slug: "porsche",
    name: "Porsche",
    material: "porsche",
    priceFrom: 4500,
    tagline: "Stuttgart, on the wall.",
    intro:
      "From the 918 Spyder to the 911 GT2 RS, our Porsche builds pair a hand-detailed die-cast with a shadow-box frame that reads like a museum plate.",
  },
  {
    id: "audi",
    slug: "audi",
    name: "Audi",
    material: "audi",
    priceFrom: 6500,
    tagline: "Vorsprung, framed.",
    intro:
      "The R8 V10, mounted mid-launch over its own racing stripe. Deep black moulding, glass front, spec bar printed to match the car.",
  },
  {
    id: "bugatti",
    slug: "bugatti",
    name: "Bugatti",
    material: "bugatti",
    priceFrom: 7900,
    tagline: "Molsheim hypercars.",
    intro:
      "The Chiron and Chiron Sport in full flight. Our most detailed builds, with quad-turbo spec plates and a lacquered shadow box.",
  },
  {
    id: "lamborghini",
    slug: "lamborghini",
    name: "Lamborghini",
    material: "lamborghini",
    priceFrom: 6900,
    tagline: "Raging bull, standing still.",
    intro:
      "The Huracán in Giallo, torn-graphic backdrop, mounted against a deep oxblood frame. Loud on the shelf, louder on the wall.",
  },
  {
    id: "nissan",
    slug: "nissan",
    name: "Nissan",
    material: "nissan",
    priceFrom: 5900,
    tagline: "Godzilla, boxed.",
    intro:
      "The GT-R R35, low and wide over a clean spec sheet. The everyday hero of the range, and the easiest first build to own.",
  },
  {
    id: "mclaren",
    slug: "mclaren",
    name: "McLaren",
    material: "mclaren",
    priceFrom: 7500,
    tagline: "Woking, on the wall.",
    intro:
      "The 720S and Senna in papaya, shadow-boxed with a printed aero spec plate. Track-bred lines, framed for the study.",
  },
  {
    id: "ferrari",
    slug: "ferrari",
    name: "Ferrari",
    material: "ferrari",
    priceFrom: 7500,
    tagline: "Maranello red.",
    intro:
      "The F430 Novitec in rosso corsa, framed dark with the flat-crank V8 story printed below the die-cast.",
  },
  {
    id: "bmw",
    slug: "bmw",
    name: "BMW",
    material: "bmw",
    priceFrom: 6500,
    tagline: "M power, framed.",
    intro:
      "The M4 Competition, low and wide over a clean M-stripe spec bar. The everyday icon of the range.",
  },
  {
    id: "mercedes",
    slug: "mercedes",
    name: "Mercedes-AMG",
    material: "mercedes",
    priceFrom: 6900,
    tagline: "Affalterbach, boxed.",
    intro:
      "The AMG GT R in green hell magno, shadow-boxed with a hand-finished keyline and a matched spec plate.",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
