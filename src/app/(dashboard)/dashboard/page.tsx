import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { WeightTrendChart } from '@/components/dashboard/WeightTrendChart'
import { StreakCard } from '@/components/dashboard/StreakCard'
import { AchievementBadge } from '@/components/dashboard/AchievementBadge'
import { GlassCard } from '@/components/shared/GlassCard'
import { NeonButton } from '@/components/shared/NeonButton'
import Link from 'next/link'
import { Calculator, ChefHat } from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      progressLogs: { orderBy: { loggedAt: 'asc' }, take: 90 },
      achievements: { include: { achievement: true } },
      macroProfiles: { orderBy: { createdAt: 'desc' }, take: 3 },
    },
  })

  if (!user) redirect('/calculator')

  const allAchievements = await prisma.achievement.findMany()
  const earnedKeys = new Set(user.achievements.map((ua) => ua.achievementId))

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">
          Hey, {user.name?.split(' ')[0] ?? 'there'} 👋
        </h1>
        <p className="text-muted-foreground">Track your progress and manage your macros.</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <NeonButton asChild size="md" className="h-16 text-sm">
          <Link href="/calculator">
            <Calculator className="size-4" />
            Recalculate Macros
          </Link>
        </NeonButton>
        <NeonButton asChild size="md" variant="outline" className="h-16 text-sm">
          <Link href="/meal-planner">
            <ChefHat className="size-4" />
            Meal Planner
          </Link>
        </NeonButton>
      </div>

      {/* Streak */}
      <StreakCard streak={user.streak} totalPoints={user.totalPoints} />

      {/* Weight trend */}
      <WeightTrendChart data={user.progressLogs} />

      {/* Recent macro profiles */}
      {user.macroProfiles.length > 0 && (
        <div>
          <h2 className="font-semibold text-lg mb-3">Recent Calculations</h2>
          <div className="space-y-2">
            {user.macroProfiles.map((profile) => (
              <GlassCard key={profile.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{profile.name ?? 'Macro Profile'}</p>
                  <p className="text-xs text-muted-foreground">
                    {profile.calories} cal · {profile.protein}g protein · {profile.goal.replace('_', ' ')}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {allAchievements.length > 0 && (
        <div>
          <h2 className="font-semibold text-lg mb-3">Achievements</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {allAchievements.map((ach) => (
              <AchievementBadge
                key={ach.id}
                achievement={{
                  key: ach.key,
                  title: ach.title,
                  description: ach.description,
                  points: ach.points,
                }}
                earned={earnedKeys.has(ach.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
