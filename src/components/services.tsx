"use client";

import { useState, useRef, useEffect, useCallback, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { ScrollReveal } from "./scroll-reveal";
import { Badge } from "@/components/ui/badge";

const serviceImages: Record<string, string> = {
  "ambulance": "/ambulance.png",
  "médecin à domicile": "/medcare3d.png",
  "infirmière à domicile": "/infirmière à domicile.png",
  "garde-malade": "/garde-malade.png",
  "téléconsultation": "/téléconsultation.png",
  "prélèvement / analyses": "/prélèvement  analyses.png",
  "rapatriement": "/rapatriement.png",
  "équipe événementielle": "/équipe événementielle.jpg",
  "personne âgée": "/personne âgée.jpg",
};

const services: { key: string; img: string; slug: string; urgent?: boolean }[] = [
  { key: "s1", img: "ambulance", slug: "ambulance", urgent: true },
  { key: "s2", img: "médecin à domicile", slug: "medecin-domicile" },
  { key: "s3", img: "infirmière à domicile", slug: "infirmiere-domicile" },
  { key: "s4", img: "garde-malade", slug: "garde-malade" },
  { key: "s5", img: "téléconsultation", slug: "teleconsultation" },
  { key: "s6", img: "prélèvement / analyses", slug: "prelevement-analyses" },
  { key: "s7", img: "rapatriement", slug: "rapatriement", urgent: true },
  { key: "s8", img: "équipe événementielle", slug: "equipe-evenementielle" },
  { key: "s9", img: "personne âgée", slug: "personne-agee" },
];

const COUNT = services.length;
const THETA = 360 / COUNT; // angle between cards on the ring
const PERSPECTIVE = 1600;
const DRAG_SENSITIVITY = 0.28; // degrees of ring rotation per px dragged

export function Services() {
  const { t, dir } = useI18n();
  const rtl = dir === "rtl";

  // `active` is a continuous float so the ring can spin smoothly across the
  // 0 ↔ last boundary and track the finger while dragging.
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  const [dims, setDims] = useState({ cardW: 250, cardH: 330, radius: 425, height: 500 });
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, startActive: 0 });
  // Tracks whether the last pointer interaction was a real drag, so a card
  // <Link> doesn't navigate when the user was actually spinning the ring.
  const moved = useRef(false);

  // Responsive sizing — keep cards from overlapping at the ring radius.
  useEffect(() => {
    const measure = () => {
      const w = wrapRef.current?.clientWidth ?? window.innerWidth;
      const cardW = w < 480 ? 190 : w < 768 ? 220 : 250;
      const cardH = Math.round(cardW * 1.32);
      const radius = Math.round(cardW * 1.7);
      const height = Math.round(cardH * 1.5);
      setDims({ cardW, cardH, radius, height });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const displayIndex = ((Math.round(active) % COUNT) + COUNT) % COUNT;

  // Move to a specific card via the shortest path around the ring.
  const goTo = useCallback((target: number) => {
    setActive((cur) => {
      const curMod = ((cur % COUNT) + COUNT) % COUNT;
      let diff = target - curMod;
      if (diff > COUNT / 2) diff -= COUNT;
      if (diff < -COUNT / 2) diff += COUNT;
      return cur + diff;
    });
  }, []);

  const step = useCallback((d: number) => setActive((a) => Math.round(a) + d), []);

  // Pointer drag → live ring spin, snap on release.
  // We deliberately avoid setPointerCapture: capturing the pointer redirects the
  // synthesized `click` to the wrapper and prevents the card <Link> from
  // navigating. Instead we track the drag via window listeners (see effect below).
  const onPointerDown = (e: ReactPointerEvent) => {
    drag.current = { startX: e.clientX, startActive: active };
    moved.current = false;
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      const delta = e.clientX - drag.current.startX;
      if (Math.abs(delta) > 6) moved.current = true;
      const dirSign = rtl ? -1 : 1;
      setActive(drag.current.startActive - (dirSign * delta * DRAG_SENSITIVITY) / THETA);
    };
    const onUp = () => {
      setDragging(false);
      setActive((a) => Math.round(a));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, rtl]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(rtl ? -1 : 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(rtl ? 1 : -1); }
  };

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden" id="services">
      <div className="absolute inset-0 -z-10 bg-dots mask-fade opacity-60" />
      <div className="max-w-[1240px] mx-auto px-5">
        {/* Header with navigation arrows */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <ScrollReveal className="max-w-[660px]">
            <span className="inline-flex items-center gap-2 bg-tint px-4 py-2 rounded-full text-[13px] font-['Plus_Jakarta_Sans'] font-bold tracking-[0.14em] uppercase text-brand-dark mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-emergency shadow-[0_0_0_4px_var(--color-emergency-tint)]" />
              <span>{t("sv_eyebrow")}</span>
            </span>
            <h2 className="text-[clamp(30px,4.6vw,46px)] mt-4 mb-3.5">{t("sv_h2")}</h2>
            <p className="text-muted-text text-[clamp(16px,2vw,18px)]">{t("sv_p")}</p>
          </ScrollReveal>

          {/* Arrow controls */}
          <ScrollReveal className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => step(rtl ? 1 : -1)}
              className="group w-12 h-12 rounded-full border-2 border-line bg-white flex items-center justify-center hover:border-brand hover:bg-brand hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_8px_24px_-8px_rgba(16,128,176,0.4)] cursor-pointer"
              aria-label="Previous services"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => step(rtl ? -1 : 1)}
              className="group w-12 h-12 rounded-full border-2 border-line bg-white flex items-center justify-center hover:border-brand hover:bg-brand hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_8px_24px_-8px_rgba(16,128,176,0.4)] cursor-pointer"
              aria-label="Next services"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </ScrollReveal>
        </div>

        {/* 3D Ring */}
        <ScrollReveal>
          <div
            ref={wrapRef}
            role="group"
            aria-roledescription="carousel"
            aria-label={t("sv_h2")}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            className="relative w-full select-none outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded-3xl"
            style={{
              height: dims.height,
              perspective: `${PERSPECTIVE}px`,
              cursor: dragging ? "grabbing" : "grab",
              touchAction: "pan-y",
            }}
          >
            <div
              ref={stageRef}
              className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
              style={{
                width: dims.cardW,
                height: dims.cardH,
                marginLeft: -dims.cardW / 2,
                marginTop: -dims.cardH / 2,
                transform: `rotateY(${-active * THETA}deg)`,
                transition: dragging ? "none" : "transform 0.7s cubic-bezier(0.22,0.61,0.36,1)",
              }}
            >
              {services.map((svc, i) => {
                const net = (i - active) * THETA; // angular position relative to front
                const rad = (net * Math.PI) / 180;
                const front = Math.cos(rad); // 1 = facing viewer, -1 = behind
                const isActive = i === displayIndex;
                const opacity = 0.22 + 0.78 * Math.max(0, (front + 1) / 2);
                const blur = (1 - Math.max(0, (front + 1) / 2)) * 2.5;
                const zIndex = Math.round((front + 1) * 50);

                return (
                  <div
                    key={svc.key}
                    className="absolute inset-0 [backface-visibility:hidden]"
                    style={{
                      transform: `rotateY(${i * THETA}deg) translateZ(${dims.radius}px)`,
                      opacity,
                      filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
                      zIndex,
                      pointerEvents: front > 0.1 ? "auto" : "none",
                    }}
                  >
                    <Link
                      href={`/services/${svc.slug}`}
                      draggable={false}
                      onClick={(e) => {
                        // A real drag never navigates; a tap on a side card brings
                        // it to the front; a tap on the front card follows the link.
                        if (moved.current) { e.preventDefault(); return; }
                        if (!isActive) { e.preventDefault(); goTo(i); }
                      }}
                      tabIndex={isActive ? 0 : -1}
                      aria-label={t(`${svc.key}_t` as any)}
                      aria-current={isActive}
                      className={`group block text-start w-full h-full rounded-2xl overflow-hidden border bg-white cursor-pointer transition-[box-shadow,border-color,transform] duration-500 ${
                        isActive
                          ? "gradient-ring border-transparent shadow-float hover:shadow-brand-glow hover:-translate-y-1"
                          : "border-line-2 shadow-card"
                      }`}
                    >
                      {/* Image area */}
                      <div className="relative h-[52%] shrink-0 bg-gradient-to-br from-tint via-brand-xlight/20 to-tint-2 overflow-hidden sheen">
                        <Image
                          src={serviceImages[svc.img] || "/medcare3d.png"}
                          alt={svc.img}
                          fill
                          draggable={false}
                          sizes="(max-width: 480px) 60vw, 280px"
                          className={`transition-transform duration-700 ease-out ${isActive ? "group-hover:scale-110" : ""} ${
                            svc.img === "médecin à domicile" ? "object-contain p-4" : "object-cover"
                          }`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-brand-deep/55 via-transparent to-transparent transition-opacity duration-500 ${isActive ? "opacity-0 group-hover:opacity-100" : "opacity-0"}`} />
                        {svc.urgent && (
                          <Badge className="absolute top-2.5 end-2.5 bg-emergency text-white border-0 text-[11px] font-bold shadow-[0_4px_12px_rgba(230,58,75,0.4)]">
                            {t("sv_tag_urgent")}
                          </Badge>
                        )}
                      </div>
                      {/* Body */}
                      <div className="p-4 flex flex-col h-[48%]">
                        <h3 className={`text-[16px] font-['Plus_Jakarta_Sans'] font-bold mb-1.5 transition-colors duration-300 line-clamp-1 ${isActive ? "text-brand" : ""}`}>
                          {t(`${svc.key}_t` as any)}
                        </h3>
                        <p className="text-muted-text text-[13px] mb-3 line-clamp-2 leading-relaxed flex-1">
                          {t(`${svc.key}_d` as any)}
                        </p>
                        <span className={`inline-flex items-center gap-1.5 font-['Plus_Jakarta_Sans'] font-bold text-[13px] mt-auto transition-all duration-500 ${isActive ? "text-brand group-hover:gap-2.5" : "text-muted-text"}`}>
                          <span>{t("sv_link")}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress bar + dots */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="flex items-center gap-1.5">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] cursor-pointer ${
                    i === displayIndex
                      ? "w-8 h-2.5 bg-brand shadow-[0_4px_12px_rgba(16,128,176,0.4)]"
                      : "w-2.5 h-2.5 bg-line-2 hover:bg-brand-xlight"
                  }`}
                  aria-label={`Go to service ${i + 1}`}
                  aria-current={i === displayIndex}
                />
              ))}
            </div>

            <span className="text-sm text-muted-text font-['Plus_Jakarta_Sans'] font-semibold tabular-nums">
              <span className="text-brand">{String(displayIndex + 1).padStart(2, "0")}</span>
              <span className="mx-1 text-line">/</span>
              <span>{String(COUNT).padStart(2, "0")}</span>
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
