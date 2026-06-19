"use client";

import { useI18n } from "@/lib/i18n-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const steps = [
  { key: "stp1", num: "01" },
  { key: "stp2", num: "02" },
  { key: "stp3", num: "03" },
  { key: "stp4", num: "04" },
] as const;

export function Steps() {
  const { t } = useI18n();

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-[1240px] mx-auto px-5">
        <ScrollReveal className="max-w-[660px] mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-tint px-4 py-2 rounded-full text-[13px] font-['Plus_Jakarta_Sans'] font-bold tracking-[0.14em] uppercase text-brand-dark mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-emergency shadow-[0_0_0_4px_var(--color-emergency-tint)]" />
            <span>{t("stp_eyebrow")}</span>
          </span>
          <h2 className="text-[clamp(30px,4.6vw,46px)] mt-4 mb-3.5">{t("stp_h2")}</h2>
          <p className="text-muted-text text-[clamp(16px,2vw,18px)]">{t("stp_p")}</p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.key} delay={0.1 * i}>
              <div className="relative text-center group">
                {/* Number circle */}
                <div className="relative mx-auto w-16 h-16 mb-5">
                  {/* halo */}
                  <div className="absolute inset-0 rounded-full bg-brand/25 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="gradient-ring relative w-16 h-16 rounded-full bg-gradient-to-br from-brand to-brand-dark text-white flex items-center justify-center font-['Plus_Jakarta_Sans'] font-extrabold text-xl shadow-brand-glow group-hover:scale-110 transition-transform duration-300">
                    {step.num}
                  </div>
                </div>
                {/* Connector line (not on last) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 start-[calc(50%+44px)] w-[calc(100%-88px)] h-[2px] bg-gradient-to-r from-brand-xlight via-brand-xlight/60 to-line-2">
                    <span className="absolute -top-[3px] start-0 w-2 h-2 rounded-full bg-brand-xlight" />
                  </div>
                )}
                <h3 className="text-lg font-['Plus_Jakarta_Sans'] font-bold mb-2">
                  {t(`${step.key}_t` as any)}
                </h3>
                <p className="text-muted-text text-sm leading-relaxed">
                  {t(`${step.key}_d` as any)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
