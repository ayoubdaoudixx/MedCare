// ──────────────────────────────────────────────────────────────────────────
// MedCare: single source of truth for all service-page content.
// Icons reference lucide-react component names (resolved in the UI layer).
// Prices are indicative amounts in MAD (dirham marocain). They must be
// confirmed by the client before launch.
// Performance figures (response times, patient counts, years of experience,
// ratings, result delays) and unverified claims (partnerships, insurance
// agreements, certifications, app, online results, GPS tracking) were removed
// on purpose. Do not add any back without confirmation from the client.
// ──────────────────────────────────────────────────────────────────────────

export type Advantage = {
  icon: string; // lucide-react icon name
  title: string;
  body: string;
};

export type PricingItem = {
  name: string;
  price: string; // e.g. "À partir de 600 DH"
  unit?: string; // e.g. "/ intervention", "/ nuit"
  features: string[];
  recommended?: boolean;
};

export type FaqItem = { q: string; a: string };

// Service-specific "details" section: a discriminated union so each page can
// render the most relevant layout (variant cards, an actes list, etc.).
export type ServiceDetails =
  | {
      kind: "variants";
      title: string;
      subtitle?: string;
      items: { name: string; icon: string; body: string; features?: string[] }[];
    }
  | {
      kind: "actes";
      title: string;
      subtitle?: string;
      items: { name: string; body: string }[];
    }
  | {
      kind: "tele";
      title: string;
      subtitle?: string;
      specialities: string[];
      devices: { name: string; icon: string }[];
    }
  | {
      kind: "analyses";
      title: string;
      subtitle?: string;
      delai: string;
      types: { name: string; body: string }[];
    };

export type ServiceData = {
  slug: string;
  name: string;
  tagline: string;
  icon: string; // lucide-react icon name for hero placeholder + breadcrumb
  urgent?: boolean;
  description: string[]; // 2 or 3 paragraphs (French)
  highlightStat: { value: string; label: string }; // no longer displayed, keep non-numeric
  advantages: Advantage[];
  details: ServiceDetails;
  pricing: PricingItem[];
  faq: FaqItem[];
};

export const PRICING_DISCLAIMER =
  "Prix de départ, en dirhams. On vous confirme le montant exact avant la première visite, et le devis est gratuit.";

