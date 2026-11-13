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
      "ambulance": "Deux ambulanciers chargent un brancard à l'arrière d'une ambulance",
      "medecin-domicile": "Un médecin, sacoche à l'épaule, accueilli à la porte par une patiente",
      "infirmiere-domicile": "Une soignante prend la tension d'une patiente assise sur son canapé",
      "garde-malade": "Une garde-malade tend un verre d'eau à une dame âgée assise chez elle",
      "teleconsultation": "Une patiente parle à un médecin en appel vidéo sur son ordinateur",
      "prelevement-analyses": "Une soignante fait une prise de sang au bras d'une patiente",
      "rapatriement": "Deux soignants montent un patient sur un brancard à bord d'un avion sanitaire",
      "equipe-evenementielle": "Trois soignants en tenue médicale, debout, les bras croisés",
      "personne-agee": "Une aide pousse le fauteuil roulant d'une dame âgée",
    },
    photoAltFallback: "Une soignante prend la tension d'une patiente chez elle",
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
      "ambulance": "مسعفان يُدخلان نقالة من الباب الخلفي لسيارة إسعاف",
      "medecin-domicile": "مريضة تستقبل عند الباب طبيباً يحمل حقيبته على كتفه",
      "infirmiere-domicile": "ممرضة تقيس ضغط دم مريضة جالسة على أريكتها",
      "garde-malade": "مرافِقة تناول كأس ماء لسيدة مسنّة جالسة في بيتها",
      "teleconsultation": "مريضة تتحدث إلى طبيب عبر مكالمة فيديو على حاسوبها",
      "prelevement-analyses": "ممرضة تأخذ عينة دم من ذراع مريضة",
      "rapatriement": "مسعفان يُصعدان مريضاً على نقالة إلى طائرة طبية",
      "equipe-evenementielle": "ثلاثة من أفراد الطاقم الطبي بلباسهم المهني، واقفون وأذرعهم متشابكة",
      "personne-agee": "مساعِدة تدفع الكرسي المتحرك لسيدة مسنّة",
    },
    photoAltFallback: "ممرضة تقيس ضغط دم مريضة في بيتها",
  },
} as const satisfies Record<Lang, ServicePageCopy>;
