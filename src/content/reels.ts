/**
 * Short vertical clips of finished builds, filmed in the workshop.
 * Files live in /public/videos; add or reorder freely.
 */
export interface Reel {
  id: string;
  src: string;
  /** First-frame still, shown before playback and under reduced motion. */
  poster: string;
  /** Short caption shown under the clip. */
  caption: string;
}

const vid = (n: number) => `/videos/reel-${String(n).padStart(2, "0")}.mp4`;
const poster = (n: number) => `/videos/posters/reel-${String(n).padStart(2, "0")}.jpg`;

export const reels: Reel[] = [
  { id: "reel-01", src: vid(1), poster: poster(1), caption: "Fresh off the bench" },
  { id: "reel-02", src: vid(2), poster: poster(2), caption: "Doors up, mounted" },
  { id: "reel-03", src: vid(3), poster: poster(3), caption: "Spec plate detail" },
  { id: "reel-04", src: vid(4), poster: poster(4), caption: "Shadow-box depth" },
  { id: "reel-05", src: vid(5), poster: poster(5), caption: "Glass front, no glare" },
  { id: "reel-06", src: vid(6), poster: poster(6), caption: "Marque by marque" },
  { id: "reel-07", src: vid(7), poster: poster(7), caption: "On the wall" },
  { id: "reel-08", src: vid(8), poster: poster(8), caption: "Packed to ship" },
  { id: "reel-09", src: vid(9), poster: poster(9), caption: "Golden-hour on the shelf" },
  { id: "reel-10", src: vid(10), poster: poster(10), caption: "Full garage wall" },
  { id: "reel-11", src: vid(11), poster: poster(11), caption: "The Chiron Sport, close up" },
];
