"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";
import { PHONE_DISPLAY, TEL_HREF } from "@/lib/contact";
import { LogoMark } from "@/components/ui/logo-mark";

interface IntroSplashProps {
  /** The overlay starts lifting: the page underneath can animate in. */
  onReveal: () => void;
  /** The overlay is gone and can be unmounted. */
  onComplete: () => void;
}

const SEEN_KEY = "medcare-intro";
/** Matches the CSS: the overlay starts lifting at 2.15s and takes 0.6s. */
const DRAW_MS = 2150;
const EXIT_MS = 600;
const SKIP_EXIT_MS = 450;

// The logo draws itself once per session, then lifts away. The animation is
// pure CSS (see globals.css), so it plays before scripts load. This component
// only handles skipping and tells the page when the intro is over.
// On phones the call bar stays above the overlay, so calling is never blocked.
export function IntroSplash({ onReveal, onComplete }: IntroSplashProps) {
  const { t } = useI18n();
  const overlayRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);
  const doneRef = useRef(false);

  const reveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage blocked: the intro simply plays again next time.
    }
    onReveal();
  }, [onReveal]);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    reveal();
    onComplete();
  }, [reveal, onComplete]);

  const skip = useCallback(() => {
    if (revealedRef.current) return;
    overlayRef.current?.classList.add("is-leaving");
    reveal();
    window.setTimeout(finish, SKIP_EXIT_MS);
  }, [reveal, finish]);

  useEffect(() => {
    const alreadySeen = document.documentElement.classList.contains("intro-seen");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (alreadySeen || reducedMotion) {
      finish();
      return;
    }
    const revealTimer = window.setTimeout(reveal, DRAW_MS);
    const finishTimer = window.setTimeout(finish, DRAW_MS + EXIT_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [reveal, finish, skip]);

  return (
    <div
      ref={overlayRef}
      className="intro-overlay fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white"
    >
      <button
        type="button"
        onClick={skip}
        aria-label={t("intro_skip")}
        className="absolute inset-0 cursor-default"
      />
      <div className="pointer-events-none relative flex flex-col items-center px-6 pb-24 text-center lg:pb-0">
        <LogoMark className="w-28 sm:w-32" />
        <div className="intro-rise mt-7" style={{ "--lm-delay": "1.25s" } as React.CSSProperties}>
          <Image
            src="/medcare-logo.png"
            alt="MedCare"
            width={485}
            height={122}
            priority
            className="mx-auto h-8 w-auto"
          />
        </div>
        <p
          className="intro-rise mt-4 font-heading text-xl text-ink-soft"
          style={{ "--lm-delay": "1.45s" } as React.CSSProperties}
        >
          {t("intro_tagline")}
        </p>
      </div>
      {/* Desktop has no call bar, so the number is shown here during the intro. */}
      <a
        href={TEL_HREF}
        className="absolute bottom-8 hidden items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-text hover:text-ink lg:inline-flex"
      >
        <span>{t("intro_urgent")}</span>
        <span className="font-semibold text-ink">{PHONE_DISPLAY}</span>
      </a>
    </div>
  );
}
