export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  /** What they bought, for a touch of specificity. */
  context: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "priya",
    quote:
      "The Chiron build looks unreal on my desk. The die-cast detail and the printed spec plate together make it feel like a proper collector's piece, not a toy.",
    name: "Bilal A.",
    location: "Lahore",
    context: "Bugatti Chiron, A4",
    rating: 5,
  },
  {
    id: "daniel",
    quote:
      "Ordered the Porsche Podium set for my office wall and it just worked. Three frames, one template, up straight in twenty minutes.",
    name: "Daniyal R.",
    location: "Karachi",
    context: "The Porsche Podium",
    rating: 5,
  },
  {
    id: "sofia",
    quote:
      "Gifted the R8 to my brother and he hasn't stopped talking about it. The doors-up mount is a genuinely clever bit of framing.",
    name: "Sana L.",
    location: "Islamabad",
    context: "Audi R8 V10, A4",
    rating: 5,
  },
  {
    id: "marcus",
    quote:
      "The 911 Carrera S is thinner and cleaner in person than online, in the best way. It elevated the whole shelf.",
    name: "Marcus T.",
    location: "Dubai",
    context: "Porsche 911 Carrera S, A5",
    rating: 5,
  },
];
