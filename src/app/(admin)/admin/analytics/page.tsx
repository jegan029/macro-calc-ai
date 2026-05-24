import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { GlassCard } from '@/components/shared/GlassCard'

export const metadata: Metadata = { title: 'Analytics — Admin' }

export default async function AdminAnalyticsPage() {
  const [totalAiGenerations, totalProgressLogs, totalAchievements] = await Promise.all([
    prisma.aiGeneration.count().catch(() => 0),
    prisma.progressLog.count().catch(() => 0),
    prisma.userAchievement.count().catch(() => 0),
  ])

  const aiByModel = await prisma.aiGeneration.groupBy({
    by: ['model'],
    _count: { id: true },
    _sum: { promptTokens: true, completionTokens: true },
  }).catch(() => [])

  const recentAiUsage = await prisma.aiGeneration.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: {
      id: true, type: true, model: true,
      promptTokens: true, completionTokens: true, createdAt: true,
      user: { select: { email: true } },
    },
  }).catch(() => [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <GlassCard>
          <p className="text-sm text-muted-foreground mb-1">AI Generations</p>
          <p className="text-3xl font-bold">{totalAiGenerations.toLocaleString()}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-sm text-muted-foreground mb-1">Progress Logs</p>
          <p className="text-3xl font-bold">{totalProgressLogs.toLocaleString()}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-sm text-muted-foreground mb-1">Achievements Earned</p>
          <p className="text-3xl font-bold">{totalAchievements.toLocaleString()}</p>
        </GlassCard>
      </div>

      {aiByModel.length > 0 && (
        <GlassCard className="mb-6">
          <h2 className="font-semibold mb-4">AI Usage by Model</h2>
          <div className="space-y-3">
            {aiByModel.map((row) => (
              <div key={row.model} className="flex items-center justify-between text-sm">
                <span className="font-mono text-muted-foreground">{row.model}</span>
                <div className="flex gap-6 text-xs text-muted-foreground">
                  <span>{row._count.id} calls</span>
                  <span>{((row._sum.promptTokens ?? 0) + (row._sum.completionTokens ?? 0)).toLocaleString()} tokens</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      <GlassCard>
        <h2 className="font-semibold mb-4">Recent AI Generations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['User', 'Type', 'Model', 'Tokens', 'Date'].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentAiUsage.map((gen) => (
                <tr key={gen.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-2 px-3 font-mono text-xs max-w-[180px] truncate">{gen.user.email}</td>
                  <td className="py-2 px-3 text-muted-foreground text-xs">{gen.type}</td>
                  <td className="py-2 px-3 text-muted-foreground text-xs">{gen.model}</td>
                  <td className="py-2 px-3 text-muted-foreground text-xs">
                    {(gen.promptTokens + gen.completionTokens).toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-muted-foreground text-xs">
                    {new Date(gen.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentAiUsage.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">No AI generations yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
