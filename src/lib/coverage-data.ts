// Where MedCare works today. City names are data, so both locales live here.
// Other cities are announced as "soon" in the copy and are not named until
// the client confirms which ones open and when.
export type City = { fr: string; ar: string };

export const CASABLANCA_REGION: City[] = [
  { fr: "Casablanca", ar: "الدار البيضاء" },
  { fr: "Mohammedia", ar: "المحمدية" },
  { fr: "Bouskoura", ar: "بوسكورة" },
  { fr: "Dar Bouazza", ar: "دار بوعزة" },
  { fr: "Nouaceur", ar: "النواصر" },
];
