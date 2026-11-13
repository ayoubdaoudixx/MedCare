"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useI18n } from "@/lib/i18n-context";
import { QUICK_NEEDS } from "@/lib/service-catalog";
import { AppIcon } from "@/components/ui/app-icon";
import { CallLink, WhatsAppLink } from "@/components/ui/cta";
import { HeroStory } from "@/components/sections/hero-story";

gsap.registerPlugin(useGSAP);

// First screen. On a phone the visitor sees, without scrolling: what MedCare
// does, that it is open, and the four most requested services. Calling and
// WhatsApp are in the fixed bar just below, so the hero does not repeat them
// until the layout has room (large screens). The visit itself is then told
// by the scroll story (hero-story.tsx).
export function Hero({ ready = true }: { ready?: boolean }) {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-in]", {
          opacity: 0,
          y: 18,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
          clearProps: "transform,opacity",
        });
      });
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-white">
      {/* On phones the three blocks stack as text, quick needs, story (the
          row dissolves with `contents`). On wide screens the row is a real
          two-column grid, and it is the part the story pins while it plays. */}
      <div className="shell flex flex-col gap-8 pb-10 pt-7 lg:block lg:pb-20 lg:pt-10">
        <div data-hero-row className="contents lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="order-1">
            <p data-hero-in className="text-[0.9375rem] font-semibold text-brand-dark">
              {t("hero_status")} · {t("hero_fact_zone")}
            </p>

            <h1 data-hero-in className="text-display mt-4">
              {t("hero_h1")}
            </h1>

            <p data-hero-in className="text-lead mt-4 max-w-[36ch] text-ink-soft">
              {t("hero_lead")}
            </p>

            <div data-hero-in className="mt-8 hidden flex-wrap gap-3 lg:flex">
              <CallLink place="hero" size="lg" />
              <WhatsAppLink place="hero" size="lg" variant="outline" />
            </div>

            <p data-hero-in className="mt-5 max-w-[40ch] text-[0.9375rem] text-ink-soft lg:mt-6">
              {t("hero_note")}
            </p>
          </div>

          {/* No entrance animation on this cell: a transform on an ancestor
              would break the pinned story. */}
          <div className="order-3">
            <HeroStory ready={ready} />
          </div>
        </div>

        <div data-hero-in className="order-2 lg:mt-14">
          <h2 className="font-sans text-base font-semibold tracking-normal text-ink">{t("hero_need")}</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
            {QUICK_NEEDS.map((need) => (
              <li key={need.slug}>
                <Link
                  href={`/services/${need.slug}`}
                  className="press group flex h-full min-h-[4.5rem] items-center gap-3 rounded-2xl bg-tint p-3 hover:bg-tint-2 lg:p-4"
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-xl bg-white ${
                      need.urgent ? "text-emergency" : "text-brand"
                    }`}
                  >
                    <AppIcon name={need.icon} className="size-6" />
                  </span>
                  <span className="flex-1 text-[0.9375rem] font-semibold leading-snug text-ink">
                    {t(need.label)}
                    {need.urgent && (
                      <span className="mt-0.5 block text-xs font-semibold text-emergency-dark">
                        {t("sv_urgent")}
                      </span>
                    )}
                  </span>
                  <ChevronRight
                    className="hidden size-4 shrink-0 text-brand-dark sm:block rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#services"
            className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-dark hover:underline"
          >
            {t("hero_all")}
            <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
