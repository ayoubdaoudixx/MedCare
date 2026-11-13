"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { SERVICE_CATALOG } from "@/lib/service-catalog";
import { AppIcon } from "@/components/ui/app-icon";
import { CallLink, WhatsAppLink } from "@/components/ui/cta";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { PromoBanner } from "@/components/sections/promo-banner";
import type { DictKey } from "@/lib/i18n";

const NAV: { href: string; label: DictKey }[] = [
  { href: "/#services", label: "nav_services" },
  { href: "/#comment", label: "nav_how" },
  { href: "/#zones", label: "nav_coverage" },
  { href: "/#questions", label: "nav_faq" },
];

function LangSwitch({ className = "" }: { className?: string }) {
  const { t, lang, toggleLang } = useI18n();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t("lang_switch_label")}
      // The label is written in the language it switches to.
      lang={lang === "fr" ? "ar" : "fr"}
      className={`press inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-semibold text-ink-soft ring-1 ring-inset ring-line hover:text-brand-dark hover:ring-brand ${className}`}
    >
      {t("lang_switch")}
    </button>
  );
}

export function Header() {
  const { t, dir } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:start-4 focus-visible:top-4 focus-visible:z-[90] focus-visible:rounded-full focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-white"
      >
        {t("skip_link")}
      </a>

      <PromoBanner />

      <header className="sticky top-0 z-50 border-b border-line bg-white/92 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between gap-3 lg:h-[4.5rem]">
          <Link href="/" aria-label={t("home_label")} className="flex min-h-11 shrink-0 items-center rounded-lg">
            <Image
              src="/medcare-logo.png"
              alt="MedCare"
              width={485}
              height={122}
              priority
              className="h-7 w-auto lg:h-8"
            />
          </Link>

          <nav aria-label={t("menu_title")} className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2.5 text-[0.9375rem] font-medium text-ink-soft transition-colors duration-150 hover:bg-tint hover:text-brand-dark"
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch />
            <CallLink place="header" className="hidden lg:inline-flex" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("menu_open")}
              aria-haspopup="dialog"
              className="press grid size-11 place-items-center rounded-full bg-tint text-brand-dark lg:hidden"
            >
              <Menu className="size-[1.375rem]" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side={dir === "rtl" ? "left" : "right"}
          showCloseButton={false}
          className="z-[80] w-full max-w-none gap-0 overscroll-contain border-0 p-0 text-base sm:max-w-sm data-[side=left]:w-full data-[side=right]:w-full"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
            <SheetTitle className="font-sans text-lg font-semibold text-ink">{t("menu_title")}</SheetTitle>
            <SheetClose
              aria-label={t("menu_close")}
              className="press grid size-11 place-items-center rounded-full bg-tint text-brand-dark"
            >
              <X className="size-[1.375rem]" strokeWidth={2} />
            </SheetClose>
          </div>

          <nav aria-label={t("nav_services")} className="flex-1 overflow-y-auto px-3 py-3">
            <p className="eyebrow px-2 pb-1 pt-2">{t("nav_services")}</p>
            <ul>
              {SERVICE_CATALOG.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={closeMenu}
                    className="flex min-h-[3.25rem] items-center gap-3 rounded-xl px-2 text-ink transition-colors duration-150 hover:bg-tint"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-tint text-brand">
                      <AppIcon name={service.icon} className="size-5" />
                    </span>
                    <span className="flex-1 font-medium">{t(service.title)}</span>
                    <ChevronRight className="size-4 shrink-0 text-muted-text rtl:-scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-3 border-t border-line pt-3">
              {NAV.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex min-h-12 items-center rounded-xl px-2 font-medium text-ink-soft transition-colors duration-150 hover:bg-tint hover:text-ink"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid shrink-0 gap-2.5 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <CallLink place="menu" />
            <WhatsAppLink place="menu" />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
