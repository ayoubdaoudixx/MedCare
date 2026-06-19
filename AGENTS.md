@AGENTS.md

# MedCare — Project Conventions

Healthcare services website for a Moroccan provider. Next.js App Router +
React + TypeScript + Tailwind v4. Trilingual FR/AR/EN with RTL support.

## Golden rules
- This Next.js version has breaking changes vs. older releases. Before touching
  any framework-level code, routing, or config, read the relevant guide in
  `node_modules/next/dist/docs/`. Do not assume training-data conventions.
- Refactors are behavior-preserving by default. Do not change rendered output,
  styling, routes, or component logic unless the task explicitly asks for it.
- Run `npm run build` and `npm run lint` before every commit. Never commit a red build.
- No new dependencies without asking first.

## File & folder naming
- All files and folders use lowercase kebab-case: `reservation-form.tsx`,
  `medcare-chatbot.tsx`. No PascalCase filenames, no spaces, no accented or
  non-ASCII characters — anywhere, including `public/` assets.
- React component *exports* stay PascalCase (`export function ReservationForm`);
  only the filename is kebab-case.

## Project structure
- `src/app/` — routes, layouts, and API route handlers only.
- `src/components/ui/` — generic reusable primitives (button, card, badge…).
- `src/components/sections/` — landing-page sections (hero, services, coverage,
  testimonials, why-us, steps, footer, header…).
- `src/components/<feature>/` — feature modules: `chatbot/`, `reservation/`,
  `services/`. Keep a feature's components together.
- `src/lib/` — data, i18n, and prompt builders (no React components).
- `src/hooks/` — shared hooks.

## Assets
- `public/` filenames: lowercase kebab-case ASCII only.
- Optimize before committing. Prefer `.webp` for photos. Keep total image weight
  reasonable — avoid multi-MB single images.

## i18n
- All user-facing copy goes through the i18n layer (`src/lib/i18n.ts` +
  `i18n-context`). Never hardcode FR/AR/EN strings in components.
- Every new string needs all three locales. Preserve RTL behavior for Arabic.

## Chatbot / API
- Secrets (e.g. `GROQ_API_KEY`) come from environment variables only — never
  commit keys or hardcode them.
- Keep input validation, sanitization, and rate-limiting on any LLM-facing route.