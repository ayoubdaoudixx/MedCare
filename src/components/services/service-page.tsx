"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";
import type { ServiceData } from "@/lib/services-data";
import { PRICING_DISCLAIMER } from "@/lib/services-data";
import { PRICING_DISCLAIMER_AR, getServiceAr } from "@/lib/services-data-ar";
import { SERVICE_PAGE_COPY } from "@/lib/service-page-copy";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { AppIcon } from "@/components/ui/app-icon";
import { CallLink, WhatsAppLink } from "@/components/ui/cta";
import { FinalCta } from "@/components/sections/final-cta";

// Photo shown in the hero of each service page, keyed by slug. The alt texts
// live in service-page-copy.ts, next to the other interface strings.
const SERVICE_PHOTOS: Record<string, string> = {
  "ambulance": "/ambulance.webp",
  "medecin-domicile": "/medecin-domicile.webp",
  "infirmiere-domicile": "/infirmiere-a-domicile.webp",
  "garde-malade": "/garde-malade.webp",
  "teleconsultation": "/teleconsultation.webp",
  "prelevement-analyses": "/prelevement-analyses.webp",
  "rapatriement": "/rapatriement.webp",
  "equipe-evenementielle": "/equipe-evenementielle.webp",
  "personne-agee": "/personne-agee.webp",
};

const FALLBACK_PHOTO = "/infirmiere-a-domicile.webp";

const CARD = "rounded-2xl bg-white ring-1 ring-line";
const ICON_TILE = "grid size-11 shrink-0 place-items-center rounded-xl bg-tint text-brand";
const CARD_TITLE = "text-[1.0625rem]";
const CARD_BODY = "text-[0.9375rem] leading-relaxed text-ink-soft";

// The two ways to reach MedCare, in the order that fits the service: an urgent
// service leads with the red call button, the others lead with WhatsApp.
function ContactButtons({
  urgent,
  place,
  message,
  onDark = false,
  buttonClassName,
}: {
  urgent: boolean;
  place: string;
  message: string;
  onDark?: boolean;
  buttonClassName?: string;
}) {
  const quiet = onDark ? "on-dark" : "outline";
  const call = (
    <CallLink
      place={place}
      size="lg"
      variant={urgent ? "urgent" : quiet}
      className={buttonClassName}
    />
  );
  const whatsapp = (
    <WhatsAppLink
      place={place}
      size="lg"
      message={message}
      variant={urgent ? quiet : "solid"}
      className={buttonClassName}
    />
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {urgent ? (
        <>
          {call}
          {whatsapp}
        </>
      ) : (
        <>
          {whatsapp}
          {call}
        </>
      )}
    </div>
  );
}

