# MedCare redesign: who lands on the site and what they need

War-room review run on 13 November 2026, before and during the redesign. Five roles: Engineer, Devil's Advocate, Expert (a healthcare service designer with booking and urgent-care experience in North Africa), Dumb Customer (two real-person tests on the built site, one in French and one in Arabic), and the Maestro who decides.

This is a design review. It is not medical or legal advice. The wording of emergency instructions and the legal pages should be confirmed by MedCare's medical lead and a lawyer.

## Goal and constraints

Redesign the MedCare site so that a visitor on a phone can reach the team in one tap and trusts what they read.

- 95% of visitors are on phones (client statement).
- Booking is a phone call or a WhatsApp message. There is no form backend.
- Only confirmed facts may appear: the phone and WhatsApp number, the email, the nine services, 24/7 availability, the free quote, and coverage of Casablanca and its region.

## Evidence board

| # | Fact | Source |
| --- | --- | --- |
| E1 | 31.5 million internet users and 30.7 million smartphone holders in Morocco. Every urban household has a smartphone. 93% of internet users go online daily. | ANRT 2025 survey, reported by Morocco World News and MEA Tech Watch |
| E2 | Mobile is about 93% of internet subscriptions (38.5 of 41.5 million, end of 2025). | Médias24, AllAfrica |
| E3 | WhatsApp was used by 96.5% of respondents. This figure is from 2019; no newer one was found. | ANRT 2019, via Yabiladi |
| E4 | Moroccans are moving from classic calls and SMS to internet messaging. | Bladi, Morocco World News, 2026 |
| E5 | Casablanca has many private providers (SOS Médecins Maroc, Sos Oasis Allo Docteur, Mosas, Sakr Assistance, Injad Secours, Planet Assistance). All claim 24/7. Their listings show no prices. | Telecontact and Kerix directories |
| E6 | Casablanca's communal council is regulating patient transport to end "free-price" ambulances. Price opacity is a public complaint. | TelQuel, March 2026 (paywalled, details not read) |
| E7 | The public SAMU (141) is under strain: calls rose from 1,500 to 8,000 a day in 2020 with about two call-takers per shift. An industry body claims over 90% of urgent evacuations are private. | Médias24 2020; EcoActu (advocacy claim) |
| E8 | Vendor-grade conversion advice: a sticky call button matters on phones, credentials above the fold help, slow pages are abandoned. No peer-reviewed figure. | Agency blogs, directional only |
| E9 | 95% of MedCare's visitors are on phones. | Client |
| E10 | No Google profile, directory listing or review for MedCare was found. The old site showed "12,000 patients", "4.9/5", three named testimonials, "10+ years", "30 cities" and a street address. None could be verified. | Web search, 13 Nov 2026 |
| E11 | The old site played a splash before content, hid the header on scroll, had no call button in the hero, put the nine services in a 3D carousel, and forgot the chosen language between pages. | Code review |

## The three visitors

1. The panicked relative. Someone fell or cannot breathe. One hand, often at night. Needs the words "ambulance" or "médecin", "24h/24", and a call button within five seconds.
2. The adult child arranging care. Nursing, a garde-malade, a blood test for a parent. Worried, comparing two or three providers, afraid of price surprises. Needs to see the service named, a price or a promise to give one first, and a way to write.
3. The planner. Event cover, a transfer between cities, a relative abroad arranging care. Calm, sometimes on a desktop. Needs scope and a quote path.

## Deliberation

**Engineer:** Plan v1. Compact header that stays. Hero with one promise, "24h/24", and the two contact buttons. Nine services in a plain grid, each opening WhatsApp with its name. Three steps. FAQ. A sticky Call and WhatsApp bar on every page. Delete every number that cannot be proven (E10). Blue for brand, red for emergency, green for WhatsApp.

**Devil's Advocate:** I reject it. F1: the team wants GSAP scroll effects, two new typefaces and a logo intro. On a mid-range Android the first screen arrives late and the relative with a sick parent leaves (E2, E9, E11). F2: you remove the fake proof and put nothing in its place, so a polished site with no address, no licence and no faces reads like a broker (E5, E6, E10).

**Dumb Customer (Salma, French):** I tap "Garde-malade". I see "À partir de 350 MAD / nuit", good, a number. Then "tarifs indicatifs, dépend de la distance" and I doubt again. No address, no authorisation. I write to you and to the two others.

**Dumb Customer (Fatima, Arabic):** I tapped "تفاصيل الخدمة" and the page was in French. "تقدير" worried me, it sounds approximate. "الترحيل الصحي" I did not understand. I will call to ask the price and who enters my house.

**Expert:** F1 is fatal and has a concrete mechanism. F2 is serious, and the persona scores confirm it (trust 2 and 3 out of 5). I add F5: one mobile number carries nine services and a 24/7 promise. If a life-threatening case sends a WhatsApp and waits, the site implied an emergency response it could not give (E7). Put "call, do not write" next to the emergency button and name the public lines as a fallback.

**Engineer:** Plan v2.
- `+` The call bar is in the server-rendered HTML, needs no script, and sits above the intro overlay (fixes F1).
- `~` The intro is CSS only, about two seconds, once per session, skippable, and off for reduced motion (fixes F1).
- `~` All scroll effects are enhancements: content is visible without them (fixes F1).
- `+` "Une urgence ? Appelez, n'écrivez pas." with 141 and 150 as fallback (fixes F5).
- `+` A request builder that writes the WhatsApp message, so the visitor does not have to find the words.

