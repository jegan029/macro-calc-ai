import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { GlassCard } from '@/components/shared/GlassCard'
import { BookOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Macro & Nutrition Blog',
  description: 'Expert guides on macros, meal planning, fat loss, and muscle gain. Evidence-based nutrition content.',
}

// Fallback posts for SEO when DB has no posts
const SEED_POSTS = [
  { slug: 'macro-calculator-women', title: 'The Best Macro Calculator for Women', excerpt: 'How to calculate the perfect macros for women\'s fat loss, maintenance, and muscle gain goals.', publishedAt: new Date('2024-01-15') },
  { slug: 'macro-calculator-fat-loss', title: 'Macro Calculator for Fat Loss: Complete Guide', excerpt: 'Calculate your fat loss macros and learn how to hit them consistently for sustainable weight loss.', publishedAt: new Date('2024-01-22') },
  { slug: 'macro-calculator-muscle-gain', title: 'Macro Calculator for Muscle Gain (Bulking)', excerpt: 'Build serious muscle with the right macro ratios. Includes protein targets, calorie surplus guidelines.', publishedAt: new Date('2024-02-01') },
  { slug: 'high-protein-meal-plans', title: 'High Protein Meal Plans (7-Day Guide)', excerpt: 'A complete 7-day high protein meal plan with macros, grocery list, and meal prep tips.', publishedAt: new Date('2024-02-10') },
  { slug: 'macro-meal-prep-ideas', title: '20 Macro-Friendly Meal Prep Ideas', excerpt: 'Save time and hit your macros with these easy meal prep ideas for fat loss and muscle gain.', publishedAt: new Date('2024-02-18') },
  { slug: 'how-to-count-macros', title: 'How to Count Macros for Beginners', excerpt: 'A step-by-step guide to counting macros, including tools, tips, and common mistakes to avoid.', publishedAt: new Date('2024-02-25') },
]

export default async function BlogPage() {
  const dbPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: { slug: true, title: true, excerpt: true, publishedAt: true },
  }).catch(() => [])

  const posts = dbPosts.length > 0 ? dbPosts : SEED_POSTS

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="size-5 text-neon" />
          <span className="text-sm text-neon font-medium">Blog</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Macro & Nutrition{' '}
          <span className="text-neon">Guides</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Science-backed guides to help you reach your fitness goals faster.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <GlassCard className="h-full hover:border-white/20 transition-colors cursor-pointer">
                <h2 className="font-semibold text-lg mb-2 leading-tight">{post.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  }) : ''}
                </p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
