// A promotion shown in the banner at the top of every page.
//
// Leave `active` false until MedCare confirms an offer with its exact terms
// (what is reduced, by how much, until when). While it is false the banner
// shows the standing promise instead: a free quote before every visit.
// A discount announced on a healthcare site and not honoured on the phone
// costs more trust than no banner at all.
export const OFFER: { active: boolean; percent: number; text: { fr: string; ar: string } } = {
  active: false,
  /** Shown as "-20 %" in the tag. */
  percent: 0,
  /** One sentence, written the way it will be said on the phone. */
  text: { fr: "", ar: "" },
};
