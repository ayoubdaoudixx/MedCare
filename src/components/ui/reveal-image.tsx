"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { IMAGE_PLACEHOLDERS } from "@/lib/image-placeholders";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// A photo that arrives the way it does on a carefully built site:
// 1. a blurred preview is there at once, so the frame is never empty;
// 2. a curtain lifts off the photo as it scrolls into view while the photo
//    settles from a slight zoom;
// 3. the photo then drifts a few percent inside its frame as the page moves.
// The photo itself is never hidden, so the browser lazy-loads it normally.
// Without motion (reduced-motion setting or no script) it is simply shown.
export function RevealImage({
  src,
  alt,
  sizes,
  priority = false,
  play = true,
  className,
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Set to false to hold the reveal, for example until an intro has finished. */
  play?: boolean;
  /** Classes for the frame: aspect ratio, radius, background. */
  className?: string;
  /** Overlays drawn above the photo (badges, captions). */
  children?: ReactNode;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const placeholder = IMAGE_PLACEHOLDERS[src];

  useGSAP(
    () => {
      const el = frame.current;
      if (!el || !play) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const curtain = el.querySelector<HTMLElement>("[data-ri-curtain]");
        const photo = el.querySelector<HTMLElement>("[data-ri-photo]");
        if (!curtain || !photo) return;

        gsap.set(curtain, { display: "block", scaleY: 1 });
        gsap.set(photo, { scale: 1.22 });

        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 86%", once: true } })
          .to(curtain, { scaleY: 0, duration: 0.9, ease: "power3.inOut" })
          .to(photo, { scale: 1.1, duration: 1.3, ease: "power3.out" }, 0.05)
          .set(curtain, { display: "none" });

        gsap.fromTo(
          photo,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.4 },
          }
        );
      });
    },
    { scope: frame, dependencies: [play] }
  );

  return (
    <div ref={frame} className={cn("img-outline relative overflow-hidden bg-tint", className)}>
      <div data-ri-photo className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          placeholder={placeholder ? "blur" : "empty"}
          blurDataURL={placeholder}
          className="object-cover"
        />
      </div>
      <span
        data-ri-curtain
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden origin-top bg-tint-2"
      />
      {children}
    </div>
  );
}
