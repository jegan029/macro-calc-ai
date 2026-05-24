import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export async function requireAuth() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  return userId
}

export async function requireAdmin() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  })

  if (user?.role !== 'ADMIN') throw new Error('Forbidden')
  return userId
}

export async function getDbUser() {
  const { userId } = await auth()
  if (!userId) return null

  return prisma.user.findUnique({
    where: { clerkId: userId },
    include: { subscription: true },
  })
}

export async function isPremium(): Promise<boolean> {
  const { userId } = await auth()
  if (!userId) return false

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { subscription: true },
  })

  return (
    user?.role === 'PREMIUM' ||
    user?.role === 'ADMIN' ||
    user?.subscription?.status === 'ACTIVE' ||
    user?.subscription?.status === 'TRIALING'
  )
}
