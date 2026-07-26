import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/content/faqs";

interface FaqSectionProps {
  faqs: Faq[];
  heading?: string;
  id?: string;
  tone?: "cream" | "surface" | "oat";
}

export function FaqSection({ faqs, heading = "Good to know.", id, tone = "cream" }: FaqSectionProps) {
  return (
    <Section id={id} tone={tone}>
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 className="font-heading text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-carbon-50">
          {heading}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-carbon-800">
              <AccordionTrigger className="py-5 text-left font-sans text-base font-medium text-carbon-50 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-carbon-300">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
