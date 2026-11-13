"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  /** Seconds to wait before this block starts. */
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
  /**
   * Reveal the direct children one after another instead of the block as a
   * whole. Use it on lists and grids.
   */
  stagger?: boolean;
}

// Fades content up as it enters the viewport. Content stays fully visible for
// visitors who ask for reduced motion and when scripts do not run.
export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  stagger = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? Array.from(el.children) : el;
        // Opacity only: `visibility: hidden` would stop the browser from
        // lazy-loading the images inside the block.
        gsap.from(targets, {
          opacity: 0,
          y: direction === "up" ? 24 : 0,
          x: direction === "left" ? -24 : direction === "right" ? 24 : 0,
          duration: 0.6,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.08 : 0,
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
