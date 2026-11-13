# Prompts for the site photos

Every picture is built the same way: one Moroccan nurse, dressed in white with the MedCare logo, in a Moroccan home or street. Each prompt below is complete: copy it whole, nothing to assemble. Real photos of the MedCare team should replace these when the client sends some.

## 1. How to generate an image

1. Attach the two logo files as reference images: `public/medcare-logo.png` (wordmark) and `public/medcare3d.webp` (house and stethoscope mark).
2. Generate `hero-door.webp` first.
3. For every other image, also attach `hero-door.webp` as a face reference, so the nurse is the same person everywhere.
4. If your tool has a separate negative-prompt field, move the last paragraph of the prompt there.
5. Export as WebP under 250 KB and save in `public/` under the file name given.
6. Hero only: the three files are already wired in. Save a new version under the same name (`hero-home.webp`, `hero-door.webp`, `hero-care.webp`); if the face is not in the same place, adjust its `focus` point in `src/lib/hero-images.ts`.
7. Run `python3 scripts/build-image-placeholders.py` from the project root.

To have the nurse without a hijab, replace the hijab sentence with: "Her long black wavy hair is tied back in a low bun." The hijab version keeps the face Moroccan more reliably, because without it most image tools drift toward a European face.

## 2. The hero story (three photos, same nurse)

Format: **portrait 3:4, 1536 × 2048**. Her face stays in the upper half; the bottom third stays calm, because the chat messages appear there.

### `hero-door.webp`

She is at the door. Generate this one first.

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features.
>
> The nurse is a Moroccan woman from Casablanca, 32 years old: light olive-brown skin, large dark brown eyes, thick dark eyebrows, a straight nose, full lips. She wears a white hijab wrapped neatly around her face, covering her hair and neck. Her face is the sharpest thing in the picture, lit softly from the side, at eye level, in the upper half of the frame. She looks at the person she is caring for, never at the camera, with a slight natural smile.
>
> Medium close-up of the nurse on the landing of a Casablanca apartment building, in front of a carved wooden door that has just opened. She smiles warmly at the person who opened it, the navy medical bag strap on her shoulder. In the foreground, out of focus, the shoulder and headscarf of the elderly Moroccan woman who opened the door. Zellige mosaic tiles on the landing wall, daylight from the stairwell behind her, warm light from the apartment on her face.
>
> She wears a clean white nurse's tunic with short sleeves and white trousers. Use the attached MedCare logo exactly as provided: do not redraw it, restyle it, change its letters or invent a new logo. The wordmark reads MEDCARE, with "MED" in blue and "CARE" in white inside a blue rounded shape. It is embroidered small on the left chest of the white tunic, and printed on the side of her navy medical bag. Brand colors: azure blue #1278AD and navy #183660. No other brand, no other text, no flags.
>
> Through the open door, out of focus, a Moroccan salon: low bench sofas with patterned cushions, zellige mosaic tiles on the lower walls, a pierced metal lantern, a woven Amazigh rug. The woman at the door wears a djellaba and a headscarf.
>
> Documentary portrait photograph, natural light, 50mm lens, shallow depth of field, warm whites with soft blue and beige tones, real skin texture with pores and small imperfections, a candid moment. No watermark, no caption, no extra fingers, no plastic skin.
>
> Not European, not British, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes, no freckles. No brick house, no pitched tile roof, no suburban lawn or garden path, no radiator, no European living room.

### `hero-home.webp`

