// Interface strings of the service pages (/services/[slug]), in both languages.
// The content of each service lives in services-data.ts (French) and
// services-data-ar.ts (Arabic). Strings shared with the home page (call and
// WhatsApp buttons, opening hours, closing headings) stay in i18n.ts.
// `{service}` and `{tier}` are placeholders filled in by the component.

import type { Lang } from "./i18n";

type ServicePageCopy = {
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbServices: string;
  urgentBadge: string;
  descriptionHeading: string;
  advantagesHeading: string;
  pricingHeading: string;
  quoteCta: string;
  /** WhatsApp message typed in advance when asking for a quote on one tier. */
  quoteMessage: string;
  bookingHeading: string;
  // Booking happens by phone or on WhatsApp only: there is no app and no form.
  bookingSteps: readonly { title: string; body: string }[];
  faqHeading: string;
  specialitiesHeading: string;
  devicesHeading: string;
  resultsDelayHeading: string;
  // Alt text of the hero photo, keyed by service slug. It says what is in the
  // picture, since the service name is already the h1.
  photoAlt: Readonly<Record<string, string>>;
  photoAltFallback: string;
};

export const SERVICE_PAGE_COPY = {
  fr: {
    breadcrumbLabel: "Fil d'Ariane",
    breadcrumbHome: "Accueil",
    breadcrumbServices: "Services",
    urgentBadge: "Urgence 24h/24",
    descriptionHeading: "En quoi consiste ce service ?",
    advantagesHeading: "Pourquoi passer par MedCare",
    pricingHeading: "Tarifs indicatifs",
    quoteCta: "Demander un devis",
    quoteMessage: "Bonjour MedCare, je voudrais un devis pour : {service}, {tier}.",
    bookingHeading: "Comment réserver",
    bookingSteps: [
      {
        title: "Vous appelez ou vous écrivez",
        body: "Par téléphone ou sur WhatsApp, à n'importe quelle heure.",
      },
      {
        title: "On vous annonce le prix",
        body: "Vous décrivez la situation. Le devis est gratuit et vous l'avez avant toute intervention.",
      },
      {
        title: "On fixe l'intervention",
        body: "On fixe le jour et l'heure avec vous, puis le soignant vient.",
      },
      {
        title: "On reste joignables",
        body: "Après l'intervention, vous gardez le même numéro pour la suite.",
      },
    ],
    faqHeading: "Questions fréquentes",
    specialitiesHeading: "Spécialités disponibles",
    devicesHeading: "Appareils compatibles",
    resultsDelayHeading: "Délai des résultats",
    photoAlt: {
      "ambulance": "Deux ambulanciers MedCare approchent un brancard de l'arrière d'une ambulance, dans une rue de Casablanca",
      "medecin-domicile": "Un médecin écoute au stéthoscope la poitrine d'un patient assis dans son salon",
      "infirmiere-domicile": "Une infirmière MedCare règle une perfusion au chevet d'une patiente",
      "garde-malade": "Une garde-malade veille, la nuit, au chevet d'une dame âgée endormie",
      "teleconsultation": "Une mère et son enfant parlent à un médecin sur une tablette posée sur la table de la cuisine",
      "prelevement-analyses": "Une infirmière MedCare prépare une prise de sang chez un patient, à la table du petit-déjeuner",
      "rapatriement": "Une infirmière MedCare pousse le fauteuil d'un patient dans le hall d'un aéroport, son fils à ses côtés",
      "equipe-evenementielle": "Deux soignants MedCare bandent la cheville d'un coureur sur la Corniche de Casablanca",
      "personne-agee": "Une infirmière MedCare accompagne un homme âgé qui marche avec un déambulateur sur sa terrasse",
    },
    photoAltFallback: "Une infirmière MedCare règle une perfusion au chevet d'une patiente",
  },
  ar: {
    breadcrumbLabel: "مسار التصفح",
    breadcrumbHome: "الرئيسية",
    breadcrumbServices: "الخدمات",
    urgentBadge: "مستعجلات 24 ساعة على 24",
    descriptionHeading: "ما هي هذه الخدمة؟",
    advantagesHeading: "لماذا تختارون ميدكير",
    pricingHeading: "أثمنة تقريبية",
    quoteCta: "اسألوا عن الثمن",
    quoteMessage: "السلام عليكم، أريد تقديراً للتكلفة بخصوص: {service}، {tier}.",
    bookingHeading: "كيف تحجزون",
    bookingSteps: [
      {
        title: "تتصلون أو تراسلوننا",
        body: "عبر الهاتف أو واتساب، في أي ساعة.",
      },
      {
        title: "نخبركم بالثمن",
        body: "تصفون لنا الحالة. نخبركم بالثمن مجاناً قبل أن نأتي إليكم.",
      },
      {
        title: "نحدد الموعد",
        body: "نتفق معكم على الوقت، ثم نرسل الشخص أو الفريق المناسب.",
      },
      {
        title: "نبقى رهن إشارتكم",
        body: "بعد الزيارة، تتواصلون معنا على الرقم نفسه.",
      },
    ],
    faqHeading: "أسئلة شائعة",
    specialitiesHeading: "التخصصات المتوفرة",
    devicesHeading: "الأجهزة المناسبة",
    resultsDelayHeading: "مدة ظهور النتائج",
    photoAlt: {
      "ambulance": "مسعفان من ميدكير يقرّبان نقالة من الباب الخلفي لسيارة إسعاف في أحد شوارع الدار البيضاء",
      "medecin-domicile": "طبيب يفحص بالسماعة صدر مريض جالس في صالون بيته",
      "infirmiere-domicile": "ممرضة من ميدكير تضبط السيروم بجانب سرير مريضة",
      "garde-malade": "مرافِقة تسهر ليلاً بجانب سيدة مسنّة نائمة",
      "teleconsultation": "أم وطفلها يتحدثان إلى طبيب عبر لوحة إلكترونية فوق طاولة المطبخ",
      "prelevement-analyses": "ممرضة من ميدكير تحضّر لأخذ عينة دم من مريض، بجانب مائدة الفطور",
      "rapatriement": "ممرضة من ميدكير تدفع كرسي مريض في بهو المطار، وابنه بجانبه",
      "equipe-evenementielle": "مسعفان من ميدكير يضمدان كاحل عدّاء على كورنيش الدار البيضاء",
      "personne-agee": "ممرضة من ميدكير ترافق رجلاً مسنّاً يمشي بمساعدة مشّاية على سطح بيته",
    },
    photoAltFallback: "ممرضة من ميدكير تضبط السيروم بجانب سرير مريضة",
  },
} as const satisfies Record<Lang, ServicePageCopy>;
