export interface Stat {
  id: string;
  /** Numeric target for the count-up. */
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { id: "pieces", value: 6200, suffix: "+", label: "Pieces hung worldwide" },
  { id: "designs", value: 120, suffix: "+", label: "Designs in the catalog" },
  { id: "rating", value: 4.9, decimals: 1, suffix: "/5", label: "Average customer rating" },
  { id: "ready", value: 100, suffix: "%", label: "Ready to hang, day one" },
];
