import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
import { PostHogProvider } from '@/components/shared/PostHogProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'MacroCalc AI — Calculate Your Perfect Macros in 10 Seconds',
    template: '%s | MacroCalc AI',
  },
  description:
    'Get calories, protein, carbs, fats, and a custom meal plan instantly. The #1 viral fitness macro calculator used by 100,000+ people.',
  keywords: [
    'macro calculator',
    'calorie calculator',
    'protein calculator',
    'meal plan',
    'fitness macros',
    'weight loss calculator',
    'muscle gain calculator',
  ],
  authors: [{ name: 'MacroCalc AI' }],
  creator: 'MacroCalc AI',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://macrocalc.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'MacroCalc AI',
    title: 'MacroCalc AI — Calculate Your Perfect Macros in 10 Seconds',
    description: 'Get calories, protein, carbs, fats, and a custom meal plan instantly.',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'MacroCalc AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MacroCalc AI — Calculate Your Perfect Macros in 10 Seconds',
    description: 'Get calories, protein, carbs, fats, and a custom meal plan instantly.',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
          <PostHogProvider>
            {children}
            <Toaster theme="light" position="bottom-right" richColors />
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
