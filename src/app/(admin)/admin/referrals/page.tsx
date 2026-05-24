import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { GlassCard } from '@/components/shared/GlassCard'

export const metadata: Metadata = { title: 'Referrals — Admin' }

export default async function AdminReferralsPage() {
  const users = await prisma.user.findMany({
    where: { referrals: { some: {} } },
    orderBy: { referrals: { _count: 'desc' } },
    take: 50,
    select: {
      id: true, email: true, name: true, referralCode: true,
      _count: { select: { referrals: true } },
    },
  }).catch(() => [])

  const totalReferrals = await prisma.user.count({ where: { referredById: { not: null } } }).catch(() => 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Referrals</h1>
        <div className="text-sm text-muted-foreground">
          Total referred users: <span className="text-foreground font-semibold">{totalReferrals}</span>
        </div>
      </div>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Referrer', 'Referral Code', 'Referrals Made'].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-2 px-3">
                    <div>
                      <p className="font-medium">{user.name ?? user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs text-neon">{user.referralCode}</td>
                  <td className="py-2 px-3 font-semibold text-center">{user._count.referrals}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-muted-foreground">No referrals yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
