# MacroCalc AI — Roadmap

## Status Key
- [x] Done
- [ ] Not started
- [~] Partial / needs work

---

## Phase 1 — Foundation
- [x] Next.js 16 project scaffold (TypeScript, Tailwind v4, App Router, Turbopack)
- [x] Prisma v7 schema (9 models: User, Subscription, MacroProfile, MealPlan, ProgressLog, Achievement, UserAchievement, AiGeneration, BlogPost)
- [x] Neon serverless Postgres via `@prisma/adapter-neon`
- [x] Prisma singleton (`src/lib/prisma.ts`)
- [x] shadcn/ui components (button, card, dialog, form, input, label, select, slider, switch, tabs, toast, tooltip, badge, progress, separator, skeleton)
- [x] Global CSS with Tailwind v4 `@theme` — neon accent `#00FF87`, glassmorphism utilities
- [x] TypeScript types (`src/types/`)
- [x] Utility helpers (`src/lib/utils.ts`)
- [x] Clerk v7 middleware (`src/middleware.ts`)
- [x] Root layout with ClerkProvider + PostHogProvider + Geist font
- [x] `.env.example` with all required variables

## Phase 2 — Calculator Engine
- [x] Macro calculation logic (`src/lib/calc.ts`)
- [x] Zustand calculator store with sessionStorage persist (`src/store/useCalculatorStore.ts`)
- [x] Calculator UI components: MacroForm, UnitToggle, GoalSelector, ActivitySlider
- [x] Calculator page (`/calculator`)
- [x] `POST /api/macro/calculate` — Zod-validated, rate-limited

## Phase 3 — Results & Viral Layer
- [x] Results page (`/results`)
- [x] Result components: MacroCard, RadialChart, MacroBreakdown, ShareButton, PdfDownloadButton, EmailGate
- [x] PDF report (`src/pdf/MacroReportPdf.tsx` + `GET /api/pdf`)
- [x] OG image (`GET /api/og` — edge runtime, `@vercel/og`)
- [x] Email capture (`POST /api/email/capture` → Resend)
- [x] Shared UI: GlassCard, NeonButton, AnimatedNumber, ConfettiEffect

## Phase 4 — Landing Page & Marketing
- [x] Landing page (`/`) — hero, social proof, features, testimonials, FAQ, CTA
- [x] Landing components: HeroSection, SocialProof, FeatureGrid, TestimonialsCarousel, FaqAccordion
- [x] Marketing layout with Header and Footer
- [x] Header (auth-aware) and Footer components

## Phase 5 — Auth & User Dashboard
- [x] Clerk webhook (`POST /api/webhooks/clerk`) — user.created → DB upsert with referral code
- [x] Auth helpers (`src/lib/clerk.ts`) — requireAuth, requireAdmin, isPremium, getDbUser
- [x] Dashboard layout with sidebar nav
- [x] Dashboard page (`/dashboard`) — streak, achievements, weight chart, saved plans, referral widget
- [x] Dashboard components: StreakCard, AchievementBadge, WeightTrendChart, ReferralWidget
- [x] Progress API (`POST/GET /api/progress`)
- [x] Settings page (`/settings`)
- [ ] `src/hooks/useProgress.ts` — client hook for progress data
- [ ] `src/hooks/useSubscription.ts` — client hook for subscription state

## Phase 6 — AI Meal Planner
- [x] OpenAI client with lazy Proxy pattern (`src/lib/openai.ts`)
- [x] Meal plan generation (`POST /api/meal-plan/generate`)
- [x] Meal plan CRUD (`GET/DELETE /api/meal-plan/[id]`)
- [x] Meal plan Zustand store (`src/store/useMealPlanStore.ts`)
- [x] Meal planner UI: MealPlannerForm, MealPlanDisplay, GroceryList
- [x] Meal planner page (`/meal-planner`)
- [~] Streaming indicator component exists but streaming is not used (full JSON buffered before parse — intentional)

## Phase 7 — Payments
- [x] Stripe client with lazy Proxy pattern (`src/lib/stripe.ts`)
- [x] Stripe checkout (`POST /api/stripe/checkout`)
- [x] Stripe billing portal (`POST /api/stripe/portal`)
- [x] Stripe webhook (`POST /api/webhooks/stripe`) — handles subscription lifecycle, sets User.role
- [x] Pricing page (`/pricing`)
- [x] PricingCard component
- [ ] PricingToggle (monthly/annual switch) — PricingCard exists but no toggle between billing periods

## Phase 8 — Email Drip Campaigns
- [x] Resend client (`src/lib/resend.ts`) — sendMacroReport, triggerDrip helpers
- [ ] `src/emails/` directory — React Email templates not created:
  - [ ] WelcomeEmail
  - [ ] MacroReport
  - [ ] DripDay1
  - [ ] DripDay3
  - [ ] DripDay7

