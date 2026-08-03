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
  { id: "frames", value: 6200, suffix: "+", label: "Frames hung worldwide" },
  { id: "marques", value: 12, label: "Marques in the garage" },
  { id: "rating", value: 4.9, decimals: 1, suffix: "/5", label: "Average build rating" },
  { id: "ready", value: 100, suffix: "%", label: "Ready to hang, day one" },
];
