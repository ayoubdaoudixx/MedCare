"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useI18n } from "@/lib/i18n-context";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// One sentence that says why MedCare exists. The words start pale and take
// their full color as the visitor scrolls through them, so reading and
// scrolling happen at the same pace. Without motion the sentence is simply
// there, fully legible.
export function Statement() {
  const { t, lang } = useI18n();
  const root = useRef<HTMLElement>(null);
  const words = t("statement").split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: root.current, start: "top 78%", end: "bottom 62%", scrub: 0.5 },
          }
        );
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section ref={root} className="bg-white">
      <div className="shell pb-16 pt-6 lg:pb-28 lg:pt-10">
        <p className="max-w-4xl font-heading text-[clamp(1.75rem,7.4vw,3.5rem)] font-medium leading-[1.14] tracking-[-0.02em] text-ink rtl:font-bold rtl:leading-[1.5] rtl:tracking-normal">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} data-word>
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
