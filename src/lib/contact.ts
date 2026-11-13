// Single source of truth for how visitors reach MedCare.
// Every call and WhatsApp link on the site is built from these values.

export const PHONE_E164 = "+212626216568";
/**
 * Local format, the way a Moroccan visitor reads it aloud. The groups are
 * joined with non-breaking spaces so the number never wraps, and wrapped in
 * Unicode isolates so the groups keep their order inside Arabic text.
 */
export const PHONE_DISPLAY = "\u206606\u00A026\u00A021\u00A065\u00A068\u2069";
export const TEL_HREF = `tel:${PHONE_E164}`;
export const EMAIL = "doccaremed@gmail.com";
export const MAILTO_HREF = `mailto:${EMAIL}`;

const WHATSAPP_NUMBER = "212626216568";

/** WhatsApp chat link, optionally opening with a message already typed. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Public emergency lines in Morocco, shown next to our own number so nobody
// in a life-threatening situation depends on a single phone line.
export const PUBLIC_EMERGENCY = [
  { number: "141", href: "tel:141" },
  { number: "150", href: "tel:150" },
] as const;