She reads the visitor's message.

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features.
>
> The nurse is a Moroccan woman from Casablanca, 32 years old: light olive-brown skin, large dark brown eyes, thick dark eyebrows, a straight nose, full lips. She wears a white hijab wrapped neatly around her face, covering her hair and neck. Her face is the sharpest thing in the picture, lit softly from the side, at eye level, in the upper half of the frame. She looks at the person she is caring for, never at the camera, with a slight natural smile.
>
> Medium close-up of the nurse standing on a Casablanca street in front of a white apartment building, reading a message on the phone she holds at chest height. Her navy MedCare medical bag hangs from her shoulder. She has the attentive look of someone about to leave. Bright morning sun. The phone screen is not readable.
>
> She wears a clean white nurse's tunic with short sleeves and white trousers. Use the attached MedCare logo exactly as provided: do not redraw it, restyle it, change its letters or invent a new logo. The wordmark reads MEDCARE, with "MED" in blue and "CARE" in white inside a blue rounded shape. It is embroidered small on the left chest of the white tunic, and printed on the side of her navy medical bag. Brand colors: azure blue #1278AD and navy #183660. No other brand, no other text, no flags.
>
> The street is a residential street of Casablanca: white and cream apartment buildings four storeys high with flat roofs and wrought-iron balconies, palm trees, a red petit taxi parked nearby, strong Atlantic sunlight.
>
> Documentary portrait photograph, natural light, 50mm lens, shallow depth of field, warm whites with soft blue and beige tones, real skin texture with pores and small imperfections, a candid moment. No watermark, no caption, no extra fingers, no plastic skin.
>
> Not European, not British, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes, no freckles. No brick house, no pitched tile roof, no suburban lawn or garden path, no radiator, no European living room.

### `hero-care.webp`

She gives the care.

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features.
>
> The nurse is a Moroccan woman from Casablanca, 32 years old: light olive-brown skin, large dark brown eyes, thick dark eyebrows, a straight nose, full lips. She wears a white hijab wrapped neatly around her face, covering her hair and neck. Her face is the sharpest thing in the picture, lit softly from the side, at eye level, in the upper half of the frame. She looks at the person she is caring for, never at the camera, with a slight natural smile.
>
> Medium close-up of the nurse seated beside an elderly Moroccan woman in a djellaba and headscarf, on the low sofa, taking her blood pressure. The nurse's face is in focus as she looks at the patient and speaks gently; the patient, slightly out of focus, looks back at her, relaxed. The MedCare medical bag is open on the low table. Evening, a lamp on.
>
> She wears a clean white nurse's tunic with short sleeves and white trousers. Use the attached MedCare logo exactly as provided: do not redraw it, restyle it, change its letters or invent a new logo. The wordmark reads MEDCARE, with "MED" in blue and "CARE" in white inside a blue rounded shape. It is embroidered small on the left chest of the white tunic, and printed on the side of her navy medical bag. Brand colors: azure blue #1278AD and navy #183660. No other brand, no other text, no flags.
>
> The room is a Moroccan salon: low bench sofas along the walls with patterned upholstery and many cushions, a round low table with a brass tray, a silver teapot and glasses of mint tea, zellige mosaic tiles on the lower half of the walls, an arched doorway, a pierced metal lantern, a woven Amazigh rug. The other people wear what Moroccans wear at home: a djellaba, a headscarf, a gandoura.
>
> Documentary portrait photograph, natural light, 50mm lens, shallow depth of field, warm whites with soft blue and beige tones, real skin texture with pores and small imperfections, a candid moment. No watermark, no caption, no extra fingers, no plastic skin.
>
> Not European, not British, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes, no freckles. No brick house, no pitched tile roof, no suburban lawn or garden path, no radiator, no European living room.

## 3. The nine services

Format: **landscape 3:2, 1536 × 1024**. File names stay as they are in `public/`, so nothing changes in the code. Each prompt is complete: copy it whole.

References to attach: the two logo files with every prompt. For the nurse (cards 3, 6, 7 and 9) also attach `public/hero-door.webp` as her face. For the doctor, generate card 2 first, then attach that result as his face for card 5.

Each card has its own place, light and person, so the nine do not look alike: a street at dusk, a salon in the evening, a bedroom in the afternoon, a bedroom at night, a kitchen at noon, a dining table at dawn, an airport, the Corniche at midday, a balcony at golden hour.

