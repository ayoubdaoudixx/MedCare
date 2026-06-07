// ──────────────────────────────────────────────────────────────────────────
// MEDCARE — Single source of truth for all service-page content.
// Icons reference lucide-react component names (resolved in the UI layer).
// Prices are realistic estimates in MAD (Dirham marocain).
// ──────────────────────────────────────────────────────────────────────────

export type Advantage = {
  icon: string; // lucide-react icon name
  title: string;
  body: string;
};

export type PricingItem = {
  name: string;
  price: string; // e.g. "À partir de 600 MAD"
  unit?: string; // e.g. "/ intervention", "/ nuit"
  features: string[];
  recommended?: boolean;
};

export type FaqItem = { q: string; a: string };

// Service-specific “details” section — a discriminated union so each page can
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
  description: string[]; // 2–3 paragraphs (French)
  highlightStat: { value: string; label: string };
  advantages: Advantage[];
  details: ServiceDetails;
  pricing: PricingItem[];
  faq: FaqItem[];
};

export const PRICING_DISCLAIMER =
  "Tarifs indicatifs en dirham marocain (MAD). Le montant final dépend de la distance, de la durée et du matériel requis. Devis gratuit sur demande.";

export const services: ServiceData[] = [
  // ───────────────────────────── 1. AMBULANCE ─────────────────────────────
  {
    slug: "ambulance",
    name: "Ambulance & Transport Sanitaire",
    tagline: "Une ambulance médicalisée à vos côtés en quelques minutes, 24h/24.",
    icon: "Ambulance",
    urgent: true,
    description: [
      "MEDCARE déploie une flotte d'ambulances modernes et entièrement équipées pour répondre à toutes les situations, de l'urgence vitale au simple transport sanitaire. Chaque véhicule embarque un équipage formé aux gestes de premiers secours et au transport médicalisé.",
      "Que vous ayez besoin d'un transfert entre établissements, d'une prise en charge d'urgence ou d'un transport allongé vers une consultation, nos équipes interviennent partout au Maroc, de jour comme de nuit, dans le respect strict des protocoles médicaux.",
      "Nos ambulances sont géolocalisées en temps réel afin de mobiliser systématiquement le véhicule le plus proche et de réduire au maximum le délai d'intervention.",
    ],
    highlightStat: { value: "< 20 min", label: "Délai moyen d'intervention en zone urbaine" },
    advantages: [
      { icon: "Zap", title: "Intervention rapide", body: "Véhicule le plus proche mobilisé instantanément grâce à la géolocalisation de notre flotte." },
      { icon: "HeartPulse", title: "Équipage médicalisé", body: "Ambulanciers diplômés et, si besoin, médecin urgentiste à bord pour les cas critiques." },
      { icon: "ShieldCheck", title: "Matériel aux normes", body: "Oxygène, défibrillateur, scope et brancardage conformes aux standards internationaux." },
      { icon: "Clock", title: "Disponible 24h/24", body: "Une centrale d'appel joignable à toute heure, 7 jours sur 7, partout au Maroc." },
    ],
    details: {
      kind: "variants",
      title: "Nos types de véhicules",
      subtitle: "Une réponse adaptée à chaque niveau d'urgence.",
      items: [
        {
          name: "Ambulance Médicalisée (SMUR)",
          icon: "Siren",
          body: "Réanimation mobile pour les urgences vitales, avec médecin et infirmier à bord.",
          features: ["Médecin urgentiste", "Respirateur & scope", "Défibrillateur", "Médicaments d'urgence"],
        },
        {
          name: "Transport Sanitaire (ATS)",
          icon: "Ambulance",
          body: "Transport allongé confortable vers une consultation, une hospitalisation ou un retour à domicile.",
          features: ["Ambulancier diplômé", "Brancard & fauteuil", "Oxygénothérapie", "Surveillance des constantes"],
        },
        {
          name: "Pédiatrique",
          icon: "Baby",
          body: "Véhicule dédié aux nourrissons et enfants, avec équipement adapté à la pédiatrie.",
          features: ["Couveuse de transport", "Matériel pédiatrique", "Personnel formé enfants", "Accompagnement parental"],
        },
      ],
    },
    pricing: [
      { name: "Transport Sanitaire", price: "À partir de 600 MAD", unit: "/ trajet urbain", features: ["Prise en charge en ville", "Ambulancier diplômé", "Oxygène à bord", "Surveillance de base"] },
      { name: "Ambulance Médicalisée", price: "À partir de 1 500 MAD", unit: "/ intervention", features: ["Médecin à bord", "Réanimation mobile", "Matériel d'urgence complet", "Transfert inter-hôpitaux"], recommended: true },
      { name: "Longue distance", price: "À partir de 8 MAD", unit: "/ km", features: ["Transfert inter-villes", "Équipage dédié", "Tarif dégressif", "Devis personnalisé"] },
    ],
    faq: [
      { q: "Combien de temps pour qu'une ambulance arrive ?", a: "En zone urbaine, notre délai moyen est inférieur à 20 minutes. Le véhicule le plus proche est mobilisé dès votre appel grâce à la géolocalisation de la flotte." },
      { q: "Vos ambulances sont-elles médicalisées ?", a: "Oui. Selon la situation, nous envoyons un transport sanitaire avec ambulancier ou une ambulance de réanimation avec médecin urgentiste et infirmier à bord." },
      { q: "Intervenez-vous la nuit et les jours fériés ?", a: "Absolument. Notre centrale et nos équipes sont disponibles 24h/24 et 7j/7, y compris les week-ends et jours fériés." },
      { q: "Le transport est-il remboursé par mon assurance ?", a: "Le transport sanitaire est conventionné avec la plupart des assurances. Nous vous remettons une facture détaillée et pouvons gérer le tiers payant selon votre contrat." },
      { q: "Puis-je accompagner mon proche dans l'ambulance ?", a: "Dans la majorité des cas, un accompagnant peut prendre place à bord, sous réserve de l'état du patient et de l'avis de l'équipage médical." },
    ],
  },

  // ─────────────────────────── 2. MÉDECIN À DOMICILE ──────────────────────
  {
    slug: "medecin-domicile",
    name: "Médecin à Domicile",
    tagline: "Un médecin chez vous en moins de 60 minutes, sans salle d'attente.",
    icon: "Stethoscope",
    description: [
      "Évitez les déplacements et les longues attentes : un médecin généraliste se rend directement à votre domicile pour vous examiner, poser un diagnostic et vous prescrire le traitement adapté.",
      "Notre service SOS Médecin couvre aussi bien les situations aiguës (fièvre, douleurs, malaise) que le suivi de pathologies chroniques, les soins post-opératoires ou la délivrance de certificats médicaux.",
      "Chaque consultation donne lieu à un compte-rendu et, si nécessaire, à une ordonnance ou une orientation vers un spécialiste, le tout consigné dans votre dossier patient digital.",
    ],
    highlightStat: { value: "< 60 min", label: "Délai moyen pour qu'un médecin soit à votre porte" },
    advantages: [
      { icon: "Clock", title: "Sans salle d'attente", body: "Le médecin vient à vous : plus de déplacement ni d'attente prolongée en cabinet." },
      { icon: "BadgeCheck", title: "Médecins diplômés", body: "Praticiens inscrits à l'Ordre, expérimentés en médecine générale et d'urgence." },
      { icon: "FileText", title: "Ordonnance & suivi", body: "Prescription, certificat médical et compte-rendu remis à l'issue de chaque visite." },
      { icon: "HeartPulse", title: "Adapté à tous", body: "Nourrissons, adultes, personnes âgées : une prise en charge pour toute la famille." },
    ],
    details: {
      kind: "variants",
      title: "Types de consultations",
      subtitle: "Une visite adaptée à votre besoin du moment.",
      items: [
        { name: "Consultation d'urgence", icon: "Siren", body: "Fièvre, douleurs aiguës, malaise : un médecin se déplace rapidement pour vous examiner." },
        { name: "Suivi chronique", icon: "Activity", body: "Surveillance régulière du diabète, de l'hypertension ou d'autres pathologies de longue durée." },
        { name: "Certificat médical", icon: "FileText", body: "Certificats d'aptitude, d'arrêt de travail ou de bonne santé délivrés à domicile." },
        { name: "Suivi post-opératoire", icon: "ClipboardList", body: "Contrôle des suites d'une intervention et coordination avec votre chirurgien." },
      ],
    },
    pricing: [
      { name: "Consultation jour", price: "À partir de 300 MAD", unit: "/ visite", features: ["Examen complet", "Ordonnance incluse", "Compte-rendu", "7h – 20h"] },
      { name: "Consultation nuit / férié", price: "À partir de 500 MAD", unit: "/ visite", features: ["Disponible 24h/24", "Week-ends & fériés", "Médecin diplômé", "Ordonnance incluse"], recommended: true },
      { name: "Suivi chronique", price: "À partir de 250 MAD", unit: "/ visite", features: ["Forfait suivi régulier", "Coordination spécialiste", "Dossier digital", "Tarif dégressif"] },
    ],
    faq: [
      { q: "En combien de temps un médecin peut-il arriver ?", a: "En zone urbaine, le délai moyen est inférieur à 60 minutes. Il peut varier selon l'heure, la météo et la disponibilité des praticiens." },
      { q: "Le médecin peut-il prescrire des médicaments ?", a: "Oui, le médecin réalise un examen complet et vous remet une ordonnance ainsi qu'un compte-rendu de consultation si nécessaire." },
      { q: "Intervenez-vous pour les enfants ?", a: "Oui, nos médecins prennent en charge les nourrissons, les enfants comme les adultes et les personnes âgées." },
      { q: "Puis-je obtenir un certificat médical à domicile ?", a: "Tout à fait. Le médecin peut délivrer un certificat d'arrêt de travail, d'aptitude ou de bonne santé directement lors de la visite." },
    ],
  },

  // ───────────────────────── 3. INFIRMIÈRE À DOMICILE ─────────────────────
  {
    slug: "infirmiere-domicile",
    name: "Infirmière à Domicile",
    tagline: "Des soins infirmiers de qualité, réalisés chez vous par des professionnels diplômés.",
    icon: "Syringe",
    description: [
      "Nos infirmières et infirmiers diplômés d'État se déplacent à votre domicile pour réaliser l'ensemble des soins prescrits par votre médecin, dans des conditions d'hygiène et de sécurité irréprochables.",
      "Pansements, injections, perfusions, soins post-opératoires ou surveillance de paramètres vitaux : chaque acte est effectué selon les protocoles en vigueur, avec une traçabilité complète dans votre dossier.",
      "Idéal pour les personnes à mobilité réduite, les patients en convalescence ou toute personne souhaitant être soignée dans le confort de son foyer.",
    ],
    highlightStat: { value: "+15 000", label: "Soins infirmiers réalisés à domicile chaque année" },
    advantages: [
      { icon: "BadgeCheck", title: "Personnel diplômé", body: "Infirmiers et infirmières diplômés d'État, rigoureusement sélectionnés." },
      { icon: "ShieldCheck", title: "Hygiène garantie", body: "Matériel à usage unique et protocoles d'asepsie stricts à chaque intervention." },
      { icon: "Calendar", title: "Soins planifiés", body: "Passages programmés selon votre prescription, matin, soir ou plusieurs fois par jour." },
      { icon: "ClipboardList", title: "Suivi tracé", body: "Chaque acte est consigné et partagé avec votre médecin traitant." },
    ],
    details: {
      kind: "actes",
      title: "Nos actes infirmiers",
      subtitle: "Tous les soins prescrits, réalisés à votre domicile.",
      items: [
        { name: "Pansements", body: "Réfection de pansements simples ou complexes, soins de plaies et d'escarres." },
        { name: "Injections", body: "Injections intramusculaires, sous-cutanées et intraveineuses sur prescription." },
        { name: "Perfusions", body: "Pose, surveillance et retrait de perfusions à domicile en toute sécurité." },
        { name: "Soins post-opératoires", body: "Suivi des suites chirurgicales : pansements, ablation de fils et surveillance." },
        { name: "Surveillance de la tension", body: "Contrôle de la tension artérielle, du pouls et des paramètres vitaux." },
      ],
    },
    pricing: [
      { name: "Soin ponctuel", price: "À partir de 120 MAD", unit: "/ passage", features: ["Injection ou pansement", "Matériel à usage unique", "Traçabilité du soin", "Sur prescription"] },
      { name: "Forfait journalier", price: "À partir de 300 MAD", unit: "/ jour", features: ["Plusieurs passages / jour", "Coordination médecin", "Dossier de soins", "Suivi continu"], recommended: true },
      { name: "Forfait hebdomadaire", price: "À partir de 1 500 MAD", unit: "/ semaine", features: ["Soins programmés", "Infirmier référent", "Tarif dégressif", "Bilan régulier"] },
    ],
    faq: [
      { q: "Vos infirmiers sont-ils diplômés d'État ?", a: "Oui, l'ensemble de nos intervenants sont des infirmières et infirmiers diplômés d'État, sélectionnés pour leur expérience et leur professionnalisme." },
      { q: "Faut-il une ordonnance pour bénéficier des soins ?", a: "La plupart des actes (injections, perfusions, pansements complexes) nécessitent une prescription médicale. Nous vous accompagnons en cas de doute." },
      { q: "À quelle fréquence l'infirmier peut-il passer ?", a: "Selon votre prescription : d'un passage ponctuel à plusieurs visites par jour, matin et soir, week-ends compris." },
      { q: "Apportez-vous le matériel nécessaire ?", a: "Oui, nos infirmiers se déplacent avec le matériel à usage unique requis et respectent des protocoles d'hygiène stricts." },
    ],
  },

  // ─────────────────────────── 4. GARDE-MALADE ────────────────────────────
  {
    slug: "garde-malade",
    name: "Garde-Malade & Aide-Soignante",
    tagline: "Un accompagnement humain et attentif, jour et nuit, auprès de vos proches.",
    icon: "HeartHandshake",
    description: [
      "Nos gardes-malades et aides-soignantes assurent une présence rassurante auprès des personnes malades, âgées ou en perte d'autonomie, à domicile comme à l'hôpital.",
      "Aide à la toilette, à l'alimentation, aux déplacements, surveillance de l'état général et soutien moral : nous prenons soin de vos proches avec bienveillance et professionnalisme.",
      "Vous choisissez la formule qui vous convient — garde de jour, de nuit ou présence continue — et nous vous attribuons un intervenant qualifié et de confiance.",
    ],
    highlightStat: { value: "24h/24", label: "Présence continue possible auprès de votre proche" },
    advantages: [
      { icon: "HeartHandshake", title: "Accompagnement humain", body: "Une présence bienveillante et un véritable soutien moral au quotidien." },
      { icon: "BadgeCheck", title: "Personnel qualifié", body: "Aides-soignantes formées à l'accompagnement des personnes dépendantes." },
      { icon: "Clock", title: "Flexibilité totale", body: "Garde de jour, de nuit ou 24h/24, selon vos besoins et votre budget." },
      { icon: "ShieldCheck", title: "Intervenants de confiance", body: "Personnel sélectionné, vérifié et encadré par notre coordination médicale." },
    ],
    details: {
      kind: "variants",
      title: "Nos formules de garde",
      subtitle: "Choisissez le rythme de présence adapté à votre situation.",
      items: [
        { name: "Garde de jour — 8h", icon: "Clock", body: "Présence en journée pour l'aide aux gestes du quotidien et la surveillance.", features: ["Aide à la toilette", "Repas & hydratation", "Surveillance", "Compagnie"] },
        { name: "Garde de nuit — 12h", icon: "Bell", body: "Veille de nuit pour sécuriser le sommeil et intervenir au moindre besoin.", features: ["Surveillance nocturne", "Aide aux levers", "Confort & sécurité", "Veille active"] },
        { name: "Garde continue — 24h", icon: "ShieldPlus", body: "Présence permanente avec relais d'équipe pour un accompagnement total.", features: ["Présence permanente", "Relais d'intervenants", "Suivi complet", "Tranquillité absolue"] },
      ],
    },
    pricing: [
      { name: "Garde de jour (8h)", price: "À partir de 250 MAD", unit: "/ jour", features: ["8 heures de présence", "Aide quotidienne", "Surveillance", "Compagnie & soutien"] },
      { name: "Garde de nuit (12h)", price: "À partir de 350 MAD", unit: "/ nuit", features: ["12 heures de veille", "Surveillance nocturne", "Aide aux levers", "Sécurité renforcée"], recommended: true },
      { name: "Garde continue (24h)", price: "À partir de 600 MAD", unit: "/ jour", features: ["Présence 24h/24", "Relais d'équipe", "Accompagnement total", "Tarif dégressif"] },
    ],
    faq: [
      { q: "Quelle est la différence entre garde de jour et de nuit ?", a: "La garde de jour (8h) couvre les activités quotidiennes ; la garde de nuit (12h) assure une veille et la sécurité pendant le sommeil. La formule 24h combine les deux avec un relais d'intervenants." },
      { q: "Vos intervenants sont-ils formés ?", a: "Oui, nos gardes-malades et aides-soignantes sont formées à l'accompagnement des personnes dépendantes et encadrées par notre coordination." },
      { q: "Puis-je avoir le même intervenant chaque jour ?", a: "Dans la mesure du possible, nous attribuons un intervenant référent pour garantir la continuité et la relation de confiance." },
      { q: "Intervenez-vous aussi à l'hôpital ?", a: "Oui, nos gardes-malades peuvent assurer une présence et un accompagnement aussi bien à domicile qu'en milieu hospitalier." },
    ],
  },

  // ────────────────────────── 5. TÉLÉCONSULTATION ─────────────────────────
  {
    slug: "teleconsultation",
    name: "Téléconsultation",
    tagline: "Consultez un médecin par vidéo, où que vous soyez, en quelques minutes.",
    icon: "Video",
    description: [
      "La téléconsultation MEDCARE vous met en relation avec un médecin par appel vidéo sécurisé, sans vous déplacer. Idéale pour un avis rapide, un renouvellement d'ordonnance ou une question de santé.",
      "Depuis votre smartphone, tablette ou ordinateur, vous échangez en toute confidentialité avec un praticien qui peut vous orienter, vous prescrire un traitement ou organiser une visite à domicile si nécessaire.",
      "Un service moderne et accessible, particulièrement adapté aux zones éloignées, aux emplois du temps chargés et aux situations ne nécessitant pas d'examen physique immédiat.",
    ],
    highlightStat: { value: "< 15 min", label: "Délai moyen avant d'être mis en relation avec un médecin" },
    advantages: [
      { icon: "Zap", title: "Disponible immédiatement", body: "Un médecin en ligne en quelques minutes, sans rendez-vous ni déplacement." },
      { icon: "ShieldCheck", title: "100 % confidentiel", body: "Échanges chiffrés et données protégées tout au long de la consultation." },
      { icon: "FileText", title: "Ordonnance numérique", body: "Recevez votre ordonnance et votre compte-rendu directement après l'appel." },
      { icon: "MapPin", title: "Partout au Maroc", body: "Un accès aux soins même dans les zones éloignées des centres médicaux." },
    ],
    details: {
      kind: "tele",
      title: "Spécialités & appareils compatibles",
      subtitle: "Consultez le bon spécialiste, depuis l'appareil de votre choix.",
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
      { name: "Consultation générale", price: "À partir de 150 MAD", unit: "/ consultation", features: ["Médecin généraliste", "Vidéo sécurisée", "Ordonnance numérique", "Compte-rendu"] },
      { name: "Consultation spécialiste", price: "À partir de 300 MAD", unit: "/ consultation", features: ["Spécialiste au choix", "Avis détaillé", "Ordonnance numérique", "Orientation si besoin"], recommended: true },
      { name: "Abonnement famille", price: "À partir de 500 MAD", unit: "/ mois", features: ["Consultations illimitées", "Jusqu'à 5 membres", "Accès prioritaire", "Suivi partagé"] },
    ],
    faq: [
      { q: "De quoi ai-je besoin pour une téléconsultation ?", a: "Simplement d'un smartphone, d'une tablette ou d'un ordinateur disposant d'une caméra et d'une connexion internet. Aucun logiciel complexe n'est requis." },
      { q: "Le médecin peut-il me prescrire un traitement ?", a: "Oui, à l'issue de la consultation, le médecin peut vous transmettre une ordonnance numérique et un compte-rendu si votre situation le permet." },
      { q: "Mes données sont-elles protégées ?", a: "Absolument. Les échanges vidéo sont chiffrés et vos données médicales sont stockées de manière sécurisée et confidentielle." },
      { q: "Que se passe-t-il si un examen physique est nécessaire ?", a: "Le médecin peut organiser une visite à domicile ou vous orienter vers la structure la plus adaptée à votre situation." },
    ],
  },

  // ──────────────────────── 6. PRÉLÈVEMENT & ANALYSES ─────────────────────
  {
    slug: "prelevement-analyses",
    name: "Prélèvement & Analyses",
    tagline: "Vos analyses et prises de sang réalisées chez vous, résultats en ligne.",
    icon: "TestTube",
    description: [
      "MEDCARE vous évite le déplacement au laboratoire : un préleveur diplômé se rend à votre domicile pour effectuer vos prises de sang et prélèvements, dans le respect des conditions d'hygiène et de la chaîne du froid.",
      "Vos échantillons sont acheminés vers un laboratoire partenaire agréé, et vos résultats vous sont communiqués en ligne, de manière sécurisée, dans les meilleurs délais.",
      "Un service particulièrement précieux pour les personnes âgées, à mobilité réduite, les jeunes enfants ou toute personne préférant le confort de son domicile.",
    ],
    highlightStat: { value: "24–48 h", label: "Délai moyen pour la mise à disposition des résultats" },
    advantages: [
      { icon: "Home", title: "Confort du domicile", body: "Plus de file d'attente au laboratoire : le préleveur vient à vous." },
      { icon: "ShieldCheck", title: "Chaîne du froid", body: "Transport des échantillons sécurisé pour garantir la fiabilité des résultats." },
      { icon: "BadgeCheck", title: "Laboratoires agréés", body: "Analyses réalisées par des laboratoires partenaires certifiés." },
      { icon: "FileText", title: "Résultats en ligne", body: "Vos résultats consultables en ligne, en toute sécurité et confidentialité." },
    ],
    details: {
      kind: "analyses",
      title: "Analyses disponibles",
      subtitle: "Un large panel de prélèvements réalisables à domicile.",
      delai: "Résultats disponibles sous 24 à 48 h selon le type d'analyse (certains bilans spécialisés peuvent demander davantage de temps).",
      types: [
        { name: "Bilan sanguin complet", body: "Numération, glycémie, cholestérol, fonction rénale et hépatique." },
        { name: "Bilan hormonal", body: "Thyroïde, hormones de la reproduction et bilans endocriniens." },
        { name: "Sérologies & infections", body: "Dépistages, sérologies virales et bactériennes sur prescription." },
        { name: "Suivi de pathologie", body: "Contrôle du diabète (HbA1c), de l'INR et suivi des traitements." },
        { name: "Prélèvements divers", body: "Prélèvements urinaires, frottis et tests sur indication médicale." },
      ],
    },
    pricing: [
      { name: "Déplacement préleveur", price: "À partir de 80 MAD", unit: "/ domicile", features: ["Préleveur diplômé", "Matériel stérile", "Chaîne du froid", "Hors coût d'analyse"] },
      { name: "Bilan standard", price: "À partir de 250 MAD", unit: "/ bilan", features: ["Prélèvement inclus", "Laboratoire agréé", "Résultats en ligne", "Sous 24–48 h"], recommended: true },
      { name: "Forfait famille", price: "À partir de 600 MAD", unit: "/ intervention", features: ["Plusieurs personnes", "Un seul déplacement", "Résultats centralisés", "Tarif dégressif"] },
    ],
    faq: [
      { q: "Dois-je être à jeun pour la prise de sang ?", a: "Cela dépend de l'analyse. Pour la plupart des bilans, un jeûne de 8 à 12 heures est recommandé. Nous vous précisons les consignes lors de la prise de rendez-vous." },
      { q: "Quand vais-je recevoir mes résultats ?", a: "Les résultats sont généralement disponibles en ligne sous 24 à 48 heures. Certains bilans spécialisés peuvent nécessiter un délai plus long." },
      { q: "Faut-il une ordonnance ?", a: "Une prescription médicale est nécessaire pour la plupart des analyses afin que le laboratoire puisse les réaliser et les interpréter." },
      { q: "Comment mes résultats me sont-ils transmis ?", a: "Vos résultats vous sont communiqués en ligne via un accès sécurisé et confidentiel, et peuvent être partagés avec votre médecin." },
    ],
  },

  // ───────────────────────── 7. RAPATRIEMENT SANITAIRE ────────────────────
  {
    slug: "rapatriement",
    name: "Rapatriement Sanitaire",
    tagline: "Le transfert médicalisé de vos proches, partout au Maroc et à l'international.",
    icon: "Plane",
    urgent: true,
    description: [
      "MEDCARE organise et coordonne le rapatriement sanitaire des patients, qu'il s'agisse d'un transfert entre villes du Maroc ou d'un retour depuis l'étranger, dans des conditions médicales optimales.",
      "De l'évaluation médicale préalable à la prise en charge à l'arrivée, notre équipe gère l'intégralité de la logistique : choix du mode de transport, équipe médicale d'accompagnement, formalités et coordination avec les établissements de santé.",
      "Chaque rapatriement est supervisé par un médecin régulateur qui définit le dispositif adapté à l'état du patient, pour un transfert sûr, confortable et sans rupture de soins.",
    ],
    highlightStat: { value: "Mondial", label: "Coordination de rapatriements au Maroc et à l'international" },
    advantages: [
      { icon: "ShieldPlus", title: "Coordination complète", body: "Logistique, formalités et liaison avec les hôpitaux entièrement gérées par nos soins." },
      { icon: "HeartPulse", title: "Équipe médicale dédiée", body: "Médecin et infirmier d'accompagnement adaptés à l'état du patient." },
      { icon: "Plane", title: "Tous modes de transport", body: "Ambulance longue distance, avion médicalisé ou véhicule léger selon le cas." },
      { icon: "Clock", title: "Réactivité 24h/24", body: "Une cellule de coordination joignable à toute heure pour les transferts urgents." },
    ],
    details: {
      kind: "variants",
      title: "Modes de transport",
      subtitle: "Le dispositif est choisi selon l'état de santé et la distance.",
      items: [
        { name: "Ambulance longue distance", icon: "Ambulance", body: "Transfert terrestre médicalisé entre villes, avec équipe et matériel adaptés.", features: ["Équipe médicale", "Confort allongé", "Surveillance continue", "Inter-villes"] },
        { name: "Avion médicalisé", icon: "Plane", body: "Évacuation aérienne pour les longues distances ou les retours internationaux.", features: ["Vol sanitaire", "Réanimation à bord", "Coordination aéroport", "International"] },
        { name: "Véhicule léger", icon: "Car", body: "Transport adapté pour les patients valides ne nécessitant pas d'ambulance.", features: ["Patient autonome", "Accompagnement", "Solution économique", "Porte-à-porte"] },
      ],
    },
    pricing: [
      { name: "Transfert inter-villes", price: "À partir de 8 MAD", unit: "/ km", features: ["Ambulance médicalisée", "Équipe d'accompagnement", "Surveillance continue", "Tarif dégressif"] },
      { name: "Rapatriement national", price: "Sur devis", unit: "", features: ["Coordination complète", "Équipe adaptée", "Liaison hôpitaux", "Formalités gérées"], recommended: true },
      { name: "Rapatriement international", price: "Sur devis", unit: "", features: ["Avion médicalisé", "Coordination mondiale", "Médecin régulateur", "Assurance & formalités"] },
    ],
    faq: [
      { q: "Comment est décidé le mode de transport ?", a: "Un médecin régulateur évalue l'état du patient et définit le dispositif le plus adapté : ambulance longue distance, avion médicalisé ou véhicule léger." },
      { q: "Gérez-vous les formalités administratives ?", a: "Oui, notre équipe prend en charge la coordination avec les hôpitaux, les formalités et la logistique de bout en bout." },
      { q: "Travaillez-vous avec les assurances ?", a: "Nous collaborons avec les assurances et les assistances. Nous pouvons monter le dossier et coordonner la prise en charge avec votre assureur." },
      { q: "Un médecin accompagne-t-il le patient ?", a: "Selon l'état du patient, l'accompagnement est assuré par un infirmier et/ou un médecin afin de garantir une continuité des soins durant tout le transfert." },
    ],
  },

  // ────────────────────── 8. ÉQUIPE ÉVÉNEMENTIELLE ────────────────────────
  {
    slug: "equipe-evenementielle",
    name: "Équipe Événementielle",
    tagline: "Une couverture médicale professionnelle pour sécuriser vos événements.",
    icon: "CalendarHeart",
    description: [
      "MEDCARE assure la médicalisation de vos événements, rassemblements et chantiers, avec un dispositif de secours dimensionné selon la nature et la fréquentation de votre manifestation.",
      "Poste de secours, équipe de premiers secours, infirmiers, médecins et ambulance sur site : nous mettons en place le dispositif adapté pour garantir la sécurité de vos participants.",
      "De la préparation en amont (plan de secours, évaluation des risques) à la présence le jour J, nos équipes interviennent pour les mariages, concerts, compétitions sportives et événements d'entreprise.",
    ],
    highlightStat: { value: "Sur mesure", label: "Dispositif adapté à chaque type et taille d'événement" },
    advantages: [
      { icon: "ShieldCheck", title: "Dispositif sur mesure", body: "Un plan de secours dimensionné selon la fréquentation et les risques identifiés." },
      { icon: "HeartPulse", title: "Équipe complète", body: "Secouristes, infirmiers, médecins et ambulance mobilisés selon vos besoins." },
      { icon: "ClipboardList", title: "Préparation en amont", body: "Évaluation des risques et plan d'intervention définis avant l'événement." },
      { icon: "Zap", title: "Réactivité sur site", body: "Prise en charge immédiate et évacuation organisée en cas de besoin." },
    ],
    details: {
      kind: "variants",
      title: "Types d'événements couverts",
      subtitle: "Un dispositif adapté à chaque contexte.",
      items: [
        { name: "Mariages & cérémonies", icon: "HeartHandshake", body: "Présence discrète et rassurante pour vos célébrations familiales." },
        { name: "Concerts & festivals", icon: "Music", body: "Postes de secours et équipes mobiles pour les grands rassemblements." },
        { name: "Événements sportifs", icon: "Trophy", body: "Couverture médicale des compétitions, avec prise en charge des blessures." },
        { name: "Événements corporate", icon: "Building2", body: "Séminaires, salons et chantiers sécurisés par un dispositif adapté." },
      ],
    },
    pricing: [
      { name: "Poste de secours", price: "À partir de 1 500 MAD", unit: "/ jour", features: ["Équipe de secouristes", "Matériel de premiers secours", "Présence sur site", "Petit événement"] },
      { name: "Dispositif renforcé", price: "À partir de 3 500 MAD", unit: "/ jour", features: ["Infirmier & secouristes", "Poste médical avancé", "Coordination dédiée", "Événement moyen"], recommended: true },
      { name: "Dispositif complet", price: "Sur devis", unit: "", features: ["Médecin + ambulance", "Équipe étoffée", "Plan de secours complet", "Grand rassemblement"] },
    ],
    faq: [
      { q: "Comment dimensionnez-vous le dispositif ?", a: "Nous évaluons en amont la nature de l'événement, le nombre de participants et les risques afin de définir l'équipe et le matériel nécessaires." },
      { q: "Combien de temps à l'avance faut-il réserver ?", a: "Nous recommandons de nous contacter au moins une à deux semaines avant l'événement, davantage pour les grands rassemblements." },
      { q: "Fournissez-vous une ambulance sur place ?", a: "Selon le dispositif retenu, une ambulance et son équipage peuvent être positionnés sur site pour une évacuation immédiate si nécessaire." },
      { q: "Intervenez-vous aussi sur les chantiers ?", a: "Oui, nous assurons également la couverture médicale et le poste de secours pour les chantiers et sites industriels." },
    ],
  },

  // ───────────────────── 9. ASSISTANCE PERSONNE ÂGÉE ──────────────────────
  {
    slug: "personne-agee",
    name: "Assistance Personne Âgée",
    tagline: "Un suivi gériatrique bienveillant pour le bien-être de vos aînés à domicile.",
    icon: "Accessibility",
    description: [
      "MEDCARE accompagne les personnes âgées au quotidien avec des programmes de soins et de surveillance adaptés au grand âge, pensés pour préserver leur autonomie et leur qualité de vie.",
      "Visites régulières, télésurveillance, aide aux gestes du quotidien et intervention en cas d'urgence gérontologique : nous construisons avec vous un accompagnement sur mesure, en lien avec le médecin traitant.",
      "Notre objectif : permettre à vos proches de vieillir sereinement chez eux, entourés, en sécurité et suivis par des professionnels formés à la gériatrie.",
    ],
    highlightStat: { value: "10+ ans", label: "D'expérience dans l'accompagnement des personnes âgées" },
    advantages: [
      { icon: "HeartHandshake", title: "Bienveillance avant tout", body: "Un accompagnement humain qui respecte le rythme et la dignité de vos aînés." },
      { icon: "Activity", title: "Suivi adapté au grand âge", body: "Surveillance des constantes et coordination avec le médecin traitant." },
      { icon: "Bell", title: "Réponse aux urgences", body: "Dispositif d'alerte et intervention rapide en cas d'urgence gérontologique." },
      { icon: "Home", title: "Maintien à domicile", body: "Préserver l'autonomie et le confort de vie au sein du foyer familial." },
    ],
    details: {
      kind: "variants",
      title: "Nos programmes d'accompagnement",
      subtitle: "Des formules combinables selon le degré d'autonomie.",
      items: [
        { name: "Visite régulière", icon: "Calendar", body: "Passages programmés pour la surveillance, les soins et le lien social.", features: ["Surveillance santé", "Lien social", "Coordination médecin", "Rythme personnalisé"] },
        { name: "Télésurveillance", icon: "Activity", body: "Suivi à distance des constantes et dispositif d'alerte permanent.", features: ["Suivi à distance", "Alerte 24h/24", "Capteurs santé", "Tranquillité famille"] },
        { name: "Aide quotidienne", icon: "HeartHandshake", body: "Accompagnement dans les gestes de la vie courante et les déplacements.", features: ["Aide à la toilette", "Repas & courses", "Mobilité", "Compagnie"] },
        { name: "Urgence gérontologique", icon: "Siren", body: "Évaluation et prise en charge rapide en cas de chute ou de malaise.", features: ["Intervention rapide", "Médecin gériatre", "Orientation hôpital", "Suivi post-urgence"] },
      ],
    },
    pricing: [
      { name: "Visite à domicile", price: "À partir de 200 MAD", unit: "/ visite", features: ["Surveillance santé", "Soins de base", "Compte-rendu", "Coordination médecin"] },
      { name: "Forfait mensuel", price: "À partir de 2 000 MAD", unit: "/ mois", features: ["Visites régulières", "Intervenant référent", "Suivi personnalisé", "Bilan mensuel"], recommended: true },
      { name: "Télésurveillance", price: "À partir de 350 MAD", unit: "/ mois", features: ["Suivi à distance", "Dispositif d'alerte", "Astreinte 24h/24", "Sérénité famille"] },
    ],
    faq: [
      { q: "Vos intervenants sont-ils formés à la gériatrie ?", a: "Oui, nos équipes sont formées à l'accompagnement des personnes âgées et travaillent en lien étroit avec le médecin traitant." },
      { q: "Peut-on combiner plusieurs programmes ?", a: "Tout à fait. Visites régulières, aide quotidienne et télésurveillance peuvent être associées pour un accompagnement complet et sur mesure." },
      { q: "Que se passe-t-il en cas de chute ou de malaise ?", a: "Notre dispositif d'urgence gérontologique permet une intervention rapide, une évaluation médicale et, si besoin, une orientation vers l'hôpital." },
      { q: "L'objectif est-il de maintenir la personne à domicile ?", a: "Oui, notre priorité est de préserver l'autonomie et le confort de vos proches en leur permettant de vivre sereinement chez eux, en sécurité." },
    ],
  },
];

export function getService(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
