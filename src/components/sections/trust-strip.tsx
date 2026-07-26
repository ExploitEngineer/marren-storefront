import { Truck, ShieldCheck, RotateCcw, Gauge, MessageCircle, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { trustSignals } from "@/content/press";

const icons: Record<string, LucideIcon> = {
  Truck,
  ShieldCheck,
  RotateCcw,
  Gauge,
  MessageCircle,
};

export function TrustStrip() {
  return (
    <Section tone="raise" size="sm">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {trustSignals.map((signal) => {
            const Icon = icons[signal.icon];
            return (
              <li key={signal.title} className="flex flex-col items-start gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-race-500/10 text-race-500">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-carbon-50">{signal.title}</p>
                  <p className="mt-0.5 text-sm text-carbon-300">{signal.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
