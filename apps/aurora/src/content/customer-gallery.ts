export interface GalleryShot {
  id: string;
  src: string;
  alt: string;
  /** Social handle for the hover caption. */
  handle: string;
  location: string;
}

const img = (name: string) => `/images/products/${name}.jpeg`;

/**
 * "On the wall" shots for the customer gallery. Product studio images stand in
 * until dedicated lifestyle photography is wired in; the alt text describes the
 * intended context.
 */
export const customerGallery: GalleryShot[] = [
  { id: "g1", src: img("bugatti-chiron-sport"), alt: "Bugatti Chiron Sport frame on a dark study wall", handle: "@daniel.builds", location: "London" },
  { id: "g2", src: img("audi-r8-2"), alt: "Audi R8 V10 frame above a desk setup", handle: "@sana.l", location: "Islamabad" },
  { id: "g3", src: img("porsche-918-spyder"), alt: "Porsche 918 Spyder frame in a home garage", handle: "@zain.h", location: "Karachi" },
  { id: "g4", src: img("lamborghini-huracan"), alt: "Lamborghini Huracán frame against a concrete wall", handle: "@hamza.k", location: "Rawalpindi" },
  { id: "g5", src: img("bugatti-chiron"), alt: "Bugatti Chiron frame on a collector's shelf", handle: "@bilal.a", location: "Lahore" },
  { id: "g6", src: img("porsche-911-carrera-s"), alt: "Porsche 911 Carrera S frame on an office wall", handle: "@marcus.t", location: "Dubai" },
  { id: "g7", src: img("audi-r8-3"), alt: "Audi R8 V10 frame in a detailing studio", handle: "@ayesha.m", location: "Lahore" },
  { id: "g8", src: img("bugatti-chiron-sport-shelf"), alt: "Bugatti Chiron Sport frame styled on a shelf", handle: "@aurora.wall", location: "Studio" },
];
