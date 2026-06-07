---
name: medcare-design-system
description: MedCare site theme tokens, reusable premium CSS utilities, and decorative components to reuse when building/refining UI
metadata:
  type: project
---

MedCare is a bilingual (FR/AR, RTL-aware) Moroccan medical/home-care landing site. Next.js 16 + Tailwind v4 + shadcn + framer-motion.

**Theme (do not change):** brand blue `#1080B0` (+ `brand-dark/deeper/deep/light/xlight`, `tint`, `tint-2`), emergency red `#E63A4B`, ink text. Fonts: Plus Jakarta Sans (headings), Manrope (body), Tajawal (Arabic). Tokens defined in [globals.css](src/app/globals.css).

**Reusable premium utilities added to globals.css** — prefer these over ad-hoc styles for consistency:
- `.text-gradient-brand` — animated gradient headline text
- `.glass` / `.glass-dark` — glassmorphism surfaces (light / on dark sections)
- `.bg-grid` / `.bg-grid-light` / `.bg-dots` — background textures; pair with `.mask-fade` (radial fade)
- `.shadow-soft/.shadow-card/.shadow-float/.shadow-brand-glow/.shadow-emergency-glow` — elevation scale
- `.gradient-ring` — animated gradient border wrapper (uses ::before mask)
- `.sheen` — diagonal sheen sweep on `.group:hover` (parent must be relative+overflow-hidden)
- animations: `.animate-aurora/.animate-aurora-slow/.animate-glow-pulse` (+ existing float/pulse-ring)
- A `prefers-reduced-motion` block disables all custom animations — keep honoring it.

**Reusable components:** [aurora-background.tsx](src/components/aurora-background.tsx) (decorative drifting blooms + grid, `variant="light"|"dark"`, aria-hidden) and [social-icons.tsx](src/components/social-icons.tsx) (official Facebook/Instagram/LinkedIn/WhatsApp brand SVGs as `currentColor`).

Coverage section map is a stylized radar/network panel (hub=Casablanca + satellite city pins), NOT a geographic Morocco outline — chosen to avoid inaccurate-border risk. See [coverage.tsx](src/components/coverage.tsx).

Related: [[medcare-nextjs-breaking-changes]]