Before accepting a result, check three things:

1. Shrunk to the width of a phone card (about 330 px), is the service obvious without its title?
2. With a tenth trimmed from every edge, are the faces and the main object still whole?
3. Zoomed in: Moroccan faces and home, correct hands, the logo identical to the file, no garbled lettering.

Two cards show equipment the client has not confirmed yet. The ambulance is drawn plain white, without MedCare lettering, and the repatriation card shows an airport arrival, not a MedCare aircraft. Change them once the client says what the company owns.

### `service-ambulance.webp`

Ambulance et transport sanitaire · سيارة إسعاف ونقل صحي

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features. In this picture the service is an ambulance that comes to the patient's building.
>
> Blue hour on a street of white Casablanca apartment blocks. Two ambulance crew wheel a stretcher toward the open rear doors of a white ambulance. An elderly Moroccan man lies on it under a blanket, and the woman of the crew leans toward him to say something, one hand on his shoulder. The lit inside of the ambulance glows on their faces. Seen from the pavement, three-quarter view from behind the vehicle. The ambulance is plain white with one blue band along its side.
>
> The crew: a Moroccan woman of about 28 in a white hijab, and a Moroccan man of about 35 with short black hair and a short beard. Both wear a white polo shirt and navy trousers.
>
> One true detail: far behind them, out of focus, a red petit taxi and a palm tree. Both top corners are plain evening sky.
>
> Landscape 3:2, medium shot at eye level, 35mm lens. The faces and the stretcher sit inside the central 60% of the frame; the edges and both top corners stay calm and empty. Documentary photograph, natural light, real skin texture, a candid moment, nobody looks at the camera. Colors: white, navy, soft blue, warm wood and brass.
>
> Use the attached MedCare logo exactly as provided, small, embroidered on the left chest of the white uniform. Do not redraw it or change its letters. No other readable text anywhere in the picture: no signs, no number plates, no writing on screens.
>
> Not European, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes. No brick houses, pitched roofs or lawns. No tourist Morocco: no camels, fez hats, souk stalls, blue-painted walls or red clay walls. No garbled lettering, no extra fingers, no plastic skin.

### `service-medecin-domicile.webp`

Médecin à domicile · طبيب في المنزل

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features. In this picture the service is a doctor who comes to examine someone at home.
>
> Evening in the salon of a Casablanca apartment, two lamps on, the window dark. The doctor sits on the edge of the low sofa and listens with his stethoscope to the chest of a Moroccan man in his forties, who sits upright in a house gandoura with the collar open. The doctor's face is concentrated and kind. In the doorway, out of focus, the man's wife in a headscarf watches.
>
> The doctor is a Moroccan man of about 45: olive-brown skin, short black hair greying at the temples, a short salt-and-pepper beard, thin glasses. He wears a white coat over a light blue shirt, with a stethoscope.
>
> One true detail: the patient's yellow leather slippers left on the tiled floor beside the rug, and the navy medical bag open on the low table.
>
> Landscape 3:2, medium shot at eye level, 35mm lens. The faces and the stethoscope on the patient's chest sit inside the central 60% of the frame; the edges and both top corners stay calm and empty. Documentary photograph, natural light, real skin texture, a candid moment, nobody looks at the camera. Colors: white, navy, soft blue, warm wood and brass.
>
> Use the attached MedCare logo exactly as provided, small, embroidered on the left chest of the white uniform and printed on the side of the navy medical bag. Do not redraw it or change its letters. No other readable text anywhere in the picture: no signs, no number plates, no writing on screens.
>
> Not European, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes. No brick houses, pitched roofs or lawns. No tourist Morocco: no camels, fez hats, souk stalls, blue-painted walls or red clay walls. No garbled lettering, no extra fingers, no plastic skin.

### `service-infirmiere-domicile.webp`

