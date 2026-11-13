"use client";

import { useI18n } from "@/lib/i18n-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AppIcon } from "@/components/ui/app-icon";
import { RevealImage } from "@/components/ui/reveal-image";

const COMMITMENTS = [
  { icon: "BadgeCheck", t: "wf1_t", d: "wf1_d" },
  { icon: "Wallet", t: "wf2_t", d: "wf2_d" },
  { icon: "Clock", t: "wf3_t", d: "wf3_d" },
  { icon: "Ambulance", t: "wf4_t", d: "wf4_d" },
] as const;

// What MedCare commits to. Only statements the client can stand behind today:
// no patient counts, ratings or response times until real figures exist.
export function WhyUs() {
  const { t } = useI18n();

  return (
    <section id="engagements" className="section-y bg-white">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <ScrollReveal>
            <p className="eyebrow">{t("why_eyebrow")}</p>
            <h2 className="text-title mt-3">{t("why_h2")}</h2>
          </ScrollReveal>

          <ScrollReveal stagger className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {COMMITMENTS.map((item) => (
              <div key={item.t} className="flex gap-4 sm:block">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-tint text-brand">
                  <AppIcon name={item.icon} className="size-6" />
                </span>
                <div className="sm:mt-4">
                  <h3 className="text-lg">{t(item.t)}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{t(item.d)}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>

        <RevealImage
          src="/garde-malade.webp"
          alt={t("why_img_alt")}
          sizes="(max-width: 1024px) 100vw, 46vw"
          className="aspect-[4/3] rounded-[1.75rem] lg:aspect-[5/6]"
        />
      </div>
    </section>
  );
}
