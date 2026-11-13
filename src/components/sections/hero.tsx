"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useI18n } from "@/lib/i18n-context";
import { QUICK_NEEDS } from "@/lib/service-catalog";
import { AppIcon } from "@/components/ui/app-icon";
import { CallLink, WhatsAppLink } from "@/components/ui/cta";
import { ChatDemo } from "@/components/ui/chat-demo";
import { RevealImage } from "@/components/ui/reveal-image";

gsap.registerPlugin(useGSAP);

// First screen. On a phone the visitor sees, without scrolling: what MedCare
// does, that it is open, and the four most requested services. Calling and
// WhatsApp are in the fixed bar just below, so the hero does not repeat them
// until the layout has room (large screens).
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
      <div className="shell grid gap-8 pb-10 pt-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-20 lg:pt-16">
        <div>
          <p
            data-hero-in
            className="inline-flex items-center gap-2.5 rounded-full bg-tint py-1.5 pe-3.5 ps-2.5 text-sm font-semibold text-brand-dark"
          >
            <span className="relative grid size-2.5 place-items-center">
              <span className="animate-pulse-ring absolute size-2.5 rounded-full bg-brand" />
              <span className="relative size-2.5 rounded-full bg-brand" />
            </span>
            {t("hero_status")}
          </p>

          <h1 data-hero-in className="text-display mt-5">
            {t("hero_h1")}
          </h1>

          <p data-hero-in className="text-lead mt-4 max-w-[36ch] text-ink-soft">
            {t("hero_lead")}
          </p>

          <div data-hero-in className="mt-8 hidden flex-wrap gap-3 lg:flex">
            <CallLink place="hero" size="lg" />
            <WhatsAppLink place="hero" size="lg" variant="outline" />
          </div>

          <ul data-hero-in className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] text-ink-soft lg:mt-6">
            {(["hero_fact_zone", "hero_fact_quote", "hero_fact_lang"] as const).map((key) => (
              <li key={key} className="inline-flex items-center gap-2">
                <Check className="size-4 shrink-0 text-brand" strokeWidth={2.5} aria-hidden="true" />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        <div data-hero-in className="order-last lg:order-none">
          <figure className="relative">
            <RevealImage
              src="/medecin-domicile.webp"
              alt={t("hero_img_alt")}
              sizes="(max-width: 1024px) 100vw, 46vw"
              priority
              play={ready}
              className="aspect-[4/5] rounded-[1.75rem] sm:aspect-[4/3] lg:aspect-[5/6]"
            >
              {/* Soft shade so the messages stay readable over the photo. */}
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[2] h-2/5 bg-gradient-to-t from-ink/45 to-transparent" />
            </RevealImage>
            {/* How a request starts: one message, one answer. Illustration only. */}
            <figcaption className="absolute inset-x-0 bottom-0 z-[3] p-3.5 sm:p-5">
              <ChatDemo
                variant="bare"
                messages={[
                  { from: "visitor", text: t("hero_chat_in") },
                  { from: "medcare", text: t("hero_chat_out") },
                ]}
              />
            </figcaption>
          </figure>
        </div>

        <div data-hero-in className="lg:col-span-2">
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
