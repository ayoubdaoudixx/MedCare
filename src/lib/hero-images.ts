// The three photos of the hero story, in the order they appear.
//
// Portrait files, with the faces in the upper half: phones crop the sides and
// wide screens crop the top and bottom. To replace one, save the new photo in
// public/ under the same name and run
// `python3 scripts/build-image-placeholders.py` to refresh its blurred preview.
//
//   home  the family at home, before anyone has come
//   door  the nurse at the door, in MedCare white
//   care  the nurse taking the patient's blood pressure in the salon
//
// `focus` is where the important face sits, as "x% y%". The photo is cropped
// around that point and the scroll zoom moves toward it.
export const HERO_IMAGES = {
  home: { src: "/hero-home.webp", focus: "45% 42%" },
  door: { src: "/hero-door.webp", focus: "56% 34%" },
  care: { src: "/hero-care.webp", focus: "40% 40%" },
} as const;
