import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
  })

  test('renders headline and CTA', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('a[href="/calculator"]').first()).toBeVisible()
  })

  test('header logo links back to home', async ({ page }) => {
    await expect(page.locator('a[href="/"]').first()).toBeVisible()
  })

  test('header nav links are present with correct hrefs', async ({ page }) => {
    await expect(page.locator('a[href="/calculator"]').first()).toBeVisible()
    await expect(page.locator('a[href="/pricing"]').first()).toBeVisible()
    await expect(page.locator('a[href="/blog"]').first()).toBeVisible()
  })

  test('features section is visible after scroll', async ({ page }) => {
    // Scroll in steps to trigger whileInView animations
    for (let y = 0; y <= 2000; y += 200) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
      await page.waitForTimeout(100)
    }
    const featureTitle = page.getByText('10-Second Calculation').first()
    await featureTitle.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
    await expect(featureTitle).toBeVisible({ timeout: 8000 })
    await expect(page.getByText('AI Meal Planner').first()).toBeVisible()
    await expect(page.getByText('Goal-Based Macros').first()).toBeVisible()
  })

  test('FAQ section is visible and accordion works', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(600)
    const firstQuestion = page.getByText('How accurate are these macro calculations?')
    await expect(firstQuestion).toBeVisible({ timeout: 8000 })
    await firstQuestion.click()
    await expect(page.getByText(/proven bodyweight-based/i)).toBeVisible({ timeout: 5000 })
  })

  test('CTA section links to calculator', async ({ page }) => {
    const ctaButtons = page.locator('a[href="/calculator"]')
    await expect(ctaButtons.last()).toBeVisible()
  })

  test('no testimonials section is present', async ({ page }) => {
    const testimonials = page.getByText(/what our users say/i)
    await expect(testimonials).toHaveCount(0)
  })

  test('no "as featured on" section', async ({ page }) => {
    const featured = page.getByText(/as featured on/i)
    await expect(featured).toHaveCount(0)
  })

  test('no floating app rating badges', async ({ page }) => {
    const rating = page.getByText(/4\.9\/5 rating/i)
    await expect(rating).toHaveCount(0)
    const macrosCalc = page.getByText(/macros calculated/i)
    await expect(macrosCalc).toHaveCount(0)
  })
})
