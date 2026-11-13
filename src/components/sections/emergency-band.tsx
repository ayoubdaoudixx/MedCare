"use client";

import { useI18n } from "@/lib/i18n-context";
import { PUBLIC_EMERGENCY } from "@/lib/contact";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AppIcon } from "@/components/ui/app-icon";
import { CallLink } from "@/components/ui/cta";

// The one place on the home page where red is used: a real emergency.
// It also names the public emergency lines, so a visitor in a life-threatening
// situation never depends on a single phone number.
export function EmergencyBand() {
  const { t } = useI18n();
  const publicLabels = [t("em_samu"), t("em_civil")];

  return (
    <section className="on-dark bg-brand-deep text-white">
      <ScrollReveal className="shell grid gap-8 py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:py-16">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-emergency text-white">
            <AppIcon name="Siren" className="size-6" />
          </span>
          <h2 className="text-title mt-5 text-white">{t("em_h2")}</h2>
          <p className="text-lead mt-3 max-w-xl text-on-dark">{t("em_p")}</p>
        </div>

        <div className="lg:w-[22rem]">
          <CallLink place="emergency" variant="urgent" size="lg" className="w-full" />
          <p className="mt-5 text-sm leading-relaxed text-on-dark">{t("em_public")}</p>
          <ul className="mt-3 grid grid-cols-2 gap-2.5">
            {PUBLIC_EMERGENCY.map((line, i) => (
              <li key={line.number}>
                <a
                  href={line.href}
                  className="press flex min-h-14 flex-col justify-center rounded-2xl bg-navy px-4 py-2 ring-1 ring-inset ring-white/10 hover:ring-white/30"
                >
                  <span className="num text-lg font-semibold leading-tight text-white">{line.number}</span>
                  <span className="text-xs leading-tight text-on-dark">{publicLabels[i]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
