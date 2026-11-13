"use client";

import { useId, useState, type ReactNode } from "react";
import { LocateFixed, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n-context";
import { SERVICE_CATALOG } from "@/lib/service-catalog";
import type { DictKey } from "@/lib/i18n";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CallLink, WhatsAppLink, useWhatsAppMessage } from "@/components/ui/cta";
import { setSharedPosition, useSharedPosition } from "@/lib/position-store";

const SHORT_LABELS: DictKey[] = ["sh1", "sh2", "sh3", "sh4", "sh5", "sh6", "sh7", "sh8", "sh9"];
const WHO: { label: DictKey; line: DictKey }[] = [
  { label: "rb_me", line: "rb_msg_me" },
  { label: "rb_relative", line: "rb_msg_relative" },
];
const DAYS: DictKey[] = ["rb_now", "rb_today", "rb_tomorrow", "rb_other_date"];
const PERIODS: DictKey[] = ["rb_morning", "rb_afternoon", "rb_evening", "rb_night"];

const fieldInput =
  "block min-h-12 w-full rounded-xl bg-white px-4 text-base text-ink ring-1 ring-inset ring-line placeholder:text-muted-text focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand";

// One block of the form: a question, an optional hint, then its controls.
function Block({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("border-b border-line px-4 py-5 sm:px-6 sm:py-6", className)}>{children}</div>;
}

// A row of equal-width text choices. Native radios or checkboxes stay in the
// DOM, so the group works with a keyboard and a screen reader like any form.
function Choices({
  legend,
  hint,
  name,
  options,
  selected,
  onToggle,
  multiple = false,
  columns,
  small = false,
}: {
  legend: string;
  hint?: string;
  name: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  multiple?: boolean;
  /** Tailwind grid classes for the choices. */
  columns: string;
  /** A sub-question inside a block: quieter legend. */
  small?: boolean;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className={small ? "text-[0.9375rem] font-medium text-ink-soft" : "text-base font-semibold text-ink"}>
        {legend}
      </legend>
      {hint && <p className="mt-0.5 text-sm text-muted-text">{hint}</p>}
      <div className={cn("mt-3 grid gap-2", columns)}>
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <label key={option.value} className="press relative block cursor-pointer">
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onToggle(option.value)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex min-h-11 items-center justify-center rounded-lg px-2.5 text-center text-[0.9375rem] leading-tight ring-1 ring-inset transition-colors duration-150",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand",
                  checked
                    ? "bg-brand font-semibold text-white ring-brand"
                    : "bg-background font-medium text-ink-soft ring-line hover:ring-brand"
                )}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// The request builder. A visitor answers a few short questions and gets a
