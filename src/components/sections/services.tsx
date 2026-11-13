"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { SERVICE_CATALOG, type CatalogService } from "@/lib/service-catalog";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RevealImage } from "@/components/ui/reveal-image";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { whatsappHref } from "@/lib/contact";
import { useWhatsAppMessage } from "@/components/ui/cta";


// One service: a large photo, what it is, a link to its page, and a button
// that opens WhatsApp with a message naming the service (and the visitor's
// position, when they have shared it).
function ServiceCard({ service }: { service: CatalogService }) {
  const { t } = useI18n();
  const name = t(service.title);
  const message = useWhatsAppMessage(t("wa_service", { service: name }));

  return (
    <article
      className="group relative flex flex-col rounded-[1.5rem] bg-white p-2.5 shadow-card ring-1 ring-line transition-shadow duration-150 hover:ring-brand"
    >
      <RevealImage
        src={service.image}
        alt=""
        focus={service.focus}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
        className="aspect-square rounded-[0.875rem]"
      >
        {service.slug === "ambulance" && (
          <span className="absolute start-3 top-3 z-[2] rounded-full bg-emergency px-2.5 py-1 text-xs font-semibold text-white">
            {t("sv_urgent")}
          </span>
        )}
      </RevealImage>
      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-5">
        <h3 className="text-xl">
          {/* The link stretches over the whole card. */}
          <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:rounded-[1.5rem]">
            {name}
          </Link>
        </h3>
        <p className="mt-2 text-base leading-relaxed text-ink-soft">{t(service.desc)}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-dark" aria-hidden="true">
            {t("sv_link")}
            <ChevronRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </span>
          {/* One tap opens WhatsApp with a message that names this service. */}
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("sv_ask_label", { service: name })}
            data-contact="whatsapp"
            data-contact-place="service-card"
            className="press relative z-[3] inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-4 text-[0.9375rem] font-semibold text-whatsapp-ink hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="size-5" />
            {t("sv_ask")}
          </a>
        </div>
      </div>
    </article>
  );
}

// All nine services, visible at once, each led by a large photo so a visitor
// recognises the situation before reading. One column on phones, then a grid.
export function Services() {
  const { t } = useI18n();
  return (
    <section id="services" className="section-y bg-background">
      <div className="shell">
        <ScrollReveal className="max-w-2xl">
          <p className="eyebrow">{t("sv_eyebrow")}</p>
          <h2 className="text-title mt-3">{t("sv_h2")}</h2>
          <p className="text-lead mt-4 text-ink-soft">{t("sv_p")}</p>
        </ScrollReveal>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {SERVICE_CATALOG.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
