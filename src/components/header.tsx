"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowUp } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { AppIcon } from "@/components/app-icon";

const serviceIcons = ["Ambulance", "Stethoscope", "Syringe", "HeartHandshake", "Video", "TestTube", "Plane", "CalendarHeart", "Accessibility"];
const serviceKeys = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"] as const;
// Slugs aligned with serviceKeys order — link each menu entry to its page.
const serviceSlugs = ["ambulance", "medecin-domicile", "infirmiere-domicile", "garde-malade", "teleconsultation", "prelevement-analyses", "rapatriement", "equipe-evenementielle", "personne-agee"];

export function Header() {
  const { t, lang, dir, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accOpen, setAccOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 12);
      setShowHeader(scrollY < 50);
      setShowBackToTop(scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/86 backdrop-blur-[14px] backdrop-saturate-[160%] border-b transition-all duration-300 ${
          scrolled ? "shadow-[0_8px_30px_-16px_rgba(8,60,90,0.3)] border-line-2" : "border-transparent"
        } ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-5 flex items-center justify-between h-[78px] gap-5">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image src="/medcare-logo.png" alt="MEDCARE" width={140} height={36} className="h-9 w-auto" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="font-['Plus_Jakarta_Sans'] font-semibold text-[15px] text-ink-soft px-4 py-2.5 rounded-full hover:text-brand-dark hover:bg-tint transition-colors">
              {t("nav_home")}
            </Link>
            <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
              <button className="inline-flex items-center gap-1.5 font-['Plus_Jakarta_Sans'] font-semibold text-[15px] text-ink-soft px-4 py-2.5 rounded-full hover:text-brand-dark hover:bg-tint transition-colors cursor-pointer">
                <span>{t("nav_services")}</span>
                <ChevronDown className={`w-[15px] h-[15px] transition-transform duration-250 ${megaOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-[calc(100%+14px)] start-1/2 -translate-x-1/2 w-[560px] bg-white rounded-[26px] shadow-[0_40px_80px_-30px_rgba(8,68,94,0.45)] border border-line-2 p-4 grid grid-cols-2 gap-1.5 z-40 transition-all duration-300 ${megaOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2.5"}`}>
                {serviceKeys.map((key, i) => {
                  return (
                    <Link key={key} href={`/services/${serviceSlugs[i]}`} onClick={() => setMegaOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-tint transition-colors">
                      <div className="w-[50px] h-[50px] rounded-xl bg-tint flex items-center justify-center shrink-0">
                        <AppIcon name={serviceIcons[i]} className="w-6 h-6 text-brand" />
                      </div>
                      <div>
                        <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14.5px] text-ink block">{t(`${key}_t` as any)}</span>
                        <span className="text-[12.5px] text-muted-text line-clamp-1">{t(`${key}_d` as any)}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link href="/#why" className="font-['Plus_Jakarta_Sans'] font-semibold text-[15px] text-ink-soft px-4 py-2.5 rounded-full hover:text-brand-dark hover:bg-tint transition-colors">{t("nav_why")}</Link>
            <Link href="/#coverage" className="font-['Plus_Jakarta_Sans'] font-semibold text-[15px] text-ink-soft px-4 py-2.5 rounded-full hover:text-brand-dark hover:bg-tint transition-colors">{t("nav_coverage")}</Link>
            <Link href="/#contact" className="font-['Plus_Jakarta_Sans'] font-semibold text-[15px] text-ink-soft px-4 py-2.5 rounded-full hover:text-brand-dark hover:bg-tint transition-colors">{t("nav_contact")}</Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a href="tel:+212522000000" className="inline-flex items-center gap-1.5 font-['Plus_Jakarta_Sans'] font-bold text-[13px] bg-emergency text-white px-3.5 py-2 rounded-full shadow-[0_12px_24px_-8px_rgba(230,58,75,0.4)] hover:-translate-y-0.5 hover:bg-emergency-dark transition-all">
              <AppIcon name="PhoneCalling" className="w-4 h-4" />
              <span className="hidden sm:inline">{t("cta_emergency")}</span>
            </a>
            <a href="tel:+212600000000" className="hidden md:inline-flex items-center gap-1.5 font-['Plus_Jakarta_Sans'] font-bold text-[13px] bg-[#25D366] text-white px-3.5 py-2 rounded-full shadow-[0_12px_24px_-8px_rgba(37,211,102,0.45)] hover:-translate-y-0.5 hover:bg-[#1EBE57] transition-all">
              {t("cta_appt")}
            </a>
            <button onClick={() => setDrawerOpen(true)} className="lg:hidden w-[46px] h-[46px] rounded-[13px] bg-tint text-brand-dark grid place-items-center shrink-0">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[120] transition-opacity duration-350 ${drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={closeDrawer} />

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 ${dir === "rtl" ? "left-0" : "right-0"} h-full w-[min(86vw,380px)] bg-white z-[130] flex flex-col shadow-[0_40px_80px_-30px_rgba(8,68,94,0.45)] transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          drawerOpen
            ? "translate-x-0"
            : dir === "rtl" ? "-translate-x-full" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-line-2">
          <Image src="/medcare-logo.png" alt="MEDCARE" width={120} height={32} className="h-8 w-auto" />
          <button onClick={closeDrawer} className="w-[42px] h-[42px] rounded-xl bg-tint text-brand-dark grid place-items-center">
            <X className="w-[22px] h-[22px]" />
          </button>
        </div>

        <nav className="p-4 overflow-y-auto flex-1 space-y-1">
          <Link href="/" onClick={closeDrawer} className="flex items-center justify-between font-['Plus_Jakarta_Sans'] font-bold text-[17px] text-ink p-3 rounded-xl hover:bg-tint transition-colors">
            {t("nav_home")}
          </Link>
          <div>
            <button onClick={() => setAccOpen(!accOpen)} className="flex items-center justify-between w-full font-['Plus_Jakarta_Sans'] font-bold text-[17px] text-ink p-3 rounded-xl hover:bg-tint transition-colors">
              <span>{t("nav_services")}</span>
              <ChevronDown className={`w-5 h-5 text-muted-text transition-transform duration-300 ${accOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${accOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="ps-3 space-y-0.5 pb-2">
                {serviceKeys.map((key, i) => {
                  return (
                    <Link key={key} href={`/services/${serviceSlugs[i]}`} onClick={closeDrawer} className="flex items-center gap-3 p-3 rounded-xl hover:bg-tint transition-colors text-[15px]">
                      <AppIcon name={serviceIcons[i]} className="w-5 h-5 text-brand" />
                      <span>{t(`${key}_t` as any)}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <Link href="/#why" onClick={closeDrawer} className="flex items-center font-['Plus_Jakarta_Sans'] font-bold text-[17px] text-ink p-3 rounded-xl hover:bg-tint transition-colors">{t("nav_why")}</Link>
          <Link href="/#coverage" onClick={closeDrawer} className="flex items-center font-['Plus_Jakarta_Sans'] font-bold text-[17px] text-ink p-3 rounded-xl hover:bg-tint transition-colors">{t("nav_coverage")}</Link>
          <Link href="/#contact" onClick={closeDrawer} className="flex items-center font-['Plus_Jakarta_Sans'] font-bold text-[17px] text-ink p-3 rounded-xl hover:bg-tint transition-colors">{t("nav_contact")}</Link>
        </nav>

        <div className="p-5 border-t border-line-2 space-y-3">
          <a href="tel:+212522000000" className="flex items-center justify-center gap-2.5 font-['Plus_Jakarta_Sans'] font-bold text-[16.5px] bg-emergency text-white px-6 py-4 rounded-full shadow-[0_16px_34px_-12px_rgba(230,58,75,0.5)] w-full">
            <AppIcon name="PhoneCalling" className="w-5 h-5" />
            <span>{t("cta_emergency")}</span>
          </a>
          <div className="flex gap-2 justify-center">
            <button onClick={() => setLang("fr")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${lang === "fr" ? "bg-brand text-white" : "bg-tint text-ink-soft"}`}>
              Fran&ccedil;ais
            </button>
            <button onClick={() => setLang("ar")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${lang === "ar" ? "bg-brand text-white" : "bg-tint text-ink-soft"}`}>
              العربية
            </button>
          </div>
        </div>
      </aside>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-20 md:bottom-8 z-40 p-3.5 bg-brand hover:bg-brand-dark text-white rounded-full shadow-lg shadow-brand/20 transition-all duration-300 flex items-center justify-center cursor-pointer ${
          dir === "rtl" ? "left-6 md:left-8" : "right-6 md:right-8"
        } ${
          showBackToTop
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-75 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}
