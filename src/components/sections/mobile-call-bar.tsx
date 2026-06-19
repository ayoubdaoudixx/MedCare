"use client";

import { useI18n } from "@/lib/i18n-context";
import { AppIcon } from "@/components/ui/app-icon";

export function MobileCallBar() {
  const { t } = useI18n();

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-line shadow-[0_-8px_30px_-10px_rgba(8,60,90,0.15)]">
      <div className="flex">
        <a
          href="tel:+212522000000"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-emergency text-white font-['Plus_Jakarta_Sans'] font-bold text-[15px]"
        >
          <AppIcon name="PhoneCalling" className="w-[18px] h-[18px]" />
          <span>{t("mc_call")}</span>
        </a>
        <a
          href="https://wa.me/212600000000"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-['Plus_Jakarta_Sans'] font-bold text-[15px]"
        >
          <AppIcon name="Chat" className="w-[18px] h-[18px]" />
          <span>{t("mc_wa")}</span>
        </a>
      </div>
    </div>
  );
}
