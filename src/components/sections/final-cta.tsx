"use client";

import { useI18n } from "@/lib/i18n-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AppIcon } from "@/components/ui/app-icon";

export function FinalCta() {
  const { t } = useI18n();

  return (
    <section className="py-20 lg:py-24" id="contact">
      <div className="max-w-[1240px] mx-auto px-5">
        <ScrollReveal>
          <div className="gradient-ring bg-gradient-to-br from-brand via-brand-dark to-brand-deeper rounded-[34px] p-10 lg:p-16 text-center relative overflow-hidden shadow-float">
            {/* Decorative */}
            <div className="absolute inset-0 bg-grid-light opacity-40" />
            <div className="absolute -start-20 -top-20 w-60 h-60 rounded-full bg-white/10 blur-2xl animate-aurora" />
            <div className="absolute -end-20 -bottom-20 w-60 h-60 rounded-full bg-emergency/15 blur-2xl animate-aurora-slow" />

            <div className="relative z-10">
              <h2 className="text-white text-[clamp(28px,4vw,42px)] mb-4">{t("cta_h2")}</h2>
              <p className="text-brand-xlight/80 text-[clamp(15px,1.8vw,17px)] mb-8 max-w-lg mx-auto">
                {t("cta_p")}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="tel:+212522000000"
                  className="inline-flex items-center gap-2.5 font-['Plus_Jakarta_Sans'] font-bold text-[16.5px] bg-emergency text-white px-7 py-4.5 rounded-full shadow-[0_16px_34px_-12px_rgba(230,58,75,0.5)] hover:-translate-y-0.5 hover:bg-emergency-dark transition-all"
                >
                  <AppIcon name="PhoneCalling" className="w-5 h-5" />
                  <span>{t("cta_b1")}</span>
                </a>
                <a
                  href="https://wa.me/212600000000"
                  className="inline-flex items-center gap-2.5 font-['Plus_Jakarta_Sans'] font-bold text-[16.5px] bg-white/15 text-white border border-white/25 backdrop-blur-md px-7 py-4.5 rounded-full hover:bg-white/25 hover:-translate-y-0.5 transition-all"
                >
                  <AppIcon name="Chat" className="w-5 h-5" />
                  <span>{t("cta_b2")}</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
