/**
 * A "collection" is a Decor.HBX product category. The `material` field (kept for
 * schema stability across the app) names the category; `materialMeta` carries the
 * display-card keyline tones and a brand accent used for chrome.
 */
export type Material = "clocks" | "led" | "sports" | "cars";

export interface MaterialMeta {
  label: string;
  /** Display-card keyline tone. */
  frame: string;
  /** Inner bevel highlight on the display card. */
  frameEdge: string;
  /** Neutral surface behind the piece in composed layouts. */
  mat: string;
  /** Brand accent, for dots and small chrome. */
  accent: string;
}

export const materialMeta: Record<Material, MaterialMeta> = {
  clocks: { label: "Wall Clocks", frame: "#161616", frameEdge: "#333131", mat: "#0e0e0e", accent: "#d9a441" },
  led: { label: "LED Wall Art", frame: "#141414", frameEdge: "#2f2d2b", mat: "#0c0c0c", accent: "#e8b74f" },
  sports: { label: "Sports Legends", frame: "#151313", frameEdge: "#332624", mat: "#0d0c0c", accent: "#c0181f" },
  cars: { label: "Metal Car Art", frame: "#141414", frameEdge: "#302e2b", mat: "#0c0c0c", accent: "#d9a441" },
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
    id: "clocks",
    slug: "clocks",
    name: "Wall Clocks",
    material: "clocks",
    priceFrom: 4500,
    tagline: "Time, styled.",
    intro:
      "Statement wall clocks cut from steel and finished by hand, from warm gold rings to vinyl-record and botanical designs. A quiet centrepiece for any wall.",
  },
  {
    id: "led",
    slug: "led",
    name: "LED Wall Art",
    material: "led",
    priceFrom: 6500,
    tagline: "Light up the room.",
    intro:
      "Backlit metal art with a soft LED halo, from icons and animals to your own custom piece. Plugs in, glows, and turns a blank wall into a mood.",
  },
  {
    id: "sports",
    slug: "sports",
    name: "Sports Legends",
    material: "sports",
    priceFrom: 5500,
    tagline: "Heroes on the wall.",
    intro:
      "Backlit silhouettes of the greats, Messi, Ronaldo, Mbappe and more, in bold LED. For the fan cave, the bedroom, or the shop counter.",
  },
  {
    id: "cars",
    slug: "cars",
    name: "Metal Car Art",
    material: "cars",
    priceFrom: 6000,
    tagline: "Your ride, framed in steel.",
    intro:
      "Precision metal silhouettes of the cars people love, backlit or clean-cut, plus fully custom pieces made from your own car.",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
