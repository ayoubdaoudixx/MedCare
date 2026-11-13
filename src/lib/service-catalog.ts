import type { DictKey } from "./i18n";

// The nine services as the home page, header and footer list them.
// Long-form content for each service page lives in `services-data.ts`.
export type CatalogService = {
  slug: string;
  icon: string;
  image: string;
  /**
   * Where the people sit in the photo, as "x% y%". The photos are portraits
   * shown in a shorter frame, so this decides which part survives the crop.
   */
  focus: string;
  title: DictKey;
  desc: DictKey;
  /** Urgent services lead with a phone call instead of WhatsApp. */
  urgent?: boolean;
};

export const SERVICE_CATALOG: CatalogService[] = [
  { slug: "ambulance", icon: "Ambulance", image: "/service-ambulance.webp", focus: "50% 72%", title: "s1_t", desc: "s1_d", urgent: true },
  { slug: "medecin-domicile", icon: "Stethoscope", image: "/service-medecin-domicile.webp", focus: "50% 42%", title: "s2_t", desc: "s2_d", urgent: true },
  { slug: "infirmiere-domicile", icon: "Syringe", image: "/service-infirmiere-domicile.webp", focus: "55% 26%", title: "s3_t", desc: "s3_d" },
  { slug: "garde-malade", icon: "HeartHandshake", image: "/service-garde-malade.webp", focus: "50% 62%", title: "s4_t", desc: "s4_d" },
  { slug: "teleconsultation", icon: "Video", image: "/service-teleconsultation.webp", focus: "50% 60%", title: "s5_t", desc: "s5_d" },
  { slug: "prelevement-analyses", icon: "TestTube", image: "/service-prelevement-analyses.webp", focus: "50% 44%", title: "s6_t", desc: "s6_d" },
  { slug: "rapatriement", icon: "Plane", image: "/service-rapatriement.webp", focus: "50% 86%", title: "s7_t", desc: "s7_d" },
  { slug: "equipe-evenementielle", icon: "CalendarHeart", image: "/service-equipe-evenementielle.webp", focus: "50% 72%", title: "s8_t", desc: "s8_d" },
  { slug: "personne-agee", icon: "Accessibility", image: "/service-personne-agee.webp", focus: "50% 52%", title: "s9_t", desc: "s9_d" },
];

/** The four needs shown first in the hero, in the order visitors ask for them. */
export const QUICK_NEEDS: { slug: string; icon: string; label: DictKey; urgent?: boolean }[] = [
  { slug: "ambulance", icon: "Ambulance", label: "q1", urgent: true },
  { slug: "medecin-domicile", icon: "Stethoscope", label: "q2" },
  { slug: "infirmiere-domicile", icon: "Syringe", label: "q3" },
  { slug: "garde-malade", icon: "HeartHandshake", label: "q4" },
];
