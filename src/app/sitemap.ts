import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://macrocalc.ai'

const SEED_SLUGS = [
  'macro-calculator-women',
  'macro-calculator-fat-loss',
  'macro-calculator-muscle-gain',
  'high-protein-meal-plans',
  'macro-meal-prep-ideas',
  'how-to-count-macros',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dbPosts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  }).catch(() => [])

  const dbSlugs = new Set(dbPosts.map((p) => p.slug))
  const blogSlugs = [
    ...dbPosts.map((p) => ({ slug: p.slug, updatedAt: p.updatedAt })),
    ...SEED_SLUGS.filter((s) => !dbSlugs.has(s)).map((slug) => ({ slug, updatedAt: new Date('2024-02-25') })),
  ]

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: APP_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${APP_URL}/calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${APP_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${APP_URL}/referral`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map(({ slug, updatedAt }) => ({
    url: `${APP_URL}/blog/${slug}`,
    lastModified: updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
