"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { OFFER } from "@/lib/offer";

// The strip above the header. It carries the one message meant to be noticed
// first: a confirmed offer when there is one (see lib/offer.ts), otherwise the
// free quote. The whole strip is one link to the request builder.
export function PromoBanner() {
  const { t, lang } = useI18n();
  const offer = OFFER.active && OFFER.text[lang] !== "";
  const text = offer ? OFFER.text[lang] : t("promo_text");

  return (
    <Link href="/#contact" className="on-dark group block bg-brand-deep text-white">
      <span className="shell flex min-h-11 items-center justify-center gap-2.5 py-2 text-center text-[0.875rem] leading-snug">
        {offer && (
          <span className="num shrink-0 rounded-full bg-sand px-2.5 py-0.5 text-xs font-bold text-ink">
            -{OFFER.percent} %
          </span>
        )}
        <span className="font-medium">{text}</span>
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
