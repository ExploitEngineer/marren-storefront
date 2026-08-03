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
    id: "bilal",
    quote:
      "The Chiron build looks unreal on my desk. The die-cast detail and the printed spec plate together make it feel like a proper collector's piece, not a toy.",
    name: "Bilal A.",
    location: "Lahore",
    context: "Bugatti Chiron, A4",
    rating: 5,
  },
  {
    id: "daniyal",
    quote:
      "Ordered the Porsche Podium set for my office wall and it just worked. Three frames, one template, up straight in twenty minutes.",
    name: "Daniyal R.",
    location: "Karachi",
    context: "The Porsche Podium",
    rating: 5,
  },
  {
    id: "sana",
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
  {
    id: "hamza",
    quote:
      "Packaging was insane, double-boxed with foam corners. The Huracán arrived without a scratch and the yellow pops against a dark wall.",
    name: "Hamza K.",
    location: "Rawalpindi",
    context: "Lamborghini Huracán, A3",
    rating: 5,
  },
  {
    id: "ayesha",
    quote:
      "I run a car detailing studio and put the GT-R behind the counter. Every second customer asks where I got it. Best marketing I never planned.",
    name: "Ayesha M.",
    location: "Lahore",
    context: "Nissan GT-R R35, A3",
    rating: 5,
  },
  {
    id: "daniel",
    quote:
      "The glass front and the depth of the shadow box are what sell it. Photos do not do the layering justice.",
    name: "Daniel S.",
    location: "London",
    context: "Bugatti Chiron Sport, A4",
    rating: 5,
  },
  {
    id: "zain",
    quote:
      "Second order from Aurora. The 918 Spyder joined the Chiron and now I have a proper hypercar wall going. Already eyeing the next one.",
    name: "Zain H.",
    location: "Karachi",
    context: "Porsche 918 Spyder, A4",
    rating: 5,
  },
];
