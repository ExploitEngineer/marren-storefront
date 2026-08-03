/** Placeholder press / community mentions - replace with real coverage. */
export const press: string[] = ["Top Gear", "Motor1", "Hagerty", "Petrolicious", "Carwow"];

export interface TrustSignal {
  title: string;
  detail: string;
  /** lucide-react icon name resolved in the component. */
  icon: "Truck" | "ShieldCheck" | "RotateCcw" | "Gauge" | "MessageCircle";
}

export const trustSignals: TrustSignal[] = [
  { title: "Free shipping over $75", detail: "Flat $6 under that.", icon: "Truck" },
  { title: "Lifetime guarantee", detail: "Covered against defects, for good.", icon: "ShieldCheck" },
  { title: "30-day returns", detail: "Change your mind, no fuss.", icon: "RotateCcw" },
  { title: "Real die-cast detail", detail: "Genuine metal models, hand-mounted.", icon: "Gauge" },
  { title: "Real humans", detail: "Answers within a business day.", icon: "MessageCircle" },
];
