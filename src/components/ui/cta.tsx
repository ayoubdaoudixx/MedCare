"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n-context";
import { PHONE_DISPLAY, TEL_HREF, whatsappHref } from "@/lib/contact";
import { useSharedPosition } from "@/lib/position-store";
import { AppIcon } from "@/components/ui/app-icon";
import { WhatsAppIcon } from "@/components/ui/social-icons";

// The two ways to reach MedCare. Every call and WhatsApp button on the site
// is one of these, so size, color and tracking stay identical everywhere.

type Size = "md" | "lg";

const base =
  "press inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap select-none";

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-7 text-[1.0625rem]",
};

const callVariants = {
  /** Blue, the default way to call. */
  brand: "bg-brand text-white hover:bg-brand-dark",
  /** Red, reserved for emergency contexts. */
  urgent: "bg-emergency text-white hover:bg-emergency-dark",
  /** Quiet button on light surfaces. */
  outline: "bg-white text-ink ring-1 ring-inset ring-line hover:ring-brand hover:text-brand-dark",
  /** Quiet button on dark surfaces. */
  "on-dark": "bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/15",
} as const;

const whatsappVariants = {
  solid: "bg-whatsapp text-whatsapp-ink hover:bg-whatsapp-dark",
  outline: "bg-white text-ink ring-1 ring-inset ring-line hover:ring-whatsapp-dark",
  "on-dark": "bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/15",
} as const;

// Lets any analytics tool count taps without touching the components again.
function track(kind: "call" | "whatsapp", place: string) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer?.push({ event: "contact_tap", contact_kind: kind, contact_place: place });
}

/**
 * The text a WhatsApp button will send: the given message (or a greeting),
 * followed by the visitor's map link when they have shared their position.
 */
export function useWhatsAppMessage(message?: string): string {
  const { t } = useI18n();
  const position = useSharedPosition();
  const text = message ?? t("wa_generic");
  return position ? `${text}\n${t("rb_msg_position", { value: position })}` : text;
}

export function CallLink({
  place,
  variant = "brand",
  size = "md",
  withNumber = true,
  className,
  children,
}: {
  /** Where on the page this button sits, for analytics. */
  place: string;
  variant?: keyof typeof callVariants;
  size?: Size;
  /** Show the phone number in the label. */
  withNumber?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <a
      href={TEL_HREF}
      data-contact="call"
      data-contact-place={place}
      onClick={() => track("call", place)}
      className={cn(base, sizes[size], callVariants[variant], className)}
    >
      <AppIcon name="PhoneCalling" className="size-5 shrink-0" />
      <span>{children ?? (withNumber ? t("call_number", { phone: PHONE_DISPLAY }) : t("call"))}</span>
    </a>
  );
}

export function WhatsAppLink({
  place,
  message,
  variant = "solid",
  size = "md",
  className,
  children,
}: {
  place: string;
  /** Text typed in advance in the visitor's WhatsApp. Defaults to a greeting. */
  message?: string;
  variant?: keyof typeof whatsappVariants;
  size?: Size;
  className?: string;
  children?: ReactNode;
}) {
  const { t } = useI18n();
  const text = useWhatsAppMessage(message);
  return (
    <a
      href={whatsappHref(text)}
      target="_blank"
      rel="noopener noreferrer"
      data-contact="whatsapp"
      data-contact-place={place}
      onClick={() => track("whatsapp", place)}
      className={cn(base, sizes[size], whatsappVariants[variant], className)}
    >
      <WhatsAppIcon className={cn("size-5 shrink-0", variant !== "solid" && "text-[#1FA855]")} />
      <span>{children ?? t("whatsapp_write")}</span>
    </a>
  );
}
