"use client";

import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { ScrollReveal } from "./scroll-reveal";
import { AnimatedCounter } from "./animated-counter";
import { AuroraBackground } from "./aurora-background";
import { AppIcon } from "@/components/app-icon";

const statIcons = ["Ambulance", "Clock", "MapPin", "Users"];

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden pt-8 lg:pt-12 pb-0">
      <AuroraBackground />
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Text */}
          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 bg-tint-2 border border-line rounded-full px-4 py-2 text-sm font-['Plus_Jakarta_Sans'] font-semibold text-brand-dark mb-3">
                <span className="relative flex items-center justify-center">
                  <span className="absolute w-6 h-6 rounded-full bg-emergency/20 animate-pulse-ring" />
                  <span className="relative bg-emergency text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {t("hero_badge_pill")}
                  </span>
                </span>
                <span>{t("hero_badge")}</span>
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-[clamp(38px,5.8vw,62px)] leading-[1.05] mb-3">
                <span className="block">{t("hero_h1a")}</span>
                <span className="block text-gradient-brand">
                  {t("hero_h1b")}
                </span>
                <span className="block">{t("hero_h1c")}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-muted-text text-[clamp(16px,2vw,18px)] leading-relaxed mb-5 max-w-[520px]">
                {t("hero_lead")}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-3 mb-5">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2.5 font-['Plus_Jakarta_Sans'] font-bold text-[16.5px] bg-white text-brand-dark px-7 py-4.5 rounded-full shadow-sm border border-line hover:-translate-y-0.5 hover:border-brand-xlight hover:text-brand transition-all"
                >
                  <span>{t("hero_cta2")}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {["K", "Y", "S", "+"].map((letter, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 border-white ${
                        i === 0 ? "bg-brand" : i === 1 ? "bg-emergency" : i === 2 ? "bg-brand-dark" : "bg-brand-deeper"
                      }`}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-text">
                    <b className="text-ink">{t("hero_rating")}</b> · {t("hero_trust")}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual */}
          <ScrollReveal delay={0.2} className="relative">
            <div className="relative">
              {/* Ambient glow behind photo */}
              <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-brand/25 via-brand-xlight/20 to-emergency/10 blur-3xl animate-glow-pulse" />

              {/* Main photo */}
              <div className="gradient-ring relative aspect-[5/4] rounded-[28px] bg-gradient-to-br from-tint via-brand-xlight/30 to-tint-2 overflow-hidden shadow-float">
                <Image
                  src="/hero.webp"
                  alt="Ambulance & équipe médicale"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {/* gentle top-down tint for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/20 via-transparent to-transparent" />
              </div>

              {/* Floating Cards (glass) */}
              <div className="absolute -start-4 lg:-start-8 top-1/4 glass rounded-2xl p-3.5 flex items-center gap-3 animate-float z-10">
                <div className="w-11 h-11 rounded-xl bg-emergency-tint flex items-center justify-center shrink-0">
                  <AppIcon name="Siren" className="w-5 h-5 text-emergency" />
                </div>
                <div>
                  <b className="text-sm text-ink block font-['Plus_Jakarta_Sans']">{t("fc1_t")}</b>
                  <span className="text-xs text-muted-text">{t("fc1_s")}</span>
                </div>
              </div>

              <div className="absolute -end-4 lg:-end-8 top-[15%] glass rounded-2xl p-3.5 flex items-center gap-3 animate-float-delayed z-10">
                <div className="w-11 h-11 rounded-xl bg-tint flex items-center justify-center shrink-0">
                  <AppIcon name="BadgeCheck" className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <b className="text-sm text-ink block font-['Plus_Jakarta_Sans']">{t("fc2_t")}</b>
                  <span className="text-xs text-muted-text">{t("fc2_s")}</span>
                </div>
              </div>

              <div className="absolute -end-2 lg:-end-6 bottom-[20%] glass rounded-2xl p-3.5 flex items-center gap-3 animate-float-delayed-2 z-10">
                <div className="w-11 h-11 rounded-xl bg-tint flex items-center justify-center shrink-0">
                  <AppIcon name="Activity" className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <b className="text-sm text-ink block font-['Plus_Jakarta_Sans']">{t("fc3_t")}</b>
                  <span className="text-xs text-muted-text">{t("fc3_s")}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats Bar */}
        <ScrollReveal className="mt-10 lg:mt-12">
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px bg-line-2 rounded-[26px] shadow-card border border-line-2 overflow-hidden">
            {/* top accent line */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand via-brand-light to-emergency z-10" />
            {[
              { n: t("st1_n"), l: t("st1_l"), counter: null },
              { n: null, l: t("st2_l"), counter: { target: 20, suffix: t("st2_u") } },
              { n: null, l: t("st3_l"), counter: { target: 30, suffix: t("st3_u") } },
              { n: null, l: t("st4_l"), counter: { target: 12, suffix: t("st4_u") } },
            ].map((stat, i) => {
               
              return (
                <div
                  key={i}
                  className="group bg-white p-7 lg:p-8 flex flex-col items-center text-center transition-colors duration-300 hover:bg-tint-2"
                >
                  <div className="w-11 h-11 rounded-xl bg-tint flex items-center justify-center mb-3 group-hover:bg-brand group-hover:scale-110 transition-all duration-300">
                    <AppIcon name={statIcons[i]} className="w-5 h-5 text-brand group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-[clamp(28px,4vw,38px)] font-['Plus_Jakarta_Sans'] font-extrabold text-brand tabular-nums leading-none">
                    {stat.counter ? (
                      <AnimatedCounter target={stat.counter.target} suffix={stat.counter.suffix} />
                    ) : (
                      stat.n
                    )}
                  </div>
                  <div className="text-muted-text text-sm mt-2">{stat.l}</div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
