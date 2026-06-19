"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AppIcon } from "@/components/ui/app-icon";

const features = [
  { key: "wf1", icon: "ShieldCheck" },
  { key: "wf2", icon: "Zap" },
  { key: "wf3", icon: "HeartPulse" },
  { key: "wf4", icon: "Wallet" },
] as const;

export function WhyUs() {
  const { t } = useI18n();

  return (
    <section className="py-20 lg:py-24" id="why">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual */}
          <ScrollReveal>
            <div className="relative">
              {/* ambient glow */}
              <div className="absolute -inset-6 -z-10 rounded-[44px] bg-gradient-to-br from-brand/20 to-brand-xlight/20 blur-3xl animate-glow-pulse" />
              <div className="gradient-ring relative aspect-[4/5] rounded-[34px] bg-gradient-to-br from-tint via-brand-xlight/30 to-tint-2 overflow-hidden shadow-float">
                <Image
                  src="/pourquoi-medcare.webp"
                  alt="Soin infirmier à domicile"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/25 via-transparent to-transparent" />
              </div>
              {/* Experience badge */}
              <div className="absolute -end-4 lg:-end-6 bottom-8 bg-gradient-to-br from-brand to-brand-dark text-white rounded-2xl p-5 shadow-brand-glow gradient-ring">
                <div className="text-3xl font-['Plus_Jakarta_Sans'] font-extrabold">{t("why_badge_n")}</div>
                <div className="text-sm text-brand-xlight">{t("why_badge_l")}</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={0.1}>
            <span className="inline-flex items-center gap-2 bg-tint px-4 py-2 rounded-full text-[13px] font-['Plus_Jakarta_Sans'] font-bold tracking-[0.14em] uppercase text-brand-dark mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-emergency shadow-[0_0_0_4px_var(--color-emergency-tint)]" />
              <span>{t("why_eyebrow")}</span>
            </span>
            <h2 className="text-[clamp(30px,4.6vw,46px)] mt-4 mb-3.5">{t("why_h2")}</h2>
            <p className="text-muted-text text-[clamp(16px,2vw,18px)] mb-8">{t("why_p")}</p>

            <div className="space-y-6">
              {features.map((feat) => {
                return (
                  <div key={feat.key} className="group flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-tint flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-brand-dark group-hover:shadow-brand-glow transition-all duration-300">
                      <AppIcon name={feat.icon} className="w-6 h-6 text-brand group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-base font-['Plus_Jakarta_Sans'] font-bold mb-1 group-hover:text-brand transition-colors duration-300">
                        {t(`${feat.key}_t` as any)}
                      </h3>
                      <p className="text-muted-text text-sm">
                        {t(`${feat.key}_d` as any)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