export function ServicePage({ service: source }: { service: ServiceData }) {
  const { lang, t } = useI18n();
  // The French entry comes from the route. In Arabic, the same service is read
  // from the Arabic data file, falling back to French if it is missing.
  const service = lang === "ar" ? (getServiceAr(source.slug) ?? source) : source;
  const copy = SERVICE_PAGE_COPY[lang];
  const urgent = !!service.urgent;
  const photoAlts: Readonly<Record<string, string>> = copy.photoAlt;
  const photo = {
    src: SERVICE_PHOTOS[service.slug] ?? FALLBACK_PHOTO,
    alt: photoAlts[service.slug] ?? copy.photoAltFallback,
  };
  const pricingDisclaimer = lang === "ar" ? PRICING_DISCLAIMER_AR : PRICING_DISCLAIMER;
  const whatsappMessage = t("wa_service", { service: service.name });

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label={copy.breadcrumbLabel} className="bg-tint">
        <ol className="shell flex items-center gap-1.5 pt-2 text-sm text-muted-text">
          <li className="shrink-0">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center transition-colors duration-150 hover:text-brand-dark"
            >
              {copy.breadcrumbHome}
            </Link>
          </li>
          <li className="flex shrink-0 items-center gap-1.5">
            <ChevronRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
            <Link
              href="/#services"
              className="inline-flex min-h-11 items-center transition-colors duration-150 hover:text-brand-dark"
            >
              {copy.breadcrumbServices}
            </Link>
          </li>
          <li className="flex min-w-0 items-center gap-1.5 text-ink-soft" aria-current="page">
            <ChevronRight className="size-3.5 shrink-0 text-muted-text rtl:-scale-x-100" aria-hidden="true" />
            <span className="truncate">{service.name}</span>
          </li>
        </ol>
      </nav>

      <main id="contenu">
        {/* 1. Hero. Not animated: the title, the buttons and the photo are
            visible as soon as the HTML arrives. */}
        <section className="bg-tint">
          <div className="shell grid gap-8 pb-12 pt-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:pb-20 lg:pt-10">
            <div>
              {urgent ? (
                <p className="inline-flex items-center gap-2 rounded-full bg-emergency-tint py-1.5 pe-3.5 ps-2.5 text-sm font-semibold text-emergency-dark">
                  <span className="size-2.5 rounded-full bg-emergency" aria-hidden="true" />
                  {copy.urgentBadge}
                </p>
              ) : (
                <p className="eyebrow">{t("hero_status")}</p>
              )}

              <h1 className="text-title mt-4">{service.name}</h1>
              <p className="text-lead mt-4 max-w-[38ch] text-ink-soft">{service.tagline}</p>

              <div className="mt-7">
                <ContactButtons
                  urgent={urgent}
                  place="service-hero"
                  message={whatsappMessage}
                  buttonClassName="lg:min-h-12 lg:px-5 lg:text-base"
                />
              </div>

              <p className="mt-4 flex items-center gap-2 text-[0.9375rem] text-ink-soft">
                <Check className="size-4 shrink-0 text-brand" strokeWidth={2.5} aria-hidden="true" />
                {t("hero_fact_quote")}
              </p>
            </div>

            <div className="img-outline relative aspect-[4/3] overflow-hidden rounded-3xl bg-tint-2">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 64rem) 34rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 2. Description */}
        <section className="section-y">
          <div className="shell grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <ScrollReveal>
              <h2 className="text-title">{copy.descriptionHeading}</h2>
            </ScrollReveal>
            <ScrollReveal stagger className="max-w-[65ch] space-y-4">
              {service.description.map((para, i) => (
                <p
                  key={i}
                  className={i === 0 ? "text-lead text-ink" : "text-[1.0625rem] leading-relaxed text-ink-soft"}
                >
                  {para}
                </p>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* 3. Advantages */}
        <section className="section-y border-y border-sand-line bg-sand">
          <div className="shell">
            <ScrollReveal>
              <h2 className="text-title">{copy.advantagesHeading}</h2>
            </ScrollReveal>
            <ScrollReveal stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
              {service.advantages.map((adv) => (
                <div
                  key={adv.title}
                  className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-sand-line lg:block"
                >
                  <span className={ICON_TILE}>
                    <AppIcon name={adv.icon} className="size-6" />
                  </span>
                  <div className="lg:mt-4">
                    <h3 className={CARD_TITLE}>{adv.title}</h3>
                    <p className={cn(CARD_BODY, "mt-1.5")}>{adv.body}</p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* 4. Service-specific details */}
        <section className="section-y">
          <div className="shell">
            <ScrollReveal className="max-w-[65ch]">
              <h2 className="text-title">{service.details.title}</h2>
              {service.details.subtitle && (
                <p className="text-lead mt-4 text-ink-soft">{service.details.subtitle}</p>
              )}
            </ScrollReveal>
            <div className="mt-8 lg:mt-12">
              <ServiceDetailsBlock service={service} />
            </div>
          </div>
        </section>

        {/* 5. Pricing */}
        <section className="section-y bg-tint">
          <div className="shell">
            <ScrollReveal className="max-w-[65ch]">
              <h2 className="text-title">{copy.pricingHeading}</h2>
              <p className="text-lead mt-4 text-ink-soft">{pricingDisclaimer}</p>
            </ScrollReveal>

            <ScrollReveal stagger className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-5">
              {service.pricing.map((tier) => (
                <div
                  key={tier.name}
                  className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-line"
                >
                  <h3 className="text-lg">{tier.name}</h3>
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                    <span className="text-[1.375rem] font-semibold leading-tight tracking-tight text-ink rtl:tracking-normal">
                      {tier.price}
                    </span>
                    {tier.unit && <span className="text-sm text-muted-text">{tier.unit}</span>}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
                        <Check className="mt-1 size-4 shrink-0 text-brand" strokeWidth={2.5} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <WhatsAppLink
                    place="service-pricing"
                    variant="outline"
                    message={copy.quoteMessage
                      .replace("{service}", service.name)
                      .replace("{tier}", tier.name)}
                    className="mt-6 w-full"
                  >
                    {copy.quoteCta}
                  </WhatsAppLink>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* 6. How to book */}
        <section className="section-y">
          <div className="shell">
            <ScrollReveal>
              <h2 className="text-title">{copy.bookingHeading}</h2>
            </ScrollReveal>
            <ScrollReveal className="mt-8 lg:mt-12">
              <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {copy.bookingSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4 lg:block">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-tint-2 font-heading text-lg font-semibold text-brand-dark"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div className="lg:mt-4 lg:border-t lg:border-line lg:pt-4">
                      <h3 className={CARD_TITLE}>{step.title}</h3>
                      <p className={cn(CARD_BODY, "mt-1.5")}>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </section>

        {/* 7. FAQ */}
        <section className="section-y border-t border-sand-line bg-sand">
          <div className="shell grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <ScrollReveal>
              <h2 className="text-title">{copy.faqHeading}</h2>
            </ScrollReveal>
            <ScrollReveal>
              <Accordion className="rounded-2xl bg-white px-5 ring-1 ring-sand-line sm:px-6">
                {service.faq.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-line">
                    <AccordionTrigger className="min-h-12 items-center gap-4 py-4 text-start text-base font-semibold text-ink transition-colors duration-150 hover:text-brand-dark hover:no-underline **:data-[slot=accordion-trigger-icon]:mx-0 **:data-[slot=accordion-trigger-icon]:size-5">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pe-9 text-base leading-relaxed text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        {/* 8. Request builder, with this service already selected */}
        <FinalCta defaultService={service.slug} />
      </main>
    </>
  );
}

// Layout of the "details" section, one per `details.kind`.
function ServiceDetailsBlock({ service }: { service: ServiceData }) {
  const { lang } = useI18n();
  const copy = SERVICE_PAGE_COPY[lang];
  const d = service.details;

  if (d.kind === "variants") {
    return (
      <ScrollReveal
        stagger
        className={cn(
          "grid gap-3 sm:grid-cols-2 lg:gap-5",
          d.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
        )}
      >
        {d.items.map((item) => (
          <div key={item.name} className={cn(CARD, "flex flex-col p-5 lg:p-6")}>
            <span className={ICON_TILE}>
              <AppIcon name={item.icon} className="size-6" />
            </span>
            <h3 className={cn(CARD_TITLE, "mt-4")}>{item.name}</h3>
            <p className={cn(CARD_BODY, "mt-1.5")}>{item.body}</p>
            {item.features && (
              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
                    <Check className="mt-1 size-4 shrink-0 text-brand" strokeWidth={2.5} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ScrollReveal>
    );
  }

  if (d.kind === "actes") {
    return (
      <ScrollReveal stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {d.items.map((item) => (
          <div key={item.name} className={cn(CARD, "flex gap-3 p-5")}>
            <Check className="mt-1 size-5 shrink-0 text-brand" strokeWidth={2.5} aria-hidden="true" />
            <div>
              <h3 className={CARD_TITLE}>{item.name}</h3>
              <p className={cn(CARD_BODY, "mt-1")}>{item.body}</p>
            </div>
          </div>
        ))}
      </ScrollReveal>
    );
  }

  if (d.kind === "tele") {
    return (
      <ScrollReveal stagger className="grid gap-3 lg:grid-cols-2 lg:gap-5">
        <div className={cn(CARD, "p-5 lg:p-6")}>
          <h3 className="text-lg">{copy.specialitiesHeading}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {d.specialities.map((speciality) => (
              <li
                key={speciality}
                className="rounded-full bg-tint px-3.5 py-1.5 text-[0.9375rem] font-medium text-brand-dark"
              >
                {speciality}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(CARD, "p-5 lg:p-6")}>
          <h3 className="text-lg">{copy.devicesHeading}</h3>
          <ul className="mt-4 grid grid-cols-3 gap-3">
            {d.devices.map((device) => (
              <li
                key={device.name}
                className="flex flex-col items-center gap-2.5 rounded-xl bg-tint px-2 py-4 text-center text-[0.9375rem] font-medium text-ink-soft"
              >
                <AppIcon name={device.icon} className="size-7 text-brand" />
                {device.name}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    );
  }

  // d.kind === "analyses"
  return (
    <div className="space-y-3 lg:space-y-5">
      <ScrollReveal stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {d.types.map((item) => (
          <div key={item.name} className={cn(CARD, "p-5")}>
            <h3 className={CARD_TITLE}>{item.name}</h3>
            <p className={cn(CARD_BODY, "mt-1.5")}>{item.body}</p>
          </div>
        ))}
      </ScrollReveal>
      <ScrollReveal>
        <div className="flex gap-4 rounded-2xl bg-tint p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand">
            <AppIcon name="Clock" className="size-6" />
          </span>
          <div>
            <h3 className={CARD_TITLE}>{copy.resultsDelayHeading}</h3>
            <p className={cn(CARD_BODY, "mt-1")}>{d.delai}</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
