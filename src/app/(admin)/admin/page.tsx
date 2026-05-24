import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { GlassCard } from '@/components/shared/GlassCard'
import { Users, ChefHat, TrendingUp, DollarSign } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin — MacroCalc AI' }

export default async function AdminPage() {
  const [userCount, mealPlanCount, premiumCount, blogCount] = await Promise.all([
    prisma.user.count().catch(() => 0),
    prisma.mealPlan.count().catch(() => 0),
    prisma.user.count({ where: { role: { in: ['PREMIUM', 'ADMIN'] } } }).catch(() => 0),
    prisma.blogPost.count({ where: { published: true } }).catch(() => 0),
  ])

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  }).catch(() => [])

  const stats = [
    { label: 'Total Users', value: userCount, icon: Users, color: 'text-blue-400' },
    { label: 'Premium Users', value: premiumCount, icon: DollarSign, color: 'text-neon' },
    { label: 'Meal Plans Generated', value: mealPlanCount, icon: ChefHat, color: 'text-purple-400' },
    { label: 'Published Posts', value: blogCount, icon: TrendingUp, color: 'text-yellow-400' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <GlassCard key={stat.label}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className={`size-4 ${stat.color}`} />
            </div>
            <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h2 className="font-semibold mb-4">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Email</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Name</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Role</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-2 px-3 font-mono text-xs">{user.email}</td>
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
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted-foreground">No users yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
