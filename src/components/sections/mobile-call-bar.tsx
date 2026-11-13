"use client";

import { useI18n } from "@/lib/i18n-context";
import { CallLink, WhatsAppLink } from "@/components/ui/cta";

// Fixed at the bottom of every page on phones and tablets. It is part of the
// server-rendered HTML and needs no script to work, so a visitor can call
// before fonts, images or animations have loaded. It also stays above the
// intro overlay.
export function MobileCallBar() {
  const { t } = useI18n();

  return (
    <div
      role="region"
      aria-label={t("nav_contact")}
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-white/95 shadow-[var(--shadow-bar)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2.5 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <CallLink place="bar" withNumber={false} className="min-h-[3.25rem] px-3" />
        <WhatsAppLink place="bar" className="min-h-[3.25rem] px-3">
          {t("whatsapp")}
        </WhatsAppLink>
      </div>
    </div>
  );
}