Infirmier à domicile · ممرض في المنزل

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features. In this picture the service is a nurse who gives care at home: drips, injections, dressings.
>
> Afternoon in the bedroom of a modern Casablanca apartment, soft light through a white curtain. A Moroccan woman in her forties rests against pillows in a house djellaba. The nurse stands beside the bed and adjusts the small roller on a drip line with her fingertips, her eyes on the drip. The line runs down to a small white dressing on the back of the patient's hand.
>
> The nurse is a Moroccan woman of 32: light olive-brown skin, large dark brown eyes, thick dark eyebrows, a calm and kind face. She wears a white hijab wrapped simply around her face, a white short-sleeved nurse's tunic and white trousers. Use the attached portrait for her face.
>
> One true detail: there is no stand, so the drip bag hangs from the handle of the window, as it does in a real home. An embroidered bedspread covers the bed.
>
> Landscape 3:2, medium shot at eye level, 35mm lens. The faces and the drip bag sit inside the central 60% of the frame; the edges and both top corners stay calm and empty. Documentary photograph, natural light, real skin texture, a candid moment, nobody looks at the camera. Colors: white, navy, soft blue, warm wood and brass.
>
> Use the attached MedCare logo exactly as provided, small, embroidered on the left chest of the white uniform and printed on the side of the navy medical bag. Do not redraw it or change its letters. No other readable text anywhere in the picture: no signs, no number plates, no writing on screens.
>
> Not European, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes. No brick houses, pitched roofs or lawns. No tourist Morocco: no camels, fez hats, souk stalls, blue-painted walls or red clay walls. No garbled lettering, no extra fingers, no plastic skin.

### `service-garde-malade.webp`

Garde-malade · مرافِقة للمريض

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features. In this picture the service is someone who stays beside a sick relative through the night.
>
> Deep night in a bedroom lit only by one bedside lamp. An elderly Moroccan woman in a white headscarf sleeps in the bed. Beside her, on a chair pulled close, sits the carer: awake, calm, one hand resting on the blanket, watching her breathe. The lamp lights the carer's face from the side; the rest of the room falls into shadow.
>
> The carer is a Moroccan woman of about 50: olive-brown skin, a gentle lined face, a plain white headscarf, a white tunic and white trousers.
>
> One true detail: on the nightstand, prayer beads, a glass of water and a folded pair of glasses. Through a gap in the curtain, a few city lights.
>
> Landscape 3:2, medium shot at eye level, 35mm lens. The faces and the bedside lamp sit inside the central 60% of the frame; the edges and both top corners stay calm and empty. Documentary photograph, natural light, real skin texture, a candid moment, nobody looks at the camera. Colors: white, navy, soft blue, warm wood and brass.
>
> Use the attached MedCare logo exactly as provided, small, embroidered on the left chest of the white uniform. Do not redraw it or change its letters. No other readable text anywhere in the picture: no signs, no number plates, no writing on screens.
>
> Not European, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes. No brick houses, pitched roofs or lawns. No tourist Morocco: no camels, fez hats, souk stalls, blue-painted walls or red clay walls. No garbled lettering, no extra fingers, no plastic skin.

### `service-teleconsultation.webp`

Téléconsultation · استشارة طبية عن بُعد

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features. In this picture the service is a doctor seen on a video call, from home.
>
> Noon in a Casablanca kitchen with zellige tiles behind the worktop. Seen over the shoulder of a young Moroccan mother in a headscarf, seated at the kitchen table with her toddler on her lap. A tablet is propped against a silver teapot. On its screen, large and sharp, the face of the doctor speaking to them. The child, cheeks flushed, reaches a hand toward the screen. The screen shows only the doctor's face, with no buttons and no writing.
>
> The doctor is a Moroccan man of about 45: olive-brown skin, short black hair greying at the temples, a short salt-and-pepper beard, thin glasses. He wears a white coat over a light blue shirt, with a stethoscope.
>
> One true detail: beside the tablet, a glass of mint tea and a child's cup.
>
> Landscape 3:2, medium shot at eye level, 35mm lens. The faces and the tablet screen sit inside the central 60% of the frame; the edges and both top corners stay calm and empty. Documentary photograph, natural light, real skin texture, a candid moment, nobody looks at the camera. Colors: white, navy, soft blue, warm wood and brass.
>
> Use the attached MedCare logo exactly as provided, small, embroidered on the left chest of the white uniform. Do not redraw it or change its letters. No other readable text anywhere in the picture: no signs, no number plates, no writing on screens.
>
> Not European, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes. No brick houses, pitched roofs or lawns. No tourist Morocco: no camels, fez hats, souk stalls, blue-painted walls or red clay walls. No garbled lettering, no extra fingers, no plastic skin.