export const services: ServiceData[] = [
  // ───────────────────────────── 1. AMBULANCE ─────────────────────────────
  {
    slug: "ambulance",
    name: "Ambulance et transport sanitaire",
    tagline: "Une ambulance médicalisée ou un transport sanitaire, 24h/24 et 7j/7.",
    icon: "Ambulance",
    urgent: true,
    description: [
      "MedCare envoie une ambulance pour une urgence comme pour un simple transport sanitaire. L'équipage est formé aux premiers secours et au transport de patients.",
      "Transfert entre deux établissements, prise en charge en urgence ou transport allongé vers une consultation : nous intervenons à Casablanca et dans sa région, de jour comme de nuit.",
      "Par téléphone ou sur WhatsApp, vous nous indiquez l'adresse et l'état du patient. Nous envoyons le véhicule adapté le plus vite possible.",
    ],
    highlightStat: { value: "24h/24", label: "7 jours sur 7" },
    advantages: [
      { icon: "Zap", title: "Départ dès votre appel", body: "Nous envoyons une ambulance dès votre appel. Le délai d'arrivée dépend de votre adresse." },
      { icon: "HeartPulse", title: "Équipage médicalisé", body: "Un ambulancier à bord et, pour les cas graves, un médecin et un infirmier." },
      { icon: "ShieldCheck", title: "Matériel à bord", body: "Oxygène, défibrillateur, scope et brancard, selon le type de véhicule." },
      { icon: "Clock", title: "Disponible 24h/24", body: "Nous répondons au téléphone à toute heure, 7 jours sur 7, à Casablanca et dans sa région." },
    ],
    details: {
      kind: "variants",
      title: "Nos types de véhicules",
      subtitle: "Le véhicule envoyé dépend de l'état du patient.",
      items: [
        {
          name: "Ambulance médicalisée",
          icon: "Siren",
          body: "Pour les urgences vitales, avec un médecin et un infirmier à bord.",
          features: ["Médecin à bord", "Respirateur et scope", "Défibrillateur", "Médicaments d'urgence"],
        },
        {
          name: "Transport sanitaire",
          icon: "Ambulance",
          body: "Transport allongé vers une consultation, une hospitalisation ou pour un retour à domicile.",
          features: ["Ambulancier à bord", "Brancard et fauteuil", "Oxygène", "Surveillance des constantes"],
        },
        {
          name: "Pédiatrique",
          icon: "Baby",
          body: "Pour les nourrissons et les enfants, avec du matériel adapté à leur âge.",
          features: ["Couveuse de transport", "Matériel pédiatrique", "Équipe habituée aux enfants", "Un parent peut accompagner"],
        },
      ],
    },
    pricing: [
      { name: "Transport sanitaire", price: "À partir de 600 DH", unit: "/ trajet urbain", features: ["Prise en charge en ville", "Ambulancier à bord", "Oxygène à bord", "Surveillance de base"] },
      { name: "Ambulance médicalisée", price: "À partir de 1 500 DH", unit: "/ intervention", features: ["Médecin à bord", "Matériel de réanimation", "Médicaments d'urgence", "Transfert entre hôpitaux"], recommended: true },
      { name: "Longue distance", price: "À partir de 8 DH", unit: "/ km", features: ["Transfert entre villes", "Au départ de Casablanca", "Tarif selon la distance", "Devis gratuit"] },
    ],
    faq: [
      { q: "Combien de temps pour qu'une ambulance arrive ?", a: "Le délai dépend de votre adresse et de la circulation. Nous envoyons l'ambulance dès votre appel et nous vous donnons une estimation au téléphone." },
      { q: "Vos ambulances sont-elles médicalisées ?", a: "Oui. Selon la situation, nous envoyons un transport sanitaire avec ambulancier ou une ambulance médicalisée avec médecin et infirmier à bord." },
      { q: "Intervenez-vous la nuit et les jours fériés ?", a: "Oui. Nous répondons 24h/24 et 7j/7, y compris le week-end et les jours fériés." },
      { q: "Le transport est-il remboursé par mon assurance ?", a: "Cela dépend de votre contrat d'assurance. Posez-nous la question par téléphone ou sur WhatsApp, nous vous répondrons selon votre cas." },
      { q: "Puis-je accompagner mon proche dans l'ambulance ?", a: "Le plus souvent, oui : un proche peut monter à bord. L'équipage décide selon l'état du patient." },
    ],
  },

  // ─────────────────────────── 2. MÉDECIN À DOMICILE ──────────────────────
  {
    slug: "medecin-domicile",
    name: "Médecin à domicile",
    tagline: "Un médecin se déplace chez vous, de jour comme de nuit.",
    icon: "Stethoscope",
    description: [
      "Un médecin généraliste se rend à votre domicile pour vous examiner, poser un diagnostic et prescrire un traitement. Vous évitez le déplacement et la salle d'attente.",
      "Il intervient pour les situations aiguës (fièvre, douleurs, malaise), le suivi des maladies chroniques, les soins après une opération et les certificats médicaux.",
      "Après la consultation, le médecin vous remet un compte-rendu et, si besoin, une ordonnance ou une orientation vers un spécialiste.",
    ],
    highlightStat: { value: "24h/24", label: "7 jours sur 7" },
    advantages: [
      { icon: "Clock", title: "Sans salle d'attente", body: "Le médecin vient chez vous. Vous n'avez ni trajet ni attente en cabinet." },
      { icon: "BadgeCheck", title: "Médecins diplômés", body: "Les visites sont assurées par des médecins généralistes diplômés." },
      { icon: "FileText", title: "Ordonnance et compte-rendu", body: "Le médecin vous remet une ordonnance, un certificat ou un compte-rendu selon le besoin." },
      { icon: "HeartPulse", title: "Pour tous les âges", body: "Le médecin examine les nourrissons, les enfants, les adultes et les personnes âgées." },
    ],
    details: {
      kind: "variants",
      title: "Types de consultations",
      subtitle: "Le médecin se déplace pour les motifs suivants.",
      items: [
        { name: "Consultation d'urgence", icon: "Siren", body: "Fièvre, douleurs aiguës, malaise : un médecin vient vous examiner le plus vite possible." },
        { name: "Suivi chronique", icon: "Activity", body: "Suivi régulier du diabète, de l'hypertension ou d'une autre maladie de longue durée." },
        { name: "Certificat médical", icon: "FileText", body: "Certificat d'aptitude, d'arrêt de travail ou de bonne santé, établi lors de la visite." },
        { name: "Suivi post-opératoire", icon: "ClipboardList", body: "Contrôle après une intervention, en lien avec votre chirurgien." },
      ],
    },
    pricing: [
      { name: "Consultation jour", price: "À partir de 300 DH", unit: "/ visite", features: ["Examen clinique", "Ordonnance incluse", "Compte-rendu", "De 7h à 20h"] },
      { name: "Consultation nuit / férié", price: "À partir de 500 DH", unit: "/ visite", features: ["Disponible 24h/24", "Week-ends et jours fériés", "Médecin diplômé", "Ordonnance incluse"], recommended: true },
      { name: "Suivi chronique", price: "À partir de 250 DH", unit: "/ visite", features: ["Visites régulières", "Lien avec votre spécialiste", "Compte-rendu à chaque visite", "Devis gratuit"] },
    ],
    faq: [
      { q: "En combien de temps un médecin peut-il arriver ?", a: "Cela dépend de votre adresse, de l'heure et des médecins disponibles. Nous vous donnons une estimation quand vous appelez." },
      { q: "Le médecin peut-il prescrire des médicaments ?", a: "Oui. Après l'examen, le médecin vous remet une ordonnance et, si besoin, un compte-rendu de consultation." },
      { q: "Intervenez-vous pour les enfants ?", a: "Oui. Nos médecins voient les nourrissons et les enfants, comme les adultes et les personnes âgées." },
      { q: "Puis-je obtenir un certificat médical à domicile ?", a: "Oui. Le médecin peut établir un certificat d'arrêt de travail, d'aptitude ou de bonne santé pendant la visite." },
    ],
  },

  // ───────────────────────── 3. INFIRMIÈRE À DOMICILE ─────────────────────
  {
    slug: "infirmiere-domicile",
    name: "Infirmière à domicile",
    tagline: "Des soins infirmiers réalisés chez vous par des infirmiers diplômés.",
    icon: "Syringe",
    description: [
      "Nos infirmières et infirmiers diplômés se déplacent chez vous pour réaliser les soins prescrits par votre médecin.",
      "Pansements, injections, perfusions, soins après une opération ou surveillance de la tension : l'infirmier suit la prescription de votre médecin.",
      "Ce service convient aux personnes à mobilité réduite, aux patients en convalescence et à ceux qui préfèrent être soignés chez eux.",
    ],
    highlightStat: { value: "24h/24", label: "7 jours sur 7" },
    advantages: [
      { icon: "BadgeCheck", title: "Personnel diplômé", body: "Les soins sont réalisés par des infirmières et infirmiers diplômés." },
      { icon: "ShieldCheck", title: "Matériel à usage unique", body: "L'infirmier apporte du matériel stérile à usage unique pour chaque soin." },
      { icon: "Calendar", title: "Soins planifiés", body: "Les passages suivent votre prescription : le matin, le soir ou plusieurs fois par jour." },
      { icon: "ClipboardList", title: "Lien avec votre médecin", body: "L'infirmier applique la prescription et peut informer votre médecin traitant des soins réalisés." },
    ],
    details: {
      kind: "actes",
      title: "Nos actes infirmiers",
      subtitle: "Les soins prescrits, réalisés à votre domicile.",
      items: [
        { name: "Pansements", body: "Pansements simples ou complexes, soins de plaies et d'escarres." },
        { name: "Injections", body: "Injections intramusculaires, sous-cutanées et intraveineuses, sur prescription." },
        { name: "Perfusions", body: "Pose, surveillance et retrait de perfusions à domicile." },
        { name: "Soins post-opératoires", body: "Après une opération : pansements, ablation de fils et surveillance." },
        { name: "Surveillance de la tension", body: "Mesure de la tension artérielle, du pouls et des autres constantes." },
      ],
    },
    pricing: [
      { name: "Soin ponctuel", price: "À partir de 120 DH", unit: "/ passage", features: ["Injection ou pansement", "Matériel à usage unique", "Sur prescription", "À domicile"] },
      { name: "Forfait journalier", price: "À partir de 300 DH", unit: "/ jour", features: ["Plusieurs passages par jour", "Matin et soir", "Lien avec votre médecin", "Week-end compris"], recommended: true },
      { name: "Forfait hebdomadaire", price: "À partir de 1 500 DH", unit: "/ semaine", features: ["Soins programmés", "Même infirmier si possible", "Passages selon prescription", "Devis gratuit"] },
    ],
    faq: [
      { q: "Vos infirmiers sont-ils diplômés ?", a: "Oui. Tous les soins sont réalisés par des infirmières et infirmiers diplômés." },
      { q: "Faut-il une ordonnance pour bénéficier des soins ?", a: "Oui pour la plupart des actes (injections, perfusions, pansements complexes), qui demandent une prescription médicale. En cas de doute, appelez-nous." },
      { q: "À quelle fréquence l'infirmier peut-il passer ?", a: "Selon votre prescription : un seul passage ou plusieurs visites par jour, matin et soir, week-end compris." },
      { q: "Apportez-vous le matériel nécessaire ?", a: "Oui. L'infirmier vient avec le matériel à usage unique nécessaire au soin." },
    ],
  },

  // ─────────────────────────── 4. GARDE-MALADE ────────────────────────────
  {
    slug: "garde-malade",
    name: "Garde-malade et aide-soignante",
    tagline: "Une présence auprès de vos proches, de jour comme de nuit.",
    icon: "HeartHandshake",
    description: [
      "Nos gardes-malades et aides-soignantes restent auprès des personnes malades, âgées ou en perte d'autonomie, à domicile comme à l'hôpital.",
      "Elles aident à la toilette, aux repas et aux déplacements, surveillent l'état général et tiennent compagnie.",
      "Vous choisissez la formule (garde de jour, de nuit ou présence continue) et nous vous envoyons une garde-malade qualifiée.",
    ],
    highlightStat: { value: "24h/24", label: "7 jours sur 7" },
    advantages: [
      { icon: "HeartHandshake", title: "Présence au quotidien", body: "Une personne sur place, qui aide votre proche et lui tient compagnie." },
      { icon: "BadgeCheck", title: "Personnel qualifié", body: "Des aides-soignantes diplômées, habituées aux personnes dépendantes." },
      { icon: "Clock", title: "Jour, nuit ou 24h/24", body: "Vous choisissez la durée de la garde selon vos besoins et votre budget." },
      { icon: "ShieldCheck", title: "Équipe joignable", body: "Pendant la garde, vous pouvez nous joindre à toute heure par téléphone ou sur WhatsApp." },
    ],
    details: {
      kind: "variants",
      title: "Nos formules de garde",
      subtitle: "Choisissez la durée de présence qui convient à votre situation.",
      items: [
        { name: "Garde de jour (8h)", icon: "Clock", body: "Présence en journée pour aider aux gestes du quotidien et surveiller.", features: ["Aide à la toilette", "Repas et hydratation", "Surveillance", "Compagnie"] },
        { name: "Garde de nuit (12h)", icon: "Bell", body: "Une personne veille toute la nuit et aide votre proche à se lever.", features: ["Surveillance de nuit", "Aide aux levers", "Confort du patient", "Veille toute la nuit"] },
        { name: "Garde continue (24h)", icon: "ShieldPlus", body: "Présence permanente, avec un relais entre intervenants.", features: ["Présence jour et nuit", "Relais d'intervenants", "Aide quotidienne", "Surveillance"] },
      ],
    },
    pricing: [
      { name: "Garde de jour (8h)", price: "À partir de 250 DH", unit: "/ jour", features: ["8 heures de présence", "Aide quotidienne", "Surveillance", "Compagnie"] },
      { name: "Garde de nuit (12h)", price: "À partir de 350 DH", unit: "/ nuit", features: ["12 heures de veille", "Surveillance de nuit", "Aide aux levers", "Présence en cas de besoin"], recommended: true },
      { name: "Garde continue (24h)", price: "À partir de 600 DH", unit: "/ jour", features: ["Présence 24h/24", "Relais d'équipe", "Aide de jour et veille de nuit", "Devis gratuit"] },
    ],
    faq: [
      { q: "Quelle est la différence entre garde de jour et de nuit ?", a: "La garde de jour (8h) couvre les activités de la journée. La garde de nuit (12h) est une veille pendant le sommeil. La formule 24h réunit les deux, avec un relais entre intervenants." },
      { q: "Vos intervenants sont-ils formés ?", a: "Oui. Nos aides-soignantes sont diplômées et nos gardes-malades ont l'habitude des personnes dépendantes." },
      { q: "Puis-je avoir le même intervenant chaque jour ?", a: "Quand c'est possible, oui : nous essayons d'envoyer la même personne à chaque garde." },
      { q: "Intervenez-vous aussi à l'hôpital ?", a: "Oui. Nos gardes-malades peuvent rester auprès de votre proche à domicile comme à l'hôpital." },
    ],
  },

  // ────────────────────────── 5. TÉLÉCONSULTATION ─────────────────────────
  {
    slug: "teleconsultation",
    name: "Téléconsultation",
    tagline: "Consultez un médecin par vidéo, sans vous déplacer.",
    icon: "Video",
    description: [
      "La téléconsultation vous permet de parler à un médecin par appel vidéo, sans vous déplacer. Elle convient pour un avis, un renouvellement d'ordonnance ou une question de santé.",
      "Depuis un smartphone, une tablette ou un ordinateur, vous échangez avec un médecin qui peut vous orienter, prescrire un traitement ou organiser une visite à domicile.",
      "Elle est utile si vous habitez loin d'un cabinet, si votre emploi du temps est chargé ou si votre situation ne demande pas d'examen physique.",
    ],
    highlightStat: { value: "24h/24", label: "7 jours sur 7" },
    advantages: [
      { icon: "Zap", title: "Sans déplacement", body: "Vous prenez rendez-vous par téléphone ou sur WhatsApp et vous consultez depuis chez vous." },
      { icon: "ShieldCheck", title: "Confidentiel", body: "La consultation est couverte par le secret médical, comme en cabinet." },
      { icon: "FileText", title: "Ordonnance si besoin", body: "Si votre situation le permet, le médecin vous envoie une ordonnance après l'appel." },
      { icon: "MapPin", title: "Où que vous soyez", body: "Vous pouvez consulter même si vous habitez loin d'un cabinet médical." },
    ],
    details: {
      kind: "tele",
      title: "Spécialités et appareils compatibles",
      subtitle: "Indiquez-nous la spécialité souhaitée, nous vous confirmons la disponibilité.",
      specialities: [
        "Médecine générale",
        "Pédiatrie",
        "Dermatologie",
        "Cardiologie",
        "Psychologie",
        "Nutrition",
        "Gynécologie",
        "Endocrinologie",
      ],
      devices: [
        { name: "Smartphone", icon: "Smartphone" },
        { name: "Tablette", icon: "Tablet" },
        { name: "Ordinateur", icon: "Laptop" },
      ],
    },
    pricing: [
      { name: "Consultation générale", price: "À partir de 150 DH", unit: "/ consultation", features: ["Médecin généraliste", "Appel vidéo", "Ordonnance si besoin", "Compte-rendu"] },
      { name: "Consultation spécialiste", price: "À partir de 300 DH", unit: "/ consultation", features: ["Spécialiste selon disponibilité", "Appel vidéo", "Ordonnance si besoin", "Orientation si besoin"], recommended: true },
      { name: "Abonnement famille", price: "À partir de 500 DH", unit: "/ mois", features: ["Pour les membres du foyer", "Médecin généraliste", "Appel vidéo", "Conditions précisées par téléphone"] },
    ],
    faq: [
      { q: "De quoi ai-je besoin pour une téléconsultation ?", a: "D'un smartphone, d'une tablette ou d'un ordinateur avec une caméra et une connexion internet. Nous vous indiquons comment rejoindre l'appel quand vous prenez rendez-vous." },
      { q: "Le médecin peut-il me prescrire un traitement ?", a: "Oui, si votre situation le permet. Le médecin vous envoie alors une ordonnance et un compte-rendu après la consultation." },
      { q: "Mes données sont-elles protégées ?", a: "La consultation est couverte par le secret médical, comme en cabinet. Pour toute question sur vos données, contactez-nous par téléphone ou sur WhatsApp." },
      { q: "Que se passe-t-il si un examen physique est nécessaire ?", a: "Le médecin peut organiser une visite à domicile ou vous orienter vers un établissement adapté." },
    ],
  },

  // ──────────────────────── 6. PRÉLÈVEMENT & ANALYSES ─────────────────────
  {
    slug: "prelevement-analyses",
    name: "Prélèvement et analyses",
    tagline: "Vos prises de sang et prélèvements réalisés chez vous.",
    icon: "TestTube",
    description: [
      "Un préleveur qualifié vient chez vous faire la prise de sang ou le prélèvement. Vous n'avez pas à vous rendre au laboratoire.",
      "Les échantillons sont ensuite déposés au laboratoire d'analyses. Lors de la prise de rendez-vous, nous vous indiquons comment et quand vous recevrez vos résultats.",
      "Ce service est pratique pour les personnes âgées ou à mobilité réduite, les jeunes enfants et ceux qui préfèrent rester chez eux.",
    ],
    highlightStat: { value: "24h/24", label: "7 jours sur 7" },
    advantages: [
      { icon: "Home", title: "À domicile", body: "Le préleveur vient chez vous. Vous évitez le trajet et l'attente au laboratoire." },
      { icon: "ShieldCheck", title: "Matériel stérile", body: "Le prélèvement est fait avec du matériel stérile à usage unique." },
      { icon: "BadgeCheck", title: "Sur prescription", body: "Le préleveur suit l'ordonnance de votre médecin pour les analyses demandées." },
      { icon: "FileText", title: "Résultats", body: "Nous vous disons lors du rendez-vous comment et quand vous recevrez vos résultats." },
    ],
    details: {
      kind: "analyses",
      title: "Analyses disponibles",
      subtitle: "Les prélèvements que nous réalisons à domicile.",
      delai: "Le délai des résultats dépend du type d'analyse. Nous vous l'indiquons lors de la prise de rendez-vous.",
      types: [
        { name: "Bilan sanguin", body: "Numération, glycémie, cholestérol, fonction rénale et hépatique." },
        { name: "Bilan hormonal", body: "Thyroïde, hormones de la reproduction et autres bilans endocriniens." },
        { name: "Sérologies et infections", body: "Dépistages et sérologies virales ou bactériennes, sur prescription." },
        { name: "Suivi d'une maladie", body: "Contrôle du diabète (HbA1c), de l'INR et suivi des traitements." },
        { name: "Autres prélèvements", body: "Prélèvements urinaires, frottis et tests sur indication médicale." },
      ],
    },
    pricing: [
      { name: "Déplacement préleveur", price: "À partir de 80 DH", unit: "/ domicile", features: ["Préleveur qualifié", "Matériel stérile", "À domicile", "Hors coût d'analyse"] },
      { name: "Bilan standard", price: "À partir de 250 DH", unit: "/ bilan", features: ["Prélèvement inclus", "Analyse en laboratoire", "Sur prescription", "Délai indiqué au rendez-vous"], recommended: true },
      { name: "Forfait famille", price: "À partir de 600 DH", unit: "/ intervention", features: ["Plusieurs personnes", "Un seul déplacement", "Même adresse", "Devis gratuit"] },
    ],
    faq: [
      { q: "Dois-je être à jeun pour la prise de sang ?", a: "Cela dépend de l'analyse. Pour certains bilans, un jeûne de 8 à 12 heures est demandé. Nous vous donnons les consignes lors de la prise de rendez-vous." },
      { q: "Quand vais-je recevoir mes résultats ?", a: "Le délai dépend du type d'analyse. Nous vous l'indiquons par téléphone ou sur WhatsApp au moment du rendez-vous." },
      { q: "Faut-il une ordonnance ?", a: "Oui, pour la plupart des analyses. Le laboratoire a besoin de la prescription de votre médecin pour les réaliser." },
      { q: "Comment mes résultats me sont-ils transmis ?", a: "Nous vous le précisons lors de la prise de rendez-vous, par téléphone ou sur WhatsApp." },
    ],
  },

  // ───────────────────────── 7. RAPATRIEMENT SANITAIRE ────────────────────
  {
    slug: "rapatriement",
    name: "Rapatriement sanitaire",
    tagline: "Le transfert médicalisé d'un proche, au Maroc ou depuis l'étranger.",
    icon: "Plane",
    urgent: true,
    description: [
      "Nous organisons le rapatriement sanitaire d'un patient, pour un transfert entre deux villes du Maroc ou un retour depuis l'étranger.",
      "Notre équipe s'occupe de l'évaluation médicale avant le départ, du choix du transport, de l'équipe qui accompagne le patient, des formalités et du lien avec les établissements de santé.",
      "Un médecin définit le dispositif selon l'état du patient, pour que les soins se poursuivent pendant le trajet.",
    ],
    highlightStat: { value: "24h/24", label: "7 jours sur 7" },
    advantages: [
      { icon: "ShieldPlus", title: "Organisation du transfert", body: "Nous nous occupons du transport, des formalités et du lien avec les hôpitaux." },
      { icon: "HeartPulse", title: "Équipe médicale", body: "Un médecin ou un infirmier accompagne le patient, selon son état." },
      { icon: "Plane", title: "Transport adapté", body: "Ambulance longue distance, avion médicalisé ou véhicule léger, selon le cas." },
      { icon: "Clock", title: "Joignable 24h/24", body: "Nous répondons à toute heure, 7 jours sur 7, pour les transferts urgents." },
    ],
    details: {
      kind: "variants",
      title: "Modes de transport",
      subtitle: "Le transport est choisi selon l'état du patient et la distance.",
      items: [
        { name: "Ambulance longue distance", icon: "Ambulance", body: "Transfert par la route entre deux villes, avec une équipe médicale.", features: ["Équipe médicale", "Transport allongé", "Surveillance pendant le trajet", "Entre villes"] },
        { name: "Avion médicalisé", icon: "Plane", body: "Transport aérien pour les longues distances ou un retour depuis l'étranger.", features: ["Vol sanitaire", "Équipe médicale à bord", "Formalités d'aéroport", "Depuis l'étranger"] },
        { name: "Véhicule léger", icon: "Car", body: "Pour les patients valides qui n'ont pas besoin d'une ambulance.", features: ["Patient autonome", "Avec accompagnant", "Sans ambulance", "De porte à porte"] },
      ],
    },
    pricing: [
      { name: "Transfert inter-villes", price: "À partir de 8 DH", unit: "/ km", features: ["Ambulance médicalisée", "Équipe d'accompagnement", "Surveillance pendant le trajet", "Devis gratuit"] },
      { name: "Rapatriement national", price: "Sur devis", unit: "", features: ["Organisation du transfert", "Équipe selon l'état du patient", "Lien avec les hôpitaux", "Formalités"], recommended: true },
      { name: "Rapatriement international", price: "Sur devis", unit: "", features: ["Avion médicalisé", "Retour depuis l'étranger", "Avis d'un médecin", "Formalités"] },
    ],
    faq: [
      { q: "Comment est décidé le mode de transport ?", a: "Un médecin évalue l'état du patient et choisit le transport adapté : ambulance longue distance, avion médicalisé ou véhicule léger." },
      { q: "Gérez-vous les formalités administratives ?", a: "Oui. Notre équipe s'occupe du lien avec les hôpitaux, des formalités et de l'organisation du trajet." },
      { q: "Travaillez-vous avec les assurances ?", a: "Cela dépend de votre contrat et de votre assureur. Appelez-nous ou écrivez-nous sur WhatsApp, nous vous dirons ce qui est possible dans votre cas." },
      { q: "Un médecin accompagne-t-il le patient ?", a: "Selon son état, le patient est accompagné par un infirmier, un médecin ou les deux pendant tout le trajet." },
    ],
  },

  // ────────────────────── 8. ÉQUIPE ÉVÉNEMENTIELLE ────────────────────────
  {
    slug: "equipe-evenementielle",
    name: "Équipe événementielle",
    tagline: "Une équipe médicale sur place pendant vos événements.",
    icon: "CalendarHeart",
    description: [
      "Nous assurons la couverture médicale d'événements, de rassemblements et de chantiers. Le dispositif dépend du type d'événement et du nombre de participants.",
      "Il peut comprendre un poste de secours, des secouristes, des infirmiers, un médecin et une ambulance sur place.",
      "Nous préparons le dispositif avec vous avant l'événement (évaluation des risques, plan de secours), puis l'équipe est présente le jour même. Nous couvrons les mariages, les concerts, les compétitions sportives et les événements d'entreprise.",
    ],
    highlightStat: { value: "24h/24", label: "7 jours sur 7" },
    advantages: [
      { icon: "ShieldCheck", title: "Dispositif adapté", body: "L'équipe et le matériel dépendent du nombre de participants et des risques." },
      { icon: "HeartPulse", title: "Équipe sur place", body: "Secouristes, infirmiers, médecin et ambulance, selon vos besoins." },
      { icon: "ClipboardList", title: "Préparation avant l'événement", body: "Nous évaluons les risques et définissons le plan d'intervention avec vous." },
      { icon: "Zap", title: "Prise en charge sur place", body: "L'équipe soigne sur place et organise une évacuation si nécessaire." },
    ],
    details: {
      kind: "variants",
      title: "Types d'événements couverts",
      subtitle: "Le dispositif change selon le contexte.",
      items: [
        { name: "Mariages et cérémonies", icon: "HeartHandshake", body: "Une équipe discrète pour vos fêtes de famille." },
        { name: "Concerts et festivals", icon: "Music", body: "Postes de secours et équipes mobiles pour les grands rassemblements." },
        { name: "Événements sportifs", icon: "Trophy", body: "Couverture médicale des compétitions et prise en charge des blessures." },
        { name: "Événements d'entreprise", icon: "Building2", body: "Séminaires, salons et chantiers, avec un dispositif adapté au site." },
      ],
    },
    pricing: [
      { name: "Poste de secours", price: "À partir de 1 500 DH", unit: "/ jour", features: ["Équipe de secouristes", "Matériel de premiers secours", "Présence sur place", "Petit événement"] },
      { name: "Dispositif renforcé", price: "À partir de 3 500 DH", unit: "/ jour", features: ["Infirmier et secouristes", "Poste de soins sur place", "Préparation avec vous", "Événement de taille moyenne"], recommended: true },
      { name: "Dispositif complet", price: "Sur devis", unit: "", features: ["Médecin et ambulance", "Équipe renforcée", "Plan de secours", "Grand rassemblement"] },
    ],
    faq: [
      { q: "Comment dimensionnez-vous le dispositif ?", a: "Avant l'événement, nous regardons avec vous sa nature, le nombre de participants et les risques. Nous en déduisons l'équipe et le matériel nécessaires." },
      { q: "Combien de temps à l'avance faut-il réserver ?", a: "Le plus tôt possible, surtout pour un grand rassemblement. Appelez-nous ou écrivez-nous sur WhatsApp dès que la date est connue." },
      { q: "Fournissez-vous une ambulance sur place ?", a: "Oui, selon le dispositif choisi. Une ambulance et son équipage restent alors sur place pour évacuer un blessé si nécessaire." },
      { q: "Intervenez-vous aussi sur les chantiers ?", a: "Oui. Nous assurons aussi la couverture médicale et le poste de secours sur les chantiers et les sites industriels." },
    ],
  },

  // ───────────────────── 9. ASSISTANCE PERSONNE ÂGÉE ──────────────────────
  {
    slug: "personne-agee",
    name: "Assistance personne âgée",
    tagline: "Un suivi à domicile pour vos proches âgés.",
    icon: "Accessibility",
    description: [
      "Nous accompagnons les personnes âgées chez elles, avec des soins et une surveillance adaptés à leur âge et à leur degré d'autonomie.",
      "Visites régulières, télésurveillance, aide aux gestes du quotidien, intervention en cas d'urgence : nous définissons l'accompagnement avec vous, en lien avec le médecin traitant.",
      "Le but est que votre proche puisse rester chez lui, en sécurité, suivi par des professionnels qualifiés.",
    ],
    highlightStat: { value: "24h/24", label: "7 jours sur 7" },
    advantages: [
      { icon: "HeartHandshake", title: "Respect du rythme de chacun", body: "Nos intervenants s'adaptent aux habitudes et au rythme de votre proche." },
      { icon: "Activity", title: "Suivi de santé", body: "Surveillance des constantes, en lien avec le médecin traitant." },
      { icon: "Bell", title: "En cas d'urgence", body: "En cas de chute ou de malaise, vous pouvez nous appeler à toute heure, 7 jours sur 7." },
      { icon: "Home", title: "Maintien à domicile", body: "Votre proche reste chez lui et garde ses habitudes." },
    ],
    details: {
      kind: "variants",
      title: "Nos programmes d'accompagnement",
      subtitle: "Des formules à combiner selon le degré d'autonomie.",
      items: [
        { name: "Visite régulière", icon: "Calendar", body: "Passages programmés pour la surveillance et les soins.", features: ["Surveillance de la santé", "Moment d'échange", "Lien avec le médecin", "Fréquence au choix"] },
        { name: "Télésurveillance", icon: "Activity", body: "Suivi à distance de votre proche. Nous vous en expliquons les modalités par téléphone.", features: ["Suivi à distance", "Équipe joignable 24h/24", "7 jours sur 7", "Modalités par téléphone"] },
        { name: "Aide quotidienne", icon: "HeartHandshake", body: "Aide pour les gestes de la vie courante et les déplacements.", features: ["Aide à la toilette", "Repas et courses", "Aide aux déplacements", "Compagnie"] },
        { name: "Urgence gérontologique", icon: "Siren", body: "Évaluation et prise en charge en cas de chute ou de malaise.", features: ["Appel 24h/24", "Évaluation par un médecin", "Orientation vers l'hôpital si besoin", "Suivi après l'urgence"] },
      ],
    },
    pricing: [
      { name: "Visite à domicile", price: "À partir de 200 DH", unit: "/ visite", features: ["Surveillance de la santé", "Soins de base", "Compte-rendu", "Lien avec le médecin"] },
      { name: "Forfait mensuel", price: "À partir de 2 000 DH", unit: "/ mois", features: ["Visites régulières", "Même intervenant si possible", "Lien avec le médecin", "Bilan mensuel"], recommended: true },
      { name: "Télésurveillance", price: "À partir de 350 DH", unit: "/ mois", features: ["Suivi à distance", "Équipe joignable 24h/24", "7 jours sur 7", "Modalités par téléphone"] },
    ],
    faq: [
      { q: "Qui intervient auprès de la personne âgée ?", a: "Des médecins, des infirmiers et des aides-soignants diplômés, selon le besoin. Ils travaillent en lien avec le médecin traitant." },
      { q: "Peut-on combiner plusieurs programmes ?", a: "Oui. Les visites régulières, l'aide quotidienne et la télésurveillance peuvent être associées." },
      { q: "Que se passe-t-il en cas de chute ou de malaise ?", a: "Appelez-nous, nous répondons 24h/24. Nous envoyons une équipe le plus vite possible selon votre adresse pour évaluer la situation et, si besoin, orienter votre proche vers l'hôpital." },
      { q: "L'objectif est-il de maintenir la personne à domicile ?", a: "Oui. Nous cherchons à ce que votre proche garde son autonomie et puisse rester chez lui en sécurité." },
    ],
  },
];

export function getService(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
