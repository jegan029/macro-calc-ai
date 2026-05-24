import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const ACHIEVEMENTS = [
  { key: 'first_calculation', title: 'First Steps', description: 'Calculated your macros for the first time', points: 10 },
  { key: 'first_meal_plan', title: 'Meal Planner', description: 'Generated your first AI meal plan', points: 20 },
  { key: 'first_share', title: 'Social Butterfly', description: 'Shared your macro results', points: 15 },
  { key: 'first_referral', title: 'Connector', description: 'Referred your first friend', points: 25 },
  { key: 'five_referrals', title: 'Influencer', description: 'Referred 5 friends', points: 50 },
  { key: 'ten_referrals', title: 'Ambassador', description: 'Referred 10 friends', points: 100 },
  { key: 'streak_3', title: 'Consistent', description: 'Logged in 3 days in a row', points: 15 },
  { key: 'streak_7', title: 'Week Warrior', description: 'Logged in 7 days in a row', points: 30 },
  { key: 'streak_30', title: 'Dedicated', description: 'Logged in 30 days in a row', points: 100 },
  { key: 'premium_member', title: 'Premium Member', description: 'Upgraded to Premium', points: 50 },
  { key: 'first_pdf', title: 'PDF Pro', description: 'Downloaded your macro report PDF', points: 10 },
  { key: 'five_meal_plans', title: 'Meal Prep Master', description: 'Generated 5 AI meal plans', points: 40 },
]

const BLOG_POSTS = [
  {
    slug: 'macro-calculator-women',
    title: 'The Best Macro Calculator for Women',
    excerpt: "How to calculate the perfect macros for women's fat loss, maintenance, and muscle gain goals.",
    content: `## Why Macros Matter for Women

Tracking macros gives you precise control over your body composition. Unlike calorie-only tracking, macros let you preserve muscle while losing fat.

## The Formula

- **Calories:** bodyweight (kg) × 9 × goal modifier × activity multiplier
- **Protein:** bodyweight (kg) × 0.8g
- **Fat:** bodyweight (kg) × 0.3g

## Get Your Numbers

Use our free macro calculator to get personalized targets instantly.`,
    metaTitle: 'Best Macro Calculator for Women (2024) — MacroCalc AI',
    metaDesc: "Calculate perfect macros for women's fat loss, maintenance, and muscle gain. Free tool, instant results.",
    published: true,
    publishedAt: new Date('2024-01-15'),
  },
  {
    slug: 'macro-calculator-fat-loss',
    title: 'Macro Calculator for Fat Loss: Complete Guide',
    excerpt: 'Calculate your fat loss macros and learn how to hit them consistently for sustainable weight loss.',
    content: `## What Are Fat Loss Macros?

Fat loss macros create a calorie deficit while preserving muscle. The key is a moderate deficit — around 10% below maintenance.

## The Fat Loss Formula

Calories: bodyweight (kg) × 9 × 0.9 × activity multiplier

## Why Protein Is King

High protein preserves lean muscle, increases satiety, and has a high thermic effect (burns more calories to digest).

## Get Started

Calculate your fat loss macros with our free tool — no email required.`,
    metaTitle: 'Fat Loss Macro Calculator — Complete Guide — MacroCalc AI',
    metaDesc: 'Calculate your fat loss macros in seconds. Evidence-based formula for sustainable weight loss.',
    published: true,
    publishedAt: new Date('2024-01-22'),
  },
  {
    slug: 'how-to-count-macros',
    title: 'How to Count Macros for Beginners',
    excerpt: 'A step-by-step guide to counting macros, including tools, tips, and common mistakes to avoid.',
    content: `## What Are Macros?

Macros (macronutrients) are the three main nutrients: protein (4 cal/g), carbohydrates (4 cal/g), and fat (9 cal/g).

## Step 1: Get Your Targets

Use a macro calculator to find your daily targets based on your weight, goal, and activity level.

## Step 2: Get a Food Scale

A kitchen scale is the most important tool for accurate tracking. Weighing in grams beats measuring cups.

## Step 3: Start Tracking

Start with just breakfast for the first week. Add meals gradually until tracking is automatic.`,
    metaTitle: 'How to Count Macros for Beginners — MacroCalc AI',
    metaDesc: 'Step-by-step guide to counting macros. Tools, tips, and common mistakes to avoid.',
    published: true,
    publishedAt: new Date('2024-02-25'),
  },
]

async function main() {
  console.log('Seeding database...')

  for (const achievement of ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { key: achievement.key },
      update: achievement,
      create: achievement,
    })
  }
  console.log(`Seeded ${ACHIEVEMENTS.length} achievements`)

  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    })
  }
  console.log(`Seeded ${BLOG_POSTS.length} blog posts`)

  console.log('Done!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