**Devil's Advocate:** F1 is patched if you measured it. F3 stays: the client will find the honest version "weak" and paste the fake 4.9/5 back in. F4 also stays: MedCare has no Google profile, so urgent searchers call from the map results and never see this site (E10).

**Expert:** F3 and F4 are real but they are not design flaws. They need the client. Give them a document that asks for the real proof and explains why the invented numbers left.

**Engineer:** Plan v3.
- `+` A client information request (PDF) listing every missing proof and every price to validate (mitigates F2, F3).
- `+` Arabic versions of the nine service pages, and the Arabic wording corrected from Fatima's test (fixes F6).
- `+` Each call and WhatsApp link carries a `data-contact` attribute and pushes to `dataLayer`, so taps can be counted from day one (mitigates F4).

## Flaw register

| ID | Flaw | Mechanism | Severity | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| F1 | Motion buries the phone number | Scripts, fonts and an intro delay the first tap on a slow phone | Fatal | E2, E9, E11 | Patched. Call bar is server-rendered and above the intro. Not yet measured on a real low-end phone. |
| F2 | Honest but empty | No address, licence, reviews or faces, so the site reads as a broker | Serious | E5, E6, E10; persona trust 2/5 and 3/5 | Accepted. Owner: client, through the PDF. |
| F3 | Fake proof creeps back | Client restores invented numbers; someone checks during the ambulance crackdown | Fatal if exposed | E6, E10 | Accepted. Mitigation: the PDF explains why they were removed. |
| F4 | The site was never the bottleneck | No Google profile, so urgent searchers never arrive | Serious | E10, assumption on traffic | Open. Owner: client. First item in the PDF's proof list. |
| F5 | The promise breaks at the other end | A vital case writes on WhatsApp, or the single line is busy | Serious | E7 | Patched in copy. The staffing behind the 24/7 promise is the client's to confirm. |
| F6 | Arabic readers hit French and calques | Service pages were French only; some terms read as translation | Serious | Fatima's test | Patched. |
| F7 | Chat bubble is a third, unclear contact | It cannot dispatch or book and it covered the first screen | Annoying | Both persona tests | Patched for phones (appears after the first screen). Keeping or removing it is the client's choice. |

## Decision

**Go, with conditions.** The redesign ships the contact path and the honest content. Trust cannot be finished by design: it needs the client's answers.

1. Send `docs/client/medcare-informations-a-fournir.pdf` to MedCare. Done when it comes back with the 15 mandatory answers.
2. Create or claim the Google Business profile. Owner: client. Done when the profile shows the same phone number as the site.
3. Replace the illustrative photos with real ones of the team and vehicles. Done when at least the hero and ambulance photos are real.
4. Connect an analytics tool to the `contact_tap` event. Done when a week of call and WhatsApp taps is visible.
5. Test the first screen on a real low-end Android on 4G. Done when the call bar is tappable in under two seconds.

**First 48 hours**
1. Send the PDF.
2. Ask the client who answers the phone tonight between midnight and 6 a.m.
3. Open the site on two real phones (one Android, one iPhone), in French and Arabic, and tap every call and WhatsApp button.

**Kill criteria**
- Fewer than 2% of phone visits tap Call or WhatsApp after two weeks: the first screen is not doing its job, revisit it.
- WhatsApp messages go unanswered for more than 15 minutes at night more than once a week: remove "24h/24" from the site until staffing matches it.
- The client insists on unverifiable numbers: stop and discuss before publishing.

**What would flip the decision**
- If most real traffic is desktop rather than phone, the layout priorities change. Cheapest test: one week of analytics.
- If MedCare cannot answer at night, the emergency framing must go. Cheapest test: call the number at 3 a.m.

**Confidence: medium.** The contact path and the content honesty are well supported. The size of the effect is unknown because there is no traffic baseline and E8 is weak evidence.

## Sources

- [ANRT survey coverage, Morocco World News, Nov 2025](https://www.moroccoworldnews.com/2025/11/268599/anrt-61-4-of-moroccans-still-dont-know-about-ai-despite-rapid-digital-growth/)
- [Morocco smartphone penetration, MEA Tech Watch](https://meatechwatch.com/2025/11/20/most-moroccans-still-unfamiliar-with-ai-despite-fast-digital-growth-anrt-survey/)
- [Mobile subscriptions end of 2025, Médias24](https://medias24.com/2026/03/16/telephonie-mobile-le-maroc-depasse-59-millions-dabonnes-1643987/)
- [Calls and SMS decline, Morocco World News, March 2026](https://www.moroccoworldnews.com/2026/03/283016/calls-and-sms-decline-as-5g-reaches-38-of-moroccans/)
- [Casablanca ambulance pricing, TelQuel, March 2026](https://telquel.ma/2026/03/26/casablanca-lambulance-a-prix-libre-cest-fini_1980668)
- [SAMU difficulties, Médias24, 2020](https://medias24.com/2020/09/01/la-pandemie-a-mis-a-nu-les-difficultes-structurelles-du-samu/)
- [Ambulance and assistance providers in Casablanca, Telecontact](https://www.telecontact.ma/liens/ambulances-et-assistance-sanitaire/casablanca.php)
