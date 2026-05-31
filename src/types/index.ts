export * from './calculator'

export type SubscriptionStatus = 'FREE' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'TRIALING'
export type UserRole = 'USER' | 'PREMIUM' | 'ADMIN'

export interface UserSubscription {
  status: SubscriptionStatus
  currentPeriodEnd?: Date
  priceId?: string
}

export interface ReferralStats {
  code: string
  referralCount: number
  pointsEarned: number
}

export interface Achievement {
  key: string
  title: string
  description: string
  iconUrl?: string
  points: number
  earnedAt?: Date
}

export interface ProgressEntry {
  weightKg: number
  loggedAt: Date
}