// complete WhatsApp message, ready to send: which service, for whom, the day
// and time, where, and anything else the team should know.
// Nothing is stored or sent by the site: the message opens in the visitor's
// own WhatsApp, and MedCare confirms from there.
// On a service page, `defaultService` starts with that service selected.
export function FinalCta({ defaultService }: { defaultService?: string }) {
  const { t, lang } = useI18n();
  const formId = useId();
  const [services, setServices] = useState<string[]>(defaultService ? [defaultService] : []);
  const [who, setWho] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [notes, setNotes] = useState("");
  // The visitor's position as a map link, added only when they ask for it.
  // It is shared with every other WhatsApp button on the site.
  const position = useSharedPosition();
  const [locating, setLocating] = useState<"idle" | "busy" | "error">("idle");

  const toggleService = (slug: string) =>
    setServices((current) => (current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]));

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setLocating("error");
      return;
    }
    setLocating("busy");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setSharedPosition(`https://maps.google.com/?q=${coords.latitude.toFixed(5)},${coords.longitude.toFixed(5)}`);
        setLocating("idle");
      },
      () => setLocating("error"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const chosen = SERVICE_CATALOG.filter((s) => services.includes(s.slug));
  const serviceNames = chosen.map((s) => t(s.title)).join(t("rb_list_sep"));
  const urgentNow = day === "rb_now" && chosen.some((s) => s.urgent);
  const whoLine = WHO.find((option) => option.label === who)?.line;
  const needsTime = day !== "" && day !== "rb_now";

  // "samedi 14 novembre" in French, the Arabic equivalent in Arabic.
  const formattedDate = date
    ? new Intl.DateTimeFormat(lang === "ar" ? "ar-MA" : "fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(new Date(`${date}T12:00:00`))
    : "";
  const dayText = day === "rb_other_date" ? formattedDate : day ? t(day as DictKey) : "";
  const timeText = needsTime ? time || (period ? t(period as DictKey) : "") : "";

  const lines = [
    serviceNames && t("rb_msg_service", { value: serviceNames }),
    whoLine && t(whoLine),
    dayText && t("rb_msg_when", { value: dayText }),
    timeText && t("rb_msg_time", { value: timeText }),
    place.trim() && t("rb_msg_place", { value: place.trim() }),
    notes.trim() && t("rb_msg_notes", { value: notes.trim() }),
  ].filter(Boolean) as string[];
  const message = lines.length ? [t("rb_msg_intro"), ...lines].join("\n") : t("wa_generic");
  // What will actually be sent, position included.
  const preview = useWhatsAppMessage(message);

  return (
    <section id="contact" className="bg-white pb-14 lg:pb-24">
      <div className="shell">
        <ScrollReveal className="rounded-[1.75rem] bg-tint px-3 py-8 sm:px-8 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:px-12 lg:py-14">
          {/* On wide screens the heading stays in view while the form scrolls. */}
          <div className="px-2 lg:sticky lg:top-28 lg:self-start lg:px-0">
            <h2 className="text-title">{t("cta_h2")}</h2>
            <p className="text-lead mt-4 max-w-md text-ink-soft">{t("rb_sub")}</p>
            <div className="mt-7 hidden lg:block">
              <CallLink place="final" size="lg" variant="outline" />
            </div>
          </div>

          <form
            className="mt-7 overflow-hidden rounded-[1.25rem] bg-white shadow-card ring-1 ring-line lg:mt-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <Block>
              <Choices
                legend={t("rb_q_service")}
                hint={t("rb_q_service_hint")}
                name={`${formId}-service`}
                multiple
                selected={services}
                onToggle={toggleService}
                columns="grid-cols-2 sm:grid-cols-3"
                options={SERVICE_CATALOG.map((s, i) => ({ value: s.slug, label: t(SHORT_LABELS[i]) }))}
              />
            </Block>

            <Block>
              <Choices
                legend={t("rb_q_who")}
                name={`${formId}-who`}
                selected={who ? [who] : []}
                onToggle={setWho}
                columns="grid-cols-2"
                options={WHO.map((option) => ({ value: option.label, label: t(option.label) }))}
              />
            </Block>

            <Block className="grid gap-5">
              <Choices
                legend={t("rb_q_when")}
                name={`${formId}-day`}
                selected={day ? [day] : []}
                onToggle={setDay}
                columns="grid-cols-2 sm:grid-cols-4"
                options={DAYS.map((key) => ({ value: key, label: t(key) }))}
              />

              {day === "rb_other_date" && (
                <div>
                  <label htmlFor={`${formId}-date`} className="text-[0.9375rem] font-medium text-ink-soft">
                    {t("rb_date_label")}
                  </label>
                  <input
                    id={`${formId}-date`}
                    type="date"
                    value={date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setDate(e.target.value)}
                    className={cn(fieldInput, "mt-2")}
                  />
                </div>
              )}

              {needsTime && (
                <div className="grid gap-3">
                  <Choices
                    small
                    legend={t("rb_q_time")}
                    name={`${formId}-period`}
                    selected={period && !time ? [period] : []}
                    onToggle={(value) => {
                      setPeriod(value);
                      setTime("");
                    }}
                    columns="grid-cols-2 sm:grid-cols-4"
                    options={PERIODS.map((key) => ({ value: key, label: t(key) }))}
                  />
                  <div>
                    <label htmlFor={`${formId}-time`} className="text-[0.9375rem] font-medium text-ink-soft">
                      {t("rb_time_exact")}
                    </label>
                    <input
                      id={`${formId}-time`}
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={cn(fieldInput, "mt-2")}
                    />
                  </div>
                </div>
              )}
            </Block>

            <Block>
              <label htmlFor={`${formId}-place`} className="text-base font-semibold text-ink">
                {t("rb_q_place")}
              </label>
              <p id={`${formId}-place-hint`} className="mt-0.5 text-sm text-muted-text">
                {t("rb_q_place_hint")}
              </p>

              {position ? (
                <p className="mt-3 flex min-h-12 items-center gap-2 rounded-xl bg-tint ps-3 pe-1 text-[0.9375rem] font-medium text-brand-deeper">
                  <LocateFixed className="size-5 shrink-0 text-brand" aria-hidden="true" />
                  <span className="flex-1">{t("rb_located")}</span>
                  <button
                    type="button"
                    onClick={() => setSharedPosition("")}
                    aria-label={t("rb_locate_remove")}
                    className="press grid size-10 place-items-center rounded-full text-brand-dark hover:bg-tint-2"
                  >
                    <X className="size-4" strokeWidth={2.5} />
                  </button>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={locate}
                  disabled={locating === "busy"}
                  className="press mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-tint px-4 text-[0.9375rem] font-semibold text-brand-deeper ring-1 ring-inset ring-brand/30 hover:bg-tint-2 disabled:opacity-60"
                >
                  <LocateFixed className="size-5 shrink-0" aria-hidden="true" />
                  {locating === "busy" ? t("rb_locating") : t("rb_locate")}
                </button>
              )}
              <input
                id={`${formId}-place`}
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                maxLength={80}
                autoComplete="address-level2"
                enterKeyHint="next"
                aria-describedby={`${formId}-place-hint`}
                placeholder={t("rb_place_ph")}
                className={cn(fieldInput, "mt-2")}
              />
              <p role="status" className="mt-2 text-sm text-ink-soft empty:hidden">
                {locating === "error" ? t("rb_locate_error") : ""}
              </p>
            </Block>

            <Block>
              <label htmlFor={`${formId}-notes`} className="text-base font-semibold text-ink">
                {t("rb_q_notes")}
              </label>
              <textarea
                id={`${formId}-notes`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                maxLength={300}
                placeholder={t("rb_notes_ph")}
                className={cn(fieldInput, "mt-3 min-h-20 resize-none py-3 leading-relaxed")}
              />
            </Block>

            <div className="bg-sand p-4 sm:p-6">
              <p className="text-sm font-semibold text-ink-soft">{t("rb_preview")}</p>
              <p
                role="status"
                className="mt-2 w-fit max-w-full whitespace-pre-line break-words rounded-2xl rounded-ee-md bg-[#DCF8C6] px-4 py-3 text-[0.9375rem] leading-relaxed text-whatsapp-ink shadow-card"
              >
                {preview}
              </p>

              {urgentNow && (
                <div className="mt-4 rounded-2xl bg-emergency-tint p-4">
                  <p className="text-[0.9375rem] font-semibold text-emergency-dark">{t("rb_urgent")}</p>
                  <CallLink place="final-urgent" variant="urgent" className="mt-3 w-full" />
                </div>
              )}

              <WhatsAppLink place="final" size="lg" message={message} className="mt-4 w-full">
                {t("rb_send")}
              </WhatsAppLink>
              <p className="mt-3 text-center text-sm text-muted-text">{t("rb_privacy")}</p>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
