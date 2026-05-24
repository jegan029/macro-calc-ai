import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number, decimals = 0): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function lbsToKg(lbs: number): number {
  return lbs * 0.453592
}

export function kgToLbs(kg: number): number {
  return kg / 0.453592
}

export function buildShareUrl(params: Record<string, string | number>): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? ''
  const query = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString()
  return `${base}/results?${query}`
}

export function buildOgUrl(params: Record<string, string | number>): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? ''
  const query = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString()
  return `${base}/api/og?${query}`
}
