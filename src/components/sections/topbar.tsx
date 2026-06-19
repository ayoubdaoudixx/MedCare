"use client";

import { useI18n } from "@/lib/i18n-context";
import { AppIcon } from "@/components/ui/app-icon";

export function Topbar() {
  const { t, toggleLang } = useI18n();

  return (
    <div className="bg-brand-deep text-brand-xlight text-[13.5px] font-['Plus_Jakarta_Sans',system-ui,sans-serif]">
      <div className="max-w-[1240px] mx-auto px-5 flex items-center justify-between h-[42px] gap-4">
        <div className="hidden md:flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5">
            <AppIcon name="Clock" className="w-[15px] h-[15px]" />
            <span>{t("tb_hours")}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <AppIcon name="MapPin" className="w-[15px] h-[15px]" />
            <span>{t("tb_zone")}</span>
          </span>
        </div>
        <div className="flex items-center gap-4 ms-auto">
          <a href="mailto:contact@medcare.ma" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
            <AppIcon name="Mail" className="w-[15px] h-[15px]" />
            <span className="hidden sm:inline">{t("tb_email")}</span>
          </a>
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 font-bold text-white bg-white/10 px-3 py-1 rounded-full text-[13px] hover:bg-white/20 transition-colors"
          >
            <AppIcon name="Translation" className="w-[14px] h-[14px]" />
            <span>{t("lang_label")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
