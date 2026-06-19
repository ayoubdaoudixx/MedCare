"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import { ScrollReveal } from "./scroll-reveal";
import { AppIcon } from "@/components/app-icon";

export function EmergencyBand() {
  const { t } = useI18n();
  const beaconRef = useRef<HTMLDivElement>(null);
  const inView = useInView(beaconRef, { once: true, margin: "-12%" });
  // Spinning only starts after the slide-in entrance finishes.
  const [spinning, setSpinning] = useState(false);

  return (
    <section className="bg-gradient-to-r from-brand-deep via-brand-deeper to-brand-deep py-14 lg:py-16 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -start-20 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-brand/10 blur-3xl animate-aurora" />
      <div className="absolute -end-20 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-emergency/10 blur-3xl animate-aurora-slow" />
      <div className="absolute inset-0 bg-grid-light opacity-40" />

      <div className="max-w-[1240px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <ScrollReveal>
          <h2 className="text-white text-[clamp(28px,4vw,42px)] text-center md:text-start">
            <span>{t("em_h2a")}</span>{" "}
            <span className="text-emergency">{t("em_h2b")}</span>
          </h2>
          <p className="text-brand-xlight/80 text-[clamp(15px,1.8vw,17px)] mt-2 max-w-md text-center md:text-start">
            {t("em_p")}
          </p>
        </ScrollReveal>

        {/* Spinning emergency beacon + phone */}
        <motion.div
          ref={beaconRef}
          initial={{ opacity: 0, x: -120 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          onAnimationComplete={() => setSpinning(true)}
          className="flex flex-col items-center gap-5 shrink-0"
        >
          {/* Beacon */}
          <div className="relative flex items-center justify-center" style={{ perspective: "700px" }}>
            {/* pulsing red halo */}
            <span className="absolute w-40 h-40 rounded-full bg-emergency/25 blur-2xl animate-glow-pulse" />
            <span className="absolute w-24 h-24 rounded-full bg-emergency/40 animate-pulse-ring" />
            {/* sweeping light beam */}
            <span
              className={`absolute w-44 h-44 rounded-full ${spinning ? "animate-beam" : ""}`}
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(230,58,75,0.45), transparent 35%, transparent 65%, rgba(230,58,75,0.45))",
                maskImage: "radial-gradient(circle, transparent 28%, #000 30%)",
                WebkitMaskImage: "radial-gradient(circle, transparent 28%, #000 30%)",
              }}
            />
            {/* the rotating beacon image */}
            <Image
              src="/urgence.webp"
              alt={t("em_call_s")}
              width={130}
              height={150}
              priority
              className={`relative z-10 w-[100px] h-auto drop-shadow-[0_12px_30px_rgba(230,58,75,0.5)] [transform-style:preserve-3d] ${spinning ? "animate-spin-y" : ""}`}
            />
          </div>

          {/* Phone icon + number */}
          <a
            href="tel:+212522000000"
            className="group flex items-center gap-4 glass-dark rounded-full px-5 py-3 hover:bg-white/20 transition-all"
          >
            <span className="relative flex items-center justify-center">
              <span className="absolute w-12 h-12 rounded-full bg-emergency/30 animate-pulse-ring" />
              <span className="relative w-11 h-11 rounded-full bg-emergency flex items-center justify-center shadow-emergency-glow group-hover:scale-105 transition-transform">
                <AppIcon name="PhoneCalling" className="w-5 h-5 text-white" />
              </span>
            </span>
            <div className="text-start">
              <small className="text-brand-xlight/70 text-xs block">{t("em_call_s")}</small>
              <b className="text-white text-xl font-['Plus_Jakarta_Sans'] tracking-wide">{t("em_call_n")}</b>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
