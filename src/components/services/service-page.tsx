"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check, Home as HomeIcon } from "lucide-react";
import type { ServiceData } from "@/lib/services-data";
import { PRICING_DISCLAIMER } from "@/lib/services-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { AppIcon } from "@/components/app-icon";

const TEL = "tel:+212522000000";
const RESERVATION = "/reservation";

// Hero illustration per service — the same artwork used in the homepage
// service cards, keyed by slug. `medecin-domicile` is a transparent 3D render
// best shown contained; the rest are photos shown edge-to-edge.
const serviceImages: Record<string, string> = {
  "ambulance": "/ambulance.png",
  "medecin-domicile": "/medcare3d.png",
  "infirmiere-domicile": "/infirmière à domicile.png",
  "garde-malade": "/garde-malade.png",
  "teleconsultation": "/téléconsultation.png",
  "prelevement-analyses": "/prélèvement  analyses.png",
  "rapatriement": "/rapatriement.png",
  "equipe-evenementielle": "/équipe événementielle.jpg",
  "personne-agee": "/personne âgée.jpg",
};

// Small reusable eyebrow chip — identical pattern to the homepage sections.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 bg-tint px-4 py-2 rounded-full text-[13px] font-['Plus_Jakarta_Sans'] font-bold tracking-[0.14em] uppercase text-brand-dark mb-4">
      <span className="w-[7px] h-[7px] rounded-full bg-emergency shadow-[0_0_0_4px_var(--color-emergency-tint)]" />
      <span>{children}</span>
    </span>
  );
}

const RESERVE_STEPS = [
  { num: "01", t: "Contactez-nous", d: "Par téléphone, via l'application ou depuis notre site, à toute heure." },
  { num: "02", t: "Décrivez votre besoin", d: "Un conseiller médical évalue votre demande et vous oriente." },
  { num: "03", t: "Confirmation & affectation", d: "Nous confirmons l'intervention et mobilisons l'équipe adaptée." },
  { num: "04", t: "Intervention à domicile", d: "Le professionnel se déplace chez vous dans les meilleurs délais." },
  { num: "05", t: "Suivi post-prestation", d: "Compte-rendu, conseils et suivi médical après la prestation." },
];

