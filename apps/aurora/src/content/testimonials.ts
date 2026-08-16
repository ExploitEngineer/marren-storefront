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
      "The gold ring clock is the first thing everyone notices now. Photos do not do the finish justice, it looks properly premium in person.",
    name: "Bilal A.",
    location: "Lahore",
    context: "Aurelia Gold Wall Clock",
    rating: 5,
  },
  {
    id: "daniyal",
    quote:
      "Put the Messi LED above my desk and the glow at night is unreal. Solid steel, clean cut, and it arrived ready to plug in.",
    name: "Daniyal R.",
    location: "Karachi",
    context: "Messi 10 LED Silhouette",
    rating: 5,
  },
  {
    id: "sana",
    quote:
      "Gifted the horse LED to my dad for his study. He keeps it on all evening now. The backlight is warm, not harsh.",
    name: "Sana L.",
    location: "Islamabad",
    context: "Galloping Horse LED Art",
    rating: 5,
  },
  {
    id: "hamza",
    quote:
      "The custom M4 piece is exactly my car, down to the grille. Genuinely the best thing on my garage wall.",
    name: "Hamza K.",
    location: "Rawalpindi",
    context: "Custom Car Metal Art",
    rating: 5,
  },
  {
    id: "ayesha",
    quote:
      "I run a barbershop and hung the Ronaldo LED by the mirrors. Clients ask about it every single day.",
    name: "Ayesha M.",
    location: "Lahore",
    context: "Ronaldo 7 LED Silhouette",
    rating: 5,
  },
  {
    id: "daniel",
    quote:
      "The vinyl BMW clock is such a clever idea, a real record with the roundel cut into it. Packaging was spotless too.",
    name: "Daniel S.",
    location: "Dubai",
    context: "BMW Vinyl Record Clock",
    rating: 5,
  },
  {
    id: "zain",
    quote:
      "Second order from Decor.HBX. The AMG GT joined the M4 and now I have a proper backlit wall. Already planning the next one.",
    name: "Zain H.",
    location: "Karachi",
    context: "Mercedes-AMG GT LED Art",
    rating: 5,
  },
  {
    id: "marcus",
    quote:
      "The Aventador line art is so clean it looks architectural. Understated but everyone asks where it is from.",
    name: "Marcus T.",
    location: "London",
    context: "Lamborghini Aventador Line Art",
    rating: 5,
  },
];
