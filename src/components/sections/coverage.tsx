"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { whatsappHref } from "@/lib/contact";
import { CASABLANCA_REGION } from "@/lib/coverage-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AppIcon } from "@/components/ui/app-icon";
import { RevealImage } from "@/components/ui/reveal-image";

// Where MedCare works: Casablanca and its region today. Other cities are
// announced as coming, without names, until the client confirms them.
export function Coverage() {
  const { t, lang } = useI18n();

  return (
    <section id="zones" className="section-y bg-background">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <ScrollReveal className="lg:order-last">
          <p className="eyebrow">{t("cov_eyebrow")}</p>
          <h2 className="text-title mt-3">{t("cov_h2")}</h2>
          <p className="text-lead mt-4 text-ink-soft">{t("cov_p")}</p>

          <div className="mt-8 grid gap-7">
            <div>
              <h3 className="text-base">{t("cov_casa")}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {CASABLANCA_REGION.map((city) => (
                  <li
                    key={city.fr}
                    className="inline-flex items-center gap-1.5 rounded-full bg-tint-2 py-1.5 pe-3.5 ps-2.5 text-[0.9375rem] font-semibold text-brand-deeper"
                  >
                    <AppIcon name="MapPin" className="size-4 text-brand" />
                    {city[lang]}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base">{t("cov_other")}</h3>
              <p className="mt-3 inline-flex rounded-full border border-dashed border-muted-text/50 px-3.5 py-1.5 text-[0.9375rem] text-ink-soft">
                {t("cov_soon")}
              </p>
            </div>
          </div>

          <p className="mt-7 text-[0.9375rem] text-ink-soft">
            {t("cov_ask")}{" "}
            <a
              href={whatsappHref(t("wa_city"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-dark underline underline-offset-4 hover:text-brand-deeper"
            >
              {t("cov_ask_cta")}
              <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </a>
          </p>
        </ScrollReveal>

        <div>
          <RevealImage
            src="/casablanca.webp"
            alt={t("cov_img_alt")}
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="aspect-[4/3] rounded-[1.75rem] lg:aspect-[5/6]"
          >
            <p className="absolute bottom-3 start-3 z-[2] inline-flex items-center gap-1.5 rounded-full bg-white/95 py-1.5 pe-3.5 ps-2.5 text-sm font-semibold text-ink">
              <AppIcon name="MapPin" className="size-4 text-brand" />
              {t("ft_city")}
            </p>
          </RevealImage>
        </div>
      </div>
    </section>
  );
}