### `service-prelevement-analyses.webp`

Prélèvement à domicile · تحاليل طبية في المنزل

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features. In this picture the service is a blood sample taken at home, early in the morning.
>
> Early morning, cool light, at the dining table of a Casablanca apartment. A Moroccan man in his fifties with a moustache, in a striped djellaba with one sleeve rolled up, rests his forearm on the table with a blue tourniquet above the elbow. The nurse sits beside him and holds up a small blood tube with a colored cap, checking it. A tray with more tubes and cotton sits between them. No needle is visible in the skin.
>
> The nurse is a Moroccan woman of 32: light olive-brown skin, large dark brown eyes, thick dark eyebrows, a calm and kind face. She wears a white hijab wrapped simply around her face, a white short-sleeved nurse's tunic and white trousers. Use the attached portrait for her face.
>
> One true detail: at the far end of the table breakfast is laid and untouched, a round loaf of bread, a saucer of olive oil and a teapot, because he is fasting for the test.
>
> Landscape 3:2, medium shot at eye level, 35mm lens. The faces and the tray of colored blood tubes sit inside the central 60% of the frame; the edges and both top corners stay calm and empty. Documentary photograph, natural light, real skin texture, a candid moment, nobody looks at the camera. Colors: white, navy, soft blue, warm wood and brass.
>
> Use the attached MedCare logo exactly as provided, small, embroidered on the left chest of the white uniform and printed on the side of the navy medical bag. Do not redraw it or change its letters. No other readable text anywhere in the picture: no signs, no number plates, no writing on screens.
>
> Not European, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes. No brick houses, pitched roofs or lawns. No tourist Morocco: no camels, fez hats, souk stalls, blue-painted walls or red clay walls. No garbled lettering, no extra fingers, no plastic skin.

### `service-rapatriement.webp`

Rapatriement sanitaire · النقل الصحي بين المدن ومن الخارج

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features. In this picture the service is bringing a patient home from another city or from abroad.
>
> Daylight in the arrivals hall of a Moroccan airport, tall windows, a polished floor. The nurse pushes a wheelchair in which a Moroccan man in his sixties sits with a blanket over his knees, and she leans forward to speak to him. Beside them his adult son pushes a trolley with one suitcase. Behind the glass, far and out of focus, the tail of an airliner with no markings.
>
> The nurse is a Moroccan woman of 32: light olive-brown skin, large dark brown eyes, thick dark eyebrows, a calm and kind face. She wears a white hijab wrapped simply around her face, a white short-sleeved nurse's tunic and white trousers. Use the attached portrait for her face.
>
> One true detail: the father holds his son's forearm with one hand, the way a parent does after a long absence.
>
> Landscape 3:2, medium shot at eye level, 35mm lens. The faces, the wheelchair and the suitcase sit inside the central 60% of the frame; the edges and both top corners stay calm and empty. Documentary photograph, natural light, real skin texture, a candid moment, nobody looks at the camera. Colors: white, navy, soft blue, warm wood and brass.
>
> Use the attached MedCare logo exactly as provided, small, embroidered on the left chest of the white uniform and printed on the side of the navy medical bag. Do not redraw it or change its letters. No other readable text anywhere in the picture: no signs, no number plates, no writing on screens.
>
> Not European, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes. No brick houses, pitched roofs or lawns. No tourist Morocco: no camels, fez hats, souk stalls, blue-painted walls or red clay walls. No garbled lettering, no extra fingers, no plastic skin.

