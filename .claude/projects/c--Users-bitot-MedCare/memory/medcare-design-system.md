---
name: medcare-design-system
description: MedCare design system after the November 2026 redesign: tokens, fonts, color roles, shared components and content rules
metadata:
  type: project
---

MedCare is a bilingual (FR/AR, RTL-aware) home-healthcare site for Casablanca and its region. Next.js 16, Tailwind v4, shadcn (Base UI), GSAP. Phones first: the client says 95% of visitors are on mobile.

**Tokens** live in [globals.css](src/app/globals.css). Every color derives from the two logo blues (azure `#1278AD`, navy `#183660`). Roles, one meaning each: blue = brand and main action; navy (`ink`, `brand-deep`) = text and dark surfaces; `sand` = warm quiet background; red (`emergency`) = emergencies only; green (`whatsapp`) = WhatsApp only. Measured contrast ratios are in the comments.

**Fonts:** Fraunces (h1, h2), Figtree (interface), IBM Plex Sans Arabic (leads the stack in RTL, see the `[dir="rtl"]` block). No hardcoded font classes in components.

**Utilities:** `shell` (page gutter), `section-y`, `text-display`, `text-title`, `text-lead`, `eyebrow`, `press`, `img-outline`, `num` (LTR numbers), `pb-call-bar`.

**Shared components:**
- [cta.tsx](src/components/ui/cta.tsx): `CallLink` and `WhatsAppLink` are the only call and WhatsApp buttons. They carry `data-contact` attributes and push `contact_tap` to `dataLayer`.
- [reveal-image.tsx](src/components/ui/reveal-image.tsx): blur-up, curtain reveal and slight parallax for photos. The photo is never hidden, so lazy loading works.
- [scroll-reveal.tsx](src/components/ui/scroll-reveal.tsx): opacity-only entrance (never `visibility: hidden`, it blocks lazy images).
- [chat-demo.tsx](src/components/ui/chat-demo.tsx): WhatsApp-style typing that plays on scroll.
- [final-cta.tsx](src/components/sections/final-cta.tsx): the request builder that writes the WhatsApp message.
- [mobile-call-bar.tsx](src/components/sections/mobile-call-bar.tsx): server-rendered, above the intro overlay.

**Motion rules:** every effect is an enhancement inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Content must be complete without scripts. Do not nest `mm.add` inside another `mm.add` callback (it froze the page once).

**Content rules:** only confirmed facts (phone, WhatsApp, email, nine services, 24/7, free quote, Casablanca and region). No patient counts, ratings, testimonials, response times or address until the client returns `docs/client/medcare-informations-a-fournir.pdf`. All copy goes through `i18n.ts` (home) or `service-page-copy.ts` and `services-data(-ar).ts` (service pages), in both languages.
