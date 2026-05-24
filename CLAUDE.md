# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Important:** This is Next.js 16.2.6. APIs, conventions, and file structure differ significantly from older versions. Read `node_modules/next/dist/docs/` before writing any Next.js-specific code.

---

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build — must pass with zero TS errors
npm run start        # Start production server

npm run db:generate  # Re-generate Prisma client after schema changes
npm run db:push      # Push schema to Neon DB (no migration files)
npm run db:seed      # Seed achievements + blog posts (uses tsx)
npm run db:studio    # Open Prisma Studio
```

No test runner is configured.

---

## Architecture

### Route Groups

The app uses four Next.js route groups, each with its own layout:

| Group | URL prefix | Auth |
|---|---|---|
| `(marketing)` | `/`, `/pricing`, `/blog`, `/referral` | Public |
| `(calculator)` | `/calculator`, `/results` | Public |
| `(dashboard)` | `/dashboard`, `/meal-planner`, `/settings` | Clerk-protected |
| `(admin)` | `/admin/**` | ADMIN role only (DB check in layout) |

The root `src/app/layout.tsx` wraps everything in `ClerkProvider` + `PostHogProvider`. There is **no** `src/app/page.tsx` — the homepage is `src/app/(marketing)/page.tsx`.

Middleware (`src/middleware.ts`) uses Clerk v7's `clerkMiddleware()`. Webhook routes (`/api/webhooks/*`) must remain in the public route matcher.

### Calculator Flow

1. User submits `MacroForm` → calls `POST /api/macro/calculate` (Zod-validated, rate-limited)
2. Result stored in `useCalculatorStore` (Zustand, persisted to `sessionStorage`)
3. `/results` page reads from the store; macros are computed client-side instantly — the email gate only *reveals* the UI, it doesn't block calculation
4. Email capture → `POST /api/email/capture` → Resend audience add + welcome email

### AI Meal Planner

`POST /api/meal-plan/generate` calls OpenAI synchronously (not streaming). Premium users get `gpt-4o`; free users get `gpt-4o-mini`. The full JSON response is buffered before parsing. Rate limit: 5 requests/hour per user/IP via Upstash Redis.

### Payments

Stripe subscription lifecycle is handled entirely in `src/app/api/webhooks/stripe/route.ts` (must be `runtime = 'nodejs'` — uses Node crypto). The `current_period_end` field lives at `subscription.items.data[0].current_period_end`, not at the top-level subscription object (Stripe v22 change). After checkout, the webhook sets `User.role = 'PREMIUM'` in the DB.

### Database

- Prisma v7 with Neon serverless Postgres
- Client generated to `src/generated/prisma/` — import from `@/generated/prisma/client` (no index file)
- `PrismaNeon` adapter is required; see `src/lib/prisma.ts` for the singleton pattern
- `prisma/` is excluded from `tsconfig.json` so `seed.ts` isn't type-checked during builds
- Use `DATABASE_URL` (pooled) for app queries; `DIRECT_URL` (direct) for migrations

### Third-Party Client Initialization

Stripe, OpenAI, and Resend all use a lazy Proxy pattern to avoid throwing at build time when env vars are absent:

```ts
let _client = null
function getClient() { if (!_client) _client = new Client(process.env.KEY); return _client }
export const client = new Proxy({} as Client, { get(_, prop) { return getClient()[prop] } })
```

### Auth Helpers (`src/lib/clerk.ts`)

- `requireAuth()` — returns `userId` or throws
- `requireAdmin()` — checks `User.role === 'ADMIN'` in DB
- `isPremium()` — checks role or active subscription status
- `getDbUser()` — returns full user row with subscription

### Rate Limiting (`src/lib/ratelimit.ts`)

Upstash Redis is optional — if env vars are absent, all limiters are `null` and `checkRateLimit()` returns `{ success: true }`. Limits: calculator 20/min, meal plan 5/hr, email capture 3/hr.

### Special Route Runtimes

| Route | Runtime | Reason |
|---|---|---|
| `/api/og` | `edge` | `@vercel/og` ImageResponse |
| `/api/pdf` | `nodejs` | `@react-pdf/renderer` reads Node APIs |
| `/api/webhooks/stripe` | `nodejs` | `stripe.webhooks.constructEvent` uses Node crypto |

### Styling

Tailwind v4 — configured via `@theme` blocks in `src/app/globals.css` (no `tailwind.config.ts`). Key custom utilities:
- `text-neon` / `bg-neon` — accent color `#00FF87`
- `glass` — glassmorphism card: `bg-white/5 backdrop-blur-md border border-white/10 rounded-xl`
- `GlassCard` component wraps the glass utility with consistent padding

### Clerk v7 Differences

- `SignedIn` / `SignedOut` removed — use `<Show when="signed-in">` / `<Show when="signed-out">` from `@clerk/nextjs`
- `UserButton` no longer accepts `afterSignOutUrl` prop
- `cookies()` and `headers()` from `next/headers` are async — always `await` them

### Accordion / Animated Collapsibles

`@base-ui/react` Accordion has a different API from the Radix-based shadcn one — no `type` or `collapsible` props. All accordions in this app use a custom controlled pattern with Framer Motion `AnimatePresence` and `motion.div height: 0 → auto`.

---

## Environment Variables

```bash
DATABASE_URL=                          # Neon pooled
DIRECT_URL=                            # Neon direct (migrations only)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_MONTHLY=
STRIPE_PRICE_ID_ANNUAL=
OPENAI_API_KEY=
RESEND_API_KEY=
RESEND_AUDIENCE_ID=
RESEND_FROM_EMAIL=hello@macrocalc.ai
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_APP_URL=https://macrocalc.ai
NEXT_PUBLIC_ADMIN_EMAIL=jeganathandurai@gmail.com
```
