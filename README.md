# MedCare

Marketing and services website for **MedCare**, a Moroccan home-healthcare
provider (ambulance, doctor at home, home nursing, teleconsultation, lab
sampling, medical repatriation, event medical teams, elderly care). The site
presents the service catalogue, lets visitors request a reservation, and
includes an AI assistant that answers questions about the services.

## Tech stack

- **Next.js 16** (App Router) with Turbopack
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **Framer Motion** for animation
- **Embla** for the services carousel
- **lucide-react** + Iconify (Solar) for icons
- **Groq SDK** for the chatbot LLM backend
- Component primitives composed in the shadcn/ui style (Radix-like, in `ui/`)

## Internationalisation (i18n)

All user-facing copy lives in the i18n layer — never hardcode strings in
components.

- `src/lib/i18n.ts` — the translation dictionaries.
- `src/lib/i18n-context.tsx` — the React provider and `useI18n()` hook
  exposing `t()` and the current text direction (`dir`).

Currently shipped locales: **French (`fr`, default)** and **Arabic (`ar`)**.
Arabic renders right-to-left; layouts use logical CSS properties
(`start`/`end`) so RTL is handled automatically. The dictionary structure is
designed to extend to further locales (e.g. English) by adding a key block in
`i18n.ts` and widening the `Lang` type.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the value:

```bash
cp .env.example .env.local
```

| Variable        | Required | Description                                              |
| --------------- | -------- | -------------------------------------------------------- |
| `GROQ_API_KEY`  | yes      | API key for the Groq LLM used by the chatbot route.      |

The key is read from the environment only (see `src/app/api/chat/route.ts`) and
must never be committed. Without it, the site renders fine but the chatbot
endpoint returns an error.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build & quality checks

```bash
npm run build   # production build (compile + typecheck + static generation)
npm run lint    # ESLint
npm run start   # serve the production build
```

Run `npm run build` and `npm run lint` before every commit.

## Architecture overview

```
src/
├── app/                      # Routes, layouts, API handlers only
│   ├── layout.tsx            # Root layout (fonts, global chatbot mount)
│   ├── page.tsx              # Landing page (composes the sections)
│   ├── reservation/          # Reservation page
│   ├── services/[slug]/      # Per-service detail pages (SSG)
│   └── api/chat/route.ts     # Chatbot endpoint (Groq + rate limiting)
├── components/
│   ├── sections/             # Landing-page sections (hero, services,
│   │                         #   coverage, testimonials, why-us, steps,
│   │                         #   header, footer, topbar, …)
│   ├── ui/                   # Generic primitives & visual helpers
│   │                         #   (button, card, badge, app-icon,
│   │                         #   scroll-reveal, aurora-background, …)
│   ├── chatbot/              # AI assistant feature
│   ├── reservation/          # Reservation form feature
│   └── services/             # Service detail page renderer
├── hooks/                    # Shared React hooks (e.g. useChatbot)
└── lib/                      # Data, i18n, and prompt builders (no React):
                              #   services-data, i18n, i18n-context,
                              #   chatbot-system-prompt, app-icons-data
```

Static assets live in `public/` (lowercase kebab-case ASCII filenames, photos
optimised as `.webp`).

### Chatbot route

`POST /api/chat` builds a system prompt from the service catalogue
(`buildSystemPrompt`) and proxies the conversation to Groq. It enforces input
validation, message-length limits, and per-session in-memory rate limiting
(20 messages/hour). The `GROQ_API_KEY` is supplied via the environment.

## Conventions

Project conventions (naming, structure, i18n, asset rules) are documented in
[`AGENTS.md`](./AGENTS.md).
