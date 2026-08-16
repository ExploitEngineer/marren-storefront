export interface GalleryShot {
  id: string;
  src: string;
  alt: string;
  /** Social handle for the hover caption. */
  handle: string;
  location: string;
}

const img = (name: string) => `/images/products/${name}.jpeg`;

/** "On the wall" shots for the Decor.HBX customer gallery. */
export const customerGallery: GalleryShot[] = [
  { id: "g1", src: img("decor-01"), alt: "Gold ring wall clock on a living-room wall", handle: "@bilal.a", location: "Lahore" },
  { id: "g2", src: img("decor-02"), alt: "Messi LED silhouette above a desk", handle: "@daniyal.r", location: "Karachi" },
  { id: "g3", src: img("decor-05"), alt: "Mercedes-AMG GT LED art on a brick wall", handle: "@zain.h", location: "Karachi" },
  { id: "g4", src: img("decor-16"), alt: "Galloping horse LED art in a study", handle: "@sana.l", location: "Islamabad" },
  { id: "g5", src: img("decor-10"), alt: "Ronaldo LED silhouette in a barbershop", handle: "@ayesha.m", location: "Lahore" },
  { id: "g6", src: img("decor-12"), alt: "BMW M4 LED silhouette on a garage wall", handle: "@hamza.k", location: "Rawalpindi" },
  { id: "g7", src: img("decor-09"), alt: "BMW vinyl record wall clock", handle: "@daniel.s", location: "Dubai" },
  { id: "g8", src: img("decor-13"), alt: "Mbappe LED ring on a bedroom wall", handle: "@decor.hbx", location: "Studio" },
];
