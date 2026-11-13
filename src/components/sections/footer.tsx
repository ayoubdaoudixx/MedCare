"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { EMAIL, MAILTO_HREF, PHONE_DISPLAY, TEL_HREF, whatsappHref } from "@/lib/contact";
import { SERVICE_CATALOG } from "@/lib/service-catalog";
import { AppIcon } from "@/components/ui/app-icon";
import { WhatsAppIcon } from "@/components/ui/social-icons";

// Footer: the contact details and the nine service pages, nothing else.
// The bottom padding keeps the last line clear of the fixed call bar on phones.
export function Footer() {
  const { t } = useI18n();

  const contactRow =
    "flex min-h-11 items-center gap-3 text-ink-soft transition-colors duration-150 hover:text-brand-dark";

  return (
    <footer className="pb-call-bar border-t border-line bg-background">
      <div className="shell grid gap-10 py-12 lg:grid-cols-[1.1fr_1.4fr_1fr] lg:gap-16 lg:py-16">
        <div>
          <Image src="/medcare-logo.png" alt="MedCare" width={485} height={122} className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-ink-soft">{t("ft_about")}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1.5 text-sm font-semibold text-brand-dark">
            <AppIcon name="Clock" className="size-4" />
            {t("open_247")}
          </p>
        </div>

        <nav aria-label={t("ft_services")}>
          <h2 className="font-sans text-base font-semibold tracking-normal text-ink">{t("ft_services")}</h2>
          <ul className="mt-2 grid sm:grid-cols-2 sm:gap-x-6">
            {SERVICE_CATALOG.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex min-h-11 items-center text-[0.9375rem] text-ink-soft transition-colors duration-150 hover:text-brand-dark"
                >
                  {t(service.title)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-base font-semibold tracking-normal text-ink">{t("ft_contact")}</h2>
          <ul className="mt-2 text-[0.9375rem]">
            <li>
              <a href={TEL_HREF} className={contactRow}>
                <AppIcon name="Phone" className="size-5 shrink-0 text-brand" />
                <span className="font-semibold text-ink">{PHONE_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a href={whatsappHref(t("wa_generic"))} target="_blank" rel="noopener noreferrer" className={contactRow}>
                <WhatsAppIcon className="size-5 shrink-0 text-[#1FA855]" />
                <span>{t("whatsapp")}</span>
              </a>
            </li>
            <li>
              <a href={MAILTO_HREF} className={contactRow}>
                <AppIcon name="Mail" className="size-5 shrink-0 text-brand" />
                <span className="break-all">{EMAIL}</span>
              </a>
            </li>
            <li className="flex min-h-11 items-center gap-3 text-ink-soft">
              <AppIcon name="MapPin" className="size-5 shrink-0 text-brand" />
              <span>{t("ft_city")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="shell py-5 text-sm text-muted-text">{t("ft_rights")}</p>
      </div>
    </footer>
  );
}
