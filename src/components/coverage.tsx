"use client";

import { useI18n } from "@/lib/i18n-context";
import { ScrollReveal } from "./scroll-reveal";
import { AppIcon } from "@/components/app-icon";

const cities = [
  "Casablanca", "Rabat", "Marrakech", "Tanger", "Fès",
  "Agadir", "Meknès", "Oujda", "Kénitra", "Tétouan",
];

export function Coverage() {
  const { t } = useI18n();

  return (
    <section className="relative py-20 lg:py-24 bg-brand-deep overflow-hidden" id="coverage">
      {/* decorative blooms */}
      <div className="pointer-events-none absolute -top-24 -start-24 w-[420px] h-[420px] rounded-full bg-brand/15 blur-3xl animate-aurora" />
      <div className="pointer-events-none absolute -bottom-24 -end-24 w-[420px] h-[420px] rounded-full bg-emergency/10 blur-3xl animate-aurora-slow" />
      <div className="absolute inset-0 bg-grid-light mask-fade opacity-50" />
      <div className="relative max-w-[1240px] mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[13px] font-['Plus_Jakarta_Sans'] font-bold tracking-[0.14em] uppercase text-brand-xlight mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-emergency shadow-[0_0_0_4px_rgba(230,58,75,0.2)]" />
              <span>{t("cov_eyebrow")}</span>
            </span>
            <h2 className="text-[clamp(30px,4.6vw,46px)] mt-4 mb-3.5 text-white">{t("cov_h2")}</h2>
            <p className="text-brand-xlight/70 text-[clamp(16px,2vw,18px)] mb-8">{t("cov_p")}</p>

            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1.5 bg-white/8 border border-white/15 text-white/90 px-3.5 py-2 rounded-full text-sm"
                >
                  <AppIcon name="MapPin" className="w-3.5 h-3.5 text-brand-xlight" />
                  {city}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 bg-brand/20 border border-brand/30 text-brand-xlight px-3.5 py-2 rounded-full text-sm font-semibold">
                +20
              </span>
            </div>
          </ScrollReveal>

          {/* Network coverage map */}
          <ScrollReveal delay={0.2}>
            <div className="gradient-ring relative aspect-square rounded-[34px] bg-gradient-to-br from-brand-deeper/60 to-brand-deep/60 border border-white/10 overflow-hidden shadow-float">
              {/* grid + radar */}
              <div className="absolute inset-0 bg-grid-light opacity-60" />
              {/* concentric radar rings around the hub (Casablanca) */}
              {[160, 280, 400].map((size, i) => (
                <span
                  key={size}
                  className="absolute rounded-full border border-brand-light/15"
                  style={{
                    width: size,
                    height: size,
                    top: "52%",
                    left: "34%",
                    transform: "translate(-50%, -50%)",
                    animation: `glow-pulse ${4 + i}s ease-in-out infinite`,
                  }}
                />
              ))}

              {/* connecting lines from hub to other cities */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {[
                  { x: 42, y: 22 },
                  { x: 35, y: 70 },
                  { x: 60, y: 60 },
                  { x: 64, y: 38 },
                  { x: 50, y: 86 },
                ].map((p, i) => (
                  <line
                    key={i}
                    x1="34"
                    y1="52"
                    x2={p.x}
                    y2={p.y}
                    stroke="url(#linkGrad)"
                    strokeWidth="0.4"
                    strokeDasharray="1.5 1.5"
                  />
                ))}
                <defs>
                  <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3DA3CD" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#3DA3CD" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>

              {/* hub: Casablanca */}
              <span className="absolute" style={{ top: "52%", left: "34%", transform: "translate(-50%, -50%)" }}>
                <span className="absolute -inset-2 rounded-full bg-emergency/40 animate-pulse-ring" />
                <span className="relative flex items-center gap-1.5">
                  <span className="block w-4 h-4 rounded-full bg-emergency border-2 border-white shadow-emergency-glow" />
                  <span className="text-white text-xs font-semibold whitespace-nowrap bg-emergency/90 px-2 py-0.5 rounded-full">Casablanca</span>
                </span>
              </span>

              {/* satellite city pins with labels */}
              {[
                { top: "22%", left: "42%", name: "Rabat" },
                { top: "38%", left: "64%", name: "Fès" },
                { top: "60%", left: "60%", name: "Marrakech" },
                { top: "70%", left: "35%", name: "Agadir" },
                { top: "86%", left: "50%", name: "Tanger" },
              ].map((c, i) => (
                <span
                  key={c.name}
                  className="absolute flex items-center gap-1.5 group"
                  style={{ top: c.top, left: c.left, transform: "translate(-50%, -50%)" }}
                >
                  <span className="relative block w-2.5 h-2.5 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-brand-light animate-pulse-ring" style={{ animationDelay: `${i * 0.4}s` }} />
                    <span className="relative block w-2.5 h-2.5 rounded-full bg-brand-light border border-white/80 shadow-lg" />
                  </span>
                  <span className="text-white/85 text-[11px] font-medium whitespace-nowrap bg-white/10 backdrop-blur-sm px-1.5 py-0.5 rounded">{c.name}</span>
                </span>
              ))}

              {/* live badge */}
              <div className="absolute top-4 end-4 inline-flex items-center gap-1.5 glass-dark rounded-full px-3 py-1.5">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-white/90 text-xs font-semibold">Live · 24/7</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