export function ServicePage({ service }: { service: ServiceData }) {
  const urgent = !!service.urgent;

  return (
    <>
      {/* ─────────────────────── Breadcrumb ─────────────────────── */}
      <nav aria-label="Fil d'Ariane" className="border-b border-line-2 bg-white/60">
        <div className="max-w-[1240px] mx-auto px-5 py-3.5">
          <ol className="flex items-center gap-1.5 text-[13.5px] font-medium text-muted-text flex-wrap">
            <li>
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-brand transition-colors">
                <HomeIcon className="w-3.5 h-3.5" />
                <span>Accueil</span>
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-line shrink-0" />
            <li>
              <Link href="/#services" className="hover:text-brand transition-colors">Services</Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-line shrink-0" />
            <li className="text-ink font-semibold line-clamp-1" aria-current="page">{service.name}</li>
          </ol>
        </div>
      </nav>

      <main>
        {/* ───────────────────────── ① HERO ───────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-dark to-brand-deeper text-white">
          <div className="absolute inset-0 bg-grid-light opacity-40" />
          <div className="absolute -start-24 -top-24 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-aurora" />
          <div className="absolute -end-24 -bottom-24 w-72 h-72 rounded-full bg-emergency/15 blur-3xl animate-aurora-slow" />

          {/* Full-bleed image panel — desktop & up */}
          <div className="hidden lg:block absolute inset-y-12 end-0 w-[46%] z-[5]">
            <div className="gradient-ring relative h-full w-full overflow-hidden rounded-s-[40px] border border-white/20 shadow-float">
              <div className="absolute inset-0 bg-dots opacity-20" />
              <Image
                src={serviceImages[service.slug] ?? "/medcare3d.png"}
                alt={service.name}
                fill
                priority
                sizes="50vw"
                className={service.slug === "medecin-domicile" ? "object-contain p-10" : "object-cover"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/45 via-transparent to-transparent" />
            </div>
          </div>

          <div className="max-w-[1240px] mx-auto px-5 relative z-10">
            <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-12">
              {/* Text */}
              <ScrollReveal className="py-12 lg:py-[120px]">
                {urgent && (
                  <span className="inline-flex items-center gap-2.5 bg-emergency text-white px-4 py-2 rounded-full text-[13px] font-['Plus_Jakarta_Sans'] font-extrabold tracking-[0.12em] uppercase mb-5 shadow-emergency-glow">
                    <span className="relative flex items-center justify-center">
                      <span className="absolute w-3 h-3 rounded-full bg-white/70 animate-pulse-ring" />
                      <span className="relative w-2 h-2 rounded-full bg-white" />
                    </span>
                    URGENT 24h/7j
                  </span>
                )}
                <h1 className="text-white text-[clamp(32px,5.2vw,52px)] mb-4">{service.name}</h1>
                <p className="text-brand-xlight/85 text-[clamp(16px,2vw,20px)] max-w-xl mb-8 leading-relaxed">
                  {service.tagline}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={RESERVATION}
                    className="inline-flex items-center gap-2.5 font-['Plus_Jakarta_Sans'] font-bold text-[16px] bg-white text-brand-dark px-7 py-4 rounded-full shadow-float hover:-translate-y-0.5 hover:bg-tint transition-all"
                  >
                    <AppIcon name="Calendar" className="w-5 h-5" />
                    <span>Prendre Rendez-vous</span>
                  </Link>
                  <a
                    href={TEL}
                    className={`inline-flex items-center gap-2.5 font-['Plus_Jakarta_Sans'] font-bold text-[16px] px-7 py-4 rounded-full transition-all hover:-translate-y-0.5 ${
                      urgent
                        ? "bg-emergency text-white shadow-emergency-glow hover:bg-emergency-dark"
                        : "glass-dark text-white hover:bg-white/20"
                    }`}
                  >
                    <AppIcon name="PhoneCalling" className="w-5 h-5" />
                    <span>Appeler</span>
                  </a>
                </div>
              </ScrollReveal>

              {/* Hero illustration — mobile / tablet (stacked) */}
              <ScrollReveal delay={0.1} direction="right" className="lg:hidden pb-12">
                <div className="gradient-ring relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/20 shadow-float">
                  <div className="absolute inset-0 bg-dots opacity-20" />
                  <Image
                    src={serviceImages[service.slug] ?? "/medcare3d.png"}
                    alt={service.name}
                    fill
                    priority
                    sizes="100vw"
                    className={service.slug === "medecin-domicile" ? "object-contain p-8" : "object-cover"}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ────────────────── ② DESCRIPTION + STAT ────────────────── */}
        <section className="py-12 lg:py-16">
          <div className="max-w-[1240px] mx-auto px-5">
            <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-14 items-start">
              <ScrollReveal>
                <Eyebrow>Le service</Eyebrow>
                <h2 className="text-[clamp(26px,4vw,40px)] mb-6">En quoi consiste ce service ?</h2>
                <div className="space-y-4">
                  {service.description.map((para, i) => (
                    <p key={i} className="text-muted-text text-[clamp(15px,1.9vw,17px)] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </ScrollReveal>

              {/* Highlight stat callout */}
              <ScrollReveal delay={0.1}>
                <div className="gradient-ring relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand to-brand-dark text-white p-8 shadow-brand-glow">
                  <div className="absolute inset-0 bg-grid-light opacity-30" />
                  <div className="relative">
                    <AppIcon name="Sparkles" className="w-8 h-8 text-brand-xlight mb-4" />
                    <div className="text-[clamp(34px,6vw,48px)] font-['Plus_Jakarta_Sans'] font-extrabold leading-none mb-3">
                      {service.highlightStat.value}
                    </div>
                    <p className="text-brand-xlight/85 text-[15px] leading-relaxed">
                      {service.highlightStat.label}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─────────────────── ③ POURQUOI MEDCARE ─────────────────── */}
        <section className="py-12 lg:py-16 bg-surface">
          <div className="max-w-[1240px] mx-auto px-5">
            <ScrollReveal className="max-w-[660px] mb-12">
              <Eyebrow>Pourquoi MEDCARE&nbsp;?</Eyebrow>
              <h2 className="text-[clamp(28px,4.4vw,44px)] mb-3.5">Les atouts de notre prise en charge</h2>
              <p className="text-muted-text text-[clamp(16px,2vw,18px)]">
                Un service pensé pour votre tranquillité, du premier appel au suivi final.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.advantages.map((adv, i) => (
                <ScrollReveal key={adv.title} delay={0.08 * i}>
                  <div className="group h-full bg-white rounded-2xl border border-line-2 shadow-card p-6 text-center hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-xl bg-tint flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-brand-dark group-hover:shadow-brand-glow transition-all duration-300">
                      <AppIcon name={adv.icon} className="w-6 h-6 text-brand group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-['Plus_Jakarta_Sans'] font-bold mb-1.5 group-hover:text-brand transition-colors duration-300">
                      {adv.title}
                    </h3>
                    <p className="text-muted-text text-sm leading-relaxed">{adv.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── ④ DÉTAILS DU SERVICE ────────────────── */}
        <section className="py-12 lg:py-16">
          <div className="max-w-[1240px] mx-auto px-5">
            <ScrollReveal className="max-w-[660px] mb-12">
              <Eyebrow>Détails</Eyebrow>
              <h2 className="text-[clamp(28px,4.4vw,44px)] mb-3.5">{service.details.title}</h2>
              {"subtitle" in service.details && service.details.subtitle && (
                <p className="text-muted-text text-[clamp(16px,2vw,18px)]">{service.details.subtitle}</p>
              )}
            </ScrollReveal>

            <ServiceDetailsBlock service={service} />
          </div>
        </section>

        {/* ─────────────────────── ⑤ TARIFS ───────────────────────── */}
        <section className="py-12 lg:py-16 bg-surface">
          <div className="max-w-[1240px] mx-auto px-5">
            <ScrollReveal className="max-w-[660px] mb-12">
              <Eyebrow>Tarifs</Eyebrow>
              <h2 className="text-[clamp(28px,4.4vw,44px)] mb-3.5">Nos formules &amp; tarifs</h2>
              <p className="text-muted-text text-[clamp(16px,2vw,18px)]">
                Des prix clairs et transparents, sans mauvaise surprise.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.pricing.map((tier, i) => (
                <ScrollReveal key={tier.name} delay={0.08 * i}>
                  <div
                    className={`relative h-full rounded-2xl p-7 flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
                      tier.recommended
                        ? "gradient-ring border border-transparent bg-white shadow-float"
                        : "border border-line-2 bg-white shadow-card"
                    }`}
                  >
                    {tier.recommended && (
                      <span className="absolute -top-3 start-7 inline-flex items-center gap-1.5 bg-brand text-white text-[12px] font-['Plus_Jakarta_Sans'] font-bold px-3 py-1 rounded-full shadow-brand-glow">
                        <AppIcon name="Sparkles" className="w-3.5 h-3.5" />
                        Recommandé
                      </span>
                    )}
                    <h3 className="text-[17px] font-['Plus_Jakarta_Sans'] font-bold mb-3">{tier.name}</h3>
                    <div className="flex items-baseline gap-1.5 mb-5">
                      <span className="text-[clamp(22px,3vw,26px)] font-['Plus_Jakarta_Sans'] font-extrabold text-brand">
                        {tier.price}
                      </span>
                      {tier.unit && <span className="text-muted-text text-sm">{tier.unit}</span>}
                    </div>
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[14.5px] text-ink-soft">
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-tint flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-brand" />
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={RESERVATION}
                      className={`inline-flex items-center justify-center gap-2 font-['Plus_Jakarta_Sans'] font-bold text-[15px] px-5 py-3 rounded-full transition-all hover:-translate-y-0.5 ${
                        tier.recommended
                          ? "bg-brand text-white shadow-brand-glow hover:bg-brand-dark"
                          : "bg-tint text-brand-dark hover:bg-brand hover:text-white"
                      }`}
                    >
                      <AppIcon name="Calendar" className="w-4 h-4" />
                      <span>Demander un devis</span>
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <p className="text-muted-text text-[13.5px] mt-8 max-w-3xl leading-relaxed">{PRICING_DISCLAIMER}</p>
          </div>
        </section>

        {/* ─────────────────── ⑥ COMMENT RÉSERVER ──────────────────── */}
        <section className="py-12 lg:py-16">
          <div className="max-w-[1240px] mx-auto px-5">
            <ScrollReveal className="max-w-[660px] mx-auto text-center mb-12">
              <div className="flex justify-center"><Eyebrow>Comment réserver&nbsp;?</Eyebrow></div>
              <h2 className="text-[clamp(28px,4.4vw,44px)] mb-3.5">Réservez en 5 étapes simples</h2>
              <p className="text-muted-text text-[clamp(16px,2vw,18px)]">
                De votre premier contact au suivi, nous vous accompagnons à chaque étape.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-5">
              {RESERVE_STEPS.map((step, i) => (
                <ScrollReveal key={step.num} delay={0.08 * i}>
                  <div className="relative text-center group">
                    <div className="relative mx-auto w-16 h-16 mb-5">
                      <div className="absolute inset-0 rounded-full bg-brand/25 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="gradient-ring relative w-16 h-16 rounded-full bg-gradient-to-br from-brand to-brand-dark text-white flex items-center justify-center font-['Plus_Jakarta_Sans'] font-extrabold text-xl shadow-brand-glow group-hover:scale-110 transition-transform duration-300">
                        {step.num}
                      </div>
                    </div>
                    {i < RESERVE_STEPS.length - 1 && (
                      <div className="hidden lg:block absolute top-8 start-[calc(50%+44px)] w-[calc(100%-88px)] h-[2px] bg-gradient-to-r from-brand-xlight via-brand-xlight/60 to-line-2">
                        <span className="absolute -top-[3px] start-0 w-2 h-2 rounded-full bg-brand-xlight" />
                      </div>
                    )}
                    <h3 className="text-[16px] font-['Plus_Jakarta_Sans'] font-bold mb-2">{step.t}</h3>
                    <p className="text-muted-text text-sm leading-relaxed">{step.d}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────── ⑦ FAQ ──────────────────────────── */}
        <section className="py-12 lg:py-16 bg-surface">
          <div className="max-w-[820px] mx-auto px-5">
            <ScrollReveal className="text-center mb-12">
              <div className="flex justify-center"><Eyebrow>FAQ</Eyebrow></div>
              <h2 className="text-[clamp(28px,4.4vw,44px)] mb-3.5">Questions fréquentes</h2>
              <p className="text-muted-text text-[clamp(16px,2vw,18px)]">
                Tout ce que vous devez savoir sur ce service.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <Accordion className="bg-white rounded-2xl border border-line-2 shadow-card px-5 sm:px-7">
                {service.faq.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-[15.5px] font-['Plus_Jakarta_Sans'] font-bold text-ink py-5 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-text text-[14.5px] leading-relaxed pe-6">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        {/* ──────────────────── ⑧ CTA BANNER ───────────────────────── */}
        <section className="py-12 lg:py-16">
          <div className="max-w-[1240px] mx-auto px-5">
            <ScrollReveal>
              <div
                className={`gradient-ring rounded-[34px] p-10 lg:p-16 text-center relative overflow-hidden shadow-float ${
                  urgent
                    ? "bg-gradient-to-br from-emergency via-emergency-dark to-[#9e1f2e]"
                    : "bg-gradient-to-br from-brand via-brand-dark to-brand-deeper"
                }`}
              >
                <div className="absolute inset-0 bg-grid-light opacity-40" />
                {urgent && (
                  <span className="absolute inset-0 -z-0 bg-white/5 animate-glow-pulse" />
                )}
                <div className="absolute -start-20 -top-20 w-60 h-60 rounded-full bg-white/10 blur-2xl animate-aurora" />
                <div className="absolute -end-20 -bottom-20 w-60 h-60 rounded-full bg-white/10 blur-2xl animate-aurora-slow" />

                <div className="relative z-10">
                  <h2 className="text-white text-[clamp(26px,4vw,42px)] mb-4">
                    {urgent ? "Une urgence ? Chaque minute compte." : `Besoin de ${service.name.toLowerCase()} ?`}
                  </h2>
                  <p className="text-white/85 text-[clamp(15px,1.8vw,17px)] mb-8 max-w-lg mx-auto">
                    Notre équipe est disponible 24h/24 pour répondre à votre demande et organiser votre prise en charge.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href={TEL}
                      className="inline-flex items-center gap-2.5 font-['Plus_Jakarta_Sans'] font-bold text-[16.5px] bg-white text-brand-dark px-7 py-4.5 rounded-full shadow-float hover:-translate-y-0.5 hover:bg-tint transition-all"
                    >
                      <AppIcon name="PhoneCalling" className="w-5 h-5" />
                      <span>Appeler maintenant</span>
                    </a>
                    <Link
                      href={RESERVATION}
                      className="inline-flex items-center gap-2.5 font-['Plus_Jakarta_Sans'] font-bold text-[16.5px] bg-white/15 text-white border border-white/25 backdrop-blur-md px-7 py-4.5 rounded-full hover:bg-white/25 hover:-translate-y-0.5 transition-all"
                    >
                      <AppIcon name="Calendar" className="w-5 h-5" />
                      <span>Réserver en ligne</span>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* ───────────── Floating urgent button (urgent services only) ───────────── */}
      {urgent && (
        <a
          href={TEL}
          aria-label="Appel d'urgence"
          className="fixed bottom-6 lg:bottom-8 start-5 lg:start-8 z-[60] group inline-flex items-center gap-2.5 bg-emergency text-white font-['Plus_Jakarta_Sans'] font-bold text-[15px] ps-3.5 pe-5 py-3.5 rounded-full shadow-emergency-glow hover:bg-emergency-dark hover:-translate-y-0.5 transition-all"
        >
          <span className="relative flex items-center justify-center">
            <span className="absolute w-10 h-10 rounded-full bg-emergency/40 animate-pulse-ring" />
            <span className="relative w-9 h-9 rounded-full bg-white/20 grid place-items-center">
              <AppIcon name="PhoneCalling" className="w-[18px] h-[18px]" />
            </span>
          </span>
          <span className="hidden sm:inline">Appel d&apos;urgence</span>
        </a>
      )}
    </>
  );
}

// ─────────────── Service-specific "Détails" renderer ───────────────
function ServiceDetailsBlock({ service }: { service: ServiceData }) {
  const d = service.details;

  if (d.kind === "variants") {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {d.items.map((item, i) => (
          <ScrollReveal key={item.name} delay={0.08 * i}>
            <div className="group h-full bg-white rounded-2xl border border-line-2 shadow-card p-6 text-center hover:-translate-y-1 hover:border-brand-xlight transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-tint to-brand-xlight/30 flex items-center justify-center mx-auto mb-4 group-hover:from-brand group-hover:to-brand-dark transition-all duration-300">
                <AppIcon name={item.icon} className="w-7 h-7 text-brand group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-[17px] font-['Plus_Jakarta_Sans'] font-bold mb-2 group-hover:text-brand transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-muted-text text-sm leading-relaxed mb-4">{item.body}</p>
              {item.features && (
                <ul className="space-y-2 pt-4 border-t border-line-2 text-start">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13.5px] text-ink-soft">
                      <Check className="w-4 h-4 text-brand shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    );
  }

  if (d.kind === "actes") {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        {d.items.map((item, i) => (
          <ScrollReveal key={item.name} delay={0.06 * i}>
            <div className="group flex gap-4 bg-white rounded-2xl border border-line-2 shadow-soft p-5 hover:shadow-card transition-shadow duration-300">
              <div className="w-11 h-11 rounded-xl bg-tint flex items-center justify-center shrink-0 group-hover:bg-brand transition-colors duration-300">
                <Check className="w-5 h-5 text-brand group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-[15.5px] font-['Plus_Jakarta_Sans'] font-bold mb-1">{item.name}</h3>
                <p className="text-muted-text text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    );
  }

  if (d.kind === "tele") {
    return (
      <div className="grid lg:grid-cols-2 gap-8">
        <ScrollReveal>
          <div className="bg-white rounded-2xl border border-line-2 shadow-card p-7 h-full">
            <h3 className="text-[17px] font-['Plus_Jakarta_Sans'] font-bold mb-4">Spécialités disponibles</h3>
            <div className="flex flex-wrap gap-2.5">
              {d.specialities.map((sp) => (
                <span
                  key={sp}
                  className="inline-flex items-center bg-tint text-brand-dark text-[13.5px] font-['Plus_Jakarta_Sans'] font-semibold px-4 py-2 rounded-full hover:bg-brand hover:text-white transition-colors duration-300"
                >
                  {sp}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="bg-white rounded-2xl border border-line-2 shadow-card p-7 h-full">
            <h3 className="text-[17px] font-['Plus_Jakarta_Sans'] font-bold mb-4">Appareils compatibles</h3>
            <div className="grid grid-cols-3 gap-4">
              {d.devices.map((dev) => (
                <div key={dev.name} className="group flex flex-col items-center gap-2.5 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-tint grid place-items-center group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-brand-dark transition-all duration-300">
                    <AppIcon name={dev.icon} className="w-7 h-7 text-brand group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[13.5px] font-['Plus_Jakarta_Sans'] font-semibold text-ink-soft">{dev.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  // d.kind === "analyses"
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {d.types.map((item, i) => (
          <ScrollReveal key={item.name} delay={0.06 * i}>
            <div className="h-full bg-white rounded-2xl border border-line-2 shadow-soft p-5 hover:shadow-card transition-shadow duration-300">
              <h3 className="text-[15.5px] font-['Plus_Jakarta_Sans'] font-bold mb-1.5 text-brand">{item.name}</h3>
              <p className="text-muted-text text-sm leading-relaxed">{item.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal>
        <div className="flex items-start gap-4 bg-tint rounded-2xl p-6">
          <div className="w-11 h-11 rounded-xl bg-brand grid place-items-center shrink-0">
            <AppIcon name="Sparkles" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-[15.5px] font-['Plus_Jakarta_Sans'] font-bold mb-1 text-brand-dark">Délai des résultats</h3>
            <p className="text-ink-soft text-sm leading-relaxed">{d.delai}</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
