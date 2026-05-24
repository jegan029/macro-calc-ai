import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { StructuredData } from '@/components/seo/StructuredData'
import { GlassCard } from '@/components/shared/GlassCard'
import { NeonButton } from '@/components/shared/NeonButton'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://macrocalc.ai'

// Fallback content for seeded slugs (no DB content yet)
const SEED_CONTENT: Record<string, { title: string; excerpt: string; content: string; publishedAt: string }> = {
  'macro-calculator-women': {
    title: 'The Best Macro Calculator for Women',
    excerpt: "How to calculate the perfect macros for women's fat loss, maintenance, and muscle gain goals.",
    publishedAt: '2024-01-15',
    content: `
## Why Macros Matter for Women

Tracking macros — protein, carbohydrates, and fat — gives you precise control over your body composition. Unlike calorie-only tracking, macros let you preserve muscle while losing fat, or build muscle without excessive fat gain.

## How to Calculate Your Macros

### Step 1: Find Your Calorie Target
Your daily calories are determined by your weight, goal, and activity level. A common starting point:

- **Fat Loss:** bodyweight (kg) × 9 × 0.9 × activity multiplier
- **Maintenance:** bodyweight (kg) × 9 × activity multiplier
- **Muscle Gain:** bodyweight (kg) × 9 × 1.1 × activity multiplier

### Step 2: Set Your Protein
Protein is the most important macro for body composition. Aim for **0.8–1g per kg of bodyweight** per day. Higher protein preserves muscle during fat loss and supports recovery during muscle gain.

### Step 3: Set Your Fat
Fat supports hormonal health, which is especially important for women. A good target is **0.3g per kg of bodyweight** per day.

### Step 4: Fill Remaining Calories with Carbs
Carbs fuel your workouts and daily energy needs. Calculate carbs from your remaining calorie budget after protein and fat.

## Activity Multipliers

| Activity Level | Multiplier |
|---|---|
| Sedentary (desk job) | 1.0 |
| Lightly active (1-3x/week) | 1.1 |
| Moderately active (3-5x/week) | 1.2 |
| Highly active (6-7x/week) | 1.35 |
| Athlete (2x/day) | 1.5 |

## Sample Macros for Women

**Goal: Fat Loss | 65kg | Moderately Active**
- Calories: ~1,580
- Protein: 52g
- Fat: 20g
- Carbs: ~250g
- Fiber: 22g

## Tips for Hitting Your Macros

1. **Prioritize protein first** — plan meals around your protein source
2. **Meal prep Sunday** — cook proteins in bulk (chicken breast, eggs, Greek yogurt)
3. **Track everything** — use an app like MacroCalc AI to log your food
4. **Flexible dieting** — no foods are off-limits, just track them

## Use MacroCalc AI

Our [free macro calculator](/calculator) calculates your personalized targets in seconds based on your exact weight, goal, and activity level. No email required.
    `.trim(),
  },
  'macro-calculator-fat-loss': {
    title: 'Macro Calculator for Fat Loss: Complete Guide',
    excerpt: 'Calculate your fat loss macros and learn how to hit them consistently for sustainable weight loss.',
    publishedAt: '2024-01-22',
    content: `
## What Are Fat Loss Macros?

Fat loss macros are your personalized daily targets for calories, protein, carbs, and fat calibrated to create a calorie deficit while preserving as much muscle as possible.

## The Fat Loss Formula

**Calories:** bodyweight (kg) × 9 × 0.9 × activity multiplier

The 0.9 goal modifier creates a ~10% calorie deficit — aggressive enough to lose fat but moderate enough to preserve muscle and stay consistent long-term.

## Why Protein Is King for Fat Loss

High protein during fat loss:
- Preserves lean muscle mass
- Increases satiety (keeps you full longer)
- Has a high thermic effect (burns more calories to digest)
- Prevents metabolic slowdown

Target: **0.8–1g protein per kg bodyweight**

## Carbs vs. Fat: Which to Cut?

Both approaches work. The best split is the one you can sustain. General guidance:

- **Higher carb (lower fat):** Better for people who train intensely — carbs fuel workouts
- **Higher fat (lower carb):** Better for people who prefer fewer, more filling meals

## Tracking Tips

1. **Weigh food raw** — cooked weights vary significantly
2. **Log everything** — even oils, sauces, and drinks
3. **Plan the day before** — pre-log meals to stay on target
4. **Aim for average** — hitting weekly targets matters more than daily perfection

## Sample Fat Loss Macros

**75kg male, moderately active:**
- Calories: 1,823
- Protein: 60g
- Fat: 23g
- Carbs: ~280g
- Fiber: 25g

Try our [macro calculator](/calculator) to get your exact numbers.
    `.trim(),
  },
  'macro-calculator-muscle-gain': {
    title: 'Macro Calculator for Muscle Gain (Bulking)',
    excerpt: 'Build serious muscle with the right macro ratios. Includes protein targets, calorie surplus guidelines.',
    publishedAt: '2024-02-01',
    content: `
## Muscle Gain Macros: The Basics

To build muscle, you need a calorie surplus. The goal is a *lean bulk* — enough surplus to build muscle without excessive fat gain.

## The Muscle Gain Formula

**Calories:** bodyweight (kg) × 9 × 1.1 × activity multiplier

The 1.1 modifier creates a ~10% surplus — enough to maximize muscle protein synthesis without gaining fat rapidly.

## Protein for Muscle Gain

During a bulk, protein needs are slightly lower than during a cut since you're not trying to preserve muscle under a deficit. Still target **0.7–0.8g per kg bodyweight** minimum.

## The Role of Carbs in Muscle Building

Carbohydrates are your primary fuel for resistance training. Higher carb intake means:
- More glycogen for intense workouts
- Better workout performance and volume
- Faster recovery between sessions

During a bulk, prioritize carbs over fat for the remaining calories after protein.

## Lean Bulk vs. Dirty Bulk

| | Lean Bulk | Dirty Bulk |
|---|---|---|
| Surplus | 5–10% | 20–30% |
| Muscle gain | Slower | Faster short-term |
| Fat gain | Minimal | Significant |
| Sustainability | High | Low |

For most people, a lean bulk is the better long-term strategy.

## Sample Muscle Gain Macros

**80kg male, highly active:**
- Calories: 2,851
- Protein: 64g
- Fat: 24g
- Carbs: ~440g
- Fiber: 40g

Calculate your exact numbers with our [free macro calculator](/calculator).
    `.trim(),
  },
  'high-protein-meal-plans': {
    title: 'High Protein Meal Plans (7-Day Guide)',
    excerpt: 'A complete 7-day high protein meal plan with macros, grocery list, and meal prep tips.',
    publishedAt: '2024-02-10',
    content: `
## Why High Protein?

A high-protein diet is the most evidence-backed approach for body recomposition — losing fat while building or maintaining muscle. Protein keeps you full, protects muscle during a deficit, and has the highest thermic effect of all macronutrients.

## 7-Day High Protein Meal Plan

### Day 1
- **Breakfast:** Greek yogurt (200g) + berries + 2 boiled eggs — ~40g protein
- **Lunch:** Grilled chicken breast (180g) + rice (150g cooked) + mixed salad — ~50g protein
- **Dinner:** Salmon fillet (200g) + sweet potato + broccoli — ~45g protein
- **Snack:** Cottage cheese (150g) + pineapple — ~20g protein

### Day 2
- **Breakfast:** 3-egg omelette + spinach + 2 slices turkey breast — ~35g protein
- **Lunch:** Tuna wrap (200g tuna) + whole grain tortilla + lettuce — ~45g protein
- **Dinner:** Lean beef mince (200g) stir fry + vegetables + quinoa — ~50g protein
- **Snack:** Protein shake (1 scoop) + banana — ~25g protein

### Days 3–7
Rotate the meals from Days 1–2 with these swaps:
- **Protein sources:** turkey breast, shrimp, tempeh, low-fat cheese, edamame
- **Carb sources:** oats, whole grain bread, lentils, chickpeas
- **Vegetables:** zucchini, bell peppers, asparagus, cucumber, tomatoes

## Weekly Grocery List

**Proteins:**
- Chicken breast (1kg)
- Salmon fillets (600g)
- Lean beef mince (400g)
- Canned tuna (6 × 120g)
- Greek yogurt (1kg)
- Eggs (18)

**Carbs:**
- Rice (1kg dry)
- Sweet potato (4 medium)
- Oats (500g)
- Whole grain bread

**Vegetables:**
- Broccoli, spinach, mixed salad leaves, bell peppers

## Meal Prep Tips

1. Cook all rice and proteins on Sunday
2. Pre-portion into containers (3–4 days worth)
3. Keep salad ingredients uncut until day of eating
4. Freeze extra portions for Week 2

Use our [AI meal planner](/meal-planner) to generate a custom plan based on your exact macros.
    `.trim(),
  },
  'macro-meal-prep-ideas': {
    title: '20 Macro-Friendly Meal Prep Ideas',
    excerpt: 'Save time and hit your macros with these easy meal prep ideas for fat loss and muscle gain.',
    publishedAt: '2024-02-18',
    content: `
## Why Meal Prep Works

Meal prep removes the daily decision fatigue of "what should I eat?" and eliminates the temptation to grab convenient, macro-unfriendly options when you're hungry and busy.

## 20 Macro-Friendly Meal Prep Ideas

### High Protein Breakfasts
1. **Overnight oats** — rolled oats + protein powder + almond milk. Prep 5 jars Sunday night.
2. **Egg muffins** — 12-count egg and veggie muffins, stores 5 days in fridge
3. **Greek yogurt bowls** — pre-portion yogurt with granola kept separate to stay crunchy
4. **Protein pancakes** — batch cook, freeze, reheat in toaster

### High Protein Lunches
5. **Chicken and rice bowls** — bulk cook 1kg chicken + 500g dry rice, 5 containers
6. **Tuna salad** — mix tuna, Greek yogurt (not mayo), cucumber, onion
7. **Turkey lettuce wraps** — pre-slice turkey, keep lettuce leaves stored flat
8. **Lentil soup** — high protein, high fiber, cheap — makes 8+ servings

### High Protein Dinners
9. **Sheet pan salmon** — season 4 fillets, cook together, store with veg
10. **Beef and broccoli stir fry** — lean mince + broccoli + soy sauce + rice
11. **Turkey meatballs** — batch 20 meatballs, freeze half
12. **Shrimp stir fry** — quick to cook fresh but marinade ahead

### Snacks
13. **Hard boiled eggs** — cook 12, peel and store in water in fridge
14. **Protein balls** — oats + protein powder + peanut butter + honey, refrigerate
15. **Cottage cheese cups** — portion 150g into small containers with toppings separate
16. **Edamame** — steam and salt, stores 3 days

### Batch Cooking Basics
17. **Roasted vegetables** — 2 sheet pans every Sunday, all week as sides
18. **Quinoa** — cook 400g dry, stores 5 days, use as base for anything
19. **Boiled sweet potatoes** — peel, boil, cool, store — reheat in 60 seconds
20. **Mason jar salads** — layer in order: dressing, hard veg, grains, leaves (stays fresh 4 days)

## Container Guide

- **Glass containers:** better for reheating, retains no odor
- **Size:** 4-cup containers for main meals, 1-cup for snacks
- **Label:** date and macro content on masking tape

Calculate your target macros with our [free calculator](/calculator) then use the AI Meal Planner to build a custom prep plan.
    `.trim(),
  },
  'how-to-count-macros': {
    title: 'How to Count Macros for Beginners',
    excerpt: 'A step-by-step guide to counting macros, including tools, tips, and common mistakes to avoid.',
    publishedAt: '2024-02-25',
    content: `
## What Are Macros?

Macros (macronutrients) are the three main nutrients your body uses for energy:

- **Protein** — 4 calories per gram. Builds and repairs muscle, keeps you full.
- **Carbohydrates** — 4 calories per gram. Primary energy source, fuels exercise.
- **Fat** — 9 calories per gram. Supports hormones, brain function, fat-soluble vitamins.

## Step 1: Calculate Your Targets

Use a macro calculator to find your personalized daily targets based on your weight, goal, and activity level. Our [free calculator](/calculator) does this instantly.

Example targets for a 70kg person:
- **Calories:** 1,800
- **Protein:** 56g
- **Fat:** 21g
- **Carbs:** ~280g
- **Fiber:** 25g

## Step 2: Get a Food Scale

A $10–20 kitchen scale is the most important tool for accurate macro tracking. Measuring cups are imprecise — weighing in grams is far more accurate, especially for calorie-dense foods like nuts, oils, and cheese.

## Step 3: Use a Tracking App

Popular options:
- **MacroCalc AI** — calculate and track in one place
- **MyFitnessPal** — large food database
- **Cronometer** — most accurate micronutrient data

## Step 4: Learn to Read Labels

Every nutrition label shows macros per serving. Watch out for:
- **Serving size** — many packages contain 2+ servings
- **Added sugars** — count toward carbs
- **"Per 100g" column** — useful for calculating portions

## Step 5: Build a Rotation

Don't track 100 different foods. Master 20–30 foods you enjoy and rotate them. This makes tracking fast (under 5 minutes per day) and hitting targets predictable.

## Common Mistakes

### Mistake 1: Not Weighing Food
"A tablespoon of peanut butter" can vary from 16g to 40g. Weigh it.

### Mistake 2: Forgetting Oils and Sauces
Cooking oil, salad dressing, and sauces add 100–400 calories that people routinely miss.

### Mistake 3: Tracking After Eating
Pre-log your meals in the morning. If you wait until after eating, you can't adjust.

### Mistake 4: Quitting After One Bad Day
Consistency over weeks matters more than perfection any single day. One over-budget day won't affect your results.

### Mistake 5: Obsessing Over Exact Numbers
Being within 5–10% of your targets is close enough. Don't stress about hitting exactly 56g protein — 50–62g is fine.

## Getting Started

1. Use our [calculator](/calculator) to get your targets
2. Download a tracking app
3. Buy a food scale
4. Start with breakfast for Week 1 — just track that one meal
5. Add lunch tracking in Week 2, then dinner
6. By Week 3 you'll track everything automatically

The habit takes about 3 weeks to feel natural. Start small and build up.
    `.trim(),
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const dbPost = await prisma.blogPost.findUnique({
    where: { slug, published: true },
    select: { metaTitle: true, metaDesc: true, title: true, excerpt: true },
  }).catch(() => null)

  const seed = SEED_CONTENT[slug]
  const title = dbPost?.metaTitle ?? dbPost?.title ?? seed?.title ?? 'Blog'
  const description = dbPost?.metaDesc ?? dbPost?.excerpt ?? seed?.excerpt ?? ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`${APP_URL}/api/og?goal=MAINTENANCE&calories=2000&protein=70&carbs=250&fat=55`],
    },
    alternates: { canonical: `${APP_URL}/blog/${slug}` },
  }
}

function estimateReadTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-10 mb-4">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl font-semibold mt-8 mb-3">
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('| ')) {
      // Table
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      const [header, , ...rows] = tableLines
      const headers = header.split('|').filter(Boolean).map((h) => h.trim())
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                {headers.map((h, j) => (
                  <th key={j} className="text-left py-2 px-3 font-semibold text-neon">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => {
                const cells = row.split('|').filter(Boolean).map((c) => c.trim())
                return (
                  <tr key={ri} className="border-b border-white/5">
                    {cells.map((cell, ci) => (
                      <td key={ci} className="py-2 px-3 text-muted-foreground">{cell}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
      continue
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1.5 my-4 text-muted-foreground">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      )
      continue
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside space-y-1.5 my-4 text-muted-foreground">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ol>
      )
      continue
    } else if (line === '') {
      // skip blank lines
    } else {
      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed my-3"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      )
    }
    i++
  }

  return elements
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-neon hover:underline">$1</a>')
    .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 rounded text-sm">$1</code>')
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  const dbPost = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  }).catch(() => null)

  const seed = SEED_CONTENT[slug]

  if (!dbPost && !seed) {
    notFound()
  }

  const post = dbPost ?? {
    title: seed!.title,
    excerpt: seed!.excerpt,
    content: seed!.content,
    publishedAt: new Date(seed!.publishedAt),
    metaTitle: null,
    metaDesc: null,
  }

  const readTime = estimateReadTime(post.content)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    author: { '@type': 'Organization', name: 'MacroCalc AI' },
    publisher: {
      '@type': 'Organization',
      name: 'MacroCalc AI',
      url: APP_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${APP_URL}/blog/${slug}` },
  }

  return (
    <>
      <StructuredData data={articleSchema} />
      <div className="min-h-screen bg-background py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-neon transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {readTime} min read
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{post.excerpt}</p>

          <GlassCard className="prose-invert">
            <article>
              {renderContent(post.content)}
            </article>
          </GlassCard>

          <div className="mt-12 p-6 rounded-xl border border-neon/20 bg-neon/5 text-center">
            <h2 className="text-xl font-bold mb-2">Get Your Free Macro Calculator</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Calculate your personalized daily targets in seconds — no sign-up required.
            </p>
            <NeonButton asChild>
              <Link href="/calculator">Calculate My Macros</Link>
            </NeonButton>
          </div>
        </div>
      </div>
    </>
  )
}
