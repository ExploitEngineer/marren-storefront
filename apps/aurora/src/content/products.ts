import type { Material } from "./collections";

/** Physical frame sizes the build ships in. */
export type FrameSize = "A5" | "A4" | "A3";
/** How the model is presented inside the frame. */
export type FrameStyle = "3D Build" | "Shadow Box" | "Poster";

export interface Product {
  id: string;
  slug: string;
  name: string;
  material: Material; // marque
  collection: string; // collection slug (marque)
  style: FrameStyle;
  sizes: FrameSize[];
  priceFrom: number; // cents
  finish: string;
  description: string;
  /** Studio photograph of the finished, framed build. */
  art: string;
  /** Extra angles shown on the product page. */
  gallery?: string[];
  badges?: string[];
}

const ALL_SIZES: FrameSize[] = ["A5", "A4", "A3"];
const SMALL_SIZES: FrameSize[] = ["A5", "A4"];

const img = (name: string) => `/images/products/${name}.jpeg`;

export const products: Product[] = [
  // Porsche
  {
    id: "porsche-918-spyder",
    slug: "porsche-918-spyder",
    name: "Porsche 918 Spyder",
    material: "porsche",
    collection: "porsche",
    style: "3D Build",
    sizes: ALL_SIZES,
    priceFrom: 6900,
    finish: "Graphite shadow-box moulding",
    description:
      "The 887 hp hybrid flagship, rendered in silver over a full PORSCHE spec poster with a black die-cast lifting off the page. Power, top speed, torque and weight printed to match the car.",
    art: img("porsche-918-spyder"),
    badges: ["Bestseller"],
  },
  {
    id: "porsche-911-carrera-s",
    slug: "porsche-911-carrera-s",
    name: "Porsche 911 Carrera S",
    material: "porsche",
    collection: "porsche",
    style: "Shadow Box",
    sizes: ALL_SIZES,
    priceFrom: 6500,
    finish: "Ash-grey shadow-box moulding",
    description:
      "The 991 Carrera S in gunmetal, floated over a soft grey backdrop with the flat-six spec set in a clean serif. Our most understated build, and a favourite gift.",
    art: img("porsche-911-carrera-s"),
    badges: ["New"],
  },
  {
    id: "porsche-911-gt2-rs",
    slug: "porsche-911-gt2-rs",
    name: "Porsche 911 GT2 RS",
    material: "porsche",
    collection: "porsche",
    style: "Poster",
    sizes: SMALL_SIZES,
    priceFrom: 4500,
    finish: "Black moulding, poster print",
    description:
      "A cinematic 911 GT2 RS print in electric blue, framed thin and dark. The flat-print entry to the range, sized to slot into any wall of builds.",
    art: img("porsche-911-gt2-rs"),
  },

  // Audi
  {
    id: "audi-r8-v10",
    slug: "audi-r8-v10",
    name: "Audi R8 V10",
    material: "audi",
    collection: "audi",
    style: "3D Build",
    sizes: ALL_SIZES,
    priceFrom: 6500,
    finish: "Deep black shadow-box moulding",
    description:
      "The R8 caught mid-launch over its own racing stripe, doors up, with a printed spec bar: 276 hp, 250 km/h, 431 Nm, 5.2L V10. Our sharpest black-on-black build.",
    art: img("audi-r8-1"),
    gallery: [img("audi-r8-1"), img("audi-r8-2"), img("audi-r8-3")],
    badges: ["Bestseller"],
  },

  // Bugatti
  {
    id: "bugatti-chiron",
    slug: "bugatti-chiron",
    name: "Bugatti Chiron",
    material: "bugatti",
    collection: "bugatti",
    style: "3D Build",
    sizes: ALL_SIZES,
    priceFrom: 7900,
    finish: "Black shadow-box moulding",
    description:
      "The Chiron in French racing blue over its twin-stripe livery, badge up top, quad-turbo W16 story printed below. One of the most detailed die-casts we mount.",
    art: img("bugatti-chiron"),
    badges: ["Bestseller"],
  },
  {
    id: "bugatti-chiron-sport",
    slug: "bugatti-chiron-sport",
    name: "Bugatti Chiron Sport",
    material: "bugatti",
    collection: "bugatti",
    style: "Shadow Box",
    sizes: ALL_SIZES,
    priceFrom: 8500,
    finish: "Lacquered black shadow-box moulding",
    description:
      "The blacked-out Chiron Sport against a desert-dusk backdrop, full spec plate across the top. The flagship of the range and the one collectors ask for by name.",
    art: img("bugatti-chiron-sport"),
    gallery: [img("bugatti-chiron-sport"), img("bugatti-chiron-sport-shelf")],
    badges: ["New"],
  },

  // Lamborghini
  {
    id: "lamborghini-huracan",
    slug: "lamborghini-huracan",
    name: "Lamborghini Huracán",
    material: "lamborghini",
    collection: "lamborghini",
    style: "3D Build",
    sizes: ALL_SIZES,
    priceFrom: 6900,
    finish: "Oxblood shadow-box moulding",
    description:
      "The Huracán in Giallo against a torn-graphic backdrop and raging-bull crest, doors scissored open. The loudest build in the room, on purpose.",
    art: img("lamborghini-huracan"),
  },

  // Nissan
  {
    id: "nissan-gtr-r35",
    slug: "nissan-gtr-r35",
    name: "Nissan GT-R R35",
    material: "nissan",
    collection: "nissan",
    style: "3D Build",
    sizes: ALL_SIZES,
    priceFrom: 5900,
    finish: "Black shadow-box moulding",
    description:
      "Godzilla in white, low and wide over a clean spec sheet. The everyday hero of the range and the easiest first build to hang.",
    art: img("nissan-gtr-nismo"),
    badges: ["Bestseller"],
  },

  // McLaren
  {
    id: "mclaren-720s",
    slug: "mclaren-720s",
    name: "McLaren 720S",
    material: "mclaren",
    collection: "mclaren",
    style: "3D Build",
    sizes: ALL_SIZES,
    priceFrom: 7500,
    finish: "Papaya-accent shadow-box moulding",
    description:
      "The 720S in papaya orange, dihedral doors up, floated over a printed aero spec plate. All track-bred lines and negative space.",
    art: img("mclaren-720s"),
    badges: ["New"],
  },

  // Ferrari
  {
    id: "ferrari-f430",
    slug: "ferrari-f430",
    name: "Ferrari F430 Novitec",
    material: "ferrari",
    collection: "ferrari",
    style: "3D Build",
    sizes: ALL_SIZES,
    priceFrom: 7500,
    finish: "Lacquered black shadow-box moulding",
    description:
      "The Novitec-tuned F430 in rosso corsa against a dark backdrop, the flat-crank V8 story printed clean beneath the die-cast.",
    art: img("ferrari-f430"),
    badges: ["Bestseller"],
  },

  // BMW
  {
    id: "bmw-m4-competition",
    slug: "bmw-m4-competition",
    name: "BMW M4 Competition",
    material: "bmw",
    collection: "bmw",
    style: "3D Build",
    sizes: ALL_SIZES,
    priceFrom: 6500,
    finish: "Graphite shadow-box moulding",
    description:
      "The M4 Competition, low and wide over a clean M-stripe spec bar. The everyday icon, framed to hold a wall on its own.",
    art: img("bmw-m4"),
    badges: ["New"],
  },

  // Mercedes-AMG
  {
    id: "mercedes-amg-gtr",
    slug: "mercedes-amg-gtr",
    name: "Mercedes-AMG GT R",
    material: "mercedes",
    collection: "mercedes",
    style: "Shadow Box",
    sizes: ALL_SIZES,
    priceFrom: 6900,
    finish: "Green-keyline shadow-box moulding",
    description:
      "The AMG GT R in green hell magno, shadow-boxed with a hand-finished keyline and a spec plate matched to the car.",
    art: img("mercedes-amg-gtr"),
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByMaterial(material: Material): Product[] {
  return products.filter((p) => p.material === material);
}

export const featuredProducts = products.filter((p) => p.badges?.includes("Bestseller"));

/** Simple "pairs well with" helper: same marque first, then same style. */
export function relatedProducts(product: Product, count = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.material === product.material || p.style === product.style))
    .slice(0, count);
}