### `service-equipe-evenementielle.webp`

Médicalisation d'événements · التغطية الطبية للتظاهرات

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features. In this picture the service is a medical team on site during a public event.
>
> Hard midday sun on the Corniche of Casablanca during a road race. Under a plain white canopy, a woman of the medical team kneels and wraps a bandage around the ankle of a young Moroccan runner with black curly hair, seated on a folding chair and catching his breath. Her colleague hands him a bottle of water. Behind them runners pass, blurred, with the Atlantic beyond.
>
> The team: a Moroccan woman of about 28 in a white hijab, and a Moroccan man of about 35 with short black hair and a short beard. Both wear a white polo shirt and navy trousers, with a yellow high-visibility vest over the polo.
>
> One true detail: very small and soft on the horizon, the tall square minaret of the Hassan II Mosque by the ocean. The runner's race bib is blank.
>
> Landscape 3:2, medium shot at eye level, 35mm lens. The faces and the bandaged ankle sit inside the central 60% of the frame; the edges and both top corners stay calm and empty. Documentary photograph, natural light, real skin texture, a candid moment, nobody looks at the camera. Colors: white, navy, soft blue, warm wood and brass.
>
> Use the attached MedCare logo exactly as provided, small, embroidered on the left chest of the white uniform and printed on the side of the navy medical bag. Do not redraw it or change its letters. No other readable text anywhere in the picture: no signs, no number plates, no writing on screens.
>
> Not European, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes. No brick houses, pitched roofs or lawns. No tourist Morocco: no camels, fez hats, souk stalls, blue-painted walls or red clay walls. No garbled lettering, no extra fingers, no plastic skin.

### `service-personne-agee.webp`

Soins aux personnes âgées · رعاية كبار السن

> Photograph taken in Casablanca, Morocco. Every person in the picture is Moroccan, with North African (Arab and Amazigh) features. In this picture the service is daily help for an elderly parent at home.
>
> Late afternoon, golden light, on the narrow balcony of a Casablanca apartment with a wrought-iron railing. An elderly Moroccan man in a cream djellaba and yellow leather slippers walks slowly with a walking frame. The nurse walks at his side with a hand under his elbow, her face turned toward him, and he is smiling at something she said.
>
> The nurse is a Moroccan woman of 32: light olive-brown skin, large dark brown eyes, thick dark eyebrows, a calm and kind face. She wears a white hijab wrapped simply around her face, a white short-sleeved nurse's tunic and white trousers. Use the attached portrait for her face.
>
> One true detail: pots of geranium and fresh mint along the railing, and behind them white rooftops with satellite dishes and a line of laundry.
>
> Landscape 3:2, medium shot at eye level, 35mm lens. The faces and the walking frame sit inside the central 60% of the frame; the edges and both top corners stay calm and empty. Documentary photograph, natural light, real skin texture, a candid moment, nobody looks at the camera. Colors: white, navy, soft blue, warm wood and brass.
>
> Use the attached MedCare logo exactly as provided, small, embroidered on the left chest of the white uniform. Do not redraw it or change its letters. No other readable text anywhere in the picture: no signs, no number plates, no writing on screens.
>
> Not European, not American. No fair or pink skin, no blonde or light brown hair, no blue or green eyes. No brick houses, pitched roofs or lawns. No tourist Morocco: no camels, fez hats, souk stalls, blue-painted walls or red clay walls. No garbled lettering, no extra fingers, no plastic skin.

## 4. Coverage section

The photo of the Hassan II Mosque is a real photograph from Unsplash (free license): https://unsplash.com/photos/ymEGRkA25zQ. Keep it or replace it with one of the client's own photos of Casablanca.
