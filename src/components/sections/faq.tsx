"use client";

import { useI18n } from "@/lib/i18n-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const QUESTIONS = [
  { q: "faq1_q", a: "faq1_a" },
  { q: "faq2_q", a: "faq2_a" },
  { q: "faq3_q", a: "faq3_a" },
  { q: "faq4_q", a: "faq4_a" },
  { q: "faq5_q", a: "faq5_a" },
] as const;

// The questions people ask before they call: price, hours, booking, area,
// and what to do when it is serious.
export function Faq() {
  const { t } = useI18n();

  return (
    <section id="questions" className="section-y bg-white">
      <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <ScrollReveal>
          <p className="eyebrow">{t("faq_eyebrow")}</p>
          <h2 className="text-title mt-3">{t("faq_h2")}</h2>
        </ScrollReveal>

        <ScrollReveal>
          <Accordion className="border-y border-line">
            {QUESTIONS.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-line">
                <AccordionTrigger className="min-h-14 items-center gap-4 rounded-none py-4 text-start text-[1.0625rem] font-semibold text-ink hover:text-brand-dark hover:no-underline **:data-[slot=accordion-trigger-icon]:ms-auto **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-brand-dark">
                  {t(item.q)}
                </AccordionTrigger>
                <AccordionContent className="pb-5 pe-9 text-base leading-relaxed text-ink-soft">
                  <p>{t(item.a)}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
