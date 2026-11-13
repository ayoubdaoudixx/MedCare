import type { DictKey } from "./i18n";

// The nine services as the home page, header and footer list them.
// Long-form content for each service page lives in `services-data.ts`.
export type CatalogService = {
  slug: string;
  icon: string;
  image: string;
  title: DictKey;
  desc: DictKey;
  /** Urgent services lead with a phone call instead of WhatsApp. */
  urgent?: boolean;
};

export const SERVICE_CATALOG: CatalogService[] = [
  { slug: "ambulance", icon: "Ambulance", image: "/ambulance.webp", title: "s1_t", desc: "s1_d", urgent: true },
  { slug: "medecin-domicile", icon: "Stethoscope", image: "/medecin-domicile.webp", title: "s2_t", desc: "s2_d", urgent: true },
  { slug: "infirmiere-domicile", icon: "Syringe", image: "/infirmiere-a-domicile.webp", title: "s3_t", desc: "s3_d" },
  { slug: "garde-malade", icon: "HeartHandshake", image: "/garde-malade.webp", title: "s4_t", desc: "s4_d" },
  { slug: "teleconsultation", icon: "Video", image: "/teleconsultation.webp", title: "s5_t", desc: "s5_d" },
  { slug: "prelevement-analyses", icon: "TestTube", image: "/prelevement-analyses.webp", title: "s6_t", desc: "s6_d" },
  { slug: "rapatriement", icon: "Plane", image: "/rapatriement.webp", title: "s7_t", desc: "s7_d" },
  { slug: "equipe-evenementielle", icon: "CalendarHeart", image: "/equipe-evenementielle.webp", title: "s8_t", desc: "s8_d" },
  { slug: "personne-agee", icon: "Accessibility", image: "/personne-agee.webp", title: "s9_t", desc: "s9_d" },
];

/** The four needs shown first in the hero, in the order visitors ask for them. */
export const QUICK_NEEDS: { slug: string; icon: string; label: DictKey; urgent?: boolean }[] = [
  { slug: "ambulance", icon: "Ambulance", label: "q1", urgent: true },
  { slug: "medecin-domicile", icon: "Stethoscope", label: "q2" },
  { slug: "infirmiere-domicile", icon: "Syringe", label: "q3" },
  { slug: "garde-malade", icon: "HeartHandshake", label: "q4" },
];
