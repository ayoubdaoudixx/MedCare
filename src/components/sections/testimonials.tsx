"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const testimonials = [
  { key: "t1", avatar: "K", color: "bg-brand" },
  { key: "t2", avatar: "Y", color: "bg-emergency" },
  { key: "t3", avatar: "S", color: "bg-brand-dark" },
] as const;

export function Testimonials() {
  const { t, dir } = useI18n();
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const go = useCallback((i: number) => {
    setActive(((i % total) + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(() => go(active + 1), 6000);
    return () => clearInterval(timer);
  }, [active, go]);

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-[1240px] mx-auto px-5">
        <ScrollReveal className="max-w-[660px] mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-tint px-4 py-2 rounded-full text-[13px] font-['Plus_Jakarta_Sans'] font-bold tracking-[0.14em] uppercase text-brand-dark mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-emergency shadow-[0_0_0_4px_var(--color-emergency-tint)]" />
            <span>{t("tst_eyebrow")}</span>
          </span>
          <h2 className="text-[clamp(30px,4.6vw,46px)] mt-4">{t("tst_h2")}</h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{
                transform: `translateX(${dir === "rtl" ? "" : "-"}${active * 100}%)`,
              }}
            >
              {testimonials.map((tst) => (
                <div key={tst.key} className="w-full shrink-0 px-2">
                  <div className="max-w-3xl mx-auto">
                    <div className="relative bg-white rounded-[26px] shadow-card border border-line-2 p-8 lg:p-12 flex flex-col md:flex-row gap-8 overflow-hidden">
                      {/* oversized decorative quote */}
                      <Quote className="absolute -top-3 end-4 w-28 h-28 text-tint -scale-x-100 pointer-events-none" />
                      {/* Branded avatar medallion */}
                      <div className="w-full md:w-48 shrink-0 flex md:block items-center gap-4">
                        <div className="relative aspect-square w-24 md:w-full rounded-2xl bg-gradient-to-br from-brand via-brand-dark to-brand-deeper overflow-hidden gradient-ring flex items-center justify-center shadow-brand-glow">
                          <div className="absolute inset-0 bg-grid-light opacity-40" />
                          <span className="relative text-white font-['Plus_Jakarta_Sans'] font-extrabold text-4xl md:text-6xl">
                            {tst.avatar}
                          </span>
                        </div>
                        <div className="md:hidden">
                          <b className="text-ink text-sm font-['Plus_Jakarta_Sans'] block">{t(`${tst.key}_n` as any)}</b>
                          <span className="text-muted-text text-xs">{t(`${tst.key}_r` as any)}</span>
                        </div>
                      </div>
                      <div className="relative flex-1">
                        <Quote className="w-8 h-8 text-brand mb-4" />
                        <p className="text-ink text-[clamp(16px,1.8vw,18px)] leading-relaxed mb-6">
                          {t(`${tst.key}_q` as any)}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${tst.color} text-white flex items-center justify-center font-bold text-sm shrink-0`}>
                            {tst.avatar}
                          </div>
                          <div>
                            <b className="text-ink text-sm font-['Plus_Jakarta_Sans'] block">
                              {t(`${tst.key}_n` as any)}
                            </b>
                            <span className="text-muted-text text-xs">{t(`${tst.key}_r` as any)}</span>
                            <div className="flex gap-0.5 mt-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(active - 1)}
              className="w-11 h-11 rounded-full border border-line bg-white flex items-center justify-center hover:border-brand-xlight hover:text-brand transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === active ? "bg-brand w-7" : "bg-line hover:bg-brand-xlight"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(active + 1)}
              className="w-11 h-11 rounded-full border border-line bg-white flex items-center justify-center hover:border-brand-xlight hover:text-brand transition-colors"
              aria-label="Next"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
