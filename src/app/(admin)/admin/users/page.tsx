import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { GlassCard } from '@/components/shared/GlassCard'

export const metadata: Metadata = { title: 'Users — Admin' }

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: {
      id: true, email: true, name: true, role: true, streak: true,
      totalPoints: true, createdAt: true,
      subscription: { select: { status: true } },
      _count: { select: { mealPlans: true, referrals: true } },
    },
  }).catch(() => [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users</h1>
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Email', 'Name', 'Role', 'Sub Status', 'Meal Plans', 'Referrals', 'Points', 'Joined'].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-muted-foreground font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-2 px-3 font-mono text-xs max-w-[200px] truncate">{user.email}</td>
                  <td className="py-2 px-3 text-muted-foreground">{user.name ?? '—'}</td>
                  <td className="py-2 px-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      user.role === 'ADMIN' ? 'bg-neon/20 text-neon' :
                      user.role === 'PREMIUM' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-white/10 text-muted-foreground'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-muted-foreground text-xs">
                    {user.subscription?.status ?? 'FREE'}
                  </td>
                  <td className="py-2 px-3 text-center text-muted-foreground">{user._count.mealPlans}</td>
                  <td className="py-2 px-3 text-center text-muted-foreground">{user._count.referrals}</td>
                  <td className="py-2 px-3 text-center text-muted-foreground">{user.totalPoints}</td>
                  <td className="py-2 px-3 text-muted-foreground text-xs whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground">No users yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
