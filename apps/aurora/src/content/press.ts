/** Placeholder community mentions - replace with real coverage. */
export const press: string[] = ["Sialkot Design Week", "HomeStyle PK", "Interiors Karachi", "The Wall Club", "Made In Pakistan"];

export interface TrustSignal {
  title: string;
  detail: string;
  /** lucide-react icon name resolved in the component. */
  icon: "Truck" | "ShieldCheck" | "RotateCcw" | "Sparkles" | "MessageCircle";
}

export const trustSignals: TrustSignal[] = [
  { title: "Free shipping over Rs 7,500", detail: "Flat Rs 350 under that.", icon: "Truck" },
  { title: "Lifetime guarantee", detail: "Covered against defects, for good.", icon: "ShieldCheck" },
  { title: "30-day returns", detail: "Change your mind, no fuss.", icon: "RotateCcw" },
  { title: "Cut and finished by hand", detail: "Real steel and acrylic, never stickers.", icon: "Sparkles" },
  { title: "Real humans", detail: "Answers within a business day.", icon: "MessageCircle" },
];
