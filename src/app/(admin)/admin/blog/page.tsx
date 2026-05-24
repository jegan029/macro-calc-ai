import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { GlassCard } from '@/components/shared/GlassCard'
import { NeonButton } from '@/components/shared/NeonButton'
import { Plus } from 'lucide-react'

export const metadata: Metadata = { title: 'Blog — Admin' }

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, slug: true, title: true, published: true, publishedAt: true, createdAt: true },
  }).catch(() => [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <NeonButton size="sm" asChild>
          <Link href="/admin/blog/new">
            <Plus className="size-4" />
            New Post
          </Link>
        </NeonButton>
      </div>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Title', 'Slug', 'Status', 'Published', 'Created'].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-2 px-3 font-medium">{post.title}</td>
                  <td className="py-2 px-3 font-mono text-xs text-muted-foreground">{post.slug}</td>
                  <td className="py-2 px-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      post.published ? 'bg-neon/20 text-neon' : 'bg-white/10 text-muted-foreground'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-muted-foreground text-xs">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="py-2 px-3 text-muted-foreground text-xs">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">No posts yet. Run the seed script to add demo content.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