## Phase 9 — Viral & Referral System
- [x] Referral code generation (`POST /api/referral/generate`)
- [x] Referral tracking (`POST /api/referral/track`)
- [x] Referral landing page (`/referral`)
- [x] ReferralWidget component on dashboard
- [x] Achievement + streak logic wired into Clerk webhook and API routes
- [ ] `src/hooks/useReferral.ts` — client hook for referral state

## Phase 10 — SEO Blog
- [x] Blog index page (`/blog`) — dynamic, falls back to seed posts
- [x] Blog slug page (`/blog/[slug]`) — dynamic, fallback content for 6 seed slugs
- [x] StructuredData (JSON-LD) component
- [x] `src/app/sitemap.ts`
- [x] `public/robots.txt`
- [x] Seed script with 3 blog posts (`prisma/seed.ts`)
- [ ] Breadcrumbs component (`src/components/seo/Breadcrumbs.tsx`)
- [ ] Additional programmatic SEO blog posts — only 3 seeded, 6 slugs have fallback content; remaining slugs need DB entries or seed data:
  - [ ] macro-calculator-muscle-gain
  - [ ] high-protein-meal-plans
  - [ ] macro-meal-prep-ideas

## Phase 11 — Admin Dashboard
- [x] Admin layout with sidebar (ADMIN role guard)
- [x] Admin overview page (`/admin`) — user count, meal plan count, premium count, blog count, recent users
- [x] Admin users page (`/admin/users`) — full user table with subscription status
- [x] Admin analytics page (`/admin/analytics`) — AI generation stats, token usage
- [x] Admin blog page (`/admin/blog`) — list all blog posts
- [x] Admin prompts page (`/admin/prompts`) — edit AI prompt templates (in-memory, session only)
- [x] Admin referrals page (`/admin/referrals`) — top referrers table
- [ ] Admin blog editor (`/admin/blog/new` and `/admin/blog/[id]/edit`) — create/edit posts via UI
- [ ] Admin stat charts — visual graphs for user growth, revenue, AI usage over time

## Phase 12 — Rate Limiting, Analytics & Polish
- [x] Upstash Redis rate limiting (`src/lib/ratelimit.ts`) — gracefully no-ops without env vars
- [x] Rate limits applied: calculator (20/min), meal plan (5/hr), email capture (3/hr)
- [x] PostHog server-side client (`src/lib/posthog.ts`)
- [x] PostHog events: calc_submitted, results_viewed, email_captured, pdf_downloaded, share_clicked, upgrade_clicked
- [x] `generateMetadata` on all marketing and blog pages
- [x] Suspense boundaries and dynamic imports for recharts/react-pdf
- [~] Seed script exists but only seeds 3 of 6 blog slug fallbacks — run `npm run db:seed` after first deploy

---

## Deployment Checklist

### Vercel Environment Variables (must be set before app works)
```
DATABASE_URL              Neon pooled connection string
DIRECT_URL                Neon direct connection string (migrations)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET      Set after adding webhook in Clerk dashboard
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET     Set after adding webhook in Stripe dashboard
STRIPE_PRICE_ID_MONTHLY
STRIPE_PRICE_ID_ANNUAL
OPENAI_API_KEY
RESEND_API_KEY
RESEND_AUDIENCE_ID
RESEND_FROM_EMAIL         hello@macrocalc.ai
NEXT_PUBLIC_POSTHOG_KEY
NEXT_PUBLIC_POSTHOG_HOST  https://us.i.posthog.com
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
NEXT_PUBLIC_APP_URL       https://macrocalc.ai
NEXT_PUBLIC_ADMIN_EMAIL   jeganathandurai@gmail.com
```

### Post-Deploy Steps
1. Run `npm run db:seed` to populate achievements and blog posts
2. Create Clerk webhook pointing to `https://your-domain/api/webhooks/clerk` — events: `user.created`, `user.updated`
3. Create Stripe webhook pointing to `https://your-domain/api/webhooks/stripe` — events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Create Stripe products and copy price IDs into env vars
5. Create admin user: sign up via Clerk, then run a one-off DB update to set `role = 'ADMIN'` for your account
6. Verify Upstash Redis connection (rate limiting silently no-ops if not set)

---

## Known Issues / Tech Debt

| Issue | File | Notes |
|---|---|---|
| Admin blog editor missing | `/admin/blog/new` | Blog posts can only be created via seed script or Prisma Studio |
| Email templates not created | `src/emails/` | Resend helpers exist but no React Email templates; drip emails won't send |
| `useProgress` / `useSubscription` hooks missing | `src/hooks/` | Dashboard uses server-side fetch instead; client-side refetch not available |
| PricingToggle missing | `/pricing` | Only one billing period shown; annual toggle not implemented |
| Breadcrumbs component missing | `src/components/seo/` | Imported in plan but file not created |
| 3 blog posts missing from seed | `prisma/seed.ts` | muscle-gain, high-protein-meal-plans, macro-meal-prep-ideas have fallback content but no DB entries |
