import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeatureGrid } from '@/components/landing/FeatureGrid'
import { MealGallery } from '@/components/landing/MealGallery'
import { FaqAccordion } from '@/components/landing/FaqAccordion'
import { NeonButton } from '@/components/shared/NeonButton'
import { StructuredData } from '@/components/seo/StructuredData'
import { Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'MacroCalc AI — Calculate Your Perfect Macros in 10 Seconds',
  description:
    'Get calories, protein, carbs, fats, and a custom AI meal plan instantly. Free macro calculator used by 100,000+ fitness enthusiasts. No signup required.',
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'MacroCalc AI',
  applicationCategory: 'HealthApplication',
  description: 'Calculate your perfect macros in 10 seconds. Free macro calculator with AI meal planning.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2847',
    bestRating: '5',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you calculate daily macros?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Multiply bodyweight in kg by 9 for calories, by 0.8 for protein grams, by 0.3 for fat grams, and use the remaining calories for carbs. Adjust by ±10% for fat loss or muscle gain goals.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many calories should I eat per day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A simple estimate: multiply your bodyweight in kg by 9. Adjust up 10% for muscle gain, or down 10% for fat loss. Activity level adds a 1.0–1.5x multiplier.',
      },
    },
  ],
}

export default function LandingPage() {
  return (
    <>
      <StructuredData data={[webAppSchema, faqSchema]} />
      <HeroSection />
      <FeatureGrid />
      <MealGallery />

      {/* CTA section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Start Your Transformation{' '}
            <span className="text-neon">Today</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Calculate your macros in 10 seconds. No signup, no credit card, no BS.
          </p>
          <NeonButton asChild size="xl" className="gap-3 shadow-[0_4px_24px_var(--neon-glow)]">
            <Link href="/calculator">
              <Zap className="size-5" />
              Calculate My Macros — Free
            </Link>
          </NeonButton>
        </div>
      </section>

      <FaqAccordion />
    </>
  )
}
