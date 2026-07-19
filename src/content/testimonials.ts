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
      "The walnut frame made my print look like it came from a gallery. It arrived in two days and I had it on the wall before dinner.",
    name: "Priya M.",
    location: "Austin, TX",
    context: "Walnut Studio, 16×20",
    rating: 5,
  },
  {
    id: "daniel",
    quote:
      "I ordered a Gallery Wall Set for the stairwell and it just worked. The hanging template saved me an afternoon of guesswork.",
    name: "Daniel R.",
    location: "Portland, OR",
    context: "The Corridor",
    rating: 5,
  },
  {
    id: "sofia",
    quote:
      "I have bought cheap frames my whole life. This is the first one that felt worth keeping.",
    name: "Sofia L.",
    location: "Chicago, IL",
    context: "Oak Studio, 11×14",
    rating: 5,
  },
  {
    id: "marcus",
    quote:
      "The brass profile is thinner and warmer than it looked online, in the best way. It elevated the whole room.",
    name: "Marcus T.",
    location: "Brooklyn, NY",
    context: "Brass Sliver, 8×10",
    rating: 5,
  },
];
